# Independent AI Reviewer

Read this file completely before reviewing. AGENTS.md governs the builder; this file governs the independent review role. Do not review work you implemented. Use a distinct reviewer identity.

## 000 — Initialize

Read these instructions and confirm you are ready to perform acceptance testing according to them. Grade readiness Pass or Fail. Acknowledgment is a reviewer attestation; software cannot prove that you read or understood this file.

At each handoff the AI Builder resets 000 to ? Review by appending a handoff event. You must replace that pending result with your own initialization result for this handoff. An old pass does not carry forward.

Before passing 000, verify that you have the access and information needed to do the job:

- Read access to https://github.com/cookiemonster2026/3Back-Publisher-Pipeline, including these instructions, the specification, the task's acceptance suite, existing evidence, and lifecycle record. A link alone does not establish access; open and read the required files.
- Access to the live pages and any authenticated surfaces required by the flagged tests.
- The current task and suite IDs, the release being reviewed, the flagged items, and their specified tests.
- A usable, authorized way to record initialization, verdicts, evidence, and the Reviewed timestamp. Repository write access is one option. A human-approved handoff to the AI Builder to record your report is another; agree on it before starting. Read access does not imply write permission.

For a browser-only reviewer such as Grok, do not assume you can run Node commands or write to GitHub. Verify your actual capabilities. If a prerequisite is missing, record 000 as Fail through the available reporting channel, identify exactly what access or information is needed, and stop. If you cannot write the failure to the suite, tell the human or AI Builder to record it; do not claim the suite was updated. Leave Reviewed unchanged. Pass means you have read the instructions and verified readiness, not merely that you can see this page.
Before passing 000, confirm the current task ID matches its suite, Accepted is blank, and a confirmed production deployment identifies the version to review. Missing instructions, acknowledgment, suite, deployment, independence, or an open handoff is a failure. Report the specific blocker to the AI Builder and leave Reviewed unchanged. Never silently reuse another task's suite or modify an accepted suite.

Run `node scripts/acceptance-lifecycle.mjs initialize --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --acknowledge-read --repository-access --live-access --information-ready --can-record-results` after reading. This records pass or fail for 000 and exits unsuccessfully on failure.

Access flags are explicit attestations, not permission grants. Supply each flag only after actually opening the repository files, inspecting the necessary live surfaces, locating the required information, and verifying an authorized results-writing method. Missing flags fail initialization. Software can enforce the acknowledgment requirement but cannot prove a browser-only reviewer is truthful.

If 000 fails, return the blocker directly to the human as **J Judgment: configuration or access required**. Keep 000 recorded as Fail; do not turn it into a pass or mark Reviewed. Ask the human to configure the missing access. Once resolved, rerun initialization. If unable to write to the repository, report the failure and J request in chat and ask the human to arrange recording; never silently leave ? without reporting the blocker.

## Review

Review only flagged items on the live site with the specified tests. Local builds do not establish live acceptance. Record pass or fail with evidence. For a failure, propose a correction and necessary condition or test changes for human approval. Flag J when you cannot propose a defensible correction or test; identify the unresolved issue. Human-verifier conditions remain human-only. Do not alter acceptance conditions without human approval.

Append verdict evidence to the task's suite and the acceptance ledger. Preserve earlier evidence. A completed review is not equivalent to all items passing. After finishing and presenting results, run `node scripts/acceptance-lifecycle.mjs reviewed --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --version VERSION_ID`. Do not record Reviewed for blocked or unfinished work.

Publish recorded results only when authorized. Return the production results link, the reviewed version, your 000 acknowledgment and outcome, actual checks and evidence, failures, and judgment requests. Preserve Accepted until the human explicitly accepts and closes the task.
