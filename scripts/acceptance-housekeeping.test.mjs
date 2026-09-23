import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { resolve } from "node:path";
import { LIVE_ITEMS, PROCESS_ITEMS, RETIRED_ITEMS } from "../src/lib/acceptance-status.mjs";
import {
  assertAppendLimit,
  assertChecklistLiveItems,
  assertFrozenSuitesUnchanged,
  assertNoWeeklyRestamp,
  assertOpenFileSizes,
} from "./validate-acceptance-housekeeping.mjs";

test("rejects checklist ids missing from the acceptance classifications", () => {
  assert.throws(() => assertChecklistLiveItems("| 836 | Affected | Agent | Test | Test |\n| 837 | Affected | Agent | Test | Test |", LIVE_ITEMS, PROCESS_ITEMS, RETIRED_ITEMS), /Checklist contains 836, 837, but LIVE_ITEMS does not\./);
  const currentChecklist = fs.readFileSync(resolve(import.meta.dirname, "../docs/website-acceptance-checklist.md"), "utf8");
  assert.doesNotThrow(() => assertChecklistLiveItems(currentChecklist, LIVE_ITEMS, PROCESS_ITEMS, RETIRED_ITEMS));
});

test("caps the shared ledger and open suite files at 512 KB", () => {
  assert.doesNotThrow(() => assertOpenFileSizes([{ path: "open.json", size: 524288, accepted: false }]));
  assert.throws(() => assertOpenFileSizes([{ path: "open.json", size: 524289, accepted: false }]), /exceed 512 KB/);
  assert.doesNotThrow(() => assertOpenFileSizes([{ path: "accepted.json", size: 600000, accepted: true }]));
});

test("rejects a 162-record append storm", () => {
  assert.doesNotThrow(() => assertAppendLimit(Array(161), [], "fixture"));
  assert.throws(() => assertAppendLimit(Array(162), [], "fixture"), /appended 162/);
});

test("rejects edits to every frozen suite file", () => {
  assert.doesNotThrow(() => assertFrozenSuitesUnchanged(["accepted"], ["src/other.js"]));
  for (const extension of ["json", "md"]) {
    assert.throws(() => assertFrozenSuitesUnchanged(["accepted"], [`src/data/acceptance-snapshots/accepted.${extension}`]), /immutable/);
  }
  assert.throws(() => assertFrozenSuitesUnchanged(["accepted"], ["src/data/acceptance-lifecycle/accepted.json"]), /immutable/);
});

test("rejects 60 unchanged greens in a weekly suite", () => {
  const checkedAt = "2026-09-11T12:00:00Z";
  const status = Array.from({ length: 60 }, (_, index) => ({ item: String(index), condition: `Condition ${index}`, status: "passed", checkedAt }));
  const weekly = status.map(record => ({ ...record }));
  assert.doesNotThrow(() => assertNoWeeklyRestamp(status, weekly.slice(0, 59), "fixture"));
  assert.throws(() => assertNoWeeklyRestamp(status, weekly, "fixture"), /60 unchanged passed records/);
  assert.doesNotThrow(() => assertNoWeeklyRestamp([...status, { ...status[0], status: "failed", checkedAt: "2026-09-11T13:00:00Z" }], weekly, "fixture"));
});
