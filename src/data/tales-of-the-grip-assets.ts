import type { ImageMetadata } from "astro";
import allHandsOnDirection from "../assets/tales-of-the-grip/all-hands-on-direction.png";
import aiBudgetHasLanded from "../assets/tales-of-the-grip/the-ai-budget-has-landed.png";
import factoryAllGreen from "../assets/tales-of-the-grip/factory-all-green.png";
import meetTheNewOrganization from "../assets/tales-of-the-grip/meet-the-new-organization.png";

export const talesStripImages: Readonly<Record<string, ImageMetadata>> = Object.freeze({
	"all-hands-on-direction": allHandsOnDirection,
	"the-ai-budget-has-landed": aiBudgetHasLanded,
	"factory-all-green": factoryAllGreen,
	"meet-the-new-organization": meetTheNewOrganization,
});
