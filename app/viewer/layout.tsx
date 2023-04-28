import { ReactNode } from "react";

export const metadata = {
  title: "View files",
};

export default function ViewerLayout({
  children,
  uploadTray,
}: {
  children: ReactNode;
  uploadTray: ReactNode;
}) {
  return (
    <>
      {children}
      {uploadTray}
    </>
  );
}
