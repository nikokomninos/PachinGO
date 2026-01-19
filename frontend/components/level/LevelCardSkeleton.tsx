export default function LevelCardSkeleton() {
  return (
    <div className="flex flex-row w-80 h-40 lg:w-100 lg:h-45 border border-(--border-alt) rounded-lg tracking-tight bg-(--background) cursor-pointer animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]">
      <div className="flex justify-center items-center bg-(--background-alt) ml-3 min-w-30 min-h-40 lg:min-w-40 lg:min-h-40 rounded-lg m-auto"></div>
      <div className="flex flex-col w-50 h-40 lg:w-60 lg:h-35 p-5">
        <div className="w-full h-5 mb-2 bg-(--background-alt) rounded-md"></div>
        <div className="w-full h-5 mb-2 bg-(--background-alt) rounded-md"></div>
        <div className="w-full h-25 mb-2 bg-(--background-alt) rounded-md"></div>
      </div>
    </div>
  );
}
