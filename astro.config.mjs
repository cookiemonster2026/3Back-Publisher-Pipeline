// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import {
	canonicalUrl,
	isProductionSeoEnvironment,
	normalizePath,
	pageSeo,
	SITE_ORIGIN,
} from './src/seo/registry.mjs';

// https://astro.build/config
const isProduction = isProductionSeoEnvironment(process.env.SEO_BUILD_ENV);

export default defineConfig({
	site: SITE_ORIGIN,
	integrations: [
		sitemap({
			filter(page) {
				if (!isProduction) return false;
				const metadata = pageSeo[normalizePath(new URL(page).pathname)];
				return metadata?.status === 'complete' && metadata.indexability === 'index, follow';
			},
			serialize(item) {
				const metadata = pageSeo[normalizePath(new URL(item.url).pathname)];
				if (!isProduction || metadata?.status !== 'complete' || metadata.indexability !== 'index, follow') return undefined;
				item.url = canonicalUrl(metadata.path);
				return item;
			},
		}),
	],
});
