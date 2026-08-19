# 3Back Publishing Technical Manifest

This manifest records repository-verifiable technical context for publishing work. It describes the repository at the current `main` checkout. Where the repository does not establish a fact, that limitation is stated explicitly.

**Verified as of:** 2026-08-14 against the current `main` checkout.

## Technology stack and versions

| Concern | Repository-verified value | Source |
| --- | --- | --- |
| Project package | `3back-publisher-pipeline` version `0.0.1`; ECMAScript modules (`"type": "module"`) | `package.json` |
| Site framework | Astro `7.1.6` resolved in the lockfile; declared as `^7.1.6` | `package.json`, `pnpm-lock.yaml` |
| Sitemap integration | `@astrojs/sitemap` `3.7.3` resolved; declared as `^3.7.3` | `package.json`, `pnpm-lock.yaml` |
| Cloudflare CLI | Wrangler `4.119.0` resolved; declared as dev dependency `^4.119.0` | `package.json`, `pnpm-lock.yaml` |
| Node.js | `>=22.12.0` is required. An exact Node version is not pinned. | `package.json` |
| Package manager | pnpm workspace and lockfile format `9.0`. An exact pnpm release is not declared. | `pnpm-workspace.yaml`, `pnpm-lock.yaml` |
| Astro diagnostics | `@astrojs/check` `0.9.10` and its required TypeScript peer `6.0.3` are resolved; declared as dev dependencies `^0.9.10` and `^6.0.3`. Astro's strict TypeScript configuration is extended. | `tsconfig.json`, `package.json`, `pnpm-lock.yaml` |
| Styling | Component-scoped Astro CSS plus global CSS and design tokens in `SiteLayout.astro`; no CSS framework is declared. | `src/**/*.astro`, `package.json` |
| Typeface | Source Sans 3, weights 400 through 800, loaded from Google Fonts; fallbacks are Segoe UI, Arial, and sans-serif. No font-file version is recorded. | `src/layouts/SiteLayout.astro` |

There are no declared React, Vue, Svelte, Tailwind, CMS, database, or test-runner dependencies.

## Site architecture and rendering mode

- The site uses Astro file-based routes under `src/pages/`.
- `astro.config.mjs` does not explicitly set an output mode or install a server adapter, so Astro uses its default static generation behavior. The build produces files in `dist/`, which is the directory configured for Cloudflare static assets and is ignored by Git.
- Page content is rendered from `.astro` source at build time. The `robots.txt.ts` endpoint generates environment-dependent text during the build.
- The repository contains browser-side scripts in Astro components for the responsive navigation and homepage interaction. No client UI framework is declared.
- `site` is fixed to `https://3back.com` in `astro.config.mjs` through `SITE_ORIGIN` from the SEO registry.
- No content collections, dynamic route files, middleware, or server-rendering adapter are present. The Cloudflare Worker in `functions/worker.mjs` supplies the contact-form API route.

## Publishing-relevant repository structure

```text
/
|-- AGENTS.md                         Repository policy, SEO workflow, release rules
|-- astro.config.mjs                  Astro site and sitemap configuration
|-- package.json                      Runtime constraint and commands
|-- pnpm-lock.yaml                    Resolved dependency versions
|-- pnpm-workspace.yaml               Single-package workspace and allowed native builds
|-- wrangler.jsonc                    Cloudflare static-asset deployment configuration
|-- functions/
|   `-- worker.mjs                    Cloudflare Worker and `/api/contact` handler
|-- scripts/
|   |-- build.mjs                     Astro diagnostics, environment-gated build, SEO validation
|   `-- validate-seo.mjs              Built-output SEO validator
|-- src/
|   |-- components/                   Shared shell, SEO, policy, and stub components
|   |-- layouts/SiteLayout.astro      Shared document layout and global visual tokens
|   |-- pages/                        Public file-based routes and robots.txt endpoint
|   `-- seo/                          Central metadata registry and its TypeScript types
|-- public/                           Files copied to published output unchanged
|   |-- assets/operational-grip/      Homepage and Operational Grip images/icons
|   |-- downloads/operational-grip.pdf
|   `-- favicon.{svg,ico}
`-- docs/
    |-- brand/source/                 Governing and page-specific brand sources
    |-- publishing/technical-manifest.md
    |                                   Repository-verifiable publishing context
    `-- website-acceptance-checklist.md
```

`dist/`, `.astro/`, `node_modules/`, environment files, and logs are ignored by `.gitignore`.

## Shared layouts and components

- `src/layouts/SiteLayout.astro` supplies the HTML document, English language declaration, viewport and favicon tags, Google Font loading, skip link, global CSS variables and base styles, `SeoHead`, `SiteHeader`, `SiteFooter`, and the page slot.
- `src/components/SeoHead.astro` renders registry-controlled title, description, robots and Googlebot directives, canonical URL, Open Graph metadata, X metadata, optional social image metadata, optional sitemap discovery, and production-only JSON-LD.
- `src/components/SiteHeader.astro` supplies desktop and mobile navigation and the browser script for opening, closing, Escape handling, link-close behavior, and desktop-breakpoint reset.
- `src/components/SiteFooter.astro` supplies shared Explore, Learning, and Company links.
- `src/components/PolicyPage.astro` wraps complete policy routes and rejects registry entries whose status is not `complete`.
- `src/components/StubPage.astro` wraps declared stub routes and rejects registry entries whose status is not `stub`.
- Every HTML page under `src/pages/` reaches `SiteLayout`: directly for `/` and `/operational-grip`, through `PolicyPage` for the two policy routes, or through `StubPage` for the six stub routes.

## Content and asset locations

- Public page copy is embedded directly in `src/pages/*.astro`; there is no content collection or external content source configured.
- Shared navigation, footer copy, shell behavior, and shared styles are in `src/components/` and `src/layouts/`.
- SEO copy, canonical paths, page status, social metadata, structured data, and selected canonical Operational Grip language are centralized in `src/seo/registry.mjs`.
- Static files under `public/` publish from the site root without source transformation.
- Operational Grip PNG illustrations are under `public/assets/operational-grip/og-page/`.
- Homepage icon SVGs and `hands-bar.png` are under `public/assets/operational-grip/`.
- The downloadable paper is `public/downloads/operational-grip.pdf`.
- Favicons are `public/favicon.svg` and `public/favicon.ico`.

## Image and asset handling convention

This convention governs future publishing work. It does not approve an image's subject, composition, crop, or visual treatment. Those decisions remain subject to the governing brand brief, visual direction tile, page-specific approved sources, and the website acceptance checklist.

### Storage decision

- Put page photography, editorial illustration, and other substantial raster images displayed in page content under `src/assets/`. Import them into the consuming `.astro` file and render them with Astro's `<Image />` or `<Picture />` component from `astro:assets`. This is the default because Astro can inspect, transform, fingerprint, and bundle imported local images.
- Keep a file under `public/` only when publishing its exact bytes at a predictable root-relative URL is an intentional requirement. Current categories include favicons, social-sharing images referenced by external crawlers and the SEO registry, downloadable documents, and assets that must remain directly URL-addressable and unprocessed, such as the current CSS-mask SVGs.
- Do not put a page raster in `public/` merely to avoid an import. Files in `public/` are copied unchanged, and Astro does not provide responsive image generation for them. If one visual must serve both a page and a stable external URL, treat those as separate delivery roles: retain the stable public asset and use an imported `src/assets/` source for the page rendering. Any duplication or derivative creation requires separate approval.
- A public raster that is intentionally rendered without processing must use a native `<img>` or `<Image />` with explicit intrinsic `width` and `height`. Using `<Image />` does not optimize a public image, but it can enforce consistent authoring attributes. Document the reason the stable, unprocessed URL is required.

### Rendering and responsive behavior

- Use `<Image />` by default. It is sufficient for a single optimized output format and can generate responsive `srcset` and `sizes` when given a responsive `layout`.
- Use `<Picture />` only when the page needs explicitly ordered alternative formats with a fallback, for example AVIF and WebP sources with the original format as fallback. `<Picture />` is not required merely to generate responsive widths; `<Image />` supports that behavior too.
- Select responsive behavior from the actual layout. Use `layout="constrained"` for images that shrink with a content or card container but should not grow beyond their intended maximum, and `layout="full-width"` only for images intended to fill their container. Use `fixed` only for genuinely fixed-size assets. When the generated `sizes` assumption does not match the CSS layout, supply accurate `widths` and `sizes` rather than allowing the browser to select an unnecessarily large source.
- Do not request generated widths above the source image's intrinsic width. Preserve the approved aspect ratio unless an approved design calls for a crop. Verify the result at the checklist's required desktop and mobile widths.
- Every rendered raster must reserve its layout space before download. For imported local images, use the dimensions Astro infers or set the intended width and height when transforming. For public or otherwise unprocessed images, set accurate `width` and `height` attributes. Keep responsive CSS aspect-ratio-safe, normally with proportional sizing such as `height: auto`; when an approved crop is used, reserve the intended aspect ratio and define the crop deliberately.
- Keep Astro's default lazy loading for below-the-fold images. Use `priority` or eager loading only for an image confirmed to be critical above the fold, and do not mark a group of competing images as high priority without performance evidence.

### SVGs, accessibility, naming, and organization

- SVGs do not need raster format conversion. Put a page-owned icon, logo, or diagram in `src/assets/<page-or-feature>/` and import it as an Astro SVG component when inline styling, `currentColor`, semantics, or component ownership is useful. Keep an SVG in `public/` when a stable URL or an intentionally external reference is required, including favicons and CSS `url()` or mask references. Do not use `<Picture />` for SVGs.
- Every meaningful image must have concise alt text that communicates the content or function needed in its page context. Do not repeat a nearby caption unless the repetition is necessary to convey the image. A linked or functional image's accessible name must describe the action or destination.
- A purely decorative raster or image reference must use `alt=""`. A purely decorative inline SVG must be removed from the accessibility tree, normally with `aria-hidden="true"`, and must not introduce a focus stop. Meaningful inline SVGs require an accessible name appropriate to their role. Do not flatten live headings, labels, or explanatory copy into images.
- Use lowercase kebab-case filenames with a descriptive subject or purpose. Avoid spaces, opaque export names, source filenames containing cache hashes, and dimensions in names unless dimensions are part of a stable external specification. Use numeric prefixes only when sequence is meaningful.
- Organize imported publishing images by page, feature, or content family under `src/assets/`, for example `src/assets/operational-grip/`. Organize intentionally public files by delivery role under `public/`, for example `public/social/`, `public/downloads/`, or a documented stable asset namespace. Preserve an already-published public URL unless a URL change and all consumers are explicitly approved.

### Current assets requiring later review

The repository currently has no `src/assets/` directory and does not use Astro `<Image />` or `<Picture />`. The following findings are inventory notes only; this task does not authorize a migration.

| Existing asset or use | Later review reason |
| --- | --- |
| `public/assets/operational-grip/hands-bar.png` as rendered by `src/pages/index.astro` | A 1685 by 934 substantial page raster is served unprocessed from `public`. Its raw `<img>` also omits intrinsic `width` and `height`, so the markup does not reserve space from the asset dimensions. |
| `public/assets/operational-grip/og-page/01-*.png` through `06-*.png` as rendered by `src/pages/operational-grip.astro` | Six 1672 by 941 substantial page rasters are served unprocessed from `public`. Their raw `<img>` elements do declare correct intrinsic dimensions, but they do not receive Astro-generated responsive sources or format optimization. |
| `public/assets/operational-grip/og-page/07-operational-grip-chicago-lens.png` | Its stable public path conforms to the social-sharing role declared in `src/seo/registry.mjs` and required by `scripts/validate-seo.mjs`. Its additional use as a substantial raw page image should be reviewed separately for an imported page-rendering source while preserving the public social asset. |

The current `public/favicon.svg`, `public/favicon.ico`, `public/downloads/operational-grip.pdf`, and five SVG files under `public/assets/operational-grip/icons/` match the public-file side of this convention: they are favicons, a download, or intentionally URL-addressed CSS masks. This classification does not assess or reapprove their visual content.

### Astro guidance basis

This convention follows Astro's official [Images guide](https://docs.astro.build/en/guides/images/) and [`astro:assets` API reference](https://docs.astro.build/en/reference/modules/astro-assets/): keep local images in `src/` when possible; reserve `public/` for unprocessed direct URLs; prefer `<Image />` when possible; use `<Picture />` for multiple formats and fallback; apply responsive layouts to generate `srcset` and `sizes`; provide dimensions to prevent layout shift; and provide alt text, using an empty value for decorative images.

## Governing brand and visual sources

Repository policy and the acceptance checklist establish these roles:

- `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md` is the sole governing brand and design brief for outward-facing positioning, audience, voice, language, navigation, hierarchy, interaction, and general design principles.
- `docs/brand/source/3Back-Visual-Direction-Tile-v0.4.pdf` is the authoritative visual implementation and look-and-feel standard.
- `docs/brand/source/3Back-Homepage-Content-Blueprint-v0.1.md` is page-specific homepage source material. Page-specific sources may add constraints but may not override the governing brief, visual standard, or publication checklist.
- `docs/website-acceptance-checklist.md` is the baseline publication verification source.
- `AGENTS.md` prohibits reading, converting, or rendering a DOCX brand-brief version. No DOCX brand source is tracked in this repository.

## SEO registry and page classifications

The registry is `src/seo/registry.mjs`; its declared shape is documented by `src/seo/types.ts`. The canonical origin is `https://3back.com`. Paths are normalized by removing trailing slashes except for `/`.

| Route | Classification | Declared production indexability | Structured data in registry | Tracked missing work |
| --- | --- | --- | --- | --- |
| `/` | Complete | `index, follow` | Organization, WebSite, WebPage | None |
| `/operational-grip` | Complete | `index, follow` | Organization, WebSite, ImageObject, WebPage, DefinedTerm | None |
| `/workshops` | Complete | `index, follow` | None | None |
| `/policies` | Complete | `index, follow` | None | None |
| `/privacy-policy` | Complete | `index, follow` | None | None |
| `/about` | Stub | `noindex, nofollow` | None | Substantive company and team content; approved complete-page metadata; appropriate structured data |
| `/contact` | Complete | `index, follow` | None | None |
| `/doomscroll` | Stub | `noindex, nofollow` | None | Actual diagnostic feed content; completed browsing experience; approved complete-page metadata |
| `/grip-check` | Stub | `noindex, nofollow` | None | Completed screening flow; results behavior; functional contact handoff; approved complete-page metadata |
| `/ideas` | Stub | `noindex, nofollow` | None | Approved resource inventory; substantive index content; approved complete-page metadata |
| `/live-events` | Stub | `noindex, nofollow` | None | Current event details; event schedule; appropriate event structured data; approved complete-page metadata |

`scripts/validate-seo.mjs` verifies:

- registry keys and paths agree;
- required title, description, social title, social description, and social type are present;
- complete and stub status/indexability rules hold, and every stub has a nonempty `missingWork` list;
- referenced social images exist and have alt text, dimensions, and MIME type;
- every declared HTML route is built and every built HTML route is declared;
- built title, description, robots, Googlebot, canonical, Open Graph, X, sitemap-discovery, and social-image metadata match the registry and environment;
- test output contains no production JSON-LD;
- production structured-data graphs for `/` and `/operational-grip` contain the expected types, identifiers, relationships, and canonical Operational Grip definition;
- selected rendered Operational Grip language matches the registry constants;
- production and test `robots.txt` behavior is correct;
- sitemap inclusion matches environment and page status.

The validator reports intentional stub SEO to-dos on every run and exits nonzero for validation errors.

## Build, validation, and verification commands

Run commands from the repository root.

| Command | Verified repository behavior |
| --- | --- |
| `pnpm dev` | Runs `astro dev`. Repository policy requires background mode when starting development: `astro dev --background`, managed with `astro dev stop`, `astro dev status`, and `astro dev logs`. |
| `pnpm check` | Runs `astro check` for Astro, TypeScript, and content diagnostics. |
| `pnpm build:test` | Runs Astro diagnostics, then Astro build mode `test`, then test SEO validation. |
| `pnpm build` | Runs Astro diagnostics, then Astro build mode `production-indexable`, then production SEO validation. |
| `pnpm validate:seo:test` | Validates the current `dist/` as test output. It does not build first. |
| `pnpm validate:seo` | Validates the current `dist/` as production output. It does not build first. |
| `pnpm preview` | Runs `astro preview` against built output. |
| `pnpm deploy` | Runs the production build and validation, then `wrangler deploy`. |
| `pnpm astro ...` | Exposes the Astro CLI for commands not covered by a dedicated repository script. |

There is no `test` script or unit, integration, or end-to-end test framework in `package.json`. `docs/website-acceptance-checklist.md` defines additional source-inspection, built-output, browser, responsive, accessibility, link, visual, and human-review checks. Those checks are conditional as specified in that file and are not automated by the package scripts.

## Test versus production SEO behavior

`scripts/build.mjs` is the supported environment gate. Its first positional argument must be exactly `production` or `test`. A missing or invalid value prints `Build environment must be production or test.` and exits with status 1 before Astro runs; it is not treated as test mode. For a valid value, the script sets `SEO_BUILD_ENV`, selects the corresponding Astro mode, builds, and validates the result.

| Output concern | Production build | Test build, development, or raw/default Astro build |
| --- | --- | --- |
| Trigger | `pnpm build` passes `production`, and the wrapper sets `SEO_BUILD_ENV=production` | `pnpm build:test` passes `test`, and the wrapper sets `SEO_BUILD_ENV=test`. The wrapper rejects missing or invalid arguments rather than treating them as test mode. Development or a direct/raw Astro build can leave `SEO_BUILD_ENV` unset; repository SEO checks then treat it as nonproduction and fail closed. |
| Complete-page robots metadata | Registry value, currently `index, follow` | `noindex, nofollow` |
| Stub-page robots metadata | `noindex, nofollow` | `noindex, nofollow` |
| Sitemap | Generated with complete routes only | Sitemap integration filters out all routes |
| Sitemap discovery `<link>` | Emitted | Not emitted |
| `robots.txt` | Allows `/` and advertises `https://3back.com/sitemap-index.xml` | Disallows `/` and advertises no sitemap |
| JSON-LD | Emitted only for complete entries that define it | Not emitted |
| Canonical and social metadata | Uses the production origin and registry values | Still uses the production origin and registry values, while crawl directives remain closed |

The Astro mode names do not determine SEO behavior by themselves. SEO rendering code tests `SEO_BUILD_ENV === "production"`; therefore only that exact environment value enables production SEO. Outside `scripts/build.mjs`, an unset or other value receives the same fail-closed SEO rendering behavior as test output, but it is not thereby a valid test invocation of the build wrapper.

## GitHub-to-Cloudflare deployment path

### Production publish control

Cloudflare production deploys from GitHub `main` only. Agents must not push production work to a non-GitHub remote or to a branch other than `main`. Before claiming a deploy, verify `origin` is the GitHub repository URL and that the commit exists on `origin/main`. Spot-check live routes after deploy. Full agent rules: root `AGENTS.md` (Production publish).

The approved publishing workflow is owner-verified:

1. Commit the approved publishing changes to `main`.
2. Push `main` to the GitHub remote. The push triggers the connected Cloudflare deployment automatically.

The repository verifies that Git remote `origin` is `https://github.com/cookiemonster2026/3Back-Publisher-Pipeline.git`. It also provides `pnpm deploy`, which invokes `wrangler deploy`. Wrangler runs its configured `pnpm build` custom build before publishing `./dist` as static assets. That command is available but is not the standard publishing path and must not be run unless explicitly authorized. `wrangler.jsonc` names the Cloudflare deployment `3back-publisher-pipeline`, uses compatibility date `2026-08-06`, and defines the Worker entry point at `functions/worker.mjs`.

The repository does not contain a GitHub Actions workflow. The connected Cloudflare deployment behavior and `main` publishing branch are owner-verified rather than established by tracked workflow files. The deployed Cloudflare account/project, secrets, custom-domain routing, preview deployment behavior, and rollback procedure remain unverified from the available repository and owner-provided information.

## Contact form infrastructure

- `/contact` is a complete, production-indexable page with a contact form. It posts to `/api/contact`, which is handled by the Cloudflare Worker in `functions/worker.mjs`.
- Cloudflare Turnstile protects the form. `PUBLIC_TURNSTILE_SITE_KEY` is a required public **build variable** available to Astro while it generates the static page. `TURNSTILE_SECRET_KEY` is a Worker runtime secret used for server-side token verification.
- Resend sends the notification and acknowledgment emails. `RESEND_API_KEY` is a Worker runtime secret. The Worker defaults `CONTACT_FROM_EMAIL` to `noreply@3back.com` and `CONTACT_NOTIFICATION_EMAIL` to `og@3back.com`; `wrangler.jsonc` declares the same non-secret defaults. The `3back.com` sending domain must be verified in Resend before production delivery.
- Build and runtime configuration are separate: Worker runtime variables and secrets do not enter Astro's static build. Configure `PUBLIC_TURNSTILE_SITE_KEY` as a production Build variable. Dashboard text variables may not persist across deploys, so the address defaults are also represented in `wrangler.jsonc`.
- Required fields are Name, Email, Role / position, and the execution problem. Phone is optional. The Worker validates the required fields and includes Role / position in the internal notification to `og@3back.com`.
- [`docs/publishing/contact-form.md`](contact-form.md) is the operational runbook for Cloudflare and Resend configuration.

## Current stubs and deferred capabilities

The registry-declared stubs exclude `/contact`, which is complete. Their exact deferred work is recorded in the SEO table above and enforced as nonempty registry metadata.

Additional current boundaries:

- Grip Check has no completed screening, result, or contact-handoff flow at its route. The homepage contains an in-page assessment interaction, but the registry separately tracks `/grip-check` as unfinished.
- Ideas has no configured resource inventory or content system.
- Live Events has no event schedule or event structured data.
- About has no substantive company/team content or page-specific structured data.
- Doomscroll has no diagnostic feed or completed browsing experience.

## Technical conventions and known limitations

- Public pages must have explicit entries in `pageSeo`; undeclared built HTML routes fail SEO validation.
- A complete page must declare `index, follow`. A stub must declare `noindex, nofollow` and list missing work.
- Stub pages are excluded from every sitemap. Test output excludes every page from the sitemap.
- Only production-indexable builds may emit crawl-allowing rules, sitemap entries, or structured data.
- Page metadata is passed from each route into the shared layout. `PolicyPage` and `StubPage` add runtime build guards against classification misuse.
- Canonical routes in the registry omit trailing slashes except `/`; navigation commonly uses trailing-slash links, and canonical normalization removes trailing slashes.
- Static public assets are referenced with root-relative paths. Astro's built-in `astro:assets` image service is available through the installed framework, but the current repository has no `src/assets/` directory, image configuration, or `<Image />`/`<Picture />` usage. The convention above establishes how future publishing work should use that built-in path without changing current assets or configuration.
- Global design tokens and much of the reusable visual system live in `SiteLayout.astro`, while page-specific CSS remains colocated in `.astro` files.
- Source content is code-coupled because page copy is embedded in `.astro` files. No CMS, Markdown content collection, localization layer, or publishing data schema is configured.
- The only social image registered is for `/operational-grip`; the other routes use text-only social cards.
- Structured data is currently registered only for `/` and `/operational-grip`.
- `README.md` remains the generic Astro starter README and does not document the repository-specific SEO or deployment system.
- The exact local/CI Node and pnpm versions, an automated CI/CD topology, and Cloudflare account-side settings cannot be verified from tracked files.
- Build output is ignored and is not a publishing source of record.
- Repository policy requires human approval before implementing material public-page language or SEO recommendations and prohibits commit, push, or deploy unless explicitly instructed.
