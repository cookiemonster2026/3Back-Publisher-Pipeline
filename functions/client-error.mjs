import { pageSeo, SITE_ORIGIN } from "../src/seo/registry.mjs";

export const PUBLIC_PATHS = [...new Set(["/", ...Object.entries(pageSeo)
	.filter(([, metadata]) => metadata.status === "complete")
	.flatMap(([path]) => path === "/" ? [path] : [path, `${path}/`])])];
export const EVENT_TTL = 1209600;
export const SUMMARY_TTL = 2419200;

// Self-contained so the exact same classifier can run in the inline beacon.
export function createClassifier(paths, origin) {
	const allowedPaths = new Set(paths);
	const names = new Set(["Error", "TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "Other"]);
	const path = (value) => typeof value === "string" && allowedPaths.has(value) ? (value === "/" ? value : value.replace(/\/$/, "")) : null;
	const line = (value) => Number.isInteger(value) && value >= 0 && value <= 1000000 ? value : undefined;
	const file = (value) => {
		if (value === "inline") return value;
		if (typeof value !== "string" || value.length > 200 || /[?#%\\\s]/.test(value) || value.includes("..")) return null;
		return /^\/_astro\/[A-Za-z0-9_.-]+\.js$/.test(value) ? value : null;
	};
	const source = (value, page) => {
		if (typeof value !== "string" || /[?#%\\\s]/.test(value) || value.includes("..")) return null;
		try {
			const url = new URL(value, origin);
			if (url.origin !== origin || url.username || url.password) return null;
			if (path(url.pathname) && path(url.pathname) === path(page)) return "inline";
			return file(url.pathname);
		} catch { return null; }
	};
	const report = (value) => {
		if (!value || !["error", "rejection"].includes(value.kind) || !names.has(value.name)) return null;
		const page = path(value.path), script = file(value.file);
		if (!page || !script) return null;
		const result = { kind: value.kind, name: value.name, path: page, file: script };
		const number = line(value.line);
		if (number !== undefined) result.line = number;
		return result;
	};
	const browserReport = (kind, event, page) => {
		if (!path(page)) return null;
		let filename, number, error;
		if (kind === "error") {
			filename = event.filename; number = event.lineno; error = event.error;
		} else {
			error = event.reason;
			if (typeof error?.stack !== "string") return null;
			// First stack frame only, including unparseable/native frames: never search deeper.
			const frame = error.stack.split(/\r?\n/).find((entry) => /^\s*at\s/.test(entry) || entry.includes("@"));
			if (!frame) return null;
			const match = frame.match(/(?:\(|@|^\s*at\s+)((?:https?:\/\/|\/_astro\/)[^\s()]+):(\d+):(\d+)\)?\s*$/);
			if (!match) return null;
			filename = match[1]; number = Number(match[2]);
		}
		const script = source(filename, page);
		if (!script) return null;
		return report({ kind, name: names.has(error?.name) ? error.name : "Other", path: page, file: script, line: number });
	};
	return { path, file, source, report, browserReport };
}

export const classifier = createClassifier(PUBLIC_PATHS, SITE_ORIGIN);

function installBeacon(classify, paths, origin) {
	try {
		if (location.origin !== origin) return;
		const rules = classify(paths, origin);
		let sends = 0;
		const handle = (kind, event) => {
			try {
				if (sends >= 2) return;
				const report = rules.browserReport(kind, event, location.pathname);
				if (!report) return;
				sends += 1;
				fetch("/api/client-error", { method: "POST", credentials: "omit", referrerPolicy: "no-referrer", keepalive: true,
					headers: { "content-type": "application/json" }, body: JSON.stringify(report) }).catch(() => {});
			} catch { /* Diagnostics must never interrupt the page. */ }
		};
		window.addEventListener("error", (event) => handle("error", event));
		window.addEventListener("unhandledrejection", (event) => handle("rejection", event));
	} catch { /* Diagnostics must never interrupt the page. */ }
}

export function beaconScript() {
	return `(${installBeacon.toString()})(${createClassifier.toString()},${JSON.stringify(PUBLIC_PATHS).replace(/</g, "\\u003c")},${JSON.stringify(SITE_ORIGIN)});`;
}

export function isoWeek(date) {
	const day = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
	day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));
	const year = day.getUTCFullYear();
	const week = Math.ceil((((day.getTime() - Date.UTC(year, 0, 1)) / 86400000) + 1) / 7);
	return `${year}-W${String(week).padStart(2, "0")}`;
}

export function completedWeek(now) {
	const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
	end.setUTCDate(end.getUTCDate() - ((end.getUTCDay() + 6) % 7));
	const start = new Date(end.getTime() - 7 * 86400000);
	return { week: isoWeek(start), start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
}

function ulid(now) {
	const alphabet = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
	let time = BigInt(now.getTime()), prefix = "";
	for (let index = 0; index < 10; index++) { prefix = alphabet[Number(time & 31n)] + prefix; time >>= 5n; }
	return prefix + [...crypto.getRandomValues(new Uint8Array(16))].map((value) => alphabet[value & 31]).join("");
}

async function limitedJson(request) {
	if (Number(request.headers.get("content-length")) > 1024 || request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json" || !request.body) return null;
	const reader = request.body.getReader();
	let size = 0;
	const chunks = [];
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			size += value.byteLength;
			if (size > 1024) { await reader.cancel(); return null; }
			chunks.push(value);
		}
		const bytes = new Uint8Array(size);
		let offset = 0;
		for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
		return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
	} finally { reader.releaseLock(); }
}

export async function handleClientError(request, env, now = new Date()) {
	try {
		if (request.method === "POST" && request.headers.get("origin") === SITE_ORIGIN) {
			const report = classifier.report(await limitedJson(request));
			if (report && env.CLIENT_ERROR_CLUSTERS) {
				const week = isoWeek(now);
				await env.CLIENT_ERROR_CLUSTERS.put(`v3:${week}:${ulid(now)}`, JSON.stringify({ ...report, week }), { expirationTtl: EVENT_TTL });
			}
		}
	} catch { /* Invalid reports and unavailable storage fail open, without logging payloads. */ }
	return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
}

export async function listEvents(kv, week) {
	const records = [], seen = new Set();
	let cursor;
	do {
		const page = await kv.list({ prefix: `v3:${week}:`, ...(cursor ? { cursor } : {}) });
		if (!page || !Array.isArray(page.keys) || typeof page.list_complete !== "boolean") throw new Error("Incomplete diagnostic listing.");
		for (const key of page.keys) {
			const value = await kv.get(key.name, "json");
			const report = classifier.report(value);
			if (!report || value.week !== week) throw new Error("Incomplete diagnostic records.");
			records.push(report);
		}
		if (page.list_complete) return records;
		if (!page.cursor || seen.has(page.cursor)) throw new Error("Incomplete diagnostic cursor.");
		seen.add(page.cursor); cursor = page.cursor;
	} while (cursor);
	throw new Error("Incomplete diagnostic listing.");
}

export function buildDigest(records, window, env, escapeHtml) {
	const clusters = new Map();
	for (const record of records) {
		const key = JSON.stringify([record.path, record.kind, record.name, record.file, record.line ?? null]);
		const cluster = clusters.get(key) || { ...record, count: 0, key };
		cluster.count++; clusters.set(key, cluster);
	}
	const safe = (value) => escapeHtml(String(value ?? ""));
	const rows = [...clusters.values()].sort((a, b) => b.count - a.count || (a.key < b.key ? -1 : a.key > b.key ? 1 : 0)).slice(0, 20)
		.map((record) => `<tr>${[record.count, record.path, record.kind, record.name, record.file, record.line].map((value) => `<td>${safe(value)}</td>`).join("")}</tr>`).join("");
	const html = `<p><strong>Purpose:</strong> This weekly summary helps us find recurring JavaScript failures and improve the experience on 3back.com.</p>
<p><strong>Source:</strong> Reports came from visitors' browsers on known public pages of https://3back.com during the UTC reporting window below. Each cluster lists the page path and script file and line, when available.</p>
<p><strong>Action:</strong> Human analysis is required. Review recurring errors, reproduce the problem on the listed page, determine and apply a fix, then check later summaries for recurrence. Counts are approximate; no reports does not prove the site is error-free.</p>
<p>Week: ${safe(window.week)}<br>UTC window: ${safe(window.start)} 00:00 (inclusive) to ${safe(window.end)} 00:00 (exclusive)<br>Accepted event count: ${safe(records.length)}</p>
<table><thead><tr><th>Count</th><th>Page path</th><th>Kind</th><th>Error name</th><th>Script file</th><th>Line</th></tr></thead><tbody>${rows}</tbody></table>
<p>Unknown paths and unproven sources were dropped. Counts are approximate. Records expire in 14 days.</p>`;
	return { clusters: clusters.size, payload: { from: env.CONTACT_FROM_EMAIL || "noreply@3back.com", to: [env.CLIENT_ERROR_NOTIFICATION_EMAIL || "javascript-errors@3back.com"], subject: `JavaScript - client errors - ${window.week}`, html } };
}

export async function sendDigest(env, escapeHtml, now = new Date(), send = fetch) {
	const kv = env.CLIENT_ERROR_CLUSTERS;
	if (!kv || !env.RESEND_API_KEY) throw new Error("Diagnostic digest not configured.");
	const window = completedWeek(now), marker = `v3:digest:${window.week}`, bodyKey = `v3:digest-body:${window.week}`;
	if (await kv.get(marker) === "sent") return { ok: true, duplicate: true, week: window.week };
	let frozen = await kv.get(bodyKey);
	if (!frozen) {
		const digest = buildDigest(await listEvents(kv, window.week), window, env, escapeHtml);
		frozen = JSON.stringify(digest);
		await kv.put(bodyKey, frozen, { expirationTtl: SUMMARY_TTL });
	}
	const digest = JSON.parse(frozen);
	const response = await send("https://api.resend.com/emails", { method: "POST", headers: {
		Authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json", "Idempotency-Key": `3back-client-errors-${window.week}`,
	}, body: JSON.stringify(digest.payload) });
	if (!response.ok) throw new Error("Diagnostic email provider rejected the request.");
	await kv.put(marker, "sent", { expirationTtl: SUMMARY_TTL });
	return { ok: true, clusters: digest.clusters, week: window.week };
}

export async function handleDigest(request, env, escapeHtml) {
	const json = (value, status) => new Response(JSON.stringify(value), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	if (!env.CLIENT_ERROR_DIGEST_SECRET) return json({ error: "Not configured." }, 503);
	if (request.headers.get("X-Client-Error-Digest") !== env.CLIENT_ERROR_DIGEST_SECRET) return json({ error: "Forbidden." }, 403);
	if (!env.CLIENT_ERROR_CLUSTERS || !env.RESEND_API_KEY) return json({ error: "Not configured." }, 503);
	try { return json(await sendDigest(env, escapeHtml), 200); }
	catch { return json({ error: "Digest unavailable. Retry later." }, 502); }
}

export async function handleHistory(request, env, now = new Date()) {
	const headers = { "content-type": "application/json", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" };
	if (request.method !== "GET") return new Response(JSON.stringify({ error: "Method not allowed." }), { status: 405, headers });
	try {
		const weeks = [];
		if (env.CLIENT_ERROR_CLUSTERS) {
			// Exactly four completed UTC weeks, independent of storage listing order.
			for (let offset = 0; offset < 4; offset++) {
				const { week } = completedWeek(new Date(now.getTime() - offset * 7 * 86400000));
				const frozen = await env.CLIENT_ERROR_CLUSTERS.get(`v3:digest-body:${week}`, "json");
				if (frozen && typeof frozen.payload?.subject === "string" && typeof frozen.payload?.html === "string") {
					weeks.push({ week, subject: frozen.payload.subject, html: frozen.payload.html });
				}
			}
		}
		return new Response(JSON.stringify({ weeks }), { headers });
	} catch { return new Response(JSON.stringify({ error: "History unavailable." }), { status: 503, headers }); }
}
