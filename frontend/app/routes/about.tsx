import Footer from "~/components/nav/Footer";
import Logo from "~/components/nav/Logo";
import Navbar from "~/components/nav/Navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const about = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] dark:bg-[url('/pattern2_dark.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="bg-[var(--color-bg)] flex-1 p-15 ml-[6vw] mr-[6vw] border-l-1 border-l-[var(--color-border)] border-r-1 border-r-[var(--color-border)] tracking-tighter min-h-screen">
          <div className="flex justify-center items-center mb-10">
            <Logo width={100} />
          </div>

          <p className="text-xl">
            {" "}
            is a spiritual successor to <s>EA's</s> PopCap's beloved franchise{" "}
            <i>Peggle</i>. The Peggle franchise has lay relatively dormant, with
            later entries straying further from the identity and solid gameplay
            that fans loved from both <i>Peggle</i> and <i>Peggle Nights</i>.{" "}
            <i>PachinGO!</i> aims to bring life back to the franchise,
            promising:
          </p>

          <ul className="text-xl list-disc mt-5 ml-20 mb-20">
            <li>
              An artstyle akin to the original <i>Peggle</i>
            </li>
            <li>Demo levels featuring the core gameplay you know and love</li>
            <li>
              A fully-featured level editor, with the ability to upload and
              download user levels
            </li>
            <li>And much more down the line...</li>
          </ul>

          <h1 className="text-4xl font-bold mt-10 mb-10 text-center">The Team</h1>
          <div className="grid grid-cols-3">
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="flex w-40 h-40 justify-center items-center border-2 border-[var(--color-border-alt)] text-2xl">
                nk
              </div>
              <p className="mt-10 text-xl">Nikolaos Komninos</p>
            </div>

            <div className="flex flex-col justify-center items-center mt-5">
              <div className="flex w-40 h-40 justify-center items-center border-2 border-[var(--color-border-alt)] text-2xl">
                tp
              </div>
              <p className="mt-10 text-xl">Tahir Peele</p>
            </div>

            <div className="flex flex-col justify-center items-center mt-5">
              <div className="flex w-40 h-40 justify-center items-center border-2 border-[var(--color-border-alt)] text-2xl">
                mvw
              </div>
              <p className="mt-10 text-xl">Michael Weiss</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default about;
