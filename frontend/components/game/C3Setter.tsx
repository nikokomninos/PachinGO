"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function C3Setter() {
  useEffect(() => {
    localStorage.setItem("env", process.env.NEXT_PUBLIC_ENV!);
    localStorage.setItem("uploaded", "false");
  }, []);
  return null;
}
