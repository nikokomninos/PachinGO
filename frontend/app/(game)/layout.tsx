import type { Metadata } from "next";
import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
import "../globals.css";

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
