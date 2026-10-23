import { test, expect } from "@playwright/test";

const prefix = "/chryswebsite/";
const publishedUrl = "https://gmichal.github.io/chryswebsite";

test("every published page, internal link and asset works under the project path", async ({
  page,
  request,
}) => {
  const xml = await (await request.get("sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(urls.length).toBeGreaterThan(69);
  const checked = new Set<string>();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const url of urls) {
    expect(url.startsWith(`${publishedUrl}/`), url).toBe(true);
    const response = await page.goto(new URL(url).pathname);
    expect(response?.status(), url).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href", url,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content", /^https:\/\/gmichal\.github\.io\/chryswebsite\/images\//,
    );
    const paths = await page.evaluate(() => {
      const values = Array.from(
        document.querySelectorAll("a[href], link[href], script[src], img[src]"),
      ).map((element) =>
        element.getAttribute("href") || element.getAttribute("src") || "",
      );
      for (const image of document.querySelectorAll("img[srcset]")) {
        values.push(
          ...image.getAttribute("srcset")!.split(",")
            .map((item) => item.trim().split(/\s+/)[0]),
        );
      }
      return values.filter((value) => value.startsWith("/"));
    });
    for (const path of paths) {
      expect(path.startsWith(prefix), `${url}: ${path}`).toBe(true);
      if (checked.has(path)) continue;
      checked.add(path);
      expect((await request.get(path)).status(), path).toBe(200);
    }
  }
  expect(errors).toEqual([]);
  expect(await (await request.get("robots.txt")).text()).toContain(
    `${publishedUrl}/sitemap.xml`,
  );
});

test("desktop and native mobile navigation retain the project path", async ({
  page, isMobile,
}) => {
  await page.goto("./");
  for (const [label, route] of [
    ["About", "about"],
    ["Articles & insights", "articles"],
    ["iGLEAMS", "igleams"],
    ["Contact", "contact"],
  ]) {
    if (isMobile) await page.locator(".mobile-navigation summary").click();
    await page.getByRole("navigation", {
      name: isMobile ? "Mobile navigation" : "Main navigation", exact: true,
    }).getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${prefix}${route}/$`));
  }
});

test("search hydrates and opens the correct article", async ({ page }) => {
  await page.goto("articles/");
  await page.getByLabel("Search the archive").fill("two-year");
  await expect(page.getByRole("status")).toHaveText("1 entry found");
  await page.getByTestId("article-results").getByRole("link").click();
  await expect(page).toHaveURL(
    new RegExp(`${prefix}articles/miniject-two-year-study/$`),
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText("two-year");
});

test("brochure, homepage alias and missing pages work at the project address", async ({
  page, request,
}) => {
  await page.goto("igleams/");
  const brochure = await page
    .getByRole("link", { name: "View the 2023 brochure" }).getAttribute("href");
  expect(brochure).toBe(`${prefix}documents/igleams-symposium-brochure.pdf`);
  expect((await request.get(brochure!)).headers()["content-type"]).toBe(
    "application/pdf",
  );
  await page.goto("home/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href", `${publishedUrl}/`,
  );
  expect((await request.get("CNAME")).status()).toBe(404);
  const response = await page.goto("missing-page/");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: "Return to the homepage" }).click();
  await expect(page).toHaveURL(new RegExp(`${prefix}$`));
});

test("native mobile links and article content work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false, viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4174/chryswebsite/");
  await page.locator(".mobile-navigation summary").click();
  await page.getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Articles & insights" }).click();
  await expect(page).toHaveURL(/\/chryswebsite\/articles\/$/);
  await expect(page.locator("noscript .medical-note")).toBeVisible();
  await context.close();
});
