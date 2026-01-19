import type { Metadata } from "next";
import Logo from "@/components/nav/Logo";

export const metadata: Metadata = {
  title: "About - PachinGO!",
  description: "Peggle Reborn",
};

export default function About() {
  return (
    <div className="lg:px-30">
      <div className="flex justify-center items-center mb-10">
        <Logo width={350} height={350} />
      </div>

      <p className="text-md md:text-lg">
        {" "}
        is a spiritual successor to <s>EA's</s> PopCap's beloved franchise{" "}
        <i>Peggle</i>. The Peggle franchise has lay relatively dormant, with
        later entries straying further from the identity and solid gameplay that
        fans loved from both <i>Peggle</i> and <i>Peggle Nights</i>.{" "}
        <i>PachinGO!</i> aims to bring life back to the franchise, promising:
      </p>

      <ul className="text-md md:text-lg list-disc mt-5 md:ml-20 mb-20">
        <li>
          An artstyle akin to the original <i>Peggle</i>
        </li>
        <li>Demo levels featuring the core gameplay you know and love</li>
        <li>
          A fully-featured level editor, with the ability to upload and download
          user levels
        </li>
        <li>And much more down the line...</li>
      </ul>

      <h1 className="text-xl md:text-3xl font-bold mt-10 mb-10 text-center">
        The Team
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center gap-5 md:gap-20">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="flex w-40 h-40 justify-center items-center border-2 border-(--border-alt) text-2lg">
            nk
          </div>
          <p className="mt-5 text-md md:text-lg">Niko Komninos</p>
          <p className="text-(--foreground-alt) text-sm">Frontend, Backend</p>
        </div>

        <div className="flex flex-col justify-center items-center mt-5">
          <div className="flex w-40 h-40 justify-center items-center border-2 border-(--border-alt) text-2lg">
            tp
          </div>
          <p className="mt-5 text-md md:text-lg">Tahir Peele</p>
          <p className="text-(--foreground-alt) text-sm">Soundtrack, Assets, Game</p>
        </div>

        <div className="flex flex-col justify-center items-center mt-5">
          <div className="flex w-40 h-40 justify-center items-center border-2 border-(--border-alt) text-2lg">
            mvw
          </div>
          <p className="mt-5 text-md md:text-lg">Michael Weiss</p>
          <p className="text-(--foreground-alt) text-sm">Assets, Game</p>
        </div>
      </div>
    </div>
  );
}
