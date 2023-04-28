import { FileUpload } from "@/components/FileUpload";

export const metadata = {
  title: "Dashboard",
};

export default function Home() {
  return (
    <div className="bg-white h-full flex justify-center items-center">
      <FileUpload />
    </div>
  );
}
