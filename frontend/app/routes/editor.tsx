import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import GuidelinesButton from "~/components/game/GuidelinesButton";
import ResizeButton from "~/components/game/ResizeButton";
import Navbar from "~/components/nav/Navbar";
import { useAuthStore } from "~/stores/useAuthStore";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Editor - PachinGO!` },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const editor = () => {
  const { user, checking } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [gameSize, setGameSize] = useState(() => {
    const saved = localStorage.getItem("gameSize");
    if (!saved) return [800, 600];

    try {
      const { width, height } = JSON.parse(saved);
      return [width || 800, height || 600];
    } catch {
      return [800, 600];
    }
  });

  useEffect(() => {
    if (checking) return;
    if (!user) navigate("/login", { replace: true });
    if (iframeRef.current) {
      // Prevents caching by adding a cache busting query parameter
      iframeRef.current.src = `/game/index.html?cacheBust=${Date.now()}`;
    }
    setIsLoading(false);
    localStorage.setItem("layout", "Level Editor");
  }, [user, checking]);

  // Redirect to play page when upload is complete
  useEffect(() => {
    const checkUploadStatus = () => {
      const value = localStorage.getItem("uploaded");
      if (value === "true") {
        localStorage.setItem("uploaded", "false");
        navigate(`/play/${localStorage.getItem("levelID")}`);
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
  }, [navigate]);

  useEffect(() => {
    const game = document.getElementById("game");
    game?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [isLoading]);

  // Ensure that arrow keys do not follow
  // normal browser behavior when game
  // is focused
  useEffect(() => {
    const iframe = iframeRef.current;
    iframe?.contentWindow?.addEventListener("keydown", (e) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (keys.includes(e.key)) e.preventDefault();
    });

    iframe?.addEventListener("click", () => iframe.contentWindow?.focus());
    iframe?.addEventListener("mouseover", () => iframe.contentWindow?.focus());
  });

  if (isLoading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] dark:bg-[url('/pattern2_dark.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="flex-1 tracking-tighter min-h-screen">
          <div className="flex flex-col min-h-screen justify-center items-center">
            <iframe
              id="game"
              title="game"
              ref={iframeRef}
              src="/game/index.html"
              width={gameSize[0]}
              height={gameSize[1]}
              className="drop-shadow-2xl dark:drop-shadow-neutral-800"
              tabIndex={0}
              allow="keyboard"
            />
          </div>
          <div className="flex flex-row justify-end p-5 gap-2">
            <GuidelinesButton />
            <ResizeButton gameSize={gameSize} setGameSize={setGameSize} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default editor;
