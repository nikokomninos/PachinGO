// Page for a user's public profile
/** biome-ignore-all lint/suspicious/noArrayIndexKey: Order never changes */

import { notFound } from "next/navigation";
import { Suspense } from "react";
import LevelCard from "@/components/level/LevelCard";
import LevelCardSkeleton from "@/components/level/LevelCardSkeleton";
import UserBox from "@/components/user/UserBox";
import type { Level } from "@/types/definitions";

/**
 * Gets a user's info / checks if they exist. If they exist,
 * return their data, otherwise return null
 *
 * @param name the user's name
 */
async function getUser(name: string) {
  if (!name) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/getUser?name=${name}`,
    { cache: "no-store" },
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

/**
 * Gets a user's levels.
 *
 * @param name the user's name
 */
async function getUserLevels(name: string) {
  if (!name) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/getUserLevels?name=${name}`,
    { cache: "no-store" },
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data.results;
}

/**
 * The rendered results list of a user's levels after fetching
 *
 * @param name the user's name
 */
async function UserLevelsList({ name }: { name: string }) {
  const levels: Level[] = await getUserLevels(name);

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {levels.length > 0 ? (
        levels.map((r: Level) => (
          <LevelCard
            key={r.levelID}
            id={r.levelID}
            name={r.name}
            author={r.author}
            desc={r.description}
            thumbnail={
              r.thumbnail
                ? `${process.env.NEXT_PUBLIC_R2_URL}/${r.thumbnail}`
                : "/thumbnail.jpg"
            }
            plays={r.plays}
            likes={r.likes}
            dateUploaded={new Date(r.dateUploaded)}
            numPegs={Object.keys(r.pegLayout.data).length}
            numOrange={r.numOrange}
            numBalls={r.numBalls}
            hasBackground={r.backgroundImage !== "N/A" ? "Yes" : "No"}
            hasMusic={r.backgroundMusic !== "N/A" ? "Yes" : "No"}
          />
        ))
      ) : (
        <h1 className="text-xl text-center">
          This user has not uploaded any levels yet.
        </h1>
      )}
    </div>
  );
}

export default async function User({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const data = await getUser(name);
  if (!data) notFound();

  const username = data.user.name;
  const dateJoined = data.user.createdAt;
  const role = data.userInfo.role;

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6">
      <UserBox username={username} dateJoined={dateJoined} role={role} />
      <Suspense fallback={<LevelsSkeletonGrid />}>
        <UserLevelsList name={username} />
      </Suspense>
    </div>
  );
}

function LevelsSkeletonGrid() {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-4 md:gap-6 mb-10">
      {[...Array(20)].map((_, i) => (
        <LevelCardSkeleton key={i} />
      ))}
    </div>
  );
}
