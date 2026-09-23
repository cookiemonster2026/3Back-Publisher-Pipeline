# Accept closeout note

Staff reading copy. Not a public page.

## What shipped on 23 September 2026

Two staff tools.

accept-closeout records a missing release stamp and Accepted in one write. After that write the suite cannot take more lifecycle events. Optional standing mappings sit on the Accepted event only. They do not write the standing checklist.

Build housekeeping now fails early if the standing checklist contains an item number that is not classified. The message names the missing numbers. Example: Checklist contains 836, 837, but LIVE_ITEMS does not.

## What this Accept does not claim

The increment rows on this suite were not independently scored. They remain unverified. Accepted means Douglas closed the work. It does not mean each condition passed.

## What did not ship

Staff-document loading still uses an explicit file list. A new staff page still needs a STAFF_DOCS row. Cloudflare Access still blocks unattended deployment confirmation.

## What a human should look at

- This suite page should read Accepted.
- The increment table may still show R.
- https://3back.com/events/ is unchanged by this closeout.
- https://3back.com/operational-grip/ is unchanged by this closeout.
- Standing count stays 97. No new standing rows.

## Command

node scripts/acceptance-lifecycle.mjs accept-closeout --suite SUITE_ID --task TASK_ID --actor ACTOR --human-approval "TEXT" [--accepted-at ISO] [--standing-plus 004:831,006:832]
