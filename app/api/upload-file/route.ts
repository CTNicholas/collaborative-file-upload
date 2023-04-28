import * as vercelBlob from "@vercel/blob";
import { NextResponse, NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const blob = await request.blob();

  console.log(id, name, blob);

  /*
  const blob = await vercelBlob.put(
    filename, // return pathname for the blob
    blobData, // body for the blob object
    { access: "public" } // access is required
  );
  return NextResponse.json({
    url: blob.url,
  });
  */

  return NextResponse.json({
    url: "https://liveblocks.io/images/social-images/social-image.png",
  });
}
