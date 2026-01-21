import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
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
          <div
            style={{ backgroundImage: "var(--pattern-url)" }}
            className="bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen flex flex-col justify-center items-center"
          >
            {children}
          </div>
      </Suspense>
    </div>
  );
}
