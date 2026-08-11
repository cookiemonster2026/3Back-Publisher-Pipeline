// @ts-check

/** @typedef {import("./types").SeoMetadata} SeoMetadata */

export const SITE_ORIGIN = "https://3back.com";
export const PRODUCTION_SEO_ENVIRONMENT = "production";

const operationalGripPath = "/operational-grip";
const operationalGripUrl = `${SITE_ORIGIN}${operationalGripPath}`;
const organizationId = `${SITE_ORIGIN}/#organization`;
const websiteId = `${SITE_ORIGIN}/#website`;
const operationalGripPageId = `${operationalGripUrl}#webpage`;
const operationalGripImageId = `${operationalGripUrl}#primaryimage`;
const operationalGripTermId = `${operationalGripUrl}#term`;
const operationalGripImagePath = "/assets/operational-grip/og-page/07-operational-grip-chicago-lens.png";
const operationalGripImageUrl = `${SITE_ORIGIN}${operationalGripImagePath}`;
const operationalGripImageAlt = "A grayscale Chicago skyline viewed from Lake Michigan, with the Willis Tower area restored to sharp natural color through a handheld lens.";
const operationalGripDescription = "Operational Grip helps organizations find where execution has lost grip and make bounded changes that reveal what to do next.";
const operationalGripDefinition = "Operational Grip is the control discipline that enables intentional, local change with predictable effect without requiring global reasoning.";

/** @type {Readonly<Record<string, SeoMetadata>>} */
export const pageSeo = Object.freeze({
	"/": {
		status: "complete",
		path: "/",
		title: "3Back | The Team Execution Company",
		description: "3Back helps leaders find where organizational execution has lost grip and make bounded changes that reveal what to do next.",
		indexability: "index, follow",
		social: {
			title: "3Back | The Team Execution Company",
			description: "3Back helps leaders find where organizational execution has lost grip and make bounded changes that reveal what to do next.",
			type: "website",
		},
	},
	"/operational-grip": {
		status: "complete",
		path: operationalGripPath,
		title: "Operational Grip for Organizational Execution | 3Back",
		description: operationalGripDescription,
		indexability: "index, follow",
		social: {
			title: "Operational Grip for Organizational Execution | 3Back",
			description: operationalGripDescription,
			type: "website",
			image: {
				src: operationalGripImagePath,
				alt: operationalGripImageAlt,
				width: 1672,
				height: 941,
				type: "image/png",
			},
		},
		structuredData: {
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "Organization",
					"@id": organizationId,
					name: "3Back",
					url: `${SITE_ORIGIN}/`,
					slogan: "The Team Execution Company",
				},
				{
					"@type": "WebSite",
					"@id": websiteId,
					url: `${SITE_ORIGIN}/`,
					name: "3Back",
					inLanguage: "en-US",
					publisher: { "@id": organizationId },
				},
				{
					"@type": "ImageObject",
					"@id": operationalGripImageId,
					url: operationalGripImageUrl,
					contentUrl: operationalGripImageUrl,
					width: 1672,
					height: 941,
					caption: operationalGripImageAlt,
				},
				{
					"@type": "WebPage",
					"@id": operationalGripPageId,
					url: operationalGripUrl,
					name: "Operational Grip for Organizational Execution | 3Back",
					description: operationalGripDescription,
					inLanguage: "en-US",
					isPartOf: { "@id": websiteId },
					publisher: { "@id": organizationId },
					primaryImageOfPage: { "@id": operationalGripImageId },
					mainEntity: { "@id": operationalGripTermId },
				},
				{
					"@type": "DefinedTerm",
					"@id": operationalGripTermId,
					name: "Operational Grip",
					description: operationalGripDefinition,
					url: operationalGripUrl,
					mainEntityOfPage: { "@id": operationalGripPageId },
				},
			],
		},
	},
	"/policies": {
		status: "complete",
		path: "/policies",
		title: "Course Policies | 3Back",
		description: "Course policies for 3Back On-Demand, In-Person, and Live Online Public Courses.",
		indexability: "index, follow",
		social: {
			title: "Course Policies | 3Back",
			description: "Course policies for 3Back On-Demand, In-Person, and Live Online Public Courses.",
			type: "website",
		},
	},
	"/privacy-policy": {
		status: "complete",
		path: "/privacy-policy",
		title: "Privacy Policy | 3Back",
		description: "Privacy Policy for 3Back, LLC.",
		indexability: "index, follow",
		social: {
			title: "Privacy Policy | 3Back",
			description: "Privacy Policy for 3Back, LLC.",
			type: "website",
		},
	},
	"/about": {
		status: "stub",
		path: "/about",
		title: "About | 3Back",
		description: "Learn about 3Back, The Team Execution Company, and the perspective behind its work.",
		indexability: "noindex, nofollow",
		social: {
			title: "About | 3Back",
			description: "Learn about 3Back, The Team Execution Company, and the perspective behind its work.",
			type: "website",
		},
		missingWork: ["Substantive company and team content", "Approved complete-page metadata", "Appropriate structured data"],
	},
	"/contact": {
		status: "stub",
		path: "/contact",
		title: "Start a Conversation | 3Back",
		description: "Contact 3Back about an observable execution problem or a bounded place to begin.",
		indexability: "noindex, nofollow",
		social: {
			title: "Start a Conversation | 3Back",
			description: "Contact 3Back about an observable execution problem or a bounded place to begin.",
			type: "website",
		},
		missingWork: ["Functional contact experience", "Completion and error handling", "Approved complete-page metadata"],
	},
	"/doomscroll": {
		status: "stub",
		path: "/doomscroll",
		title: "Doomscroll | 3Back",
		description: "Cartoons, video shorts, and serious humor exposing the everyday failures that weaken organizational grip.",
		indexability: "noindex, nofollow",
		social: {
			title: "Doomscroll | 3Back",
			description: "Cartoons, video shorts, and serious humor exposing the everyday failures that weaken organizational grip.",
			type: "website",
		},
		missingWork: ["Actual diagnostic feed content", "Completed browsing experience", "Approved complete-page metadata"],
	},
	"/grip-check": {
		status: "stub",
		path: "/grip-check",
		title: "Grip Check | 3Back",
		description: "A short screening that helps identify where your organization may be losing its grip and serves as the starting point for a free consultation and assessment.",
		indexability: "noindex, nofollow",
		social: {
			title: "Grip Check | 3Back",
			description: "A short screening that helps identify where your organization may be losing its grip and serves as the starting point for a free consultation and assessment.",
			type: "website",
		},
		missingWork: ["Completed screening flow", "Results behavior", "Functional contact handoff", "Approved complete-page metadata"],
	},
	"/ideas": {
		status: "stub",
		path: "/ideas",
		title: "Ideas | 3Back",
		description: "Explore 3Back’s papers, articles, Tales of the Grip, and current thinking about team execution.",
		indexability: "noindex, nofollow",
		social: {
			title: "Ideas | 3Back",
			description: "Explore 3Back’s papers, articles, Tales of the Grip, and current thinking about team execution.",
			type: "website",
		},
		missingWork: ["Approved resource inventory", "Substantive index content", "Approved complete-page metadata"],
	},
	"/live-events": {
		status: "stub",
		path: "/live-events",
		title: "Live Events | 3Back",
		description: "Live Events information will be available here.",
		indexability: "noindex, nofollow",
		social: {
			title: "Live Events | 3Back",
			description: "Live Events information will be available here.",
			type: "website",
		},
		missingWork: ["Current event details", "Event schedule", "Appropriate event structured data", "Approved complete-page metadata"],
	},
});

export function isProductionSeoEnvironment(environment) {
	return environment === PRODUCTION_SEO_ENVIRONMENT;
}

export function normalizePath(pathname) {
	if (pathname === "/") return "/";
	return pathname.replace(/\/+$/, "");
}

export function canonicalUrl(pathname) {
	return pathname === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${pathname}`;
}
