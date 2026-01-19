export default function UserCardSkeleton() {
  return (
    <div className="flex flex-row items-center w-50 h-15 p-2 rounded-lg border border-(--border-alt) animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]">
      <div className="flex justify-center items-center w-15 h-10 rounded-lg border border-(--border-alt) mr-3"></div>
      <div className="flex justify-center items-center w-full bg-(--background-alt)"></div>
    </div>
  );
}
