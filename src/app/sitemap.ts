import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/site";
import { treatments } from "@/lib/treatments";
export const dynamic = "force-static";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [
    "/",
    "/about/",
    "/expertise/",
    "/articles/",
    "/igleams/",
    "/contact/",
    "/privacy/",
    ...treatments.map(({ slug }) => `/${slug}/`),
    ...(await getPublishedArticles()).map(({ slug }) => `/articles/${slug}/`),
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
