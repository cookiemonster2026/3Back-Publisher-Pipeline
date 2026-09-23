import { reconstructedPushes } from "./reconstructed-pushes.js";

export const deploymentMilestones = [
	{completedAt: "2026-09-20T22:43:27.6739044-05:00", description: "Rebuild Operational Grip introduction, PDF, and shared featured image"},
	{
		completedAt: "2026-09-09T14:26:43-05:00",
		description: "Launch protected staff docs and client error reporting",
	},
	{
		completedAt: "2026-09-09T14:51:34.6279593-05:00",
		description: "Restore complete history and enforce append-only closeout",
	},
	{
		completedAt: "2026-09-09T15:08:01.1339469-05:00",
		description: "Show live acceptance status and recorded review decisions",
	},
	{
		completedAt: "2026-09-09T15:15:44.0973223-05:00",
		description: "Restore checklist borders and clarify status indicators",
	},
	{
		completedAt: "2026-09-09T15:22:15.8286542-05:00",
		description: "Reorganize staff docs and clarify JavaScript error reporting",
	},
	{
		completedAt: "2026-09-09T23:06:12.586Z",
		description: "Establish acceptance testing workflow and linked result history",
	},
	{"completedAt":"2026-09-10T17:23:48.965Z","description":"Improve staff docs hub and on-demand course access"},
	{"completedAt":"2026-09-13T13:01:55.960Z","description":"Close Product Ownership II acceptance suite"},
	{"completedAt":"2026-09-13T14:19:39.168Z","description":"Close Scrum Mastering III acceptance suite"},
	{"completedAt":"2026-09-13T15:15:27.318Z","description":"Close Product Ownership III acceptance suite"},
	{"completedAt":"2026-09-13T16:32:52.945Z","description":"Close Scaling Scrum with Scrum acceptance suite"},
	{"completedAt":"2026-09-13T17:37:12.998Z","description":"Close Scrum Better with Kanban acceptance suite"},
	{"completedAt":"2026-09-13T18:42:04.309Z","description":"Complete Recognized Scrum Guide path hub"},
	{"completedAt":"2026-09-13T20:05:32.040Z","description":"Complete Scrum for Teams course page"},
	{"completedAt":"2026-09-19T15:00:43.524-05:00","description":"Publish Strip 005 and compact Tales collection"},
	{"completedAt":"2026-09-21T02:23:08Z","description":"Team-first AI homepage, production visual invariants, and acceptance coverage"},
	{"completedAt":"2026-09-23T17:00:13.756Z","description":"Close acceptance closeout housekeeping suite"},
	{"completedAt":"2026-09-23T17:00:14.683Z","description":"Close Operational Grip AI illustration suite"},
	{"completedAt":"2026-09-23T16:28:05.5272516-05:00","description":"Publish Tales strips 200, 201, and 202"},
];

// Preserve the existing archive while adding future completed milestones.
// Archive timestamps record GitHub pushes, not confirmed Cloudflare deployments.
export const doneHistory = [
	...deploymentMilestones,
	...reconstructedPushes.map(({ pushedAt, description }) => ({ completedAt: pushedAt, description })),
].sort((a, b) => Date.parse(b.completedAt) - Date.parse(a.completedAt));
