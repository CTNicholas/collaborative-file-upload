"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { useStorage, useMutation } from "@/liveblocks.config";
import { useState } from "react";
import { shallow } from "@liveblocks/client";
import Link from "next/link";
import clsx from "clsx";

// https://tailwindui.com/components/application-ui/lists/grid-lists

export function FileList() {
  const [selectedId, setSelectedId] = useState<string>("");

  return (
    <div className="h-full">
      <div className="p-6">
        <div className="flex justify-between items-baseline border-b pb-6">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-6">
            Files
          </h1>
          <Link
            href="/upload"
            className="bg-black text-white font-medium px-3.5 py-2 rounded hover:bg-gray-800 active:bg-gray-700"
          >
            Upload file
          </Link>
        </div>
      </div>
      <div className="p-6 flex h-full gap-4">
        <div className="flex-grow">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600 border-b [&>*]:pb-4 [&>*]:font-semibold">
                <th>Name</th>
                <th>Modified</th>
              </tr>
            </thead>
            <ClientSideSuspense fallback={null}>
              {() => (
                <List selectedId={selectedId} setSelectedId={setSelectedId} />
              )}
            </ClientSideSuspense>
          </table>
        </div>
        <ClientSideSuspense
          fallback={
            <div className="w-[300px] flex-grow-0 flex-shrink-0 max-w-1/2 px-6">
              No items selected
            </div>
          }
        >
          {() => <SideInfo id={selectedId} />}
        </ClientSideSuspense>
      </div>
    </div>
  );
}

function List({
  selectedId,
  setSelectedId,
}: {
  selectedId: string;
  setSelectedId: (id: string) => void;
}) {
  // Creating a new array from a keys() iterator every time, so using shallow equality check
  const fileIds = useStorage((root) => [...root.files.keys()], shallow);

  return (
    <tbody>
      {fileIds.map((id) => (
        <File
          key={id}
          id={id}
          selected={id === selectedId}
          onSelect={setSelectedId}
        />
      ))}
    </tbody>
  );
}

function SideInfo({ id }: { id: string }) {
  const file = useStorage((root) => root.files.get(id));

  const deleteFile = useMutation(
    ({ storage }) => {
      storage.get("files").delete(id);
    },
    [id]
  );

  if (!file || !id || file.loading) {
    return (
      <div className="w-[300px] flex-grow-0 flex-shrink-0 max-w-1/2 px-6">
        No items selected
      </div>
    );
  }

  const { title, description, url } = file;

  return (
    <div className="w-[300px] flex-grow-0 flex-shrink-0 max-w-1/2 px-6">
      <h2 className="">{title}</h2>
      <p>{description}</p>
      <div className="flex gap-4 mt-4">
        <Link
          className="w-1/2 px-3.5 py-2 rounded bg-black text-white text-center text-sm font-medium hover:bg-gray-800 active:bg-gray-700"
          href={url}
        >
          Download
        </Link>
        <button
          className="w-1/2 px-3.5 py-2 rounded border text-center text-sm font-medium border-red-300 hover:border-red-400 text-gray-700 transition-colors"
          onClick={deleteFile}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function FileSkeleton() {
  return <div>skeleton</div>;
}

type FileProps = {
  id: string;
  selected: boolean;
  onSelect: (id: string) => void;
};

function File({ id, selected, onSelect }: FileProps) {
  const file = useStorage((root) => root.files.get(id));

  if (!file) {
    return null;
  }

  if (file.loading) {
    return <tr className="border-b">Loading...</tr>;
  }

  const { title, description, url, time } = file;
  const date = new Date(time).toLocaleString();

  return (
    <tr
      className={clsx(
        "border-b cursor-pointer relative [&>*]:py-5 [&>*]:whitespace-nowrap [&>*]:overflow-ellipsis",
        {
          "bg-pink-50": selected,
        }
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
    >
      <td className="flex font-medium">
        <div className="text-pink-400/30 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
          </svg>
        </div>
        {title}
      </td>
      <td className="text-gray-500">{date}</td>
      {selected ? (
        <div className="absolute top-[-1px] bottom-[-1px] right-0 left-0 border-t border-b border-pink-200"></div>
      ) : null}
    </tr>
  );
}
