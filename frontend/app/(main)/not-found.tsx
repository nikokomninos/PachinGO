import Logo from "@/components/nav/Logo";
import "../globals.css"
import { ThemeProvider } from "next-themes";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Link href="/" className="mb-10 hover:drop-shadow-lg dark:hover:drop-shadow-neutral-700 ease-linear duration-150">
        <Logo width={300} height={300}/>
      </Link>
      <h1>The PachinGODs deem this page non-existent!</h1>
    </div>
  );
};
