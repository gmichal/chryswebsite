import Link from "next/link";
import { navigation, site } from "@/lib/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div>
          <Link className="footer-name" href="/">
            Chrys Dimitriou.
          </Link>
          <p>Expertise. Precision. Personal care.</p>
          <span className="eyebrow">COLCHESTER · ESSEX · UNITED KINGDOM</span>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-contact">
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={`mailto:${site.secretaryEmail}`}>Email the secretary</a>
          <a href={site.linkedin}>LinkedIn ↗</a>
          <a href={site.researchgate}>ResearchGate ↗</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Mr Chrys Dimitriou</p>
        <p>GMC reference 6117886</p>
        <Link href="/privacy/">Privacy & website information</Link>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
