// The page for the level editor; cannot be accessed unless logged in

import type { Metadata } from "next";
import PachinGO from "@/components/game/PachinGO";

export const metadata: Metadata = {
  title: "Editor - PachinGO!",
  description: "Ready to become a PachinGOD?",
};

export default function Editor() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col min-h-screen justify-center items-center">
        <PachinGO id={""} />
      </div>
    </div>
  );
}
