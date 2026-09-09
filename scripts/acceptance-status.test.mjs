import assert from "node:assert/strict";
import test from "node:test";
import { acceptanceStatus } from "../src/lib/acceptance-status.mjs";

const table = '<table><thead><tr><th>Item</th><th>Class</th><th>Verifier</th><th>Acceptance condition</th><th>Verification</th></tr></thead><tbody><tr><td>701</td><td>Affected</td><td>Agent</td><td>Homepage condition</td><td>Inspect live homepage</td></tr><tr><td>901</td><td>Affected</td><td>Human</td><td>Visual condition</td><td>Human review</td></tr></tbody></table>';
const record = { item: "701", condition: "Homepage condition", status: "passed", environment: "production", url: "https://3back.com/", checkedAt: "2026-09-09T18:00:00Z", reviewer: "Test reviewer", reviewerType: "agent", evidence: "Synthetic test evidence; never published." };

test("missing results are blue and stay in the denominator", () => {
  const result = acceptanceStatus(table, []);
  assert.deepEqual(result.counts, { passed: 0, failed: 0, unverified: 2, total: 2 });
  assert.equal(result.applicable, 2);
  assert.equal((result.html.match(/data-acceptance-status="unverified"/g) || []).length, 2);
});

test("newest evidence wins without altering the audit records", () => {
  const records = [{ ...record, status: "failed", checkedAt: "2026-09-09T18:01:00Z" }, record];
  const before = JSON.stringify(records);
  const result = acceptanceStatus(table, records);
  assert.equal(result.counts.failed, 1);
  assert.equal(result.counts.passed, 0);
  assert.equal(JSON.stringify(records), before);
});

test("human-review items cannot be passed by an agent", () => {
  const human = { ...record, item: "901", condition: "Visual condition" };
  assert.equal(acceptanceStatus(table, [human]).counts.passed, 0);
  assert.equal(acceptanceStatus(table, [{ ...human, reviewerType: "human" }]).counts.passed, 1);
});

test("changed conditions require a fresh check", () => {
  assert.equal(acceptanceStatus(table, [{ ...record, condition: "Old condition" }]).counts.unverified, 2);
});

test("local checks, unknown items and future results are rejected", () => {
  assert.throws(() => acceptanceStatus(table, [{ ...record, environment: "test" }]));
  assert.throws(() => acceptanceStatus(table, [{ ...record, url: "http://localhost:4321/" }]));
  assert.throws(() => acceptanceStatus(table, [{ ...record, item: "999" }]));
  assert.throws(() => acceptanceStatus(table, [{ ...record, checkedAt: "2999-01-01T00:00:00Z" }]));
});

test("one symbol per row, accessible evidence, and no extra row copy", () => {
  const result = acceptanceStatus(table, [{ ...record, evidence: '<script>alert("test")</script>' }]);
  const cells = [...result.html.matchAll(/<td class="acceptance-current-status"[\s\S]*?<\/td>/g)].map(m => m[0]);
  assert.deepEqual(cells.map(cell => cell.replace(/<[^>]*>/g, "")), ["✓", "?"]);
  assert.ok(result.html.includes("aria-label="));
  assert.ok(!result.html.includes("<script>"));
  assert.equal(result.html.replace('<th scope="col" class="acceptance-status-heading">Current Status</th>', '').replace(/<td class="acceptance-current-status"[\s\S]*?<\/td>/g, ""), table);
});
