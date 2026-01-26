// Page for level search by Level Name
/** biome-ignore-all lint/suspicious/noArrayIndexKey: Order never changes */

import type { Metadata } from "next";
import { Suspense } from "react";
import LevelCard from "@/components/level/LevelCard";
import LevelCardSkeleton from "@/components/level/LevelCardSkeleton";
import PageSelect from "@/components/search/PageSelect";
import type { Level } from "@/types/definitions";

/**
 * Gets the results of a Level Name search query
 *
 * @param query the search query (Level Name)
 * @param page the page to pull from the results
 * @param limit the number of search results to show on page
 * @param sort how the results are sorted by (DATE, NAME, etc.)
 * @param order how the results are ordered by (ASC, DESC)
 */
async function getResults(
  query: string,
  page: string,
  limit: string,
  sort: string,
  order: string,
) {
  if (!query) return [];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search/searchLevelName?query=${query}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data;
}

/**
 * Retrieves the results of a special search
 * (i.e. "Most Played" & "Most Liked")
 *
 * @param query the search query (Level Name)
 * @param page the page to pull from the results
 * @param limit the number of search results to show on page
 */
async function getSpecialSearch(type: string, page: string, limit: string) {
  if (type === "plays") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search/getMostPlayedLevels?page=${page}&limit=${limit}`,
      { cache: "no-store" },
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data;
  }

  if (type === "likes") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search/getMostLikedLevels?page=${page}&limit=${limit}`,
      { cache: "no-store" },
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data;
  }

  if (type === "random") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search/getRandomLevel?page=${page}&limit=${limit}`,
      { cache: "no-store" },
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data;
  }
}

/**
 * Retrieves the most recent levels, which are what are shown
 * by default on first page load if no query is present
 *
 * @param page the page to pull from the results
 * @param limit the number of search results to show on page
 */
async function getRecent(page: string, limit: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search/getRecentLevels?page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data;
}

/**
 * The rendered results list of a Level Name search query
 *
 * @param query the search query (Level Name)
 * @param page the page to pull from the results
 * @param limit the number of search results to show on page
 * @param sort how the results are sorted by (DATE, NAME, etc.)
 * @param order how the results are ordered by (ASC, DESC)
 */
async function SearchResultsList({
  query,
  page,
  limit,
  sort,
  order,
  special,
}: {
  query: string;
  page: string;
  limit: string;
  sort: string;
  order: string;
  special: string;
}) {
  const data = query
    ? await getResults(query, page, limit, sort, order)
    : special
      ? await getSpecialSearch(special, page, limit)
      : await getRecent(page, limit);

  const results: Level[] = data.results;
  const total: number = data.total;
  const totalPages: number = data.totalPages;

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
      <PageSelect page={Number(page) || 1} totalPages={totalPages} />

      <h1 className="text-center text-xs mb-4 md:mb-6 border border-(--border) px-2 py-1 rounded-lg bg-(--background-alt)">
        {results.length === 0 ? "0" : +limit * (+page - 1) || "1"} -{" "}
        {results.length + +limit > total
          ? results.length
          : +limit * +page > total
            ? total
            : +limit * +page}{" "}
        of {total}
      </h1>
    </div>
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ query: string, page: string, special: string }>;
}): Promise<Metadata> {
  const { query, page, special } = await searchParams;
  let specialTitle = "";
  switch (special) {
    case "plays": specialTitle = "Most Played Levels"; break;
    case "likes": specialTitle = "Most Liked Levels"; break;
    case "random": specialTitle = "Random Level"; break;
  }
  if (query && !special) return { title: `Results for "${query}" - Page ${page || "1"} - PachinGO!` };
  else if (special) return { title: `${specialTitle} - Page ${page || "1"} - PachinGO!`};
  else return { title: `Search Level - Page ${page || "1"} - PachinGO!`};
}

export default async function SearchName({
  searchParams,
}: {
  searchParams: Promise<{
    query: string;
    page: string;
    limit: string;
    sort: string;
    order: string;
    special: string;
  }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query;
  const page = resolvedParams.page || "1";
  const limit = resolvedParams.limit || "25";
  const sort = resolvedParams.sort || "date";
  const order = resolvedParams.order || "desc";
  const special = resolvedParams.special;
  const key = JSON.stringify(resolvedParams);

  return (
    <div>
      <Suspense key={key} fallback={<SearchSkeletonGrid />}>
        <SearchResultsList
          query={query}
          page={page}
          limit={limit}
          sort={sort}
          order={order}
          special={special}
        />
      </Suspense>
    </div>
  );
}

function SearchSkeletonGrid() {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-4 md:gap-6 mb-10">
      {[...Array(20)].map((_, i) => (
        <LevelCardSkeleton key={i} />
      ))}
    </div>
  );
}
