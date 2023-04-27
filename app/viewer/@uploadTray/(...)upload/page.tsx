import { FileUpload } from "@/components/FileUpload";

export const metadata = {
  title: "Upload file",
};

export default function UploadTray() {
  return (
    <div>
      <FileUpload />
    </div>
  );
}
