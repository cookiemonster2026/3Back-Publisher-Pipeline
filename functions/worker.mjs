import paperPdf from "../src/assets/papers/3Back-No-Head-Works-Alone-v1.49.pdf";

const CONTACT_PATH = "/api/contact";
const PAPER_PATH = "/api/papers/no-head-works-alone";
const GRIP_CHECK_PATH = "/api/grip-check";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_EMAIL_URL = "https://api.resend.com/emails";

function json(body, status = 200) { return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=UTF-8", "cache-control": "no-store" } }); }
function clean(value, limit) { return typeof value === "string" ? value.trim().slice(0, limit) : ""; }
function escapeHtml(value) { return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]); }
async function sendEmail(env, message) {
	const response = await fetch(RESEND_EMAIL_URL, { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify(message) });
	if (!response.ok) throw new Error("Email provider rejected the request.");
}
function arrayBufferToBase64(buffer) {
	const bytes = new Uint8Array(buffer); let binary = "";
	for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index]);
	return btoa(binary);
}
async function verifyTurnstile(request, env, token) {
	if (!token) return false;
	const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token }); const remoteIp = request.headers.get("CF-Connecting-IP"); if (remoteIp) body.set("remoteip", remoteIp);
	const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body });
	const result = await response.json().catch(() => null);
	return response.ok && result?.success === true;
}
async function handleContact(request, env) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	const requestUrl = new URL(request.url); const origin = request.headers.get("origin");
	if (origin && origin !== requestUrl.origin) return json({ error: "Invalid request origin." }, 403);
	if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY) return json({ error: "The contact form is not configured yet." }, 503);
	const form = await request.formData(); const name = clean(form.get("name"), 160); const email = clean(form.get("email"), 254).toLowerCase(); const role = clean(form.get("role"), 160); const phone = clean(form.get("phone"), 60); const message = clean(form.get("message"), 4000); const token = clean(form.get("cf-turnstile-response"), 2048);
	if (!name || !email || !role || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Please provide your name, a valid email address, role or position, and execution problem." }, 400);
	if (!token) return json({ error: "Please complete the security check and try again." }, 400);
	if (!await verifyTurnstile(request, env, token)) return json({ error: "The security check could not be verified. Please try again." }, 400);
	const fromAddress = env.CONTACT_FROM_EMAIL || "noreply@3back.com"; const notificationTo = env.CONTACT_NOTIFICATION_EMAIL || "og@3back.com"; const safeName = escapeHtml(name); const safeEmail = escapeHtml(email); const safeRole = escapeHtml(role); const safePhone = escapeHtml(phone || "Not provided"); const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
	try {
		await sendEmail(env, { from: fromAddress, to: [notificationTo], reply_to: email, subject: `3Back contact: ${name}`, html: `<h1>New contact message</h1><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Role / position:</strong> ${safeRole}</p><p><strong>Phone:</strong> ${safePhone}</p><p><strong>Execution problem:</strong><br>${safeMessage}</p>` });
		await sendEmail(env, { from: fromAddress, to: [email], subject: "We received your message – 3Back", html: "<div style=\"font-family:Arial,sans-serif;line-height:1.5;color:#1d2421\"><p>Thank you for reaching out.</p><p>We received your message and will review it. You can expect a reply from us by email.</p><p>If what you described is a real execution problem we can examine, we may suggest a short call to scope next steps. If it is not a fit, we will say so clearly. Either way, you will hear from us.</p><p>No pitch deck. No automatic meeting. We start from the work you named.</p><hr style=\"border:0;border-top:1px solid #d8d1c6;margin:24px 0\"><p><strong>3Back</strong><br>The Team Execution Company<br><a href=\"tel:+18553232225\" style=\"color:#1d2421\">(855) 323-2225</a><br><a href=\"https://3back.com\" style=\"color:#1d2421\">3back.com</a></p></div>" });
	} catch { return json({ error: "We could not send your message. Please call us instead." }, 502); }
	return json({ ok: true });
}
async function handlePaperRequest(request, env) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	const requestUrl = new URL(request.url); const origin = request.headers.get("origin");
	if (origin && origin !== requestUrl.origin) return json({ error: "Invalid request origin." }, 403);
	if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY) return json({ error: "The paper request form is not configured yet." }, 503);
	const form = await request.formData(); const firstName = clean(form.get("first_name"), 80); const lastName = clean(form.get("last_name"), 80); const email = clean(form.get("email"), 254).toLowerCase(); const confirmEmail = clean(form.get("confirm_email"), 254).toLowerCase(); const phone = clean(form.get("phone"), 60); const consent = form.get("list_consent") === "on"; const token = clean(form.get("cf-turnstile-response"), 2048);
	if (!firstName || !lastName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email !== confirmEmail) return json({ error: "Enter your name and matching valid email addresses." }, 400);
	if (!consent) return json({ error: "Please agree to join the 3Back list to request the paper." }, 400);
	if (!await verifyTurnstile(request, env, token)) return json({ error: "The security check could not be verified. Please try again." }, 400);
	const safeFirstName = escapeHtml(firstName); const safeLastName = escapeHtml(lastName); const safeEmail = escapeHtml(email); const safePhone = escapeHtml(phone || "Not provided"); const timestamp = new Date().toISOString(); const fromAddress = "noreply@3back.com"; const notificationTo = env.CONTACT_NOTIFICATION_EMAIL || "og@3back.com";
	try {
		await sendEmail(env, { from: fromAddress, to: [notificationTo], reply_to: email, subject: "[Paper] no-head-works-alone", html: `<h1>Paper request</h1><p><strong>transaction:</strong> gated_paper</p><p><strong>slug:</strong> no-head-works-alone</p><p><strong>title:</strong> No Head Works Alone</p><p><strong>source:</strong> /papers/no-head-works-alone</p><p><strong>first_name:</strong> ${safeFirstName}</p><p><strong>last_name:</strong> ${safeLastName}</p><p><strong>email:</strong> ${safeEmail}</p><p><strong>phone:</strong> ${safePhone}</p><p><strong>list_consent:</strong> true</p><p><strong>timestamp:</strong> ${timestamp}</p>` });
		await sendEmail(env, { from: fromAddress, to: [email], subject: "No Head Works Alone: your copy from 3Back", html: `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#1d2421"><p>Thank you, ${safeFirstName}.</p><p>Your copy of <em>No Head Works Alone</em> is attached.</p><p>You have joined the 3Back list for occasional future content. You can unsubscribe at any time.</p><p><a href="https://3back.com" style="color:#1d2421">3back.com</a></p></div>`, attachments: [{ filename: "3Back-No-Head-Works-Alone-v1.49.pdf", content: arrayBufferToBase64(paperPdf), content_type: "application/pdf" }] });
	} catch { return json({ error: "We could not send the paper. Please try again shortly." }, 502); }
	return json({ ok: true });
}
async function handleGripCheck(request, env) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	const requestUrl = new URL(request.url); const origin = request.headers.get("origin");
	if (origin && origin !== requestUrl.origin) return json({ error: "Invalid request origin." }, 403);
	if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY) return json({ error: "The Grip Check form is not configured yet." }, 503);
	const form = await request.formData(); const firstName = clean(form.get("first_name"), 80); const lastName = clean(form.get("last_name"), 80); const email = clean(form.get("email"), 254).toLowerCase(); const confirmEmail = clean(form.get("confirm_email"), 254).toLowerCase(); const role = clean(form.get("role"), 80); const organizationSize = clean(form.get("organization_size"), 40); const context = clean(form.get("context"), 4000); const scorePayload = clean(form.get("score_payload"), 1000); const reviewRequested = form.get("review_requested") === "on"; const token = clean(form.get("cf-turnstile-response"), 2048);
	if (!firstName || !lastName || !email || email !== confirmEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !role || !organizationSize || !scorePayload) return json({ error: "Complete all required fields with matching valid email addresses." }, 400);
	let scores; try { scores = JSON.parse(scorePayload); } catch { return json({ error: "Your score is unavailable. Please complete Grip Check again." }, 400); }
	if (!scores || !["organization", "work"].includes(scores.view) || !Number.isInteger(scores.composite) || !Array.isArray(scores.dimensionScores) || scores.dimensionScores.length !== 5 || scores.dimensionScores.some((score) => !Number.isInteger(score))) return json({ error: "Your score is unavailable. Please complete Grip Check again." }, 400);
	if (!await verifyTurnstile(request, env, token)) return json({ error: "The security check could not be verified. Please try again." }, 400);
	const safe = Object.fromEntries(Object.entries({ firstName, lastName, email, role, organizationSize, context, view: scores.view, composite: String(scores.composite), dimensions: scores.dimensionScores.join(", "), reviewRequested: String(reviewRequested) }).map(([key, value]) => [key, escapeHtml(value || "Not provided")]));
	try { await sendEmail(env, { from: "gripcheck@3back.com", to: [email], subject: "Your 3Back Grip Check score", html: `<p>Your composite Grip Score: <strong>${safe.composite}</strong></p><p>Dimension scores: ${safe.dimensions}</p>` }); await sendEmail(env, { from: "gripcheck@3back.com", to: ["gripcheckscores@3back.com"], reply_to: email, subject: "[GripCheck] new result", html: `<h1>Grip Check result</h1><p><strong>View:</strong> ${safe.view}</p><p><strong>Composite:</strong> ${safe.composite}</p><p><strong>Dimensions:</strong> ${safe.dimensions}</p><p><strong>Name:</strong> ${safe.firstName} ${safe.lastName}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Role:</strong> ${safe.role}</p><p><strong>Organization size:</strong> ${safe.organizationSize}</p><p><strong>Context:</strong><br>${safe.context.replace(/\n/g,"<br>")}</p><p><strong>30-minute review:</strong> ${safe.reviewRequested}</p>` }); } catch { return json({ error: "We could not send your results. Please try again shortly." }, 502); }
	return json({ ok: true });
}
export default { async fetch(request, env) { const url = new URL(request.url); if (url.pathname === CONTACT_PATH) return handleContact(request, env); if (url.pathname === PAPER_PATH) return handlePaperRequest(request, env); if (url.pathname === GRIP_CHECK_PATH) return handleGripCheck(request, env); return env.ASSETS.fetch(request); } };
