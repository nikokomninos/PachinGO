"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { MdEmail, MdPassword } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import Logo from "../nav/Logo";

// A component for the register box, contains frontend logic for user registration
export default function RegisterBox() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    const { error } = await authClient.signUp.email(
      {
        email: email,
        name: username,
        password: password,
      },
      {
        onRequest: () => {
          //TODO put loading spinner
        },
        onSuccess: () => {
          router.push("/auth/verify/before");
        },
      },
    );

    if (error) {
      if (error.status === 422) setStatus("Username already exists");
      else setStatus(error.message || "");
    }
  };

  return (
    <div className="w-[95vw] md:w-[90vw] h-fit md:h-[90vh] m-2 bg-(--background) rounded-2xl border border-(--border) flex flex-row overflow-y-scroll">
      <div className="flex flex-col items-center lg:items-start p-10 w-fit">
        <Link
          href="/"
          className="mb-5 hover:drop-shadow-lg dark:hover:drop-shadow-neutral-700 ease-linear duration-150"
        >
          <Logo width={300} height={300} />
        </Link>
        <h1 className="mb-10 text-sm font-normal text-center md:text-left">
          Ready to become a PachinGOD?
        </h1>
        <div className="flex md:hidden w-full flex-col justify-center items-center">
          <div className="bg-(--background-alt) flex flex-col justify-center items-center w-full aspect-4/3 mb-10 border border-(--border-alt) rounded-xl">
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
                src={`${process.env.NEXT_PUBLIC_R2_URL}/Register.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-1 items-center mb-2">
            <MdEmail />
            <h2 className="text-sm">Email</h2>
          </div>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            className="w-75 lg:w-100 p-2 mb-5 border border-(--border) rounded-md focus:outline-none focus:ring-2 focus:ring-(--border-alt) ease-linear duration-75 bg-(--background-alt) focus:bg-(--background-alt)/50"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-1 items-center mb-2">
            <IoMdContact />
            <h2 className="text-sm">Username</h2>
          </div>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            onClick={() => handleRegister()}
            className="text-md rounded-md w-75 lg:w-100 mb-4 pt-2 pb-2 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer"
          >
            Register
          </button>
          <div
            className={
              status
                ? "mb-10 border border-red-200 animate-pulse rounded-md p-4 w-75 lg:w-100 text-center"
                : "hidden"
            }
          >
            <h1>{status}</h1>
          </div>
        </div>
      </div>
      <div className="w-full hidden md:block bg-(--background-alt)">
        <div className="w-full h-full flex flex-col justify-center items-center border-l border-l-(--border-alt) rounded-2xl p-10">
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
              src={`${process.env.NEXT_PUBLIC_R2_URL}/Register.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
