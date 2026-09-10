import test from 'node:test';
import assert from 'node:assert/strict';
import {preservePrefix, hashRecord} from './validate-acceptance-history.mjs';
const records = [{item: '701', status: 'passed'}, {item: '708', status: 'judgment'}];
const hashes = records.map(hashRecord);
test('allows appended evidence and harmless key ordering', () => {
  preservePrefix([{status: 'passed', item: '701'}, records[1], {item: '708', status: 'passed'}], hashes, 'test');
});
test('rejects truncation, placeholders, edits, and reordering', () => {
  for (const value of [records.slice(0, 1), 'see-file', [{item: '701', status: 'failed'}, records[1]], [...records].reverse()]) {
    assert.throws(() => preservePrefix(value, hashes, 'test'));
  }
});
