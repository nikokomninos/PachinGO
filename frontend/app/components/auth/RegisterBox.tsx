/**
 * RegisterBox.tsx - a component for the registration box,
 * contains frontend logic for user registration
 */

import { useEffect, useState } from "react";
import { IoMdContact } from "react-icons/io";
import { MdEmail, MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "~/stores/useAuthStore";
import Logo from "../nav/Logo";

const RegisterBox = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
    setIsLoading(false);
  }, [user, navigate]);

  // Handles submitting a registration
  // attempt. Redirects to login page
  // if successful
  const submitRegister = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ email, username, password }),
      },
    );
    const data = await res.json();
    if (data.message === "User registered successfully") navigate("/login");
    else setStatus(data.message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitRegister();
    }
  };

  if (isLoading) return null;

  return (
    <div className="w-[90vw] h-[90vh] bg-[var(--color-bg)] rounded-2xl border-1 border-[var(--color-border-alt)] grid grid-cols-3">
      <div className="col-span-1 flex flex-col p-10">
        <Link
          to="/"
          className="mb-5 hover:drop-shadow-lg dark:hover:drop-shadow-neutral-700 ease-linear duration-150"
        >
          <Logo width={75} />
        </Link>
        <h1 className="mb-10 text-sm font-normal">
          Ready to become a PachinGOD?
        </h1>
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
            className="w-75 p-2 mb-5 border-1 border-[var(--color-border)] rounded-md"
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
            className="w-75 p-2 mb-5 border-1 border-[var(--color-border)] rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-1 items-center mb-2">
            <MdPassword />
            <h2 className="text-sm">Password</h2>
          </div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            className="w-75 p-2 mb-10 border-1 border-[var(--color-border)] rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            onClick={() => submitRegister()}
            className="text-md rounded-md w-75 mb-10 pt-2 pb-2 border-1 border-[var(--color-border)] hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text-alt)] ease-linear duration-75"
          >
            Register
          </button>
          <div
            className={
              status
                ? "mb-10 border-1 border-red-200 animate-pulse rounded-md p-4 w-75 text-center"
                : "hidden"
            }
          >
            <h1>{status}</h1>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="w-full h-full flex flex-col justify-center items-center border-l-1 border-l-[var(--color-border-alt)] rounded-2xl">
          <h1>GIF Coming Soon!</h1>
        </div>
      </div>
    </div>
  );
};

export default RegisterBox;
