"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@/liveblocks.config";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { useRouter } from "next/navigation";

export function FileUpload() {
  const router = useRouter();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [currentName, setCurrentName] = useState<string>("");
  const [currentDescription, setCurrentDescription] = useState<string>("");

  const handleSubmit = useMutation(
    async ({ storage }, e: FormEvent) => {
      e.preventDefault();

      if (!currentFile) {
        return;
      }

      const id = nanoid();
      const files = storage.get("files");
      files.set(id, new LiveObject({ loading: true }));

      const response = await fetch(
        `/api/upload-file?name=${currentName}&id=${id}`,
        {
          method: "POST",
          body: currentFile,
        }
      );

      if (!response.ok) {
        // Endpoint error
        return;
      }

      const { url } = await response.json();
      const file = files.get(id);

      if (!file) {
        // File LiveObject has been deleted during fetch call
        return;
      }

      file.update({
        title: currentName,
        description: currentDescription,
        url: url,
        loading: false,
      });

      // router.back();
    },
    [currentFile, currentName, currentDescription, router]
  );

  return (
    <section className="max-w-[400px] w-full">
      <div className="mb-6 flex justify-between items-center">
        <div>Upload image</div>
        <a className="cursor-pointer" onClick={() => router.back()}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </a>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label htmlFor="file-upload" className="block">
          <div className="w-full py-10 border-2 border-dashed flex flex-col justify-center items-center cursor-pointer rounded hover:border-gray-300 transition-colors">
            {currentFile ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mb-6 text-gray-600"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mb-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
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
        />
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900 mb-1.5"
          >
            File name
          </label>
          <input
            className="border rounded shadow-sm px-3 py-2 w-full"
            placeholder="my-photo.png"
            type="text"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900 mb-1.5"
          >
            File name
          </label>
          <input
            className="border rounded shadow-sm px-3 py-2 w-full"
            placeholder="This is my photo"
            type="text"
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
          />
        </div>
        <button className="block px-3.5 py-2.5 bg-black hover:bg-gray-800 active:bg-gray-700 text-white rounded font-medium">
          Upload file
        </button>
      </form>
    </section>
  );
}
