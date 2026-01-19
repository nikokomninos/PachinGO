import Link from "next/link";
import Logo from "@/components/nav/Logo";

export default function VerifyBefore() {
  return (
    <div className="w-[90vw] md:w-1/2 h-fit p-10 md:p-30 bg-(--background) rounded-2xl border border-(--border-alt) flex flex-col justify-center items-center">
      <Link
        href="/"
        className="mb-10 hover:drop-shadow-lg dark:hover:drop-shadow-neutral-700 ease-linear duration-150"
      >
        <Logo width={300} height={300} />
      </Link>
      <h1 className="text-lg text-center">
        Please check your email for a verification link!
      </h1>
    </div>
  );
}
