import { PageIntro } from "@/components/PageIntro";
import { ArticleExplorer } from "@/components/ArticleExplorer";
import { getPublishedArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
import publications from "../../../content/publications.json";
export const metadata = pageMetadata(
  "Articles & Insights",
  "A searchable archive of glaucoma and cataract research, surgical education and professional updates, with original publications and clear source attribution.",
  "/articles/",
);
export default async function Articles() {
  const articles = await getPublishedArticles();
  const linkedinCount = articles.filter((article) => article.linkedin).length;
  return (
    <>
      <PageIntro
        label="Articles & insights"
        title="A closer look. A wider perspective."
        description="Research, surgical education and professional updates, alongside LinkedIn posts, mentions and comments. Explore by subject or source."
        path="/articles/"
      />
      <section
        className="shell"
        style={{ paddingBottom: 85 }}
        aria-label="Articles archive"
      >
        <p className="archive-coverage">
          All {linkedinCount} discovered LinkedIn records are included. Original
          posts, third-party mentions and comments are labelled separately. Some
          entries are summaries of indexed excerpts, with a link to where they
          were found. This is not a complete account export.
        </p>
        <ArticleExplorer articles={articles} />
        <div className="source-note">
          <p>
            Entries are attributed editorial summaries, not newly authored
            clinical advice. Dates identify the original source publication
            where known. The archive reflects publicly accessible material and
            is not a complete LinkedIn history.
          </p>
        </div>
      </section>
      <section className="section muted-section">
        <div className="shell">
          <p className="eyebrow">THE PUBLISHED RECORD</p>
          <h2>Selected scientific bibliography</h2>
          <p style={{ marginTop: 18, maxWidth: 700 }}>
            Original journal articles and research reports, including earlier
            work. Links lead to the publisher, PubMed or an institutional
            repository. Authorship roles are shown explicitly.
          </p>
          <div className="faq" style={{ marginTop: 30 }}>
            <details>
              <summary>
                Browse {publications.length} verified publication records
              </summary>
              <ol className="publication-list">
                {publications.map((publication) => (
                  <li key={publication.id}>
                    <a href={publication.url}>{publication.title} ↗</a>
                    <p>
                      {publication.publication}
                      {publication.date
                        ? ` · ${publication.date.slice(0, 4)}`
                        : ""}
                      <br />
                      Mr Dimitriou: {publication.chrysRole}
                    </p>
                  </li>
                ))}
              </ol>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
