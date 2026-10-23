import { test, expect } from "@playwright/test";
import { content, published, resultText } from "./content-fixtures";

const clinical = published.filter(
  (article) => article.category === "Clinical research",
);
const miniJect = clinical.filter((article) =>
  /miniject/i.test(
    [
      article.title,
      article.description,
      article.category,
      ...article.tags,
    ].join(" "),
  ),
);

test("article search and categories combine and can be cleared", async ({
  page,
}) => {
  await page.goto("/articles/");
  await expect(page.getByRole("status")).toHaveText(
    resultText(published.length),
  );
  await page.getByLabel("Browse by subject").selectOption("Clinical research");
  await expect(page.getByRole("status")).toHaveText(
    resultText(clinical.length, true),
  );
  await page.getByLabel("Search the archive").fill("miniJECT");
  await expect(page.getByRole("status")).toHaveText(
    resultText(miniJect.length, true),
  );
  await expect(
    page.getByTestId("article-results").getByRole("article"),
  ).toHaveCount(miniJect.length);
  await page.getByLabel("Search the archive").fill("no matching subject xyz");
  await expect(
    page.getByRole("heading", { name: "No entries found." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show all entries" }).click();
  await expect(page.getByRole("status")).toHaveText(
    resultText(published.length),
  );
  await expect(page.getByLabel("Search the archive")).toHaveValue("");
  await expect(page.getByLabel("Browse by subject")).toHaveValue(
    "All subjects",
  );
});

test("individual articles have attribution, references and related reading", async ({
  page,
}) => {
  await page.goto("/articles/");
  await page.getByLabel("Search the archive").fill("two-year");
  await page.getByTestId("article-results").getByRole("link").click();
  await expect(page).toHaveURL(/\/articles\/miniject-two-year-study\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "two-year",
  );
  await expect(
    page.getByText("Website editorial summary", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("time")).toHaveAttribute("datetime", "2025-02-28");
  await expect(page.getByText(/AI-assisted editorial summary/)).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Sources & references" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Related reading" }),
  ).toBeVisible();
});

test("drafts are absent from listing, sitemap, routes and public payload", async ({
  page,
  request,
}) => {
  const drafts = content.filter((article) => article.status === "draft");
  test.skip(drafts.length === 0, "No drafts in this content collection");
  const draft = drafts[0].slug;
  expect((await request.get(`/articles/${draft}/`)).status()).toBe(404);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain(draft);
  const html = await (await request.get("/articles/")).text();
  expect(html).not.toContain(draft);
  await page.goto("/articles/");
  await page.getByLabel("Search the archive").fill(drafts[0].title);
  await expect(page.getByRole("status")).toHaveText("0 entries found");
});

test("unknown dates are disclosed without inventing a publication date", async ({
  page,
}) => {
  await page.goto("/articles/igleams-2023/");
  await expect(
    page.getByText("Original publication date not recorded"),
  ).toBeVisible();
  expect(await page.locator(".article-byline time").count()).toBe(0);
});

test("published content is available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/articles/");
  await expect(page.locator("noscript .medical-note")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "MINIject: a two-year research perspective",
    }),
  ).toBeVisible();
  await context.close();
});
