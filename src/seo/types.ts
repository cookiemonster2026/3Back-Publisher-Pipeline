export type Indexability = "index, follow" | "noindex, nofollow";

export interface SocialImage {
	src: string;
	alt: string;
	width: number;
	height: number;
	type: `image/${string}`;
}

export interface SocialMetadata {
	title: string;
	description: string;
	type: "website" | "article";
	image?: SocialImage;
}

export type JsonLdNode = Record<string, unknown>;

interface BaseSeoMetadata {
	path: `/${string}`;
	title: string;
	description: string;
	indexability: Indexability;
	social: SocialMetadata;
	structuredData?: JsonLdNode;
}

export interface CompleteSeoMetadata extends BaseSeoMetadata {
	status: "complete";
	indexability: "index, follow";
}

export interface StubSeoMetadata extends BaseSeoMetadata {
	status: "stub";
	indexability: "noindex, nofollow";
	missingWork: readonly string[];
}

export type SeoMetadata = CompleteSeoMetadata | StubSeoMetadata;
