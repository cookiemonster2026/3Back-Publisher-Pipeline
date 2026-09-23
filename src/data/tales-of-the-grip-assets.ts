import type { ImageMetadata } from "astro";
import allHandsOnDirection from "../assets/tales-of-the-grip/all-hands-on-direction.png";
import aiBudgetHasLanded from "../assets/tales-of-the-grip/the-ai-budget-has-landed.png";
import factoryAllGreen from "../assets/tales-of-the-grip/factory-all-green.png";
import meetTheNewOrganization from "../assets/tales-of-the-grip/meet-the-new-organization.png";
import sixLayersOfGovernancePart1 from "../assets/tales-of-the-grip/six-layers-of-governance-part-1.png";
import sixLayersOfGovernancePart2 from "../assets/tales-of-the-grip/six-layers-of-governance-part-2.png";
import sixLayersOfGovernancePart3 from "../assets/tales-of-the-grip/six-layers-of-governance-part-3.png";
import trueAgilityNowFaster from "../assets/tales-of-the-grip/true-agility-now-faster.png";
import weRemovedTheRole from "../assets/tales-of-the-grip/we-removed-the-role.png";
import virtualProductTrainingForCustomers from "../assets/tales-of-the-grip/virtual-product-training-for-customers.png";
import allHandsOnDirectionPreview from "../assets/tales-of-the-grip/previews/all-hands-on-direction.png";
import aiBudgetHasLandedPreview from "../assets/tales-of-the-grip/previews/the-ai-budget-has-landed.png";
import factoryAllGreenPreview from "../assets/tales-of-the-grip/previews/factory-all-green.png";
import meetTheNewOrganizationPreview from "../assets/tales-of-the-grip/previews/meet-the-new-organization.png";
import sixLayersOfGovernancePreview from "../assets/tales-of-the-grip/previews/six-layers-of-governance.png";
import trueAgilityNowFasterPreview from "../assets/tales-of-the-grip/previews/true-agility-now-faster.png";
import weRemovedTheRolePreview from "../assets/tales-of-the-grip/previews/we-removed-the-role.png";
import virtualProductTrainingForCustomersPreview from "../assets/tales-of-the-grip/previews/virtual-product-training-for-customers.png";

export const talesStripImages: Readonly<Record<string, ImageMetadata>> = Object.freeze({
	"all-hands-on-direction": allHandsOnDirection,
	"the-ai-budget-has-landed": aiBudgetHasLanded,
	"factory-all-green": factoryAllGreen,
	"meet-the-new-organization": meetTheNewOrganization,
	"six-layers-of-governance": sixLayersOfGovernancePart1,
	"true-agility-now-faster": trueAgilityNowFaster,
	"we-removed-the-role": weRemovedTheRole,
	"virtual-product-training-for-customers": virtualProductTrainingForCustomers,
});

export const talesStripPartImages: Readonly<Record<string, ImageMetadata>> = Object.freeze({
	"six-layers-of-governance-part-1": sixLayersOfGovernancePart1,
	"six-layers-of-governance-part-2": sixLayersOfGovernancePart2,
	"six-layers-of-governance-part-3": sixLayersOfGovernancePart3,
});

export const talesStripHomepagePreviews: Readonly<Record<string, ImageMetadata>> = Object.freeze({
	"all-hands-on-direction": allHandsOnDirectionPreview,
	"the-ai-budget-has-landed": aiBudgetHasLandedPreview,
	"factory-all-green": factoryAllGreenPreview,
	"meet-the-new-organization": meetTheNewOrganizationPreview,
	"six-layers-of-governance": sixLayersOfGovernancePreview,
	"true-agility-now-faster": trueAgilityNowFasterPreview,
	"we-removed-the-role": weRemovedTheRolePreview,
	"virtual-product-training-for-customers": virtualProductTrainingForCustomersPreview,
});
