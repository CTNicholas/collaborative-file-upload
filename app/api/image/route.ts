import * as vercelBlob from "@vercel/blob";
import { NextResponse, NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") as string;
  const name = searchParams.get("name") as string;
  const file = await request.blob();

  // const fileExtension = file.type.split("/")[1];
  // const fileName = `${id}.${fileExtension}`;

  console.log(id, name, file);

  console.log(file.type);

  const blob = await vercelBlob.put(
    id, // return pathname for the blob
    file, // body for the blob object
    { access: "public" } // access is required
  );

  console.log(blob);
  return NextResponse.json({
    url: blob.url,
  });

  return NextResponse.json({
    url: "https://liveblocks.io/images/social-images/social-image.png",
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") as string;
  const response = await vercelBlob.del(url);

  if (!response) {
  }

  // TODO
  return NextResponse.json({ success: true });
}
