/* Native document links close the mobile details menu on navigation, including without JavaScript. */
import Link from "next/link";
import { navigation } from "@/lib/site";
import { withBasePath } from "@/lib/paths";
import { Arrow } from "./Arrow";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label="Chrys Dimitriou. Consultant Ophthalmic Surgeon, home"
        >
          <span className="wordmark-name">
            Chrys Dimitriou<span className="wordmark-dot">.</span>
          </span>
          <span className="wordmark-subtitle">
            CONSULTANT OPHTHALMIC SURGEON
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact/" className="button button-small header-cta">
          Book a consultation <Arrow />
        </Link>
        <details className="mobile-navigation">
          <summary>
            Menu <span aria-hidden="true">+</span>
          </summary>
          <nav aria-label="Mobile navigation">
            <a href={withBasePath("/")}>Home</a>
            {navigation.map((item) => (
              <a key={item.href} href={withBasePath(item.href)}>
                {item.label}
              </a>
            ))}
            <a href={withBasePath("/contact/")} className="mobile-booking">
              Book a consultation <Arrow />
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
