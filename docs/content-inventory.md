# Content preservation inventory

Research and implementation review: 23 October 2026. The original seven-page sitemap and router map, internal links, live homepage behaviour, public galleries and linked PDF were inspected. Raw original HTML/text remains in `docs/research/original/`.

| Original material | New location | Treatment |
| --- | --- | --- |
| Home identity, qualifications, cataract/glaucoma focus | `/`, `/about/` | Preserved, with calmer copy and source references. |
| Cataract surgery, lens implants and complex clinical interests | `/cataract/`, `/expertise/`, `/about/` | Preserved; concise NHS-backed context added. No claimed individual outcome or invented service. |
| Adult glaucoma, drops, SLT, iridotomy, iridoplasty, MIGS, MSSS trabeculectomy, aqueous shunts | `/glaucoma/`, `/migs/`, `/laser/` | All substantive treatment categories retained. |
| Small-incision phacoemulsification and femtosecond laser-assisted cataract surgery | `/cataract/` | Preserved from original biography. |
| Combined cataract-glaucoma procedures | `/cataract/`, `/migs/` | Preserved with individual suitability and risk context. |
| General eye conditions | `/expertise/#general-ophthalmology` | Preserved as a consultation area without inventing a broader subspecialty list. |
| Four hidden treatment routes with placeholder text | `/cataract/`, `/glaucoma/`, `/migs/`, `/laser/` | URLs retained; template prose replaced by sourced information. |
| Training in Bath, Windsor, Guildford, Norwich and Moorfields | `/about/` | Preserved with original training dates. |
| Qualifications and all eight professional connections | `/about/` | Original credentials retained, corroborating profiles linked; current membership status remains a launch review item. |
| Principal Investigator work in POEM, XEN45, MASTERS, TRITON, ARTEMIS, ATHENA and STAR programmes | `/about/` | Retained as source-recorded research history, not open recruitment or current device recommendations. |
| Royal College teaching, glaucoma simulation and ICENI education | `/about/`, `/igleams/` | Preserved and corroborated. ICENI confirms the Glaucoma Lead role. |
| ICENI honorary board role | Research archive and review register | Current board status not established. Preserved in original snapshot; not presented as current on public pages. |
| 2019 Clinical Excellence Award; 2023 Rob Brierly Educational Award | `/about/` | Preserved with sources. |
| Pending 2024 NCIA application | `/about/`, professional-recognition article | Updated using a January 2026 ESNEFT report recording an awarded National Clinical Impact and Excellence Award. Exact award date/level is not inferred. |
| Procedure totals, regional comparisons, success-rate claims, international renown | Review register and original snapshot | Not repeated without current audit or independent evidence. These facts have not been silently deleted from the project record. |
| Device experience | `/migs/` | Original list retained with availability/suitability qualification. CyPass remains historical research only, not a current treatment recommendation. |
| Original iGLEAMS history and faculty | `/igleams/`, `/articles/igleams-2023/` | Founding date, first two events, venues and educational approach retained. |
| Provisional 3-4 October 2024 event dates | `/igleams/`, 2024 education article | Superseded by the later published programme dates: 30 September and 1 October 2024. Historical framing throughout. |
| Symposium brochure | `/documents/igleams-symposium-brochure.pdf` and original `/_files/ugd/e67dc7_b817237c931a4e75a1a1cdd99502e656.pdf` | Original 12-page 2023 programme preserved, explicitly marked archived. Sponsor material is not transformed into clinical advice. |
| Telephone and two displayed emails | `/contact/`, footer | Preserved with consistent `tel:` and `mailto:` links. Conflicting hidden email target is documented for confirmation. |
| Top Doctors appointment service | `/contact/` | Direct existing external link preserved. Old nonworking iframe is replaced with the direct link. |
| Wix contact form | Replaced by direct contact routes | No Wix backend is inherited. No nonfunctional static form is presented. |
| Original Oaks and NHS practice locations | `/contact/` | Street locations corroborated with provider profiles. Confirm exact location on appointment paperwork. |
| Authentic portrait, slit-lamp and theatre photos | Homepage, About, treatment pages and archive | Downloaded locally, optimised to responsive WebP, descriptive alt text, consistent rounded corners. No generated portraits. |
| LinkedIn, ResearchGate and ICENI links | Footer, About, education pages and references | Preserved or replaced by live equivalent institutional destinations. |
| Metadata and Google verification | Page Metadata API and sitemap | Original token retained; unique descriptions, titles, social data, canonicals and supported structured data added. |
| `/home` alias, service/contact section anchors | `/home/`, home anchor aliases | Preserved with primary homepage canonical. |

## Initial editorial archive

| Slug | Source | Publication decision |
| --- | --- | --- |
| `tube-bleb-lab-education` | ICENI Centre, 16 October 2026 | Published short education update; source date labelled. |
| `professional-recognition` | ESNEFT, 30 January 2026; LI-002 | Published recognition update. Original LinkedIn date remains unknown; NHS report date is labelled as source date. |
| `miniject-first-uk-series` | Ophthalmology and Therapy, 8 August 2025; PUB-002 | Published bibliographic brief. Numerical discrepancies not reproduced. Manufacturer advisory role disclosed. |
| `cataract-istent-angle-closure` | Eye, online 21 July 2025; PUB-003 | Published study-design brief, not a clinical recommendation. |
| `miniject-two-year-study` | Journal of Clinical Medicine, 28 February 2025; PUB-001 | Published study-design brief with limits and advisory disclosure. |
| `igleams-3-surgical-education` | JFO, 25 May and 15 April 2024; PUB-012 and PUB-013 | Published historical education summary, source authors credited. |
| `igleams-2023` | Original site and archived programme | Published archive note; publication date unknown, event dates identified as such. |
| `combined-cataract-migs-commentary` | LI-003 | Published archive summary, without restating unverified clinical claims. |

A further 11 verified scientific publication records are linked in the public bibliography, including older work and one record crediting a study-group collaborator rather than lead authorship. There is overlap with the three research briefs. All 22 discovered publication leads are accounted for in `publications.json`.

## LinkedIn coverage

`linkedin-inventory.json` accounts for 63 discovered records: 30 authored posts/excerpts, 25 third-party mentions and 8 comments. All 63 records are represented by published entries, with source type and source access disclosed. The original seven-entry archive has expanded to 69 entries. The complete file mapping is in [linkedin-expansion.md](linkedin-expansion.md). Previous hold/exclusion reasons remain as an audit trail in the inventory. Searches included older years and topics. This is not a complete account export and no original LinkedIn posting date was verified.

## Clinical sources

- [NHS cataract surgery](https://www.nhs.uk/tests-and-treatments/cataract-surgery/)
- [NHS glaucoma](https://www.nhs.uk/conditions/glaucoma/)
- [NHS vision loss](https://www.nhs.uk/conditions/vision-loss/)
- [Glaucoma UK laser treatments](https://glaucoma.uk/about-glaucoma/treatments-surgery/laser/)
- [Glaucoma UK MIGS](https://glaucoma.uk/about-glaucoma/treatments-surgery/migs/)
- [NICE NG81 recommendations](https://www.nice.org.uk/guidance/ng81/chapter/Recommendations)
- [Cambridge University Hospitals laser peripheral iridotomy](https://www.cuh.nhs.uk/patient-information/laser-peripheral-iridotomy-treatment/)

Medical copy is deliberately concise, attributed and framed around individual assessment. [GMC Good medical practice, domain 4](https://www.gmc-uk.org/professional-standards/the-professional-standards/good-medical-practice/domain-4-trust-and-professionalism) informed the treatment of evidence, commercial relationships, risks and unsupported claims. This research is not a legal compliance certification.
