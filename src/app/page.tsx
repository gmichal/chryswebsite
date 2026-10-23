import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { ArticleCard } from "@/components/ArticleCard";
import { Consultation } from "@/components/Consultation";
import { getPublishedArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import styles from "@/styles/home.module.css";
export const metadata = pageMetadata(
  "Cataract & Glaucoma Surgeon in Colchester",
  site.description,
  "/",
);
export default async function Home() {
  const articles = await getPublishedArticles();
  return (
    <>
      <section
        className={`shell ${styles.hero}`}
        aria-labelledby="hero-heading"
      >
        <div className={`home-hero-text ${styles.heroText}`}>
          <p className="eyebrow">CATARACT · GLAUCOMA · EYE HEALTH</p>
          <h1 id="hero-heading">
            A clear focus
            <br />
            on <em>your vision.</em>
          </h1>
          <h2 className={`home-name ${styles.name}`}>Mr Chrys Dimitriou</h2>
          <p className={`home-role ${styles.role}`}>{site.title}</p>
          <p className={`home-intro ${styles.intro}`}>
            Specialist cataract and glaucoma care, shaped around you. Bringing
            clinical experience, surgical precision and a personal approach to
            eye care in Colchester.
          </p>
          <div className={`home-hero-actions ${styles.heroActions}`}>
            <Link href="/contact/" className="button">
              Book a consultation <Arrow />
            </Link>
            <Link href="/expertise/" className="text-link">
              Explore my expertise <Arrow />
            </Link>
          </div>
          <p className={`home-hero-location ${styles.heroLocation}`}>
            Colchester, Essex · NHS & private practice
          </p>
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src="/images/chrys-portrait.webp"
            alt="Mr Chrys Dimitriou in blue surgical scrubs"
            fill
            preload
            fetchPriority="high"
            sizes="(max-width: 600px) 100vw, 48vw"
          />
          <div className={`home-photo-caption ${styles.photoCaption}`}>
            <div>
              <strong>Mr Chrys Dimitriou</strong>
              <span>Cataract & glaucoma specialist</span>
            </div>
            <span
              className={`home-caption-mark ${styles.captionMark}`}
              aria-hidden="true"
            >
              CD.
            </span>
          </div>
        </div>
      </section>
      <div className={styles.credentials}>
        <div className={`shell ${styles.credentialsInner}`}>
          <span className={`home-credentials-intro ${styles.credentialsIntro}`}>
            Clinical practice
            <br />& education
          </span>
          <a
            href={site.ramsay}
            className={`home-credential ${styles.credential}`}
          >
            Oaks Hospital<span>PRIVATE PRACTICE · COLCHESTER</span>
          </a>
          <a href={site.nhs} className={`home-credential ${styles.credential}`}>
            East Suffolk & North Essex<span>NHS FOUNDATION TRUST</span>
          </a>
          <a
            href={site.iceni}
            className={`home-credential ${styles.credential}`}
          >
            Royal College of Ophthalmologists<span>COLLEGE TUTOR</span>
          </a>
          <a
            href={site.iceni}
            className={`home-credential ${styles.credential}`}
          >
            The ICENI Centre<span>SURGICAL EDUCATION</span>
          </a>
        </div>
      </div>
      <section className="shell section" id="services">
        <span id="dataItem-j6w6mgyd1" />
        <div className={styles.expertiseLayout}>
          <div className={`home-expertise-intro ${styles.expertiseIntro}`}>
            <p className="eyebrow">AREAS OF EXPERTISE</p>
            <h2>
              Specialist knowledge.
              <br />
              Individual care.
            </h2>
            <p>
              From understanding a change in your sight to considering surgery,
              the starting point is a careful assessment of your eyes and your
              needs.
            </p>
            <Link className="text-link" href="/expertise/">
              Discover the approach <Arrow />
            </Link>
          </div>
          <div>
            {[
              {
                number: "01",
                title: "Cataract & lens surgery",
                body: "Routine and complex cataract surgery, intraocular lens implants and combined cataract and glaucoma procedures.",
                href: "/cataract/",
              },
              {
                number: "02",
                title: "Glaucoma care",
                body: "Monitoring and medical treatment, laser therapy, minimally invasive glaucoma surgery and conventional glaucoma surgery.",
                href: "/glaucoma/",
              },
              {
                number: "03",
                title: "General ophthalmology",
                body: "Consultation and assessment for general eye conditions, with clear explanations of the appropriate next steps.",
                href: "/expertise/#general-ophthalmology",
              },
            ].map((area) => (
              <Link
                key={area.number}
                className={`home-expertise-row ${styles.expertiseRow}`}
                href={area.href}
              >
                <span className={`home-number ${styles.number}`}>
                  {area.number}
                </span>
                <div>
                  <h3>{area.title}</h3>
                  <p>{area.body}</p>
                </div>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.aboutSection}>
        <div className={`shell ${styles.aboutLayout}`}>
          <div className={styles.aboutImage}>
            <Image
              src="/images/chrys-consulting.webp"
              alt="Mr Dimitriou beside a slit-lamp microscope in the consulting room"
              fill
              sizes="(max-width: 600px) 100vw, 45vw"
            />
          </div>
          <div className={`home-about-copy ${styles.aboutCopy}`}>
            <p className="eyebrow">MEET YOUR SURGEON</p>
            <h2>
              Experience with
              <br />a personal perspective.
            </h2>
            <p>
              Mr Chrys Dimitriou is a Consultant Ophthalmic Surgeon specialising
              in adult glaucoma and cataract, with a clinical practice at Oaks
              Hospital and East Suffolk and North Essex NHS Foundation Trust.
            </p>
            <p>
              His training includes Moorfields Eye Hospital, Norfolk and Norwich
              University Hospital and a fellowship in minimally invasive
              glaucoma surgery at the Royal Surrey County Hospital.
            </p>
            <p className={`home-qualifications ${styles.qualifications}`}>
              {site.qualifications}
            </p>
            <Link className="text-link" href="/about/">
              More about Mr Dimitriou <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section className="shell section">
        <div className={styles.education}>
          <div className={`home-education-copy ${styles.educationCopy}`}>
            <p className="eyebrow">BEYOND THE CONSULTING ROOM</p>
            <h2>
              Sharing knowledge.
              <br />
              Advancing practice.
            </h2>
            <p>
              Clinical care sits alongside an active interest in research and
              teaching. As founder and chair of iGLEAMS, Mr Dimitriou brings
              surgeons together to explore developments in glaucoma
              microsurgery.
            </p>
            <p>
              Practical simulation, discussion and the exchange of experience
              are at the heart of this educational work.
            </p>
            <Link className="text-link" href="/igleams/">
              Explore iGLEAMS & education <Arrow />
            </Link>
          </div>
          <figure className={`home-education-figure ${styles.educationFigure}`}>
            <div className={styles.educationImage}>
              <Image
                src="/images/chrys-microscope.webp"
                alt="Mr Dimitriou working at an ophthalmic surgical microscope"
                fill
                sizes="(max-width: 600px) 100vw, 45vw"
              />
            </div>
            <figcaption>
              <span>CLINICAL PRACTICE & SURGICAL EDUCATION</span>
              <span>COLCHESTER, UK</span>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className={`${styles.journal} section`}>
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE JOURNAL</p>
              <h2>Articles & insights</h2>
            </div>
            <Link href="/articles/" className="text-link">
              Explore the archive <Arrow />
            </Link>
          </div>
          <div className="article-grid">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
      <span id="dataItem-j6w6mgyf1" />
      <Consultation />
    </>
  );
}
