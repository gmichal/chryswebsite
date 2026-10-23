import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Consultation } from "@/components/Consultation";
import { MedicalNote } from "@/components/MedicalNote";
import { Arrow } from "@/components/Arrow";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Expertise & Treatments",
  "Explore Mr Dimitriou’s specialist cataract and glaucoma care, laser treatment, minimally invasive glaucoma surgery and general ophthalmology in Colchester.",
  "/expertise/",
);
const areas = [
  {
    href: "/cataract/",
    label: "01 · CATARACT & LENS SURGERY",
    title: "A considered approach to cataract care.",
    description:
      "Routine and complex cataract surgery, intraocular lens implants and assessment for combined cataract and glaucoma procedures.",
    image: "chrys-microscope",
    alt: "Mr Dimitriou at a surgical microscope",
  },
  {
    href: "/glaucoma/",
    label: "02 · GLAUCOMA",
    title: "Specialist care, from monitoring to surgery.",
    description:
      "Adult glaucoma care encompassing eye drops, laser treatment, minimally invasive procedures, trabeculectomy and aqueous shunt surgery.",
    image: "chrys-consulting",
    alt: "Mr Dimitriou beside a slit-lamp examination microscope",
  },
];
export default function Expertise() {
  return (
    <>
      <PageIntro
        label="Expertise"
        title="Specialist knowledge. Individual decisions."
        description="Cataract and glaucoma expertise, supported by a wider practice in general ophthalmology. Every treatment decision begins with understanding your eyes and your priorities."
        path="/expertise/"
      />
      <div className="shell">
        {areas.map((area) => (
          <section
            key={area.href}
            className="content-split"
            style={{
              paddingBlock: "35px 65px",
              borderTop: "1px solid var(--line)",
            }}
          >
            <div className="image-frame" style={{ aspectRatio: "1.4" }}>
              <Image
                src={`/images/${area.image}.webp`}
                alt={area.alt}
                fill
                sizes="(max-width: 600px) 100vw, 45vw"
              />
            </div>
            <div>
              <p className="eyebrow">{area.label}</p>
              <h2>{area.title}</h2>
              <p>{area.description}</p>
              <Link
                className="text-link"
                style={{ marginTop: 25 }}
                href={area.href}
              >
                Explore treatment options <Arrow />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <section className="muted-section section">
        <div className="shell two-column">
          <div>
            <p className="eyebrow">FOCUSED TREATMENT OPTIONS</p>
            <h2>
              Understanding the
              <br />
              approaches to glaucoma.
            </h2>
          </div>
          <ul className="body-list">
            <li>
              <h3>
                <Link href="/migs/">Minimally invasive glaucoma surgery ↗</Link>
              </h3>
              <p>
                Explore how MIGS fits within the range of glaucoma treatments
                and why an individual assessment matters.
              </p>
            </li>
            <li>
              <h3>
                <Link href="/laser/">Glaucoma laser treatment ↗</Link>
              </h3>
              <p>
                Selective laser trabeculoplasty, iridotomy and iridoplasty form
                part of Mr Dimitriou’s glaucoma practice.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="shell section two-column" id="general-ophthalmology">
        <div>
          <p className="eyebrow">03 · GENERAL OPHTHALMOLOGY</p>
          <h2>
            A clear starting point
            <br />
            for your eye health.
          </h2>
        </div>
        <div className="prose">
          <p>
            Mr Dimitriou also offers consultations for general eye conditions.
            An assessment provides an opportunity to discuss your symptoms,
            relevant medical history and concerns, and to understand the next
            steps in your care.
          </p>
          <p>
            If you are unsure which appointment to arrange, contact the
            secretary before booking.
          </p>
          <Link href="/contact/">Contact the practice</Link>
          <MedicalNote />
        </div>
      </section>
      <Consultation />
    </>
  );
}
