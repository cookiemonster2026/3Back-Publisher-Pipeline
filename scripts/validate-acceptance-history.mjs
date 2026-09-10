import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';

const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object'
  ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
export const hashRecord = value => createHash('sha256').update(JSON.stringify(canonical(value))).digest('hex');
export function preservePrefix(records, hashes, label) {
  if (!Array.isArray(records) || records.length < hashes.length ||
      hashes.some((hash, index) => hashRecord(records[index]) !== hash)) {
    throw Error(label + ': acceptance history was removed, changed, or reordered.');
  }
}
export function validateHistory(root, base = 'HEAD') {
  const baseline = JSON.parse(fs.readFileSync(resolve(root, 'scripts/acceptance-history-baseline.json')));
  for (const [path, spec] of Object.entries(baseline.files)) {
    const current = JSON.parse(fs.readFileSync(resolve(root, path)));
    preservePrefix(current[spec.key], spec.hashes, path);
    // Also protect records appended after the recovery baseline.
    const previous = JSON.parse(execFileSync('git', ['show', base + ':' + path], {cwd: root, stdio: ['ignore', 'pipe', 'pipe']}));
    preservePrefix(current[spec.key], previous[spec.key].map(hashRecord), path + ' against ' + base);
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    validateHistory(resolve(import.meta.dirname, '..'), process.argv[2] || 'HEAD');
    console.log('Acceptance history preservation passed.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
