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
- `pnpm deploy`, `wrangler deploy`, and equivalent direct Cloudflare deployment commands are prohibited unless Douglas explicitly authorizes a direct Cloudflare deployment for that specific task. Normal production publishing is `main` → GitHub `origin/main` → Cloudflare build.

## Task closeout milestones

Done history is cumulative. Preserve every existing milestone and the historical archive in `src/data/reconstructed-pushes.js`; add new milestones without replacing, truncating, or hiding earlier entries.

When Douglas asks to close a task or thread that produced a meaningful completed package, choose one accurate plain-English milestone description of ten words or fewer and record it as a matter of course. That closeout request authorizes only this sequence: inspect the working tree; append the description and completion timestamp to `src/data/deployment-milestones.js`; verify that every pre-existing milestone and archived history entry remains unchanged and visible in the built backlog, with the new milestone appearing exactly once; commit the already completed, user-approved task changes and that milestone in one commit; push that exact commit to `origin/main`; verify the working tree is clean; report what closed; and close the task. Make no cleanup, refactor, dependency, configuration, content, or other change during closeout. If unexpected uncommitted changes are present, stop, identify them, and ask Douglas whether to discard them; never discard them silently or close the task with a dirty working tree. If the required push cannot proceed without additional repository changes, stop and report. Do not add individual commits or pushes to the visible milestone history.

## Production publish (mandatory)

Production is only `main` on the real GitHub remote for this repository: `github.com/cookiemonster2026/3Back-Publisher-Pipeline` or its SSH equivalent.

Before any commit, push, or claim that work is on 3back.com, run and report:

- `git remote -v`
- `git branch --show-current`
- `git rev-parse HEAD`
- `git ls-remote origin refs/heads/main`

Stop and report. Do not push or say deployed if:

1. The current branch is not `main`.
2. `origin` is not the GitHub URL above. Path-style or local non-bare remotes are not production remotes.
3. You cannot confirm the commit SHA will be on GitHub `origin/main` after push.

Never treat a local folder remote, `updateInstead` mirror, or feature branch as production.

After push, do not claim “live on 3back.com” until the production URL shows the expected content. Spot-check the changed routes.

Branch checkouts are for local experiment only. The only publish path is: land on `main` → push to GitHub → Cloudflare build from `main`. Override only if Douglas explicitly authorizes it in writing for that task.

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

## Live acceptance status

The Current Status column and composite on `/docs/acceptance-checks/` report live-site verification for the 54 live items only. Checks cover surfaces, not pages. This board is not a pure Boolean suite. Builders infer. Reviewers infer. The symbols are where inference stops. Never use local builds, local previews, source inspection, or inferred deployment success to mark an item green or red.

Green means the live surface passed a known condition. Red means it failed. Blue question mark means a known condition needs a live look. Burnt orange J means the rule itself is not settled. J is not a pass, not a fail, and not a substitute for looking. Count the 54 live items only. Count only green in the passed numerator. Blue and J count in the total. Process items 001, 002, 003, 004, 005, 006, 602, and 606 stay in the checklist and are reported in the task report. They do not take a live color.

Last checked is the newest green or red live-item timestamp. Blue and J do not move it.

Who implemented a website change may only mark blue. They may not mark green, red, or J. Someone else pushing the same commit is not enough separation. An outside reviewer who did not implement the change marks green or red after confirming the expected git SHA is on 3back.com. That reviewer marks J only when the written condition cannot be executed because the governing rule is missing, conflicting, too ambiguous, or explicitly superseded. J requires one sentence naming the unknown. If the reviewer can apply the governing condition and reach a defensible verdict from available evidence, J is forbidden. A clear mismatch with a known condition is red, including items 706 and 108. J requires evidence that the governing rule is missing, conflicting, ambiguous, or superseded; implementation disagreement alone is not evidence that the rule should change. Access or evidence blockers remain blue. Douglas decides every J. Human items 901–905 require Douglas for green or red. They are not J merely because they are human.

In the release commit, before pushing to `origin/main`, the implementer appends blue records for live items the change could invalidate. Use `docs/publishing/acceptance-surface-map.md` as the starting point. Combine matching rows. Add any other live item the diff could invalidate, with a brief reason. Those blues mean recheck pending, not deployment confirmed. Do not blue every Global item. Do not blue items because `src/data/acceptance-status.json` changed. Do not rerun unaffected stored live verdicts. Do not census all routes.

Record results by appending to `src/data/acceptance-status.json`. Never replace history. Include item number, exact condition text, status, live URL, timestamp, reviewer, reviewer type, evidence, and when known `reason` and `releaseSha`. JSON status values are `passed`, `failed`, `unverified`, and `judgment`. Incident reports and external configuration changes can append targeted blue records without an application-code change. Never interpret silence, approval to commit, or approval to push as checklist acceptance.

Douglas resolves J by deciding or clarifying the rule. Record that decision in the governing condition or its interpretation, then return the item to blue for ordinary verification. Resolving a rule is not a green verdict. The implementer may commit records explicitly assigned by the outside reviewer or Douglas, but may not assign those verdicts on their own work.

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

### Done entries and acceptance results

For future completed work, associate its acceptance snapshot with the milestone using the exact completion timestamp in acceptance-snapshots.js. Use the milestone description as the snapshot description. The backlog renders that description as a link to its results page. Preserve existing milestones and snapshots; do not invent results or push dates for older entries. Show push and review dates to readers, without commit identifiers.

Acceptance snapshot milestone dates: Record deployedAt only after confirming the release in production, reviewedAt when the independent reviewer completes review, and acceptedAt when the human explicitly accepts the results. Capture the actual event time as an ISO timestamp. Do not infer deployment from a push, or completed review from individual test timestamps. Leave unavailable dates null (displayed as Not Recorded). Preserve historical metadata and evidence. These fields are populated by the agent workflow, not a background event listener.

Use one permanent results ID for each task. Reuse that record and URL through all iterative pushes and reviews; preserve its evidence history by appending records. A push does not create a Done entry. Only explicit task closure finalizes the work description and creates or finalizes its single linked Done entry. If an entry was already created for the active task, reuse it rather than adding another. At closure, freeze the suite and results together. Preserve finalized records; later tasks receive new IDs. Every push handoff must include the production URL for that work's acceptance results, the GitHub changes link, and whether production deployment was verified or remains pending. A successful push alone is not deployment evidence.

The governing acceptance page shows exactly one Recent result; Archive retains all snapshots. The newest result obtains deployedAt from Cloudflare deployment history matched to CF_VERSION_METADATA.id. This requires the existing CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN runtime bindings with deployment-read access. Never replace a missing API result with build time or browser time. Before a newer snapshot supersedes it, preserve the confirmed deployedAt in the prior snapshot metadata.

## Builder and reviewer startup

An agent acting as Independent AI Reviewer must first read Reviewer Agents.md and follow 000 — Initialize. Never treat the builder's test run as reviewer acknowledgment. A fresh builder reads this file and locates the lifecycle JSON by permanent task ID, not by the most recent date. Reuse its unaccepted suite through iterative pushes. If absent, create its suite, evidence file, and lifecycle JSON with taskId, suiteId, builder identity, and an empty events array. Accepted suites are immutable; new work gets a new permanent ID. Do not create additional Done entries during iteration.

At every reviewer handoff, run node scripts/acceptance-lifecycle.mjs handoff --suite SUITE_ID --task TASK_ID --actor BUILDER_ID. This appends history and resets visible 000 to ?. Never self-pass 000 as builder. Reviewed and Accepted are not set by a handoff or push.

Release finalization: Push the approved commit; wait for Cloudflare; run node scripts/acceptance-lifecycle.mjs deployed --suite SUITE_ID --task TASK_ID --actor BUILDER_ID. It fetches the production deployment endpoint, matches the suite and running version, and writes the confirmed deployed timestamp to the task record. Authentication may be supplied through THREEBACK_ACCESS_COOKIE without printing it. If blocked, report release incomplete and request access or human confirmation; do not substitute build or push time. Publish this metadata under the user's release authorization and confirm its date is visible on the production results page. Return that URL and the changes link. Do not repeat finalization indefinitely for a metadata-only publication: the recorded event identifies the work release being verified.

Only explicit human acceptance and task closure authorize the accepted command with --human-approval containing that instruction. Finalize the existing single Done entry or append it if none exists. Preserve all earlier deployment, review, initialization, acceptance evidence, and finalized work.
