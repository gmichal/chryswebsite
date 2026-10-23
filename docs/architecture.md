# Website architecture and design

Prepared 23 October 2026 after reviewing the original homepage, biography, symposium page, public LinkedIn search results and corroborating NHS, Ramsay and ICENI sources. Detailed source inventories accompany this document.

## Information architecture

- `/`: patient introduction, authentic portrait, expertise, biography, educational activity, selected insights and consultation links.
- `/about/`: verified professional background, training, qualifications, memberships, research and teaching.
- `/expertise/`: overview of cataract, adult glaucoma and general ophthalmology, linking to substantive treatment pages.
- `/cataract/`: cataract and lens surgery scope, assessment, shared decisions and source-led information.
- `/glaucoma/`: monitoring, drops, laser, minimally invasive and conventional glaucoma surgery.
- `/migs/` and `/laser/`: preserve original placeholder routes with sourced, focused treatment information.
- `/home/`: preserved alternate original homepage route with canonical `/`.
- `/articles/` and `/articles/[slug]/`: searchable and filterable MDX editorial archive; published entries only.
- `/igleams/`: preserve original route and symposium history, education, photography and original brochure.
- `/contact/`: verified telephone and email, existing Top Doctors booking link, hospital locations and map links.
- `/privacy/`: actual website data behaviour and external-service boundaries.
- `/404.html`: exported accessible missing-page recovery.

Preserve all original document routes. Preserve original Wix section hashes as anchor aliases where discovered. GitHub Pages cannot execute Next.js server redirects. Avoid unnecessary URL changes; do not claim client redirects are HTTP 301s.

## Implementation

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, global design tokens and CSS Modules for page composition. Server Components for all content; a small Client Component for article search/filter. Native HTML details/summary navigation, native links, search input and category select. This is the browser equivalent of the user's platform-native control preference, consistent with the explicitly required web stack.

MDX files have JSON front matter, parsed and validated at build time, then compiled using `@mdx-js/mdx`. No remote MDX, database or runtime content service. Only trusted repository editors may author MDX. Explicit publication status and source metadata. Unknown source dates remain unknown, never inferred from relative LinkedIn timestamps. Summaries identify their editorial nature and do not impersonate the surgeon.

Static export with trailing slashes. The deployment build uses `/chryswebsite` as its base path for `https://gmichal.github.io/chryswebsite/`; normal local builds retain the root path. Build-time local WebP image optimisation and responsive variants use a Next Image custom loader. Native system fonts are managed in `src/styles/typography.css`, with no third-party scripts. Sitemap, robots, canonical, social and JSON-LD metadata are generated at build. Draft routes are excluded from static generation, metadata, search payloads and sitemap.

## Visual direction

An editorial medical practice: warm white, deep ink navy, muted teal and fine blue-grey rules. Native platform typography throughout, with a centrally managed scale for display titles, headings, body text and UI. A calm split hero with an authentic professional photograph, a small clinical-specialty label, generous margins and clearly differentiated consultation/expertise actions. Numbered expertise rows, distinct image-led education sections, refined article layouts and consistent readable content widths. Mobile compositions stack deliberately and retain large tap targets. Reduced-motion preference disables decorative transitions.

## Quality and release

Dedicated test folders for navigation, articles, accessibility, responsive behaviour, contact and SEO. Playwright targets the built static export, including direct deep links and 404 behaviour. ESLint, TypeScript, production build and desktop/mobile browser checks required. Accessibility automation is supplemented by keyboard and visual checks. Lighthouse results are recorded only if measured.

GitHub Actions validates both the root-path build and the project-path export, then deploys `out/` with official Pages actions when the owner pushes `Develop`. Pages must be enabled with GitHub Actions as its publishing source, and the `github-pages` environment must allow deployments from `Develop`. The owner commits and pushes changes. See the README for publishing and custom-domain instructions.
