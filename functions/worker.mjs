const CONTACT_PATH = "/api/contact";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_EMAIL_URL = "https://api.resend.com/emails";

function json(body, status = 200) { return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=UTF-8", "cache-control": "no-store" } }); }
function clean(value, limit) { return typeof value === "string" ? value.trim().slice(0, limit) : ""; }
function escapeHtml(value) { return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]); }
async function sendEmail(env, message) {
	const response = await fetch(RESEND_EMAIL_URL, { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify(message) });
	if (!response.ok) throw new Error("Email provider rejected the request.");
}
async function handleContact(request, env) {
	if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
	const requestUrl = new URL(request.url); const origin = request.headers.get("origin");
	if (origin && origin !== requestUrl.origin) return json({ error: "Invalid request origin." }, 403);
	if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) return json({ error: "The contact form is not configured yet." }, 503);
	const form = await request.formData(); const name = clean(form.get("name"), 160); const email = clean(form.get("email"), 254).toLowerCase(); const phone = clean(form.get("phone"), 60); const message = clean(form.get("message"), 4000); const token = clean(form.get("cf-turnstile-response"), 2048);
	if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Please provide your name and a valid email address." }, 400);
	if (!token) return json({ error: "Please complete the security check and try again." }, 400);
	const turnstileBody = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token }); const remoteIp = request.headers.get("CF-Connecting-IP"); if (remoteIp) turnstileBody.set("remoteip", remoteIp);
	const verification = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: turnstileBody }); const verificationResult = await verification.json().catch(() => null);
	if (!verification.ok || !verificationResult?.success) return json({ error: "The security check could not be verified. Please try again." }, 400);
	const notificationTo = env.CONTACT_NOTIFICATION_EMAIL || "og@3back.com"; const safeName = escapeHtml(name); const safeEmail = escapeHtml(email); const safePhone = escapeHtml(phone || "Not provided"); const safeMessage = escapeHtml(message || "Not provided").replace(/\n/g, "<br>");
	try {
		await sendEmail(env, { from: env.CONTACT_FROM_EMAIL, to: [notificationTo], reply_to: email, subject: `3Back contact: ${name}`, html: `<h1>New contact message</h1><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Phone:</strong> ${safePhone}</p><p><strong>Execution problem:</strong><br>${safeMessage}</p>` });
		await sendEmail(env, { from: env.CONTACT_FROM_EMAIL, to: [email], subject: "3Back received your message", html: "<p>Thank you. We received your message and will respond from og@3back.com.</p>" });
	} catch { return json({ error: "We could not send your message. Please call us instead." }, 502); }
	return json({ ok: true });
}
export default { async fetch(request, env) { const url = new URL(request.url); if (url.pathname === CONTACT_PATH) return handleContact(request, env); return env.ASSETS.fetch(request); } };
