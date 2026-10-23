import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // The custom domain is served at its root, including for a project repository.
  basePath: "",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 768, 1200, 1600],
    imageSizes: [320],
  },
  poweredByHeader: false,
};
export default nextConfig;
