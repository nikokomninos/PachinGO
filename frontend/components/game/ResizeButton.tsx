"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { GiResize } from "react-icons/gi";

export default function ResizeButton({
  gameSize,
  setGameSize,
}: {
  gameSize: number[];
  setGameSize: Function;
}) {
  const handleGameResize = (width: number, height: number) => {
    setGameSize([width, height]);
    const game = document.getElementById("game");
    game?.scrollIntoView({ block: "center", behavior: "smooth" });
    localStorage.setItem("gameSize", JSON.stringify({ width, height }));
  };
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        className={
          showMenu
            ? "flex justify-center items-center w-10 h-10 border border-(--border-alt) bg-(--background-alt) text-(--foreground-alt) rounded-lg cursor-pointer ease-linear duration-75"
            : "flex justify-center items-center w-10 h-10 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt) hover:text-(--foreground-alt) rounded-lg cursor-pointer ease-linear duration-75"
        }
      >
        <GiResize size={18}/>
      </button>

      {showMenu && (
        <motion.div
          initial={{ scale: 1, opacity: 0, x: -10 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ scale: 1, opacity: 0, x: -10 }}
          transition={{
            ease: "backOut",
            duration: 0.15,
          }}
          className="absolute left-full bottom-0 ml-6 bg-(--background) border border-(--border) rounded-lg p-2 text-sm z-10"
        >
          <div className="absolute bottom-2 left-0 -translate-x-1/2 w-3 h-3 rotate-315 border-t border-l border-(--border) bg-(--background)" />
          <div className="flex flex-col items-end gap-3">
            <ResizeButtonOption
              handleGameResize={handleGameResize}
              setShowMenu={setShowMenu}
              gameSize={gameSize}
              width={400}
              height={300}
              scale={0.5}
            />
            <ResizeButtonOption
              handleGameResize={handleGameResize}
              setShowMenu={setShowMenu}
              gameSize={gameSize}
              width={800}
              height={600}
              scale={1}
            />
            <ResizeButtonOption
              handleGameResize={handleGameResize}
              setShowMenu={setShowMenu}
              gameSize={gameSize}
              width={1200}
              height={900}
              scale={1.5}
            />
            <ResizeButtonOption
              handleGameResize={handleGameResize}
              setShowMenu={setShowMenu}
              gameSize={gameSize}
              width={1600}
              height={1200}
              scale={2}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ResizeButtonOption({
  handleGameResize,
  setShowMenu,
  gameSize,
  width,
  height,
  scale,
}: {
  handleGameResize: Function;
  setShowMenu: Function;
  gameSize: number[];
  width: number;
  height: number;
  scale: number;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        handleGameResize(width, height);
        setShowMenu(false);
      }}
      className={
        gameSize[0] === width && gameSize[1] === height
          ? "cursor-pointer text-(--foreground-alt) ease-linear duration-75"
          : "cursor-pointer hover:text-(--foreground-alt) ease-linear duration-75"
      }
    >
      {width}x{height} ({scale}x)
    </button>
  );
}
