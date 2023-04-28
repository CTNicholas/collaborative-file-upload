import { FileUpload } from "@/components/FileUpload";
import Link from "next/link";

export const metadata = {
  title: "Upload file",
};

export default function UploadTray() {
  return (
    <div className="fixed top-0 right-0 bottom-0 w-1/3 min-w-[450px] max-w-full bg-white shadow-xl">
      <div className="max-w-[400px] mx-auto pt-8">
        <FileUpload />
      </div>
    </div>
  );
}
