export function Loading() {
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <img
        className="w-16 h-16 opacity-20"
        src="https://liveblocks.io/loading.svg"
        alt="Loading"
      />
    </div>
  );
}
