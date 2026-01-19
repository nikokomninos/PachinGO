import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import C3Setter from "@/components/game/C3Setter";
import { Analytics } from "@vercel/analytics/next";

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="tracking-tight">
        <ThemeProvider defaultTheme="dark" enableSystem>
          <Analytics />
          <C3Setter />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
