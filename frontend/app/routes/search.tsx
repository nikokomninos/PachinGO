/**
 * search.tsx
 *
 * A route for the search page. Contains logic
 * for searching a level, and setting the params
 * in the URL to create a reproducible search
 */


import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import LevelCard from "~/components/level/LevelCard";
import Footer from "~/components/nav/Footer";
import Navbar from "~/components/nav/Navbar";
import FilterBox from "~/components/search/FilterBox";
import Pagination from "~/components/search/Pagination";
import PremadeSearchButtons from "~/components/search/PremadeSearchButtons";
import SearchBar from "~/components/search/SearchBar";
import UserCard from "~/components/user/UserCard";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search - PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const Search = () => {
  // Search params in URL, to create a reproducible search
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTerm = searchParams.get("term") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialSearchType = searchParams.get("searchType") || "levelName";
  const initialSortType = searchParams.get("sortType") || "date";
  const initialSortOrderType = searchParams.get("sortOrderType") || "desc";
  const initialLimit = searchParams.get("limit") || "25";

  const [term, setTerm] = useState(initialTerm);
  const [results, setResults] = useState<any>([]);
  const [page, setPage] = useState(initialPage);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchType, setSearchType] = useState(initialSearchType);
  const [sortType, setSortType] = useState(initialSortType);
  const [sortOrderType, setSortOrderType] = useState(initialSortOrderType);
  const [limit, setLimit] = useState(initialLimit);

  /* Handles what happens when this route is initially
   * opened.
   *
   * If a term is provided in the URL, but not
   * a page, automatically append "&page=1" to the URL
   * on render, to make a proper search.
   *
   * If no term is provided, load the most
   * recently uploaded levels to have presented
   * to the user
   */
  useEffect(() => {
    //if (!term && searchType === "levelName") handleSearch("$recent$", 1);
  }, []);

  /* Handles what happens when the search type
   * is changed.
   *
   * Set a default sort and order type for when
   * the search type is changed. Prevents invalid
   * searches for search types that might not
   * have the sort or order type the user
   * searched with
   */
  useEffect(() => {
    if (searchType === "levelName") {
      setSortType("date");
      setSortOrderType("desc");
      setTerm("$recent$");
      setSearchParams(
        {
          term: "$recent$",
          page: "1",
          limit,
          searchType,
          sortType,
          sortOrderType,
        },
        { replace: true },
      );
      //handleSearch("$recent$", 1);
    }
    if (searchType === "levelID") {
      setTerm("");
      setSearchParams(
        { term: "", page: "1", limit, searchType, sortType, sortOrderType },
        { replace: true },
      );
      handleSearch("", 1);
    }
    if (searchType === "users") {
      setSortType("name");
      setTerm("$recent$");
      setSearchParams(
        {
          term: "$recent$",
          page: "1",
          limit,
          searchType,
          sortType,
          sortOrderType,
        },
        { replace: true },
      );
      //handleSearch("$recent$", 1);
    }
  }, [searchType]);

  /* Handles what happens when search parameters change.
   *
   * If there is a valid term and page in the current search
   * parameters, handle the search. Otherwise, ignore the
   * search and set the results to empty
   */
  useEffect(() => {
    const currentTerm = searchParams.get("term");
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    if (currentTerm) {
      setTerm(currentTerm);
      setPage(currentPage);
      handleSearch(currentTerm, currentPage);
    } else {
      //setTerm("$recent$");
      //setPage(1);
      //handleSearch("$recent$", 1);
    }
  }, [searchParams, limit]);

  /* Handles a search.
   *
   * The search endpoint is decided based on the chosen
   * search type. The search term, current page,
   * results per page limit, sort type, and order type
   * are sent to the endpoint, and the response is handled
   * accordingly
   */
  const handleSearch = async (searchTerm: string, searchPage: number) => {
    let endpoint = ""
    if (searchType === "levelName") endpoint = "searchLevelName";
    if (searchType === "levelID") endpoint = "searchLevelID";
    if (searchType === "users") endpoint = "searchUsers";

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/search/${endpoint}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          term: searchTerm,
          page: searchPage,
          limit,
          sortType,
          sortOrderType,
        }),
      },
    );
    const data = await res.json();
    setResults(data.results);
    setTotalResults(data.total);
    setPage(data.currentPage);
    setTotalPages(data.totalPages);
  };

  /* Handles when the enter key is pressed.
   *
   * Search on Enter key down and set URL params accordingly
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchParams(
        { term, page: "1", limit, searchType, sortType, sortOrderType },
        { replace: false },
      );
    }
  };

  /*
   * Handles when the page is changed
   *
   * Set URL params accordingly
   */
  const handlePageChange = (newPage: number) => {
    setSearchParams(
      {
        term,
        page: newPage.toString(),
        limit,
        searchType,
        sortType,
        sortOrderType,
      },
      { replace: false },
    );
  };

  // Gets a list of the most recent levels uploaded
  const handleRecentLevels = () => {
    setSearchType("levelName");
    setSearchParams(
      {
        term: "$recent$",
        page: "1",
        limit,
        searchType,
        sortType,
        sortOrderType,
      },
      { replace: false },
    );
  };

  // Gets a list of the most played levels
  const handleMostPlayedLevels = () => {
    setSearchType("levelName");
    setSearchParams(
      {
        term: "$plays$",
        page: "1",
        limit,
        searchType,
        sortType,
        sortOrderType,
      },
      { replace: false },
    );
  };

  // Gets a list of the most liked levels
  const handleMostLikedLevels = () => {
    setSearchType("levelName");
    setSearchParams(
      {
        term: "$likes$",
        page: "1",
        limit,
        searchType,
        sortType,
        sortOrderType,
      },
      { replace: false },
    );
  };

  /* Handles rendering the results to the screen.
   *
   * Renders the proper components based on the search type.
   * The value of the results is memoized with useMemo() as
   * to ensure that they are not re-rendered when other stateful
   * values are changed, and only when the search params are fully
   * updated
   */
  const renderResults = useMemo(() => {
    switch (searchType) {
      case "levelName":
        return results.map((r: any, i: any) => (
          <LevelCard
            key={i}
            id={r.levelID}
            name={r.name}
            author={r.author}
            desc={r.description}
            thumbnail={
              r.thumbnail
                ? `${import.meta.env.VITE_R2_URL}/${r.thumbnail}`
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
        ));
      case "levelID":
        return results.map((r: any, i: any) => (
          <LevelCard
            key={i}
            id={r.levelID}
            name={r.name}
            author={r.author}
            desc={r.description}
            thumbnail={
              r.thumbnail
                ? `${import.meta.env.VITE_R2_URL}/${r.thumbnail}`
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
        ));
      case "users":
        return results.map((r: any, i: any) => (
          <UserCard key={i} username={r.user?.username} role={r.role} />
        ));
      default:
        return null;
    }
  }, [results]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] dark:bg-[url('/pattern2_dark.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="bg-[var(--color-bg)] flex-1 p-15 ml-[6vw] mr-[6vw] border-l-1 border-l-[var(--color-border)] border-r-1 border-r-[var(--color-border)] tracking-tighter min-h-screen">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row flex-1 justify-center items-start grow w-[72vw]">
              <div className="flex flex-col">
                <PremadeSearchButtons
                  handleRecentLevels={handleRecentLevels}
                  handleMostPlayedLevels={handleMostPlayedLevels}
                  handleMostLikedLevels={handleMostLikedLevels}
                />
                <FilterBox
                  searchType={searchType}
                  setSearchType={setSearchType}
                  sortType={sortType}
                  setSortType={setSortType}
                  sortOrderType={sortOrderType}
                  setSortOrderType={setSortOrderType}
                  limit={limit}
                  setLimit={setLimit}
                />
              </div>

              <div className="flex flex-col flex-1 grow justify-center gap-5 ml-5 w-350 rounded-lg">
                <SearchBar
                  term={term}
                  setTerm={setTerm}
                  handleKeyDown={handleKeyDown}
                  results={results}
                  limit={limit}
                  page={page}
                  totalResults={totalResults}
                />
                <div className="flex flex-wrap flex-1 grow justify-start gap-5">
                  {renderResults}
                </div>
                <div
                  className={
                    totalResults < +limit ? "hidden" : "flex justify-center"
                  }
                >
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
