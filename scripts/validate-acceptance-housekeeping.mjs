import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const MAX_OPEN_FILE_BYTES = 204800;
export const MAX_APPENDED_RECORDS = 161;
export const MAX_UNCHANGED_WEEKLY_GREENS = 53;

const readJson = path => JSON.parse(fs.readFileSync(path, "utf8"));
const newestByItem = records => {
  const latest = new Map();
  for (const record of records) {
    const previous = latest.get(record.item);
    if (!previous || Date.parse(record.checkedAt) >= Date.parse(previous.checkedAt)) latest.set(record.item, record);
  }
  return latest;
};

export function assertOpenFileSizes(files) {
  const oversized = files.filter(file => !file.accepted && file.size > MAX_OPEN_FILE_BYTES);
  if (oversized.length) throw Error(`Acceptance housekeeping: open files exceed 200 KB: ${oversized.map(file => file.path).join(", ")}`);
}

export function assertAppendLimit(currentRecords, previousRecords, label) {
  const appended = currentRecords.length - previousRecords.length;
  if (appended >= 162) throw Error(`${label}: appended ${appended} acceptance records; limit is 161.`);
}

export function assertFrozenSuitesUnchanged(acceptedSuiteIds, changedPaths) {
  const frozen = new Set(acceptedSuiteIds.flatMap(id => [
    `src/data/acceptance-snapshots/${id}.json`,
    `src/data/acceptance-snapshots/${id}.md`,
    `src/data/acceptance-lifecycle/${id}.json`,
  ]));
  const changedFrozen = changedPaths.filter(path => frozen.has(path));
  if (changedFrozen.length) throw Error(`Acceptance housekeeping: accepted suite files are immutable: ${changedFrozen.join(", ")}`);
}

export function assertNoWeeklyRestamp(statusRecords, weeklyRecords, label) {
  const current = newestByItem(statusRecords);
  const unchangedGreens = weeklyRecords.filter(record => {
    const prior = current.get(record.item);
    return record.status === "passed" && prior?.status === "passed" && prior.condition === record.condition;
  });
  if (unchangedGreens.length >= 54) throw Error(`${label}: contains ${unchangedGreens.length} unchanged passed records; limit is 53.`);
}

function previousRecords(root, path) {
  try {
    return JSON.parse(execFileSync("git", ["show", `HEAD:${path}`], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] })).records ?? [];
  } catch {
    return [];
  }
}

export function validateAcceptanceHousekeeping(root) {
  const lifecycleDirectory = resolve(root, "src/data/acceptance-lifecycle");
  const snapshotDirectory = resolve(root, "src/data/acceptance-snapshots");
  const lifecycleFiles = fs.readdirSync(lifecycleDirectory).filter(name => name.endsWith(".json"));
  const acceptedSuiteIds = lifecycleFiles.filter(name => readJson(resolve(lifecycleDirectory, name)).events?.some(event => event.type === "accepted")).map(name => name.slice(0, -5));
  const accepted = new Set(acceptedSuiteIds);
  const snapshotFiles = fs.readdirSync(snapshotDirectory).filter(name => name.endsWith(".json"));
  const statusPath = "src/data/acceptance-status.json";
  const watchedJsonPaths = [statusPath, ...snapshotFiles.map(name => `src/data/acceptance-snapshots/${name}`)];

  assertOpenFileSizes([
    { path: statusPath, size: fs.statSync(resolve(root, statusPath)).size, accepted: false },
    ...snapshotFiles.map(name => ({ path: `src/data/acceptance-snapshots/${name}`, size: fs.statSync(resolve(snapshotDirectory, name)).size, accepted: accepted.has(name.slice(0, -5)) })),
    ...lifecycleFiles.map(name => ({ path: `src/data/acceptance-lifecycle/${name}`, size: fs.statSync(resolve(lifecycleDirectory, name)).size, accepted: accepted.has(name.slice(0, -5)) })),
  ]);

  for (const path of watchedJsonPaths) assertAppendLimit(readJson(resolve(root, path)).records ?? [], previousRecords(root, path), path);

  const changedPaths = execFileSync("git", ["status", "--porcelain=v1", "--untracked-files=all"], { cwd: root, encoding: "utf8" })
    .split(/\r?\n/).filter(Boolean).map(line => line.slice(3).replaceAll("\\", "/")).map(path => path.includes(" -> ") ? path.split(" -> ").at(-1) : path);
  assertFrozenSuitesUnchanged(acceptedSuiteIds, changedPaths);

  const statusRecords = readJson(resolve(root, statusPath)).records ?? [];
  for (const name of snapshotFiles.filter(name => /^weekly-\d{4}-\d{2}-\d{2}\.json$/.test(name))) {
    assertNoWeeklyRestamp(statusRecords, readJson(resolve(snapshotDirectory, name)).records ?? [], `src/data/acceptance-snapshots/${name}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    validateAcceptanceHousekeeping(resolve(import.meta.dirname, ".."));
    console.log("Acceptance housekeeping passed.");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
