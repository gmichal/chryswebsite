import { test, expect } from "@playwright/test";
import inventory from "../../docs/linkedin-inventory.json";
import { published, resultText } from "../articles/content-fixtures";

const linkedin = published.filter((article) => article.linkedin);

test("every discovered LinkedIn record has one published page and sitemap entry", async ({
  request,
}) => {
  expect(linkedin).toHaveLength(inventory.records.length);
  expect(
    new Set(linkedin.map((article) => article.linkedin!.recordId)).size,
  ).toBe(inventory.records.length);
  const archive = await (await request.get("/articles/")).text();
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const record of inventory.records) {
    const article = linkedin.find(
      (item) => item.linkedin!.recordId === record.id,
    );
    expect(article, record.id).toBeDefined();
    expect(article!.slug).toBe(record.resultingSlug);
    expect(archive, record.id).toContain(`data-linkedin-id="${record.id}"`);
    expect(sitemap, record.id).toContain(`/articles/${article!.slug}/`);
    const response = await request.get(`/articles/${article!.slug}/`);
    expect(response.status(), record.id).toBe(200);
    const html = await response.text();
    expect(html).toContain('aria-label="LinkedIn source details"');
    expect(html).toContain(`data-linkedin-id="${record.id}"`);
    expect(html).toContain(record.originalSource ?? record.discoverySource!);
  }
});

test("source filters expose all posts, mentions and comments and combine with search", async ({
  page,
}) => {
  await page.goto("/articles/");
  await expect(page.getByRole("status")).toHaveText(
    resultText(published.length),
  );
  const source = page.getByLabel("Browse by source");
  await source.selectOption("All LinkedIn records");
  await expect(page.getByRole("status")).toHaveText(
    resultText(inventory.records.length, true),
  );
  for (const type of [
    "Post by Chrys",
    "Third-party mention",
    "Comment by Chrys",
  ]) {
    await source.selectOption(type);
    const expected = linkedin.filter(
      (article) => article.linkedin!.type === type,
    ).length;
    await expect(page.getByRole("status")).toHaveText(
      resultText(expected, true),
    );
    await expect(
      page.getByTestId("article-results").getByRole("article"),
    ).toHaveCount(expected);
  }
  await page.getByLabel("Search the archive").fill("Minas Georgopoulos");
  await expect(page.getByRole("status")).toHaveText("1 entry found");
  await page.getByLabel("Browse by subject").selectOption("Clinical research");
  await expect(
    page.getByRole("heading", { name: "No entries found." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(source).toHaveValue("All sources");
  await expect(page.getByLabel("Browse by subject")).toHaveValue(
    "All subjects",
  );
  await expect(page.getByLabel("Search the archive")).toHaveValue("");
  await expect(page.getByRole("status")).toHaveText(
    resultText(published.length),
  );
});

test("excerpt-only entries disclose the missing original and link to the discovery page", async ({
  page,
}) => {
  const article = linkedin.find(
    (item) => item.linkedin!.recordId === "LI-010",
  )!;
  await page.goto(`/articles/${article.slug}/`);
  const provenance = page.getByRole("complementary", {
    name: "LinkedIn source details",
  });
  await expect(provenance).toContainText("Indexed excerpt");
  await expect(provenance).toContainText(
    "The original post link was not available.",
  );
  await expect(provenance.getByRole("link")).toHaveAttribute(
    "href",
    article.linkedin!.discoveryUrl!,
  );
  await expect(page.locator(".article-notice")).toContainText(
    "The full original post was not available.",
  );
  await expect(page.locator(".article-byline time")).toHaveCount(0);
});

test("comments preserve parent authorship and historical invitations explain their context", async ({
  page,
}) => {
  const comment = linkedin.find(
    (item) => item.linkedin!.recordId === "LI-055",
  )!;
  await page.goto(`/articles/${comment.slug}/`);
  await expect(
    page.getByRole("complementary", { name: "LinkedIn source details" }),
  ).toContainText("Comment by Chrys");
  await expect(
    page.getByRole("link", {
      name: "View the parent post and comments on LinkedIn",
    }),
  ).toHaveAttribute("href", comment.linkedin!.originalUrl!);
  await expect(page.locator(".prose")).toContainText(
    "belongs to Minas Georgopoulos",
  );
  const historical = linkedin.find(
    (item) => item.linkedin!.recordId === "LI-007",
  )!;
  await page.goto(`/articles/${historical.slug}/`);
  await expect(page.locator(".prose")).toContainText(
    "provisional dates were superseded",
  );
  await expect(
    page.getByRole("link", { name: "Read the later programme summary" }),
  ).toHaveAttribute("href", "/articles/igleams-3-surgical-education/");
});

test("all LinkedIn records are readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/articles/");
  await expect(
    page.getByTestId("article-results").locator("[data-linkedin-id]"),
  ).toHaveCount(inventory.records.length);
  const last = linkedin.find((item) => item.linkedin!.recordId === "LI-063")!;
  await page
    .getByRole("link")
    .filter({
      has: page.getByRole("heading", { name: last.title, exact: true }),
    })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(last.title);
  await expect(page.locator(".prose")).toContainText("Ana Miguel");
  await context.close();
});
