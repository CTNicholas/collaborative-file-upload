"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImageIcon } from "@/icons/ImageIcon";

export function Header() {
  const onUploadPage = usePathname().startsWith("/upload");

  return (
    <header className="py-3 px-6 bg-white border-b border-gray-100">
      <div className="flex justify-between items-center min-h-[40px]">
        <Link href="/viewer" className="flex gap-5 font-semibold">
          Collaborative photo gallery
        </Link>
        {!onUploadPage ? (
          <Link
            href="/upload"
            className="bg-black text-white font-medium px-3.5 py-2 rounded hover:bg-gray-800 active:bg-gray-700 flex items-center"
          >
            <ImageIcon iconSize="sm" className="w-5 h-5 mr-2" />
            New image
          </Link>
        ) : null}
      </div>
      <a
        className="fixed bottom-3 right-3 z-10"
        href="https://liveblocks.io"
        rel="noreferrer"
        target="_blank"
      >
        <img
          src="https://liveblocks.io/badge-light.svg"
          alt="Made with Liveblocks"
        />
      </a>
    </header>
  );
}
