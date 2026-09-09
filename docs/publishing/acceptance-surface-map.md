# Acceptance surface map

The map identifies likely affected items. Combine matching rows and include any additional condition the diff could invalidate, with a brief reason.

| Changed files or component | Surface | Likely live items | Default sample |
|---|---|---|---|
| `src/components/SiteHeader.astro` | Header / conversation control | 101, 103, 301, 302, 303, 304, 305, 306, 501, 502, 504 | `/` and one inner page. Open mobile menu on the inner page. |
| `src/components/SiteFooter.astro` | Footer | 101, 301, 302, 303, 304, 307, 323 | `/` and one inner page |
| Shared layout, global CSS, tokens | Type frame | 107, 108, 401, 402, 403, 404, 405, 507, 901 | `/` and one inner page, desktop and mobile |
| Contact form, Turnstile, `functions/worker.mjs` contact path | Contact / Turnstile | 303, 324, 506 | `/contact/` and one other page that uses the same form pattern |
| `src/pages/index.astro` | Homepage body | 101–106, 401–404, 701–708, 901–905 | `https://3back.com/` |
| A single page under `src/pages/` | That page body | 201–205, 321–323, 401–404, 503–505, 603–605, 901–905 | That live URL |
| `src/data/acceptance-status.json` only | Board records | none | Do not stale live items |
| `AGENTS.md`, checklist how-to, this map, staff `/docs` copy | Staff docs | none for public live items | `/docs/acceptance-checks/` is staff-only |
