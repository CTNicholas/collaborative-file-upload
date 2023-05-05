import * as vercelBlob from "@vercel/blob";
import { NextResponse, NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const file = await request.blob();

  if (!id || !file) {
    return NextResponse.json(
      { error: "File name or file not submitted" },
      { status: 400 }
    );
  }

  const blob = await vercelBlob.put(id, file, { access: "public" });

  return NextResponse.json({
    url: blob.url,
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "No URL submitted" }, { status: 400 });
  }

  const response = await vercelBlob.del(url);

  if (!response) {
    return NextResponse.json(
      { error: "Vercel Blob deletion error" },
      { status: 500 }
    );
  }

  // TODO
  return NextResponse.json({ success: true });
}
