import type { Metadata } from "next";
import PachinGO from "@/components/game/PachinGO";

export const metadata: Metadata = {
  title: "Play - PachinGO!",
  description: "Peggle Reborn",
};

export default async function Level({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col min-h-screen justify-center items-center">
        <PachinGO id={id}/>
      </div>
    </div>
  );
}
