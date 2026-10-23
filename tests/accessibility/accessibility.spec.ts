import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const route of [
  "/",
  "/about/",
  "/expertise/",
  "/cataract/",
  "/glaucoma/",
  "/migs/",
  "/laser/",
  "/articles/",
  "/articles/miniject-two-year-study/",
  "/igleams/",
  "/contact/",
  "/privacy/",
]) {
  test(`WCAG checks: ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("skip link and menu are operable by keyboard", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  // Mobile Safari does not include links in default Tab navigation.
  if (isMobile)
    await page.getByRole("link", { name: "Skip to main content" }).focus();
  else await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  if (isMobile) {
    const summary = page.locator(".mobile-navigation summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeHidden();
  }
});
