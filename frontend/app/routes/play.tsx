import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ResizeButton from "~/components/game/ResizeButton";
import Navbar from "~/components/nav/Navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Play - PachinGO!` },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const play = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [exists, setExists] = useState(false);
  const navigate = useNavigate();
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
    (async () => {
      if (iframeRef.current) {
        // Prevents caching by adding a cache busting query parameter
        iframeRef.current.src = `/game/index.html?cacheBust=${Date.now()}`;
      }
      await checkLevelExists();
      localStorage.setItem("levelID", id!);
      localStorage.setItem("layout", "Level Editor Online");
      const game = document.getElementById("game");
      game?.scrollIntoView({ block: "start", behavior: "smooth" });
    })();
  }, []);

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

  const checkLevelExists = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        `/api/v1/level/loadLevel?levelID=${id}`,
      {
        method: "GET",
        mode: "cors",
      },
    );

    if (res.status === 200) {
      setExists(true);
      setIsLoading(false);
      await addPlayToLevel();
    } else {
      setExists(false);
      navigate("/error", { replace: true });
    }
  };

  const addPlayToLevel = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/level/addPlayToLevel`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ levelID: id }),
      },
    );

    const data = await res.json();
    if (!res.ok) console.error(data.message);
  };

  if (isLoading && !exists) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] dark:bg-[url('/pattern2_dark.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="flex-1 tracking-tighter min-h-screen">
          <div className="flex min-h-screen justify-center items-center">
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
            <ResizeButton gameSize={gameSize} setGameSize={setGameSize} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default play;
