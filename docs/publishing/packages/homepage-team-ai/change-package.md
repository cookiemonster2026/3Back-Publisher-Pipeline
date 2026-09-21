# Homepage replacement: bounded change package

Task: `01a0bba0-a8c0-73b3-866c-49c7ae602c95`
Baseline: `main` at `3ab7717cb9b2f981cd3e66e6851e2d726204e07d`.
State: Release authorized by Douglas. Independent review and human acceptance remain pending.

## Governing implementation

Use `docs/brand/source/3Back-Homepage-Content-Blueprint-v0.2.md` for the final conversation decisions. The static prototype is reference material, not a replacement design system. Shared `SiteLayout.astro` typography and colors remain unchanged. Homepage composition is scoped to `index.astro`; production shared header and footer are reused.

## Contradictions and silent changes resolved

| Finding | Disposition |
| --- | --- |
| Early lock retained the original hero pair and demoted conversion; later approved prototype uses the human-expertise/AI thesis and Check your grip primary action. | Later explicit decisions govern. Retire 706 and record the purpose/action delta at closeout. Do not claim the old lock remains unchanged. |
| Early argument review rejected a credibility band; later explicit discussion requested Why 3Back and existing credibility material. | Keep concise approved credibility, not the removed standalone lineage/body-of-work essay. |
| Prototype silently introduced larger/heavier display type, tighter tracking, different line heights, button padding, and a non-production shell. | Restore production tokens and shared shell; test rendered fonts, not only CSS declarations. New section geometry and large diagram labels are authorized composition, not new global type tokens. |
| Prototype graphics could shrink text with the SVG; hover had no keyboard equivalent. | Use live HTML labels over decorative lines, explicit readable text sizes, desktop keyboard parity, and static mobile/reduced-motion behavior. Keep the output connector behind the opaque box. |
| Arrow use was inconsistent, including the closing action. | Apply the approved engagement/information/in-page grammar to homepage body actions; preserve arrow-free site chrome. |
| First signal sat against the highlight edge. | Give all four cards the same internal padding. |
| Homepage-only shell copying could lose existing conversation-funnel destinations and the PO3 footer exception. | Reuse shared components and test all existing route variants. Homepage alone gets How to engage; inner navigation stays unchanged. |
| Static prototype header used a local conversation anchor. | Preserve the established production `/contact/` header destination, as required by the later production-header lock. The later-approved four Current Ideas cards replace the closing conversation. |
| Typography discussion did not authorize making every text role the same size. | Retain production lead, body, card, caption, and navigation roles. No blanket font-size equalization. |
| Standing suite required old homepage inventory and had a hard-coded denominator. | Preserve retired conditions and history, replace coverage explicitly, calculate current results without retired rows, and preserve legacy-row scoring. |

## Files and scope

- `src/pages/index.astro`: replacement homepage copy, composition, diagram, signals, engagement routes, credibility, four illustrated Current Ideas cards, scoped interactions.
- `src/components/SiteHeader.astro`: homepage navigation branch in desktop/mobile only. Production sizing, typography, script, and conversation-funnel logic retained.
- `src/components/SiteFooter.astro`: approved link regrouping and responsive five-group layout. Production type, colors, legal/social content, PO3 exception retained.
- `src/seo/registry.mjs`: approved Operational Grip body-definition constant only. Page titles, descriptions, canonical, schema and social metadata unchanged.
- Blueprint v0.2 and this package: exact replacement authority and proposed live-record delta.
- Checklist, acceptance surface map, status renderer and tests: new coverage and explicit retirement handling.
- New task suite and empty lifecycle: independent-review handoff target, not a live pass.
- `scripts/homepage.test.mjs`: generated-output regressions for copy, order, links, arrows, live labels, shell variants and metadata.

No dependency, global layout/style, route, form, redirect, accepted suite, or historical evidence changes. Standing live verdict records remain intact; new increment rows begin R. New standing rows have no fabricated verdict.

## Standing acceptance delta

- Retire 304 and 704–707, preserving original conditions and evidence. Numbering remains stable.
- Retain 101–108, 201–205, 301–303, 305–307, 321–324, 401–405, 501–508, 601–606, 701–703, 708, and all unaffected course/staff/human checks. Run applicable checks, not unrelated ones to inflate totals.
- Add 109 for production visual invariants, 308 for arrow grammar, 309 for shell variants, 709–715 for team-first AI/selection, domain expertise, signals, CTA routing, engagement routes, sequence, and diagram behavior.
- 703 keeps its condition; its inspection wording now references credibility rather than the removed body-of-work section.
- Current baseline: 89 active live conditions, eight process conditions, five explicitly retired conditions. Existing accepted suites remain immutable.
- Human review 901–905 remains pending. Agent measurements do not establish executive persuasion or final visual approval.

## Local verification and release boundary

Run `pnpm build:test`, then `node --test scripts/*.test.mjs` (enumerate script paths in PowerShell), history preservation, and housekeeping validation. Inspect rendered homepage and shared shell at 320, 390, 768, and 1440px plus breakpoints. Compare production font loading/computed styles, all action destinations, focus, mobile menu, hover, reduced motion, contrast, and console/network. Compare production-mode metadata and sitemap using a local production build. Do not submit live contact forms merely to test link routing.

Browser diagnostics are local evidence, not standing live verdicts. This package does not add a Playwright dependency or a new CI framework. Re-run build/tests after any further change. Before a future authorized commit, freshly fetch origin/main and run the history guard against it, inspect the complete diff, and follow the existing release lifecycle. Do not prepare a release or reset independent-review readiness until that workflow is authorized.

## Proposed Site Intent Map delta at Stage 8 closeout

Do not rewrite the live-state map before implementation is published and verified. At closeout, version the current map and update `/` only:

- Purpose: establish team execution in the AI era, explain the shift toward domain-guided selection, and offer bounded engagements without teaching the entire model.
- Primary action: Check your grip to `/grip-check/`. Secondary actions: engagement choices and Operational Grip explanation. Header conversation stays available.
- Sections: hero/selection card; Operational Grip/four signals; three engagement choices; concise Why 3Back; four Current Ideas cards/shared footer.
- Current Ideas presents the latest Tales strip, two available papers, and the books collection. Ideas remains available in the footer and inner-page navigation.
- Record the homepage header variant, shared footer regrouping, and scoped arrow grammar. Preserve unrelated route intents and funnel exceptions.

## Judgment to retain, not silently edit

The approved opening is categorical; a bounded service statement replaces the diagnostic question. They are positioning choices, not proven universal claims. Whether this strengthens executive response is a human judgment and later behavioral question, not an inference from passing tests. No unrequested copy-softening or brand claim has been introduced during this audit.
