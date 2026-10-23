# Chrys Dimitriou website

A complete, responsive redevelopment of [chrysdimitriou.com](https://www.chrysdimitriou.com), built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, CSS Modules and MDX. It exports to ordinary static files and is configured for GitHub Pages at `www.chrysdimitriou.com`.

## Run locally

Use Node.js 24 LTS and npm. Node 22.13 or later in the 22.x series is also supported. Dependencies are pinned in `package.json` and `package-lock.json`.

```sh
npm ci
npm run dev
```

The development server prints its local address, normally `http://127.0.0.1:3000`.

To preview the actual production export:

```sh
npm run build
npm run preview
```

Open `http://127.0.0.1:4173`. The local preview server implements direct page links, content types, compression and a real 404 response. It is only a development tool. Production needs no Node server, database, API route or CMS.

## Validate

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium webkit
npm test
```

On Linux, use `npx playwright install --with-deps chromium webkit`. Tests exercise the built `out/` directory, not the Next development server. The suite covers desktop Chromium, mobile WebKit, navigation, search and category filtering, article attribution, draft exclusion, internal links, original URLs, contact links, 404s, responsive layouts, keyboard access, reduced motion, axe accessibility checks and SEO. Tests are grouped in dedicated feature folders under `tests/`.

Use `npm run test:report` to open the browser report. Measurements and limits are recorded in [docs/qa.md](docs/qa.md). Automated accessibility checks are not a substitute for a complete human accessibility audit.

## Project structure

```text
src/app/             App Router pages, layout, global CSS, metadata routes
src/components/      Shared semantic UI and the client article explorer
src/styles/          Central typography system and homepage CSS Module
src/lib/             Site details, metadata, treatment data and MDX loading
src/types/           Article metadata types
content/articles/    Published and draft MDX files
content/publications.json  Selected linked scientific bibliography
public/images/       Local, optimised image variants and source photography
public/documents/    Archived original brochure
scripts/             Image preparation and local static preview
tests/               Feature-specific browser tests
.github/workflows/   GitHub Pages validation and deployment
docs/                Research, inventories, architecture and review notes
```


## Add or edit an article

Articles are files, not React components. Create `content/articles/your-article-slug.mdx`, using JSON metadata between `---` lines followed by Markdown or trusted MDX. Copy an existing file as the simplest starting point.

```mdx
---
{
  "slug": "your-article-slug",
  "title": "A clear, factual title",
  "description": "A short summary supported by the original material.",
  "date": null,
  "author": "Website editorial summary",
  "category": "Surgical education",
  "tags": ["Education", "Ophthalmology"],
  "image": "/images/chrys-microscope.webp",
  "imageAlt": "Mr Dimitriou working at a surgical microscope",
  "imageWidth": 1600,
  "imageHeight": 1067,
  "imageCaption": "Practice photograph from the original website.",
  "source": {
    "label": "Name of the original source",
    "url": "https://example.org/original-source"
  },
  "references": [],
  "sourceAuthors": ["Verified source author or institution"],
  "status": "draft",
  "kind": "Education",
  "editorialNote": "Explain the provenance and editorial status of this text.",
  "featured": false
}
---

## A meaningful heading

Write the article here. Link to the evidence and keep statements within what the source supports.
```

The example is documentation only. Replace its source and metadata before publication.

- `slug` must match the filename and use lowercase words separated by hyphens. Keep it stable after publishing.
- `date` is the **original source publication date**, in `YYYY-MM-DD` format, or `null` when unknown. The interface labels it as a source date. Do not use event dates or inferred LinkedIn ages. The website does not invent a publication date for a newly prepared summary or backdate its Article schema.
- `author` credits the website text. `sourceAuthors` credits the original work separately. Do not attribute an editorial rewrite to the surgeon without approval.
- `category` and `tags` drive the browser search/filter. Categories are collected automatically.
- `kind` is `Research brief`, `Professional update`, `Education`, `LinkedIn post`, `LinkedIn mention` or `LinkedIn comment`.
- `source` and every reference require a descriptive label and HTTPS URL.
- `featured: true` selects a featured archive entry. If several are featured, the newest source-dated entry is selected.
- The body should start with `##`, since the page provides the title as its single `h1`.

Metadata is validated during the build. Invalid dates, missing required fields, invalid local image paths or a slug/filename mismatch fail the build instead of producing a broken page.

### LinkedIn entries

LinkedIn entries use the same MDX system. Their optional `linkedin` object contains a unique `recordId` (for example `LI-001`), `type` (`Post by Chrys`, `Third-party mention` or `Comment by Chrys`), `access` (`Public post`, `Indexed excerpt` or `Comment excerpt`), and nullable `originalUrl` and `discoveryUrl`. At least one of those URLs is required. These fields drive source labels and the source filter. They must describe the evidence actually available. Current LinkedIn posting dates remain unknown; the professional-recognition entry separately labels the date of its NHS source.

### Publish and unpublish

Set `status` to `published` only after reviewing medical accuracy, attribution, dates, rights and any commercial relationships. Set it back to `draft` to remove the article on the next build. Drafts are excluded from static article routes, listings, homepage selections, search payloads and sitemap. A public repository still exposes its source files, including drafts, so do not store confidential or patient material in them.

New files and changes can be made through GitHub’s editor. Once you choose to save and push changes to `main`, the workflow validates and publishes the updated site. No React changes are needed to add an article. All entries remain readable without JavaScript; search/filter requires JavaScript.

MDX can execute JavaScript at build time. Only trusted repository editors should author it. Never compile user-submitted or remote MDX.

### Article images

Give each article its own relevant image. Use media from the actual source post where available, or create a topic-specific editorial illustration. Do not assign a generic practice photograph across unrelated entries. The same article may show its own image in the archive, homepage and related reading.

To add a new image:

1. Put an authorised source image in `public/images/source/`.
2. Add its article slug, local `image` URL, `sourceFile` and provenance to `docs/article-images.json`. The optimisation script reads this inventory.
3. Run `npm run images`.
4. Use `/images/your-stem.webp` in the article metadata. Set `imageWidth` and `imageHeight` to the base WebP file's actual pixel dimensions and write accurate `imageAlt` and `imageCaption` text. Use `imageSource: { "label": "Image source", "url": "https://..." }` to credit original post media. Identify generated illustrations in the caption. Optional `imageFit: "contain"` preserves the entire image for posters and portrait photographs; the default is `"cover"`.
5. Include the generated base file and all five responsive variants when you save the change.

Images use Next Image with a local loader. Sharp prepares WebP files at 320, 480, 768, 1200 and 1600 target widths, without enlarging smaller originals. There is no production image server and no hotlinking. Portraits are authentic original website photographs. All image frames have consistent rounded corners. Typography uses each device’s native system font. No custom fonts are bundled or downloaded.

The article image inventory records source URLs and original files. Generated illustrations were made with the built-in image generation tool; their complete prompts are in `docs/article-image-prompts.json`. They are conceptual editorial artwork, not clinical diagrams, product photographs or reconstructions of real events.

## Manage typography

All fonts, heading/title sizes, body text, labels, weights, line heights, letter spacing and responsive typography live in **`src/styles/typography.css`**. Start with the shared tokens at the top: `--font-system`, `--type-display`, `--type-title`, `--type-section`, `--type-subsection` and `--type-body`. Component-specific text treatments and mobile adjustments follow in the same file.

The stack is `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`, which uses the platform’s installed interface font. Native form elements inherit it. Keep typography declarations in this file, rather than adding inline styles or font rules to page CSS Modules. Layout, colour and spacing remain in `globals.css` and `home.module.css`. All image corner radii are controlled by `--image-radius` in `globals.css`.

## Deploy to GitHub Pages

No repository was created, no changes were committed or pushed, and no DNS or live hosting settings were changed by this task. The directory may be added to a repository by its owner.

1. Create a GitHub repository with a `main` branch. GitHub Free supports Pages for public repositories; private-repository Pages depends on your plan. Add this project’s source, public assets, workflow and lockfile. Exclude generated folders listed in `.gitignore`.
2. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. Verify ownership of the domain in your GitHub account or organisation settings. Then set the repository Pages custom domain to `www.chrysdimitriou.com` **before** changing DNS.
4. At your DNS provider, point the `www` CNAME to your actual `USERNAME.github.io` or `ORGANISATION.github.io` hostname, without a repository path. Replace the previous website record for that hostname, preserving unrelated email/DNS records.
5. If you also want the bare `chrysdimitriou.com` domain, point its apex A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`. An appropriate ALIAS/ANAME is an alternative if your provider supports it. GitHub can redirect the apex to the configured `www` domain once both resolve correctly.
6. Enable **Enforce HTTPS** after GitHub provisions the certificate. DNS/certificate changes can take time.
7. Push your approved changes to `main`, or run **Validate and deploy to GitHub Pages** using Actions → Run workflow.
8. Check that validation and deployment succeed, then verify the public domain, deep links, images, sitemap, 404 and booking link.

The workflow uses Node 24, `npm ci`, ESLint, TypeScript, a production static build and Playwright before uploading `out/`. Pull requests run checks but do not deploy. Only the deployment job has `pages: write` and `id-token: write` permissions. Official `configure-pages`, `upload-pages-artifact` and `deploy-pages` actions handle deployment.

`public/CNAME` records the intended hostname and is included for clarity. With the custom GitHub Actions publishing source, the domain must still be set in Pages settings; GitHub does not use that file to configure it. The application uses an empty `basePath` because a custom domain serves the site at `/`. It is intentionally not configured for a `USERNAME.github.io/REPOSITORY/` subpath preview. Use the local preview before domain cutover.

Official references: [GitHub custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [custom-domain configuration and DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [Next.js static export](https://nextjs.org/docs/app/guides/static-exports).

## Content, contact and SEO

The original routes `/about`, `/igleams`, `/cataract`, `/glaucoma`, `/migs` and `/laser` are preserved, with trailing-slash static directories. `/home/` remains available with a canonical link to `/`. Original service/contact hashes and the original brochure URL are preserved. No server-side Next redirects are claimed or needed. GitHub Pages cannot execute Next.js redirect rules.

Every substantive page has unique metadata, a canonical URL, social metadata and semantic headings. Person, MedicalWebPage, Article and BreadcrumbList structured data use supported facts. `sitemap.xml` and `robots.txt` are generated by the build. The original Google verification token is retained. Source dates are not misrepresented as publication dates of new summaries.

The contact page uses the original telephone, displayed email addresses and existing Top Doctors booking link. It has no fake form, embedded booking iframe or server-side submission requirement. Maps open as external links. No trackers, analytics, marketing cookies or third-party scripts are installed.

## Research and review

- [Original site inventory](docs/site-inventory.json): all seven sitemap pages, hidden placeholder routes, navigation, contact, SEO and aliases.
- [Asset inventory](docs/asset-inventory.json): 18 source images and the 2023 brochure.
- [Article image inventory](docs/article-images.json): 69 distinct article images, original sources, captions, dimensions and file hashes.
- [Illustration prompts](docs/article-image-prompts.json): the prompt set for the 46 individually generated editorial images, made with the built-in image generation tool.
- [Content preservation inventory](docs/content-inventory.md): old-to-new mapping and editorial decisions.
- [LinkedIn inventory](docs/linkedin-inventory.json): 63 public discoveries, each mapped to a published entry.
- [LinkedIn expansion](docs/linkedin-expansion.md): complete record-to-content mapping and source-access distinctions.
- [Publication inventory](docs/publications.json): 22 discovered leads and their verification status.
- [LinkedIn research report](docs/linkedin-research.md): scope, older material and access limitations.
- [Content review register](docs/review-required.md): unresolved facts and launch review points.
- [Change summary](docs/changes.md) and [architecture](docs/architecture.md).

The entire LinkedIn history could not be retrieved. Complete account coverage needs an owner-provided export with URLs, timestamps, full text and attachments. Historical and incomplete records are included as brief, clearly attributed source notes, without inventing missing content or repeating unsupported clinical claims. The public archive contains 69 entries and a linked bibliography. All 63 discovered LinkedIn records are included: 30 posts or authored-post excerpts, 25 mentions and 8 comments. Missing full text, original links and dates are disclosed on the relevant entries. A clinician should review the medical wording before the owner publishes the site.
