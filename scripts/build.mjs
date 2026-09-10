import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { rm } from "node:fs/promises";

const environment = process.argv[2];
if (!new Set(["production", "test"]).has(environment)) {
	console.error("Build environment must be production or test.");
	process.exit(1);
}
if (environment === "production" && !process.env.PUBLIC_TURNSTILE_SITE_KEY?.trim()) {
	console.error("Production build requires the public Turnstile site key. Cloudflare provides it in production; set PUBLIC_TURNSTILE_SITE_KEY only to reproduce that build locally.");
	process.exit(1);
}

const projectRoot = resolve(import.meta.dirname, "..");
const { validateHistory } = await import("./validate-acceptance-history.mjs");
validateHistory(projectRoot);
// Invalidate any previous attachment before any build step can fail.
const bankAsset = resolve(projectRoot, "dist/assets/grip-check/3Back-Grip-Check-Question-Bank.pdf");
await rm(bankAsset, { force: true });

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

// Build and validate the attachment from the same source used by the bundled quiz.
const { generateGripCheckBankAsset } = await import("./generate-grip-check-bank.mjs");
await generateGripCheckBankAsset(bankAsset);

const validation = spawnSync(process.execPath, [validator, "--environment", environment], {
	cwd: projectRoot,
	env: childEnvironment,
	stdio: "inherit",
});
process.exit(validation.status ?? 1);
