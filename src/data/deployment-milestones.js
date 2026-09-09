import { reconstructedPushes } from "./reconstructed-pushes.js";

export const deploymentMilestones = [
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
];

// Preserve the existing archive while adding future completed milestones.
// Archive timestamps record GitHub pushes, not confirmed Cloudflare deployments.
export const doneHistory = [
	...deploymentMilestones,
	...reconstructedPushes.map(({ pushedAt, description }) => ({ completedAt: pushedAt, description })),
].sort((a, b) => Date.parse(b.completedAt) - Date.parse(a.completedAt));
