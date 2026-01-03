/**
 * home.tsx - the root route
 */

import {
  FaInfoCircle,
  FaMoneyBillWave,
  FaPlay,
  FaSearch,
  FaWrench,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router";
import Logo from "~/components/nav/Logo";
import AuthMenu from "~/components/nav/AuthMenu";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const Home = () => {
  return (
    <div className="bg-[url('/pattern2.svg')] dark:bg-[url('/pattern2_dark.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen flex flex-col justify-center items-center">
      <div className="flex w-full justify-end mr-[5vw] lg:mt-0 md:mt-2 mt-2">
        <AuthMenu />
      </div>
      <div className="m-2 p-8 md:p-16 sm:p-20 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 w-[95vw] sm:w-[90vw] lg:h-[90vh] md:h-fit rounded-2xl bg-[var(--color-bg)] border-1 border-[var(--color-border-alt)] overflow-hidden">
        <div className="col-span-1 flex flex-col justify-center text-center sm:items-center md:items-center lg:items-center">
          <div className="mb-10">
            <Logo width={80} />
          </div>
          <h2 className="text-lg md:text-xl mb-5 sm:mb-15 text-[var(--color-text-alt)]">
            A spiritual successor to <i>Peggle</i>, now featuring a level
            editor.
          </h2>
          <div className="sm:flex md:flex lg:hidden w-full flex-col justify-center items-center">
            <div className="bg-[var(--color-bg-alt)] flex flex-col justify-center items-center w-[100%] aspect-4/3 mb-10 border-1 border-[var(--color-border-alt)] rounded-xl">
              <h1>GIF Coming Soon!</h1>
            </div>
          </div>

          <div className="flex flex-row">
            <Link
              to="/demo"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-[#575e8f] ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 mr-2 w-65 h-20 gap-2"
            >
              <FaPlay />
              <h1 className="text-sm sm:text-lg">Play The Demo Levels</h1>
            </Link>

            <Link
              to="/search"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-[#8f5757] ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 w-65 h-20 gap-2"
            >
              <FaSearch />
              <h1 className="text-sm sm:text-lg">Play User Created Levels</h1>
            </Link>
          </div>
          <div className="flex flex-row">
            <Link
              to="/editor"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-[#8f5787] ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 mr-2 w-65 h-20 gap-2"
            >
              <FaWrench />
              <h1 className="text-sm sm:text-lg">Make Your Own Levels</h1>
            </Link>

            <Link
              to="/about"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-neutral-500 ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 w-65 h-20 gap-2"
            >
              <FaInfoCircle />
              <h1 className="text-sm sm:text-lg">About The Project</h1>
            </Link>
          </div>
          <div className="flex flex-row">
            <Link
              to="https://docs.google.com/forms/d/e/1FAIpQLScM2HxSCttdwolVOBKbx0y5S_n04KVshtFBkdbr9Q_ysmhAug/viewform?usp=dialog"
              target="_blank"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-neutral-500 ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 mr-2 w-65 h-20 gap-2"
            >
              <IoMail />
              <h1 className="text-sm sm:text-lg">Contact Us</h1>
            </Link>

            <Link
              to="https://ko-fi.com/nikokomninos"
              target="_blank"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-[#4B9B6E] ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 w-65 h-20 gap-2"
            >
              <FaMoneyBillWave />
              <h1 className="text-sm sm:text-lg">Support The Project</h1>
            </Link>
          </div>
        </div>
        <div className="col-span-1 lg:flex md:hidden hidden flex-col justify-center items-center">
          <div className="bg-[var(--color-bg-alt)] flex flex-col justify-center items-center w-full aspect-4/3 border-1 border-[var(--color-border-alt)] rounded-xl">
            <h1>GIF Coming Soon!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
