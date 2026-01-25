"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * A component for showing a user in search results. Clicking
 * on it will navigate to the user's public profile
 *
 * @param name the user's name
 * @param role the user's role
 */
export default function UserCard({
  name,
  role,
  pfp,
}: {
  name: string;
  role: string;
  pfp: string;
}) {
  const [roleStyle, setRoleStyle] = useState("");

  useEffect(() => {
    switch (role) {
      case "Moderator":
        setRoleStyle("text-green-500");
        break;
      case "PachinGOD":
        setRoleStyle("text-red-500");
        break;
      default:
        setRoleStyle("text-(--foreground)");
        break;
    }
  }, [role]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
    >
      <Link
        href={`/user/${name}`}
        className="flex flex-row items-center w-fit h-15 p-2 border border-(--border) rounded-lg bg-(--background-alt) cursor-pointer hover:bg-(--background-alt)/50 ease-linear duration-75"
      >
        <div className="flex justify-center items-center w-10 h-10 rounded-lg border border-(--border) mr-3">
          <Image
            src={`${process.env.NEXT_PUBLIC_R2_URL}/${pfp}`}
            alt="PachinGO! Logo, small"
            width={100}
            height={100}
            className={
              pfp
              ? "w-full h-full rounded-lg"
              : "hidden"
            }
          />
          <p className={pfp ? "hidden" : "text-sm select-none"}>{name.charAt(0).toUpperCase()}</p>
        </div>

        <div className="flex justify-center items-center w-fit">
          <h1 className={`text-sm font-semibold ${roleStyle}`}>{name}</h1>
        </div>
      </Link>
    </motion.div>
  );
}
