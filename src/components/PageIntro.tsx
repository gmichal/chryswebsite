import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/site";
export function PageIntro({
  label,
  title,
  description,
  path,
}: {
  label: string;
  title: string;
  description: string;
  path: string;
}) {
  return (
    <section className="page-intro shell">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>{label}</span>
      </nav>
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="intro-description">{description}</p>
      <JsonLd
        data={{
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
              name: label,
              item: absoluteUrl(path),
            },
          ],
        }}
      />
    </section>
  );
}
