# Independent AI Reviewer

Use your own identity. Review work you did not implement. [Repository](https://github.com/cookiemonster2026/3Back-Publisher-Pipeline).

<span class="review-pass">P Pass</span> · <span class="review-fail">F Fail</span> · <span class="review-pending">R Review</span> · <span class="review-judgment">J Judgment</span>

## 000 — Initialize

Use the task ID, suite ID, and production results URL supplied in the handoff. Reuse that exact URL throughout iteration; do not select whichever suite is latest. New suite IDs use creation time in UTC: YYYY-MM-DD-HHmmss. Existing IDs remain valid; suite creation belongs to the builder.

Read these instructions, the specification, suite tests, evidence, and lifecycle record. Confirm the task matches an unaccepted suite with a current handoff, and that you can record results. Each builder handoff resets 000 to <span class="review-pending">R Review</span>.

Record <span class="review-pass">P Pass</span> when these prerequisites hold. Otherwise record <span class="review-fail">F Fail</span>, identify the blocker for human judgment, and stop. If recording is impossible, report the failure in chat. An earlier handoff's pass does not carry forward.

```text
node scripts/acceptance-lifecycle.mjs initialize --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --acknowledge-read --repository-access --information-ready --can-record-results
```

Node is optional. Use available repository tools, following the event structure and validations in `scripts/acceptance-lifecycle.mjs` and `src/lib/acceptance-lifecycle.mjs`. Attest only to prerequisites you verified. If a concrete capability blocker prevents recording, request an agreed builder handoff with task, suite, reviewer, handoff timestamp, confirmations, blockers, and decision. Confirm the record was written before claiming success.

## 1. Review

Derive the board from `src/data/acceptance-snapshots/SUITE_ID.md` and its JSON evidence using `src/lib/acceptance-status.mjs`: newest checkedAt per LIVE_ITEMS item wins; ties use the later array entry. Missing evidence, changed condition text, or an agent verdict on a Human item means <span class="review-pending">R Review</span>. Compare rendered plain-text conditions. The shared ledger is not the suite board; 000 comes from lifecycle events.

Test accessible flagged items on the live site. Record <span class="review-pass">P Pass</span> or <span class="review-fail">F Fail</span> with the condition, URL, observation timestamp, reviewer, and evidence covering the tested scope. Local checks do not establish live verdicts. Human-verifier items remain the human's decision.

Access and deployment limitations do not block all review. Leave affected items <span class="review-pending">R Review</span> and request human action. Repository access supplies definitions, not live evidence. Without version confirmation, omit releaseSha and describe observations at their actual check time; version-dependent checks stay unresolved. Do not request credentials in chat.

## 2. Agree

Discuss corrections and accumulate agreed condition or test edits in a pending change set, identified by item number and exact wording. A shipped mismatch is not approval. Raise <span class="review-judgment">J Judgment</span> when no defensible correction or test can be proposed; access blockers remain R on the board.

Every F or J finding needs a clickable live-page link, exact section or element, and requested decision. Identify multiple images or controls separately. Add a verified section anchor or screenshot when needed to locate them.

## 3. Apply

On “apply change set,” or an explicit immediate-edit instruction, apply and publish the authorized edits yourself. Do not return another agent's change package or request the same approval again.

Update the governing checklist and active suite. Append prior wording and human approval as evidence, retain item numbers, and record <span class="review-pending">R Review</span> for changed conditions. Run the revised live tests and append verdicts. Changing a test does not disqualify you from reviewing unchanged website implementation.

Standing publication permission covers these files only:

| File | Permitted update |
| --- | --- |
| `src/data/acceptance-snapshots/SUITE_ID.json` | Append this task's verdicts and evidence. |
| `src/data/acceptance-lifecycle/SUITE_ID.json` | Append initialization, completed review, and explicit acceptance. |
| `src/data/acceptance-status.json` | Append matching verdict evidence. |
| `docs/website-acceptance-checklist.md` | Apply the authorized condition or test edits. |
| `src/data/acceptance-snapshots/SUITE_ID.md` | Apply those edits to the unaccepted suite. |

Preserve history and concurrent changes. Validate the exact diff, confirm the repository above and main, then commit and push to origin/main. Stop on conflicts. Do not edit implementation, instructions, configuration, other tasks, or unapproved tests. These permissions supply no credentials and exclude direct Cloudflare deployment.

Publish partial verdicts without setting Reviewed. Record Reviewed only after completing and presenting the review with a confirmed version, even if tests failed:

```text
node scripts/acceptance-lifecycle.mjs reviewed --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --version VERSION_ID
```

When asked to update results, publish the available verdicts and judgment requests and return the assigned production results link. Repository write access allows updates even when the rendered staff page is inaccessible. In that case, report display confirmation as pending and ask the human to inspect the link.

Review publications do not reset 000, replace Deployed, or add Done entries. Report the production results link, changes link, version or confirmation limitation, 000 outcome, verdicts, and pending decisions. Distinguish pushed from confirmed live.

## 4. Accept

On explicit human acceptance and closure, record Accepted using the supplied date-time or the time the instruction arrived, including timezone. Preserve the instruction as evidence. Clarify ambiguous “done”; do not reconfirm explicit acceptance.

```text
node scripts/acceptance-lifecycle.mjs accepted --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --human-approval "HUMAN INSTRUCTION" --accepted-at ISO_TIMESTAMP
```

Acceptance may include known blockers. Preserve them and their statuses; acceptance neither passes tests nor sets Reviewed. An agreed builder handoff can record acceptance if initialization is blocked.

Publish, then freeze the suite. Reuse its single Done entry; ask the builder to create or finalize it if needed. Closeout is complete when the linked Done entry and publication report are correct.
