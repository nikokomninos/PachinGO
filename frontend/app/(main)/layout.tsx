import type { Metadata } from "next";
import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
import "../globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "PachinGO!",
  description: "Ready to become a PachinGOD?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense>
        <Navbar />
        <div
          style={{ backgroundImage: "var(--pattern-url)" }}
          className="bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen"
        >
          <div className="bg-(--background) flex-1 p-5 ml-[3vw] mr-[3vw] md:ml-[6vw] md:mr-[6vw] border-l border-l-(--border) border-r border-r-(--border) min-h-screen">
            {children}
          </div>
        </div>
        <Footer />
      </Suspense>
    </div>
  );
}
