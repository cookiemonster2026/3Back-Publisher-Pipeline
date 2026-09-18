export const talesStrips = Object.freeze([
	Object.freeze({
		status: "published",
		stripNumber: 1,
		slug: "all-hands-on-direction",
		path: "/tales-of-the-grip/all-hands-on-direction",
		title: "All Hands on Direction",
		datePublished: "2026-09-18",
		dateLabel: "September 18, 2026",
		imageAlt: "Tales of the Grip strip titled All Hands on Direction. A leader says the team is aligned, then welcomes a different read. A concerned colleague shows her a warning report, and she replies, Good.",
		seoDescription: "All Hands on Direction. A Tales of the Grip editorial cartoon about organizational execution.",
		socialImage: Object.freeze({
			src: "/social/tales-of-the-grip/all-hands-on-direction.png",
			width: 1600,
			height: 3167,
			type: "image/png",
		}),
	}),
	Object.freeze({
		status: "published",
		stripNumber: 2,
		slug: "the-ai-budget-has-landed",
		path: "/tales-of-the-grip/the-ai-budget-has-landed",
		title: "The AI Budget Has Landed",
		datePublished: "2026-09-18",
		dateLabel: "September 18, 2026",
		imageAlt: "Tales of the Grip strip titled The AI Budget Has Landed. Three people sit at a table. One says they used the entire AI budget. Another asks what it helped them finish. The reply is the budget.",
		seoDescription: "The AI Budget Has Landed. A Tales of the Grip editorial cartoon about organizational execution.",
		socialImage: Object.freeze({
			src: "/social/tales-of-the-grip/the-ai-budget-has-landed.png",
			width: 1600,
			height: 2491,
			type: "image/png",
		}),
	}),
	Object.freeze({
		status: "published",
		stripNumber: 3,
		slug: "factory-all-green",
		path: "/tales-of-the-grip/factory-all-green",
		title: "Factory: All Green",
		datePublished: "2026-09-18",
		dateLabel: "September 18, 2026",
		imageAlt: "Tales of the Grip strip titled Factory: All Green. A factory dashboard shows every test passing while boxes pile up. Asked who ordered them, a man replies, Look at production go.",
		seoDescription: "Factory: All Green. A Tales of the Grip editorial cartoon about organizational execution.",
		socialImage: Object.freeze({
			src: "/social/tales-of-the-grip/factory-all-green.png",
			width: 1600,
			height: 2368,
			type: "image/png",
		}),
	}),
	Object.freeze({
		status: "published",
		stripNumber: 4,
		slug: "meet-the-new-organization",
		path: "/tales-of-the-grip/meet-the-new-organization",
		title: "Meet the New Organization",
		datePublished: "2026-09-18",
		dateLabel: "September 18, 2026",
		imageAlt: "Tales of the Grip strip titled Meet the New Organization. After closed-door meetings to clarify decisions, Theo asks who can approve something and is directed to an enormous organization structure and process book.",
		seoDescription: "Meet the New Organization. A Tales of the Grip editorial cartoon about organizational execution.",
		socialImage: Object.freeze({
			src: "/social/tales-of-the-grip/meet-the-new-organization.png",
			width: 1600,
			height: 2960,
			type: "image/png",
		}),
	}),
]);

export const publishedTalesStrips = Object.freeze(
	talesStrips
		.filter((strip) => strip.status === "published")
		.toSorted((left, right) =>
			right.datePublished.localeCompare(left.datePublished)
			|| right.stripNumber - left.stripNumber,
		),
);

export const nextScheduledTalesStrip = talesStrips
	.filter((strip) => strip.status === "scheduled")
	.toSorted((left, right) => left.datePublished.localeCompare(right.datePublished))[0] ?? null;
