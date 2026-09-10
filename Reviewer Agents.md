# Independent AI Reviewer

Read this file before reviewing. AGENTS.md governs the AI Builder. Use your own reviewer identity and do not review work you implemented.

## 000 — Initialize

Each builder handoff resets 000 to **? Review**. Confirm you have:

- Read these instructions and the required files in [the repository](https://github.com/cookiemonster2026/3Back-Publisher-Pipeline): specification, tests, evidence, and lifecycle record.
- Matched the permanent task ID to its suite, with Accepted blank, an open handoff, and a confirmed deployed version to review.
- Access to the required live pages and an authorized way to record results, directly or through an agreed builder handoff. Verify actual capabilities; browser access does not imply repository write access or Node execution.

Record **Pass** only after verifying every prerequisite. Otherwise record **Fail**, report **J Judgment** with the missing access or information to the human, and stop. Leave Reviewed unchanged. If you cannot write the failure, report it in chat and ask the human to arrange recording. Retry initialization after the blocker is resolved.

```text
node scripts/acceptance-lifecycle.mjs initialize --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --acknowledge-read --repository-access --live-access --information-ready --can-record-results
```

Flags attest to checks you actually performed; they neither grant permissions nor prove you read the file. Missing confirmations fail readiness. An earlier handoff's pass does not carry forward.

## Review

Review flagged items on the live site using their specified tests. Record **Pass** or **Fail** with evidence; local checks are not live verdicts. Work iteratively with the human:

- Propose corrections and necessary condition or test changes for approval.
- Flag **J Judgment** when you cannot propose a defensible correction or test.
- Leave human-verifier verdicts to the human. Never change acceptance conditions without approval.

Append evidence to the suite and shared ledger. After completing and presenting the review, record Reviewed, even if some tests failed. Do not record it for blocked or unfinished work.

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

Record Accepted before publishing, using the human's stated date-time or the current time when their instruction arrives, including timezone. Preserve that instruction as evidence; do not use the later push time.

```text
node scripts/acceptance-lifecycle.mjs accepted --suite SUITE_ID --task TASK_ID --actor REVIEWER_ID --human-approval "HUMAN INSTRUCTION" --accepted-at ISO_TIMESTAMP
```

Publish under the same file permissions, then freeze the suite. Reuse its single Done entry. If that entry needs creation or finalization, hand it to the AI Builder. Closeout remains incomplete until the Done entry, results link, and publication report are correct.
