"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { useStorage, useMutation } from "@/liveblocks.config";
import { shallow } from "@liveblocks/client";

export function FileList() {
  return (
    <div>
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => <List />}
      </ClientSideSuspense>
    </div>
  );
}

function List() {
  // Creating a new array from a keys() iterator every time, so using shallow equality check
  const fileIds = useStorage((root) => [...root.files.keys()], shallow);

  return (
    <div className="p-6">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {fileIds.map((id) => (
          <File key={id} id={id} />
        ))}
      </ul>
    </div>
  );
}

function File({ id }: { id: string }) {
  const file = useStorage((root) => root.files.get(id));

  const deleteFile = useMutation(
    async ({ storage }) => {
      const files = storage.get("files");
      const file = files.get(id);

      if (!file) {
        return;
      }

      file.update({ state: "deleting" });

      const response = await fetch(`/api/image?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        // Endpoint error
        return;
      }

      console.log(await response.json());

      files.delete(id);
    },
    [id]
  );

  if (!file) {
    return null;
  }

  if (file.state === "uploading") {
    return (
      <li className="bg-white aspect-[4/3] rounded-lg p-3">
        <div>
          <div className="animate-pulse h-[1em] w-2/3 bg-gray-200 mb-2"></div>
          <div className="animate-pulse text-sm h-[1em] w-1/2 bg-gray-200"></div>
        </div>
        <button onClick={deleteFile}>Delete</button>
      </li>
    );
  }

  const { title, description, url } = file;

  return (
    <li>
      <div className="aspect-[4/3] rounded-lg p-3 bg-gray-50"></div>
      <div>
        <div>{title}</div>
        <div>{description}</div>
      </div>
      <button className="text-red-500 text-sm" onClick={deleteFile}>
        Delete
      </button>
    </li>
  );
}
