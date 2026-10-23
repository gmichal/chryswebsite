import Link from "next/link";
export default function NotFound() {
  return (
    <section className="shell error-page">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>Let’s find your way.</h1>
      <p>
        The page you’re looking for may have moved or the address may be
        incorrect. You can explore the website or contact the practice.
      </p>
      <Link className="button" href="/">
        Return to the homepage ↗
      </Link>
      <p style={{ marginTop: 22 }}>
        <Link className="text-link" href="/contact/">
          Contact the practice ↗
        </Link>
      </p>
    </section>
  );
}
