import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaFileImage,
  FaPlayCircle,
  FaTrash,
} from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { IoMdMusicalNote } from "react-icons/io";
import { getLoggedInUser } from "@/lib/auth";
import type { UserData } from "@/types/definitions";
import UserCard from "../user/UserCard";

export default function LevelModal({
  setShowModal,
  id,
  name,
  author,
  desc,
  thumbnail,
  plays,
  likes,
  dateUploaded,
  numPegs,
  numOrange,
  numBalls,
  hasBackground,
  hasMusic,
}: {
  setShowModal: Function;
  id: string;
  name: string;
  author: string;
  desc: string;
  thumbnail: string;
  plays: number;
  likes: number;
  dateUploaded: Date;
  numPegs: number;
  numOrange: number;
  numBalls: number;
  hasBackground: string;
  hasMusic: string;
}) {
  const [userData, setUserData] = useState<UserData>();
  const [authorRole, setAuthorRole] = useState("Member");

  useEffect(() => {
    async function getUserData() {
      const data = await getLoggedInUser();
      if (data) setUserData(data);
      else return;
    }

    async function getAuthorInfo() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/getUser?name=${author}`,
        { cache: "no-store" },
      );
      if (!res.ok) return null;
      const data = await res.json();
      setAuthorRole(data?.userInfo.role);
    }

    getAuthorInfo();
    getUserData();
  }, [author]);

  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    },
    [setShowModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("no-scroll");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("no-scroll");
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.12,
        }}
        className="bg-black/75 w-full h-full fixed top-0 left-0 z-40 cursor-auto"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(false);
        }}
      >
        <div
          role="none"
          onKeyDown={(e) => handleKeyDown(e.nativeEvent)}
          onClick={(e) => e.stopPropagation()}
          className="fixed flex flex-col lg:flex-row top-1/8 left-1/8 w-3/4 h-3/4 bg-(--background) border border-(--border-alt) rounded-lg drop-shadow-2xl overflow-x-hidden"
        >
          <div className="w-full lg:w-3/4 p-10 flex justify-center items-center">
            <Image
              src={thumbnail}
              alt="Level thumbnail"
              width={1000}
              height={1000}
              className="w-full h-full object-contain rounded-sm"
            />
          </div>

          <div className="w-full lg:w-1/4 lg:pr-10 px-10 lg:px-0 lg:py-10 flex flex-col items-center lg:items-start overflow-y-scroll">
            <h1 className="text-xl lg:text-2xl text-left font-semibold mb-3 whitespace-normal break-all">
              {name}
            </h1>

            <div className="mb-4">
              <UserCard name={author} role={authorRole} />
            </div>
            <LevelInfo
              plays={plays}
              likes={likes}
              dateUploaded={dateUploaded}
              numPegs={numPegs}
              numOrange={numOrange}
              numBalls={numBalls}
              hasBackground={hasBackground}
              hasMusic={hasMusic}
            />

            <p className="text-md text-left mb-10 whitespace-normal break-all">
              {desc}
            </p>

            <div className="flex flex-col gap-3 justify-end items-center lg:items-end w-full h-full">
              <div className="flex w-full gap-3">
                <div className="flex w-full">
                  <PlayButton id={id} />
                </div>
                <div className="flex gap-3">
                  <LikeButton
                    name={userData?.session.user.name || ""}
                    id={id}
                    likedLevels={userData?.userInfo.likedLevels || []}
                  />
                  <DeleteButton
                    name={userData?.session.user.name || ""}
                    author={author}
                    id={id}
                    role={userData?.userInfo.role || ""}
                  />
                </div>
              </div>

              <h1 className="text-xs">Level ID: {id}</h1>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function LevelInfo({
  plays,
  likes,
  dateUploaded,
  numPegs,
  numOrange,
  numBalls,
  hasBackground,
  hasMusic,
}: {
  plays: number;
  likes: number;
  dateUploaded: Date;
  numPegs: number;
  numOrange: number;
  numBalls: number;
  hasBackground: string;
  hasMusic: string;
}) {
  return (
    <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-2 mb-5">
      <div className="flex flex-row justify-start items-center gap-1 text-xs text-(--foreground-alt)">
        <FaPlayCircle />
        {plays || 0}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-(--foreground-alt)">
        <FaThumbsUp />
        {likes || 0}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-(--foreground-alt)">
        <FaCalendarAlt />
        {dateUploaded.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-(--foreground-alt)">
        <Image
          src="/peg_blue.png"
          alt="Blue peg"
          width={25}
          height={25}
          className="w-3 h-3"
        />
        {numPegs}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-(--foreground-alt)">
        <Image
          src="/peg_orange.png"
          alt="Orange peg"
          width={25}
          height={25}
          className="w-3 h-3"
        />
        {numOrange}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-(--foreground-alt)">
        <Image
          src="/ball.png"
          alt="Ball"
          width={25}
          height={25}
          className="w-2.5 h-2.5"
        />
        {numBalls}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-(--foreground-alt)">
        <FaFileImage />
        {hasBackground}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-(--foreground-alt)">
        <IoMdMusicalNote size={14} />
        {hasMusic}
      </div>
    </div>
  );
}

function PlayButton({ id }: { id: string }) {
  const router = useRouter();

  async function handlePlay() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/level/addPlayToLevel`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      },
    );

    if (res.ok) router.push(`/level/${id}`);
  }

  return (
    <button
      type="button"
      onClick={() => handlePlay()}
      className="flex w-full justify-center items-center bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) border border-(--border) rounded-lg cursor-pointer ease-linear duration-75 text-sm py-1"
    >
      Play
    </button>
  );
}

function LikeButton({
  name,
  id,
  likedLevels,
}: {
  name: string;
  id: string;
  likedLevels: number[];
}) {
  const [liked, setLiked] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (likedLevels.includes(+id)) setLiked(true);
    else setLiked(false);
  }, [likedLevels, id]);

  async function handleLike() {
    if (!name) router.push("/auth/login");
    else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/level/addLikeToLevel`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify({
            id: id,
            name: name,
          }),
        },
      );

      if (!res.ok) alert("Level not liked");
      else setLiked(true);
    }
  }

  async function handleUnlike() {
    if (!name) router.push("/auth/login");
    else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/level/removeLikeFromLevel`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify({
            id: id,
            name: name,
          }),
        },
      );

      if (!res.ok) alert("Level not unliked");
      else setLiked(false);
    }
  }

  if (liked === null)
    return (
      <div className="w-8 h-8 border border-(--border-alt) rounded-lg bg-(--background-alt)"></div>
    );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
        }}
        className="relative inline-block"
      >
        <button
          type="submit"
          onClick={liked === false ? handleLike : handleUnlike}
          className={
            liked === false
              ? "w-8 h-8 flex justify-center items-center bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) border border-(--border) rounded-lg cursor-pointer ease-linear duration-75"
              : "w-8 h-8 flex justify-center items-center bg-(--background-alt)/50 text-(--foreground-alt) border border-(--border-alt) rounded-lg cursor-pointer ease-linear duration-75"
          }
        >
          <FaThumbsUp />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

function DeleteButton({
  name,
  author,
  id,
  role,
}: {
  name: string;
  author: string;
  id: string;
  role: string;
}) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (name === author || role === "Moderator" || role === "PachinGOD")
      setAuthorized(true);
    else setAuthorized(false);
  }, [name, author, role]);

  async function handleDeletion() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/level/deleteLevel`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          id: id,
        }),
      },
    );
    if (!res.ok) alert("Level deletion failed");
    else router.refresh();
  }

  if (authorized === null)
    return (
      <div className="w-8 h-8 border border-(--border-alt) rounded-lg bg-(--background-alt)"></div>
    );

  if (authorized === false)
    return (
      <button
        type="button"
        className="w-8 h-8 flex justify-center items-center bg-(--background-alt)/50 text-(--foreground-alt) border border-(--border-alt) rounded-lg cursor-not-allowed ease-linear duration-75"
      >
        <FaTrash />
      </button>
    );

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowConfirm((prev) => !prev)}
        className={
          showConfirm
            ? "w-8 h-8 flex justify-center items-center bg-(--background-alt)/50 text-(--foreground-alt) border border-(--border-alt) rounded-lg cursor-pointer ease-linear duration-75"
            : "w-8 h-8 flex justify-center items-center bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) border border-(--border) rounded-lg cursor-pointer ease-linear duration-75"
        }
      >
        <FaTrash />
      </button>

      {showConfirm && (
        <motion.div
          initial={{ scale: 1, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1, opacity: 0, y: 10 }}
          transition={{
            ease: "backOut",
            duration: 0.15,
          }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-(--background) border border-(--border) rounded-lg p-2 text-sm z-10"
        >
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-135 border-t border-r border-(--border) bg-(--background)" />
          <p className="mb-2 text-center">Are you sure?</p>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                handleDeletion();
                setShowConfirm(false);
              }}
              className="p-1 mr-2 rounded-md ease-linear duration-75 cursor-pointer hover:text-(--foreground-alt)"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="p-1 rounded-md ease-linear duration-75 cursor-pointer hover:text-(--foreground-alt)"
            >
              No
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
