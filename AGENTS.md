# Repository instructions

## Website change policy

These instructions apply to every change that could alter the website, including content, styling, navigation, routes, interactions, assets, accessibility, build behavior, or published output.

For every website change:

1. Read this file and `docs/website-acceptance-checklist.md` before making changes.
2. Identify the numbered acceptance conditions the requested change could affect before editing.
3. Read the complete `docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md` when the work affects outward-facing content, positioning, navigation, hierarchy, interaction, or visual design. Treat this Markdown file as the sole governing brand and design brief for outward-facing decisions. Do not read, convert, or render any DOCX version.
4. Make the smallest bounded change requested. Do not expand scope without explicit approval.
5. Run every affected checklist item and every checklist item designated as a global regression check.
6. Never claim that a check passed unless it was actually verified. A code inspection, build, browser test, and human judgment are different forms of evidence and are not interchangeable.
7. Report each failed or unverified check by checklist item number, requirement, observed failure or reason, and what the user should inspect.
8. Leave all human judgment checks pending for the user's review. Never mark them passed on the user's behalf.
9. Never weaken, remove, renumber, reuse, or rewrite an acceptance condition without the user's explicit approval.
10. If the work establishes a durable new requirement or reveals a missing safeguard, propose a checklist addition in the task report. Do not add it automatically.
11. Do not commit, push, or deploy unless explicitly instructed.

Checklist results belong in the task report, not in the baseline checklist. The number of checks run may vary because unrelated affected-only checks do not run.

## Recurring SEO workflow

Apply this workflow whenever creating or materially changing a public page:

1. Before editing, propose the page title, meta description, canonical path, indexability, Open Graph and social metadata, image alternative text, internal links, and appropriate structured data. Distinguish preserved approved language from new recommendations.
2. Pause for human approval of material language and SEO recommendations. Do not implement a recommendation merely because it is technically valid.
3. Implement only the approved recommendations. Preserve existing approved metadata descriptions unless a rewrite is explicitly approved.
4. Validate the production and test-environment technical output. Missing required metadata on a public page that is not explicitly declared as a stub is an error. An undeclared public route is never inferred to be a stub.
5. Treat explicitly declared stub pages as tracked SEO to-dos. Each stub must identify its missing work in the SEO metadata registry, emit `noindex, nofollow`, remain excluded from the sitemap, and appear in validation reporting as an intentional to-do rather than a build error.
6. When a stub is completed, obtain approval for its final language and SEO recommendations, change its status to complete, replace `noindex, nofollow` with the approved indexability setting, remove its missing-work list, and include it in the sitemap.

Only the explicit production-indexable build may emit production indexability, sitemap entries, structured data, or crawl-allowing robots rules. Development, dedicated test builds, and raw/default Astro builds must fail closed to `noindex, nofollow`; test robots rules must disallow crawling and must not advertise the production sitemap.

## Version control and release policy

- Verification failures and unverified checks do not prevent committing and pushing a source checkpoint to a feature branch when the user explicitly requests it.
- Report every failed and unverified check with the commit or push result using the established checklist format.
- Do not deploy or release when any required check fails. Source checkpoint synchronization is not deployment approval.
- Human-review items remain pending until the designated reviewer completes them.
- A normal Git commit or Git push does not require GitHub CLI. Use normal Git unless the user explicitly requests another workflow.
- Do not deploy directly to Cloudflare unless the user explicitly instructs you to deploy. Permission to commit or push does not authorize deployment.

After every website task, report verification in exactly this structure:

```text
Verification: [passed]/[checks run] passed

Failed:
- Checklist item [number]: [requirement]
  Observed failure: [specific description]
  What to inspect: [page, component, viewport, or behavior]

Unverified:
- Checklist item [number]: [requirement]
  Reason: [why it could not be verified]

Human review: [number] pending
Result: Ready for local review or Not ready
```

Omit the `Failed` or `Unverified` section when it is empty. Do not list individual passing checks unless requested. Use `Ready for local review` only when no Codex-verifiable check failed or remains unverified. Human-review items may remain pending with that result.

## Development

When starting the dev server, use background mode:

```text
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Brand and Outward-Facing Work

For all outward-facing 3Back content and design work, read and apply:

- [3Back Minimum Viable Brand and Design Brief v0.1](docs/brand/source/3Back-Minimum-Viable-Brand-and-Design-Brief-v0.1.md)

Use Operational Grip source materials for conceptual accuracy. Use the brand brief to control outward-facing positioning, audience, voice, language, and visual expression.

The brand brief does not govern the internal development of Operational Grip.
