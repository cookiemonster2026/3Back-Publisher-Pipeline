import type { APIRoute } from "astro";
import { isProductionSeoEnvironment, SITE_ORIGIN } from "../seo/registry.mjs";

export const GET: APIRoute = () => {
	const isProduction = isProductionSeoEnvironment(process.env.SEO_BUILD_ENV);
	const body = isProduction
		? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap-index.xml\n`
		: "User-agent: *\nDisallow: /\n";

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
