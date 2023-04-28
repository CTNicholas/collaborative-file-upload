import { FileUpload } from "@/components/FileUpload";

export const metadata = {
  title: "Upload",
};

export default function Home() {
  return (
    <div className="bg-gray-50 h-full flex justify-center items-center">
      <div className="bg-white p-6 w-[450px] max-w-full flex justify-center rounded shadow">
        <FileUpload />
      </div>
    </div>
  );
}
