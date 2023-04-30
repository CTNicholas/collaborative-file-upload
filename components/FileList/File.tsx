import { useMutation, useStorage } from "@/liveblocks.config";

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

      const response = await fetch(`/api/image?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        // Endpoint error
        return;
      }

      console.log(await response.json());

      files.delete(id);
    },
    [id]
  );

  if (!file) {
    return null;
  }

  if (file.state === "uploading") {
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

  const { title, description, url } = file;

  return (
    <li>
      <a
        href={url}
        target="_blank"
        className="block aspect-[4/3] rounded-lg p-3 bg-gray-50"
      ></a>
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col gap-0.5 flex-grow">
          <a href={url} target="_blank" className="block font-medium">
            {title}
          </a>
          <div className="text-sm text-gray-600">{description}</div>
        </div>
        <button
          className="text-red-500 text-sm flex-grow-0 flex-shrink-0 mb-1 opacity-60 hover:opacity-100 transition-opacity duration-100"
          onClick={deleteFile}
        >
          <span className="sr-only">Delete file</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
