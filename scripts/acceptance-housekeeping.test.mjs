import test from "node:test";
import assert from "node:assert/strict";
import {
  assertAppendLimit,
  assertFrozenSuitesUnchanged,
  assertNoWeeklyRestamp,
  assertOpenFileSizes,
} from "./validate-acceptance-housekeeping.mjs";

test("caps the shared ledger and open suite files at 200 KB", () => {
  assert.doesNotThrow(() => assertOpenFileSizes([{ path: "open.json", size: 204800, accepted: false }]));
  assert.throws(() => assertOpenFileSizes([{ path: "open.json", size: 204801, accepted: false }]), /exceed 200 KB/);
  assert.doesNotThrow(() => assertOpenFileSizes([{ path: "accepted.json", size: 400000, accepted: true }]));
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

test("rejects 54 unchanged greens in a weekly suite", () => {
  const checkedAt = "2026-09-11T12:00:00Z";
  const status = Array.from({ length: 54 }, (_, index) => ({ item: String(index), condition: `Condition ${index}`, status: "passed", checkedAt }));
  const weekly = status.map(record => ({ ...record }));
  assert.doesNotThrow(() => assertNoWeeklyRestamp(status, weekly.slice(0, 53), "fixture"));
  assert.throws(() => assertNoWeeklyRestamp(status, weekly, "fixture"), /54 unchanged passed records/);
  assert.doesNotThrow(() => assertNoWeeklyRestamp([...status, { ...status[0], status: "failed", checkedAt: "2026-09-11T13:00:00Z" }], weekly, "fixture"));
});
