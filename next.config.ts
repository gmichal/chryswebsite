import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // GitHub project sites use /chryswebsite; local and custom-domain builds use /.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 768, 1200, 1600],
    imageSizes: [320],
  },
  poweredByHeader: false,
};
export default nextConfig;
