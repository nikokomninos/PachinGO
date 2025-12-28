/**
 * Pagination.tsx
 *
 * A component that builds a page selector
 */

import { useEffect } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const Pagination = ({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: Function;
}) => {
  useEffect(() => {
    (document.getElementById("pageInput") as HTMLInputElement)!.value =
      page.toString();
  }, [page]);

  /* Handles hitting enter in the page number input box.
   *
   * Checks for invalid input, such as input containing
   * letters, or input that is below or above the max
   * number of pages for the search query
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = document.getElementById("pageInput") as HTMLInputElement;
      if (isNaN(+input.value)) return;
      else page = +input.value;

      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;

      setPage(
        ((document.getElementById("pageInput") as HTMLInputElement)!.value =
          page.toString()),
      );
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex flex-row justify-evenly gap-3 p-3 border-1 border-[var(--color-border)] text-[var(--color-text)] font-semibold tracking-tight rounded-3xl">
      <button
        type="button"
        onClick={() => {
          setPage(page - 1);
          page -= 1;
          (document.getElementById("pageInput") as HTMLInputElement)!.value =
            page.toString();
        }}
        className={
          page === 1
            ? "hidden"
            : "hover:text-[var(--color-text-alt)] ease-linear duration-75 cursor-pointer"
        }
      >
        <FaCaretLeft />
      </button>

      <input
        type="text"
        id="pageInput"
        defaultValue={page.toString()}
        className="w-10 text-center border-1 border-[var(--color-border)] rounded-lg"
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <button
        type="button"
        onClick={() => {
          setPage(page + 1);
          page += 1;
          (document.getElementById("pageInput") as HTMLInputElement)!.value =
            page.toString();
        }}
        className={
          page === totalPages
            ? "hidden"
            : "hover:text-[var(--color-text-alt)] ease-linear duration-75 cursor-pointer"
        }
      >
        <FaCaretRight />
      </button>
    </div>
  );
};

export default Pagination;
