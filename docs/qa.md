# Quality assurance

Verified on 23 October 2026 against the final static export, including native system fonts, centralised typography and rounded images. No Xcode build, commit, push, DNS change or public deployment was performed.

## Reproducible checks

The final clean validation used Node **24.22.1** and the project's npm lockfile:

```sh
npm ci
npm run lint
npm run typecheck
npm run build
npm test
```

All commands passed. After the LinkedIn expansion, the production build generated all 86 Next.js outputs, including 69 published archive routes, four treatment routes and metadata/error outputs. All 63 inventoried LinkedIn records are represented. `npm ci` reported **zero vulnerabilities**. npm emitted an ESLint 9 support/deprecation notice; lint passed. The host's default Node installation was not changed.

**Playwright: 74 tests passed, 2 skipped**, across desktop Chromium and mobile WebKit. The two existing draft-exclusion cases were skipped because all current content is now published; draft support is unchanged. Feature folders cover:

- Homepage and desktop/mobile navigation, every internal page/document link, original URLs and anchors, and real 404 responses.
- Article search, combined category/source filtering, clear/no-results states, source attribution, unknown dates and content without JavaScript.
- Dedicated LinkedIn archive checks proving all 63 records have unique published pages, listing links and sitemap entries; correct post/mention/comment counts; source-access disclosures; third-party authorship and historical-event context.
- Dedicated article-imagery checks verify 69 distinct image files by content hash, all responsive variants, unique rendered archive images, original-post attribution, generated-art labels, intrinsic aspect ratios and rounded photo corners.
- Contact telephone/email/provider links and native FAQ disclosures. No booking, email or form submission was performed.
- Layout widths of 320, 390, 768, 1440 and 1920 pixels, and reduced-motion behaviour.
- axe checks on 12 representative routes for WCAG 2 A/AA, 2.1 A/AA and 2.2 AA rules, plus keyboard skip-link/menu checks.
- Unique titles/descriptions, canonical URLs, heading structure, valid JSON-LD, local image responses, sitemap, robots, custom-domain file and homepage alias.

The HTML test report is generated in `playwright-report/`. Run `npm run test:report` to view it. Browser binaries were installed for Chromium and WebKit. CI installs their Linux dependencies separately; the GitHub Actions workflow has not yet run on a remote repository.

## Measured Lighthouse results

The homepage and original seven-entry archive measurements below were taken before the LinkedIn expansion. A new expanded-archive result is recorded separately; the earlier archive score is not a claim about the larger version.

Lighthouse **13.5.0**, local compressed production preview at `http://127.0.0.1:4173`, 23 October 2026. Mobile uses Lighthouse's simulated mobile throttling; desktop uses its desktop preset. These are local lab measurements, not live GitHub Pages or field measurements.

| Page and profile | Performance | Accessibility | Best practices | SEO | LCP | CLS | Total blocking time |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, mobile | 99 | 100 | 100 | 100 | 2.1 s | 0 | 0 ms |
| Homepage, desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 | 0 ms |
| Articles archive, mobile | 97 | 100 | 100 | 100 | 2.6 s | 0 | 0 ms |

After expansion to 69 entries, a fresh mobile audit of `/articles/` measured **96 performance, 100 accessibility, 100 best practices and 100 SEO**, with LCP **2.7 s**, CLS **0** and total blocking time **0 ms**. The matching HTML/JSON reports are `output/lighthouse/articles-linkedin-mobile.report.*`.

After replacing repeated imagery, the archive uses **69 distinct images**: **20 original LinkedIn images or video stills**, **46 individual AI-generated editorial illustrations**, and **three retained original-site images**. The built-in image generation tool was used, with prompts and provenance saved in `article-image-prompts.json` and `article-images.json`. All selected sources are saved locally. At 480 pixels wide, the optimised article images average **20 KB**. The source filter and the mix of original photos and illustrations were inspected in the in-app browser; the updated screenshot is `output/playwright/article-imagery-preview.png`.

The final imagery export measured **97 performance, 100 accessibility, 100 best practices and 100 SEO** in a fresh mobile Lighthouse run, with **2.6 s LCP**, **0 CLS** and **0 ms total blocking time**. Reports are `output/lighthouse/articles-imagery-mobile.report.*`. The final lint, TypeScript, production build and 74 passing browser tests are recorded in `output/article-imagery/validation.log`.

The expanded archive was also inspected in the in-app browser with the source filter showing all 63 LinkedIn records. Its preview is saved at `output/playwright/linkedin-archive-preview.png`.

HTML and JSON reports are in `output/lighthouse/`. Example reproduction:

```sh
npm run preview
npx lighthouse http://127.0.0.1:4173/ --chrome-flags='--headless' --only-categories=performance,accessibility,best-practices,seo --output=html --output=json --output-path=output/lighthouse/home-mobile
```

Add `--preset=desktop` for the desktop profile. The recorded runs used `--no-sandbox` for the isolated automated Chrome process. Scores vary by browser, machine and hosting. Repeat on the public domain after deployment. Framework JavaScript and some image/CSS delivery opportunities remain in the reports; the measured categories meet the requested 95+ target on these representative pages.

## Visual and typography checks

Reviewed full-page desktop and mobile captures of the homepage, archive, biography and contact pages. Captures are saved in `output/playwright/`. Lazy-loaded images were scrolled into view before capture. The inspected pages had no broken images and every rendered image had rounded corners.

Computed text styles on these pages use only the native system-font stack, and network inspection recorded **zero font requests** on desktop and mobile. Both custom font packages and `next/font/local` were removed. All authored font, size, weight, line-height, tracking and text-transform rules are managed in `src/styles/typography.css`; page CSS Modules handle layout and colour. The local in-app preview was refreshed after the final build.

## Scope and launch review

Automated accessibility results do not establish complete WCAG conformance. Human screen-reader review and testing on physical devices remain useful. The original archived PDF has not been remediated for accessibility. Clinical/editorial approval, current contact details, incomplete LinkedIn history and other factual limitations are recorded in [review-required.md](review-required.md).

GitHub Pages deployment, DNS, HTTPS and real external appointment availability can only be verified after the owner configures and publishes the site. The application is ready for that documented workflow; publication is not claimed here.
