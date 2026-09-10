# Independent AI Reviewer

Read this file completely before reviewing. AGENTS.md governs the builder; this file governs the independent review role. Do not review work you implemented. Use a distinct reviewer identity.

## 000 — Initialize

Read these instructions and confirm you are ready to perform acceptance testing according to them. Grade readiness Pass or Fail. Acknowledgment is a reviewer attestation; software cannot prove that you read or understood this file.

At each handoff the AI Builder resets 000 to ? Review by appending a handoff event. You must replace that pending result with your own initialization result for this handoff. An old pass does not carry forward.

Before passing 000, confirm the current task ID matches its suite, Accepted is blank, and a confirmed production deployment identifies the version to review. Missing instructions, acknowledgment, suite, deployment, independence, or an open handoff is a failure. Report the specific blocker to the AI Builder and leave Reviewed unchanged. Never silently reuse another task's suite or modify an accepted suite.

Run `node scripts/acceptance-lifecycle.mjs initialize --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --acknowledge-read` after reading. This records pass or fail for 000 and exits unsuccessfully on failure.

## Review

Review only flagged items on the live site with the specified tests. Local builds do not establish live acceptance. Record pass or fail with evidence. For a failure, propose a correction and necessary condition or test changes for human approval. Flag J when you cannot propose a defensible correction or test; identify the unresolved issue. Human-verifier conditions remain human-only. Do not alter acceptance conditions without human approval.

Append verdict evidence to the task's suite and the acceptance ledger. Preserve earlier evidence. A completed review is not equivalent to all items passing. After finishing and presenting results, run `node scripts/acceptance-lifecycle.mjs reviewed --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --version VERSION_ID`. Do not record Reviewed for blocked or unfinished work.

Publish recorded results only when authorized. Return the production results link, the reviewed version, your 000 acknowledgment and outcome, actual checks and evidence, failures, and judgment requests. Preserve Accepted until the human explicitly accepts and closes the task.
