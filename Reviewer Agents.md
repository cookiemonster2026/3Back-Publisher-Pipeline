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

When the suite under review added increment tests, the results page and the first line of the review both say: New acceptance tests have been added to the acceptance testing suite. Then review those increment tests. Do not open with a 54-item census unless those live items were flagged R for this increment. This is standing behavior, not a one-off.

Node is optional. Use available repository tools, following the event structure and validations in `scripts/acceptance-lifecycle.mjs` and `src/lib/acceptance-lifecycle.mjs`. Attest only to prerequisites you verified. If a concrete capability blocker prevents recording, request an agreed builder handoff with task, suite, reviewer, handoff timestamp, confirmations, blockers, and decision. Confirm the record was written before claiming success.

## 1. Review

The results header does not print Reviewer reviewed. Record the `reviewed` lifecycle event at the end of a presented sweep so history exists. Last published updates from stored timestamps. Do not record Accepted unless Douglas explicitly accepts and closes.

Derive the board from `src/data/acceptance-snapshots/SUITE_ID.md` and its JSON evidence using `src/lib/acceptance-status.mjs`: newest checkedAt per LIVE_ITEMS item wins; ties use the later array entry. Missing evidence, changed condition text, or an agent verdict on a Human item means <span class="review-pending">R Review</span>. Compare rendered plain-text conditions. The shared ledger is not the suite board; 000 comes from lifecycle events.

Test accessible flagged items on the live site. Record <span class="review-pass">P Pass</span> or <span class="review-fail">F Fail</span> with the condition, URL, observation timestamp, reviewer, and evidence covering the tested scope. Local checks do not establish live verdicts. Human-verifier items remain the human's decision.

Access and deployment limitations do not block all review. Investigate alternatives for affected items; when progress requires a human decision, record <span class="review-judgment">J Judgment</span>. Repository access supplies definitions, not live evidence. Without version confirmation, omit releaseSha and describe observations at their actual check time; version-dependent checks require a proposed verification path or escalation to human judgment. Do not request credentials in chat.

## 2. Agree

Before presenting a review report, append and publish every newly assigned verdict, including J Judgment, to the active suite evidence and shared ledger. A row-level judgment request must appear as J in the suite, not only in chat. Use the suite's exact current condition so the renderer recognizes the record. Reporting a verdict is not a request to change its condition and need not wait for “apply change set.” If recording or publication is blocked, label the verdict pending publication; never imply it is recorded. If production display cannot be confirmed, distinguish the published record from the unconfirmed display. Access blockers become J when the reviewer needs a human decision to proceed.

Discuss corrections and accumulate agreed condition or test edits in a pending change set, identified by item number and exact wording. A shipped mismatch is not approval. R means active investigation, not a final parking state. For every R, attempt the specified test or a defensible verification method. Record P or F when evidence supports it. Otherwise propose a concrete next action or an exact condition and test change for human approval. If human judgment is needed to proceed, record J with the blocker, attempted approaches, proposal if available, and decision requested. Never change a condition merely to manufacture a pass; approval authorizes a change, while verification establishes P.

Whenever you ask the human to view or inspect anything, provide a clickable link to that exact evidence and state what to look at and what decision is needed. Do this on the first presentation, not only for F or J findings. Never send the human searching through the repository or hunting across a page. For visual findings, show the actual image or a screenshot inline, label it with the item number and location, and include a direct image or verified section link. Present multiple images separately. If no direct target exists, provide the page link plus a labeled screenshot that identifies the exact element. If you cannot retrieve or display the evidence, state the limitation rather than imply the page link is sufficient.

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

For each item needing human attention, link directly to its row using the assigned production results URL followed by #ITEM_NUMBER (for example #708 or #000). Also provide the evidence link or inline image; the test-row link identifies the condition, not the visual evidence. Never invent a section anchor on an external evidence page.

Before publishing acceptance records, run node scripts/validate-acceptance-history.mjs against the freshly fetched origin/main (pass origin/main as its argument). It must pass before commit or push. This checks existing records for deletion, edits, or reordering. Never publish placeholder content or bypass the guard by changing scripts/acceptance-history-baseline.json. Validate complete JSON and the exact diff. If this environment cannot run the guard, stop publication and request a validated recording handoff. Normal builds also enforce the recovery baseline.

## Sunday-night weekly regression

Sunday-night weekly regression is reviewer-only. The builder does not run it and does not seed weekly files.

Run only when at least one change suite was accepted since the last `weekly-YYYY-MM-DD` date. If none closed, do not create a weekly suite, do not restamp greens, and do not send mail.

When it does run, create suite id `weekly-YYYY-MM-DD` using the America/Chicago calendar date for that Sunday. Reuse that id if it already exists and is unaccepted. Do not reuse a change-task suite. Record only items whose live result changed, failed, or needs J. Do not write 54 unchanged greens. Do not edit an accepted change suite. Human items 901–905 stay human.

After that weekly suite is on `origin/main`, send one mail to `weeklyregression@3back.com`. Do not provision the mailbox. Do not add Resend or Worker code in this pass.

Subject, exact pattern:

Weekly regression. Week result. M/D/YYYY, h:mm AM/PM CDT

Use America/Chicago date-time of the weekly suite record. Example: `Weekly regression. Week result. 9/13/2026, 8:00 PM CDT`

Body: one sentence that the weekly regression ran, then the production results URL `https://3back.com/docs/acceptance-results/weekly-YYYY-MM-DD/`. No second archive. No PII.

If no weekly suite exists yet, `/docs/acceptance-testing/` prints `None yet. Runs Sunday only after an accepted increment.`
