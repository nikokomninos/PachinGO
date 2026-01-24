"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

// The page selection component located at the bottom of a search
export default function PageSelect({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handlePageChange = (page: number) => {
    const currentParams = new URLSearchParams(params.toString());
    currentParams.set("page", page.toString());

    router.push(`${pathname}?${currentParams.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const currentParams = new URLSearchParams(params.toString());
      const input = document.getElementById("pageInput") as HTMLInputElement;

      // Prevent all invalid input types
      if (Number.isNaN(+input.value)) return;
      else currentParams.set("page", input.value.toString());

      if (Number(input.value) < 1) currentParams.set("page", "1");
      if (Number(input.value) > totalPages)
        currentParams.set("page", totalPages.toString());

      router.push(`${pathname}?${currentParams.toString()}`);
    }
  };

  return (
    <div className="flex flex-row justify-evenly p-3 gap-3 text-(--foreground) font-semibold rounded-3xl">
      <button
        type="button"
        onClick={() => {
          handlePageChange(page - 1);
        }}
        className={
          page === 1
            ? "hidden"
            : "px-2 border border-(--border) rounded-lg hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer bg-(--background-alt) hover:bg-(--background-alt)/50"
        }
      >
        <FaCaretLeft />
      </button>

      <input
        type="text"
        id="pageInput"
        defaultValue={page.toString()}
        className="w-10 text-center border border-(--border) rounded-lg bg-(--background-alt) focus:bg-(--background-alt)/50 focus:outline-none focus:ring-2 focus:ring-(--border-alt) ease-linear duration-75"
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <button
        type="button"
        onClick={() => {
          handlePageChange(page + 1);
          page += 1;
        }}
        className={
          page === totalPages
            ? "hidden"
            : "px-2 border border-(--border) rounded-lg hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer bg-(--background-alt) hover:bg-(--background-alt)/50"
        }
      >
        <FaCaretRight />
      </button>
    </div>
  );
}
