import * as vercelBlob from "@vercel/blob";
import { NextResponse, NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(request: NextRequest) {
  const blobData = await request.blob();

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

  return NextResponse.json({});
}
