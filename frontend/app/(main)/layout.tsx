import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import "../globals.css";
import C3Setter from "@/components/game/C3Setter";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PachinGO!",
  description: "Peggle Reborn",
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
          <div className="bg-(--background) flex-1 p-5 ml-[6vw] mr-[6vw] border-l border-l-(--border) border-r border-r-(--border) min-h-screen">
            {children}
          </div>
        </div>
        <Footer />
      </Suspense>
    </div>
  );
}
