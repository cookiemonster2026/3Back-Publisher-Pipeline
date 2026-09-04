# Website acceptance checklist

This file is the shared verification source for future website changes. It contains baseline conditions, not task results.

## Governing sources

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 001 | Global | Agent | The task follows the repository-root instruction file and this checklist. | Read both before editing and identify the applicable item numbers in the working notes or task report. |
| 002 | Affected | Agent | The complete `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md` is the authoritative source for outward-facing positioning, voice, navigation, hierarchy, interaction, and general design principles. `docs/brand/source/3Back-Visual-Direction-Tile-v0.4.pdf` is the authoritative visual standard for visual implementation and look and feel. Agents must not read, convert, or render any DOCX version. | When any listed area is affected, read the complete Markdown brief before editing. When visual implementation or look and feel is affected, also inspect the visual direction tile and compare appropriate rendered evidence with it. |
| 003 | Affected | Agent | Page-specific source material may add constraints but may not override this publication checklist, the scope of `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md`, or the visual implementation and look-and-feel standard established by `docs/brand/source/3Back-Visual-Direction-Tile-v0.4.pdf`. | Identify applicable page sources and check their scope and status against the governing source for the affected concern. Prototype-only exceptions do not become publication requirements. |
| 004 | Global | Agent | The change remains within the user's requested scope. | Inspect the final diff and generated-file status. Account for every changed file. |
| 005 | Global | Agent | Baseline acceptance conditions and stable item numbers remain unchanged unless the user explicitly approved a checklist edit. | Inspect the checklist diff. Never renumber, reuse, weaken, remove, or rewrite an existing item without approval. |
| 006 | Global | Agent | Task-specific results are reported in the task report and are not written into this baseline checklist. | Inspect the checklist diff for transient pass, fail, date, screenshot, or task notes. |

### Stable numbering policy

Item numbers are permanent. New conditions require the user's explicit approval and must use an unused number in the relevant hundred range. Never close gaps by renumbering. If an approved condition is retired, preserve its number and mark it retired with the approval context. Number ranges are: 000 governance, 100 brand, 200 content, 300 navigation and links, 400 responsive behavior, 500 accessibility, 600 technical integrity, 700 homepage, 800 future page-specific checks, and 900 human review.

## How to run this checklist

### Global regression checks

Run these after every website change: 001, 004, 005, 006, 101, 102, 103, 201, 301, 302, 303, 401, 402, 501, 502, 601, and 602.

### Checks that run only when affected

Run an `Affected` item when the requested or resulting diff could change its condition. Use the final diff, shared components, route reach, CSS inheritance, generated output, and runtime behavior to determine impact. If impact is plausible, run the check. Do not run unrelated page-specific checks merely to increase the count.

### Verification rules

- `Agent` means Codex or Claude can verify the item using source inspection, a build, generated output, browser testing, or another stated method.
- A check passes only when the stated condition was actually examined with a method capable of testing it.
- If the required environment, destination, content approval, or tool is unavailable, report the item as unverified.
- A successful build does not prove visual, link, accessibility, or content correctness.
- `Human` items are always reported as pending until the user or designated reviewer approves them.

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
| 304 | Affected | Agent | The sitewide header, navigation labels, brand descriptor, primary action, and footer remain consistent across published pages. | Compare all built routes that use the changed shell or shared component. |
| 305 | Affected | Agent | Navigation accurately identifies the current location or section without relying only on color. | Inspect and exercise affected navigation on each relevant route or section. |
| 306 | Affected | Agent | Mobile navigation can be opened, traversed, activated, and dismissed without trapping focus or obscuring required controls. | Test by keyboard and touch-sized viewport whenever mobile navigation or shared shell behavior could be affected. |
| 307 | Affected | Agent | Every published page uses the shared site layout for its sitewide header and footer; page-specific copies of header or footer markup are absent. | Inspect all published page sources and built routes, confirm each page uses the shared layout, and search for header or footer markup duplicated outside the shared components. |

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
| 503 | Affected | Agent | Each page has a descriptive title, one meaningful H1, logical heading order, and semantic landmarks. | Inspect affected source or accessibility tree and rendered heading hierarchy. |
| 504 | Affected | Agent | Controls have accessible names, states, and roles that match their behavior; links navigate and buttons perform actions. | Inspect the accessibility tree and exercise affected controls. |
| 505 | Affected | Agent | Meaningful images have useful alternative text; decorative images are ignored by assistive technology; live text is not flattened into images. | Inspect affected markup, accessible names, and rendered content. |
| 506 | Affected | Agent | Form fields have persistent labels, understandable instructions, accessible validation, and errors that identify how to recover. | Inspect and exercise affected forms using keyboard and accessibility-tree output. |
| 507 | Affected | Agent | Text, interactive states, and meaningful graphical elements retain sufficient contrast. Color is not the sole carrier of meaning. | Measure affected color pairs with an appropriate contrast tool and inspect non-color cues. |
| 508 | Affected | Agent | Skip navigation and other bypass mechanisms continue to reach the intended main content. | Activate each affected bypass control by keyboard on built pages. |

## Build and technical integrity

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 601 | Global | Agent | The Cloudflare production build for `main` completes without errors using its production-managed build variables. | Confirm the successful Cloudflare build associated with the pushed `main` commit and spot-check the affected public route. Local verification uses `pnpm check` and `pnpm build:test`; a local `pnpm build` may require production-only public build variables. |
| 602 | Global | Agent | Only files within the requested scope changed, and no build artifacts, local secrets, temporary files, or unrelated formatting changes were introduced. | Inspect `git status --short` and the final diff; distinguish pre-existing user changes from task changes. |
| 603 | Affected | Agent | Every added or changed internal route builds and loads directly, not only through client-side navigation. | Open each affected route directly from built or preview output and verify the expected status and content. |
| 604 | Affected | Agent | Affected pages produce no new runtime exceptions, failed local resource requests, or invalid asset references. | Inspect the browser console and network results while loading and exercising affected pages. |
| 605 | Affected | Agent | Metadata, canonical URLs, indexing directives, and social preview data remain accurate for the affected page and environment. | Inspect affected built `<head>` output and referenced assets. |
| 606 | Affected | Agent | Changed dependencies, configuration, and scripts are necessary, reproducible, and compatible with the repository's declared runtime. | Inspect manifest and lockfile diffs, then run the relevant command with the declared runtime. |

## Homepage

| Item | Class | Verifier | Acceptance condition | Verification |
| --- | --- | --- | --- | --- |
| 701 | Affected | Agent | The homepage quickly establishes 3Back as The Team Execution Company and describes organizational execution, not generic transformation or training. | Inspect the rendered title, hero, opening copy, and primary hierarchy whenever the homepage or sitewide brand shell changes. |
| 702 | Affected | Agent | The homepage presents weak or misplaced boundaries as a possible mechanism disconnecting demand, decisions, work, and results without claiming it is the universal cause of complexity. | Compare affected problem framing with `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md` and the homepage blueprint. |
| 703 | Affected | Agent | The homepage defines Operational Grip as the current lead lens and keeps 3Back as the enduring brand. | Inspect affected hero, Operational Grip section, navigation, body-of-work section, metadata, and calls to action. |
| 704 | Affected | Agent | The homepage connects execution from demand through organizational response, delivered value, market acceptance, and revenue without promising revenue. | Inspect affected copy and diagrams for the complete relationship and bounded claim. |
| 705 | Affected | Agent | The homepage explains an evidence-first approach centered on one bounded problem, one decision, one accountable owner, and one observable result. | Inspect affected approach and evidence sections against governing sources. |
| 706 | Affected | Agent | The homepage offers a clear primary action to start a conversation and a secondary path to inspect substantive thinking or Operational Grip. | Inspect and activate affected hero, ideas, and closing actions. |
| 707 | Affected | Agent | Homepage section order supports an executive scan from problem, through lens and commercial relevance, to approach, evidence, deeper thinking, and action. | Review affected page hierarchy at desktop and mobile widths against the homepage blueprint. |
| 708 | Affected | Agent | The homepage uses one H1 and live, selectable text for headings, navigation, and explanatory diagrams. | Inspect affected DOM and rendered selection behavior. |

## Additional page-specific sections

No other published page-specific baseline has been approved. Add a new page-specific condition only through the approval process in item 005, using an unused number from 800 through 899. Until then, verify additional pages with the applicable global and affected-area conditions above.

## Human visual and executive review

These checks are never agent-passed. Run them when affected and report each applicable item as pending.

| Item | Class | Verifier | Acceptance condition | Review prompt |
| --- | --- | --- | --- | --- |
| 901 | Affected | Human | Final visual quality is polished, coherent, restrained, and credible across desktop and mobile. | Review affected pages at representative desktop and mobile widths, including hierarchy, spacing, typography, imagery, and finish. |
| 902 | Affected | Human | The message is credible, appropriately bounded, and sounds like 3Back. | Review affected outward-facing copy in full context, not as isolated strings. |
| 903 | Affected | Human | The result is relevant to executive and operational leaders without excluding practitioners who need the material. | Review the affected hierarchy, examples, proof, and calls to action from the primary audience's perspective. |
| 904 | Affected | Human | Brand expression conveys quiet authority, operational depth, commercial grounding, and a bias toward action without resembling a training company, conventional consultancy, software startup, academic institute, or aggressive industrial brand. | Review the complete affected experience and compare it with `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md`. |
| 905 | Affected | Human | Any new or materially changed case evidence, photography, illustration, humor, or sensitive claim is suitable and approved for publication. | Confirm factual permission, editorial judgment, tone, and contextual fit. |
