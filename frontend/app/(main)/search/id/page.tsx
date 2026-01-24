// Page for level search by Level ID
/** biome-ignore-all lint/suspicious/noArrayIndexKey: Order never changes */

import { Suspense } from "react";
import LevelCard from "@/components/level/LevelCard";
import LevelCardSkeleton from "@/components/level/LevelCardSkeleton";
import type { Level } from "@/types/definitions";

/**
 * Gets the results of a Level ID search query
 *
 * @param query the search query (Level ID)
 */
async function getResults(query: string) {
  if (!query) return [];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search/searchLevelID?query=${query}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data;
}

/**
 * The rendered results list of a Level ID search query
 *
 * @param query the search query (Level ID)
 */
async function SearchResultsList({ query }: { query: string }) {
  const data = query ? await getResults(query) : { results: [] };

  const results: Level[] = data.results;

  if (results.length === 0)
    return (
      <h1 className="mt-10 text-center font-bold text-lg">No results found!</h1>
    );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-center flex-wrap gap-4 md:gap-6 mb-10">
        {results.map((r: Level) => (
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
        ))}
      </div>
    </div>
  );
}

export default async function SearchID({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query;
  const key = JSON.stringify(resolvedParams);

  return (
    <div>
      <Suspense key={key} fallback={<SearchSkeletonGrid />}>
        <SearchResultsList query={query} />
      </Suspense>
    </div>
  );
}

function SearchSkeletonGrid() {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-4 md:gap-6 mb-10">
      <LevelCardSkeleton />
    </div>
  );
}
