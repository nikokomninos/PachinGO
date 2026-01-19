export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-5xl mx-auto py-10">{children}</div>;
}
