import { useState } from "react";
import { FaDisplay } from "react-icons/fa6";

const ResizeButton = ({
  gameSize,
  setGameSize,
}: {
  gameSize: Number[];
  setGameSize: Function;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleGameResize = (width: Number, height: Number) => {
    setGameSize([width, height]);
    const game = document.getElementById("game");
    game?.scrollIntoView({ block: "center", behavior: "smooth" });
    localStorage.setItem("gameSize", JSON.stringify({ width, height }));
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        className={
          showMenu
            ? "w-10 h-10 flex justify-center items-center bg-[var(--color-bg-alt)] border-1 border-[var(--color-border)] text-[var(--color-text-alt)] rounded-lg cursor-pointer ease-linear duration-75"
            : "w-10 h-10 flex justify-center items-center bg-[var(--color-bg)] hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text-alt)] border-1 border-[var(--color-border)] rounded-lg cursor-pointer ease-linear duration-75"
        }
      >
        <FaDisplay />
      </button>

      {showMenu && (
        <div className="absolute bottom-full -translate-x-1/2 mb-2 bg-[var(--color-bg)] border-1 border-[var(--color-border)] rounded-lg p-2 text-sm z-10">
          <div className="flex flex-col items-end gap-3">
            <button
              type="button"
              onClick={() => {
                handleGameResize(400, 300);
                setShowMenu(false);
              }}
              className={
                gameSize[0] === 400 && gameSize[1] === 300
                  ? "cursor-pointer text-[var(--color-text-alt)] ease-linear duration-75"
                  : "cursor-pointer hover:text-[var(--color-text-alt)] ease-linear duration-75"
              }
            >
              400x300 (0.5x)
            </button>
            <button
              type="button"
              onClick={() => {
                handleGameResize(800, 600);
                setShowMenu(false);
              }}
              className={
                gameSize[0] === 800 && gameSize[1] === 600
                  ? "cursor-pointer text-[var(--color-text-alt)] ease-linear duration-75"
                  : "cursor-pointer hover:text-[var(--color-text-alt)] ease-linear duration-75"
              }
            >
              800x600 (1x)
            </button>
            <button
              type="button"
              onClick={() => {
                handleGameResize(1200, 900);
                setShowMenu(false);
              }}
              className={
                gameSize[0] === 1200 && gameSize[1] === 900
                  ? "cursor-pointer text-[var(--color-text-alt)] ease-linear duration-75"
                  : "cursor-pointer hover:text-[var(--color-text-alt)] ease-linear duration-75"
              }
            >
              1200x900 (1.5x)
            </button>
            <button
              type="button"
              onClick={() => {
                handleGameResize(1600, 1200);
                setShowMenu(false);
              }}
              className={
                gameSize[0] === 1600 && gameSize[1] === 1200
                  ? "cursor-pointer text-[var(--color-text-alt)] ease-linear duration-75"
                  : "cursor-pointer hover:text-[var(--color-text-alt)] ease-linear duration-75"
              }
            >
              1600x1200 (2x)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResizeButton;
