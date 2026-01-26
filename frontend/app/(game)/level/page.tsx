// The page for playing a level; will show a notFound error
// if the level does not exist

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PachinGO from "@/components/game/PachinGO";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await searchParams;
  const level = await checkLevelExists(id);
  if (level) return { title: `${level} - PachinGO!` };
  else return {title: "Play - PachinGO!"}
}

/**
 * checkLevelExists - The server checks if a level exists.
 * If it does, load the game in with the level. Otherwise,
 * display a notFound error.
 */
async function checkLevelExists(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/level/loadLevel?levelID=${id}`,
    { cache: "no-store" },
  );

  if (res.status === 204) return null;
  else {
    const data = await res.json();
    const name = (data.level.name);
    const finalName = name.length > 20 ? `${name.slice(0, 20)}...` : name;
    return finalName;
  }
}

export default async function Level({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const resolvedParams = await searchParams;
  const id = resolvedParams.id;
  const exists = await checkLevelExists(id);

  if (exists)
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col min-h-screen justify-center items-center">
          <PachinGO id={id} />
        </div>
      </div>
    );
  else notFound();
}
