"use client";

import { FormEvent, useMemo, useState } from "react";
import { useMutation } from "@/liveblocks.config";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { useRouter } from "next/navigation";
import { UploadIcon } from "@/icons/UploadIcon";
import { CrossIcon } from "@/icons/CrossIcon";

export function FileUpload() {
  const router = useRouter();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [currentName, setCurrentName] = useState<string>("");
  const [currentDescription, setCurrentDescription] = useState<string>("");

  const imageBlobUrl = useMemo(
    () => (currentFile ? URL.createObjectURL(currentFile) : ""),
    [currentFile]
  );

  function resetForm() {
    setCurrentFile(null);
    setCurrentName("");
    setCurrentDescription("");
  }

  const handleSubmit = useMutation(
    async ({ storage }, e: FormEvent) => {
      e.preventDefault();

      if (!currentFile) {
        return;
      }

      router.back();
      resetForm();

      const randomId = nanoid();
      const fileExtension = currentFile.type.split("/")[1];
      const fileName = `collaborative-upload-demo/${randomId}.${fileExtension}`;

      const files = storage.get("files");
      files.set(
        fileName,
        new LiveObject({
          title: "",
          description: "",
          url: "",
          state: "uploading",
        })
      );

      const response = await fetch(
        `/api/image?name=${currentName}&id=${fileName}`,
        {
          method: "POST",
          body: currentFile,
        }
      );

      if (!response.ok) {
        files.delete(fileName);
        return;
      }

      const { url } = await response.json();
      const file = files.get(fileName);

      if (!file) {
        // File LiveObject has been deleted during fetch call
        return;
      }

      file.update({
        title: currentName,
        description: currentDescription,
        url: url,
        state: "ready",
      });
    },
    [currentFile, currentName, currentDescription, router, resetForm]
  );

  return (
    <section className="max-w-[400px] w-full">
      <div className="mb-6 flex justify-between items-center">
        <div className="font-medium">Upload image</div>
        <a className="cursor-pointer" onClick={() => router.back()}>
          <CrossIcon iconSize="md" className="w-6 h-6 text-gray-700" />
        </a>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label htmlFor="file-upload" className="block relative group">
          {currentFile ? (
            <div
              className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-5 transition-opacity"
              style={{
                backgroundImage: `url(${imageBlobUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          ) : null}
          <div className="w-full py-10 border-2 border-dashed flex flex-col justify-center items-center cursor-pointer rounded hover:border-gray-300 transition-colors group-hover:bg-gray-50">
            {currentFile ? (
              <div className="h-6 mb-6">
                <img
                  className="h-full mx-auto rounded"
                  src={URL.createObjectURL(currentFile)}
                  alt={currentFile.name}
                />
              </div>
            ) : (
              <UploadIcon
                iconSize="md"
                className="w-6 h-6 mb-6 text-gray-600"
              />
            )}
            <div className="font-medium">
              {currentFile ? currentFile.name : "Choose file to upload"}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {currentFile ? "Replace file?" : ".png, .jpg, .jpeg, .svg, .gif"}
            </div>
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) => setCurrentFile(e.target.files?.[0] || null)}
          required
        />
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900 mb-1.5"
          >
            File name
          </label>
          <input
            className="border rounded shadow-sm px-3 py-2 w-full outline-black focus:outline-2 focus:outline"
            placeholder="My photo"
            id="name"
            name="name"
            type="text"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-900 mb-1.5"
          >
            File description
          </label>
          <input
            className="border rounded shadow-sm px-3 py-2 w-full outline-black focus:outline-2 focus:outline"
            placeholder="This is my photo"
            id="description"
            name="description"
            type="text"
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <button className="px-3.5 py-2.5 bg-black hover:bg-gray-800 active:bg-black text-white rounded font-medium flex justify-center items-center">
          <UploadIcon iconSize="sm" className="w-5 h-5 mr-2" />
          Upload file
        </button>
      </form>
    </section>
  );
}
