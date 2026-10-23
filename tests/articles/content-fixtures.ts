import fs from "node:fs";
import path from "node:path";
import type { Article } from "../../src/types/article";

// Read metadata independently of the application loader. Content additions should
// not require changing expected archive counts in the browser tests.
export const content: Article[] = fs
  .readdirSync("content/articles")
  .filter((name) => name.endsWith(".mdx"))
  .map((name) => {
    const text = fs.readFileSync(path.join("content/articles", name), "utf8");
    const metadata = text.replace(/\r\n/g, "\n").split("\n---\n")[0].slice(4);
    return JSON.parse(metadata) as Article;
  });
export const published = content.filter(
  (article) => article.status === "published",
);
export const resultText = (count: number, filtered = false) =>
  `${count} ${count === 1 ? "entry" : "entries"}${filtered ? " found" : " in the archive"}`;
