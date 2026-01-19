"use client";

import { motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAmountDown } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";

export default function FilterTypes() {
  return (
    <div className="flex gap-4">
      <SortBy />
      <OrderBy />
      <LimitBy />
    </div>
  );
}

function SortBy() {
  const [showMenu, setShowMenu] = useState(false);

  const params = useSearchParams();
  const pathname = usePathname();
  const [sort, setSort] = useState("Date");

  useEffect(() => {
    if (!params.get("sort") && pathname.endsWith("/name")) {
      setSort("Date");
      return;
    }
    if (!params.get("sort") && pathname.endsWith("/user")) {
      setSort("Name");
      return;
    }
    if (pathname.endsWith("/id")) {
      setSort("");
      return;
    }

    setSort(
      params.get("sort")!.charAt(0).toUpperCase() +
        params.get("sort")?.slice(1),
    );
  }, [params, pathname]);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        className={
          showMenu
            ? "flex justify-center items-center p-2 w-10 h-10 border border-(--border-alt) bg-(--background-alt)/50 text-(--foreground-alt) rounded-lg cursor-pointer ease-linear duration-75"
            : "flex justify-center items-center p-2 w-10 h-10 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) rounded-lg cursor-pointer ease-linear duration-75"
        }
      >
        <FaSortAmountDown />
      </button>
      {showMenu && (
        <motion.div
          initial={{ scale: 1, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1, opacity: 0, y: -10 }}
          transition={{
            ease: "backOut",
            duration: 0.15,
          }}
          className="absolute left-1/2 -translate-x-1/2 top-14 border border-(--border) w-30 rounded-sm p-2 z-10 bg-(--background) text-(--foreground)"
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l border-(--border) bg-(--background)" />
          <h1 className="text-sm text-center font-bold mb-2">Sort By</h1>
          {params.get("query") && !pathname.endsWith("/id") ? (
            <div className="flex flex-col gap-1">
              {!pathname.endsWith("/user") ? (
                <SortByButton
                  value={"Date"}
                  currentSort={sort}
                  setShowMenu={setShowMenu}
                />
              ) : null}
              <SortByButton
                value={"Name"}
                currentSort={sort}
                setShowMenu={setShowMenu}
              />
              {!pathname.endsWith("/user") ? (
                <SortByButton
                  value={"Plays"}
                  currentSort={sort}
                  setShowMenu={setShowMenu}
                />
              ) : null}

              {!pathname.endsWith("/user") ? (
                <SortByButton
                  value={"Likes"}
                  currentSort={sort}
                  setShowMenu={setShowMenu}
                />
              ) : null}
            </div>
          ) : (
            <h1 className="text-xs text-center">N/A</h1>
          )}
        </motion.div>
      )}
    </div>
  );
}

function SortByButton({
  value,
  currentSort,
  setShowMenu,
}: {
  value: string;
  currentSort: string;
  setShowMenu: Function;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleClick = () => {
    const currentParams = new URLSearchParams(params.toString());
    currentParams.set("sort", value.toLowerCase());

    router.push(`${pathname}?${currentParams.toString()}`);
    setShowMenu(false);
  };

  return (
    <button
      type="button"
      onClick={() => {
        handleClick();
      }}
      className={
        value === currentSort || !currentSort
          ? "text-sm font-extrabold cursor-pointer hover:text-(--foreground-alt) ease-linear duration-75"
          : "text-sm cursor-pointer hover:text-(--foreground-alt) ease-linear duration-75"
      }
    >
      {value === currentSort ? "-> " : ""}
      {value}
    </button>
  );
}

function OrderBy() {
  const [showMenu, setShowMenu] = useState(false);

  const params = useSearchParams();
  const pathname = usePathname();
  const [order, setOrder] = useState("Desc");

  useEffect(() => {
    if (!params.get("order")) setOrder("Desc");
    else
      setOrder(
        params.get("order")!.charAt(0).toUpperCase() +
          params.get("order")?.slice(1),
      );
  }, [params]);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        className={
          showMenu
            ? "flex justify-center items-center p-2 w-10 h-10 border border-(--border-alt) bg-(--background-alt)/50 text-(--foreground-alt) rounded-lg cursor-pointer ease-linear duration-75"
            : "flex justify-center items-center p-2 w-10 h-10 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) rounded-lg cursor-pointer ease-linear duration-75"
        }
      >
        <FaSortAlphaDown />
      </button>
      {showMenu && (
        <motion.div
          initial={{ scale: 1, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1, opacity: 0, y: -10 }}
          transition={{
            ease: "backOut",
            duration: 0.15,
          }}
          className="absolute left-1/2 -translate-x-1/2 top-14 border border-(--border) w-30 rounded-sm p-2 z-10 bg-(--background) text-(--foreground)"
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l border-(--border) bg-(--background)" />
          <h1 className="text-sm text-center font-bold mb-2">Order By</h1>
          {params.get("query") && !pathname.endsWith("/id") ? (
            <div className="flex flex-col gap-1">
              <OrderByButton
                value={"Asc"}
                currentOrder={order}
                setShowMenu={setShowMenu}
              />
              <OrderByButton
                value={"Desc"}
                currentOrder={order}
                setShowMenu={setShowMenu}
              />
            </div>
          ) : (
            <h1 className="text-xs text-center">N/A</h1>
          )}
        </motion.div>
      )}
    </div>
  );
}

function OrderByButton({
  value,
  currentOrder,
  setShowMenu,
}: {
  value: string;
  currentOrder: string;
  setShowMenu: Function;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleClick = () => {
    const currentParams = new URLSearchParams(params.toString());
    currentParams.set("order", value.toLowerCase());

    router.push(`${pathname}?${currentParams.toString()}`);
    setShowMenu(false);
  };

  return (
    <button
      type="button"
      onClick={() => {
        handleClick();
      }}
      className={
        value === currentOrder || !currentOrder
          ? "text-sm font-extrabold cursor-pointer hover:text-(--foreground-alt) ease-linear duration-75"
          : "text-sm cursor-pointer hover:text-(--foreground-alt) ease-linear duration-75"
      }
    >
      {value === currentOrder ? "-> " : ""}
      {value}
    </button>
  );
}

function LimitBy() {
  const [showMenu, setShowMenu] = useState(false);

  const params = useSearchParams();
  const pathname = usePathname();
  const [limit, setLimit] = useState(25);

  useEffect(() => {
    setLimit(Number(params.get("limit") || 25));
  }, [params]);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        className={
          showMenu
            ? "flex justify-center items-center p-2 w-10 h-10 border border-(--border-alt) bg-(--background-alt)/50 text-(--foreground-alt) rounded-lg cursor-pointer ease-linear duration-75"
            : "flex justify-center items-center p-2 w-10 h-10 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) rounded-lg cursor-pointer ease-linear duration-75"
        }
      >
        <MdNumbers size={18} />
      </button>
      {showMenu && (
        <motion.div
          initial={{ scale: 1, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1, opacity: 0, y: -10 }}
          transition={{
            ease: "backOut",
            duration: 0.15,
          }}
          className="absolute left-1/2 -translate-x-1/2 top-14 border border-(--border) w-30 rounded-sm p-2 z-10 bg-(--background) text-(--foreground)"
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l border-(--border) bg-(--background)" />
          <h1 className="text-sm text-center font-bold mb-2">Limit By</h1>
          {!pathname.endsWith("/id") ? (
            <div className="flex flex-col gap-1">
              <LimitByButton
                value={10}
                currentLimit={limit}
                setShowMenu={setShowMenu}
              />
              <LimitByButton
                value={25}
                currentLimit={limit}
                setShowMenu={setShowMenu}
              />
              <LimitByButton
                value={50}
                currentLimit={limit}
                setShowMenu={setShowMenu}
              />
              <LimitByButton
                value={75}
                currentLimit={limit}
                setShowMenu={setShowMenu}
              />{" "}
            </div>
          ) : (
            <h1 className="text-xs text-center">N/A</h1>
          )}
        </motion.div>
      )}
    </div>
  );
}

function LimitByButton({
  value,
  currentLimit,
  setShowMenu,
}: {
  value: number;
  currentLimit: number;
  setShowMenu: Function;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleClick = () => {
    const currentParams = new URLSearchParams(params.toString());
    currentParams.set("limit", value.toString());

    router.push(`${pathname}?${currentParams.toString()}`);
    setShowMenu(false);
  };

  return (
    <button
      type="button"
      onClick={() => {
        handleClick();
      }}
      className={
        value === currentLimit || !currentLimit
          ? "text-sm font-extrabold cursor-pointer hover:text-(--foreground-alt) ease-linear duration-75"
          : "text-sm cursor-pointer hover:text-(--foreground-alt) ease-linear duration-75"
      }
    >
      {value === currentLimit ? "-> " : ""}
      {value}
    </button>
  );
}
