"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/nav/Logo";
import { authClient } from "@/lib/auth-client";

export default function VerifyAfter() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const [status, setStatus] = useState("Verifying email...");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("Invalid verification!");
        return;
      }
      const { data, error } = await authClient.verifyEmail({
        query: {
          token: token,
        },
      });

      if (error) {
        setStatus("Email could not be verified!");
      } else {
        router.push("/auth/login");
      }
    };

    verify();
  }, [token, router.push]);

  return (
    <div className="w-[90vw] md:w-1/2 h-fit p-10 md:p-30 bg-(--background) rounded-2xl border border-(--border-alt) flex flex-col justify-center items-center">
      <Link
        href="/"
        className="mb-10 hover:drop-shadow-lg dark:hover:drop-shadow-neutral-700 ease-linear duration-150"
      >
        <Logo width={300} height={300} />
      </Link>
      <h1 className="text-lg">{status}</h1>
    </div>
  );
}
