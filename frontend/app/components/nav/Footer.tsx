/**
 * Footer.tsx - a component for a reusable footer
 */

import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="h-fit md:h-10 bg-[var(--color-bg-alt)] border-t-1 border-t-[var(--color-border)] p-5 flex flex-row justify-center items-center gap-12 md:gap-5">
      <Link to="/">
        <img
          src="/logo_small.png"
          alt="PachinGO! Logo, Small Version"
          className="w-10 md:w-6"
        />
      </Link>

      <div className="grid md:flex grid-rows-2 gap-5">
        <div className="flex justify-center row-span-1 gap-5">
          <Link
            to="/demo"
            className="font-semibold text-xs hover:text-[var(--color-text-alt)] ease-linear duration-75"
          >
            Demo Levels
          </Link>

          <Link
            to="/search"
            className="font-semibold text-xs hover:text-[var(--color-text-alt)] ease-linear duration-75"
          >
            User Levels
          </Link>

          <Link
            to="/editor"
            className="font-semibold text-xs hover:text-[var(--color-text-alt)] ease-linear duration-75"
          >
            Level Editor
          </Link>
        </div>

        <div className="flex justify-center row-span-1 gap-5">
          <Link
            to="/about"
            className="font-semibold text-xs hover:text-[var(--color-text-alt)] ease-linear duration-75"
          >
            About
          </Link>
          <Link
            to="https://docs.google.com/forms/d/e/1FAIpQLScM2HxSCttdwolVOBKbx0y5S_n04KVshtFBkdbr9Q_ysmhAug/viewform?usp=dialog"
            target="_blank"
            className="font-semibold text-xs hover:text-[var(--color-text-alt)] ease-linear duration-75"
          >
            Contact
          </Link>

          <Link
            to="https://ko-fi.com/nikokomninos"
            target="_blank"
            className="font-semibold text-xs hover:text-[var(--color-text-alt)] ease-linear duration-75"
          >
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
