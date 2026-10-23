import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Arrow } from "@/components/Arrow";
import { pageMetadata } from "@/lib/metadata";
import { withBasePath } from "@/lib/paths";
export const metadata = pageMetadata(
  "iGLEAMS & Surgical Education",
  "Explore the history of iGLEAMS, founded by Mr Chrys Dimitriou, with glaucoma microsurgery simulation, educational publications and the archived 2023 programme.",
  "/igleams/",
);
export default function Igleams() {
  return (
    <>
      <PageIntro
        label="iGLEAMS & education"
        title="Knowledge grows when it is shared."
        description="A meeting place for glaucoma microsurgery, practical simulation and the exchange of clinical experience."
        path="/igleams/"
      />
      <section className="shell content-split" style={{ paddingBottom: 80 }}>
        <div className="prose">
          <p className="eyebrow">FOUNDED & CHAIRED BY MR CHRYS DIMITRIOU</p>
          <h2 style={{ marginTop: 0 }}>
            Connecting surgical practice and education.
          </h2>
          <p>
            iGLEAMS grew from the East Anglian Glaucoma Microsurgical Symposium,
            originally known as EAGLaMS. Founded in 2020, its first two-day
            meeting was held in May 2022.
          </p>
          <p>
            The programme combines expert discussion with practical simulation.
            Its focus includes minimally invasive glaucoma surgery, conventional
            glaucoma procedures and the role of visualisation technology in
            surgical education.
          </p>
          <p>
            The original website records participation by more than 200
            delegates across the first two symposia, including trainees,
            fellows, consultants and industry representatives.
          </p>
          <a href="https://www.icenicentre.org/" className="text-link">
            Visit the ICENI Centre <Arrow />
          </a>
        </div>
        <figure>
          <div className="image-frame" style={{ aspectRatio: ".95" }}>
            <Image
              src="/images/chrys-microscope.webp"
              alt="Mr Dimitriou working at a surgical microscope, illustrating his clinical practice"
              fill
              sizes="(max-width: 600px) 100vw, 45vw"
            />
          </div>
          <figcaption className="image-caption">
            Mr Dimitriou in clinical practice. Original website photography.
          </figcaption>
        </figure>
      </section>
      <section className="section muted-section">
        <div className="shell two-column">
          <div>
            <p className="eyebrow">THE SYMPOSIUM ARCHIVE</p>
            <h2>
              A continuing commitment
              <br />
              to surgical learning.
            </h2>
          </div>
          <ol className="timeline">
            <li>
              <span className="year">2020</span>
              <div>
                <h3>The beginning</h3>
                <p>
                  EAGLaMS was founded on 10 October 2020, later becoming
                  iGLEAMS.
                </p>
              </div>
            </li>
            <li>
              <span className="year">2022</span>
              <div>
                <h3>The first symposium</h3>
                <p>The inaugural two-day event took place on 20 and 21 May.</p>
              </div>
            </li>
            <li>
              <span className="year">2023</span>
              <div>
                <h3>Simulation and shared experience</h3>
                <p>
                  On 12 and 13 May, the second symposium brought practical
                  surgical simulation to the ICENI Centre and presentations to
                  the University of Essex Business School.
                </p>
                <Link className="text-link" href="/articles/igleams-2023/">
                  Read the archive note <Arrow />
                </Link>
              </div>
            </li>
            <li>
              <span className="year">2024</span>
              <div>
                <h3>iGLEAMS 3</h3>
                <p>
                  The published programme scheduled 30 September at Firstsite
                  and 1 October at the ICENI Centre, with 3D surgical video and
                  simulation. These later published dates supersede the
                  provisional October dates on the original website.
                </p>
                <Link
                  className="text-link"
                  href="/articles/igleams-3-surgical-education/"
                >
                  Explore the programme article <Arrow />
                </Link>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="shell section two-column">
        <div>
          <p className="eyebrow">ARCHIVED PROGRAMME · 2023</p>
          <h2>
            A closer look
            <br />
            at iGLEAMS 2.
          </h2>
          <p style={{ marginTop: 24 }}>
            The original 12-page symposium brochure preserves the programme,
            faculty and educational context of the 2023 event.
          </p>
          <a
            href={withBasePath("/documents/igleams-symposium-brochure.pdf")}
            className="button"
            style={{ marginTop: 27 }}
          >
            View the 2023 brochure <Arrow />
          </a>
          <p className="image-caption">
            PDF · 3.5 MB · Archived event material
          </p>
        </div>
        <div>
          <ul className="body-list">
            <li>
              <h3>Hands-on simulation</h3>
              <p>
                The first day included 12 stations across three rooms at the
                ICENI Centre, covering a range of glaucoma surgical approaches.
              </p>
            </li>
            <li>
              <h3>Discussion and visualisation</h3>
              <p>
                The second day featured expert presentations, 3D surgical video
                and interactive discussions.
              </p>
            </li>
            <li>
              <h3>Historical information</h3>
              <p>
                Registration details, event-specific accreditation and sponsor
                advertisements in the brochure relate to 2023. They are not
                current invitations or personal treatment recommendations.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <div className="shell" style={{ paddingBottom: 65 }}>
        <p className="source-note">
          Sources: the preserved original iGLEAMS page and programme, and the{" "}
          <a href="https://www.jfophth.com/igleams-3-a-3d-migs-extravaganza/">
            2024 programme introduction by Chrys Dimitriou and Dan Lindfield
          </a>
          . For current educational opportunities, consult the{" "}
          <a href="https://www.icenicentre.org/">ICENI Centre</a>.
        </p>
      </div>
    </>
  );
}
