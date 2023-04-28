"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { useStorage, useMutation } from "@/liveblocks.config";
import { ReactNode } from "react";
import { shallow } from "@liveblocks/client";

// https://tailwindui.com/components/application-ui/lists/grid-lists

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

function FileContainer({ children }: { children: ReactNode }) {
  return <li className="bg-white aspect-[4/3] rounded-lg p-3">{children}</li>;
}

function File({ id }: { id: string }) {
  const file = useStorage((root) => root.files.get(id));

  const deleteFile = useMutation(
    ({ storage }) => {
      storage.get("files").delete(id);
    },
    [id]
  );

  if (!file) {
    return null;
  }

  if (file.loading) {
    return <FileContainer>Loading...</FileContainer>;
  }

  const { title, description, url } = file;

  return (
    <FileContainer>
      <div>
        <div>{title}</div>
        <div>{description}</div>
      </div>
      <button onClick={deleteFile}>Delete</button>
    </FileContainer>
  );
}
