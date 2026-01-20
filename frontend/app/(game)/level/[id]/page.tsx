import type { Metadata } from "next";
import PachinGO from "@/components/game/PachinGO";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Play - PachinGO!",
  description: "Peggle Reborn",
};

async function checkLevelExists(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/level/loadLevel?levelID=${id}`,
    { cache: "no-store" },
  );

  if (res.status === 204) return false;
  else return true;
}

export default async function Level({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
