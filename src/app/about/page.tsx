import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Consultation } from "@/components/Consultation";
import { Arrow } from "@/components/Arrow";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
export const metadata = pageMetadata(
  "About Mr Dimitriou",
  "Meet Mr Chrys Dimitriou, Consultant Ophthalmic Surgeon in Colchester. Explore his cataract and glaucoma expertise, training, research and educational work.",
  "/about/",
);
const memberships = [
  ["Royal College of Ophthalmologists", "Fellow · FRCOphth"],
  ["European Board of Ophthalmology", "Fellow · FEBOphth"],
  ["European Glaucoma Society", "Specialist fellowship · FEBOS(Glau)"],
  ["United Kingdom and Eire Glaucoma Society", "UKEGS"],
  ["American Academy of Ophthalmology", "AAO"],
  ["Association for Research in Vision and Ophthalmology", "ARVO"],
  ["European Society of Cataract and Refractive Surgeons", "ESCRS"],
  ["British Medical Association", "BMA"],
];
export default function About() {
  return (
    <>
      <PageIntro
        label="About"
        title="Expertise, with a human perspective."
        description="Meet Mr Chrys Dimitriou, Consultant Ophthalmic Surgeon specialising in cataract surgery, adult glaucoma and general eye conditions."
        path="/about/"
      />
      <section className="shell content-split" style={{ paddingBottom: 85 }}>
        <figure>
          <div className="image-frame" style={{ aspectRatio: ".91" }}>
            <Image
              src="/images/chrys-portrait.webp"
              alt="Mr Chrys Dimitriou, Consultant Ophthalmic Surgeon"
              fill
              preload
              sizes="(max-width: 600px) 100vw, 45vw"
              style={{ objectPosition: "50% 27%" }}
            />
          </div>
          <figcaption className="image-caption">
            Mr Chrys Dimitriou · Consultant Ophthalmic Surgeon
          </figcaption>
        </figure>
        <div className="prose">
          <p className="eyebrow">CLINICAL BACKGROUND</p>
          <h2 style={{ marginTop: 0 }}>
            Care informed by specialist experience.
          </h2>
          <p>
            Mr Dimitriou’s clinical work focuses on cataract surgery and
            glaucoma care, including routine and complex cataract procedures,
            intraocular lens implants and combined cataract and glaucoma
            surgery.
          </p>
          <p>
            He is identified by the ICENI Centre as Glaucoma Lead at the
            Colchester Eye Centre of Excellence. He practises at Oaks Hospital
            in Colchester and at East Suffolk and North Essex NHS Foundation
            Trust (ESNEFT). His glaucoma expertise includes monitoring, medical
            treatment, laser procedures, minimally invasive glaucoma surgery,
            trabeculectomy and aqueous shunts.
          </p>
          <p>
            Alongside clinical practice, he is involved in surgical education
            and glaucoma research. He is a Royal College of Ophthalmologists
            College Tutor and founded the iGLEAMS glaucoma microsurgery
            symposium.
          </p>
          <p className="eyebrow" style={{ marginTop: 30 }}>
            QUALIFICATIONS
          </p>
          <p className="biography-qualifications">{site.qualifications}</p>
          <p className="biography-registration">
            GMC reference number: <strong>6117886</strong>
          </p>
          <a href={site.nhs} className="text-link">
            View NHS consultant profile <Arrow />
          </a>
        </div>
      </section>
      <section className="muted-section section">
        <div className="shell two-column">
          <div>
            <p className="eyebrow">TRAINING & DEVELOPMENT</p>
            <h2>
              A foundation in
              <br />
              specialist ophthalmology.
            </h2>
          </div>
          <ol className="timeline">
            <li>
              <span className="year">2007–2012</span>
              <div>
                <h3>Ophthalmology training</h3>
                <p>
                  Royal United Hospital, Bath; Prince Charles Eye Unit, Windsor;
                  and Royal Surrey County Hospital, Guildford.
                </p>
              </div>
            </li>
            <li>
              <span className="year">2012–2015</span>
              <div>
                <h3>Cataract & glaucoma subspecialty training</h3>
                <p>
                  Norfolk and Norwich University Hospital and Moorfields Eye
                  Hospital, London.
                </p>
              </div>
            </li>
            <li>
              <span className="year">2016–2017</span>
              <div>
                <h3>Minimally invasive glaucoma surgery fellowship</h3>
                <p>
                  A full-year MIGS fellowship at Royal Surrey County Hospital.
                </p>
              </div>
            </li>
            <li>
              <span className="year">2020</span>
              <div>
                <h3>Medical education</h3>
                <p>
                  Postgraduate Certificate in Medical and Healthcare Education,
                  Anglia Ruskin University.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="shell section two-column">
        <div>
          <p className="eyebrow">RESEARCH & TEACHING</p>
          <h2>
            Contributing to
            <br />
            the wider profession.
          </h2>
          <div className="prose" style={{ marginTop: 25 }}>
            <p>
              The original professional biography records Principal Investigator
              roles in POEM, the XEN45 angle-closure multicentre study, MASTERS,
              TRITON, ARTEMIS, ATHENA and the STAR V, STAR VI and STAR LiFE
              programmes. These are research activities, not a list of currently
              available treatments or open trials.
            </p>
            <p>
              His published work includes research on glaucoma surgery. The
              articles archive links to original publications and clearly
              separates research summaries from professional updates.
            </p>
          </div>
          <Link
            href="/articles/"
            className="text-link"
            style={{ marginTop: 25 }}
          >
            Explore the research archive <Arrow />
          </Link>
        </div>
        <div>
          <ul className="body-list">
            <li>
              <h3>Surgical education</h3>
              <p>
                College Tutor and glaucoma simulation teaching, with educational
                work at the ICENI Centre and within the East of England.
              </p>
            </li>
            <li>
              <h3>iGLEAMS founder & chair</h3>
              <p>
                Bringing clinicians together for practical simulation and
                discussion of glaucoma microsurgery.
              </p>
            </li>
            <li>
              <h3>2019 Clinical Excellence Award</h3>
              <p>
                A Level 2 award from ESNEFT for services in ophthalmology,
                corroborated by the hospital and ICENI profiles.
              </p>
            </li>
            <li>
              <h3>2023 Rob Brierly Educational Award</h3>
              <p>
                Recorded in the original professional biography and Top Doctors
                profile in recognition of medical training at ESNEFT.
              </p>
            </li>
            <li>
              <h3>National and European recognition</h3>
              <p>
                An{" "}
                <a
                  href="https://www.esneft.nhs.uk/the-perfect-birthday-present-for-glaucoma-patient-william/"
                  style={{ textDecoration: "underline" }}
                >
                  ESNEFT report published in January 2026
                </a>{" "}
                records a National Clinical Impact and Excellence Award and
                recognition at the European Awards in Medicine in 2024.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="shell" style={{ paddingBottom: 85 }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">PROFESSIONAL CONNECTIONS</p>
            <h2>Fellowships & memberships</h2>
          </div>
        </div>
        <ul className="membership-grid">
          {memberships.map(([name, detail]) => (
            <li key={name}>
              <strong>{name}</strong>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <div className="source-note">
          Professional information is drawn from the original biography and the{" "}
          <a href={site.ramsay}>Ramsay Health Care</a>,{" "}
          <a href={site.nhs}>ESNEFT</a>, <a href={site.iceni}>ICENI Centre</a>{" "}
          and <a href={site.booking}>Top Doctors</a> profiles. Sources checked
          23 October 2026.
        </div>
      </section>
      <Consultation />
    </>
  );
}
