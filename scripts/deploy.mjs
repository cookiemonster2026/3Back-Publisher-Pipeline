import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

if (process.env.THREEBACK_DIRECT_CLOUDFLARE_DEPLOY_AUTHORIZED !== "1") {
	console.error("Direct Cloudflare deployment is blocked. Normal production publishing is main → GitHub origin/main → Cloudflare build. Set THREEBACK_DIRECT_CLOUDFLARE_DEPLOY_AUTHORIZED=1 only when direct deployment is explicitly authorized for this task.");
	process.exit(1);
}

const projectRoot = resolve(import.meta.dirname, "..");
const wranglerCli = resolve(projectRoot, "node_modules", "wrangler", "bin", "wrangler.js");
const deployment = spawnSync(process.execPath, [wranglerCli, "deploy", ...process.argv.slice(2)], {
	cwd: projectRoot,
	env: process.env,
	stdio: "inherit",
});
process.exit(deployment.status ?? 1);
