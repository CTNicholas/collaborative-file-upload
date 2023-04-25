import { FileList } from "@/components/FileList/FileList";
import { Header } from "@/components/Header/Header";

export const metadata = {
  title: "Dashboard",
};

export default function Home() {
  return (
    <>
      <FileList />
    </>
  );
}
