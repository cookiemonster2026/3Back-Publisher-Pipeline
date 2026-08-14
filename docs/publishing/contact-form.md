# Contact form configuration

The `/contact` form posts to the Cloudflare Worker route `/api/contact`. The Worker verifies the Turnstile token before it processes form content, sends a notification to `og@3back.com`, then sends the submitter a short acknowledgment.

## Public build variable

Set this during the Astro build. It is intentionally public and only identifies the Turnstile widget.

```text
PUBLIC_TURNSTILE_SITE_KEY
```

## Cloudflare Worker secrets and variables

Set these in the Cloudflare Worker settings or with `wrangler secret put`. Do not place them in source control or a `PUBLIC_` variable.

```text
TURNSTILE_SECRET_KEY       # Turnstile secret key for the configured site key
RESEND_API_KEY             # Resend API key with permission to send transactional email
CONTACT_FROM_EMAIL         # Verified Resend sender, for example: 3Back <contact@3back.com>
CONTACT_NOTIFICATION_EMAIL # Optional recipient override; defaults to og@3back.com
```

Resend is the selected mail path because it supports Cloudflare Workers with a server-side API key and has a free account option. Verify the sending domain in Resend and publish its required DNS records before production use. The Worker makes no mail request until Turnstile succeeds.

For local Worker testing, copy `.dev.vars.example` to `.dev.vars`, set the values, then run Wrangler against a built `dist/` directory. `.dev.vars` is ignored and must remain local.
