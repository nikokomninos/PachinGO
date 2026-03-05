"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ResizeButton from "@/components/game/ResizeButton";
import GuidelinesButton from "./GuidelinesButton";

/**
 * The main game component. Holds the game's iframe
 * and various game settings
 *
 * @param id A Level ID. If empty, the game is in editor mode.
 * If not empty, the game is in play mode
 */
export default function PachinGO({ id }: { id: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [gameSize, setGameSize] = useState<number[]>([]);
  const [gameLoaded, setGameLoaded] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  // Prevents the arrow keys from scrolling the page, and instead
  // allows them to function as in-game controls for the level editor
  useEffect(() => {
    const iframe = iframeRef.current;
    iframe?.contentWindow?.addEventListener("keydown", (e) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (keys.includes(e.key)) e.preventDefault();
    });

    iframe?.addEventListener("click", () => iframe.contentWindow?.focus());
    iframe?.addEventListener("mouseover", () => iframe.contentWindow?.focus());
  });

  // Sets various game variables through localStorage
  useEffect(() => {
    if (id) localStorage.setItem("levelID", id);

    setGameLoaded(true);

    if (pathname.endsWith("/editor"))
      localStorage.setItem("layout", "Level Editor");
    else localStorage.setItem("layout", "Level Editor Online");

    const saved = localStorage.getItem("gameSize");
    if (!saved) setGameSize([800, 600]);

    try {
      if (saved) {
        const { width, height } = JSON.parse(saved);
        setGameSize([width || 800, height || 600]);
      }
    } catch {
      setGameSize([800, 600]);
    }

    // On the editor page, this function run on an interval
    // to check if a user has uploaded a level. If they have,
    // they will be redirected to the newly uploaded level page
    if (pathname.endsWith("/editor")) {
      const checkUploadStatus = () => {
        const value = localStorage.getItem("uploaded");
        if (value === "true") {
          localStorage.setItem("uploaded", "false");
          router.push(`/level/?id=${localStorage.getItem("levelID")}`);
        }
      };

      const interval = setInterval(checkUploadStatus, 500);

      const handleStorage = (event: StorageEvent) => {
        if (event.key === "uploaded" && event.newValue === "true") {
          checkUploadStatus();
        }
      };
      window.addEventListener("storage", handleStorage);

      return () => {
        clearInterval(interval);
        window.removeEventListener("storage", handleStorage);
      };
    }
  }, [router, pathname, id]);

  // Scrolls the game into view on page load
  useEffect(() => {
    const game = document.getElementById("game");
    if (gameLoaded) {
      game?.scrollIntoView({ block: "start", behavior: "smooth" });
      game?.click();
      game?.focus();
    }
  }, [gameLoaded]);

  if (!gameLoaded) return null;

  return (
    <div>
      <iframe
        id="game"
        title="game"
        ref={iframeRef}
        src="/game/index.html"
        width={gameSize[0]}
        height={gameSize[1]}
        className="mb-6 rounded-md"
        allow="keyboard"
      />
      <div className="flex justify-end gap-4">
        {pathname.endsWith("/editor") ? <GuidelinesButton /> : null}
        <ResizeButton gameSize={gameSize} setGameSize={setGameSize} />
      </div>
    </div>
  );
}
