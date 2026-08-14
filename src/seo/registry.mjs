// @ts-check

/** @typedef {import("./types").SeoMetadata} SeoMetadata */

export const SITE_ORIGIN = "https://3back.com";
export const PRODUCTION_SEO_ENVIRONMENT = "production";

const operationalGripPath = "/operational-grip";
const operationalGripUrl = `${SITE_ORIGIN}${operationalGripPath}`;
const organizationId = `${SITE_ORIGIN}/#organization`;
const websiteId = `${SITE_ORIGIN}/#website`;
const homepagePageId = `${SITE_ORIGIN}/#webpage`;
const operationalGripPageId = `${operationalGripUrl}#webpage`;
const operationalGripImageId = `${operationalGripUrl}#primaryimage`;
const operationalGripTermId = `${operationalGripUrl}#term`;
const operationalGripImagePath = "/assets/operational-grip/og-page/07-operational-grip-chicago-lens.png";
const operationalGripImageUrl = `${SITE_ORIGIN}${operationalGripImagePath}`;
const operationalGripImageAlt = "A grayscale Chicago skyline viewed from Lake Michigan, with the Willis Tower area restored to sharp natural color through a handheld lens.";
const operationalGripDescription = "Operational Grip helps organizations find where execution has lost grip and make bounded changes that reveal what to do next.";
const aboutUsPath = "/about-us";
const aboutUsUrl = `${SITE_ORIGIN}${aboutUsPath}`;
const aboutUsImageId = `${aboutUsUrl}#origin-image`;
const aboutUsImagePath = "/social/about-3back.png";
const aboutUsImageAlt = "Editorial illustration of a painter stepping back from a house to inspect several paint inconsistencies from a wider perspective.";
const aboutUsDescription = "Meet the people behind 3Back and learn how experience across science, mathematics, engineering, the trades, and complex systems shaped Operational Grip.";
export const OPERATIONAL_GRIP_DEFINITION = "Operational Grip is the discipline of preserving actionable control.";
export const OPERATIONAL_GRIP_ATTRIBUTION = "Operational Grip is 3Back’s proprietary operating lens for diagnosing execution and guiding bounded change.";
export const HOMEPAGE_OPERATIONAL_GRIP_EXPLANATION = "A team or scaled system has Operational Grip when it can make bounded, local changes with enough confidence to observe their effects.";

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
					"@type": "WebPage",
					"@id": homepagePageId,
					url: `${SITE_ORIGIN}/`,
					name: "3Back | The Team Execution Company",
					description: "3Back helps leaders find where organizational execution has lost grip and make bounded changes that reveal what to do next.",
					inLanguage: "en-US",
					isPartOf: { "@id": websiteId },
					publisher: { "@id": organizationId },
				},
			],
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
					description: OPERATIONAL_GRIP_DEFINITION,
					url: operationalGripUrl,
					mainEntityOfPage: { "@id": operationalGripPageId },
				},
			],
		},
	},
	"/workshops": {
		status: "complete",
		path: "/workshops",
		title: "Workshops for Operational Grip | 3Back",
		description: "Diagnostic workshops that help leadership groups examine real work and surface where team execution has lost Operational Grip.",
		indexability: "index, follow",
		social: {
			title: "Workshops for Operational Grip",
			description: "Leadership working sessions that make the gap between intended and actual operating behavior visible and owned.",
			type: "website",
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
	"/about-us": {
		status: "complete",
		path: aboutUsPath,
		title: "About 3Back | The Team Execution Company",
		description: aboutUsDescription,
		indexability: "index, follow",
		social: {
			title: "About 3Back: Perspective Built Through the Work",
			description: "For nearly three decades, 3Back has brought hands-on experience across science, mathematics, engineering, and the trades to the work of team execution.",
			type: "website",
			image: {
				src: aboutUsImagePath,
				alt: aboutUsImageAlt,
				width: 1200,
				height: 630,
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
					description: "3Back is the Team Execution Company. It helps organizations find where execution has lost grip and make bounded changes that reveal what to do next.",
				},
				{
					"@type": "WebSite",
					"@id": websiteId,
					url: `${SITE_ORIGIN}/`,
					name: "3Back",
					publisher: { "@id": organizationId },
				},
				{
					"@type": "ImageObject",
					"@id": aboutUsImageId,
					contentUrl: `${SITE_ORIGIN}${aboutUsImagePath}`,
					width: 1200,
					height: 630,
					caption: "A painter steps back from a house to inspect several paint inconsistencies from a wider perspective.",
				},
				{
					"@type": "AboutPage",
					"@id": `${aboutUsUrl}#webpage`,
					url: aboutUsUrl,
					name: "About 3Back | The Team Execution Company",
					description: aboutUsDescription,
					isPartOf: { "@id": websiteId },
					mainEntity: { "@id": organizationId },
					primaryImageOfPage: { "@id": aboutUsImageId },
				},
			],
		},
	},
	"/contact": {
		status: "complete",
		path: "/contact",
		title: "Start a Conversation | 3Back",
		description: "Contact 3Back about an observable execution problem or a bounded place to begin.",
		indexability: "index, follow",
		social: {
			title: "Start a Conversation | 3Back",
			description: "Contact 3Back about an observable execution problem or a bounded place to begin.",
			type: "website",
		},
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

/** @param {string | undefined} environment */
export function isProductionSeoEnvironment(environment) {
	return environment === PRODUCTION_SEO_ENVIRONMENT;
}

/** @param {string} pathname */
export function normalizePath(pathname) {
	if (pathname === "/") return "/";
	return pathname.replace(/\/+$/, "");
}

/** @param {string} pathname */
export function canonicalUrl(pathname) {
	return pathname === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${pathname}`;
}
