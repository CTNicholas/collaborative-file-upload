"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@/liveblocks.config";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";

export function FileUpload() {
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
        time: Date.now(),
        loading: false,
      });
    },
    [currentFile, currentName, currentDescription]
  );

  return (
    <ClientSideSuspense fallback={<div>Loading...</div>}>
      {() => (
        <section>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="File name"
              type="text"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
            />
            <input
              placeholder="File description"
              type="text"
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setCurrentFile(e.target.files?.[0] || null)}
            />
            <button>Upload</button>
          </form>
        </section>
      )}
    </ClientSideSuspense>
  );
}
