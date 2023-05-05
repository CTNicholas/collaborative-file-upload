import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Room } from "@/components/Room";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Room>
      <html className={inter.className}>
        <head>
          <title>Liveblocks</title>
          <link
            href="https://liveblocks.io/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="https://liveblocks.io/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
        </head>
        <body className="flex flex-col bg-white fixed inset-0">
          <Header />
          <div className="flex-grow overflow-y-auto">{children}</div>
        </body>
      </html>
    </Room>
  );
}
