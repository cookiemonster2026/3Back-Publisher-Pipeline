# Homepage verification and audit result

September 20, 2026. Local implementation, not a production release.

Verification: 221/221 local automated checks passed.
Failed items: none remaining in the completed local runs.
Unverified: deployment, independent live acceptance, unchanged live form submission integrations, and any future change after these runs.
Human review: 5 pending, standing items 901–905.
Result: Ready for local review. Not committed, pushed, deployed, or accepted.

## What the numbers mean

- 47 repository tests passed: retained acceptance/history/lifecycle/housekeeping/deployment tests, explicit retirement coverage, and eight new generated-homepage regressions.
- 174 browser checks passed: actual Google font loading, live production styling comparison, exact approved copy, action destinations, arrow grammar, diagram hover/focus/reduced motion, readable labels, output alignment and stacking, keyboard traversal, fragment clearance, mobile menus, footer variants, local console/resource checks, and ten widths from 320 to 1440px.
- `pnpm build:test` passed with zero Astro errors or warnings; test-mode sitemap omission is intentional.
- A local production-mode build passed, including SEO validation and sitemap generation. It used the publicly published Turnstile site key in a child process only. No environment file, secret key, form submission, or deployment was involved.
- History-preservation and housekeeping guards passed against HEAD. `git diff --check` passed. A freshly fetched origin/main guard remains required immediately before any future authorized commit/publication.
- The generated new results page contains 89 active standing rows, five visibly retired rows, nine increment rows, and the separate readiness row. Historical records and accepted suites remain unchanged.

These are developer verification results, not 221 standing-suite passes. The new nine-item increment remains R for independent live review. Existing standing evidence has not been restamped or rewritten.

## Production visual invariants confirmed

The comparison used the actual live 3back.com page, not inferred screenshot colors. Source Sans 3 loaded successfully. Palette and type tokens match, including amber `#D96B18`, text amber `#A84808`, paper `#F5F0E7`, reading surface `#FCFAF6`, charcoal `#1D2421`, and the existing weights and line-height roles.

Computed font family, size, weight, line height, tracking, color, and relevant control padding matched for the production descriptor, header button, navigation, footer headings/links, body, H1, and hero eyebrow at the comparison viewport. Shared `SiteLayout.astro` is unchanged. The homepage uses scoped composition rather than new global typography.

## Main audit findings

1. Prototype typography drift was real. Production display/heading tracking, weights, line heights, shared buttons, header and footer have been restored.
2. Earlier theory-only/old-hero and no-credibility locks were superseded by later explicit approvals. The package records this rather than pretending continuity.
3. The new primary CTA requires retiring the old Operational Grip-primary condition. The section-order requirements also need explicit replacement, not exceptions hidden in tests.
4. Arrows now have one grammar, including the closing button. They are not part of link underlines or accessible names.
5. Diagram text no longer becomes tiny when an SVG scales. Outcomes is centered over its circular dot; connector stays behind the box. Desktop pointer and keyboard effects match, while mobile is static and reduced motion disables movement.
6. All signal cards have equal padding. The label remains Four signals of Operational Grip, not a guaranteed success formula.
7. Shared header variants for Domain Guides and all existing course funnels, and the PO3 on-demand footer exception, have been checked and retained.

## Remaining review

Follow-up requested September 20: shrink only the diagram box around its existing text. Removed the responsive fixed width and minimum height; set content-width sizing with 12px padding. Labels remain 16px/800 with unchanged line height, wording, plus-sign styling, colors, and hover behavior. Targeted browser verification passed 17/17 checks at 1440, 768, 390, and 320px, including unchanged text styling, overflow, hover, and reduced motion. Desktop box changed from approximately 231 x 153px to 156 x 137px. Human visual review 901 remains pending. No new standing condition or live verdict was recorded.

Human visual/executive review, independent live acceptance, and deployment verification remain pending. Local browser evidence and the user-facing report are held in the task outputs. The original prototype on port 4173 remains untouched; implementation preview is on port 4321. No commit or push occurred.
