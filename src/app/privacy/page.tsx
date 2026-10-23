import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Privacy & Website Information",
  "How this website handles browsing, article search and external appointment links, plus information about medical content and accessibility.",
  "/privacy/",
);
export default function Privacy() {
  return (
    <>
      <PageIntro
        label="Website information"
        title="Privacy, clarity & access."
        description="How this website works and how to use the information it provides."
        path="/privacy/"
      />
      <div className="shell reading-width prose">
        <h2>Browsing this website</h2>
        <p>
          The website is designed as a static site hosted on GitHub Pages. It
          does not include advertising trackers, analytics scripts, account
          registration or a contact form. Article search and filtering happen in
          your browser. Search text is not sent to the practice or an analytics
          service.
        </p>
        <p>
          No optional cookies or browser storage are set by the application. The
          hosting provider processes technical request information to deliver
          the website. For hosting information, read the{" "}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
            GitHub General Privacy Statement
          </a>
          .
        </p>
        <h2>Contact and external services</h2>
        <p>
          Email and telephone links open your chosen email or phone application.
          If you contact the practice, that correspondence is handled outside
          this website. Ask the secretary for information about the handling of
          patient records and a secure method for sending sensitive details.
        </p>
        <p>
          Appointment requests are handled by Top Doctors. Its{" "}
          <a href="https://www.topdoctors.co.uk/info/privacy-policy/">
            privacy policy
          </a>{" "}
          applies when you use that service. Google Maps, LinkedIn, ResearchGate
          and other source websites apply their own privacy terms. They are
          linked, not embedded.
        </p>
        <h2>Medical information</h2>
        <p>
          Content is for general information and does not replace a clinical
          consultation. Treatment decisions depend on individual assessment.
          Benefits, risks and alternatives should be discussed with your
          clinician. A research summary is not a treatment recommendation.
        </p>
        <p>
          The articles archive identifies original sources, authorship and the
          type of material. Research briefs are editorial summaries of the cited
          publications, not new clinical advice or statements written by the
          original study authors. Source dates are shown only when verified.
        </p>
        <h2>Accessibility</h2>
        <p>
          The design aims to follow WCAG 2.2 AA principles, including keyboard
          access, readable contrast, responsive text and reduced-motion
          preferences. If you have difficulty using the website,{" "}
          <Link href="/contact/">contact the secretary by phone or email</Link>.
        </p>
        <h2>Corrections and questions</h2>
        <p>
          Please <Link href="/contact/">contact the practice</Link> to report a
          factual error or request clarification. Professional and clinical
          details should be confirmed with the practice when arranging care.
        </p>
        <p className="source-note">
          Website information prepared 23 October 2026. This page describes this
          website’s functionality; the practice and external providers supply
          their own patient-data policies.
        </p>
      </div>
    </>
  );
}
