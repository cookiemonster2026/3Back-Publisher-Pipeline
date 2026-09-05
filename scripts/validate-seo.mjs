import { existsSync, readFileSync, readdirSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import {
	canonicalUrl,
	HOMEPAGE_OPERATIONAL_GRIP_EXPLANATION,
	OPERATIONAL_GRIP_ATTRIBUTION,
	OPERATIONAL_GRIP_DEFINITION,
	pageSeo,
	SITE_ORIGIN,
} from "../src/seo/registry.mjs";

const environmentFlagIndex = process.argv.indexOf("--environment");
const environment = environmentFlagIndex >= 0 ? process.argv[environmentFlagIndex + 1] : "production";

if (!new Set(["production", "test"]).has(environment)) {
	console.error("SEO validation error: --environment must be production or test.");
	process.exit(1);
}

const projectRoot = resolve(import.meta.dirname, "..");
const distRoot = resolve(projectRoot, "dist");
const publicRoot = resolve(projectRoot, "public");
const errors = [];
const structuredDataByRoute = new Map();

function walk(directory, extension) {
	if (!existsSync(directory)) return [];
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = resolve(directory, entry.name);
		return entry.isDirectory() ? walk(path, extension) : entry.name.endsWith(extension) ? [path] : [];
	});
}

function decodeHtml(value) {
	return value
		.replaceAll("&amp;", "&")
		.replaceAll("&quot;", '"')
		.replaceAll("&#39;", "'")
		.replaceAll("&apos;", "'")
		.replaceAll("&lt;", "<")
		.replaceAll("&gt;", ">");
}

function attributes(tag) {
	const parsed = {};
	for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)) {
		parsed[match[1]] = decodeHtml(match[3]);
	}
	return parsed;
}

function findMeta(head, key, value) {
	for (const match of head.matchAll(/<meta\s+[^>]*>/gi)) {
		const attrs = attributes(match[0]);
		if (attrs[key] === value) return attrs.content;
	}
	return undefined;
}

function findLink(head, rel) {
	for (const match of head.matchAll(/<link\s+[^>]*>/gi)) {
		const attrs = attributes(match[0]);
		if (attrs.rel === rel) return attrs.href;
	}
	return undefined;
}

function routeFromHtml(file) {
	const outputPath = relative(distRoot, file).split(sep).join("/");
	if (outputPath === "index.html") return "/";
	if (outputPath.endsWith("/index.html")) return `/${outputPath.slice(0, -"/index.html".length)}`;
	return `/${outputPath.slice(0, -".html".length)}`;
}

function expectEqual(route, label, actual, expected) {
	if (actual !== expected) {
		errors.push(`${route}: ${label} expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}.`);
	}
}

function renderedText(html) {
	return decodeHtml(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function textByClass(html, className) {
	const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const match = html.match(new RegExp(`<([a-z][\\w-]*)\\b[^>]*class=["'][^"']*\\b${escapedClass}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/\\1>`, "i"));
	return match ? renderedText(match[2]) : undefined;
}

function validateRegistry() {
	for (const [route, metadata] of Object.entries(pageSeo)) {
		expectEqual(route, "registry path", metadata.path, route);
		for (const [label, value] of [
			["title", metadata.title],
			["description", metadata.description],
			["social title", metadata.social?.title],
			["social description", metadata.social?.description],
			["social type", metadata.social?.type],
		]) {
			if (typeof value !== "string" || value.trim() === "") errors.push(`${route}: missing required ${label}.`);
		}

		if (metadata.status === "stub") {
			if (metadata.indexability !== "noindex, nofollow") errors.push(`${route}: stub pages must declare noindex, nofollow.`);
			if (!Array.isArray(metadata.missingWork) || metadata.missingWork.length === 0) errors.push(`${route}: stub pages must identify missing work.`);
		}
		if (!new Set(["complete", "stub"]).has(metadata.status)) errors.push(`${route}: invalid or missing page status.`);

		if (metadata.productionRobots && (metadata.status !== "complete" || metadata.indexability !== "index, follow" || metadata.productionRobots !== "index, follow, max-image-preview:large, max-snippet:-1")) errors.push(`${route}: invalid production robots override.`);

		const image = metadata.social?.image;
		if (image) {
			if (!existsSync(resolve(publicRoot, image.src.replace(/^\//, "")))) errors.push(`${route}: social image does not exist at ${image.src}.`);
			if (!image.alt || !image.width || !image.height || !image.type) errors.push(`${route}: social image metadata is incomplete.`);
		}
	}
}

function validateStructuredData(route, head) {
	const scripts = [...head.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
	if (environment === "test") {
		if (scripts.length > 0) errors.push(`${route}: test output must not emit production structured data.`);
		return;
	}

	if (route === "/training/scrum-mastering-1") {
		if (scripts.length !== 1) { errors.push(`${route}: expected exactly one course graph.`); return; }
		try {
			const actual = JSON.parse(scripts[0][1]);
			expectEqual(route, "approved course graph", JSON.stringify(actual), JSON.stringify(pageSeo[route].structuredData));
			const graph = actual["@graph"];
			const expectedTypes = ["Organization", "WebSite", "WebPage", "BreadcrumbList", "Course", "CourseInstance", "EducationalOccupationalCredential", "Book"];
			expectEqual(route, "course graph node types", JSON.stringify(graph.map(node => node["@type"])), JSON.stringify(expectedTypes));
			const course = graph.find(node => node["@type"] === "Course");
			const instance = graph.find(node => node["@type"] === "CourseInstance");
			if (course.syllabusSections.length !== 15) errors.push(`${route}: expected 15 syllabus sections.`);
			for (const key of ["offers", "instructor", "startDate", "courseWorkload", "timeRequired"]) {
				if (Object.hasOwn(course, key) || Object.hasOwn(instance, key)) errors.push(`${route}: unsupported ${key}.`);
			}
			if (/"@type"\s*:\s*"(?:Offer|ItemList|FAQPage|Review|AggregateRating)"/.test(scripts[0][1])) errors.push(`${route}: excluded schema node.`);
			for (const type of ["Organization", "WebSite"]) {
				const home = pageSeo["/"].structuredData["@graph"].find(node => node["@type"] === type);
				expectEqual(route, `${type} shared identifier`, graph.find(node => node["@type"] === type)["@id"], home["@id"]);
			}
		} catch (error) { errors.push(`${route}: invalid course graph (${error.message}).`); }
		return;
	}

	if (!new Set(["/", "/operational-grip", "/about-us"]).has(route)) return;
	if (scripts.length !== 1) {
		errors.push(`${route}: expected one JSON-LD graph, received ${scripts.length}.`);
		return;
	}

	try {
		const data = JSON.parse(scripts[0][1]);
		structuredDataByRoute.set(route, data);
		expectEqual(route, "JSON-LD context", data["@context"], "https://schema.org");
		if (!Array.isArray(data["@graph"])) throw new Error("@graph is not an array");
		const byType = Object.fromEntries(data["@graph"].map((node) => [node["@type"], node]));
		const requiredTypes = route === "/"
			? ["Organization", "WebSite", "WebPage"]
			: route === "/operational-grip"
				? ["Organization", "WebSite", "ImageObject", "WebPage", "DefinedTerm"]
				: ["Organization", "WebSite", "ImageObject", "AboutPage"];
		const unexpectedTypes = data["@graph"].map((node) => node["@type"]).filter((type) => !requiredTypes.includes(type));
		if (unexpectedTypes.length > 0) errors.push(`${route}: JSON-LD has unexpected schema type(s): ${unexpectedTypes.join(", ")}.`);
		for (const type of requiredTypes) {
			if (!byType[type]) errors.push(`${route}: JSON-LD is missing ${type}.`);
			else if (!byType[type]["@id"]) errors.push(`${route}: JSON-LD ${type} is missing @id.`);
		}
		const organization = byType.Organization;
		const website = byType.WebSite;
		const image = byType.ImageObject;
		const page = byType.WebPage ?? byType.AboutPage;
		const term = byType.DefinedTerm;
		if (organization && website) expectEqual(route, "WebSite publisher @id", website.publisher?.["@id"], organization["@id"]);
		if (website && page) expectEqual(route, "page isPartOf @id", page.isPartOf?.["@id"], website["@id"]);
		if (organization && page && route !== "/about-us") expectEqual(route, "page publisher @id", page.publisher?.["@id"], organization["@id"]);
		if (image && page) expectEqual(route, "WebPage primaryImageOfPage @id", page.primaryImageOfPage?.["@id"], image["@id"]);
		if (term && page) {
			expectEqual(route, "WebPage mainEntity @id", page.mainEntity?.["@id"], term["@id"]);
			expectEqual(route, "DefinedTerm mainEntityOfPage @id", term.mainEntityOfPage?.["@id"], page["@id"]);
			if (Object.hasOwn(term, "owner")) errors.push(`${route}: DefinedTerm must not use an owner property.`);
		}
		if (route === "/operational-grip" && term) {
			expectEqual(route, "DefinedTerm description", term.description, OPERATIONAL_GRIP_DEFINITION);
		}
	} catch (error) {
		errors.push(`${route}: invalid JSON-LD (${error.message}).`);
	}
}

function validateHtml() {
	const htmlFiles = walk(distRoot, ".html");
	const builtRoutes = new Set(htmlFiles.map(routeFromHtml));

	for (const route of Object.keys(pageSeo)) {
		if (!builtRoutes.has(route)) errors.push(`${route}: metadata is declared but the built HTML route is missing.`);
	}

	for (const file of htmlFiles) {
		const route = routeFromHtml(file);
		const metadata = pageSeo[route];
		if (!metadata) {
			errors.push(`${route}: public HTML route has no SEO metadata declaration. Declare it complete or explicitly classify it as a stub.`);
			continue;
		}

		const html = readFileSync(file, "utf8");
		const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
		const title = decodeHtml(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
		const expectedRobots = environment === "production" ? (metadata.productionRobots ?? metadata.indexability) : "noindex, nofollow";
		const expectedCanonical = canonicalUrl(metadata.path);

		expectEqual(route, "title", title, metadata.title);
		expectEqual(route, "description", findMeta(head, "name", "description"), metadata.description);
		expectEqual(route, "robots", findMeta(head, "name", "robots"), expectedRobots);
		expectEqual(route, "googlebot", findMeta(head, "name", "googlebot"), expectedRobots);
		expectEqual(route, "canonical", findLink(head, "canonical"), expectedCanonical);
		expectEqual(route, "Open Graph type", findMeta(head, "property", "og:type"), metadata.social.type);
		expectEqual(route, "Open Graph site name", findMeta(head, "property", "og:site_name"), "3Back");
		expectEqual(route, "Open Graph locale", findMeta(head, "property", "og:locale"), "en_US");
		expectEqual(route, "Open Graph title", findMeta(head, "property", "og:title"), metadata.social.title);
		expectEqual(route, "Open Graph description", findMeta(head, "property", "og:description"), metadata.social.description);
		expectEqual(route, "Open Graph URL", findMeta(head, "property", "og:url"), expectedCanonical);
		expectEqual(route, "X card", findMeta(head, "name", "twitter:card"), metadata.social.image ? "summary_large_image" : "summary");
		expectEqual(route, "X title", findMeta(head, "name", "twitter:title"), metadata.social.title);
		expectEqual(route, "X description", findMeta(head, "name", "twitter:description"), metadata.social.description);
		expectEqual(route, "sitemap discovery link", findLink(head, "sitemap"), environment === "production" ? "/sitemap-index.xml" : undefined);

		if (metadata.social.image) {
			const expectedImage = canonicalUrl(metadata.social.image.src);
			expectEqual(route, "Open Graph image", findMeta(head, "property", "og:image"), expectedImage);
			expectEqual(route, "Open Graph secure image", findMeta(head, "property", "og:image:secure_url"), expectedImage);
			expectEqual(route, "Open Graph image type", findMeta(head, "property", "og:image:type"), metadata.social.image.type);
			expectEqual(route, "Open Graph image width", findMeta(head, "property", "og:image:width"), String(metadata.social.image.width));
			expectEqual(route, "Open Graph image height", findMeta(head, "property", "og:image:height"), String(metadata.social.image.height));
			expectEqual(route, "Open Graph image alt", findMeta(head, "property", "og:image:alt"), metadata.social.image.alt);
			expectEqual(route, "X image", findMeta(head, "name", "twitter:image"), expectedImage);
			expectEqual(route, "X image alt", findMeta(head, "name", "twitter:image:alt"), metadata.social.image.alt);
		}

		validateStructuredData(route, head);

		if (route === "/operational-grip") {
			expectEqual(route, "rendered canonical Operational Grip definition", textByClass(html, "definition-copy"), OPERATIONAL_GRIP_DEFINITION);
			expectEqual(route, "rendered Operational Grip attribution", textByClass(html, "operational-grip-attribution"), OPERATIONAL_GRIP_ATTRIBUTION);
		}
		if (route === "/") {
			const explanation = textByClass(html, "operational-grip-explanation");
			expectEqual(route, "rendered Operational Grip explanation", explanation, HOMEPAGE_OPERATIONAL_GRIP_EXPLANATION);
			if (explanation?.startsWith("Operational Grip is ")) errors.push("/: homepage Operational Grip explanation must not be presented as a competing definition.");
		}
	}

	if (environment === "production") {
		const homepageGraph = structuredDataByRoute.get("/")?.["@graph"] ?? [];
	const operationalGripGraph = structuredDataByRoute.get("/operational-grip")?.["@graph"] ?? [];
	const aboutUsGraph = structuredDataByRoute.get("/about-us")?.["@graph"] ?? [];
	for (const type of ["Organization", "WebSite"]) {
		const homepageNode = homepageGraph.find((node) => node["@type"] === type);
		for (const [route, graph] of [["/operational-grip", operationalGripGraph], ["/about-us", aboutUsGraph]]) {
			const node = graph.find((entry) => entry["@type"] === type);
			expectEqual("/", `${type} @id shared with ${route}`, homepageNode?.["@id"], node?.["@id"]);
		}
		}
		const term = operationalGripGraph.find((node) => node["@type"] === "DefinedTerm");
		expectEqual("/operational-grip", "rendered definition matches DefinedTerm description", textByClass(readFileSync(resolve(distRoot, "operational-grip", "index.html"), "utf8"), "definition-copy"), term?.description);
	}
}

function validateRobotsAndSitemap() {
	const robotsPath = resolve(distRoot, "robots.txt");
	if (!existsSync(robotsPath)) {
		errors.push("robots.txt: generated file is missing.");
		return;
	}
	const robots = readFileSync(robotsPath, "utf8");
	if (environment === "production") {
		if (!robots.includes("Allow: /")) errors.push("robots.txt: production output must allow crawling.");
		if (!robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap-index.xml`)) errors.push("robots.txt: production sitemap reference is missing or incorrect.");
	} else {
		if (!robots.includes("Disallow: /")) errors.push("robots.txt: test output must disallow all crawling.");
		if (/^Sitemap:/m.test(robots)) errors.push("robots.txt: test output must not advertise a production sitemap.");
	}

	const sitemapFiles = walk(distRoot, ".xml").filter((file) => /sitemap.*\.xml$/i.test(file));
	const sitemapXml = sitemapFiles.map((file) => readFileSync(file, "utf8")).join("\n");
	for (const redirect of ["/rsm1", "/courses/rsm-1"]) {
		if (sitemapXml.includes(`<loc>${canonicalUrl(redirect)}</loc>`)) errors.push(`${redirect}: redirect must not appear in sitemap.`);
	}
	for (const metadata of Object.values(pageSeo)) {
		const included = sitemapXml.includes(`<loc>${canonicalUrl(metadata.path)}</loc>`);
		if (environment === "production" && metadata.indexability === "index, follow" && !included) errors.push(`${metadata.path}: indexable production page is missing from the sitemap.`);
		if ((environment === "test" || metadata.indexability === "noindex, nofollow") && included) errors.push(`${metadata.path}: page must be excluded from the ${environment} sitemap.`);
	}
}

validateRegistry();
validateHtml();
validateRobotsAndSitemap();

console.log(`SEO validation environment: ${environment}`);
console.log("Intentional stub SEO to-dos:");
for (const metadata of Object.values(pageSeo).filter((entry) => entry.status === "stub")) {
	console.log(`- ${metadata.path} (${metadata.title}): ${metadata.missingWork.join("; ")}`);
}

if (errors.length > 0) {
	console.error(`\nSEO validation failed with ${errors.length} error(s):`);
	for (const error of errors) console.error(`- ${error}`);
	process.exit(1);
}

console.log("\nSEO validation passed. Stub entries remain intentional tracked to-dos.");
