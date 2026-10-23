"use client";
import type { ImageLoaderProps } from "next/image";
import { withBasePath } from "./paths";

// All photographs are generated locally at these widths before deployment.
export default function imageLoader({ src, width }: ImageLoaderProps) {
  if (!src.startsWith("/images/")) return src;
  if (!src.endsWith(".webp")) return withBasePath(src);
  const variant =
    [320, 480, 768, 1200, 1600].find((size) => size >= width) ?? 1600;
  return withBasePath(src.replace(/\.webp$/, `-${variant}.webp`));
}
