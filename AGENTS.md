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

Housekeeping tripwires run at build. Open suite JSON and `acceptance-status.json` must stay under 200 KB. A single write must not append 162 records. Accepted suites are immutable. Weekly regression ids are `weekly-YYYY-MM-DD`. Run Sunday only after an accepted increment. No increment, no suite, no mail. The builder does not run the Sunday review and must not write 54 unchanged greens into a weekly suite. `/docs/acceptance-testing/` shows Recent, Weekly regression, and the standing weekly note. Recent is the latest non-superseded suite. An unaccepted suite beats an older accepted suite. Do not print Deployed on that chip. The results list is Acceptance Results, not Archive. Accepted rows append (Accepted) after the Chicago date. The suite heading is the increment description only. Do not print Done. Accepted or Not accepted is the finished state. Weekly mail subject is Weekly regression. Week result. plus the Chicago date-time. Mailbox is weeklyregression@3back.com.

The Current Status column and composite on `/docs/acceptance-testing/` report live-site verification for the 54 live items only. Checks cover surfaces, not pages. This board is not a pure Boolean suite. Builders infer. Reviewers infer. The symbols are where inference stops. Never use local builds, local previews, source inspection, or inferred deployment success to mark an item green or red.

Green means the live surface passed a known condition. Red means it failed. Blue R means a known condition needs a live look. Burnt orange J means a human decision is needed to proceed. J is not a pass, not a fail, and not a substitute for looking. Count the 54 live items only. Count only green in the passed numerator. Blue and J count in the total. Process items 001, 002, 003, 004, 005, 006, 602, and 606 stay in the checklist and are reported in the task report. They do not take a live color.

Last checked is the newest green or red live-item timestamp. Blue and J do not move it.

The builder may mark R but may not assign P, F, or J to its own implementation. The independent reviewer uses live evidence for P or F; a clear mismatch is F, not J. Without confirmed release identity, describe observations without claiming a release SHA. R means active investigation, not a final parking state. For every R, attempt the specified test or a defensible verification method. Record P or F when evidence supports it. Otherwise propose a concrete next action or an exact condition and test change for human approval. If human judgment is needed to proceed, record J with the blocker, attempted approaches, proposal if available, and decision requested. Never change a condition merely to manufacture a pass; approval authorizes a change, while verification establishes P. Human items 901–905 require the human for P or F.

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

The results header shows Created, Last published, and Accepted state. Builder deployed is not a header clock. A website release still matters for review, but the heading does not print it. Verdict-only commits update Last published through stored timestamps.

For future completed work, associate its acceptance snapshot with the milestone using the exact completion timestamp in acceptance-snapshots.js. Use the milestone description as the snapshot description. The backlog renders that description as a link to its results page. Preserve existing milestones and snapshots; do not invent results or push dates for older entries. Show push and review dates to readers, without commit identifiers.

Acceptance snapshot milestone dates: Display the approximate release-prepared timestamp as Deployed (agreed happy-path convention), retain any separately confirmed deployment event, record reviewedAt when the independent reviewer completes review, and acceptedAt when the human explicitly accepts the results. Capture the actual event time as an ISO timestamp. Do not infer deployment from a push, or completed review from individual test timestamps. Leave unavailable dates null (displayed as Not Recorded). Preserve historical metadata and evidence. These fields are populated by the agent workflow, not a background event listener.

Use one permanent results ID for each task. Reuse that record and URL through all iterative pushes and reviews; preserve its evidence history by appending records. A push does not create a Done entry. Only explicit task closure finalizes the work description and creates or finalizes its single linked Done entry. If an entry was already created for the active task, reuse it rather than adding another. At closure, freeze the suite and results together. Preserve finalized records; later tasks receive new IDs. Every push handoff must include the production URL for that work's acceptance results, the GitHub changes link, and whether production deployment was verified or remains pending. A successful push alone is not deployment evidence.

The governing acceptance page shows one Recent link using the latest non-superseded suite timestamp. It uses the same date as the results page. Acceptance Results lists one canonical suite per task; consolidated legacy snapshots remain accessible as Earlier evidence, not duplicate results entries.

## Builder and reviewer startup

An agent acting as Independent AI Reviewer must first read Reviewer Agents.md and follow 000 — Initialize. Never treat the builder's test run as reviewer acknowledgment. A fresh builder reads this file and locates the lifecycle JSON by permanent task ID, not by the most recent date. Reuse its unaccepted suite through iterative pushes. If absent, create its suite, evidence file, and lifecycle JSON with taskId, suiteId, builder identity, and an empty events array. Accepted suites are immutable; new work gets a new permanent ID. Do not create additional Done entries during iteration.

At every reviewer handoff, run node scripts/acceptance-lifecycle.mjs handoff --suite SUITE_ID --task TASK_ID --actor BUILDER_ID. This appends history and resets visible 000 to R. Never self-pass 000 as builder. Reviewed and Accepted are not set by a handoff or push.

Release trigger: "commit to main and push to origin" requests the complete release workflow. First acknowledge: "I will record the approximate release timestamp, commit to main, push to origin, attempt deployment confirmation, and report complete or incomplete."

Immediately before the release commit, run node scripts/acceptance-lifecycle.mjs prepare-release --suite SUITE_ID --task TASK_ID --actor BUILDER_ID. This appends the actual current time as the agreed approximate Deployed timestamp so it ships in the same push. Do not fabricate a confirmed-deployment event. Reset 000 with the handoff command when handing to a reviewer. Push, wait for Cloudflare, and attempt to confirm the release. If accessible, the deployed command can retain exact confirmation separately; the displayed approximate time does not require a second push. If blocked or failed, report Release incomplete and identify the provisional timestamp and next action. Return the production results URL and changes link. Never label an unconfirmed release complete. This rule supersedes the earlier exact-timestamp requirement; no runtime storage or second metadata push is required for the displayed date.

Only explicit human acceptance and task closure authorize the accepted command with --human-approval containing that instruction. Finalize the existing single Done entry or append it if none exists. Preserve all earlier deployment, review, initialization, acceptance evidence, and finalized work.

## Required reviewer handoff prompt

Attempt deployment confirmation, then append handoff. Missing confirmation does not block review of accessible surfaces. Reviewer 000 checks instructions, suite identification, independence, information, and a recording path. Assess access per item; investigate blocked or version-dependent items and record J when human judgment is needed to proceed. Unconfirmed observations must not claim a release SHA. Partial review leaves Reviewed unchanged. Never invent confirmation.

For a browser reviewer without Node, accept a human-relayed recording request containing task, suite, current handoff, reviewer identity, prerequisite attestations, and evidence. Run the lifecycle command with only the reviewer's attested flags and identity; return its recorded outcome. Never self-pass their review. Failed initialization records Fail and exits nonzero. Use reviewer-only publication rules for these records, without release preparation or handoff reset. Supply a board listing derived from the suite Markdown and JSON through acceptance-status.mjs when requested; source data identifies tests but does not prove live behavior.

The human may explicitly accept and close with known blockers. Preserve those blockers in humanApproval, retain their statuses, leave unfinished Reviewed unset, and record Accepted. Acceptance is not verification. Reuse the single Done entry and preserve history.

After every push report, provide a separate fenced text block containing only a copyable Verify acceptance prompt. Replace the production results URL, SUITE_ID, and TASK_ID with the actual current task values. Keep release status and change links outside that block. Use:

Verify acceptance for PRODUCTION_RESULTS_URL.
Act as the Independent AI Reviewer. Read https://3back.com/docs/reviewer-agents/ and follow its instructions, beginning with 000 — Initialize. Task: TASK_ID. Suite: SUITE_ID. Confirm access, information, permissions, and readiness; return blockers to me for judgment. Review flagged items on the live site, record Pass or Fail with evidence, and work with me on proposed corrections. You may commit and push only the review records authorized by Reviewer Agents.md. Record Reviewed after completing review. Continue iterating on this suite. When I explicitly accept the results and close the task, record my acceptance date-time, publish it, and finalize closeout according to those instructions.

The reviewer has standing authorization to publish only the task's review evidence, lifecycle records, and append-only shared verdict ledger as specified in Reviewer Agents.md. Do not apply the builder release-preparation or handoff-reset steps to those review-only publications. Those would invalidate the review being published. Acceptance is a separate explicit human instruction and is recorded before the acceptance publication.

Reviewer execution: a reviewer with repository write access performs authorized updates directly; Node is not mandatory when the same event validations can be followed through repository tools. Use builder recording only for a concrete capability blocker and agreed handoff. Accumulate agreed condition or test edits in a pending change set while iterating with the human. Apply only when the human says to apply the change set or explicitly requests an immediate edit. That instruction authorizes the reviewer to edit and publish those exact changes in docs/website-acceptance-checklist.md and the active unaccepted suite Markdown, preserve prior wording and approval in appended evidence, mark R, and run the revised live test. These bounded review publications do not trigger builder release preparation or reset 000. Changing a test alone does not disqualify review of unchanged website implementation. Every F or J finding needs a clickable live link, precise element location, and requested human decision.

## Acceptance suite naming and links

For new suites, assign the permanent ID YYYY-MM-DD-HHmmss from the creation date and time in UTC, for example 2026-09-10-015207. Its production URL is https://3back.com/docs/acceptance-results/SUITE_ID/. Check for an existing ID before creation; if one exists for another task, use the next unused second. Store the assigned creation timestamp with timezone in suite metadata and use that same timestamp, labeled UTC, in the archive. This is the suite creation time, not a deployment or review time.

Reuse the assigned ID and URL throughout iteration. Do not rename an existing suite to adopt this convention, change its URL on each push, or select a suite merely because it is latest. Match the permanent task ID. Every reviewer handoff supplies that task ID, suite ID, and production results URL. Existing suites retain their URLs and history.

When the human requests a results update, the reviewer publishes authorized available verdicts and judgment requests and returns that exact production results URL. Access restrictions on the rendered staff page do not prevent repository updates. If the reviewer cannot inspect the published page, report display confirmation as pending and ask the human to inspect the link; leave partial Reviewed unset.

Human inspection requests: whenever asking the human to view something, provide a clickable link to the exact evidence, explain what to inspect, and name the requested decision. For visual evidence, show each image or labeled screenshot inline with its item and location. Do not make the human search the repository or page. If direct linking is unavailable, pair the page link with a labeled screenshot; disclose any inability to retrieve or display evidence. Apply this on the first presentation, not only to failed checks.

Reviewer report consistency: before reporting new verdicts as recorded, publish them to both the active suite evidence and shared ledger, including row-level J judgments, using the exact current suite condition. Do not leave judgment requests only in chat or defer verdict recording to an approved condition-change set. State recording/publication blockers and unconfirmed production display explicitly. Access blockers require investigation and a proposed path; record J when human judgment is needed to proceed.

For each item needing human attention, link directly to its row using the assigned production results URL followed by #ITEM_NUMBER (for example #708 or #000). Also provide the evidence link or inline image; the test-row link identifies the condition, not the visual evidence. Never invent a section anchor on an external evidence page.

Before publishing acceptance records, run node scripts/validate-acceptance-history.mjs against the freshly fetched origin/main (pass origin/main as its argument). It must pass before commit or push. This checks existing records for deletion, edits, or reordering. Never publish placeholder content or bypass the guard by changing scripts/acceptance-history-baseline.json. Validate complete JSON and the exact diff. If this environment cannot run the guard, stop publication and request a validated recording handoff. Normal builds also enforce the recovery baseline.
