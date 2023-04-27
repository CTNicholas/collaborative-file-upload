"use client";

import { useState } from "react";

export function FileUpload() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!currentFile) {
      return;
    }

    fetch("/api/upload-file", {
      method: "POST",
      body: currentFile,
    });

    console.log(currentFile);
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setCurrentFile(e.target.files?.[0] || null)}
        />
        <button>Upload</button>
      </form>
    </section>
  );
}
