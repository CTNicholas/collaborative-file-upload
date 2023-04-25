"use client";

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
