// The page for entering an email to send a password
// reset link to

"use client";

import Link from "next/link";
import { useState } from "react";
import { MdMail } from "react-icons/md";
import Logo from "@/components/nav/Logo";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordBefore() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendResetEmail();
    }
  };

  const handleSendResetEmail = async () => {
    const { error } = await authClient.requestPasswordReset({
      email: email,
    });

    if (error) setStatus("Error sending email. Please try again!");
    else setStatus("Please check your email for a password reset link!");
  };

  return (
    <div className="w-[90vw] md:w-1/2 h-fit p-10 md:p-30 bg-(--background) rounded-2xl border border-(--border-alt) flex flex-col justify-center items-center">
      <Link
        href="/"
        className="mb-10 hover:drop-shadow-lg dark:hover:drop-shadow-neutral-700 ease-linear duration-150"
      >
        <Logo width={300} height={300} />
      </Link>
      <div className="flex flex-col">
        <div className="flex flex-row gap-1 items-center mb-2">
          <MdMail />
          <h2 className="text-sm">Email</h2>
        </div>
        <input
          type="text"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          className="w-75 lg:w-100 p-2 mb-5 border border-(--border) rounded-md focus:outline-none focus:ring-2 focus:ring-(--border-alt) ease-linear duration-75 bg-(--background-alt) focus:bg-(--background-alt)/50"
        />
      </div>
      <button
        type="submit"
        onClick={handleSendResetEmail}
        className="text-md rounded-md w-75 lg:w-100 mb-4 pt-2 pb-2 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer"
      >
        Send Reset Email
      </button>
      <h1 className="text-md">{status}</h1>
    </div>
  );
}
