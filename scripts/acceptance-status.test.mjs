import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { acceptanceStatus, LIVE_ITEMS, PROCESS_ITEMS } from "../src/lib/acceptance-status.mjs";

const table = '<table><thead><tr><th>Item</th><th>Class</th><th>Verifier</th><th>Acceptance condition</th><th>Verification</th></tr></thead><tbody><tr><td>701</td><td>Affected</td><td>Agent</td><td>Homepage condition</td><td>Inspect live homepage</td></tr><tr><td>901</td><td>Affected</td><td>Human</td><td>Visual condition</td><td>Human review</td></tr></tbody></table>';
const record = { item: "701", condition: "Homepage condition", status: "passed", environment: "production", url: "https://3back.com/", checkedAt: "2026-09-09T18:00:00Z", reviewer: "Test reviewer", reviewerType: "agent", evidence: "Synthetic test evidence; never published." };

test("missing results are blue and stay in the denominator", () => {
  const result = acceptanceStatus(table, []);
  assert.deepEqual(result.counts, { passed: 0, failed: 0, unverified: 2, judgment: 0, total: 2 });
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
  assert.deepEqual(cells.map(cell => cell.replace(/<[^>]*>/g, "")), ["P", "R"]);
  assert.ok(result.html.includes("aria-label="));
  assert.ok(result.html.includes('<thead><tr><th scope="col" class="acceptance-status-heading">Current Status</th><th>Item</th>'));
  assert.equal((result.html.match(/<tr data-acceptance-row="[^"]+"><td class="acceptance-current-status"/g) || []).length, 2);
  assert.ok(!result.html.includes("<script>"));
  assert.ok(!result.html.includes('<th>Class</th>'));
  assert.ok(result.html.includes('<th>Verifier</th>'));
  assert.equal(result.html.replace('<th scope="col" class="acceptance-status-heading">Current Status</th>', '').replace(/ data-acceptance-row="[^"]+"/g, '').replace(/<td class="acceptance-current-status"[\s\S]*?<\/td>/g, ""), table.replace('<th>Class</th>', '').replaceAll('<td>Affected</td>', ''));
});

const baseline = readFileSync(new URL('../docs/website-acceptance-checklist.md', import.meta.url), 'utf8');
const rows = baseline.split(/\r?\n/).filter(line => /^\| \d{3} \|/.test(line)).map(line => line.split('|').slice(1, -1).map(cell => cell.trim()));
const completeTable = '<table><thead><tr><th>Item</th><th>Class</th><th>Verifier</th><th>Acceptance condition</th><th>Verification</th></tr></thead><tbody>' + rows.map(cells => '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>').join('') + '</tbody></table>';

test('the complete baseline has exactly 54 live and eight process items', () => {
  assert.equal(LIVE_ITEMS.length, 54);
  assert.equal(PROCESS_ITEMS.length, 8);
  assert.deepEqual(new Set(rows.map(row => row[0])), new Set([...LIVE_ITEMS, ...PROCESS_ITEMS]));
  const result = acceptanceStatus(completeTable, []);
  assert.equal(result.applicable, 54);
  assert.equal(result.processCount, 8);
  assert.equal(result.counts.unverified, 54);
  for (const item of PROCESS_ITEMS) {
    assert.ok(result.html.includes(`title="Process item: reported in the task report"></td><td>${item}</td>`));
  }
});

test('existing real verdicts remain intact without rewriting records', () => {
  const { records } = JSON.parse(readFileSync(new URL('../src/data/acceptance-status.json', import.meta.url), 'utf8'));
  const before = JSON.stringify(records);
  const result = acceptanceStatus(completeTable, records);
  assert.equal(result.counts.passed, 9);
  assert.equal(result.applicable, 54);
  assert.equal(JSON.stringify(records), before);
});

test('blue and J preserve the last actual live verdict time', () => {
  for (const status of ['unverified', 'judgment']) {
    const records = [record, { ...record, status, checkedAt: '2026-09-09T18:03:00Z', evidence: 'Which approved rule governs this surface?' }];
    const result = acceptanceStatus(table, records);
    assert.equal(result.lastCheckedAt, record.checkedAt);
    assert.equal(result.counts.passed, 0);
    assert.equal(result.counts[status], status === 'unverified' ? 2 : 1);
    assert.ok(result.html.includes('Recorded Sep'));
  }
});

test('a later valid red live look advances Last checked', () => {
  const failed = { ...record, status: 'failed', checkedAt: '2026-09-09T18:04:00Z' };
  const result = acceptanceStatus(table, [failed, record]);
  assert.equal(result.lastCheckedAt, failed.checkedAt);
  assert.equal(result.counts.failed, 1);
});

test('process records never add a live symbol, score, or timestamp', () => {
  const condition = rows.find(row => row[0] === '001')[3];
  const result = acceptanceStatus(completeTable, [{ ...record, item: '001', condition }]);
  assert.equal(result.counts.passed, 0);
  assert.equal(result.lastCheckedAt, null);
  assert.equal(result.applicable, 54);
});

test('J requires evidence, uses its own symbol and row wash, and is not a pass', () => {
  assert.throws(() => acceptanceStatus(table, [{ ...record, status: 'judgment', evidence: '' }]));
  const result = acceptanceStatus(table, [{ ...record, status: 'judgment', evidence: 'Which of the conflicting approved rules governs this surface?' }]);
  assert.equal(result.counts.judgment, 1);
  assert.equal(result.counts.passed, 0);
  assert.equal(result.lastCheckedAt, null);
  assert.ok(result.html.includes('data-acceptance-row="judgment"'));
  assert.ok(result.html.includes('Unsettled rule: Which of the conflicting approved rules governs this surface?'));
  assert.ok(result.html.includes('>J</span>'));
});

test('outside reviewers can request a rule decision on a human item without passing it', () => {
  const result = acceptanceStatus(table, [{ ...record, item: '901', condition: 'Visual condition', status: 'judgment', evidence: 'Which conflicting visual standard governs this surface?' }]);
  assert.equal(result.counts.judgment, 1);
  assert.equal(result.counts.passed, 0);
});

test('reason and release SHA appear safely in tooltips; invalid optional fields fail', () => {
  const result = acceptanceStatus(table, [{ ...record, status: 'unverified', reason: 'blocked', releaseSha: '2267b2c' }]);
  assert.ok(result.html.includes('Live check blocked.'));
  assert.ok(result.html.includes('Release SHA: 2267b2c.'));
  assert.throws(() => acceptanceStatus(table, [{ ...record, reason: 'maybe' }]));
  assert.throws(() => acceptanceStatus(table, [{ ...record, releaseSha: '<script>' }]));
});

test('rule resolution returns to blue and requires a new live verdict', () => {
  const result = acceptanceStatus(table, [
    { ...record, status: 'judgment', evidence: 'Which approved rule governs the homepage?' },
    { ...record, status: 'unverified', reason: 'condition-changed', checkedAt: '2026-09-09T18:05:00Z', evidence: 'Douglas clarified the rule; live verification remains pending.' },
  ]);
  assert.equal(result.counts.judgment, 0);
  assert.equal(result.counts.passed, 0);
  assert.equal(result.counts.unverified, 2);
  assert.equal(result.lastCheckedAt, null);
});
