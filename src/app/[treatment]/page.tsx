import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { Consultation } from "@/components/Consultation";
import { MedicalNote } from "@/components/MedicalNote";
import { JsonLd } from "@/components/JsonLd";
import { treatments } from "@/lib/treatments";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, site } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return treatments.map(({ slug }) => ({ treatment: slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ treatment: string }>;
}) {
  const { treatment } = await params;
  const page = treatments.find(({ slug }) => slug === treatment);
  if (!page) notFound();
  return pageMetadata(page.label, page.description, `/${page.slug}/`);
}
export default async function Treatment({
  params,
}: {
  params: Promise<{ treatment: string }>;
}) {
  const { treatment } = await params;
  const page = treatments.find(({ slug }) => slug === treatment);
  if (!page) notFound();
  return (
    <>
      <PageIntro
        label={page.label}
        title={page.title}
        description={page.description}
        path={`/${page.slug}/`}
      />
      <section className="shell content-split" style={{ paddingBottom: 80 }}>
        <div>
          <div className="image-frame" style={{ aspectRatio: "1.1" }}>
            <Image
              src={`/images/${page.image}.webp`}
              alt={page.imageAlt}
              fill
              preload
              sizes="(max-width: 600px) 100vw, 45vw"
            />
          </div>
          <div className="medical-note">
            <p>{page.introduction}</p>
          </div>
          <nav aria-label="Other treatments">
            <p className="eyebrow">EXPLORE TREATMENTS</p>
            <ul className="source-list">
              {treatments
                .filter(({ slug }) => slug !== page.slug)
                .map((item) => (
                  <li key={item.slug}>
                    <Link href={`/${item.slug}/`}>{item.label} ↗</Link>
                  </li>
                ))}
              <li>
                <Link href="/articles/">
                  Research & professional insights ↗
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="prose">
          {page.sections.map((section, index) => (
            <section key={section.title}>
              <h2 style={index === 0 ? { marginTop: 0 } : undefined}>
                {section.title}
              </h2>
              {section.paragraphs?.map((text) => (
                <p key={text}>{text}</p>
              ))}
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <MedicalNote />
          <div className="source-note">
            <p>Sources and further information. Checked 23 October 2026.</p>
            <ul className="source-list">
              {page.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url}>{source.label} ↗</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="muted-section section">
        <div className="shell two-column">
          <div>
            <p className="eyebrow">YOUR QUESTIONS</p>
            <h2>Before your consultation.</h2>
          </div>
          <div className="faq">
            {page.questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Consultation />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: page.label,
          description: page.description,
          url: absoluteUrl(`/${page.slug}/`),
          about: { "@type": "MedicalSpecialty", name: "Ophthalmology" },
          publisher: { "@id": `${site.url}/#surgeon` },
          citation: page.sources.map((source) => source.url),
        }}
      />
    </>
  );
}
