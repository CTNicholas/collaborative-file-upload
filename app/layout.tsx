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
        <body className="flex flex-col bg-white fixed inset-0">
          <Header />
          <div className="flex-grow">{children}</div>
        </body>
      </html>
    </Room>
  );
}
