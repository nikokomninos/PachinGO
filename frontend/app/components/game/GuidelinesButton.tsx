import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import Logo from "../nav/Logo";

const GuidelinesButton = () => {
  const [showGuidelines, setShowGuidelines] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowGuidelines(true);
    }, 500);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowGuidelines((prev) => !prev)}
        className="w-10 h-10 flex justify-center items-center bg-[var(--color-bg)] hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text-alt)] border-1 border-[var(--color-border)] rounded-lg cursor-pointer ease-linear duration-75"
      >
        <FaQuestion />
      </button>

      {showGuidelines && (
        <GuidelinesModal setShowGuidelines={setShowGuidelines} />
      )}
    </div>
  );
};

const GuidelinesModal = ({
  setShowGuidelines,
}: {
  setShowGuidelines: Function;
}) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setShowGuidelines(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setShowGuidelines(false);
      }}
      className="bg-black/75 w-full h-full fixed top-0 left-0 z-40 cursor-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed p-5 top-1/4 left-1/4 w-1/2 h-1/2 bg-[var(--color-bg)] rounded-lg"
      >
        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={() => setShowGuidelines(false)}
            className="text-sm hover:text-[var(--color-text-alt)] cursor-pointer ease-linear duration-75"
          >
            Back
          </button>
        </div>
        <div className="flex flex-col h-full justify-center items-center">
          <div className="mb-2">
            <Logo width={100} />
          </div>
          <h1 className="text-xl mb-20">Content Guidelines</h1>
          <h2 className="text-lg mb-10">
            Before uploading your level, please ensure that it adheres to our
            content guidelines:
          </h2>
          <ul className="flex flex-col gap-2 list-disc">
            <li>
              There is no hateful or offensive language in your level's title or
              description
            </li>
            <li>
              There is no hateful or offensive imagery in your level, whether it
              is made out of pegs or is in the level's background image
            </li>
            <li>There is no innapropriate audio in your level</li>
            <li>
              There is no sensitive information in your level's title,
              description, or background image
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesButton;
