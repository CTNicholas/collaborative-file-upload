import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html className={inter.className}>
      <body className="flex flex-col">
        <div>
          <Header />
        </div>
        <div className="flex-grow">{children}</div>
      </body>
    </html>
  );
}
