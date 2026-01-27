import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_R2_URL}/**` || "")],
  },
};

export default nextConfig;
