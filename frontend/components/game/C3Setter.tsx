"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function C3Setter() {
  const { data: session } = authClient.useSession();

  useEffect(() => {
    localStorage.setItem("env", process.env.NEXT_PUBLIC_ENV!);
    localStorage.setItem("uploaded", "false");
    if (session) localStorage.setItem("user", session.user.name);
  }, [session]);
  return null;
}
