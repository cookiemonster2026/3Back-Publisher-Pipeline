const SCRIPT_NAME = "3back-publisher-pipeline";
const TEN_MINUTES = 600;

function json(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": status === 200 ? `public, max-age=${TEN_MINUTES}` : "no-store",
			"x-robots-tag": "noindex, nofollow",
		},
	});
}

export function deploymentDescription(value) {
	const firstLine = String(value || "").split(/\r?\n/, 1)[0]
		.replace(/\bhttps?:\/\/\S+/gi, "")
		.replace(/\b[0-9a-f]{7,40}\b/gi, "")
		.replace(/\s*\(#\d+\)\s*$/i, "")
		.replace(/^(?:feat|fix|docs|style|refactor|perf|test|build|ci|chore)(?:\([^)]*\))?!?:\s*/i, "")
		.replace(/\s+/g, " ")
		.trim();
	return (firstLine || "Production site deployed").split(" ").slice(0, 10).join(" ");
}

export async function handleDeploymentHistory(request, env) {
	if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
	if (!env.CLOUDFLARE_ACCOUNT_ID || !env.CLOUDFLARE_API_TOKEN) return json({ error: "Deployment history unavailable" }, 503);

	try {
		const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(env.CLOUDFLARE_ACCOUNT_ID)}/workers/scripts/${SCRIPT_NAME}/deployments`;
		const response = await fetch(endpoint, { headers: { authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}` } });
		if (!response.ok) return json({ error: "Deployment history unavailable" }, 503);
		const body = await response.json();
		if (!body?.success || !Array.isArray(body.result?.deployments)) return json({ error: "Deployment history unavailable" }, 503);

		const deployments = body.result.deployments.slice(0, 20).flatMap((deployment) => {
			const createdAt = new Date(deployment?.created_on);
			if (Number.isNaN(createdAt.getTime())) return [];
			return [{ createdAt: createdAt.toISOString(), description: deploymentDescription(deployment?.annotations?.["workers/message"]) }];
		});
		return json({ deployments });
	} catch {
		return json({ error: "Deployment history unavailable" }, 503);
	}
}
