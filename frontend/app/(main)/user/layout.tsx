import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User - PachinGO!",
  description: "Peggle Reborn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      {children}
    </div>
  );
}
