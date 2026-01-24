import Image from "next/image";
import Link from "next/link";

// The site's footer
const Footer = () => {
  return (
    <div className="h-fit md:h-10 bg-(--background-alt) border-t border-t-(--border) p-5 flex flex-row justify-center items-center gap-12 md:gap-5">
      <Link href="/">
        <Image
          src="/logo_small.png"
          alt="PachinGO! Logo, Small Version"
          width={10}
          height={10}
          className="w-10 md:w-6"
        />
      </Link>

      <div className="grid md:flex grid-rows-2 gap-5">
        <div className="flex justify-center row-span-1 gap-5">
          <Link
            href="/demo"
            className="font-semibold text-xs hover:text-(--foreground-alt) ease-linear duration-75"
          >
            Demo Levels
          </Link>

          <Link
            href="/search/name"
            className="font-semibold text-xs hover:text-(--foreground-alt) ease-linear duration-75"
          >
            User Levels
          </Link>

          <Link
            href="/editor"
            className="font-semibold text-xs hover:text-(--foreground-alt) ease-linear duration-75"
          >
            Level Editor
          </Link>
        </div>

        <div className="flex justify-center row-span-1 gap-5">
          <Link
            href="/About"
            className="font-semibold text-xs hover:text-(--foreground-alt) ease-linear duration-75"
          >
            About
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLScM2HxSCttdwolVOBKbx0y5S_n04KVshtFBkdbr9Q_ysmhAug/viewform?usp=dialog"
            target="_blank"
            rel="noopener"
            className="font-semibold text-xs hover:text-(--foreground-alt) ease-linear duration-75"
          >
            Contact
          </Link>

          <Link
            href="https://ko-fi.com/nikokomninos"
            target="_blank"
            rel="noopener"
            className="font-semibold text-xs hover:text-(--foreground-alt) ease-linear duration-75"
          >
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
