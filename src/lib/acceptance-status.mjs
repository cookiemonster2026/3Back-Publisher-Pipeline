const labels = { passed: "Passed", failed: "Failed", unverified: "Needs attention" };
const symbols = { passed: "✓", failed: "✕", unverified: "?" };
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const plain = (value) => value.replace(/<[^>]*>/g, "").trim();
const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago", timeZoneName: "short" });

export function acceptanceStatus(html, records) {
  const latest = new Map();
  for (const record of records) {
    if (record.environment !== "production" || !["agent", "human"].includes(record.reviewerType)) throw new Error("Acceptance results require live production verification or a human decision about the live site");
    if (!/^\d{3}$/.test(record.item) || !Object.hasOwn(labels, record.status) || !Number.isFinite(Date.parse(record.checkedAt)) || Date.parse(record.checkedAt) > Date.now()) throw new Error("Invalid acceptance status record");
    if (!record.evidence?.trim() || !record.reviewer?.trim()) throw new Error(`Acceptance item ${record.item} needs evidence and a reviewer`);
    const url = new URL(record.url);
    if (url.protocol !== "https:" || url.hostname !== "3back.com" || url.username || url.password) throw new Error(`Acceptance item ${record.item} needs a live 3back.com URL`);
    if (!record.condition?.trim()) throw new Error(`Acceptance item ${record.item} needs its verified condition`);
    const previous = latest.get(record.item);
    if (!previous || Date.parse(record.checkedAt) >= Date.parse(previous.checkedAt)) latest.set(record.item, record);
  }

  const counts = { passed: 0, failed: 0, unverified: 0, total: 0 };
  const seen = new Set();
  let lastCheckedAt = null;
  const annotated = html.replace(/<table\b[^>]*>[\s\S]*?<\/table>/g, (table) => {
    if (!/<th>Item<\/th>/.test(table)) return table;
    return table.replace("<th>Item</th>", '<th scope="col" class="acceptance-status-heading">Current Status</th><th>Item</th>')
      .replace("<th>Class</th>", "")
      .replace(/<tr>\s*<td>(\d{3})<\/td>([\s\S]*?)<\/tr>/g, (_row, item, rest) => {
        if (seen.has(item)) throw new Error(`Duplicate acceptance item ${item}`);
        seen.add(item);
        const cells = [...rest.matchAll(/<td>([\s\S]*?)<\/td>/g)].map((match) => plain(match[1]));
        const record = latest.get(item);
        const conditionMatches = record?.condition === cells[2];
        const humanApproved = cells[1] !== "Human" || record?.reviewerType === "human";
        const status = conditionMatches && humanApproved ? record.status : "unverified";
        counts[status]++;
        counts.total++;
        if (record && (!lastCheckedAt || Date.parse(record.checkedAt) > Date.parse(lastCheckedAt))) lastCheckedAt = record.checkedAt;
        let note = cells[1] === "Human" ? "Awaiting human review." : "No live-site verification recorded.";
        if (record) note = !conditionMatches ? "Condition changed. Recheck required." : !humanApproved ? "Awaiting human review." : record.evidence;
        const detail = `${labels[status]}. ${note}${record ? ` Checked ${dateFormat.format(new Date(record.checkedAt))} by ${record.reviewer} on ${record.url}.` : ""}`;
        const visibleRest = rest.replace(/^\s*<td>[\s\S]*?<\/td>/, "");
        return `<tr><td class="acceptance-current-status" data-acceptance-status="${status}"><span class="acceptance-status acceptance-status--${status}" role="img" aria-label="${escapeHtml(detail)}" title="${escapeHtml(detail)}">${symbols[status]}</span></td><td>${item}</td>${visibleRest}</tr>`;
      });
  });
  for (const item of latest.keys()) if (!seen.has(item)) throw new Error(`Unknown acceptance item ${item}`);
  if (!counts.total) throw new Error("No acceptance checklist items found");
  return { html: annotated, counts, applicable: counts.total, lastCheckedAt };
}
