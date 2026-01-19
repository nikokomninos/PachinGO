"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import Logo from "@/components/nav/Logo";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ResetPasswordAfter() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePasswordReset();
    }
  };

  const handlePasswordReset = async () => {
    if (!token) {
      setStatus("Invalid password reset.");
      return;
    }
    const { data, error } = await authClient.resetPassword({
      newPassword: password,
      token: token,
    });

    if (error) setStatus("Error resetting password. Please try again!");
    else router.push("/auth/login");
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
          <MdPassword />
          <h2 className="text-sm">New Password</h2>
        </div>
        <div className="relative w-75 lg:w-100 mb-10">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            className="w-full p-2 border border-(--border) rounded-md focus:outline-none focus:ring-2 focus:ring-(--border-alt) ease-linear duration-75 bg-(--background-alt) focus:bg-(--background-alt)/50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-(--foreground-alt) hover:text-(--foreground) ease-linear duration-75 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        onClick={handlePasswordReset}
        className="text-md rounded-md w-75 lg:w-100 mb-4 pt-2 pb-2 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer"
      >
        Reset Password
      </button>
      <h1 className="text-lg">{status}</h1>
    </div>
  );
}
