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
	"/training": {
		status: "complete",
		path: "/training",
		title: "Training | 3Back",
		description: "Private training, hybrid instructor-led courses, and upcoming Expert Echo AI courses. Route to the format that fits.",
		indexability: "index, follow",
		social: {
			title: "Training | 3Back",
			description: "Private training, hybrid instructor-led courses, and upcoming Expert Echo AI courses. Route to the format that fits.",
			type: "website",
		},
	},
	"/scrum-alliance-path-images": {
		status: "complete",
		path: "/scrum-alliance-path-images",
		title: "Scrum Alliance Path Images | 3Back",
		description: "Collection of images referenced by Scrum Alliance course listings. Hosted for external use.",
		indexability: "noindex, nofollow",
		social: {
			title: "Scrum Alliance Path Images | 3Back",
			description: "Collection of images referenced by Scrum Alliance course listings. Hosted for external use.",
			type: "website",
		},
	},
	"/events": {
		status: "complete",
		path: "/events",
		title: "Events | 3Back",
		description: "Public live Certified ScrumMaster®, Advanced Certified ScrumMaster®, and Scrum Better with Kanban classes. Upcoming dates and enrollment.",
		indexability: "index, follow",
		social: {
			title: "Events | 3Back",
			description: "Public live Certified ScrumMaster®, Advanced Certified ScrumMaster®, and Scrum Better with Kanban classes. Upcoming dates and enrollment.",
			type: "website",
		},
		structuredData: {
			"@context": "https://schema.org",
			"@type": "ItemList",
			itemListElement: [
				["Certified ScrumMaster® (CSM®)", "2026-08-19", "https://event.3back.com/certified-scrummaster-august-19-20"],
				["Scrum Better with Kanban", "2026-08-22", "https://event.3back.com/scrum-better-with-kanban-august-22"],
				["Certified ScrumMaster® (CSM®)", "2026-08-29", "https://event.3back.com/certified-scrummaster-august-29-30"],
				["Advanced Certified ScrumMaster® (A-CSM®)", "2026-09-09", "https://event.3back.com/advanced-certified-scrummaster-september-9-10"],
				["Scrum Better with Kanban", "2026-09-12", "https://event.3back.com/scrum-better-with-kanban-september-12"],
				["Certified ScrumMaster® (CSM®)", "2026-09-15", "https://event.3back.com/certified-scrummaster-september-15-16-2026"],
				["Advanced Certified ScrumMaster® (A-CSM®)", "2026-09-19", "https://event.3back.com/advanced-certified-scrummaster-september-19-20"],
				["Certified Scrum Product Owner® (CSPO®)", "2026-09-22", "https://event.3back.com/certified-scrum-product-owner-september-22-23"],
				["Certified ScrumMaster® (CSM®)", "2026-09-26", "https://event.3back.com/certified-scrummaster-september-26-27"],
			].map(([name, startDate, url], position) => ({
				"@type": "ListItem",
				position: position + 1,
				item: {
					"@type": "Event",
					name,
					startDate,
					url,
					eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
				},
			})),
		},
	},
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
			image: {
				src: "/social/3back-featured-image-v1.jpg",
				alt: "3Back visualizing the connection between demand, team execution, and market value.",
				width: 1200,
				height: 630,
				type: "image/jpeg",
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
					description: "3Back helps leaders find where organizational execution has lost grip and make bounded changes that reveal what to do next.",
					logo: {
						"@type": "ImageObject",
						url: `${SITE_ORIGIN}/favicon.svg`,
						contentUrl: `${SITE_ORIGIN}/favicon.svg`,
					},
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
	"/papers/no-head-works-alone": {
		status: "complete",
		path: "/papers/no-head-works-alone",
		title: "No Head Works Alone | 3Back",
		description: "When judgment concentrates in one overloaded decision maker, the organization can look strong and still lose grip. The Bowtie Problem, and what restores bounded ownership.",
		indexability: "index, follow",
			social: {
				title: "No Head Works Alone | 3Back",
				description: "When judgment concentrates in one overloaded decision maker, the organization can look strong and still lose grip. The Bowtie Problem, and what restores bounded ownership.",
				type: "article",
				image: {
					src: "/social/3back-featured-image-v1.jpg",
					alt: "No Head Works Alone — 3Back paper on the Bowtie Problem and bounded ownership.",
					width: 1200,
					height: 630,
					type: "image/jpeg",
				},
			},
			structuredData: {
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "Article",
						headline: "No Head Works Alone",
						description: "When judgment concentrates in one overloaded decision maker, the organization can look strong and still lose grip. The Bowtie Problem, and what restores bounded ownership.",
						url: `${SITE_ORIGIN}/papers/no-head-works-alone`,
						mainEntityOfPage: `${SITE_ORIGIN}/papers/no-head-works-alone`,
						isPartOf: { "@id": websiteId },
						publisher: { "@id": organizationId },
						image: `${SITE_ORIGIN}/social/3back-featured-image-v1.jpg`,
					},
					{
						"@type": "FAQPage",
						mainEntity: [
				{
					"@type": "Question",
					name: "What is this paper about?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "How organizations lose grip when judgment concentrates in one overloaded decision maker, the Bowtie Problem, and what it means to restore bounded ownership.",
					},
				},
				{
					"@type": "Question",
					name: "What is the Bowtie Problem?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Work and pressure arrive from many directions, but decisions, direction, and coordination flow back through one person. That knot can look strong and still leave the organization dependent.",
					},
				},
				{
					"@type": "Question",
					name: "Who is it for?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Leaders and practitioners accountable for how work actually moves: executives, operational and transformation leaders, and people who sit near the knot.",
					},
				},
				{
					"@type": "Question",
					name: "What do I receive if I request the full paper?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "A PDF of No Head Works Alone emailed from noreply@3back.com. Requesting it also adds you to the 3Back list for occasional future content; you can unsubscribe at any time.",
					},
				},
						],
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
	"/team/doug-shimp": { status: "complete", path: "/team/doug-shimp", title: "Doug Shimp | 3Back", description: "Doug Shimp, founder of 3Back. Entrepreneur, systems thinker, and instructor focused on how teams actually execute.", indexability: "index, follow", social: { title: "Doug Shimp | 3Back", description: "Doug Shimp, founder of 3Back. Entrepreneur, systems thinker, and instructor focused on how teams actually execute.", type: "website" } },
	"/team/dan-rawsthorne": { status: "complete", path: "/team/dan-rawsthorne", title: "Dan Rawsthorne | 3Back", description: "Dan Rawsthorne, Chief Scientist at 3Back. Mathematics, military systems experience, and long practice helping organizations improve how work gets done.", indexability: "index, follow", social: { title: "Dan Rawsthorne | 3Back", description: "Dan Rawsthorne, Chief Scientist at 3Back. Mathematics, military systems experience, and long practice helping organizations improve how work gets done.", type: "website" } },
	"/team/marcelo-lopez-jr": { status: "complete", path: "/team/marcelo-lopez-jr", title: "Marcelo Lopez Jr. | 3Back", description: "Marcelo Lopez Jr., instructor at 3Back. Three decades in regulated product development and bilingual delivery of practical team methods.", indexability: "index, follow", social: { title: "Marcelo Lopez Jr. | 3Back", description: "Marcelo Lopez Jr., instructor at 3Back. Three decades in regulated product development and bilingual delivery of practical team methods.", type: "website" } },
	"/team/aj-biddles": { status: "complete", path: "/team/aj-biddles", title: "AJ Biddles | 3Back", description: "AJ Biddles, instructor at 3Back. Developer and craftsman focused on clean code, fast feedback, and how teams build software.", indexability: "index, follow", social: { title: "AJ Biddles | 3Back", description: "AJ Biddles, instructor at 3Back. Developer and craftsman focused on clean code, fast feedback, and how teams build software.", type: "website" } },
	"/team/jan-beaver": { status: "complete", path: "/team/jan-beaver", title: "Jan Beaver | 3Back", description: "Jan Beaver, PhD, instructor at 3Back. Twenty-five years across development, QA, and leadership helping teams become effective and self-sustaining.", indexability: "index, follow", social: { title: "Jan Beaver | 3Back", description: "Jan Beaver, PhD, instructor at 3Back. Twenty-five years across development, QA, and leadership helping teams become effective and self-sustaining.", type: "website" } },
	"/team/marc-applebaum": { status: "complete", path: "/team/marc-applebaum", title: "Marc Applebaum | 3Back", description: "Marc Applebaum, instructor at 3Back. Executive coaching and psychological research applied to leadership and the practical difficulties of change.", indexability: "index, follow", social: { title: "Marc Applebaum | 3Back", description: "Marc Applebaum, instructor at 3Back. Executive coaching and psychological research applied to leadership and the practical difficulties of change.", type: "website" } },
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
		status: "complete",
		path: "/doomscroll",
		title: "Doomscroll | 3Back",
		description: "Tales of the Grip. A recurring editorial cartoon about organizational execution. Sample and episodes to come.",
		indexability: "index, follow",
		social: {
			title: "Doomscroll | 3Back",
			description: "Tales of the Grip. A recurring editorial cartoon about organizational execution. Sample and episodes to come.",
			type: "website",
		},
	},
	"/grip-check": {
		status: "complete",
		path: "/grip-check",
		title: "Grip Check | 3Back",
		description: "7-minute directional screening of operating conditions. 20 questions. Immediate Grip Score.",
		indexability: "index, follow",
		social: {
			title: "Grip Check | 3Back",
			description: "7-minute directional screening of operating conditions. 20 questions. Immediate Grip Score.",
			type: "website",
		},
		structuredData: {
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: [
				["What is Grip Check?", "Grip Check is a short directional screening of how execution holds under changing demand. It takes about 7 minutes and covers five dimensions of operational grip."],
				["What do I get when I finish?", "You get a composite score and scores for each dimension, with a simple strong / moderate / weak reading. That is a starting snapshot, not a diagnosis. You can also request a 30-minute interpretation and debrief."],
				["Is this a diagnosis?", "No. Grip Check is a screening. It points to where grip may be present and where it may be under strain. It does not prescribe a program or guarantee an outcome."],
				["Should I take it for my organization or for my work?", "Choose My Organization if you will answer from a comparable organizational situation you can observe. Choose My Work if you will answer from your own experience of the work, authority, decisions, coordination, effects, and AI use around you. The questions differ for each path. You can take both."],
				["What happens if I ask for the 30-minute review?", "After you submit your results, 3Back receives your scores and context. We use that to prepare a short conversation focused on interpretation, not a pitch. If you only want the scores emailed, choose that option instead."],
			].map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
		},
	},
	"/grip-check/results": {
		status: "complete",
		path: "/grip-check/results",
		title: "Grip Check Results | 3Back",
		description: "Your Grip Check results.",
		indexability: "noindex, nofollow",
		social: { title: "Grip Check Results | 3Back", description: "Your Grip Check results.", type: "website" },
	},
	"/grip-check/take": {
		status: "complete",
		path: "/grip-check/take",
		title: "Grip Check | 3Back",
		description: "Grip Check questionnaire.",
		indexability: "noindex, nofollow",
		social: { title: "Grip Check | 3Back", description: "Grip Check questionnaire.", type: "website" },
	},
	"/ideas": {
		status: "complete",
		path: "/ideas",
		title: "Ideas | 3Back",
		description: "Papers, posts, books, and videos on organizational execution and Operational Grip. For executives and senior leaders improving how teams actually work.",
		indexability: "index, follow",
		social: {
			title: "Ideas | 3Back",
			description: "Papers, posts, books, and videos on organizational execution and Operational Grip. For executives and senior leaders improving how teams actually work.",
			type: "website",
			image: {
				src: "/social/ideas.jpg",
				alt: "Editorial still life showing paper, a charcoal book, and a video frame on a warm background.",
				width: 1168,
				height: 784,
				type: "image/jpeg",
			},
		},
	},
	"/building-domain-expertise": {
		status: "stub",
		path: "/building-domain-expertise",
		title: "Building Domain Expertise | 3Back",
		description: "A post is coming.",
		indexability: "noindex, nofollow",
		social: {
			title: "Building Domain Expertise | 3Back",
			description: "A post is coming.",
			type: "website",
		},
		missingWork: ["Post content", "Approved complete-page metadata"],
	},
	"/why-domain-expertise-matters": {
		status: "stub",
		path: "/why-domain-expertise-matters",
		title: "Why Domain Expertise Matters | 3Back",
		description: "Why domain expertise matters.",
		indexability: "noindex, nofollow",
		social: {
			title: "Why Domain Expertise Matters | 3Back",
			description: "Why domain expertise matters.",
			type: "website",
		},
		missingWork: ["Post content", "Approved complete-page metadata"],
	},
	"/papers/scaling": {
		status: "stub",
		path: "/papers/scaling",
		title: "Scaling | 3Back",
		description: "Scaling paper from 3Back. In preparation.",
		indexability: "noindex, nofollow",
		social: {
			title: "Scaling | 3Back",
			description: "Scaling paper from 3Back. In preparation.",
			type: "website",
		},
		missingWork: ["Full paper excerpt and body", "Optional gate/form", "Complete-page metadata and indexability when ready"],
	},
	"/scrum-alliance-courses-faq": {
		status: "complete",
		path: "/scrum-alliance-courses-faq",
		title: "Scrum Alliance Courses FAQ | 3Back",
		description: "Frequently asked questions about 3Back’s Scrum Alliance® courses, including logistics, payment, and certification.",
		indexability: "index, follow",
		social: {
			title: "Scrum Alliance Courses FAQ | 3Back",
			description: "Frequently asked questions about 3Back’s Scrum Alliance® courses, including logistics, payment, and certification.",
			type: "website",
		},
	},
	"/courses": {
		status: "complete",
		path: "/courses",
		title: "Courses | 3Back",
		description: "Private and hybrid credential courses. Request private delivery or choose hybrid options.",
		indexability: "index, follow",
		social: {
			title: "Courses | 3Back",
			description: "Private and hybrid credential courses. Request private delivery or choose hybrid options.",
			type: "website",
		},
	},
	"/certified-scrummaster-training": {
		status: "stub",
		path: "/certified-scrummaster-training",
		title: "Certified ScrumMaster Training | 3Back",
		description: "Certified ScrumMaster Training. In preparation.",
		indexability: "noindex, nofollow",
		social: {
			title: "Certified ScrumMaster Training | 3Back",
			description: "Certified ScrumMaster Training. In preparation.",
			type: "website",
		},
		missingWork: ["Approved course content", "Links from courses when ready", "Approved complete-page metadata"],
	},
	"/certified-scrum-product-owner-training": {
		status: "stub",
		path: "/certified-scrum-product-owner-training",
		title: "Certified Scrum Product Owner Training | 3Back",
		description: "Certified Scrum Product Owner Training. In preparation.",
		indexability: "noindex, nofollow",
		social: {
			title: "Certified Scrum Product Owner Training | 3Back",
			description: "Certified Scrum Product Owner Training. In preparation.",
			type: "website",
		},
		missingWork: ["Approved course content", "Links from courses when ready", "Approved complete-page metadata"],
	},
	"/courses/rsm-1": courseStub("/courses/rsm-1", "Recognized Scrum Master 1"),
	"/courses/rsm-2": courseStub("/courses/rsm-2", "Recognized Scrum Master 2"),
	"/courses/rsm-3": courseStub("/courses/rsm-3", "Recognized Scrum Master 3"),
	"/courses/rpo-1": courseStub("/courses/rpo-1", "Recognized Product Owner 1"),
	"/courses/rpo-2": courseStub("/courses/rpo-2", "Recognized Product Owner 2"),
	"/courses/rpo-3": courseStub("/courses/rpo-3", "Recognized Product Owner 3"),
	"/courses/recognized-scrum-guide": courseStub("/courses/recognized-scrum-guide", "Recognized Scrum Guide"),
	"/courses/industry-recognized-scrum-guide": courseStub("/courses/industry-recognized-scrum-guide", "Industry Recognized Scrum Guide – Pinnacle Credential"),
	"/courses/kmp-1": courseStub("/courses/kmp-1", "KMP I: Kanban Systems Design"),
	"/courses/kmp-2": courseStub("/courses/kmp-2", "KMP II: Kanban Management Professional"),
	"/courses/scrum-better-with-kanban": courseStub("/courses/scrum-better-with-kanban", "Scrum Better with Kanban"),
	"/courses/adaptive-team-model": courseStub("/courses/adaptive-team-model", "Adaptive Team Model"),
	"/courses/dysfunction-mapping-practitioner": courseStub("/courses/dysfunction-mapping-practitioner", "Dysfunction Mapping Practitioner"),
	"/courses/leading-remote-scrum-teams": courseStub("/courses/leading-remote-scrum-teams", "Leading Remote Scrum Teams"),
	"/courses/scaling-scrum-with-scrum-professional": courseStub("/courses/scaling-scrum-with-scrum-professional", "Scaling Scrum with Scrum® Professional"),
	"/courses/single-team-scrum": courseStub("/courses/single-team-scrum", "Single-Team Scrum"),
	"/courses/multi-team-scrum": courseStub("/courses/multi-team-scrum", "Multi-Team Scrum"),
	"/courses/scrum-for-leadership": courseStub("/courses/scrum-for-leadership", "Scrum for Leadership"),
	"/courses/scrum-for-teams": courseStub("/courses/scrum-for-teams", "Scrum for Teams"),
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

/** @param {`/courses/${string}`} path @param {string} name @returns {SeoMetadata} */
function courseStub(path, name) {
	return {
		status: "stub",
		path,
		title: `STUB: ${name} | 3Back`,
		description: `${name}. Full page coming next.`,
		indexability: "noindex, nofollow",
		social: { title: `STUB: ${name} | 3Back`, description: `${name}. Full page coming next.`, type: "website" },
		missingWork: ["Complete course page content", "Approved complete-page metadata"],
	};
}

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
