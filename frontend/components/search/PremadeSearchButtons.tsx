import { FaClock, FaDice, FaHeart, FaPlayCircle } from "react-icons/fa";

// The multiple special searches located on all search pages
export default function PremadeSearchButtons() {
  return (
    <div className="flex md:flex-row md:justify-between gap-4">
      <a
        href="/search/name"
        className="flex gap-4 justify-center items-center w-full p-2 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 ease-linear duration-75 cursor-pointer rounded-lg text-sm hover:text-(--foreground-alt)"
      >
        <FaClock size={14} />
        <h1 className="hidden md:block">Recently Uploaded</h1>
      </a>

      <a
        href="/search/name?special=plays"
        className="flex gap-4 justify-center items-center w-full p-2 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 ease-linear duration-75 cursor-pointer rounded-lg text-sm hover:text-(--foreground-alt)"
      >
        <FaPlayCircle />
        <h1 className="hidden md:block">Most Played</h1>
      </a>

      <a
        href="/search/name?special=likes"
        className="flex gap-4 justify-center items-center w-full p-2 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 ease-linear duration-75 cursor-pointer rounded-lg text-sm hover:text-(--foreground-alt)"
      >
        <FaHeart />
        <h1 className="hidden md:block">Most Liked</h1>
      </a>

      <a
        href="/search/name?special=random"
        className="flex gap-4 justify-center items-center w-full p-2 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 ease-linear duration-75 cursor-pointer rounded-lg text-sm hover:text-(--foreground-alt)"
      >
        <FaDice size={16}/>
        <h1 className="hidden md:block">Random Level</h1>
      </a>
    </div>
  );
}
