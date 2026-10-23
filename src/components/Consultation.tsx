import Link from "next/link";
import { site } from "@/lib/site";
import { Arrow } from "./Arrow";
export function Consultation() {
  return (
    <section className="consultation-band" id="contact">
      <div className="shell consultation-inner">
        <div>
          <p className="eyebrow">YOUR NEXT STEP</p>
          <h2>Let’s talk about your vision.</h2>
          <p>
            A considered conversation. A clear understanding of your options.
          </p>
        </div>
        <div className="consultation-actions">
          <Link className="button button-light" href="/contact/">
            Arrange a consultation <Arrow />
          </Link>
          <a className="telephone-link" href={site.phoneHref}>
            or call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
