import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Keep this checkout as the root even when parent folders contain lockfiles.
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
