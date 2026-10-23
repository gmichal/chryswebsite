import { test, expect } from "@playwright/test";

test("homepage introduces the surgeon and consultation journey", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /A clear focus.*on your vision/,
  );
  await expect(
    page.getByRole("heading", { name: "Mr Chrys Dimitriou", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Book a consultation" }).last().click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "conversation",
  );
});

test("desktop or native mobile navigation reaches each main page", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  for (const [label, route] of [
    ["About", "/about/"],
    ["Expertise", "/expertise/"],
    ["Articles & insights", "/articles/"],
    ["iGLEAMS", "/igleams/"],
    ["Contact", "/contact/"],
  ]) {
    const nav = page.getByRole("navigation", {
      name: isMobile ? "Mobile navigation" : "Main navigation",
      exact: true,
    });
    if (isMobile) {
      await expect(nav).toBeHidden();
      await page.locator(".mobile-navigation summary").click();
      await expect(nav).toBeVisible();
    }
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    if (isMobile) await expect(nav).toBeHidden();
  }
});

test("original routes, brochure and legacy section anchors remain available", async ({
  page,
  request,
}) => {
  for (const route of [
    "/home/",
    "/about/",
    "/igleams/",
    "/cataract/",
    "/glaucoma/",
    "/migs/",
    "/laser/",
    "/_files/ugd/e67dc7_b817237c931a4e75a1a1cdd99502e656.pdf",
  ])
    expect((await request.get(route)).status(), route).toBe(200);
  await page.goto("/#dataItem-j6w6mgyd1");
  await expect(page.locator("#dataItem-j6w6mgyd1")).toBeAttached();
  await expect(page.locator("#dataItem-j6w6mgyf1")).toBeAttached();
});

test("unknown pages return a real 404 and offer a way home", async ({
  page,
}) => {
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Let’s find your way.",
  );
  await page.getByRole("link", { name: "Return to the homepage" }).click();
  await expect(page).toHaveURL(/:\d+\/$/);
});

test("all internal page and document links resolve", async ({
  page,
  request,
}) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  const checked = new Set<string>();
  for (const route of paths) {
    await page.goto(route);
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href")!),
      );
    for (const link of links) {
      if (checked.has(link)) continue;
      checked.add(link);
      const target = new URL(link, "http://127.0.0.1:4173");
      const result = await request.get(target.pathname);
      expect(result.status(), `${route} -> ${link}`).toBe(200);
      if (target.hash && result.headers()["content-type"].includes("text/html"))
        expect(await result.text(), link).toContain(
          `id="${target.hash.slice(1)}"`,
        );
    }
  }
});
