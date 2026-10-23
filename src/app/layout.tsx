import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Cataract & Glaucoma Surgeon, Colchester`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  verification: { google: "D5PVkGj6nL_wxDol8jGCpckOwREQDNeFpzNWSyx3xcg" },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body id="top">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${site.url}/#surgeon`,
            name: site.name,
            jobTitle: site.title,
            url: site.url,
            image: `${site.url}/images/chrys-portrait.webp`,
            sameAs: [site.linkedin, site.nhs, site.ramsay, site.researchgate],
            knowsAbout: ["Cataract surgery", "Glaucoma", "Ophthalmology"],
            identifier: {
              "@type": "PropertyValue",
              propertyID: "GMC reference",
              value: "6117886",
            },
          }}
        />
      </body>
    </html>
  );
}
