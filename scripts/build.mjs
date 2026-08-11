import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const environment = process.argv[2];
if (!new Set(["production", "test"]).has(environment)) {
	console.error("Build environment must be production or test.");
	process.exit(1);
}

const projectRoot = resolve(import.meta.dirname, "..");
const astroCli = resolve(projectRoot, "node_modules", "astro", "bin", "astro.mjs");
const validator = resolve(projectRoot, "scripts", "validate-seo.mjs");
const childEnvironment = { ...process.env, SEO_BUILD_ENV: environment };
const astroMode = environment === "production" ? "production-indexable" : "test";

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
