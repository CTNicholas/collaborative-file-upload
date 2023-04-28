"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { LiveMap } from "@liveblocks/client";

type Props = {
  children: ReactNode;
};

export function Room({ children }: Props) {
  return (
    <RoomProvider
      id="collaborative-file-upload"
      initialPresence={{}}
      initialStorage={{ files: new LiveMap() }}
    >
      {children}
    </RoomProvider>
  );
}
