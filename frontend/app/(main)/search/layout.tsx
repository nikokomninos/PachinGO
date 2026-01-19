import type { Metadata } from "next";
import FilterTypes from "@/components/search/FilterTypes";
import PremadeSearchButtons from "@/components/search/PremadeSearchButtons";
import SearchBar from "@/components/search/SearchBar";
import SearchTypes from "@/components/search/SearchTypes";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search - PachinGO!",
  description: "Peggle Reborn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Suspense>
      <div className="flex flex-col gap-4 mb-4 md:mb-6">
        <PremadeSearchButtons />
        <SearchBar />
        <div className="flex flex-col items-center md:items-start md:flex-row gap-4 md:gap-0 justify-between">
          <SearchTypes />
          <FilterTypes />
        </div>
      </div>
      {children}
      </Suspense>
    </div>
  );
}
