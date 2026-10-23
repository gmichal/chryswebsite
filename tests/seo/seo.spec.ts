import { test, expect } from "@playwright/test";

test("every sitemap page has unique SEO metadata, headings and valid structured data", async ({
  page,
  request,
}) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const url of urls) {
    const response = await page.goto(new URL(url).pathname);
    expect(response?.status(), url).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      url,
    );
    const title = await page.title();
    expect(titles.has(title), title).toBe(false);
    titles.add(title);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description?.length).toBeGreaterThan(40);
    expect(descriptions.has(description!), description!).toBe(false);
    descriptions.add(description!);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /https:\/\/www.chrysdimitriou.com\/images\//,
    );
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(schemas.length).toBeGreaterThan(0);
    for (const schema of schemas)
      expect(() => JSON.parse(schema)).not.toThrow();
    const images = await page
      .locator("img")
      .evaluateAll((elements) =>
        elements.map((element) => ({
          alt: element.getAttribute("alt"),
          src: element.getAttribute("src")!,
        })),
      );
    for (const image of images) {
      expect(image.alt).not.toBeNull();
      expect(image.src).not.toContain("wixstatic");
      expect((await request.get(image.src)).status()).toBe(200);
    }
  }
});

test("static hosting files and homepage alias are correct", async ({
  request,
  page,
}) => {
  expect(await (await request.get("/CNAME")).text()).toBe(
    "www.chrysdimitriou.com\n",
  );
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Sitemap: https://www.chrysdimitriou.com/sitemap.xml",
  );
  await page.goto("/home/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.chrysdimitriou.com/",
  );
});
