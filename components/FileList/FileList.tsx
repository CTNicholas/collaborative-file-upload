"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { useOthers } from "@/liveblocks.config";

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
  const others = useOthers();
  return <div>{others.length}</div>;
}
