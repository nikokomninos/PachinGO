"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
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
import AuthMenu from "./AuthMenu";
import NavbarLogo from "./NavbarLogo";

// The site's multi-layered Navbar. On top is a the AuthMenu,
// on bottom is the the main navigation links
export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-(--background) border-b border-b-(--border)">
      <div className="bg-(--background-alt) border-b border-b-(--border) p-1 mb-3">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="md:ml-[6vw]">
            <h1 className="text-xs font-light mb-3 md:mb-0">
              🎉 PachinGO! v0.2 out now!{" "}
              <Link
                href="/changelog"
                className="underline text-xs font-light hover:text-(--foreground-alt) ease-linear duration-75 whitespace-nowrap"
              >
                View Changes {"->"}
              </Link>
            </h1>
          </div>

          <div className="md:mr-[6vw]">
            <AuthMenu />
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-col justify-center items-center">
        <Link
          className="flex mb-3 hover:drop-shadow-lg dark:hover:drop-shadow-neutral-700 ease-linear duration-150"
          href="/"
        >
          <NavbarLogo width={200} height={200} />
        </Link>

        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="md:hidden flex justify-center w-1/8 p-1 mb-3 bg-(--background-alt) border border-(--border) rounded-md"
        >
          <motion.div
            animate={{ rotate: showMenu ? 180 : 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <FaCaretDown />
          </motion.div>
        </button>
        {showMenu && <NavMobile />}
      </div>
      <NavDesktop />
    </div>
  );
}

function NavDesktop() {
  return (
    <div className="hidden md:block">
      <div className="flex flex-row justify-center items-center gap-25 bg-(--background)">
        <Link
          className="mb-3 hover:drop-shadow-md dark:hover:drop-shadow-neutral-700 ease-linear duration-150 hidden lg:block"
          href="/"
        >
          <NavbarLogo width={175} height={175} />
        </Link>
        <div className="flex flex-row gap-3 mt-1 mb-3 border border-(--border) bg-(--background-alt) text-(--text) font-semibold tracking-tight rounded-3xl p-3">
          <Link
            href="/demo"
            className="flex items-center gap-2 ml-2 hover:text-blue-400 ease-linear duration-75 border-r border-r-(--border) pr-5"
          >
            <FaPlay size={10} />
            <h1 className="text-sm">Demo Levels</h1>
          </Link>

          <Link
            href="/search/name"
            className="flex items-center gap-2 ml-2 hover:text-orange-400 ease-linear duration-75 border-r border-r-(--border) pr-5"
          >
            <FaSearch size={11} />
            <h1 className="text-sm">Search</h1>
          </Link>

          <Link
            href="/editor"
            className="flex items-center gap-2 ml-2 hover:text-purple-400 ease-linear duration-75 pr-5 lg:pr-0 border-r lg:border-r-0 border-r-(--border)"
          >
            <FaWrench size={12} />
            <h1 className="text-sm">Level Editor</h1>
          </Link>

          <Link
            href="/about"
            className="group items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75 border-r border-r-(border) pr-5 flex lg:hidden"
          >
            <FaInfoCircle size={12} />
            <h1 className="text-sm">About</h1>
          </Link>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScM2HxSCttdwolVOBKbx0y5S_n04KVshtFBkdbr9Q_ysmhAug/viewform?usp=dialog"
            target="_blank"
            rel="noopener"
            className="group items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75 border-r border-r-(--border) pr-5 flex lg:hidden"
          >
            <IoMail size={13} />
            <h1 className="text-sm">Contact</h1>
          </a>

          <a
            href="https://ko-fi.com/nikokomninos"
            target="_blank"
            rel="noopener"
            className="flex lg:hidden items-center gap-2 ml-2 hover:text-green-400 ease-linear duration-75"
          >
            <FaMoneyBillWave size={14} />
            <h1 className="text-sm">Donate</h1>
          </a>
        </div>

        <div className="hidden lg:flex flex-row justify-center items-center gap-2 mt-1 mb-3 border border-(--border) bg-(--background-alt) text-(--foreground) font-semibold tracking-tight rounded-3xl p-3 text-sm">
          <Link
            href="/about"
            className="flex items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75 border-r border-r-(--border) pr-5"
          >
            <FaInfoCircle size={12} />
            <h1 className="text-sm">About</h1>
          </Link>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScM2HxSCttdwolVOBKbx0y5S_n04KVshtFBkdbr9Q_ysmhAug/viewform?usp=dialog"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75 border-r border-r-(--border) pr-5"
          >
            <IoMail size={13} />
            <h1 className="text-sm">Contact</h1>
          </a>

          <a
            href="https://ko-fi.com/nikokomninos"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 ml-2 hover:text-green-400 ease-linear duration-75"
          >
            <FaMoneyBillWave size={14} />
            <h1 className="text-sm">Donate</h1>
          </a>
        </div>
      </div>
    </div>
  );
}

function NavMobile() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 1, opacity: 0, y: -10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 1, opacity: 0, y: -10 }}
        transition={{
          ease: "backOut",
          duration: 0.2,
        }}
        className="flex flex-col items-center gap-5 p-2 mb-2 w-3/4 border border-(--border) rounded-md bg-(--background-alt)"
      >
        <Link
          href="/demo"
          className="flex items-center gap-2 ml-2 hover:text-blue-400 ease-linear duration-75"
        >
          <FaPlay size={10} />
          <h1 className="text-sm">Demo Levels</h1>
        </Link>

        <Link
          href="/search/name"
          className="flex items-center gap-2 ml-2 hover:text-orange-400 ease-linear duration-75"
        >
          <FaSearch size={11} />
          <h1 className="text-sm">Search</h1>
        </Link>

        <Link
          href="/editor"
          className="flex items-center gap-2 ml-2 hover:text-purple-400 ease-linear duration-75"
        >
          <FaWrench size={12} />
          <h1 className="text-sm">Level Editor</h1>
        </Link>

        <Link
          href="/about"
          className="flex items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75"
        >
          <FaInfoCircle size={12} />
          <h1 className="text-sm">About</h1>
        </Link>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScM2HxSCttdwolVOBKbx0y5S_n04KVshtFBkdbr9Q_ysmhAug/viewform?usp=dialog"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75"
        >
          <IoMail size={13} />
          <h1 className="text-sm">Contact</h1>
        </a>

        <a
          href="https://ko-fi.com/nikokomninos"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 ml-2 hover:text-green-400 ease-linear duration-75"
        >
          <FaMoneyBillWave size={14} />
          <h1 className="text-sm">Donate</h1>
        </a>
      </motion.div>
    </AnimatePresence>
  );
}
