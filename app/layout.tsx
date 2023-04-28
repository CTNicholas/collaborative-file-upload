import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Room } from "@/components/Room";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Room>
      <html className={clsx("fixed inset-0", inter.className)}>
        <body className="fixed inset-0 flex flex-col bg-white overflow-y-auto">
          <div>
            <Header />
          </div>
          <div className="flex-grow">{children}</div>
        </body>
      </html>
    </Room>
  );
}
