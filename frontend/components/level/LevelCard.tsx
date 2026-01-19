"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { FaCalendarAlt, FaPlayCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import LevelModal from "./LevelModal";

export default function LevelCard({
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
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
    >
      <div
        role="none"
        onClick={() => setShowModal(true)}
        className="flex flex-row w-80 h-40 lg:w-100 lg:h-45 border border-(--border) rounded-lg bg-(--background-alt) cursor-pointer hover:bg-(--background-alt)/50 ease-linear duration-125"
      >
        <div className="flex justify-center items-center ml-3 min-w-30 min-h-40 lg:min-w-40 lg:min-h-40">
          <Image
            width={300}
            height={300}
            src={thumbnail}
            alt="Level Thumbnail"
            className="w-30 h-30 lg:w-40 lg:h-40 rounded-sm"
          />
        </div>

        <div className="flex flex-col w-50 h-30 lg:w-60 lg:h-35 p-5">
          <div className="text-left min-h-25 lg:min-h-30">
            <h1 className="text-md whitespace-normal wrap-break-word font-semibold mb-1 line-clamp-2">
              {name}
            </h1>
            <h2 className="text-xs whitespace-normal wrap-break-word mb-3 line-clamp-1">
              by {author}
            </h2>
            <p className="text-xs whitespace-normal wrap-break-word line-clamp-1 lg:line-clamp-2">
              {desc}
            </p>
          </div>

          <div className="flex flex-row gap-2 min-h-5">
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
          </div>
        </div>
      {showModal && (
        <LevelModal
          setShowModal={setShowModal}
          id={id}
          name={name}
          author={author}
          desc={desc}
          thumbnail={thumbnail}
          plays={plays}
          likes={likes}
          dateUploaded={dateUploaded}
          numPegs={numPegs}
          numOrange={numOrange}
          numBalls={numBalls}
          hasBackground={hasBackground}
          hasMusic={hasMusic}
        />
      )}
      </div>
    </motion.div>
  );
}
