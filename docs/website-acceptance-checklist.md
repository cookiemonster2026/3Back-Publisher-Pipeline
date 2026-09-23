# Website acceptance checklist

This file is the shared verification source for future website changes. It contains baseline conditions, not task results.

## Acceptance Testing Readiness

000 — Initialize: The Independent AI Reviewer reads Reviewer Agents.md and confirms readiness to perform according to its instructions. At each handoff the builder resets this item to R Review. The reviewer records Pass or Fail; on Fail, identifies the blocker and stops. This readiness result is separate from the 100 active live-site verdicts.

## Governing sources

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 001 | Global | Agent | The task follows the repository-root instruction file and this checklist. | Read both before editing and identify the applicable item numbers in the working notes or task report. |
| 002 | Affected | Agent | The complete `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md` is the authoritative source for outward-facing positioning, voice, navigation, hierarchy, interaction, and general design principles. `docs/brand/source/3Back-Visual-Direction-Tile-v0.4.pdf` is the authoritative visual standard for visual implementation and look and feel. Agents must not read, convert, or render any DOCX version. | When any listed area is affected, read the complete Markdown brief before editing. When visual implementation or look and feel is affected, also inspect the visual direction tile and compare appropriate rendered evidence with it. |
| 003 | Affected | Agent | Page-specific source material may add constraints but may not override this publication checklist, the scope of `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md`, or the visual implementation and look-and-feel standard established by `docs/brand/source/3Back-Visual-Direction-Tile-v0.4.pdf`. | Identify applicable page sources and check their scope and status against the governing source for the affected concern. Prototype-only exceptions do not become publication requirements. |
| 004 | Global | Agent | The change remains within the user's requested scope. | Inspect the final diff and generated-file status. Account for every changed file. |
| 005 | Global | Agent | Baseline acceptance conditions and stable item numbers remain unchanged unless the user explicitly approved a checklist edit. | Inspect the checklist diff. Never renumber, reuse, weaken, remove, or rewrite an existing item without approval. |
| 006 | Global | Agent | Task-specific results are reported in the task report and are not written into this baseline checklist. | Inspect the checklist diff for transient pass, fail, date, screenshot, or task notes. |
| 007 | Global | Agent | Every new or still-unaccepted task suite provides inline release notes and direct, click-first tests. Release notes identify what shipped, affected public routes, and relevant source filenames and public asset URLs. Each increment row covers one distinct specimen or observable outcome, displays a clickable absolute live URL when one exists, and states the smallest concrete inspection needed for Pass or Fail. | Open the rendered acceptance-results page. Confirm a reviewer can navigate the release from its notes and test links without searching the repository, that unrelated checks are not bundled into vague rows, and that any condition without a live URL names the exact alternative evidence or command. |

### Stable numbering policy

Item numbers are permanent. New conditions require the user's explicit approval and must use an unused number in the relevant hundred range. Never close gaps by renumbering. If an approved condition is retired, preserve its number and mark it retired with the approval context. Number ranges are: 000 governance, 100 brand, 200 content, 300 navigation and links, 400 responsive behavior, 500 accessibility, 600 technical integrity, 700 homepage, 800 future page-specific checks, and 900 human review.

## How to run this checklist

### Global regression checks

Do not rerun every Global live item after every website change. A stored live green or red stands until the change could invalidate that condition. Then the implementer marks it blue and an outside reviewer rechecks only that surface. If the governing rule is missing, conflicting, or too ambiguous to support a defensible verdict, the outside reviewer marks J for Douglas. A clear failure of a known condition is red. R means active investigation, not a final parking state. For every R, attempt the specified test or a defensible verification method. Record P or F when evidence supports it. Otherwise propose a concrete next action or an exact condition and test change for human approval. If human judgment is needed to proceed, record J with the blocker, attempted approaches, proposal if available, and decision requested. Never change a condition merely to manufacture a pass; approval authorizes a change, while verification establishes P. Process items 001, 002, 003, 004, 005, 006, 007, 602, and 606 are answered in the task report. They have no live color.

### Checks that run only when affected

Run an `Affected` item when the requested or resulting diff could change its condition. Use the final diff, shared components, route reach, CSS inheritance, generated output, and runtime behavior to determine impact. If impact is plausible, run the check. Do not run unrelated page-specific checks merely to increase the count.

### Verification rules

- `Agent` means Codex or Claude can verify the item using source inspection, a build, generated output, browser testing, or another stated method.
- A check passes only when the stated condition was actually examined with a method capable of testing it.
- If the required environment, destination, content approval, or tool is unavailable, report the item as unverified.
- A successful build does not prove visual, link, accessibility, or content correctness.
- `Human` items are always reported as pending until the user or designated reviewer approves them.

### Status on /docs/acceptance-testing

Live colors apply to the 100 active live items. Five retired conditions remain in source history but are omitted from the current results view and score. Green and red are live verdicts on a known condition. Blue means a known condition needs a live look. J means human judgment is needed to proceed. The implementer may only mark blue. An outside reviewer marks green, red, or J. Douglas decides J. The surface map is a starting point, not a closed list. Last checked ignores blue and J.

Retirement authority: Douglas approved the replacement homepage, route-specific header and regrouped footer, and the conflicting-test revisions in task `01a0bba0-a8c0-73b3-866c-49c7ae602c95`, implemented September 20, 2026. Retire 304 and 704–707 without deleting their conditions or historical evidence. Replacement coverage is 309 and 709–715. Production typography and colors are invariants, not new design choices; 109 adds regression coverage. Item 308 covers the approved homepage arrow grammar.

## Global brand and positioning

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 101 | Global | Agent | 3Back is positioned as **The Team Execution Company**. | Search all changed outward-facing copy and inspect the rendered context of primary brand statements. |
| 102 | Global | Agent | Operational Grip is presented as 3Back's operating lens, not as a separate company, packaged methodology, certification system, guaranteed formula, or independent brand. | Search changed copy, metadata, navigation, labels, diagrams, and visual marks; inspect rendered context. |
| 103 | Global | Agent | Training, Agile, Scrum, credentials, and certifications do not define or dominate the 3Back brand. | Inspect the primary hierarchy, page titles, headings, navigation, calls to action, and prominent visuals across affected output. |
| 104 | Affected | Agent | Outward-facing work speaks first to executive leaders accountable for execution and operational or transformation leaders responsible for improving it. Practitioners may remain a broader audience without controlling positioning. | Compare affected copy hierarchy and calls to action with `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md`. |
| 105 | Affected | Agent | Claims remain bounded, evidence-led, commercially grounded, and diagnostic before prescriptive. The site does not promise certainty, universal answers, guaranteed outcomes, or revenue. | Review every affected claim in context and trace proof claims to an approved source. |
| 106 | Affected | Agent | Language leads with team execution and concrete operational mechanisms, not generic transformation, consultancy, motivational, culture-change, psychology, or promotional language. | Review changed headings, body copy, metadata, alt text, and calls to action against the brief's language discipline and exclusions. |
| 107 | Affected | Agent | Visual elements, shared styles, and components affected by the requested change or final diff align with `docs/brand/source/3Back-Visual-Direction-Tile-v0.4.pdf`, the authoritative visual standard. Determine impact from direct changes and indirect effects through inherited CSS, shared components, and responsive behavior. | Inspect appropriate rendered visual evidence for every affected surface at representative desktop and mobile widths and compare it with `docs/brand/source/3Back-Visual-Direction-Tile-v0.4.pdf`. Source inspection or a successful build alone is insufficient. Report the item unverified when adequate rendered evidence cannot be obtained. |
| 108 | Affected | Agent | Visuals avoid generic consulting imagery, staged teams, decorative corporate geometry, software-company cues, heavy industrial styling, fixed-method framework diagrams, industry montages, and unjustified motion. | Inspect all affected images, illustrations, diagrams, animation, and decorative treatments. |

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 109 | Affected | Agent | Homepage and shared-shell typography, production colors, weights, line heights, and button variants use the established production design system. Approved composition and diagram changes do not introduce a new font family or palette. | Compare computed and actually rendered fonts, token values, buttons, eyebrows, header, and footer against the production baseline at desktop and mobile widths and in hover and focus states. |

## Published content

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 201 | Global | Agent | No internal design notes, production instructions, test directions, placeholders, template tokens, or unconfirmed content appear in published output. | Search source and built HTML for markers such as `TODO`, `placeholder`, bracketed instructions, `required`, `implementation test`, and dummy text; inspect rendered pages for context. |
| 202 | Affected | Agent | Published case evidence and performance claims are substantiated. Invented metrics, composite claims presented as fact, anonymous praise, and unsupported outcomes are absent. | Trace each affected claim to an approved source or report it unverified. |
| 203 | Affected | Agent | Case evidence, when present, leads with the observed condition, bounded change, and observable result; credentials and methodology claims remain secondary. | Inspect the structure and hierarchy of each affected evidence block. |
| 204 | Affected | Agent | Dates, names, company information, article titles, legal text, and contact information are confirmed and internally consistent. | Compare affected facts with repository sources or an authoritative source supplied or approved by the user. |
| 205 | Affected | Agent | Public copy contains no accidental developer text, malformed characters, encoding corruption, or tool artifacts. | Inspect affected source and rendered output, including punctuation and special characters. |

## Sitewide navigation and footer

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 301 | Global | Agent | Every published navigation and footer link resolves to its intended destination. | Enumerate header, mobile navigation, and footer links in built output; follow each local link and check external links when network access is available. |
| 302 | Global | Agent | Unavailable destinations are not assigned fabricated, misleading, or guessed routes. | Compare every affected or newly published destination with actual routes and approved external URLs. Plain text or an explicitly disabled treatment is acceptable when honest and usable. |
| 303 | Global | Agent | Every **Start a Conversation** control leads to a functioning contact path. | Activate each instance by keyboard and pointer from built output; verify that the intended form, email, scheduler, or contact destination opens and can be used. |
| 304 | Retired | Agent | The sitewide header, navigation labels, brand descriptor, primary action, and footer remain consistent across published pages. | Compare all built routes that use the changed shell or shared component. |
| 305 | Affected | Agent | Navigation accurately identifies the current location or section without relying only on color. | Inspect and exercise affected navigation on each relevant route or section. |
| 306 | Affected | Agent | Mobile navigation can be opened, traversed, activated, and dismissed without trapping focus or obscuring required controls. | Test by keyboard and touch-sized viewport whenever mobile navigation or shared shell behavior could be affected. |
| 307 | Affected | Agent | Every published page uses the shared site layout for its sitewide header and footer; page-specific copies of header or footer markup are absent. | Inspect all published page sources and built routes, confirm each page uses the shared layout, and search for header or footer markup duplicated outside the shared components. |

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 308 | Affected | Agent | Homepage engagement actions use an up-right arrow, informational route links a right arrow, and same-page links a down arrow. Shared chrome may remain arrow-free. Arrows are decorative, separately styled, and never underlined. | Exercise each homepage action with pointer and keyboard. Confirm its destination, arrow, accessible name, underline, hover, and focus behavior. Current Ideas links follow the informational route grammar. |
| 309 | Affected | Agent | Shared header and footer preserve production typography and sizing while supporting the approved homepage navigation and footer groups. Existing inner-page navigation, conversation-funnel destinations, legal and social links, and the Product Ownership III on-demand exception remain intact. | Inspect homepage, ordinary inner page, Domain Guides, and every existing course header variant. Test mobile navigation. Confirm homepage Operational Grip opens its route, How to engage opens the homepage engagement section, and footer groups are Explore, Engage, Learn, and Company. |
| 310 | Affected | Agent | Homepage navigation and regrouped shared footer work while all existing inner-page navigation and conversation-funnel variants remain intact. | Check desktop and mobile header destinations, all footer groups and legal/social links, and Product Ownership III on-demand exclusion. |

## Links and contact path

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 321 | Affected | Agent | In-page links target an existing unique element and land without hiding the target behind persistent UI. | Parse affected fragments and exercise them in the browser at desktop and mobile widths. |
| 322 | Affected | Agent | Link purpose is understandable from its text and context; distinct destinations do not use misleadingly identical labels. | Inspect affected links in rendered context. |
| 323 | Affected | Agent | External links, downloads, email links, and telephone links use the intended protocol and expose no private, local, staging, or placeholder destination. | Inspect affected `href`, download behavior, and built output. |
| 324 | Affected | Agent | The contact path provides a clear completion or handoff state and a usable error state when submission can fail. | Exercise the affected contact flow through success and feasible failure paths, or report unavailable external integrations as unverified. |

## Responsive behavior

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 401 | Global | Agent | Desktop layout remains usable and free of unintended horizontal overflow, clipping, overlap, and obscured controls. | Inspect every affected route at a representative desktop viewport and test document overflow. |
| 402 | Global | Agent | Mobile layout remains usable and free of unintended horizontal overflow, clipping, overlap, and obscured controls. | Inspect every affected route at 320 CSS pixels and a representative modern mobile width; test document overflow. |
| 403 | Affected | Agent | Content reflows without requiring two-dimensional scrolling, except for a component whose meaning requires it and that has an accessible alternative or usable containment. | Resize affected pages and inspect long text, tables, code, diagrams, and media. |
| 404 | Affected | Agent | Text, controls, diagrams, and meaningful images remain legible and operable at desktop, tablet, and mobile widths without loss of content. | Inspect the affected component across boundary widths and with long or wrapped content. |
| 405 | Affected | Agent | Motion and responsive transitions do not conceal content and respect reduced-motion preferences. | Exercise affected motion with normal and `prefers-reduced-motion: reduce` settings. |

## Accessibility

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 501 | Global | Agent | Basic keyboard navigation remains functional. Interactive elements are reachable in a logical order, operable without a pointer, and not trapped. | Traverse every affected route from the address bar using keyboard-only input. |
| 502 | Global | Agent | Keyboard focus remains visibly identifiable on every interactive element. | Traverse affected routes using keyboard-only input and inspect each focus state against its background. |
| 503 | Affected | Agent | Each public page has a descriptive title, one meaningful H1, logical heading order, and semantic landmarks. Staff routes under `/docs` and below are out of scope for this item. | Inspect affected public source or accessibility tree and rendered heading hierarchy. Do not use Cloudflare Access login pages as specimens. Do not require signed-in `/docs` review for this item. |
| 504 | Affected | Agent | Controls have accessible names, states, and roles that match their behavior; links navigate and buttons perform actions. | Inspect the accessibility tree and exercise affected controls. |
| 505 | Affected | Agent | Meaningful images have useful alternative text; decorative images are ignored by assistive technology; live text is not flattened into images. | Inspect affected markup, accessible names, and rendered content. |
| 506 | Affected | Agent | Form fields have persistent labels, understandable instructions, accessible validation, and errors that identify how to recover. | Inspect and exercise affected forms using keyboard and accessibility-tree output. |
| 507 | Affected | Agent | Text, interactive states, and meaningful graphical elements retain sufficient contrast. Color is not the sole carrier of meaning. | Measure affected color pairs with an appropriate contrast tool and inspect non-color cues. |
| 508 | Affected | Agent | Skip navigation and other bypass mechanisms continue to reach the intended main content. | Activate each affected bypass control by keyboard on built pages. |

## Build and technical integrity

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 601 | Global | Agent | After a push to main, production reflects that commit on an affected public route. | Spot-check an affected public route. Pass when the Deployed stamp or visible production content matches the push. Do not require the Cloudflare dashboard. Do not use /docs or the Access login. Fail only if the public route did not update or the build is known to have failed. |
| 602 | Global | Agent | Only files within the requested scope changed, and no build artifacts, local secrets, temporary files, or unrelated formatting changes were introduced. | Inspect `git status --short` and the final diff; distinguish pre-existing user changes from task changes. |
| 603 | Affected | Agent | Every added or changed public internal route builds and loads directly, not only through client-side navigation. | Open each affected public route from the address bar and verify status and content. Do not use /docs or the Access login. |
| 604 | Affected | Agent | Affected public pages produce no new runtime exceptions, failed local resource requests, or invalid asset references. | Inspect the browser console and network on affected public pages. Do not use /docs or the Access login. |
| 605 | Affected | Agent | Metadata, canonical URLs, indexing directives, and social preview data remain accurate for the affected public page and environment. | Inspect affected public built head output and referenced assets. Staff /docs metadata is out of this item unless Douglas includes it. |
| 606 | Affected | Agent | Changed dependencies, configuration, and scripts are necessary, reproducible, and compatible with the repository's declared runtime. | Inspect manifest and lockfile diffs, then run the relevant command with the declared runtime. |

## Homepage

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 701 | Affected | Agent | The homepage quickly establishes 3Back as The Team Execution Company and describes organizational execution, not generic transformation or training. | Inspect the rendered title, hero, opening copy, and primary hierarchy whenever the homepage or sitewide brand shell changes. |
| 702 | Affected | Agent | The homepage presents weak or misplaced boundaries as a possible mechanism disconnecting demand, decisions, work, and results without claiming it is the universal cause of complexity. | Compare affected problem framing with `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md` and the homepage blueprint. |
| 703 | Affected | Agent | The homepage defines Operational Grip as the current lead lens and keeps 3Back as the enduring brand. | Inspect affected hero, Operational Grip section, navigation, credibility section, metadata, and calls to action. |
| 704 | Retired | Agent | The homepage connects execution from demand through organizational response, delivered value, market acceptance, and revenue without promising revenue. | Inspect affected copy and diagrams for the complete relationship and bounded claim. |
| 705 | Retired | Agent | The homepage explains an evidence-first approach centered on one bounded problem, one decision, one accountable owner, and one observable result. | Inspect affected approach and evidence sections against governing sources. |
| 706 | Retired | Agent | The homepage hero offers one primary action into Operational Grip. Start a Conversation remains available in the header and the closing band, not as the hero button. | Inspect and activate the hero button, the header conversation control, and the closing conversation control on live /. |
| 707 | Retired | Agent | Homepage section order supports an executive scan from problem, through lens and commercial relevance, to approach, evidence, deeper thinking, and action. | Review affected page hierarchy at desktop and mobile widths against the homepage blueprint. |
| 708 | Affected | Agent | The homepage uses one H1 and live, selectable text for headings, navigation, and explanatory diagrams. | Inspect affected DOM and rendered selection behavior. |

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 709 | Affected | Agent | The homepage leads with teams, connects human expertise and AI capability to organizational outcomes, and explains that cheaper possibilities shift the constraint toward selection. | Inspect the approved hero, selection card, and bounded-execution service statement in rendered context. |
| 710 | Affected | Agent | Domain-guided selection is explicit, and Domain Guides develop the organization's own capability rather than being presented as externally supplied 3Back experts. | Read the diagram, guided-selection signal, engagement copy, and credibility posture together. |
| 711 | Affected | Agent | Four signals of Operational Grip are labeled Legible demand, Guided selection, Bounded failure, and Visible results. They are signals, not ordered steps or a guarantee of success. | Inspect all four descriptions, group label, equal inset spacing, hover and keyboard-focus treatment, and reduced-motion behavior. |
| 712 | Affected | Agent | The hero offers Check your grip to /grip-check/ and See ways to engage to #engage. The grip section offers Explore Operational Grip to /operational-grip/, and Why 3Back links to #why-3back. | Activate every specified link at desktop and mobile widths; inspect unique fragment targets and scroll clearance. |
| 713 | Affected | Agent | One problem. Three ways to engage presents distinct Grip Check, Workshops, and Domain Guides destinations, not three links to a shared closing CTA. | Activate each engagement row and compare its description with its destination. |
| 714 | Affected | Agent | The homepage sequence is hero and AI-selection card, Operational Grip and four signals, engagement choices, concise credibility, and four Current Ideas cards followed by the shared footer. Current Ideas presents the latest Tales strip, No Head Works Alone, How 3Back Approaches Learning, and the books collection with approved images and concise descriptions. Removed problem tiles, commercial essay, sample score, working sequence, and lineage band do not return as standalone bands. | Inspect the full rendered page in desktop and mobile order; verify credibility claims against approved repository sources and activate all four card destinations. |
| 715 | Affected | Agent | The selection diagram uses legible live text for Possibilities, Teamwork with AI, Domain-guided selection, and Outcomes. Its box grows 15–20 percent and reverses orange contrast on desktop hover or keyboard focus, without drawing the output line over the box. Mobile remains static and reduced-motion preferences are respected. | Inspect resting, hover, focus, reduced-motion, 320px, and modern mobile states. Measure text and box size, line stacking, label placement, contrast, and overflow. |
| 716 | Affected | Agent | The four signals are Legible demand, Guided selection, Bounded failure, and Visible results, with an explicit group label and equal internal padding. | Inspect all descriptions, hover and keyboard states, first-card left inset, and reduced-motion behavior. |
| 717 | Affected | Agent | Grip Check, Workshops, and Domain Guides open distinct engagement routes; concise credibility is sourced and four illustrated Current Ideas cards replace the closing conversation and retain the orange footer divider. | Follow the three engagement rows, Why 3Back, About, Reviews, and all four Current Ideas destinations; verify the seven-minute note, Assess it, Workshop a bounded problem, and Build your Domain Guides program; compare credibility against approved About content. |

Promoted from accepted homepage suite `2026-09-20-1726`: increment 003 → standing 310, 006 → 716, and 007 → 717.

## Staff docs and promoted course checks

Promoted at Accept from the staff-docs, Product Ownership I, Product Ownership II, Scrum Mastering III, Product Ownership III, Scaling Scrum with Scrum, Scrum Better with Kanban, and Scrum for Teams suites. Six rows came from suite `2026-09-11-171700`; later accepted course increments added seventeen rows. Numbers are new. Do not reuse increment `001`–`010`.

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 801 | Affected | Agent | Testing page chip is Recent, not Deployed | Open `/docs/acceptance-testing/`. Confirm the chip label is Recent and the link opens the recent suite. |
| 802 | Affected | Agent | Testing page top-right link is Acceptance Results | Confirm the link text and that it opens `/docs/acceptance-results/`. |
| 803 | Affected | Agent | Weekly empty state is the locked sentence | Confirm `None yet. Runs Sunday only after an accepted increment.` |
| 804 | Affected | Agent | Standing weekly note is on the testing page | Confirm the section 3.5 paragraph after the procedure block. |
| 805 | Affected | Agent | Results list is most recent first and marks accepted rows | Confirm top-left is the newest suite. Accepted rows end with `CDT (Accepted)`. |
| 806 | Affected | Agent | Users of Docs is approved domains | Open `/docs/`. Procedures includes Users of Docs. That page has no name list. It names `@3back.com` and `@tunatraffic.com`. |
| 807 | Affected | Agent | Product Ownership I course page is live with the locked promise | Open `https://3back.com/training/product-ownership-1/`. Confirm H1 Product Ownership I: Leading a Team and promise Lead a Team. One owner. One backlog. |
| 808 | Affected | Agent | Product Ownership I learning objectives spoke serves the approved PDF | Open `/training/product-ownership-1/learning-objectives`. Confirm it serves `3Back-PO1-Learning-Objectives-v1.25.pdf`. |
| 809 | Affected | Agent | Product Ownership I data sheet spoke serves the approved PDF | Open `/training/product-ownership-1-data-sheet/`. Confirm it serves `3Back-PO1-Data-Sheet-v1.0.pdf`. |
| 810 | Affected | Agent | Product Ownership II course page is live with the locked promise | Open `https://3back.com/training/product-ownership-2/`. Confirm H1 Product Ownership II: Making Hard Decisions, hero promise Making Hard Decisions., and quiet line Builds on Product Ownership I. |
| 811 | Affected | Agent | Product Ownership II enrollment and commercial facts stay locked | Open `https://3back.com/training/product-ownership-2/`. Confirm Enrollment coming soon is disabled, the offer line `$150 | Printed guidebook included | 12 months to complete`, and the proof strip 12 modules / 80% to advance / 12 months / RPO2 credential. |
| 812 | Affected | Agent | Product Ownership II spokes serve the approved PDFs | Open `/training/product-ownership-2/learning-objectives` and `/training/product-ownership-2-data-sheet/`. Confirm they serve `3Back-PO2-Learning-Objectives-v1.17.pdf` and `3Back-PO2-Data-Sheet-v1.0.pdf`. |
| 813 | Affected | Agent | Scrum Mastering III course page is live with the locked promise | Open `https://3back.com/training/scrum-mastering-3/`. Confirm H1 Scrum Mastering III: Organizational Improvement and the exact hero promise Organizational Improvement. |
| 814 | Affected | Agent | Scrum Mastering III spokes serve the approved PDFs | Open `/training/scrum-mastering-3/learning-objectives` and `/training/scrum-mastering-3-data-sheet/`. Confirm they serve `3Back-SM3-Learning-Objectives-v1.25.pdf` and `3Back-SM3-Data-Sheet-v1.0.pdf`. |
| 815 | Affected | Agent | Product Ownership III course page is live with the locked promise | Open `https://3back.com/training/product-ownership-3/`. Confirm H1 Product Ownership III: Leading Agile Organizations, hero promise Leading Agile Organizations., and quiet line Builds on Product Ownership II. |
| 816 | Affected | Agent | Product Ownership III spokes serve the approved PDFs | Open `/training/product-ownership-3/learning-objectives` and `/training/product-ownership-3-data-sheet/`. Confirm they serve `3Back-PO3-Learning-Objectives-v1.37.pdf` and `3Back-PO3-Data-Sheet-v1.0.pdf`. |
| 817 | Affected | Agent | Scaling Scrum with Scrum course page is live with the locked promise | Open `https://3back.com/training/scaling-scrum-with-scrum/`. Confirm the hero promise Respond at the scale the work requires., no book cover, and the locked SSwS mark only. |
| 818 | Affected | Agent | Scaling Scrum with Scrum spokes serve the approved PDFs | Open `/training/scaling-scrum-with-scrum/learning-objectives` and `/training/scaling-scrum-with-scrum-data-sheet/`. Confirm they serve `3Back-SSwS-Learning-Objectives-v1.1.pdf` and `3Back-SSwS-Data-Sheet-v1.1.pdf`. |
| 819 | Affected | Agent | Scrum Better with Kanban course page is complete and indexable | Open `https://3back.com/courses/scrum-better-with-kanban/`. Confirm a 200 response, the approved H1 and course facts, and no stub treatment. |
| 820 | Affected | Agent | Scrum Better with Kanban hero shows the two official credentials | Inspect the hero at desktop and mobile widths. Confirm the complete SKP mark above the complete Scrum Better with Kanban microcredential mark, the approved caption, and no Rosie cartoon or rule through the marks. |
| 821 | Affected | Agent | The Scrum for Teams stub is replaced by a complete course page with the supplied mark, a direct whole-team promise, and the approved course history. | Open `/courses/scrum-for-teams/` and confirm the mark, eyebrow, H1, outcome promise, original-course line, Scrum Alliance history, and 1996 line. |
| 822 | Affected | Agent | The Exploring Scrum cover sits beside the approved history caption and does not dominate the page. | Inspect the book section at desktop and mobile widths. |
| 823 | Affected | Agent | The closing sales band presents the learning objectives and data sheet as buyer resources, both spokes serve the supplied v1.0 PDFs, and the legacy short path 301s to the canonical course route. | Inspect the closing resource links, request both PDF routes, and request `/scrum-for-teams` without following redirects. |
| 824 | Affected | Agent | The canonical Tales of the Grip hub returns 200 with the approved title, H1, body, newest published strip first, publication dates, links to indexable permanent strip pages, an accurate closing message, and no Doomscroll eyebrow. | Open `/tales-of-the-grip/` directly; confirm published strips appear in reverse chronological order, each title and image links to its permanent page, and inspect the document title and closing message. |
| 825 | Affected | Agent | The Tales of the Grip hub shows all published strips newest first, using strip number as the same-day tie-breaker, with publication dates and links from each title and image to its permanent page. | Open `/tales-of-the-grip/`; confirm the order follows publication date and strip-number tie-breaker, then activate every title and image link. |
| 826 | Affected | Agent | Every published permanent Tales of the Grip page returns 200 and shows the correct complete full-color artwork, title, publication date, shared header, and shared footer. | Open every published permanent strip URL directly and compare its rendered title and artwork with the approved final source. |
| 827 | Affected | Agent | Every permanent Tales of the Grip page provides usable Share and Copy link controls plus a clear link back to Tales of the Grip. | Exercise the controls with pointer and keyboard on every permanent page; confirm the shared URL and return destination are correct. |
| 828 | Affected | Agent | The Tales of the Grip hub orders published strips by publication date, newest first. When publication dates are equal, it uses strip number, highest first. Every title and image links to its permanent page. | Open `/tales-of-the-grip/`; confirm publication dates descend, confirm same-date strips use the highest strip number first, and activate every title and image link. |
| 829 | Affected | Agent | The Six Layers of Governance permanent page returns 200 and shows the correct title, publication date, all three supplied full-color parts in order, sharing controls, and a link back to Tales of the Grip. | Open `/tales-of-the-grip/six-layers-of-governance/`; inspect all three panels and exercise the page controls with pointer and keyboard. |
| 830 | Affected | Agent | The collection is a compact, ungrouped quick-reference view of every published strip, with each title above its thumbnail and publication date below, and both title and thumbnail linking to the permanent page. | Open `/tales-of-the-grip/collection/`; compare all entries with the hub and activate each title and thumbnail link. |
| 831 | Affected | Agent | The Events page imports its public list from `src/data/events.mjs` and does not read Google, a webhook, or `ES_Script` on the visitor request. | Inspect `src/pages/events.astro` and the live `/events` network activity. |
| 832 | Affected | Agent | The publish-events workflow listens only for `repository_dispatch` type `publish-events` and grants only `contents: write` to its job. | Inspect `.github/workflows/publish-events.yml`. |
| 833 | Affected | Agent | The publish-events workflow rejects a missing or wrong `PUBLISH_EVENTS_SECRET` and rejects an empty or invalid payload before writing `src/data/events.mjs`. | Inspect the workflow guards and a rejected run when one exists. |
| 834 | Affected | Agent | A valid publish-events payload may write only `src/data/events.mjs`. Enrollment URLs start with `https://event.3back.com/`. Seal paths start with `/assets/`. | Inspect the workflow write path and a successful run diff. |
| 835 | Affected | Agent | The publish-events workflow commits only changed `src/data/events.mjs` content with message `Publish events from Events Schedule`, pushes `main`, and does not run pnpm or edit `events.astro`. | Inspect the workflow commit step and the resulting commit. |
| 836 | Affected | Agent | Strip 200, We Removed the Role, has a live permanent page dated September 21, 2026 whose complete artwork matches the approved source; its public image is the same 1600 by 2400 artwork. | Open `https://3back.com/tales-of-the-grip/we-removed-the-role/`, compare every panel and line of text with the approved source, and inspect `https://3back.com/social/tales-of-the-grip/we-removed-the-role.png`. |
| 837 | Affected | Agent | Strip 201, True Agility. Now Faster., has a live permanent page dated September 22, 2026 whose complete artwork matches the approved source; its public image is the same 1600 by 2400 artwork. | Open `https://3back.com/tales-of-the-grip/true-agility-now-faster/`, compare every panel and line of text with the approved source, and inspect `https://3back.com/social/tales-of-the-grip/true-agility-now-faster.png`. |
| 838 | Affected | Agent | Strip 202, Virtual Product Training for Customers, has a live permanent page dated September 20, 2026 whose complete artwork matches the approved source; its public image is the same 1600 by 2400 artwork. | Open `https://3back.com/tales-of-the-grip/virtual-product-training-for-customers/`, compare every panel and line of text with the approved source, and inspect `https://3back.com/social/tales-of-the-grip/virtual-product-training-for-customers.png`. |

## Human visual and executive review

These checks are never agent-passed. Run them when affected and report each applicable item as pending.

| Item | Class | Verifier | Acceptance condition | Review prompt |
| --- | --- | --- | --- | --- |
| 901 | Affected | Human | Final visual quality is polished, coherent, restrained, and credible across desktop and mobile. | Review affected pages at representative desktop and mobile widths, including hierarchy, spacing, typography, imagery, and finish. |
| 902 | Affected | Human | The message is credible, appropriately bounded, and sounds like 3Back. | Review affected outward-facing copy in full context, not as isolated strings. |
| 903 | Affected | Human | The result is relevant to executive and operational leaders without excluding practitioners who need the material. | Review the affected hierarchy, examples, proof, and calls to action from the primary audience's perspective. |
| 904 | Affected | Human | Brand expression conveys quiet authority, operational depth, commercial grounding, and a bias toward action without resembling a training company, conventional consultancy, software startup, academic institute, or aggressive industrial brand. | Review the complete affected experience and compare it with `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md`. |
| 905 | Affected | Human | Any new or materially changed case evidence, photography, illustration, humor, or sensitive claim is suitable and approved for publication. | Confirm factual permission, editorial judgment, tone, and contextual fit. |
