/**
 * LevelModal
 *
 * A modal that appears when a LevelCard is clicked
 */

import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaFileImage,
  FaPlayCircle,
  FaTrash,
} from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { IoMdMusicalNote } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "~/stores/useAuthStore";

const LevelModal = ({
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
}) => {
  const { user, role } = useAuthStore();
  const navigate = useNavigate();

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handlePlay = () => {
    navigate(`/play/${id}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setShowModal(false);
    }
  };

  /*
   * ChatGPT was used to figure out how to get the modal to close, since it would not close
   * despite passing the setShowModal function to the modal to use.
   *
   * Prompt: "I can't figure out why this modal will not close, despite passing a
   * stateful function to it. Can you help me figure this out? *pasted source code*"
   *
   * From the response, we learned about the "stopPropagation" function of all React events.
   * The stopPropagation function explicitly tells the child component to ignore the events
   * of the parent component, and to treat its own events separate from the parent's. This
   * allowed the modal to close, since it was ignoring how the parent component was handling
   * the function call.
   */

  return (
    //Use stopPropagation to separate modal's events from parent element's events
    <div
      onClick={(e) => {
        e.stopPropagation();
        setShowModal(false);
      }}
      className="bg-black/75 w-full h-full fixed top-0 left-0 z-40 cursor-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed grid grid-cols-3 top-1/8 left-1/8 w-3/4 h-3/4 bg-[var(--color-bg)] rounded-lg drop-shadow-2xl"
      >
        <div className="col-span-2 w-7/8 h-7/8 m-auto flex justify-center items-center">
          <img
            src={thumbnail}
            alt="Level thumbnail"
            className="min-w-full min-h-full object-contain rounded-sm"
          />
        </div>

        <div className="col-span-1 pr-10 py-10 flex flex-col">
          <div className="flex justify-end items-center">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="text-sm hover:text-[var(--color-text-alt)] cursor-pointer ease-linear duration-75"
            >
              Back
            </button>
          </div>
          <h1 className="text-4xl font-semibold mb-3 whitespace-normal break-words">
            {name}
          </h1>

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

          <Link
            to={`/users/${author}`}
            className="flex flex-row items-center w-fit h-15 p-2 mb-5 border-1 border-[var(--color-border)] rounded-lg tracking-tight bg-[var(--color-bg)] cursor-pointer hover:bg-[var(--color-bg-alt)] ease-linear duration-75"
          >
            <div className="flex justify-center items-center w-10 h-10 rounded-lg border-1 border-[var(--color-border)] mr-3">
              <img src="/logo_small.png" alt="PachinGO Logo, small" />
            </div>

            <div className="flex justify-center items-center w-fit">
              <h1>{author}</h1>
            </div>
          </Link>

          <p className="text-md mb-10 whitespace-normal break-words">{desc}</p>

          <div className="flex flex-col gap-3 justify-end items-end h-full">
            <div className="flex flex-row w-full gap-3">
              <div className="flex w-full">
                <button
                  type="button"
                  onClick={() => handlePlay()}
                  className="flex w-full justify-center items-center hover:bg-[var(--color-bg-alt)] hover:text-neutral-400 border-1 border-[var(--color-border)] rounded-lg cursor-pointer ease-linear duration-75"
                >
                  Play
                </button>
              </div>
              <div className="flex flex-row gap-3">
                <LikeButton id={id} user={user} navigate={navigate} />
                <DeleteButton user={user} role={role} author={author} id={id} />
              </div>
            </div>
            <h3 className="text-xs">Level ID: {id}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const LevelInfo = ({
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
}) => {
  return (
    <div className="flex flex-row gap-2 mb-5">
      <div className="flex flex-row justify-start items-center gap-1 text-xs text-[var(--color-text-alt)]">
        <FaPlayCircle />
        {plays || 0}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-[var(--color-text-alt)]">
        <FaThumbsUp />
        {likes || 0}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-[var(--color-text-alt)]">
        <FaCalendarAlt />
        {dateUploaded.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-[var(--color-text-alt)]">
        <img src="/peg_blue.png" alt="Blue peg" className="w-3 h-3" />
        {numPegs}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-[var(--color-text-alt)]">
        <img src="/peg_orange.png" alt="Orange peg" className="w-3 h-3" />
        {numOrange}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-[var(--color-text-alt)]">
        <img src="/ball.png" alt="Ball" className="w-2.5 h-2.5" />
        {numBalls}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-[var(--color-text-alt)]">
        <FaFileImage />
        {hasBackground}
      </div>

      <div className="flex flex-row justify-start items-center gap-1 text-xs text-[var(--color-text-alt)]">
        <IoMdMusicalNote size={14} />
        {hasMusic}
      </div>
    </div>
  );
};

const LikeButton = ({
  id,
  user,
  navigate,
}: {
  id: string;
  user: any;
  navigate: Function;
}) => {
  const [liked, setLiked] = useState(false);
  const [likedLevels, setLikedLevels] = useState<number[]>([]);
  //const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (user) await getLikedLevels();
      //setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) await getLikedLevels();
    })();
  }, [liked]);

  useEffect(() => {
    if (user && likedLevels.includes(Number(id))) setLiked(true);
  }, [likedLevels]);

  const getLikedLevels = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        `/api/v1/users/getUserLikedLevels?username=${user.username}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      },
    );
    const data = await res.json();
    setLikedLevels(data.likedLevels);
  };

  const handleLike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/level/addLikeToLevel`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          levelID: Number(id),
          username: user.username,
        }),
      },
    );

    if (!res.ok) alert("Level not liked");
    else setLiked(true);
  };

  const handleUnlike = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/level/removeLikeFromLevel`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          levelID: Number(id),
          username: user.username,
        }),
      },
    );

    if (!res.ok) alert("Level not unliked");
    else setLiked(false);
  };

  //if (isLoading) return null;

  return (
    <div className="relative inline-block">
      <button
        type="submit"
        onClick={liked === false ? handleLike : handleUnlike}
        className={
          liked === false
            ? "w-8 h-8 flex justify-center items-center hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text-alt)] border-1 border-[var(--color-border)] rounded-lg cursor-pointer ease-linear duration-75"
            : "w-8 h-8 flex justify-center items-center bg-[var(--color-bg-alt)] text-[var(--color-text-alt)] border-1 border-[var(--color-border)] rounded-lg cursor-pointer ease-linear duration-75"
        }
      >
        <FaThumbsUp />
      </button>
    </div>
  );
};

// A mini modal that's displayed when hitting the delete button,
// as to avoid using the alert() function
const DeleteButton = ({
  user,
  role,
  author,
  id,
}: {
  user: any;
  role: any;
  author: string;
  id: string;
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeletion = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/level/deleteLevel`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          levelID: id,
        }),
      },
    );
    if (!res.ok) alert("Level deletion failed");
    else window.location.reload();
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowConfirm((prev) => !prev)} // toggle popup
        className={
          user?.username === author ||
          role === "Moderator" ||
          role === "PachinGOD"
            ? "w-8 h-8 flex justify-center items-center hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text-alt)] border-1 border-[var(--color-border)] rounded-lg cursor-pointer ease-linear duration-75"
            : "hidden"
        }
      >
        <FaTrash />
      </button>

      {showConfirm && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[var(--color-bg)] border-1 border-[var(--color-border)] rounded-lg p-2 text-sm z-10">
          <p className="mb-2 text-center">Are you sure?</p>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                handleDeletion();
                setShowConfirm(false);
              }}
              className="p-1 mr-2 rounded-md border-1 border-[var(--color-border)] hover:bg-[var(--color-bg-alt)] ease-linear duration-75 cursor-pointer"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="p-1 rounded-md border-1 border-[var(--color-border)] hover:bg-[var(--color-bg-alt)] ease-linear duration-75 cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelModal;
