export const talesStrips = Object.freeze([
	Object.freeze({
		status: "published",
		stripNumber: 1,
		slug: "all-hands-on-direction",
		path: "/tales-of-the-grip/all-hands-on-direction",
		title: "All Hands on Direction",
		datePublished: "2026-09-18",
		dateLabel: "September 18, 2026",
		imageAlt: "Tales of the Grip strip titled All Hands on Direction. A leader says the team is fully aligned and finds a way forward together. She asks if Cal is with them while he holds a falling chart. In the last panel the chart is rising and the room applauds.",
		seoDescription: "All Hands on Direction. A Tales of the Grip editorial cartoon about organizational execution.",
		socialImage: Object.freeze({
			src: "/social/tales-of-the-grip/all-hands-on-direction.png",
			width: 1600,
			height: 3159,
			type: "image/png",
		}),
		parts: Object.freeze([]),
	}),
	Object.freeze({
		status: "published",
		stripNumber: 2,
		slug: "the-ai-budget-has-landed",
		path: "/tales-of-the-grip/the-ai-budget-has-landed",
		title: "The AI Budget Has Landed",
		datePublished: "2026-09-18",
		dateLabel: "September 18, 2026",
		imageAlt: "Tales of the Grip strip titled The AI Budget Has Landed. A manager says employee incentives beat the AI token-use target. Asked what the compute helped them finish, she says the budget. The leader adds that they exceeded that too.",
		seoDescription: "The AI Budget Has Landed. A Tales of the Grip editorial cartoon about organizational execution.",
		socialImage: Object.freeze({
			src: "/social/tales-of-the-grip/the-ai-budget-has-landed.png",
			width: 1600,
			height: 2400,
			type: "image/png",
		}),
		parts: Object.freeze([]),
	}),
	Object.freeze({
		status: "published",
		stripNumber: 3,
		slug: "factory-all-green",
		path: "/tales-of-the-grip/factory-all-green",
		title: "Factory: All Green",
		datePublished: "2026-09-18",
		dateLabel: "September 18, 2026",
		imageAlt: "Tales of the Grip strip titled Factory: All Green. A man says there are no blockers and production is up while boxes pile up under a green dashboard. A woman asks who ordered them and how it is still green. He tells her she is blocking the dashboard.",
		seoDescription: "Factory: All Green. A Tales of the Grip editorial cartoon about organizational execution.",
		socialImage: Object.freeze({
			src: "/social/tales-of-the-grip/factory-all-green.png",
			width: 1600,
			height: 3135,
			type: "image/png",
		}),
		parts: Object.freeze([]),
	}),
	Object.freeze({
		status: "published",
		stripNumber: 4,
		slug: "meet-the-new-organization",
		path: "/tales-of-the-grip/meet-the-new-organization",
		title: "Meet the New Organization",
		datePublished: "2026-09-18",
		dateLabel: "September 18, 2026",
		imageAlt: "Tales of the Grip strip titled Meet the New Organization. After closed-door meetings, ArtI helped refactor Six Layers of Governance. Asked who can approve the first request, the reply is to give three days to review and align on identifying an approver.",
		seoDescription: "Meet the New Organization. A Tales of the Grip editorial cartoon about organizational execution.",
		socialImage: Object.freeze({
			src: "/social/tales-of-the-grip/meet-the-new-organization.png",
			width: 1600,
			height: 3040,
			type: "image/png",
		}),
		parts: Object.freeze([]),
	}),
	Object.freeze({
		status: "published",
		stripNumber: 5,
		slug: "six-layers-of-governance",
		path: "/tales-of-the-grip/six-layers-of-governance",
		title: "Six Layers of Governance",
		datePublished: "2026-09-19",
		dateLabel: "September 19, 2026",
		imageAlt: "Tales of the Grip strip titled Six Layers of Governance, part 1. A man says six layers cover every angle. Asked who can approve an AI agent changing a customer workflow, he points at a wall chart while she holds out a pen. She says it is a pen. He says he knows what it can do.",
		seoDescription: "Six Layers of Governance. A Tales of the Grip editorial cartoon about organizational execution.",
		socialImage: Object.freeze({
			src: "/social/tales-of-the-grip/six-layers-of-governance.png",
			width: 1600,
			height: 3200,
			type: "image/png",
		}),
		parts: Object.freeze([
			Object.freeze({
				id: "part-1",
				label: "Part 1",
				imageKey: "six-layers-of-governance-part-1",
				imageAlt: "Tales of the Grip strip titled Six Layers of Governance, part 1. A man says six layers cover every angle. Asked who can approve an AI agent changing a customer workflow, he points at a wall chart while she holds out a pen. She says it is a pen. He says he knows what it can do.",
			}),
			Object.freeze({
				id: "part-2",
				label: "Part 2",
				imageKey: "six-layers-of-governance-part-2",
				imageAlt: "Tales of the Grip strip titled Six Layers of Governance, part 2. He introduces ArtI as his new AI assistant. ArtI infers a reason and then an approval. He says he cannot just sign. ArtI signs for him. The paper reads Approved by Owen Blake.",
			}),
			Object.freeze({
				id: "part-3",
				label: "Part 3",
				imageKey: "six-layers-of-governance-part-3",
				imageAlt: "Tales of the Grip strip titled Six Layers of Governance, part 3. He says they revised his job description. He will not sign because ArtI has it. He calls himself the non-accountable recountable party. He explains how the decision happened. Nobody said he had to stand behind it.",
			}),
		]),
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
