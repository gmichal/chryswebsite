import { ArticleImage } from "@/components/ArticleImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import {
  getPublishedArticle,
  getPublishedArticles,
  formatDate,
} from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";
import { withBasePath } from "@/lib/paths";
import { MedicalNote } from "@/components/MedicalNote";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/JsonLd";
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getPublishedArticles()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = await getPublishedArticle(slug);
  if (!document) notFound();
  const { metadata: article } = document;
  const metadata = pageMetadata(
    article.title,
    article.description,
    `/articles/${slug}/`,
  );
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      section: article.category,
    },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = await getPublishedArticle(slug);
  if (!document) notFound();
  const { metadata: article, body } = document;
  // MDX is trusted, repository-owned content evaluated only during static generation.
  const { default: Content } = await evaluate(body, { ...runtime });
  const related = (await getPublishedArticles())
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === article.category) -
        Number(a.category === article.category),
    )
    .slice(0, 3);
  const url = absoluteUrl(`/articles/${slug}/`);
  return (
    <>
      <header className="shell page-intro article-header">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/articles/">Articles & insights</Link>
          <span aria-hidden="true">/</span>
          <span>{article.kind}</span>
        </nav>
        <p className="eyebrow">
          {article.category} · {article.kind}
        </p>
        <h1>{article.title}</h1>
        <p className="intro-description">{article.description}</p>
        <div className="article-byline">
          <span>{article.author}</span>
          <span>
            {article.date ? (
              <>
                Source published{" "}
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </>
            ) : (
              "Original publication date not recorded"
            )}
          </span>
        </div>
      </header>
      <article className="shell" style={{ paddingBottom: 65 }}>
        <figure>
          <div className="article-cover">
            <ArticleImage
              article={article}
              preload
              sizes="(max-width: 600px) 100vw, 90vw"
            />
          </div>
          <figcaption className="image-caption article-illustration-note">
            {article.imageCaption}
            {article.imageSource && (
              <>
                {" "}
                <a href={article.imageSource.url}>
                  {article.imageSource.label} ↗
                </a>
              </>
            )}
          </figcaption>
        </figure>
        <div className="article-body-grid">
          <aside className="article-sidebar">
            <p className="eyebrow">ORIGINAL SOURCE</p>
            <p>
              <a href={article.source.url}>{article.source.label} ↗</a>
            </p>
            <p className="eyebrow">MATERIAL TYPE</p>
            <p>{article.kind}</p>
            <p className="eyebrow">SOURCE AUTHORSHIP</p>
            <p>
              {article.sourceAuthors?.join(", ") ?? "See the original source"}
            </p>
            <Link href="/articles/">← Back to the archive</Link>
          </aside>
          <div>
            {article.linkedin && (
              <aside
                className="linkedin-provenance"
                aria-label="LinkedIn source details"
                data-linkedin-id={article.linkedin.recordId}
              >
                <p className="eyebrow">{article.linkedin.type}</p>
                <p>
                  <strong>Source access:</strong> {article.linkedin.access}. The
                  original LinkedIn publication date has not been verified.
                </p>
                <p>
                  {article.linkedin.originalUrl ? (
                    <a href={article.linkedin.originalUrl}>
                      {article.linkedin.type === "Comment by Chrys"
                        ? "View the parent post and comments on LinkedIn"
                        : "View the original post on LinkedIn"}{" "}
                      ↗
                    </a>
                  ) : (
                    <>
                      <span>The original post link was not available. </span>
                      <a href={article.linkedin.discoveryUrl!}>
                        View the LinkedIn page where the excerpt was found ↗
                      </a>
                    </>
                  )}
                </p>
              </aside>
            )}
            <p className="article-notice">{article.editorialNote}</p>
            <div className="prose">
              <Content
                components={{
                  a: ({ href, ...props }) => (
                    <a
                      {...props}
                      href={
                        href?.startsWith("/") && !href.startsWith("//")
                          ? withBasePath(href)
                          : href
                      }
                    />
                  ),
                }}
              />
            </div>
            <MedicalNote />
            <section
              className="article-references"
              aria-labelledby="references-heading"
            >
              <h2 id="references-heading">Sources & references</h2>
              <p className="image-caption">
                Source authors:{" "}
                {article.sourceAuthors?.join(", ") ?? "See original source"}.
              </p>
              <ul className="source-list" style={{ marginTop: 20 }}>
                <li>
                  <a href={article.source.url}>{article.source.label} ↗</a>
                </li>
                {article.references.map((reference) => (
                  <li key={reference.url}>
                    <a href={reference.url}>{reference.label} ↗</a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
      <section className="section muted-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CONTINUE EXPLORING</p>
              <h2>Related reading</h2>
            </div>
            <Link className="text-link" href="/articles/">
              All articles ↗
            </Link>
          </div>
          <div className="article-grid">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </div>
      </section>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            url,
            mainEntityOfPage: url,
            image: absoluteUrl(article.image),
            articleSection: article.category,
            inLanguage: "en-GB",
            isBasedOn: {
              "@type": "CreativeWork",
              url: article.source.url,
              name: article.source.label,
              ...(article.date ? { datePublished: article.date } : {}),
            },
            citation: article.references.map((reference) => reference.url),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl(),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Articles & insights",
                item: absoluteUrl("/articles/"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: url,
              },
            ],
          },
        ]}
      />
    </>
  );
}
