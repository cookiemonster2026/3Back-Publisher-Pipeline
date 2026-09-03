# 3Back Why Domain Expertise Matters — Grok Build Package v1
**Route:** `/why-domain-expertise-matters`  
**Agent:** Grok Build CLI  
**Status:** Stages 1–4 approved. Stage 5 package ready for staff approval before execution.  
**Date:** 2026-09-02  
**Target:** localhost review first. No commit, push, or deploy without explicit Douglas authorization.

---

## 1. Purpose & Outcome

Replace the stub at `/why-domain-expertise-matters` with a complete, indexable argument page.

The page argues why domain expertise matters. It is a rant against credentials and coaches who stay beside the work. It is not the Domain Guides program home. `/domain-guides` remains the program explanation. `/courses` already links here. Do not add a second program syllabus.

The page must:

- Use the Stage 2 copy exactly
- Use the Stage 3 louder visual lock
- Use the two approved images with the approved captions
- Convert to `/contact/`
- Register as a complete `index, follow` page
- Drop the STUB treatment

## 2. Repo / Route / Environment

- Repository: `cookiemonster2026/3Back-Publisher-Pipeline`
- Replace existing stub file: `src/pages/why-domain-expertise-matters.astro`
- Also allowed:
  - `src/seo/registry.mjs`
  - `src/assets/why-domain-expertise/board-signal-silence.jpg`
  - `src/assets/why-domain-expertise/signal-ignored.png`
  - Page-scoped styles in the route file, matching how other complete pages style themselves
- Read first: root `AGENTS.md`, `docs/website-acceptance-checklist.md`, `docs/publishing/technical-manifest.md`, current Site Intent Map (`docs/publishing/Site-Intent-Map-v1.2.md`), Brand Brief
- Inspect before changing: current stub page, `src/components/StubPage.astro`, `src/layouts/SiteLayout.astro`, `src/pages/domain-guides.astro`, `src/pages/workshops.astro`, homepage numbered-block hover, a wide homepage heading-left / body-right section, and an existing `astro:assets` `<Image />` page (`src/pages/doomscroll.astro` or `src/pages/scrum-101.astro`)
- Images: import from `src/assets` and render with `<Image />`. Do not put the files in `public/` unless AGENTS.md forbids the assets path for this case.
- Local review: `pnpm dev` / `astro dev --background`. Staff review the Astro localhost URL. Do not use `wrangler dev` or localhost:8787.
- If this package conflicts with `AGENTS.md`, the Manifest, the SEO registry shape, or the current repo, stop and report.

Source image files for this pass (copy into the repo assets path above):

- Board pair: `docs/publishing/packages/why-domain-expertise-matters/why-domain-board-signal-silence.jpg` → `src/assets/why-domain-expertise/board-signal-silence.jpg`
- Beacon pair: `docs/publishing/packages/why-domain-expertise-matters/why-domain-signal-ignored.png` → `src/assets/why-domain-expertise/signal-ignored.png`

The beacon file is the staff-supplied original. The board file is a reconstruction of the staff-supplied frame. Do not letter either image. Do not generate a third image.

## 3. Approved visible content

Use the following copy exactly. No em dashes. No eyebrow. Do not add unapproved headings, sentences, hover essays, or captions.

**H1**  
Why domain expertise matters

**Dek**  
People coaching teams in these environments should have expertise in the environment they are coaching. That expertise cannot be conferred by an outside body. It does not work. There is no substitute for developing expertise from within.

**Display line**  
In your business. Where ROI is measured in grip, not attendance.

**Problem (no heading)**  
Generic Agile taught vocabulary. It did not teach this backlog, this intake, this decision, or this quality bar. It was not in your domain. It was decoration. Your domain is not decoration. Your business matters. The credential did not transfer to the context in which you operate. That is the whole problem.

People without the domain still get put next to teams. They arrive with a credential from outside. They cannot see the work. They still talk. They still schedule. They still rearrange the ritual. The team has to translate the business for them. Then the credential is treated as if it outranks the work. That is backwards. It does not help the team. It is harmful.

Mark these exact phrases for the approved hover treatment: `this backlog`, `this intake`, `this decision`, `this quality bar`, and `decoration` (the first occurrence only, in “It was decoration.”).

**Section heading**  
Get in the work or get out

Companies rent coaches who are not in the work, not in the tools, and not in the business. Those people stay involved. They comment. They schedule. They do not get the work done. When they leave, the skill leaves with them.

There is no useful middle state called involved. A person is committed to getting the work done, or they are not. If they cannot open the board, read the ticket, sit in the refinement, and help the team move, they are not a coach here.

01 Get involved.  
02 Or get out.

Commentary is not a role. Wall decoration is not a role.

**Section heading**  
The board tells the truth. Or it performs.

The board can tell you what is happening. Or it can perform control for an audience. Domain expertise is the difference. You need people who can read the board and say what the work is doing. Not people who tidy it until the evidence goes quiet.

We have watched teams sterilize the signal. Clean tickets. Pretty columns. No fight in the data. The work is slipping, and the board has been made presentable enough that nobody has to hear it. That is not grip. That is the sound of silence.

Someone with true expertise in a domain does the opposite. They keep the signal loud enough to act on. They rally the teams. They rally the work. They bring focus. They can bring focus because they actually understand the work. They know how to do it. They know the domain of execution.

Image: board pair.  
Captions (left / right):  
Signal. The constraint is still visible.  
Silence. Made presentable.

**Section heading**  
How you would know it is working

Attendance is not evidence. Grip is evidence.

Ready work before planning. Fewer sprint interruptions. Ownership that does not bounce. Dependencies visible early. Quality that does not arrive as a late surprise. People who can run planning without an outsider in the room.

If those signals get ignored, you have built another training universe. We already know how that ends.

Image: beacon pair.  
Caption: The signal being ignored.

**Close band**  
Start a conversation about the domain we need to know, and about who is actually in the work.

No transformation pitch. No universal answer. Your backlog. Your intake. Your quality bar.

Primary button label: **Start a conversation**  
Href: `/contact/`

Secondary text link: **Check Your Grip** → `/grip-check/`  
Quiet text link: **Domain Guides** → `/domain-guides/`

Final lines:  
The skill stays where it belongs. In your business.  
ROI is measured in grip, not attendance.

Do not invent an H2 that is not listed above. Do not use “The whole problem” or “Start a conversation” as a section heading. The button owns that phrase.

## 4. Approved visual / asset direction

Louder than `/domain-guides`. Still 3Back tokens. Not Appendix A.

- Cream `#F3EEE6`, ink `#1C1D1A`, soft `#5C6561`, line `#DDD5C8`, orange `#C45C1C`, close band near `#161714` or the existing homepage/workshops dark band token if that is already in CSS
- Site fonts, header, footer, existing button component or `.button` pattern, underline-grow links
- Wide sections. Heading left / body right on viewports where the homepage already does that. Stack on small screens. Short measure. No cards-on-cards
- H1 larger and tighter than the Domain Guides H1. Grotesque. Little tracking mercy
- Dek harder than body. More ink, less soft gray
- Display line is a strike plate, not a caption. Orange rule above it, or the line itself in orange. Full measure
- Problem block: heavy orange left rule
- 01 / 02 are posters, not tidy list items. Big numerals. Short labels. Orange border at rest. On hover/focus: lift 2px, same motion language as homepage numbered blocks
- Images run wide inside the section. Editorial, not gallery tiles. No text baked into the art
- Close band dark and blunt. Primary button is the only polite object
- Heat-mark on hover/focus for `this backlog`, `this intake`, `this decision`, `this quality bar`
- Orange strike-through on hover/focus for the first `decoration`
- On viewports with no hover, heat-mark and strike are already visible
- Do not hover every paragraph
- Do not restore dropped 01/02/03 program cards
- Do not turn the evidence paragraph into six hover lamps
- No stock. No badges. No testimonials. No gradients, blobs, glass, parallax, autoplay
- Mobile: single column. Images scale. No horizontal scroll. 01/02 stack. CTA thumb-reachable
- Appendix A does not apply. Do not borrow CSM chrome, form drawer, social-proof strip, or credential hero

Preview HTML `why-domain-expertise-stage3-preview.html` is layout reference only. It is not live chrome and not a font mandate. Match site fonts and components first.

## 5. Approved SEO / social package

Change the existing `"/why-domain-expertise-matters"` entry in `src/seo/registry.mjs` from stub to:

```js
"/why-domain-expertise-matters": {
  status: "complete",
  path: "/why-domain-expertise-matters",
  title: "Why Domain Expertise Matters | 3Back",
  description: "A credential does not transfer into the work. Expertise in the domain cannot be conferred by an outside body. ROI is measured in grip, not attendance.",
  indexability: "index, follow",
  social: {
    title: "Why Domain Expertise Matters | 3Back",
    description: "A credential does not transfer into the work. Expertise in the domain cannot be conferred by an outside body. ROI is measured in grip, not attendance.",
    type: "website",
  },
},
```

- Remove `missingWork`
- Canonical via existing helper: `https://3back.com/why-domain-expertise-matters`
- No `structuredData` key
- No social image
- Production sitemap include follows existing complete-page gating
- No em dashes in title or description

## 6. Source / asset locations

- Approved copy: this package, section 3
- Visual lock: this package, section 4
- Brand: `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md`
- Visual tile: `docs/brand/source/3Back-Visual-Direction-Tile-v0.4.pdf`
- Control: `AGENTS.md`, `docs/publishing/technical-manifest.md`, `docs/website-acceptance-checklist.md`, `docs/publishing/Site-Intent-Map-v1.2.md`
- Layout cousins: `src/pages/workshops.astro` and `src/pages/domain-guides.astro` for tokens and dark band only. This page is louder than both.
- Images: section 2
- `/courses` already contains the framing link to this route. Leave it alone.

## 7. Classification & indexing

- Complete page
- index, follow in production
- Included in production sitemap through existing complete-page behavior
- Test/noindex gating remains `SEO_BUILD_ENV` as already implemented
- Do not change stub classification on `/building-domain-expertise` or course stubs

## 8. Acceptance criteria

- `/why-domain-expertise-matters` is not a StubPage
- Visible copy matches section 3 exactly
- No eyebrow
- Display line is visually a strike plate
- 01 / 02 posters exist and are armed at rest
- Board image + two captions present
- Beacon image + one caption present
- Start a conversation → `/contact/`
- Check Your Grip → `/grip-check/`
- Domain Guides → `/domain-guides/`
- Registry entry matches section 5
- `/courses` still links here and was not edited
- Header and footer unchanged
- No badges, stock, program syllabus, SM-centric copy, or unapproved sentences
- No em dashes in rendered copy or metadata
- Page uses `SiteLayout` and existing tokens
- `pnpm check`, `pnpm build`, and `pnpm build:test` succeed
- SEO validator passes for this route

## 9. Required validation

1. Read `AGENTS.md`, acceptance checklist, Manifest, Site Intent Map, and Brand Brief before changes.
2. Inspect the files listed in section 2.
3. Implement only approved scope.
4. Run `pnpm check`, `pnpm build`, `pnpm build:test`, and `scripts/validate-seo.mjs` (or the repo’s documented SEO validation command).
5. Leave Astro running on localhost.
6. Stop and report on conflict.

## 10. Explicit exclusions & deferred work

- Do not commit, push, or deploy
- Do not edit `/training`, `/courses`, `/domain-guides`, `/workshops`, `/events`, homepage, header, or footer
- Do not update Site Intent Map (Stage 8 only, after live verification)
- Do not add a program request form
- Do not add Course / FAQ / EducationalOrganization schema
- Do not name AAG, CAD-P, Domain-Based Agility Guide Program, or Scrum Master as the page subject
- Do not expand Appendix A
- Do not invent Playwright tests, SPEC.md, or wrangler-dev review
- Do not use the Stage 3 preview HTML as production markup

## 11. Required builder report

Use the `AGENTS.md` verification format, plus:

- Files created or modified
- Exact registry entry
- Confirmation StubPage is gone
- Localhost URL
- Confirmation no commit / push / deploy
- Look-at list below
- Anything unverifiable on localhost (production sitemap live presence)

**Localhost look-at list**

1. Route is a finished page. No STUB label.
2. H1 is Why domain expertise matters. No eyebrow. Display line reads as a strike plate.
3. Four `this` phrases heat-mark. First `decoration` takes an orange strike. On a phone-width viewport those marks are visible without hover.
4. 01 Get involved / 02 Or get out are posters with orange border at rest and a 2px lift on hover.
5. Board pair and beacon pair are present with the exact captions. No text baked into the art.
6. Dark close: Start a conversation → `/contact/`. Check Your Grip and Domain Guides are text links.
7. View source / head: title and meta match section 5. No STUB metadata.

Print `READY FOR HUMAN REVIEW` and the localhost URL.

## 12. Self-contained implementation prompt

Use `docs/publishing/packages/why-domain-expertise-matters/3Back-Why-Domain-Expertise-Grok-Build-Prompt.md`.
