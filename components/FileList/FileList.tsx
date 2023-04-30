"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { useStorage } from "@/liveblocks.config";
import { shallow } from "@liveblocks/client";
import { File } from "./File";
import { Loading } from "@/components/Loading";

export function FileList() {
  return (
    <div>
      <ClientSideSuspense fallback={<Loading />}>
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
