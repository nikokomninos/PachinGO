import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import Logo from "@/components/nav/Logo";

// A component that shows the user guidelines on the editor page
export default function GuidelinesButton() {
  const [showModal, setShowModal] = useState(() => {
    if (localStorage.getItem("seenGuidelines") === "true") return false;
    else return true;
  });

  useEffect(() => {
    setTimeout(() => {}, 500);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowModal((prev) => !prev)}
        className={
          showModal
            ? "flex justify-center items-center w-10 h-10 border border-(--border-alt) bg-(--background-alt) rounded-lg cursor-pointer ease-linear duration-75"
            : "flex justify-center items-center w-10 h-10 border border-(--border) bg-(--background-alt) hover:bg-(--background-alt) hover:text-(--foreground-alt) rounded-lg cursor-pointer ease-linear duration-75"
        }
      >
        <FaQuestion />
        {showModal && <GuidelinesModal setShowModal={setShowModal} />}
      </button>
    </div>
  );
}

/**
 * The modal that appears when the guidelines button is clicked
 *
 * @param setShowModal a useState function to set the modal to active or inactive
 */
function GuidelinesModal({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
    localStorage.setItem("seenGuidelines", "true");

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
          onKeyDown={(e) => handleKeyDown(e.nativeEvent)}
          onClick={(e) => e.stopPropagation()}
          className="fixed flex flex-col lg:flex-row top-1/8 left-1/8 w-3/4 h-3/4 bg-(--background) border border-(--border-alt) rounded-lg drop-shadow-2xl overflow-y-scroll overflow-x-hidden"
        >
          <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="mb-6">
              <Logo width={300} height={300} />
            </div>
            <h1 className="text-lg md:text-xl mb-10 md:mb-20">
              Content Guidelines
            </h1>
            <h2 className="text-md md:text-lg mb-10 font-semibold">
              Before uploading your level, please ensure that it adheres to our
              content guidelines:
            </h2>
            <ul className="flex flex-col items-center md:items-start gap-6 md:list-disc text-sm md:text-lg">
              <li>
                There is no hateful or offensive language in your level's title
                or description
              </li>
              <li>
                There is no hateful or offensive imagery in your level, whether
                it is made out of pegs or is in the level's background image
              </li>
              <li>There is no innapropriate audio in your level</li>
              <li>
                There is no sensitive information in your level's title,
                description, or background image
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
