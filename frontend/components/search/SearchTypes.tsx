"use client"

import { usePathname } from "next/navigation";

export default function SearchTypes() {
  return (
    <div className="flex gap-4">
      <SearchTypeButton type="Level Name" link="/search/name" />
      <SearchTypeButton type="Level ID" link="/search/id" />
      <SearchTypeButton type="User" link="/search/user" />
    </div>
  );
}

function SearchTypeButton({ type, link }: { type: string; link: string }) {
  const pathname = usePathname();

  return (
    <a
      href={link}
      className={
        pathname === link
          ? "text-sm w-25 h-10 text-center font-bold border border-(--border-alt) rounded-lg p-2 bg-(--background-alt)/50 ease-linear duration-75"
          : "text-sm w-25 h-10 text-center border border-(--border) rounded-lg p-2 bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) ease-linear duration-75"
      }
    >
      {type}
    </a>
  );
}
