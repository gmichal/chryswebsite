export const site = {
  name: "Mr Chrys Dimitriou",
  title: "Consultant Ophthalmic Surgeon",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.chrysdimitriou.com",
  description:
    "Specialist cataract and glaucoma care in Colchester, Essex. Meet Mr Chrys Dimitriou, Consultant Ophthalmic Surgeon, and explore treatments, research and surgical education.",
  qualifications:
    "MBChB(Hons) MD FEBOphth FRCOphth FEBOS(Glau) PGCertMedEd(HealthCare)",
  phone: "01206 258770",
  phoneHref: "tel:+441206258770",
  secretaryEmail: "Samantha.Crockford@nhs.net",
  clinicalEmail: "Chrysostomos.Dimitriou@esneft.nhs.uk",
  booking: "https://www.topdoctors.co.uk/doctor/chrysostomos-dimitriou/",
  linkedin: "https://uk.linkedin.com/in/chrys-dimitriou-eye-surgeon",
  researchgate: "https://www.researchgate.net/profile/Chrysostomos_Dimitriou",
  nhs: "https://www.esneft.nhs.uk/consultants/chrysostomos-chrys-d-dimitriou/",
  ramsay: "https://www.ramsayhealth.co.uk/specialists/mr-chrys-dimitriou",
  iceni: "https://www.icenicentre.org/fellowships/ophthalmology",
};

export const navigation = [
  { href: "/about/", label: "About" },
  { href: "/expertise/", label: "Expertise" },
  { href: "/articles/", label: "Articles & insights" },
  { href: "/igleams/", label: "iGLEAMS" },
  { href: "/contact/", label: "Contact" },
];
export const absoluteUrl = (path = "/") =>
  new URL(path.replace(/^\//, ""), `${site.url}/`).href;
