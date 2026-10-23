import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/social-card.jpg",
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: absoluteUrl(path),
      type: "website",
      locale: "en_GB",
      siteName: site.name,
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: `${site.name}, ${site.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [absoluteUrl(image)],
    },
  };
}
