import Footer from "~/components/nav/Footer";
import Navbar from "~/components/nav/Navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Demo Levels - PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const demo = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] dark:bg-[url('/pattern2_dark.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="bg-[var(--color-bg)] flex-1 p-15 ml-[6vw] mr-[6vw] border-l-1 border-l-[var(--color-border)] border-r-1 border-r-[var(--color-border)] tracking-tighter min-h-screen">
          <div className="flex justify-center items-center">
            <h1 className="text-lg md:text-3xl font-bold">Coming Soon!</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default demo;
