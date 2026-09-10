# Independent AI Reviewer

Read this file before reviewing. AGENTS.md governs the AI Builder. Use your own reviewer identity and do not review work you implemented.

## 000 — Initialize

Each builder handoff resets 000 to <span class="review-pending">R Review</span>. Confirm you have:

- Read these instructions and the required files in [the repository](https://github.com/cookiemonster2026/3Back-Publisher-Pipeline): specification, tests, evidence, and lifecycle record.
- Matched the permanent task ID to its suite, with Accepted blank and an open handoff.
- An authorized way to record results, directly or through an agreed builder handoff. Verify actual capabilities; browser access does not imply repository write access or Node execution.

000 checks instructions, suite identification, independent identity, information, and a recording path. It does not certify access to every surface or deployment confirmation. Record <span class="review-pass">P Pass</span> only after verifying these prerequisites. Otherwise record <span class="review-fail">F Fail</span>, report <span class="review-judgment">J Judgment</span> with the missing access or information to the human, and stop. Leave Reviewed unchanged. If you cannot write the failure, report it in chat and ask the human to arrange recording. Retry initialization after the blocker is resolved.

```text
node scripts/acceptance-lifecycle.mjs initialize --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --acknowledge-read --repository-access --information-ready --can-record-results
```

Flags attest to checks you actually performed; they neither grant permissions nor prove you read the file. Missing confirmations fail readiness. An earlier handoff's pass does not carry forward.

### Browser reviewer handoff

Node is optional for the reviewer. If you cannot run the commands, send the human a recording request for the AI Builder: task and suite IDs, reviewer identity, handoff timestamp, each readiness confirmation or blocker, and your Pass/Fail decision. The builder runs the command with only your confirmed flags, preserves your identity and evidence, and returns the recorded outcome. Do not claim recording succeeded until confirmed. The builder records your decision; it does not self-pass your review.

Repository access can supply instructions and tests when staff docs require sign-in. It cannot replace access to a live surface a test examines. Ask the human to arrange access or perform the blocked check. Do not request credentials in chat. Blocked surfaces do not fail 000. Continue with accessible flagged items, leave blocked items <span class="review-pending">R Review</span>, and report <span class="review-judgment">J Judgment</span> to the human for access or acceptance. Do not change a blocked item to J merely because access is missing. Human acceptance of blockers is allowed under Accept and close.

## Review

Find the board in `src/data/acceptance-snapshots/SUITE_ID.md` (conditions and tests) and `src/data/acceptance-snapshots/SUITE_ID.json` (evidence). Follow `src/lib/acceptance-status.mjs`: for each LIVE_ITEMS entry, use the newest checkedAt record, with the later array entry winning ties. Missing evidence, a changed condition, or an agent verdict on a Human item means R Review; otherwise use the recorded status. Compare conditions as rendered plain text. The shared ledger is not the suite board. Item 000 comes separately from the lifecycle record. If unsure, request a builder-generated listing rather than guess.

Review accessible flagged items on the live site using their specified tests. When the deployed version is unconfirmed, identify evidence as an observation of the live URL at its check time, omit releaseSha, and do not claim a particular release was verified. Version-dependent checks remain <span class="review-pending">R Review</span>. Record <span class="review-pass">P Pass</span> or <span class="review-fail">F Fail</span> with evidence; local checks are not live verdicts. Work iteratively with the human:

- Propose corrections and necessary condition or test changes for approval.
- Flag <span class="review-judgment">J Judgment</span> when you cannot propose a defensible correction or test.
- Leave human-verifier verdicts to the human. Never change acceptance conditions without approval.

Append evidence to the suite and shared ledger. After completing and presenting the review, record Reviewed, even if some tests failed. Publish partial verdicts, but leave Reviewed unchanged while work is blocked or unfinished. The completed-review command still requires a confirmed version; never invent one.

```text
node scripts/acceptance-lifecycle.mjs reviewed --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --version VERSION_ID
```

## Publish

You have standing permission to commit and push review records to `main` on the repository above. Only these files are authorized:

| File | Permitted updates |
| --- | --- |
| `src/data/acceptance-snapshots/SUITE_ID.json` | Append this task's verdicts and evidence. |
| `src/data/acceptance-lifecycle/SUITE_ID.json` | Append initialization, completed review, and explicitly authorized acceptance events. |
| `src/data/acceptance-status.json` | Append the same verdict evidence to the shared ledger. |

Preserve existing records. Do not edit instructions, tests, implementation, configuration, or other tasks. Check the exact diff, validate it, verify origin and main, and push only permitted changes. Stop on conflicting updates rather than overwrite them. Permission here does not supply credentials or authorize direct Cloudflare deployment.

Review publications do not reset 000, replace Deployed, or create Done entries. Report the production results link, changes link, reviewed version, 000 outcome, checks, failures, and judgment requests. Distinguish a successful push from confirmed production display.

## Accept and close

Reuse the suite until the human explicitly accepts the results and closes the task. Clarify ambiguous “done”; do not reconfirm explicit acceptance and closure.

The human may explicitly accept with known blockers or unfinished checks. Preserve them in the acceptance evidence and retain their statuses. Acceptance does not pass 000 or any test, or create a Reviewed timestamp. The builder recording handoff may record acceptance even when initialization is blocked.

Record Accepted before publishing, using the human's stated date-time or the current time when their instruction arrives, including timezone. Preserve that instruction as evidence; do not use the later push time.

```text
node scripts/acceptance-lifecycle.mjs accepted --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --human-approval "HUMAN INSTRUCTION" --accepted-at ISO_TIMESTAMP
```

Publish under the same file permissions, then freeze the suite. Reuse its single Done entry. If that entry needs creation or finalization, hand it to the AI Builder. Closeout remains incomplete until the Done entry, results link, and publication report are correct.
