const labels = { passed: "Passed", failed: "Failed", unverified: "Needs a live look", judgment: "Rule decision needed" };
const symbols = { passed: "P", failed: "F", unverified: "R", judgment: "J" };
const reasons = { changed: "Surface changed.", "never-checked": "Never checked.", blocked: "Live check blocked.", "condition-changed": "Condition text changed.", "awaiting-human": "Awaiting Douglas's live review." };
const range = (first, last) => Array.from({ length: last - first + 1 }, (_, index) => String(first + index));
export const PROCESS_ITEMS = Object.freeze(["001", "002", "003", "004", "005", "006", "602", "606"]);
export const LIVE_ITEMS = Object.freeze([...range(101, 108), ...range(201, 205), ...range(301, 307), ...range(321, 324), ...range(401, 405), ...range(501, 508), "601", ...range(603, 605), ...range(701, 708), ...range(901, 905)]);
const processItems = new Set(PROCESS_ITEMS);
const liveItems = new Set(LIVE_ITEMS);
const humanItems = new Set(range(901, 905));
const isVerdict = (status) => status === "passed" || status === "failed";
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const plain = (value) => value.replace(/<[^>]*>/g, "").trim();
const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago", timeZoneName: "short" });

export function acceptanceStatus(html, records) {
  const latest = new Map();
  const latestVerdicts = new Map();
  for (const record of records) {
    if (record.environment !== "production" || !["agent", "human"].includes(record.reviewerType)) throw new Error("Acceptance results require live production verification or a human decision about the live site");
    if (!/^\d{3}$/.test(record.item) || !Object.hasOwn(labels, record.status) || !Number.isFinite(Date.parse(record.checkedAt)) || Date.parse(record.checkedAt) > Date.now()) throw new Error("Invalid acceptance status record");
    if (!record.evidence?.trim() || !record.reviewer?.trim()) throw new Error(`Acceptance item ${record.item} needs evidence and a reviewer`);
    const url = new URL(record.url);
    if (url.protocol !== "https:" || url.hostname !== "3back.com" || url.username || url.password) throw new Error(`Acceptance item ${record.item} needs a live 3back.com URL`);
    if (!record.condition?.trim()) throw new Error(`Acceptance item ${record.item} needs its verified condition`);
    if (record.reason !== undefined && !Object.hasOwn(reasons, record.reason)) throw new Error(`Invalid acceptance reason for ${record.item}`);
    if (record.releaseSha !== undefined && (typeof record.releaseSha !== "string" || !/^[0-9a-f]{7,40}$/i.test(record.releaseSha))) throw new Error(`Invalid release SHA for ${record.item}`);
    const previous = latest.get(record.item);
    if (!previous || Date.parse(record.checkedAt) >= Date.parse(previous.checkedAt)) latest.set(record.item, record);
    if (liveItems.has(record.item) && isVerdict(record.status) && (!humanItems.has(record.item) || record.reviewerType === "human")) {
      const previousVerdict = latestVerdicts.get(record.item);
      if (!previousVerdict || Date.parse(record.checkedAt) >= Date.parse(previousVerdict.checkedAt)) latestVerdicts.set(record.item, record);
    }
  }

  const counts = { passed: 0, failed: 0, unverified: 0, judgment: 0, total: 0 };
  let processCount = 0;
  const seen = new Set();
  let lastCheckedAt = null;
  const annotated = html.replace(/<table\b[^>]*>[\s\S]*?<\/table>/g, (table) => {
    if (!/<th>Item<\/th>/.test(table)) return table;
    return table.replace("<th>Item</th>", '<th scope="col" class="acceptance-status-heading">Current Status</th><th>Item</th>')
      .replace("<th>Class</th>", "")
      .replace(/<tr>\s*<td>(\d{3})<\/td>([\s\S]*?)<\/tr>/g, (_row, item, rest) => {
        if (seen.has(item)) throw new Error(`Duplicate acceptance item ${item}`);
        seen.add(item);
        if (!processItems.has(item) && !liveItems.has(item)) throw new Error(`Unclassified acceptance item ${item}`);
        const cells = [...rest.matchAll(/<td>([\s\S]*?)<\/td>/g)].map((match) => plain(match[1]));
        const visibleRest = rest.replace(/^\s*<td>[\s\S]*?<\/td>/, "");
        if (processItems.has(item)) {
          processCount++;
          return `<tr><td class="acceptance-current-status" aria-label="Process item: reported in the task report" title="Process item: reported in the task report"></td><td>${item}</td>${visibleRest}</tr>`;
        }
        const record = latest.get(item);
        const conditionMatches = record?.condition === cells[2];
        const humanApproved = !isVerdict(record?.status) || cells[1] !== "Human" || record?.reviewerType === "human";
        const status = conditionMatches && humanApproved ? record.status : "unverified";
        counts[status]++;
        counts.total++;
        const lastVerdict = latestVerdicts.get(item);
        if (lastVerdict && (!lastCheckedAt || Date.parse(lastVerdict.checkedAt) > Date.parse(lastCheckedAt))) lastCheckedAt = lastVerdict.checkedAt;
        let note = `Never checked.${cells[1] === "Human" ? " Awaiting Douglas's live review." : ""}`;
        if (record) note = !conditionMatches ? "Condition text changed. Recheck required." : !humanApproved ? "Awaiting Douglas's live review." : `${record.reason ? `${reasons[record.reason]} ` : ""}${status === "judgment" ? "Unsettled rule: " : ""}${record.evidence}`;
        const detail = `${labels[status]}. ${note}${record ? ` ${isVerdict(status) ? "Checked" : "Recorded"} ${dateFormat.format(new Date(record.checkedAt))} by ${record.reviewer} on ${record.url}.${record.releaseSha ? ` Release SHA: ${record.releaseSha}.` : ""}` : ""}`;
        return `<tr data-acceptance-row="${status}"><td class="acceptance-current-status" data-acceptance-status="${status}" title="${escapeHtml(detail)}"><span class="acceptance-status acceptance-status--${status}" role="img" aria-label="${escapeHtml(detail)}" title="${escapeHtml(detail)}">${symbols[status]}</span></td><td>${item}</td>${visibleRest}</tr>`;
      });
  });
  for (const item of latest.keys()) if (!seen.has(item)) throw new Error(`Unknown acceptance item ${item}`);
  if (!seen.size) throw new Error("No acceptance checklist items found");
  return { html: annotated, counts, applicable: counts.total, processCount, lastCheckedAt };
}
