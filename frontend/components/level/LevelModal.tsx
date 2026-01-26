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
import { IoPencil } from "react-icons/io5";
import { getLoggedInUser } from "@/lib/auth";
import type { UserData } from "@/types/definitions";
import UserCard from "../user/UserCard";

/**
 * A component for showing more details about a level, and
 * handling various action including playing the level,
 * liking the level and deleting the level
 *
 * @param id the level's ID
 * @param name the level's name
 * @param author the level's author
 * @param desc the level's description
 * @param thumbnail a slug to the level's thumbnail
 * @param plays the number of plays the level has
 * @param likes the number of likes the level has
 * @param dateUploaded the date the level was uploaded
 * @param numPegs the total number of pegs present in the level
 * @param numOrange the number of orange pegs present in the level
 * @param numBalls the number of balls in the level
 * @param hasBackground a boolean representing if the level uses
 * a custom background
 * @param hasMusic a boolean representing if the level uses custom
 * background music/audio
 */
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
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [authorRole, setAuthorRole] = useState<string>("Member");
  const [authorPFP, setAuthorPFP] = useState<string>("");

  // On mount, the component will check the logged in user
  // to determine various conditions, including allowing
  // the user to delete a level if it is theirs and whether
  // they have liked the level already or not
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
      setAuthorPFP(data?.userInfo.profilePicture);
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
            <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between w-full md:gap-4 mb-4 md:mb-0">
              <h1 className="text-xl lg:text-2xl text-left font-semibold mb-3 whitespace-normal break-all">
                {name}
              </h1>
              <EditButton
                user={userData?.session.user.name || ""}
                author={author}
                id={id}
                role={userData?.userInfo.role || ""}
                name={name}
                desc={desc}
              />
            </div>

            <div className="mb-4">
              <UserCard name={author} role={authorRole} pfp={authorPFP}/>
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
                    user={userData?.session.user.name || ""}
                    id={id}
                    likedLevels={userData?.userInfo.likedLevels || []}
                  />
                  <DeleteButton
                    user={userData?.session.user.name || ""}
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

function EditButton({
  user,
  author,
  id,
  role,
  name,
  desc,
}: {
  user: string;
  author: string;
  id: string;
  role: string;
  name: string;
  desc: string;
}) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const [newDesc, setNewDesc] = useState<string>(desc);
  const router = useRouter();

  useEffect(() => {
    if (user === author || role === "Moderator" || role === "PachinGOD")
      setAuthorized(true);
    else setAuthorized(false);
  }, [user, author, role]);

  //TODO make button work
  async function handleEdit() {
    if (!newName) setNewName("Custom Level");
    if (!newDesc) setNewDesc("This level is so fun!");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/level/editLevel`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          name: newName,
          desc: newDesc,
          levelID: id,
        }),
      },
    );
    if (!res.ok) alert("Level editing failed");
    else {
      setShowModal(false);
      router.refresh();
    }
  }

  function handleKeyDown (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") handleEdit();
  };

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
        <IoPencil />
      </button>
    );

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowModal((prev) => !prev)}
        className={
          showModal
            ? "w-8 h-8 flex justify-center items-center bg-(--background-alt)/50 text-(--foreground-alt) border border-(--border-alt) rounded-lg cursor-pointer ease-linear duration-75"
            : "w-8 h-8 flex justify-center items-center bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) border border-(--border) rounded-lg cursor-pointer ease-linear duration-75"
        }
      >
        <IoPencil />
      </button>

      {showModal && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.1,
            }}
            className="bg-black/75 w-full h-full fixed top-0 left-0 z-40 cursor-auto"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
          >
            <div
              role="none"
              //onKeyDown={(e) => handleKeyDown(e.nativeEvent)}
              onClick={(e) => e.stopPropagation()}
              className="fixed flex flex-col lg:flex-row md:top-1/8 md:left-1/8 w-full h-3/4 top-1/8 md:w-3/4 md:h-3/4 bg-(--background) border border-(--border-alt) rounded-lg drop-shadow-2xl overflow-y-scroll overflow-x-hidden"
            >
              <div className="flex flex-col w-full h-full justify-center items-center p-10 md:p-0">
                <h1 className="text-xl lg:text-2xl font-semibold mb-10">
                  Edit Level Info
                </h1>
                <div className="flex flex-col gap-2">
                  <h2 className="text-sm">Level Name</h2>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    className="w-full md:w-75 lg:w-100 p-2 mb-5 border border-(--border) rounded-md focus:outline-none focus:ring-2 focus:ring-(--border-alt) ease-linear duration-75 bg-(--background-alt) focus:bg-(--background-alt)/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-sm">Level Description</h2>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    className="w-full md:w-75 lg:w-100 h-30 p-2 mb-5 border border-(--border) rounded-md focus:outline-none focus:ring-2 focus:ring-(--border-alt) ease-linear duration-75 bg-(--background-alt) focus:bg-(--background-alt)/50 resize-none md:resize"
                  />
                </div>

                <button
                  type="submit"
                  onClick={() => handleEdit()}
                  className="text-md rounded-md w-full md:w-75 lg:w-100 mb-4 pt-2 pb-2 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt)/50 hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

/**
 * A display under the title and author that shows the levels
 * more intricate data
 *
 * @param plays the number of plays the level has
 * @param likes the number of likes the level has
 * @param dateUploaded the date the level was uploaded
 * @param numPegs the total number of pegs present in the level
 * @param numOrange the number of orange pegs present in the level
 * @param numBalls the number of balls in the level
 * @param hasBackground a boolean representing if the level uses
 * a custom background
 * @param hasMusic a boolean representing if the level uses custom
 * background music/audio
 */
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

/**
 * A button that brings the user to the level's
 * play page
 *
 * @param id the level's Level ID
 */
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

/**
 * A button that likes or unlikes a level.
 *
 * @param user the name of the logged in user, null if
 * not logged in
 * @param id the level's Level ID
 * @param likedLevel an array containing all the level's of
 * the currently logged in user, null if not logged in
 */
function LikeButton({
  user,
  id,
  likedLevels,
}: {
  user: string;
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
    if (!user) router.push("/auth/login");
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
            name: user,
          }),
        },
      );

      if (!res.ok) alert("Level not liked");
      else setLiked(true);
    }
  }

  async function handleUnlike() {
    if (!user) router.push("/auth/login");
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
            name: user,
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

/**
 * A button to delete a level. Is only clickable if the
 * currently logged in user is the author of the level,
 * or if they are an admin/moderator
 *
 *
 * @param user the name of the logged in user, null if
 * not logged in
 *@param author the author of the level being viewed
 *@param id the Level ID of the level being viewed
 *@param role the role of the currently logged in user
 */
function DeleteButton({
  user,
  author,
  id,
  role,
}: {
  user: string;
  author: string;
  id: string;
  role: string;
}) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user === author || role === "Moderator" || role === "PachinGOD")
      setAuthorized(true);
    else setAuthorized(false);
  }, [user, author, role]);

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
