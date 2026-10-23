import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { published } from "../articles/content-fixtures";

test("each article has distinct image content and complete responsive assets", () => {
  const hashes = new Map<string, string>();
  for (const article of published) {
    const file = path.join("public", article.image);
    const hash = createHash("sha256").update(fs.readFileSync(file)).digest("hex");
    expect(
      hashes.get(hash),
      `${article.slug} reuses another article's image`,
    ).toBeUndefined();
    hashes.set(hash, article.slug);
    for (const width of [320, 480, 768, 1200, 1600]) {
      expect(
        fs.statSync(file.replace(/\.webp$/, `-${width}.webp`)).size,
      ).toBeGreaterThan(0);
    }
    expect(article.imageCaption.length).toBeGreaterThan(10);
  }
});

test("the archive renders a different image for every article", async ({ page }) => {
  await page.goto("/articles/");
  const images = page.locator(
    ".article-card-image img, .article-feature-image img",
  );
  await expect(images).toHaveCount(published.length);
  const sources = await images.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("src")),
  );
  expect(new Set(sources).size).toBe(published.length);
});

test("original LinkedIn images retain attribution, full framing and rounded corners", async ({ page }) => {
  const article = published.find((item) => item.linkedin?.recordId === "LI-001")!;
  await page.goto(`/articles/${article.slug}/`);
  const figure = page.locator("article > figure");
  await expect(figure.locator("figcaption")).toContainText(article.imageCaption);
  await expect(figure.getByRole("link")).toHaveAttribute(
    "href",
    article.linkedin!.originalUrl!,
  );
  await expect(figure.locator("img")).toHaveCSS("object-fit", "contain");
  await expect(figure.locator("img")).toHaveCSS("border-radius", "18px");
  await expect(figure.locator(".article-cover")).toHaveCSS("border-radius", "18px");
  await expect
    .poll(() =>
      figure.locator("img").evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  const imageBox = await figure.locator("img").boundingBox();
  expect(imageBox!.width / imageBox!.height).toBeCloseTo(
    article.imageWidth / article.imageHeight,
    2,
  );
});

test("created artwork is clearly labelled as an editorial illustration", async ({ page }) => {
  await page.goto("/articles/combined-cataract-migs-commentary/");
  await expect(page.locator("article > figure figcaption")).toContainText(
    "AI-generated editorial illustration",
  );
  await expect(page.locator(".article-cover img")).toHaveAttribute("alt", /illustration/i);
  await expect(page.locator(".article-cover")).toHaveCSS("border-radius", "18px");
});

test("image credits name the image-post author separately from the article source", async ({ page }) => {
  await page.goto("/articles/linkedin-054-brief-preserflo-reply/");
  await expect(page.locator("article > figure figcaption")).toContainText(
    "Image from the parent LinkedIn post by Dan Lindfield.",
  );
  await expect(page.locator("article > figure figcaption")).toContainText(
    "Mr Dimitriou’s comment appears beneath that post.",
  );
  await page.goto("/articles/professional-recognition/");
  await expect(page.locator("article > figure figcaption")).toContainText(
    "Image from the original LinkedIn post by Chrys Dimitriou.",
  );
});
