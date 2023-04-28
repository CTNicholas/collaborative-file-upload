import { Logo } from "@/components/Logo";
import Link from "next/link";

export function Header() {
  return (
    <header className="p-4 bg-white">
      <div className="flex justify-between">
        <Link href="/viewer">
          <Logo />
        </Link>
        <Link href="/upload">Upload file</Link>
      </div>
    </header>
  );
}
