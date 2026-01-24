// Page for user search
/** biome-ignore-all lint/suspicious/noArrayIndexKey: Order never changes */

import { Suspense } from "react";
import PageSelect from "@/components/search/PageSelect";
import UserCard from "@/components/user/UserCard";
import UserCardSkeleton from "@/components/user/UserCardSkeleton";
import type { PachUser } from "@/types/definitions";

/**
 * Gets the results of a User search query
 *
 * @param query the search query (User)
 * @param page the page to pull from the results
 * @param limit the number of search results to show on page
 * @param order how the results are ordered by (ASC, DESC)
 */
async function getResults(
  query: string,
  page: string,
  limit: string,
  order: string,
) {
  if (!query) return [];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search/searchUsers?query=${query}&page=${page}&limit=${limit}&order=${order}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data;
}

/**
 * Retrieves the most recent users, which are what are shown
 * by default on first page load if no query is present
 *
 * @param page the page to pull from the results
 * @param limit the number of search results to show on page
 */
async function getRecent(page: string, limit: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search/getRecentUsers?page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data;
}

/**
 * The rendered results list of a User search query
 *
 * @param query the search query (User)
 * @param page the page to pull from the results
 * @param limit the number of search results to show on page
 * @param order how the results are ordered by (ASC, DESC)
 */
async function SearchResultsList({
  query,
  page,
  limit,
  order,
}: {
  query: string;
  page: string;
  limit: string;
  order: string;
}) {
  const data = query
    ? await getResults(query, page, limit, order)
    : await getRecent(page, limit);

  const results: PachUser[] = data.results;
  const total: number = data.total;
  const totalPages: number = data.totalPages;

  if (results.length === 0)
    return (
      <h1 className="mt-10 text-center font-bold text-lg">No results found!</h1>
    );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-center flex-wrap gap-4 md:gap-6 mb-10">
        {results.map((r: PachUser) => (
          <UserCard key={r.name} name={r.name} role={r.role} />
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

export default async function SearchName({
  searchParams,
}: {
  searchParams: Promise<{
    query: string;
    page: string;
    limit: string;
    sort: string;
    order: string;
  }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query;
  const page = resolvedParams.page || "1";
  const limit = resolvedParams.limit || "25";
  const order = resolvedParams.order || "desc";
  const key = JSON.stringify(resolvedParams);

  return (
    <div>
      <Suspense key={key} fallback={<SearchSkeletonGrid />}>
        <SearchResultsList
          query={query}
          page={page}
          limit={limit}
          order={order}
        />
      </Suspense>
    </div>
  );
}

function SearchSkeletonGrid() {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-4 md:gap-6 mb-10">
      {[...Array(75)].map((_, i) => (
        <UserCardSkeleton key={i} />
      ))}
    </div>
  );
}
