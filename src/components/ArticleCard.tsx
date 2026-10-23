import { ArticleImage } from "./ArticleImage";
import Link from "next/link";
import type { Article } from "@/types/article";
import { Arrow } from "./Arrow";
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article
      className="article-card"
      data-linkedin-id={article.linkedin?.recordId}
    >
      <Link href={`/articles/${article.slug}/`} className="article-card-link">
        <div className="article-card-image">
          <ArticleImage
            article={article}
            sizes="(max-width: 700px) 92vw, (max-width: 1000px) 46vw, 30vw"
          />
        </div>
        <div className="article-card-content">
          {article.linkedin && (
            <p className="article-source-type">
              {article.linkedin.type} · {article.linkedin.access}
            </p>
          )}
          <div className="article-meta">
            <span>{article.category}</span>
            <span>
              {article.date ? "Source: " : ""}
              {article.date
                ? new Intl.DateTimeFormat("en-GB", {
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(article.date))
                : "Date not recorded"}
            </span>
          </div>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <span className="text-link">
            Read{" "}
            {article.linkedin
              ? "archive entry"
              : article.kind === "Research brief"
                ? "research brief"
                : "the story"}{" "}
            <Arrow />
          </span>
        </div>
      </Link>
    </article>
  );
}
