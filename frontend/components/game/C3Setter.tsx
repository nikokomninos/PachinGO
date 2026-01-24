"use client";

import { useEffect } from "react";

// A component present in the layout of every page. Sets
// localStorage values relevant to the game that the
// game looks for on certain page loads
export default function C3Setter() {
  useEffect(() => {
    localStorage.setItem("env", process.env.NEXT_PUBLIC_ENV || "prod");
    localStorage.setItem("uploaded", "false");
  }, []);
  return null;
}
