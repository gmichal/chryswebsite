import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { Article, ArticleDocument } from "@/types/article";

const directory = path.join(process.cwd(), "content/articles");
function isReference(value: unknown): value is Article["source"] {
  if (!value || typeof value !== "object") return false;
  const ref = value as Record<string, unknown>;
  return (
    typeof ref.label === "string" &&
    ref.label.length > 0 &&
    typeof ref.url === "string" &&
    /^https:\/\//.test(ref.url)
  );
}
function parseArticle(source: string, filename: string): ArticleDocument {
  const match = source
    .replace(/\r\n/g, "\n")
    .match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match)
    throw new Error(
      `${filename}: expected JSON front matter between --- lines`,
    );
  const value = JSON.parse(match[1]) as Record<string, unknown>;
  const fail = (field: string): never => {
    throw new Error(`${filename}: invalid ${field}`);
  };
  for (const key of [
    "slug",
    "title",
    "description",
    "author",
    "category",
    "image",
    "imageAlt",
    "imageCaption",
    "editorialNote",
  ]) {
    if (typeof value[key] !== "string" || !(value[key] as string).trim())
      fail(key);
  }
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug as string) ||
    filename !== `${value.slug}.mdx`
  )
    fail("slug (must match filename)");
  if (value.status !== "draft" && value.status !== "published") fail("status");
  if (
    ![
      "Research brief",
      "Professional update",
      "Education",
      "LinkedIn post",
      "LinkedIn mention",
      "LinkedIn comment",
    ].includes(value.kind as string)
  )
    fail("kind");
  if (
    value.date !== null &&
    (typeof value.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value.date) ||
      Number.isNaN(Date.parse(value.date)) ||
      new Date(value.date).toISOString().slice(0, 10) !== value.date)
  )
    fail("date (ISO date or null)");
  if (
    !Array.isArray(value.tags) ||
    !value.tags.every((tag) => typeof tag === "string")
  )
    fail("tags");
  if (!isReference(value.source)) fail("source");
  for (const dimension of ["imageWidth", "imageHeight"]) {
    if (
      !Number.isInteger(value[dimension]) ||
      (value[dimension] as number) <= 0
    )
      fail(dimension);
  }
  if (value.imageSource !== undefined && !isReference(value.imageSource))
    fail("imageSource");
  if (
    value.imageFit !== undefined &&
    value.imageFit !== "cover" &&
    value.imageFit !== "contain"
  )
    fail("imageFit");
  if (!Array.isArray(value.references) || !value.references.every(isReference))
    fail("references");
  if (
    value.sourceAuthors !== undefined &&
    (!Array.isArray(value.sourceAuthors) ||
      !value.sourceAuthors.every((author) => typeof author === "string"))
  )
    fail("sourceAuthors");
  if (value.featured !== undefined && typeof value.featured !== "boolean")
    fail("featured");
  if (value.linkedin !== undefined) {
    if (!value.linkedin || typeof value.linkedin !== "object") fail("linkedin");
    const linkedin = value.linkedin as Record<string, unknown>;
    if (
      typeof linkedin.recordId !== "string" ||
      !/^LI-\d{3}$/.test(linkedin.recordId)
    )
      fail("linkedin.recordId");
    if (
      !["Post by Chrys", "Third-party mention", "Comment by Chrys"].includes(
        linkedin.type as string,
      )
    )
      fail("linkedin.type");
    if (
      !["Public post", "Indexed excerpt", "Comment excerpt"].includes(
        linkedin.access as string,
      )
    )
      fail("linkedin.access");
    for (const field of ["originalUrl", "discoveryUrl"]) {
      const url = linkedin[field];
      if (
        url !== null &&
        (typeof url !== "string" ||
          !/^https:\/\/(?:[a-z]+\.)?linkedin\.com\//.test(url))
      )
        fail(`linkedin.${field}`);
    }
    if (!linkedin.originalUrl && !linkedin.discoveryUrl)
      fail("linkedin source URL");
  }
  if (!/^\/images\/[a-z0-9-]+\.webp$/.test(value.image as string))
    fail("image (local WebP path)");
  if (!match[2].trim()) fail("body");
  return { metadata: value as unknown as Article, body: match[2] };
}

export const getArticleDocuments = cache(
  async (): Promise<ArticleDocument[]> => {
    const files = (await fs.readdir(directory))
      .filter((file) => file.endsWith(".mdx"))
      .sort();
    const documents = await Promise.all(
      files.map(async (file) =>
        parseArticle(
          await fs.readFile(path.join(directory, file), "utf8"),
          file,
        ),
      ),
    );
    const linkedinIds = new Set<string>();
    const publishedImages = new Map<string, string>();
    for (const { metadata } of documents) {
      if (metadata.status === "published") {
        const previousSlug = publishedImages.get(metadata.image);
        if (previousSlug)
          throw new Error(
            `${metadata.slug}: image already assigned to ${previousSlug}; choose an image for this article`,
          );
        publishedImages.set(metadata.image, metadata.slug);
      }
      if (metadata.linkedin) {
        if (linkedinIds.has(metadata.linkedin.recordId))
          throw new Error(
            `Duplicate LinkedIn record: ${metadata.linkedin.recordId}`,
          );
        linkedinIds.add(metadata.linkedin.recordId);
      }
      const base = path.join(process.cwd(), "public", metadata.image);
      await fs.access(base);
      for (const width of [320, 480, 768, 1200, 1600]) {
        await fs.access(base.replace(/\.webp$/, `-${width}.webp`));
      }
    }
    return documents;
  },
);
export const getPublishedArticles = cache(async (): Promise<Article[]> =>
  (await getArticleDocuments())
    .filter(({ metadata }) => metadata.status === "published")
    .map(({ metadata }) => metadata)
    .sort(
      (a, b) =>
        (b.date ?? "").localeCompare(a.date ?? "") ||
        a.title.localeCompare(b.title),
    ),
);
export async function getPublishedArticle(slug: string) {
  return (await getArticleDocuments()).find(
    ({ metadata }) => metadata.slug === slug && metadata.status === "published",
  );
}
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
