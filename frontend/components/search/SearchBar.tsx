"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { VscSearch } from "react-icons/vsc";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    router.push(`${pathname}/?query=${encodeURIComponent(term)}&page=1`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          defaultValue={params.get("query") || ""}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="flex w-full h-10 p-2 border border-(--border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--border-alt) ease-linear duration-75 bg-(--background-alt) focus:bg-(--background-alt)/50"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-(--foreground) hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer"
        >
          <VscSearch />
        </button>
      </div>
    </div>
  );
}
