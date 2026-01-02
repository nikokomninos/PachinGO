import { FaHeart, FaPlayCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

/**
 * PremadeSearchButtons
 *
 * A component for any buttons that submit
 * a premade search term
 */
const PremadeSearchButtons = ({
  handleRecentLevels,
  handleMostPlayedLevels,
  handleMostLikedLevels,
}: {
  handleRecentLevels: Function;
  handleMostPlayedLevels: Function;
  handleMostLikedLevels: Function;
}) => {
  return (
    <div className="flex flex-row gap-2 lg:flex-col justify-center">
      <button
        type="button"
        onClick={() => handleRecentLevels()}
        className="text-md flex flex-col gap-2 md:flex-row justify-between items-center w-fit h-fit md:w-full md:h-full p-2 border-1 border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-alt)] ease-linear duration-75 cursor-pointer hover:text-indigo-500"
      >
        <h1 className="hidden md:block">Recently Uploaded</h1>
        <FaClock size={14} />
      </button>

      <button
        type="button"
        onClick={() => handleMostPlayedLevels()}
        className="text-md flex flex-col gap-2 md:flex-row justify-between items-center w-fit h-fit md:w-full md:h-full p-2 border-1 border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-alt)] ease-linear duration-75 cursor-pointer hover:text-green-500"
      >
        <h1 className="hidden md:block">Most Played</h1>
        <FaPlayCircle />
      </button>

      <button
        type="button"
        onClick={() => handleMostLikedLevels()}
        className="text-md flex flex-col gap-2 md:flex-row justify-between items-center w-fit h-fit md:w-full md:h-full p-2 mb-2 border-1 border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-alt)] ease-linear duration-75 cursor-pointer hover:text-red-500"
      >
        <h1 className="hidden md:block">Most Liked</h1>
        <FaHeart />
      </button>
    </div>
  );
};

export default PremadeSearchButtons;
