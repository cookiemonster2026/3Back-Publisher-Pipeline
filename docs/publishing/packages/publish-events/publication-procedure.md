# Publish Events procedure

Staff reading copy. Not a public page.

## What this is

The Events Schedule sheet is the working list. Event Coordinator controls which rows appear on `https://3back.com/events/`. Codex does not retype dates.

## How publication works

1. Trainer agrees with Event Coordinator on the event date or dates.
2. Event Coordinator enters those dates on the **EVENTS** tab of the Events Schedule sheet. Columns are Publish, Group By, Image / Badge Url, Course, Format, Start Day, End Day, Enrollment URL.
3. Event Coordinator checks **Publish** on every row that should appear on `3back.com/events`.
4. Event Coordinator chooses **Events → Publish Events**.
5. `ES_Script` reads only rows with Publish checked. `ES_Script` writes **Publish Preview**, inserts a dated block at the top of **Publish Log**, and sends a `publish-events` dispatch to GitHub.
6. If a required column is empty, or Enrollment URL does not start with `https://event.3back.com/`, `ES_Script` stops. Event Coordinator returns to step 3. `3back.com/events` does not change.
7. The GitHub Action checks `PUBLISH_EVENTS_SECRET`, writes only `src/data/events.mjs`, and commits that file when the content changed. Cloudflare builds `main`. `https://3back.com/events/` shows the checked rows only.

Unchecked rows stay on **EVENTS**. Those rows stay off the site until Event Coordinator checks Publish and publishes again.

The visitor request does not read Google. The page imports `src/data/events.mjs`.

## First live proof

2026-09-22: Event Coordinator unpublished Oct 20 and Oct 22–23. Four rows appeared on `https://3back.com/events/`. Event Coordinator checked those two rows and published again. All six rows returned.

## Secrets

`PUBLISH_EVENTS_SECRET` lives in the GitHub Actions secret and in Apps Script Script properties. Same value in both places.

`GITHUB_TOKEN` lives only in Apps Script Script properties. Not in a sheet cell. Not in `Code.gs`.
