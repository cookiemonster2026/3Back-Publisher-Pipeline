# 3Back Why Domain Expertise Matters — Grok Build Prompt
**Package:** `docs/publishing/packages/why-domain-expertise-matters/3Back-Why-Domain-Expertise-Grok-Build-Package-v1.md`  
**Route:** `/why-domain-expertise-matters`  
**Agent:** Grok Build CLI  
**Target:** localhost review. No commit / push / deploy.

---

Read `AGENTS.md`, `docs/website-acceptance-checklist.md`, `docs/publishing/technical-manifest.md`, `docs/publishing/Site-Intent-Map-v1.2.md`, and `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md` before any change. Inspect the current stub at `src/pages/why-domain-expertise-matters.astro`, `src/components/StubPage.astro`, `src/seo/registry.mjs`, `src/layouts/SiteLayout.astro`, `src/pages/domain-guides.astro`, `src/pages/workshops.astro`, homepage numbered-block hover, a heading-left / body-right homepage section, and an existing `astro:assets` `<Image />` page.

Implement only the approved scope in `docs/publishing/packages/why-domain-expertise-matters/3Back-Why-Domain-Expertise-Grok-Build-Package-v1.md`.

Replace the stub with a complete page at `/why-domain-expertise-matters`. Use `SiteLayout` and the existing token system. This page is louder than Domain Guides and Workshops. Do not copy Workshops `details` expanders. Do not invent an eyebrow. Do not invent sentences.

Visible copy must match the package section 3 exactly.

Copy these source images into the assets paths, then render with `<Image />`. Captions stay outside the art.

- `docs/publishing/packages/why-domain-expertise-matters/why-domain-board-signal-silence.jpg` → `src/assets/why-domain-expertise/board-signal-silence.jpg`
- `docs/publishing/packages/why-domain-expertise-matters/why-domain-signal-ignored.png` → `src/assets/why-domain-expertise/signal-ignored.png`

If either source image is missing from that package folder after `git pull`, stop and report. Do not search Downloads, Codex sessions, or other machines. Do not generate replacements.

Register the page in `src/seo/registry.mjs` as complete:

- title: Why Domain Expertise Matters | 3Back
- description: A credential does not transfer into the work. Expertise in the domain cannot be conferred by an outside body. ROI is measured in grip, not attendance.
- indexability: index, follow
- social title and description match
- type: website
- no image, no structuredData, no missingWork

Do not edit `/courses`, `/domain-guides`, header, footer, or the Site Intent Map.

No em dashes. No badges. No stock. No program syllabus. No SM-as-subject. No Course schema. Appendix A does not apply.

If this package conflicts with AGENTS.md, the Manifest, the SEO registry shape, or the current repo, stop and report.

Run `pnpm check`, `pnpm build`, `pnpm build:test`, and the repo SEO validator. Leave the site running on localhost (`pnpm dev` / `astro dev --background`). Do not commit, push, or deploy.

Report files modified, the registry entry, validation results, localhost URL, the seven-item look-at list from the package, anything unverifiable locally, confirmation that no commit/push/deploy occurred, and the AGENTS.md verification block. Print READY FOR HUMAN REVIEW and the URL.
