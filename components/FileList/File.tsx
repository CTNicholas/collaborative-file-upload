import { useMutation, useStorage } from "@/liveblocks.config";
import clsx from "clsx";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { SpinnerIcon } from "@/icons/SpinnerIcon";

export function File({ id }: { id: string }) {
  const file = useStorage((root) => root.files.get(id));

  const deleteFile = useMutation(
    async ({ storage }) => {
      const files = storage.get("files");
      const file = files.get(id);

      if (!file) {
        return;
      }

      file.update({ state: "deleting" });

      const response = await fetch(`/api/image?url=${file.get("url")}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        file.update({ state: "ready" });
        return;
      }

      files.delete(id);
    },
    [id]
  );

  if (!file) {
    return null;
  }

  const { title, description, url, state } = file;

  if (state === "uploading") {
    return (
      <li className="bg-white aspect-[4/3] rounded-lg">
        <div className="block aspect-[4/3] rounded-lg p-3 bg-gray-50"></div>
        <div className="mt-4">
          <div className="animate-pulse h-5 w-1/2 bg-gray-200 mb-3"></div>
          <div className="animate-pulse text-sm h-[1em] w-2/3 bg-gray-200"></div>
        </div>
      </li>
    );
  }

  return (
    <li
      className={clsx("transition-opacity", {
        "opacity-70": state === "deleting",
      })}
    >
      <a
        href={url}
        target="_blank"
        className="block aspect-[4/3] rounded-lg p-3 bg-gray-100 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${url})`,
        }}
      />
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col gap-0.5 flex-grow">
          <a href={url} target="_blank" className="block font-medium">
            {title}
          </a>
          <div className="text-sm text-gray-600">{description}</div>
        </div>
        {state === "ready" ? (
          <button
            className="text-red-500 text-sm flex-grow-0 flex-shrink-0 mb-1 opacity-60 hover:opacity-100 transition-opacity duration-100"
            onClick={deleteFile}
          >
            <span className="sr-only">Delete file</span>
            <DeleteIcon iconSize="md" className="w-6 h-6" />
          </button>
        ) : (
          <div>
            <span className="sr-only">File under deletion</span>
            <SpinnerIcon
              iconSize="md"
              className="animate-spin -ml-1 h-6 w-6 text-gray-500"
            />
          </div>
        )}
      </div>
    </li>
  );
}
