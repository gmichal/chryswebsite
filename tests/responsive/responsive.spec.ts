import { test, expect } from "@playwright/test";

test("key pages fit phone, tablet and large desktop widths", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/",
      "/about/",
      "/articles/",
      "/articles/cataract-istent-angle-closure/",
      "/contact/",
      "/migs/",
    ]) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }));
      expect(dimensions.scroll, `${route} at ${width}px`).toBeLessThanOrEqual(
        dimensions.viewport + 1,
      );
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  }
});

test("reduced motion is respected", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator('img[alt="Mr Chrys Dimitriou in blue surgical scrubs"]')
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
});
