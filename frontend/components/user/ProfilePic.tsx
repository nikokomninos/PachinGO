"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoPencil } from "react-icons/io5";
import { getLoggedInUser } from "@/lib/auth";
import type { UserData } from "@/types/definitions";

export default function ProfilePic({
  username,
  pfp,
}: {
  username: string;
  pfp: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<UserData>();
  const router = useRouter();

  useEffect(() => {
    async function getUserData() {
      const data = await getLoggedInUser();
      if (data) setUserData(data);
      else return;
    }

    getUserData();
  }, []);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    else {
      const formData = new FormData();
      formData.append("name", username);
      formData.append("pfp", file, file.name);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/account/changeProfilePicture`,
        {
          method: "POST",
          mode: "cors",
          body: formData,
          cache: "no-store",
        },
      );

      if (!res.ok) alert("Profile Picture not uploaded");
      else router.refresh();
    }
  }

  return (
    <div className="relative w-full h-full">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png,image/jpeg"
        onChange={(e) => handleFile(e)}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={
          userData?.session.user.name === username ||
          userData?.userInfo.role === "Moderator" ||
          userData?.userInfo.role === "PachinGOD"
            ? "absolute right-2 top-2 w-8 h-8 flex justify-center items-center bg-(--background-alt) hover:bg-(--background) hover:text-(--foreground-alt) border border-(--border) rounded-lg cursor-pointer ease-linear duration-75"
            : "hidden"
        }
      >
        <IoPencil />
      </button>
      <div className="flex justify-center items-center w-full h-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_R2_URL}/${pfp}`}
          alt="PachinGO! Logo, small"
          width={100}
          height={100}
          className={pfp ? "w-full h-full rounded-lg" : "hidden"}
        />
        <p className={pfp ? "hidden" : "text-6xl select-none"}>
          {username.charAt(0).toUpperCase()}
        </p>
      </div>
    </div>
  );
}
