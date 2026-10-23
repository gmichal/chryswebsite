"use client";
import { useState } from "react";
import { ArticleImage } from "./ArticleImage";
import Link from "next/link";
import type { Article } from "@/types/article";
import { ArticleCard } from "./ArticleCard";
import { Arrow } from "./Arrow";

export function ArticleExplorer({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All subjects");
  const [sourceType, setSourceType] = useState("All sources");
  const categories = [
    "All subjects",
    ...Array.from(new Set(articles.map((article) => article.category))).sort(),
  ];
  const query = search.trim().toLocaleLowerCase("en-GB");
  const filtered = articles.filter(
    (article) =>
      (category === "All subjects" || article.category === category) &&
      (sourceType === "All sources" ||
        (sourceType === "All LinkedIn records"
          ? !!article.linkedin
          : (article.linkedin?.type ?? "Editorial article") === sourceType)) &&
      `${article.title} ${article.description} ${article.tags.join(" ")} ${article.category} ${article.sourceAuthors?.join(" ") ?? ""}`
        .toLocaleLowerCase("en-GB")
        .includes(query),
  );
  const isFiltered =
    query.length > 0 ||
    category !== "All subjects" ||
    sourceType !== "All sources";
  const featured = !isFiltered
    ? articles.find((article) => article.featured)
    : undefined;
  const visible = featured
    ? filtered.filter((article) => article.slug !== featured.slug)
    : filtered;
  return (
    <div>
      <div
        className="archive-controls"
        role="search"
        aria-label="Search articles"
      >
        <div className="form-field">
          <label htmlFor="article-search">Search the archive</label>
          <input
            id="article-search"
            type="search"
            placeholder="Search a subject, treatment or title…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="article-category">Browse by subject</label>
          <select
            id="article-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="article-source">Browse by source</label>
          <select
            id="article-source"
            value={sourceType}
            onChange={(event) => setSourceType(event.target.value)}
          >
            {[
              "All sources",
              "All LinkedIn records",
              "Post by Chrys",
              "Third-party mention",
              "Comment by Chrys",
              "Editorial article",
            ].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
        <button
          className="clear-button"
          type="button"
          onClick={() => {
            setSearch("");
            setCategory("All subjects");
            setSourceType("All sources");
          }}
        >
          Clear filters
        </button>
      </div>
      <p className="results-count" role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        {isFiltered ? " found" : " in the archive"}
      </p>
      <noscript>
        <p className="medical-note">
          All published entries are shown below. Enable JavaScript to search or
          filter them.
        </p>
      </noscript>
      {featured && (
        <article className="article-feature">
          <Link
            href={`/articles/${featured.slug}/`}
            className="article-feature-image"
            aria-label={`Read ${featured.title}`}
          >
            <ArticleImage
              article={featured}
              sizes="(max-width: 600px) 100vw, 50vw"
            />
          </Link>
          <div>
            <p className="eyebrow">EDITOR’S SELECTION</p>
            <div className="article-meta">
              <span>{featured.category}</span>
              <span>
                {featured.date
                  ? `Source: ${new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(featured.date))}`
                  : "Source date not recorded"}
              </span>
            </div>
            <h2>
              <Link href={`/articles/${featured.slug}/`}>{featured.title}</Link>
            </h2>
            <p>{featured.description}</p>
            <Link className="text-link" href={`/articles/${featured.slug}/`}>
              Explore the article <Arrow />
            </Link>
          </div>
        </article>
      )}
      <div className="article-grid" data-testid="article-results">
        {visible.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-results">
          <h2>No entries found.</h2>
          <p>Try a different word or choose another subject.</p>
          <button
            className="clear-button"
            onClick={() => {
              setSearch("");
              setCategory("All subjects");
              setSourceType("All sources");
            }}
            type="button"
          >
            Show all entries
          </button>
        </div>
      )}
    </div>
  );
}
