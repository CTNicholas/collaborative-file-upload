import { ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config";

export const metadata = {
  title: "View files",
};

export default function Layout({
  children,
  uploadTray,
}: {
  children: ReactNode;
  uploadTray: ReactNode;
}) {
  return (
    <>
      {uploadTray}
      {children}
    </>
  );
}
