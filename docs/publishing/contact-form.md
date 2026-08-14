# Contact form configuration

The `/contact` form posts to the Cloudflare Worker route `/api/contact`. The Worker verifies the Turnstile token before it processes form content, sends a notification to `og@3back.com`, then sends the submitter a short acknowledgment.

## Public build variable

Set this as a Cloudflare Workers Builds **Production build variable**. It is intentionally public and only identifies the Turnstile widget.

```text
PUBLIC_TURNSTILE_SITE_KEY
```

Worker runtime variables and secrets are not passed to Astro's static build. In the Cloudflare dashboard, open the Worker that matches `wrangler.jsonc` (`3back-publisher-pipeline`), then go to **Settings > Build > Build variables and secrets** and add `PUBLIC_TURNSTILE_SITE_KEY` to the production trigger. Do not add it only under **Settings > Variables & Secrets**.

`wrangler.jsonc` owns the production Astro build through its `build.command`. As a result, `wrangler deploy` runs `pnpm build` before it uploads `dist/`, and Astro receives `PUBLIC_TURNSTILE_SITE_KEY` from the deploy process environment. In Workers Builds, leave the separate build command empty and use `pnpm deploy` as the production deploy command to avoid building twice.

## Cloudflare Worker secrets and variables

Set the Turnstile and Resend values as Cloudflare Worker secrets or with `wrangler secret put`. Do not place them in source control or a `PUBLIC_` variable. The two address values are non-secret defaults declared in `wrangler.jsonc` and may be overridden as Worker text variables when needed.

```text
TURNSTILE_SECRET_KEY       # Turnstile secret key for the configured site key
RESEND_API_KEY             # Resend API key with permission to send transactional email
CONTACT_FROM_EMAIL         # Optional verified Resend sender; defaults to noreply@3back.com
CONTACT_NOTIFICATION_EMAIL # Optional recipient override; defaults to og@3back.com
```

Resend is the selected mail path because it supports Cloudflare Workers with a server-side API key and has a free account option. Verify the sending domain in Resend and publish its required DNS records before production use. The Worker makes no mail request until Turnstile succeeds.

For local Worker testing, copy `.dev.vars.example` to `.dev.vars`, set the values, then run Wrangler against a built `dist/` directory. `.dev.vars` is ignored and must remain local.
