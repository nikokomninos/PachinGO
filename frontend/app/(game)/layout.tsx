import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import "../globals.css";
import C3Setter from "@/components/game/C3Setter";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
      <Navbar />
      <div
        style={{ backgroundImage: "var(--pattern-url)" }}
        className="bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen"
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
