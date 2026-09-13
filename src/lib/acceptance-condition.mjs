export const normalizeAcceptanceCondition = (value) => String(value ?? "")
	.replace(/<[^>]*>/g, "")
	.replace(/`/g, "")
	.replace(/\s+/g, " ")
	.trim();
