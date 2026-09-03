import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const environment = process.argv[2];
if (!new Set(["production", "test"]).has(environment)) {
	console.error("Build environment must be production or test.");
	process.exit(1);
}
if (environment === "production" && !process.env.PUBLIC_TURNSTILE_SITE_KEY?.trim()) {
	console.error("Production build requires PUBLIC_TURNSTILE_SITE_KEY. Configure it in the Cloudflare production build environment.");
	process.exit(1);
}

const projectRoot = resolve(import.meta.dirname, "..");
const astroCli = resolve(projectRoot, "node_modules", "astro", "bin", "astro.mjs");
const validator = resolve(projectRoot, "scripts", "validate-seo.mjs");
const childEnvironment = { ...process.env, SEO_BUILD_ENV: environment };
const astroMode = environment === "production" ? "production-indexable" : "test";

const diagnostics = spawnSync(process.execPath, [astroCli, "check"], {
	cwd: projectRoot,
	env: childEnvironment,
	stdio: "inherit",
});
if (diagnostics.status !== 0) process.exit(diagnostics.status ?? 1);

const build = spawnSync(process.execPath, [astroCli, "build", "--mode", astroMode], {
	cwd: projectRoot,
	env: childEnvironment,
	stdio: "inherit",
});
if (build.status !== 0) process.exit(build.status ?? 1);

const validation = spawnSync(process.execPath, [validator, "--environment", environment], {
	cwd: projectRoot,
	env: childEnvironment,
	stdio: "inherit",
});
process.exit(validation.status ?? 1);
