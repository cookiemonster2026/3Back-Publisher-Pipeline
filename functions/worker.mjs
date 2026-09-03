import { questions } from "../src/data/grip-check-questions.js";

const CONTACT_PATH = "/api/contact";
const BIO_CONTACT_PATH = "/api/bio-contact";
const CSM_PRIVATE_REQUEST_PATH = "/api/csm-private-request";
const CSPO_PRIVATE_REQUEST_PATH = "/api/cspo-private-request";
const DOMAIN_GUIDES_PATH = "/api/domain-guides";
const PAPER_PATH = "/api/papers/no-head-works-alone";
const GRIP_CHECK_PATH = "/api/grip-check";
const GONE_PATHS = new Set([
	"/llms.txt",
	"/llm.txt",
	"/process/scrum-dictionary-",
	"/infographic/anatomy-of-a-retrospective",
	"/scrum-patterns/the-release-sprint-how-to-get-the-product-out-the-door",
	"/scrum-guidebook",
	"/remote-scrum-teams/covid-19-impact-on-remote-scrum-team-health",
	"/people/scrummaster/why-the-boss-should-never-be-the-scrummaster",
	"/scrummaster/full-time-scrummaster",
	"/scrum-industry-terms/the-4-types-of-technical-debt",
	"/people/scrummaster/scrummaster-infographic"
]);
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
async function fetchPublicPdf(request, env, path) {
	const response = await env.ASSETS.fetch(new Request(new URL(path, request.url)));
	if (!response.ok) throw new Error("PDF asset could not be fetched.");
	return response.arrayBuffer();
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
async function handleBioContact(request, env) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	const requestUrl = new URL(request.url); const origin = request.headers.get("origin");
	if (origin && origin !== requestUrl.origin) return json({ error: "Invalid request origin." }, 403);
	if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY) return json({ error: "The contact form is not configured yet." }, 503);
	const form = await request.formData(); const firstName = clean(form.get("first_name"), 80); const lastName = clean(form.get("last_name"), 80); const email = clean(form.get("email"), 254).toLowerCase(); const confirmEmail = clean(form.get("confirm_email"), 254).toLowerCase(); const note = clean(form.get("note"), 4000); const instructorSlug = clean(form.get("instructor_slug"), 80); const instructorName = clean(form.get("instructor_name"), 160); const token = clean(form.get("cf-turnstile-response"), 2048);
	if (!firstName || !lastName || !email || email !== confirmEmail || !note || !instructorSlug || !instructorName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Complete all fields with matching valid email addresses." }, 400);
	if (!await verifyTurnstile(request, env, token)) return json({ error: "The security check could not be verified. Please try again." }, 400);
	const safeFirstName = escapeHtml(firstName); const safeLastName = escapeHtml(lastName); const safeEmail = escapeHtml(email); const safeNote = escapeHtml(note).replace(/\n/g, "<br>"); const safeInstructorName = escapeHtml(instructorName); const safeInstructorSlug = escapeHtml(instructorSlug);
	try { await sendEmail(env, { from: env.CONTACT_FROM_EMAIL || "noreply@3back.com", to: ["biocontacts@3back.com"], reply_to: email, subject: `[Instructor bio] ${instructorName}: ${firstName} ${lastName}`, html: `<h1>Instructor bio inquiry</h1><p><strong>Instructor:</strong> ${safeInstructorName}</p><p><strong>Instructor slug:</strong> ${safeInstructorSlug}</p><p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Note:</strong><br>${safeNote}</p>` }); } catch { return json({ error: "We could not send your note. Please try again." }, 502); }
	return json({ ok: true });
}
async function handleDomainGuides(request, env) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	const requestUrl = new URL(request.url); const origin = request.headers.get("origin");
	if (origin && origin !== requestUrl.origin) return json({ error: "Invalid request origin." }, 403);
	if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY) return json({ error: "The form is not configured yet." }, 503);
	const form = await request.formData(); const firstName = clean(form.get("first_name"), 80); const lastName = clean(form.get("last_name"), 80); const email = clean(form.get("email"), 254).toLowerCase(); const confirmEmail = clean(form.get("confirm_email"), 254).toLowerCase(); const organization = clean(form.get("organization"), 160); const note = clean(form.get("note"), 4000); const phone = clean(form.get("phone"), 60); const token = clean(form.get("cf-turnstile-response"), 2048);
	if (!firstName || !lastName || !email || email !== confirmEmail || !organization || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Complete all required fields with matching valid email addresses." }, 400);
	if (!token) return json({ error: "Please complete the security check and try again." }, 400);
	if (!await verifyTurnstile(request, env, token)) return json({ error: "The security check could not be verified. Please try again." }, 400);
	const safeFirstName = escapeHtml(firstName); const safeLastName = escapeHtml(lastName); const safeEmail = escapeHtml(email); const safeOrganization = escapeHtml(organization); const safeNote = escapeHtml(note || "Not provided").replace(/\n/g, "<br>"); const safePhone = escapeHtml(phone || "Not provided"); const timestamp = new Date().toISOString(); const safeIp = escapeHtml(clean(request.headers.get("CF-Connecting-IP"), 100) || "Not available"); const safeUserAgent = escapeHtml(clean(request.headers.get("User-Agent"), 300) || "Not available"); const fromAddress = env.CONTACT_FROM_EMAIL || "noreply@3back.com";
	try {
		await sendEmail(env, { from: fromAddress, to: ["domainguides@3back.com"], reply_to: email, subject: `[Domain Guides] ${firstName} ${lastName} — ${organization}`, html: `<h1>Domain Guides request</h1><p><strong>First name:</strong> ${safeFirstName}</p><p><strong>Last name:</strong> ${safeLastName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Organization:</strong> ${safeOrganization}</p><p><strong>What should we know?:</strong><br>${safeNote}</p><p><strong>Phone:</strong> ${safePhone}</p><hr><p><strong>Date:</strong> ${timestamp}</p><p><strong>IP:</strong> ${safeIp}</p><p><strong>User-Agent:</strong> ${safeUserAgent}</p>` });
		await sendEmail(env, { from: "3Back Domain Guides <domainguides@3back.com>", to: [email], reply_to: "domainguides@3back.com", subject: "We received your Domain Guides inquiry", html: `<div style="margin:0;padding:0;background:#f5f0e7;font-family:Arial,sans-serif;color:#1d2421"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f0e7"><tr><td style="padding:28px 16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;margin:0 auto"><tr><td style="padding:0 0 18px;border-top:3px solid #d96b18"><p style="margin:20px 0 0;font-size:17px;line-height:1.55;color:#1d2421"><strong>${safeFirstName},</strong></p></td></tr><tr><td style="padding:0 0 20px"><p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#1d2421">Thanks for reaching out about the Domain Guides Program.</p><p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#1d2421">We’ll review what you shared and get back to you to set up a short conversation. The first call is about 30 minutes. We’ll use it to understand what you’re trying to improve, what is happening in the work now, and whether the Domain Guides Program is worth exploring further.</p><p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#1d2421">There is nothing to prepare.</p><p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#1d2421">If there appears to be a fit, we’ll agree on the next step together. We do not require you to commit to the full program up front.</p><p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#1d2421">If you think of anything else that would be useful for us to understand before we speak, please reply to this email and send it along.</p><p style="margin:0;font-size:16px;line-height:1.6;color:#1d2421">We look forward to speaking with you.</p></td></tr><tr><td style="padding:18px 0 0;border-top:1px solid #d8d1c6"><p style="margin:0;font-size:14px;line-height:1.55;color:#1d2421"><strong style="font-size:20px"><span style="color:#d96b18">3</span>Back</strong><br>The Team Execution Company</p></td></tr></table></td></tr></table></div>` });
	} catch { return json({ error: "We could not send your request. Please try again." }, 502); }
	return json({ ok: true });
}
async function handleCsmPrivateRequest(request, env) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	const requestUrl = new URL(request.url); const origin = request.headers.get("origin");
	if (origin && origin !== requestUrl.origin) return json({ error: "Invalid request origin." }, 403);
	if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY) return json({ error: "The private course request form is not configured yet." }, 503);
	const form = await request.formData(); const firstName = clean(form.get("first_name"), 80); const lastName = clean(form.get("last_name"), 80); const email = clean(form.get("email"), 254).toLowerCase(); const confirmEmail = clean(form.get("confirm_email"), 254).toLowerCase(); const companyName = clean(form.get("company_name"), 160); const note = clean(form.get("note"), 4000); const token = clean(form.get("cf-turnstile-response"), 2048);
	if (!firstName || !lastName || !email || email !== confirmEmail || !companyName || !note || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Complete all fields with matching valid email addresses." }, 400);
	if (!await verifyTurnstile(request, env, token)) return json({ error: "The security check could not be verified. Please try again." }, 400);
	const safeFirstName = escapeHtml(firstName); const safeLastName = escapeHtml(lastName); const safeEmail = escapeHtml(email); const safeCompanyName = escapeHtml(companyName); const safeNote = escapeHtml(note).replace(/\n/g, "<br>"); const timestamp = new Date().toISOString();
	try { await sendEmail(env, { from: env.CONTACT_FROM_EMAIL || "noreply@3back.com", to: ["requestonsitecourse@3back.com"], reply_to: email, subject: `[CSM private request] ${firstName} ${lastName} · ${companyName}`, html: `<h1>CSM private course request</h1><p><strong>Source page:</strong> /certified-scrummaster-training</p><p><strong>Timestamp:</strong> ${timestamp}</p><p><strong>First name:</strong> ${safeFirstName}</p><p><strong>Last name:</strong> ${safeLastName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Company name:</strong> ${safeCompanyName}</p><p><strong>Note:</strong><br>${safeNote}</p>` }); } catch { return json({ error: "We could not send your request. Please try again." }, 502); }
	return json({ ok: true });
}
async function handleCspoPrivateRequest(request, env) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	const requestUrl = new URL(request.url); const origin = request.headers.get("origin");
	if (origin && origin !== requestUrl.origin) return json({ error: "Invalid request origin." }, 403);
	if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY) return json({ error: "The private course request form is not configured yet." }, 503);
	const form = await request.formData(); const firstName = clean(form.get("first_name"), 80); const lastName = clean(form.get("last_name"), 80); const email = clean(form.get("email"), 254).toLowerCase(); const confirmEmail = clean(form.get("confirm_email"), 254).toLowerCase(); const companyName = clean(form.get("company_name"), 160); const note = clean(form.get("note"), 4000); const token = clean(form.get("cf-turnstile-response"), 2048);
	if (!firstName || !lastName || !email || email !== confirmEmail || !companyName || !note || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Complete all fields with matching valid email addresses." }, 400);
	if (!await verifyTurnstile(request, env, token)) return json({ error: "The security check could not be verified. Please try again." }, 400);
	const safeFirstName = escapeHtml(firstName); const safeLastName = escapeHtml(lastName); const safeEmail = escapeHtml(email); const safeCompanyName = escapeHtml(companyName); const safeNote = escapeHtml(note).replace(/\n/g, "<br>"); const timestamp = new Date().toISOString();
	try { await sendEmail(env, { from: env.CONTACT_FROM_EMAIL || "noreply@3back.com", to: ["requestonsitecourse@3back.com"], reply_to: email, subject: `[CSPO private request] ${firstName} ${lastName} · ${companyName}`, html: `<h1>CSPO private course request</h1><p><strong>Source page:</strong> /certified-scrum-product-owner-training</p><p><strong>Timestamp:</strong> ${timestamp}</p><p><strong>First name:</strong> ${safeFirstName}</p><p><strong>Last name:</strong> ${safeLastName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Company name:</strong> ${safeCompanyName}</p><p><strong>Note:</strong><br>${safeNote}</p>` }); } catch { return json({ error: "We could not send your request. Please try again." }, 502); }
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
		const paperPdf = await fetchPublicPdf(request, env, "/assets/papers/3Back-No-Head-Works-Alone-v1.49.pdf");
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
	try { const gripCheckQuestionBankPdf = await fetchPublicPdf(request, env, "/assets/grip-check/3Back-Grip-Check-Question-Bank-v0.1.pdf"); await sendEmail(env, { from: "gripcheck@3back.com", to: [email], subject: userSubject, html: `<div style="margin:0;padding:0;background:#f7f3eb;font-family:Arial,sans-serif;color:#1d2421"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f3eb"><tr><td style="padding:20px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;margin:0 auto"><tr><td style="padding:0 0 16px;border-bottom:3px solid #c45c26"><p style="margin:0;font-size:16px;line-height:1.5;color:#1d2421">${userOpening}</p></td></tr><tr><td style="padding:20px 0 16px"><p style="margin:0 0 6px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9d461b">Composite Grip Score for ${perspective}</p><p style="margin:0;font-size:52px;line-height:1;font-weight:700;color:#1d2421">${safe.composite}<span style="font-size:22px;font-weight:400">/100</span></p></td></tr><tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${dimensionHtml}</table></td></tr><tr><td style="padding:18px 0 0"><p style="margin:0;font-size:16px;line-height:1.6;color:#1d2421">${userFollowUp}</p></td></tr><tr><td style="padding:20px 0 0"><p style="margin:0;font-size:14px;line-height:1.6;color:#1d2421"><strong style="font-size:21px"><span style="color:#c45c26">3</span>Back</strong><br>The Team Execution Company<br><a href="mailto:gripcheck@3back.com" style="color:#1d2421;text-decoration:underline">gripcheck@3back.com</a><br><a href="https://3back.com" style="color:#1d2421;text-decoration:underline">3back.com</a><br><a href="tel:+18553232225" style="color:#1d2421;text-decoration:underline">(855) 323-2225</a></p></td></tr></table></td></tr></table></div>` }); await sendEmail(env, { from: "gripcheck@3back.com", to: ["gripcheckscores@3back.com"], reply_to: email, subject: `[GripCheck] ${safe.firstName} ${safe.lastName} · ${safe.organizationName} · ${safe.composite}`, html: internalHtml, attachments: [{ filename: "3Back-Grip-Check-Question-Bank-v0.1.pdf", content: arrayBufferToBase64(gripCheckQuestionBankPdf), content_type: "application/pdf" }] }); } catch { return json({ error: "We could not send your results. Please try again shortly." }, 502); }
	return json({ ok: true });
}
export default { async fetch(request, env) { const url = new URL(request.url); if (url.pathname === CONTACT_PATH) return handleContact(request, env); if (url.pathname === BIO_CONTACT_PATH) return handleBioContact(request, env); if (url.pathname === CSM_PRIVATE_REQUEST_PATH) return handleCsmPrivateRequest(request, env); if (url.pathname === CSPO_PRIVATE_REQUEST_PATH) return handleCspoPrivateRequest(request, env); if (url.pathname === DOMAIN_GUIDES_PATH) return handleDomainGuides(request, env); if (url.pathname === PAPER_PATH) return handlePaperRequest(request, env); if (url.pathname === GRIP_CHECK_PATH) return handleGripCheck(request, env); const normalizedPath = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname; if (GONE_PATHS.has(normalizedPath)) return new Response(null, { status: 410, headers: { "cache-control": "public, max-age=3600" } }); return env.ASSETS.fetch(request); } };
