import assert from "node:assert/strict";
import vm from "node:vm";
import { classifier, beaconScript, handleClientError, handleDigest, handleHistory, sendDigest, listEvents, buildDigest, isoWeek, completedWeek, EVENT_TTL } from "../functions/client-error.mjs";
import worker from "../functions/worker.mjs";

const escapeHtml = (value) => value.replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[c]);
const now = new Date("2026-09-14T14:00:00Z");
const sample = { kind: "error", name: "TypeError", path: "/", file: "/_astro/example.js", line: 12 };
const browserError = { filename: "https://3back.com/_astro/example.js", lineno: 12, error: { name: "TypeError", message: "private@example.com" } };
class MemoryKV {
	data = new Map(); writes = [];
	async get(key, type) { const value = this.data.get(key) ?? null; return type === "json" && value !== null ? JSON.parse(value) : value; }
	async put(key, value, options) { this.writes.push({ key, value, options }); this.data.set(key, value); }
	async list({ prefix, cursor }) {
		const keys = [...this.data.keys()].filter((key) => key.startsWith(prefix)).sort();
		const offset = Number(cursor || 0), next = offset + 1;
		return { keys: keys.slice(offset, next).map((name) => ({ name })), list_complete: next >= keys.length, cursor: next < keys.length ? String(next) : "" };
	}
}
const request = (body = sample, headers = {}) => new Request("https://3back.com/api/client-error", { method: "POST", headers: { origin: "https://3back.com", "content-type": "application/json", ...headers }, body: JSON.stringify(body) });
const env = (kv = new MemoryKV()) => ({ CLIENT_ERROR_CLUSTERS: kv, RESEND_API_KEY: "test-only", CLIENT_ERROR_DIGEST_SECRET: "test-only" });
async function seeded() {
	const settings = env();
	await handleClientError(request(), settings, new Date("2026-09-09T12:00:00Z"));
	return settings;
}
let passed = 0;
async function check(number, title, run) { await run(); passed++; console.log(`PASS ${number}: ${title}`); }

await check(1, "First-party filename accepted; no message stored", async () => {
	const report = classifier.browserReport("error", browserError, "/");
	assert.deepEqual(report, sample);
	const settings = env(); assert.equal((await handleClientError(request(report), settings, now)).status, 204);
	assert.equal(settings.CLIENT_ERROR_CLUSTERS.writes.length, 1);
	const write = settings.CLIENT_ERROR_CLUSTERS.writes[0];
	assert.equal(write.options.expirationTtl, EVENT_TTL); assert.match(write.key, /^v3:2026-W38:[0-9A-HJKMNP-TV-Z]{26}$/);
	assert.deepEqual(Object.keys(JSON.parse(write.value)).sort(), ["file", "kind", "line", "name", "path", "week"]);
});
await check(2, "Third-party filename cannot be rescued by deeper stack", () => {
	for (const filename of ["https://clarity.ms/a.js", "https://challenges.cloudflare.com/turnstile/a.js", "chrome-extension://abc/a.js"]) {
		assert.equal(classifier.browserReport("error", { ...browserError, filename, error: { name: "Error", stack: "Error\n at https://3back.com/_astro/example.js:12:2" } }, "/"), null);
	}
});
await check(3, "First rejection frame accepted across Chrome and Firefox formats", () => {
	for (const stack of ["TypeError: hidden\n    at run (https://3back.com/_astro/example.js:12:2)", "run@https://3back.com/_astro/example.js:12:2"]) {
		assert.deepEqual(classifier.browserReport("rejection", { reason: { name: "TypeError", stack } }, "/"), { ...sample, kind: "rejection" });
	}
});
await check(4, "Third-party or unparseable first rejection frame dropped", () => {
	for (const frame of ["    at https://clarity.ms/a.js:1:2", "    at nativeCall (native)"]) {
		assert.equal(classifier.browserReport("rejection", { reason: { stack: `Error\n${frame}\n    at https://3back.com/_astro/example.js:12:2` } }, "/"), null);
	}
});
await check(5, "Unknown paths and queries dropped; trailing slash normalized", () => {
	for (const path of ["/not-a-public-route", "/?email=a@b.com", "//", "/contact//"]) assert.equal(classifier.report({ ...sample, path }), null);
	assert.equal(classifier.report({ ...sample, path: "/contact/" }).path, "/contact");
});
await check(6, "Unknown fields including message ignored", () => assert.deepEqual(classifier.report({ ...sample, message: "private", cookie: "secret" }), sample));
await check(7, "Byte cap and missing/wrong Origin enforced", async () => {
	const settings = env();
	for (const req of [request({ ...sample, message: "x".repeat(1100) }), request({ ...sample, message: "€".repeat(400) }), request(sample, { origin: "" }), request(sample, { origin: "https://other.example" })]) assert.equal((await handleClientError(req, settings)).status, 204);
	assert.equal(settings.CLIENT_ERROR_CLUSTERS.writes.length, 0);
});
await check(8, "Line is bounded integer or omitted", () => {
	assert.equal(classifier.report(sample).line, 12);
	for (const line of [-1, "abc", 1.2, 1000001]) assert.equal("line" in classifier.report({ ...sample, line }), false);
});
await check(9, "Script nested paths, queries, fragments and traversal dropped", () => {
	for (const file of ["/_astro/foo/bar.js", "/_astro/example.js?x=1", "/_astro/example.js#1", "/_astro/../a.js", "/_astro/%2e%2e.js", "/_astro/a?b.js", "/_astro/a#b.js", "/_astro/a\\b.js"]) assert.equal(classifier.report({ ...sample, file }), null);
	assert.equal(classifier.source("https://3back.com/_astro/../_astro/example.js", "/"), null);
});
await check(10, "Listing follows every cursor and rejects incomplete results", async () => {
	const settings = await seeded(), kv = settings.CLIENT_ERROR_CLUSTERS;
	await handleClientError(request({ ...sample, line: 13 }), settings, new Date("2026-09-10"));
	assert.equal((await listEvents(kv, "2026-W37")).length, 2);
	const original = kv.list.bind(kv); kv.list = async (options) => ({ ...await original(options), cursor: "" });
	await assert.rejects(listEvents(kv, "2026-W37"), /cursor/);
	let sent = false; await assert.rejects(sendDigest(settings, escapeHtml, now, async () => { sent = true; return { ok: true }; })); assert.equal(sent, false);
});
await check(11, "Sent marker suppresses second email", async () => {
	const settings = await seeded(); let calls = 0;
	const send = async (_, options) => { calls++; assert.equal(options.headers["Idempotency-Key"], "3back-client-errors-2026-W37"); return { ok: true }; };
	await sendDigest(settings, escapeHtml, now, send);
	assert.equal((await sendDigest(settings, escapeHtml, now, send)).duplicate, true); assert.equal(calls, 1);
});
await check(12, "Failed send retries exact full frozen payload", async () => {
	const settings = await seeded(); const bodies = [];
	await assert.rejects(sendDigest(settings, escapeHtml, now, async (_, options) => { bodies.push(options.body); return { ok: false }; }));
	assert.equal(await settings.CLIENT_ERROR_CLUSTERS.get("v3:digest:2026-W37"), null);
	settings.CLIENT_ERROR_NOTIFICATION_EMAIL = "changed@example.com";
	await handleClientError(request({ ...sample, line: 99 }), settings, new Date("2026-09-11"));
	await sendDigest(settings, escapeHtml, now, async (_, options) => { bodies.push(options.body); return { ok: true }; });
	assert.equal(bodies[0], bodies[1]);
	const payload = JSON.parse(bodies[0]); assert.deepEqual(payload.to, ["javascript-errors@3back.com"]);
	assert.equal(payload.subject, "JavaScript - client errors - 2026-W37");
	assert.ok(payload.html.indexOf("Purpose:") < payload.html.indexOf("Source:")); assert.ok(payload.html.indexOf("Source:") < payload.html.indexOf("Action:"));
	assert.ok([...settings.CLIENT_ERROR_CLUSTERS.data.keys()].some((key) => key.startsWith("v3:2026-W37:")));
});
await check(13, "Missing or failing KV does not break ingest", async () => {
	assert.equal((await handleClientError(request(), {})).status, 204);
	assert.equal((await handleClientError(request(), { CLIENT_ERROR_CLUSTERS: { put: async () => { throw new Error("offline"); } } })).status, 204);
});
await check(14, "All interpolated HTML fields escaped", () => {
	const { payload } = buildDigest([{ ...sample, path: "<path>", name: "<name>", file: "<file>" }], completedWeek(now), {}, escapeHtml);
	for (const field of ["path", "name", "file"]) { assert.ok(payload.html.includes(`&lt;${field}&gt;`)); assert.ok(!payload.html.includes(`<${field}>`)); }
});

await check("extra", "Actual inline beacon caps requests and swallows rejected fetches", async () => {
	const handlers = {}, posts = [];
	const context = { URL, location: { origin: "https://3back.com", pathname: "/" }, window: { addEventListener: (type, callback) => { handlers[type] = callback; } }, fetch: (url, options) => { posts.push({ url, options }); return Promise.reject(new Error("offline")); } };
	vm.runInNewContext(beaconScript(), context);
	for (let index = 0; index < 4; index++) handlers.error(browserError);
	await new Promise((resolve) => setImmediate(resolve));
	assert.equal(posts.length, 2); assert.equal(posts[0].options.credentials, "omit"); assert.equal(posts[0].options.referrerPolicy, "no-referrer");
	assert.deepEqual(JSON.parse(posts[0].options.body), sample);
	assert.equal(classifier.browserReport("error", { ...browserError, filename: "https://3back.com/" }, "/").file, "inline");
});
await check("extra", "UTC year boundary and both Monday runs target the same week", () => {
	assert.equal(isoWeek(new Date("2021-01-01")), "2020-W53");
	assert.deepEqual(completedWeek(now), completedWeek(new Date("2026-09-14T16:00:00Z")));
	assert.equal(completedWeek(new Date("2026-09-20T23:59:00Z")).week, "2026-W37");
});
await check("extra", "Protected digest route and existing Worker asset fallback", async () => {
	const post = (secret) => new Request("https://3back.com/api/client-errors/digest", { method: "POST", headers: secret ? { "X-Client-Error-Digest": secret } : {} });
	assert.equal((await handleDigest(post(), {}, escapeHtml)).status, 503);
	assert.equal((await handleDigest(post("wrong"), env(), escapeHtml)).status, 403);
	assert.equal((await worker.fetch(request(), {})).status, 204);
	assert.equal((await worker.fetch(post("wrong"), env())).status, 403);
	assert.equal(await (await worker.fetch(new Request("https://3back.com/"), { ASSETS: { fetch: async () => new Response("asset") } })).text(), "asset");
});
await check("history", "Four frozen completed weeks, no recipient exposure, no reaggregation", async () => {
 const settings = env();
 for (let offset = 0; offset < 5; offset++) {
  const window = completedWeek(new Date(now.getTime() - offset * 7 * 86400000));
  await settings.CLIENT_ERROR_CLUSTERS.put('v3:digest-body:' + window.week, JSON.stringify({payload:{subject:'Saved ' + window.week,html:'<p>Saved body</p>',to:['private@example.com']}}), {expirationTtl:2419200});
 }
 const request = new Request('https://3back.com/api/client-errors/history');
 const response = await handleHistory(request, settings, now);
 const result = await response.json();
 assert.equal(result.weeks.length,4);
 assert.equal(result.weeks[0].week,'2026-W37');
 assert.ok(result.weeks.every(week => week.html === '<p>Saved body</p>' && !('to' in week)));
 assert.equal(response.headers.get('x-robots-tag'),'noindex, nofollow');
 assert.deepEqual(await (await handleHistory(request,{},now)).json(),{weeks:[]});
 assert.equal((await handleHistory(new Request(request.url,{method:'POST'}),settings,now)).status,405);
 const sent = await seeded();
 await sendDigest(sent,escapeHtml,now,async()=>({ok:true}));
 for (const write of sent.CLIENT_ERROR_CLUSTERS.writes.filter(write=>write.key.startsWith('v3:digest'))) assert.equal(write.options.expirationTtl,2419200);
 assert.equal((await worker.fetch(request, {})).status,200);
});
console.log(`${passed} focused checks passed. No real email or Cloudflare writes.`);
