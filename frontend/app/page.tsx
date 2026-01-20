import {
  FaInfoCircle,
  FaMoneyBillWave,
  FaPlay,
  FaSearch,
  FaWrench,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import AuthMenu from "@/components/nav/AuthMenu";
import Logo from "@/components/nav/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{ backgroundImage: "var(--pattern-url)" }}
      className="bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen flex flex-col justify-center items-center"
    >
      <div className="flex w-full justify-end mr-[12vw] lg:mr-[5vw] lg:mt-0 md:mt-2 mt-2">
        <AuthMenu />
      </div>
      <div className="m-2 p-8 md:p-16 sm:p-20 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 w-[95vw] sm:w-[90vw] lg:h-[90vh] md:h-fit rounded-2xl bg-(--background) border border-(--border) overflow-hidden">
        <div className="col-span-1 flex flex-col justify-center text-center sm:items-center md:items-center lg:items-center">
          <div className="mb-10">
            <Logo width={400} height={400} />
          </div>
          <h2 className="text-lg md:text-xl mb-3 text-(--foreground-alt) font-semibold">
            A spiritual successor to <i>Peggle</i>, featuring a level editor!
          </h2>
          <h2 className="text-sm text-(--foreground-alt) font-semibold mb-5 md:mb-15">
            v0.2 out now!{" "}
            <Link
              href="/changelog"
              className="underline text-sm font-semibold hover:text-(--foreground-alt)/75 ease-linear duration-75 whitespace-nowrap"
            >
              View Changes {"->"}
            </Link>
          </h2>
          <div className="sm:flex md:flex lg:hidden w-full flex-col justify-center items-center">
            <video
              width={800}
              height={600}
              autoPlay
              disablePictureInPicture
              loop
              muted
              className="rounded-md mb-10"
            >
              <source
                src={`${process.env.NEXT_PUBLIC_R2_URL}/Pachingo.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            {/*<div className="bg-(--background-alt) flex flex-col justify-center items-center w-full aspect-4/3 mb-10 border border-(--border-alt) rounded-xl">
            </div>*/}
          </div>

          <div className="flex flex-row">
            <Link
              href="/demo"
              className="flex justify-start items-center p-3 bg-(--background-alt) hover:bg-(--background-alt)/50 border border-(--border) ease-linear duration-75 text-(--foreground) rounded-md mb-5 mr-2 w-65 h-20 gap-4"
            >
              <FaPlay />
              <h1 className="text-(--foreground) text-md lg:text-lg font-semibold">
                Demo Levels
              </h1>
            </Link>

            <Link
              href="/search/name"
              className="flex justify-start items-center p-3 bg-(--background-alt) hover:bg-(--background-alt)/50 border border-(--border) ease-linear duration-75 text-(--foreground) rounded-md mb-5 w-65 h-20 gap-4"
            >
              <FaSearch />
              <h1 className="text-(--foreground) text-md lg:text-lg font-semibold">
                User Levels
              </h1>
            </Link>
          </div>
          <div className="flex flex-row">
            <Link
              href="/editor"
              className="flex justify-start items-center p-3 bg-(--background-alt) hover:bg-(--background-alt)/50 border border-(--border) ease-linear duration-75 text-(--foreground) rounded-md mb-5 mr-2 w-65 h-20 gap-4"
            >
              <FaWrench />
              <h1 className="text-(--foreground) text-md lg:text-lg font-semibold">
                Level Editor
              </h1>
            </Link>

            <Link
              href="/about"
              className="flex justify-start items-center p-3 bg-(--background-alt) hover:bg-(--background-alt)/50 border border-(--border) ease-linear duration-75 text-(--foreground) rounded-md mb-5 w-65 h-20 gap-4"
            >
              <FaInfoCircle />
              <h1 className="text-(--foreground) text-md lg:text-lg font-semibold">
                About
              </h1>
            </Link>
          </div>
          <div className="flex flex-row">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScM2HxSCttdwolVOBKbx0y5S_n04KVshtFBkdbr9Q_ysmhAug/viewform?usp=dialog"
              target="_blank"
              rel="noopener"
              className="flex justify-start items-center p-3 bg-(--background-alt) hover:bg-(--background-alt)/50 border border-(--border) ease-linear duration-75 text-(--foreground) rounded-md mb-5 mr-2 w-65 h-20 gap-4"
            >
              <IoMail />
              <h1 className="text-(--foreground) text-md lg:text-lg font-semibold">
                Contact
              </h1>
            </a>

            <a
              href="https://ko-fi.com/nikokomninos"
              target="_blank"
              rel="noopener"
              className="flex justify-start items-center p-3 bg-(--background-alt) hover:bg-(--background-alt)/50 border border-(--border) ease-linear duration-75 text-(--foreground) rounded-md mb-5 w-65 h-20 gap-4"
            >
              <FaMoneyBillWave />
              <h1 className="text-(--foreground) text-md lg:text-lg font-semibold">
                Donate
              </h1>
            </a>
          </div>
        </div>
        <div className="col-span-1 lg:flex md:hidden hidden flex-col justify-center items-center">
          <video
            width={800}
            height={600}
            autoPlay
            disablePictureInPicture
            loop
            muted
            className="rounded-md"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_R2_URL}/Pachingo.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {/*<div className="bg-(--background-alt) flex flex-col justify-center items-center w-full aspect-4/3 border border-(--border-alt) rounded-xl">
          </div>*/}
        </div>
      </div>
    </div>
  );
}
