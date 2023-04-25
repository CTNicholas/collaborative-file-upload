"use client";

import { Header } from "@/components/Header/Header";
import Link from "next/link";

export default function WhiteboardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <>
      <br />
      <br />
      Files here
      <br />
      <Link href="/upload">upload</Link>
    </>
  );
}
