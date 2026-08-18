import paperPdf from "../src/assets/papers/3Back-No-Head-Works-Alone-v1.49.pdf";
import gripCheckQuestionBankPdf from "../src/assets/grip-check/3Back-Grip-Check-Question-Bank-v0.1.pdf";
import { questions } from "../src/data/grip-check-questions.js";

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
	const form = await request.formData(); const firstName = clean(form.get("first_name"), 80); const lastName = clean(form.get("last_name"), 80); const email = clean(form.get("email"), 254).toLowerCase(); const confirmEmail = clean(form.get("confirm_email"), 254).toLowerCase(); const position = clean(form.get("position"), 80); const organizationName = clean(form.get("organization_name"), 160); const organizationSize = clean(form.get("organization_size"), 40); const context = clean(form.get("context"), 4000); const scorePayload = clean(form.get("score_payload"), 30000); const reviewRequested = clean(form.get("review_requested"), 3); const token = clean(form.get("cf-turnstile-response"), 2048);
	if (!firstName || !lastName || !email || email !== confirmEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !position || !organizationName || !organizationSize || !context || !scorePayload || !["yes", "no"].includes(reviewRequested)) return json({ error: "Complete all required fields with matching valid email addresses." }, 400);
	let scores; try { scores = JSON.parse(scorePayload); } catch { return json({ error: "Your score is unavailable. Please complete Grip Check again." }, 400); }
	if (!scores || !["organization", "work"].includes(scores.view) || !Number.isInteger(scores.composite) || !Array.isArray(scores.dimensionScores) || scores.dimensionScores.length !== 5 || scores.dimensionScores.some((score) => !Number.isInteger(score))) return json({ error: "Your score is unavailable. Please complete Grip Check again." }, 400);
	const responsesAreValid = Array.isArray(scores.responses) && scores.responses.length === questions[scores.view].length && scores.responses.every((response) => response && Number.isInteger(response.dimensionIndex) && response.dimensionIndex >= 0 && response.dimensionIndex < 5 && typeof response.question === "string" && response.question.length > 0 && typeof response.selectedOption === "string" && response.selectedOption.length > 0);
	if (!await verifyTurnstile(request, env, token)) return json({ error: "The security check could not be verified. Please try again." }, 400);
	const safe = Object.fromEntries(Object.entries({ firstName, lastName, email, position, organizationName, organizationSize, context, view: scores.view, composite: String(scores.composite), dimensions: scores.dimensionScores.join(", "), reviewRequested }).map(([key, value]) => [key, escapeHtml(value || "Not provided")]));
	const gripDimensions = [
		["Response to Changing Demand", "How clearly new demand is recognized, ordered, and acted on without waiting for the system to absorb it."],
		["Ownership and Bounded Execution", "Whether the work has a named owner with enough authority and capability to produce the result inside clear limits."],
		["Observable and Traceable Results", "How quickly and clearly the organization can see what was produced and whether it matched the intended need."],
		["Adaptation Without Loss of Control", "Whether established ways of working can be changed inside boundaries without creating uncontrolled side effects."],
		["AI Use and Control", "Whether AI is applied to consequential work with accountable human ownership and traceable effects."]
	];
	const perspective = scores.view === "organization" ? "your organization" : "you";
	const userSubject = scores.view === "organization" ? "Your organization's 3Back Grip Check score" : "Your personal 3Back Grip Check score";
	const userOpening = scores.view === "organization" ? "Thank you for taking the Grip Check. Here is your organization's Grip Check result." : "Thank you for taking the Grip Check. Here is your personal Grip Check result.";
	const internalPerspective = scores.view === "organization" ? "Organization" : "Personal";
	const reviewStatus = reviewRequested === "yes" ? "30-minute interpretation and debrief requested" : "No response required";
	const userFollowUp = reviewRequested === "yes" ? "You asked for a 30-minute interpretation and debrief. We will reach out shortly." : `This was your screening, not a diagnostic determination. A fuller interpretation needs a short conversation. Reply to this email or use <a href="https://3back.com/contact" style="color:#1d2421;text-decoration:underline">Start a Conversation on 3back.com</a> and say you completed a Grip Check. We will reply with a few short questions and available times.`;
	const safeIp = escapeHtml(clean(request.headers.get("CF-Connecting-IP"), 100) || "Not available");
	const safeUserAgent = escapeHtml(clean(request.headers.get("User-Agent"), 300) || "Not available");
	const dimensionHtml = gripDimensions.map(([name, definition], index) => { const score = scores.dimensionScores[index]; const label = score >= 80 ? "STRONG" : score >= 50 ? "MODERATE" : "WEAK"; return `<tr><td style="padding:10px 0;border-bottom:1px solid #d8d1c6"><p style="margin:0 0 3px;font-size:16px;line-height:1.35;font-weight:700;color:#1d2421">${name} <span style="font-weight:400">·</span> ${escapeHtml(String(score))}% <span style="font-size:11px;letter-spacing:.08em;color:#9d461b">· ${label}</span></p><p style="margin:0;font-size:13px;line-height:1.45;color:#53605a">${definition}</p></td></tr>`; }).join("");
	const responseHtml = gripDimensions.map(([name], index) => { const score = scores.dimensionScores[index]; const label = score >= 80 ? "STRONG" : score >= 50 ? "MODERATE" : "WEAK"; const labelColor = score >= 80 ? "#172627" : score >= 50 ? "#9a4328" : "#d96b18"; const answers = responsesAreValid ? scores.responses.filter((response) => response.dimensionIndex === index).map((response) => `<div style="margin:10px 0 0;padding-left:14px;border-left:3px solid #d8d1c6"><p style="margin:0 0 4px;color:#53605a"><strong>Q:</strong> ${escapeHtml(response.question)}</p><p style="margin:0;font-weight:700;color:#1d2421"><strong>A:</strong> ${escapeHtml(response.selectedOption)}</p></div>`).join("") : "<div style=\"margin:10px 0 0;padding-left:14px;border-left:3px solid #d8d1c6\"><p style=\"margin:0;color:#53605a\">Answers unavailable</p></div>"; return `<h3 style="margin:22px 0 0;font-size:16px;line-height:1.35;color:#1d2421">${escapeHtml(name)} <span style="font-weight:400">·</span> ${escapeHtml(String(score))}% <span style="font-size:11px;letter-spacing:.08em;color:${labelColor}">· ${label}</span></h3>${answers}`; }).join("");
	const internalHtml = `<h1>Grip Check result</h1><p><strong>Internal use only. Do not forward to the participant.</strong></p><h2>Demographic</h2><p>1. <strong>Name:</strong> ${safe.firstName} ${safe.lastName}</p><p>2. <strong>Perspective:</strong> ${internalPerspective}</p><p>3. <strong>Position / role:</strong> ${safe.position}</p><p>4. <strong>Response required:</strong> ${reviewStatus}</p><p>5. <strong>Email:</strong> ${safe.email}</p><p>6. <strong>Context:</strong> ${safe.context.replace(/\n/g,"<br>")}</p><p>7. <strong>Organization name:</strong> ${safe.organizationName}</p><p>8. <strong>Organization size:</strong> ${safe.organizationSize}</p><hr><h2>Grip Check result</h2><p style="margin:0;font-size:42px;line-height:1;font-weight:700;color:#1d2421">${safe.composite}<span style="font-size:20px;font-weight:400">/100</span></p>${responseHtml}<hr><h2>Technical</h2><p>IP: ${safeIp}</p><p>User-Agent: ${safeUserAgent}</p>`;
	try { await sendEmail(env, { from: "gripcheck@3back.com", to: [email], subject: userSubject, html: `<div style="margin:0;padding:0;background:#f7f3eb;font-family:Arial,sans-serif;color:#1d2421"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f3eb"><tr><td style="padding:20px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;margin:0 auto"><tr><td style="padding:0 0 16px;border-bottom:3px solid #c45c26"><p style="margin:0;font-size:16px;line-height:1.5;color:#1d2421">${userOpening}</p></td></tr><tr><td style="padding:20px 0 16px"><p style="margin:0 0 6px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9d461b">Composite Grip Score for ${perspective}</p><p style="margin:0;font-size:52px;line-height:1;font-weight:700;color:#1d2421">${safe.composite}<span style="font-size:22px;font-weight:400">/100</span></p></td></tr><tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${dimensionHtml}</table></td></tr><tr><td style="padding:18px 0 0"><p style="margin:0;font-size:16px;line-height:1.6;color:#1d2421">${userFollowUp}</p></td></tr><tr><td style="padding:20px 0 0"><p style="margin:0;font-size:14px;line-height:1.6;color:#1d2421"><strong style="font-size:21px"><span style="color:#c45c26">3</span>Back</strong><br>The Team Execution Company<br><a href="mailto:gripcheck@3back.com" style="color:#1d2421;text-decoration:underline">gripcheck@3back.com</a><br><a href="https://3back.com" style="color:#1d2421;text-decoration:underline">3back.com</a><br><a href="tel:+18553232225" style="color:#1d2421;text-decoration:underline">(855) 323-2225</a></p></td></tr></table></td></tr></table></div>` }); await sendEmail(env, { from: "gripcheck@3back.com", to: ["gripcheckscores@3back.com"], reply_to: email, subject: `[GripCheck] ${safe.firstName} ${safe.lastName} · ${safe.organizationName} · ${safe.composite}`, html: internalHtml, attachments: [{ filename: "3Back-Grip-Check-Question-Bank-v0.1.pdf", content: arrayBufferToBase64(gripCheckQuestionBankPdf), content_type: "application/pdf" }] }); } catch { return json({ error: "We could not send your results. Please try again shortly." }, 502); }
	return json({ ok: true });
}
export default { async fetch(request, env) { const url = new URL(request.url); if (url.pathname === CONTACT_PATH) return handleContact(request, env); if (url.pathname === PAPER_PATH) return handlePaperRequest(request, env); if (url.pathname === GRIP_CHECK_PATH) return handleGripCheck(request, env); return env.ASSETS.fetch(request); } };
