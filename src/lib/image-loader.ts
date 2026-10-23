"use client";
import type { ImageLoaderProps } from "next/image";

// All photographs are generated locally at these widths before deployment.
export default function imageLoader({ src, width }: ImageLoaderProps) {
  if (!src.startsWith("/images/") || !src.endsWith(".webp")) return src;
  const variant =
    [320, 480, 768, 1200, 1600].find((size) => size >= width) ?? 1600;
  return src.replace(/\.webp$/, `-${variant}.webp`);
}
