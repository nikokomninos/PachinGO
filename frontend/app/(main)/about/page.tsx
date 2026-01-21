import type { Metadata } from "next";
import Logo from "@/components/nav/Logo";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About - PachinGO!",
  description: "Ready to become a PachinGOD?",
};

export default function About() {
  return (
    <div className="lg:px-30">
      <div className="flex justify-center items-center mb-10">
        <Logo width={350} height={350} />
      </div>

      <p className="text-md md:text-lg">
        {" "}
        is a game inspired by{" "}
        <a href="https://en.wikipedia.org/wiki/Pachinko" className="underline">
          Japanese Pachinko machines
        </a>
        , and is a spiritual successor to PopCap's beloved <i>Peggle</i>{" "}
        franchise. The Peggle franchise has lay relatively dormant, with later
        entries straying further from the identity and solid gameplay that fans
        loved from both <i>Peggle</i> and <i>Peggle Nights</i>. <i>PachinGO!</i>{" "}
        aims to extend the franchise, promising:
      </p>

      <ul className="text-md md:text-lg list-disc mt-5 ml-5 md:ml-20 mb-20">
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
        <Developer
          name="Niko Komninos"
          roles="Frontend, Backend"
          picture="/nk.jpg"
          github="https://github.com/nikokomninos"
          linkedin="https://www.linkedin.com/in/nikokomninos/"
        />
        <Developer
          name="Tahir Peele"
          roles="Game, Assets, Soundtrack"
          picture="/tp.png"
          github="https://github.com/TahirPeeleDEV"
          linkedin="https://www.linkedin.com/in/tahir-peele/"
        />
        <Developer
          name="Michael Weiss"
          roles="Game, Assets"
          picture="/mvw.jpg"
          github="https://github.com/MichaelWeiss427"
          linkedin="https://www.linkedin.com/in/michael-weiss-93aa143a7/"
        />
      </div>
    </div>
  );
}

function Developer({
  name,
  roles,
  picture,
  github,
  linkedin,
}: {
  name: string;
  roles: string;
  picture: string;
  github: string;
  linkedin: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <div className="flex w-40 h-40 justify-center items-center text-lg">
        <Image src={picture} alt={name} width={800} height={800} className="rounded-sm"/>
      </div>
      <p className="mt-5 text-md md:text-lg">{name}</p>
      <p className="text-(--foreground-alt) text-sm mb-3">{roles}</p>
      <div className="flex gap-4">
        <a href={github} target="_blank" rel="noopener">
          <FaGithub />
        </a>
        <a href={linkedin} target="_blank" rel="noopener">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}
