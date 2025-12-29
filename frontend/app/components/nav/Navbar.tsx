/**
 * Navbar.tsx - a component for the site's navbar
 */

import { useState } from "react";
import {
  FaCaretDown,
  FaInfoCircle,
  FaMoneyBillWave,
  FaPlay,
  FaSearch,
  FaWrench,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router";
import Logo from "~/components/nav/Logo";
import AuthMenu from "./AuthMenu";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-[var(--color-bg)] border-b border-b-[var(--color-border)]">
      <div className="bg-[var(--color-bg-alt)] border-b-1 border-b-[var(--color-border)] p-1 mb-3">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="md:ml-[6vw]">
            <h1 className="text-xs font-light mb-3 md:mb-0">
              🎉 PachinGO's open beta is now available to play! 🎉
            </h1>
          </div>

          <div className="mr-[6vw]">
            <AuthMenu />
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-col justify-center items-center">
        <Link
          className="flex mb-3 hover:drop-shadow-lg dark:hover:drop-shadow-neutral-700 ease-linear duration-150"
          to="/"
        >
          <Logo width={40} />
        </Link>

        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="md:hidden flex justify-center w-1/8 p-1 mb-3 border border-[var(--color-border)] rounded-md"
        >
          <FaCaretDown />
        </button>
        {showMenu && <NavMobile />}
      </div>
      <NavDesktop />
    </div>
  );
};

const NavDesktop = () => {
  return (
    <div className="hidden md:block">
      <div className="flex flex-row justify-center items-center gap-25 bg-[var(--color-bg)]">
        <Link
          className="mb-3 hover:drop-shadow-lg dark:hover:drop-shadow-neutral-700 ease-linear duration-150 hidden lg:block"
          to="/"
        >
          <Logo width={40} />
        </Link>
        <div className="flex flex-row gap-3 mt-1 mb-3 border-1 border-[var(--color-border)] text-[var(--color-text)] font-semibold tracking-tight rounded-3xl p-3">
          <Link
            to="/demo"
            className="flex items-center gap-2 ml-2 hover:text-blue-500 ease-linear duration-75 border-r-1 border-r-[var(--color-border)] pr-5"
          >
            <FaPlay size={10} />
            <h1 className="text-sm">Demo Levels</h1>
          </Link>

          <Link
            to="/search"
            className="flex items-center gap-2 ml-2 hover:text-orange-500 ease-linear duration-75 border-r-1 border-r-[var(--color-border)] pr-5"
          >
            <FaSearch size={11} />
            <h1 className="text-sm">User Levels</h1>
          </Link>

          <Link
            to="/editor"
            className="flex items-center gap-2 ml-2 hover:text-purple-500 ease-linear duration-75 pr-5 lg:pr-0 border-r-1 lg:border-r-0 border-r-[var(--color-border)]"
          >
            <FaWrench size={12} />
            <h1 className="text-sm">Level Editor</h1>
          </Link>

          <Link
            to="/about"
            className="group items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75 border-r-1 border-r-[var(--color-border)] pr-5 flex lg:hidden"
          >
            <FaInfoCircle size={12} />
            <h1 className="text-sm">About</h1>
          </Link>

          <Link
            to="https://docs.google.com/forms/d/e/1FAIpQLScM2HxSCttdwolVOBKbx0y5S_n04KVshtFBkdbr9Q_ysmhAug/viewform?usp=dialog"
            target="_blank"
            className="group items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75 border-r-1 border-r-[var(--color-border)] pr-5 flex lg:hidden"
          >
            <IoMail size={13} />
            <h1 className="text-sm">Contact</h1>
          </Link>

          <Link
            to="https://ko-fi.com/nikokomninos"
            target="_blank"
            className="flex lg:hidden items-center gap-2 ml-2 hover:text-green-400 ease-linear duration-75"
          >
            <FaMoneyBillWave size={14} />
            <h1 className="text-sm">Donate</h1>
          </Link>
        </div>
        <div className="hidden lg:flex flex-row justify-center items-center gap-2 mt-1 mb-3 border-1 border-[var(--color-border)] text-[var(--color-text)] font-semibold tracking-tight rounded-3xl p-3 text-sm">
          <Link
            to="/about"
            className="flex items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75 border-r-1 border-r-[var(--color-border)] pr-5"
          >
            <FaInfoCircle size={12} />
            <h1 className="text-sm">About</h1>
          </Link>

          <Link
            to="https://docs.google.com/forms/d/e/1FAIpQLScM2HxSCttdwolVOBKbx0y5S_n04KVshtFBkdbr9Q_ysmhAug/viewform?usp=dialog"
            target="_blank"
            className="flex items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75 border-r-1 border-r-[var(--color-border)] pr-5"
          >
            <IoMail size={13} />
            <h1 className="text-sm">Contact</h1>
          </Link>

          <Link
            to="https://ko-fi.com/nikokomninos"
            target="_blank"
            className="flex items-center gap-2 ml-2 hover:text-green-400 ease-linear duration-75"
          >
            <FaMoneyBillWave size={14} />
            <h1 className="text-sm">Donate</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

const NavMobile = () => {
  return (
    <div className="flex flex-col items-center gap-5 p-2 mb-2 w-3/4 border border-[var(--color-border)] rounded-md bg-[var(--color-background)]">
      <Link
        to="/demo"
        className="flex items-center gap-2 ml-2 hover:text-blue-500 ease-linear duration-75"
      >
        <FaPlay size={10} />
        <h1 className="text-sm">Demo Levels</h1>
      </Link>

      <Link
        to="/search"
        className="flex items-center gap-2 ml-2 hover:text-orange-500 ease-linear duration-75"
      >
        <FaSearch size={11} />
        <h1 className="text-sm">User Levels</h1>
      </Link>

      <Link
        to="/editor"
        className="flex items-center gap-2 ml-2 hover:text-purple-500 ease-linear duration-75"
      >
        <FaWrench size={12} />
        <h1 className="text-sm">Level Editor</h1>
      </Link>

      <Link
        to="/about"
        className="flex items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75"
      >
        <FaInfoCircle size={12} />
        <h1 className="text-sm">About</h1>
      </Link>

      <Link
        to="https://docs.google.com/forms/d/e/1FAIpQLScM2HxSCttdwolVOBKbx0y5S_n04KVshtFBkdbr9Q_ysmhAug/viewform?usp=dialog"
        target="_blank"
        className="flex items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75"
      >
        <IoMail size={13} />
        <h1 className="text-sm">Contact</h1>
      </Link>

      <Link
        to="https://ko-fi.com/nikokomninos"
        target="_blank"
        className="flex items-center gap-2 ml-2 hover:text-green-400 ease-linear duration-75"
      >
        <FaMoneyBillWave size={14} />
        <h1 className="text-sm">Donate</h1>
      </Link>
    </div>
  );
};

export default Navbar;
