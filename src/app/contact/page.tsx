import { PageIntro } from "@/components/PageIntro";
import { Arrow } from "@/components/Arrow";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
export const metadata = pageMetadata(
  "Contact & Consultations",
  "Arrange an eye consultation with Mr Chrys Dimitriou in Colchester. Find the secretary’s contact details, existing booking service and clinic information.",
  "/contact/",
);
export default function Contact() {
  return (
    <>
      <PageIntro
        label="Contact"
        title="A conversation about your vision."
        description="For appointment enquiries or information about a consultation, contact the secretary or use the existing appointment service."
        path="/contact/"
      />
      <section className="shell content-split" style={{ paddingBottom: 75 }}>
        <div className="contact-details">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>Contact details</h2>
          <dl>
            <div className="contact-item">
              <dt>Telephone</dt>
              <dd>
                <a href={site.phoneHref}>{site.phone}</a>
              </dd>
            </div>
            <div className="contact-item">
              <dt>Secretary · Samantha Crockford</dt>
              <dd>
                <a href={`mailto:${site.secretaryEmail}`}>
                  {site.secretaryEmail}
                </a>
              </dd>
            </div>
            <div className="contact-item">
              <dt>Clinical correspondence</dt>
              <dd>
                <a href={`mailto:${site.clinicalEmail}`}>
                  {site.clinicalEmail}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="contact-booking">
          <p className="eyebrow">ARRANGE A CONSULTATION</p>
          <h2>
            Your next step,
            <br />
            made straightforward.
          </h2>
          <p>
            Request an appointment through Mr Dimitriou’s Top Doctors profile,
            the booking service linked from the original website. The provider
            manages appointment enquiries and availability.
          </p>
          <a href={site.booking} className="button">
            Request an appointment <Arrow />
          </a>
          <small>Opens the external Top Doctors website.</small>
          <div className="medical-note">
            <p>
              Please confirm appointment location, referral requirements, fees
              and insurance arrangements with the secretary or booking provider.
              Avoid sending sensitive medical information in an initial email.
            </p>
          </div>
        </div>
      </section>
      <section className="muted-section section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COLCHESTER, ESSEX</p>
              <h2>Where to find care</h2>
            </div>
            <p>
              Please check your appointment confirmation for the correct
              hospital and clinic.
            </p>
          </div>
          <div className="two-column">
            <article className="clinic">
              <p className="eyebrow">PRIVATE PRACTICE</p>
              <h3>Oaks Hospital</h3>
              <address>
                120 Mile End Road
                <br />
                Colchester, Essex
                <br />
                CO4 5XR
              </address>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Oaks+Hospital+120+Mile+End+Road+Colchester+CO4+5XR"
                className="text-link"
              >
                View location on Google Maps <Arrow />
              </a>
              <p>
                Clinic details:{" "}
                <a href={site.ramsay} style={{ textDecoration: "underline" }}>
                  Ramsay Health Care consultant profile
                </a>
                .
              </p>
            </article>
            <article className="clinic">
              <p className="eyebrow">NHS PRACTICE</p>
              <h3>Colchester Hospital</h3>
              <address>
                Colchester Eye Centre of Excellence
                <br />
                Turner Road, Colchester
                <br />
                Essex
              </address>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Colchester+Eye+Centre+of+Excellence+Turner+Road"
                className="text-link"
              >
                View location on Google Maps <Arrow />
              </a>
              <p>
                NHS appointments follow the hospital’s referral pathway.{" "}
                <a href={site.nhs} style={{ textDecoration: "underline" }}>
                  View the ESNEFT consultant profile
                </a>
                .
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="shell section" style={{ maxWidth: 900 }}>
        <p className="eyebrow">BEFORE YOUR APPOINTMENT</p>
        <div className="faq">
          <details>
            <summary>How do I arrange an appointment?</summary>
            <p>
              Call or email the secretary, or follow the Top Doctors appointment
              link. Confirm whether you require a referral and which location
              you will attend before travelling.
            </p>
          </details>
          <details>
            <summary>
              Can I send my medical records through this website?
            </summary>
            <p>
              This website does not collect medical records or contact-form
              submissions. Ask the secretary for the appropriate secure route
              for clinical information.
            </p>
          </details>
          <details>
            <summary>What if I need urgent help?</summary>
            <p>
              Do not wait for an email reply or a routine consultation if you
              need urgent care.{" "}
              <a
                href="https://www.nhs.uk/conditions/vision-loss/"
                style={{ textDecoration: "underline" }}
              >
                Follow NHS advice for sudden vision changes
              </a>{" "}
              or contact the appropriate urgent NHS service.
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
