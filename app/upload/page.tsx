import { FileList } from "@/components/FileList/FileList";
import { Header } from "@/components/Header/Header";
import { FileUpload } from "@/components/FileUpload";

export const metadata = {
  title: "Dashboard",
};

export default function Home() {
  return (
    <>
      <FileUpload />
    </>
  );
}
