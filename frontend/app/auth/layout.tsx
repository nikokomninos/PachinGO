import type { Metadata } from "next";
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
