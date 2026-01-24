"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";

// A menu that allows the user to change the site's theme
// between Light, Dark and System
export default function ThemeMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-1 border border-(--border) w-6 h-6 rounded-sm bg-(--background)" />
    );
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        className={
          showMenu
            ? "w-6 h-6 p-1 flex justify-center items-center border border-(--border-alt) bg-(--background-alt) text-(--foreground-alt) rounded-sm ease-linear duration-75 cursor-pointer"
            : "w-6 h-6 p-1 flex justify-center items-center border border-(--border) bg-(--background) hover:bg-(--background-alt) hover:text-(--foreground-alt) rounded-sm ease-linear duration-75 cursor-pointer"
        }
      >
        <ThemeIcon />
      </button>
      {showMenu && (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 1, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1, opacity: 0, y: -10 }}
            transition={{
              ease: "backOut",
              duration: 0.15,
            }}
            className="absolute -translate-x-1/2 left-1/2 mt-4 border border-(--border) w-20 rounded-sm p-2 z-10 bg-(--background)"
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l border-(--border) bg-(--background)" />
            <button
              type="button"
              onClick={() => {
                setTheme("light");
                setShowMenu(false);
              }}
              className="flex flex-row justify-between items-center mb-2 hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer w-full"
            >
              <p className="text-xs">Light</p>
              <FaSun size={12} />
            </button>

            <button
              type="button"
              onClick={() => {
                setTheme("dark");
                setShowMenu(false);
              }}
              className="flex flex-row justify-between items-center mb-2 hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer w-full"
            >
              <p className="text-xs">Dark</p>
              <FaMoon size={11} />
            </button>

            <button
              type="button"
              onClick={() => {
                setTheme("system");
                setShowMenu(false);
              }}
              className="flex flex-row justify-between items-center hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer w-full"
            >
              <p className="text-xs">System</p>
              <MdMonitor size={13} />
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function ThemeIcon() {
  const { theme } = useTheme();

  const icons = {
    light: <FaSun suppressHydrationWarning size={11} />,
    dark: <FaMoon suppressHydrationWarning size={11} />,
    system: <MdMonitor suppressHydrationWarning size={13} />,
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={theme}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.05,
        }}
        className="flex items-center justify-center"
      >
        {icons[theme as keyof typeof icons] || icons.system}
      </motion.div>
    </AnimatePresence>
  );
}
