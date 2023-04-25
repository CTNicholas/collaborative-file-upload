import { Logo } from "@/components/Logo";
import Link from "next/link";

export function Header() {
  return (
    <header className="p-4">
      <div>
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
