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
    <div>
      <button
        type="button"
        onClick={() => handleRecentLevels()}
        className="flex flex-row justify-between items-center w-full p-2 mb-2 border-1 border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-alt)] ease-linear duration-75 cursor-pointer hover:text-indigo-500"
      >
        Recently Uploaded
        <FaClock size={14} />
      </button>

      <button
        type="button"
        onClick={() => handleMostPlayedLevels()}
        className="flex flex-row justify-between items-center w-full p-2 mb-2 border-1 border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-alt)] ease-linear duration-75 cursor-pointer hover:text-green-500"
      >
        Most Played
        <FaPlayCircle />
      </button>

      <button
        type="button"
        onClick={() => handleMostLikedLevels()}
        className="flex flex-row justify-between items-center w-full p-2 mb-2 border-1 border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-alt)] ease-linear duration-75 cursor-pointer hover:text-red-500"
      >
        Most Liked
        <FaHeart />
      </button>
    </div>
  );
};

export default PremadeSearchButtons;
