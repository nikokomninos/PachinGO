"use client";

/**
 * LoginBox.tsx - a component for the login box,
 * contains frontend logic for user login
 */

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdMail, MdPassword } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import Logo from "../nav/Logo";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState("");

  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const { data } = await authClient.signIn.email(
      {
        email: email,
        password: password,
        rememberMe: remember,
      },
      {
        onRequest: () => {
          //TODO put loading spinner
        },
        onSuccess: () => {},
        onError: (ctx) => {
          setStatus(ctx.error.message);
        },
      },
    );

    if (data) {
      //localStorage.setItem("user", data.user.name);
      router.push("/");
    }
  };

  //if (isLoading) return null;

  return (
    <div className="w-[95vw] md:w-[90vw] h-fit md:h-[90vh] m-2 bg-(--background) rounded-2xl border border-(--border) flex flex-row overflow-y-scroll">
      <div className="flex flex-col items-center lg:items-start p-10 w-fit">
        <a
          href="/"
          className="mb-4 hover:drop-shadow-lg dark:hover:drop-shadow-neutral-700 ease-linear duration-150"
        >
          <Logo width={300} height={300} />
        </a>

        <h1 className="text-sm mb-20">
          <strong>Note:</strong> If you participated in our beta, you will need
          to reset your password before being able to log in again
        </h1>
        <div className="flex md:hidden w-full flex-col justify-center items-center">
          <div className="bg-(--color-bg-alt) flex flex-col justify-center items-center w-full aspect-4/3 mb-10 border border-(--border-alt) rounded-xl">
            <video
              width={800}
              height={600}
              autoPlay
              disablePictureInPicture
              loop
              muted
              className="rounded-md"
            >
              <source
                src={`${process.env.NEXT_PUBLIC_R2_URL}/Login.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
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
        <div className="flex flex-col">
          <div className="flex flex-row gap-1 items-center mb-2">
            <MdPassword />
            <h2 className="text-sm">Password</h2>
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
        <div className="flex flex-col items-center md:items-start">
          <button
            type="submit"
            onClick={() => handleLogin()}
            className="text-md rounded-md w-75 lg:w-100 mb-4 pt-2 pb-2 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer"
          >
            Login
          </button>
          <div className="flex justify-start w-full mb-10 gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-(--foreground)"
            />
            <p className="text-sm">Remember Me</p>
          </div>
          <div
            className={
              status
                ? "mb-10 border border-red-200 animate-pulse rounded-md p-4 w-full text-center"
                : "hidden"
            }
          >
            <h1>{status}</h1>
          </div>
          <div className="flex flex-col items-center md:items-start mb-4">
            Forgot your password?
            <span>
              <a
                href="/auth/reset/password/before"
                className="underline hover:text-(--foreground-alt) ease-linear duration-75"
              >
                Reset Here
              </a>
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            Don't have an account?
            <span>
              <a
                href="/auth/register"
                className="underline hover:text-(--foreground-alt) ease-linear duration-75"
              >
                Register Here
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full hidden md:block bg-(--background-alt)">
        <div className="w-full h-full flex flex-col justify-center items-center border-l border-l-(--border-alt) rounded-2xl p-5">
          <video
            width={2000}
            height={2000}
            autoPlay
            disablePictureInPicture
            loop
            muted
            className="rounded-md"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_R2_URL}/Login.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
