# 3Back Site Intent Map

**Version:** 1.13
**Date:** 2026-09-21
**Scope:** Operational Grip cornerstone brief and portable executive brief. Unrelated route intents retained.
**Acceptance:** The intentionally shipped `/operational-grip` route is recorded as the canonical web-native cornerstone brief. Production confirmation and acceptance are reported separately.
**Twin to:** Technical Manifest (`docs/publishing/technical-manifest.md`)
**Update rule:** Increment version on material change. This Operational Grip intent update was explicitly authorized; production confirmation is reported separately.

This document states **why** each public surface exists and what it is supposed to do. It is not wireframes, full copy, or implementation detail.

---

## Site posture

3Back is **The Team Execution Company**. Public surfaces support diagnosing and improving how teams actually execute. Training and credentials are entry points, not the center of the brand.

Primary brand idea online: **Operational Grip**.

---

## Navigation intent

### Header

| Item | Intent |
|---|---|
| Operational Grip | Path into the core idea |
| Ideas | Written-work hub (papers, posts, books) |
| About | Who is behind 3Back |
| Start a Conversation | Default commercial contact action → `/contact/` |
| Start this conversation | Exception on pages that already have a live inquiry form, or a designated sibling form. Points at that form. Do not send the reader to `/contact/` from the header on those pages. |

On 2026-09-13 the exception is live on `/domain-guides` → `#next-step`; `/why-domain-expertise-matters` → `/domain-guides/#next-step`; `/training/scrum-mastering-1` → `#sm1-private-inquiry`; `/training/scrum-mastering-2` → `#sm2-private-inquiry`; `/training/scrum-mastering-3` → `#sm3-private-inquiry`; `/training/product-ownership-1` → `#po1-private-inquiry`; `/training/product-ownership-2` → `#po2-private-inquiry`; `/training/product-ownership-3` → `#po3-private-inquiry`; `/training/scaling-scrum-with-scrum` → `#ssws-private-inquiry`; `/courses/scrum-for-teams` → `#sft-private-inquiry`; `/certified-scrummaster-training` and `/certified-scrum-product-owner-training` → `#private-course-request`. Footer Start a Conversation stays `/contact/` on every page.

Homepage header variant: Operational Grip → `/operational-grip/`; How to engage → `#engage`. Inner-page navigation and conversation exceptions remain unchanged. Body arrows: ↗ engagement, → information, ↓ same-page.

### Footer Explore

| Item | Intent |
|---|---|
| Operational Grip | Canonical web-native cornerstone brief and explainer |
| Ideas | Written work hub (when real) |
| Tales of the Grip | Place for the Tales of the Grip series |

Papers and Articles are **formats inside Ideas**, not separate footer destinations.

### Footer Engage

Grip Check, Workshops, Domain Guides. Distinct entry points to bounded execution work.

### Footer Learn

Training, Events, On-Demand Courses. Preserve the Product Ownership III on-demand exclusion.

### Footer Company

About, Reviews, Start a Conversation, Privacy Policy, Course Policy.

---

## Routes

### `/` — Homepage

| Field | Intent |
|---|---|
| **Purpose** | Establish team execution in the AI era, explain domain-guided selection, and offer bounded engagements without teaching the full model |
| **Audience** | Executives and leaders accountable for organizational execution; operators who feel the problem before they have the language |
| **Primary actions** | Check your grip → `/grip-check/`; See ways to engage → `#engage`. Operational Grip and Current Ideas offer deeper exploration. Header Start a Conversation remains `/contact/`. |
| **Indexability** | Complete; index, follow |
| **Non-goals** | Not a course catalog; not a news wire; not a Scrum marketing home |

**Section intent (homepage)**

| Section | Purpose |
|---|---|
| Hero | Team-first AI-selection thesis, bounded service statement, assessment action and seven-minute note. |
| Operational Grip | Local observable, correctable action and four concurrent signals. |
| Engage | Assess it / Check your operational grip; Work it / Workshop a bounded problem; Keep the capability / Build your Domain Guides program. |
| Why 3Back | Concise experience and posture, not training testimonials presented as advisory outcomes. |
| Current Ideas | Four illustrated cards: latest published Tales strip, No Head Works Alone, How 3Back Approaches Learning, and books. Brief descriptions and direct information links. Replaces the closing conversation band. |
| Shared footer | Preserve production styling and Explore / Engage / Learn / Company groups. Orange divider retained. |

---

### `/operational-grip`

| Field | Intent |
|---|---|
| **Purpose** | Canonical web-native Operational Grip cornerstone brief and explainer. Substantial enough to stand on its own. The downloadable executive brief is the portable version. |
| **Audience** | Executives and leaders accountable for execution; operators who need language for why activity can rise while local control and fit deteriorate. |
| **Primary actions** | Understand Operational Grip; download the portable executive brief; continue into Grip Check, Workshops, Domain Guides, or related thinking. |
| **Indexability** | Complete; index, follow |
| **Non-goals** | Not the book or manuscript; not a training syllabus; not a credential page. The route’s primary job is understanding Operational Grip and providing paths into engagement. |

---

### `/papers/no-head-works-alone`

| Field | Intent |
|---|---|
| **Purpose** | Brand 3Back via an Operational Grip angle; give a free substantial excerpt; light-gate the full PDF; capture list consent |
| **Audience** | Executives and leaders accountable for execution; people near overloaded decision-making |
| **Primary action** | Request full paper (form) → PDF email attachment |
| **Form** | First name, last name, email, confirm email, phone optional; required list consent checkbox |
| **Delivery** | From `noreply@3back.com`; attachment filename `3Back-No-Head-Works-Alone-v1.49.pdf` |
| **Notify** | `og@3back.com` subject `[Paper] no-head-works-alone` with transaction metadata (`gated_paper`) |
| **Indexability** | Complete; index, follow. Full PDF is **not** a public crawlable URL |
| **Related** | Homepage left Current Thinking card; future Ideas hub |
| **Non-goals** | No membership login; no delayed “hostage” newsletter; no public PDF download link |

---


### `/papers/how-3back-approaches-learning`

| Field | Intent |
|---|---|
| **Purpose** | Public paper: how 3Back treats learning as usable judgment in a domain of work, not course completion. HTML applies the philosophy. PDF is the research-supported publication. |
| **Audience** | Executives and leaders accountable for execution; people evaluating 3Back training as an entry point |
| **Primary action** | Explore Domain Guides |
| **Secondary actions** | Read/download the ungated PDF; Training; Why Domain Expertise Matters |
| **PDF** | Public file at `/downloads/how-3back-approaches-learning.pdf`. No gate. No form. `noindex`. Not in the sitemap. |
| **Indexability** | HTML complete; index, follow. Canonical `/papers/how-3back-approaches-learning` |
| **Related** | Ideas Papers list; inbound from `/domain-guides` and `/why-domain-expertise-matters` |
| **Non-goals** | Not a new page class. Not a course catalog. Not a gated paper. Not `/how-3back-approaches-learning`. That path was never published. |

---

### `/tales-of-the-grip`

| Field | Intent |
|---|---|
| **Purpose** | Destination for Tales of the Grip. Recognition first; instruction never. |
| **Audience** | Same multi-level audience as OG: executives through practitioners; humor must cut both ways |
| **Primary action** | Read the newest strip first, continue through the reverse-chronological series, open a strip's permanent page, or share the collection. |
| **Indexability** | Complete; index, follow |
| **Related** | Homepage right Current Thinking card; Footer Explore |
| **Non-goals** | Not Ideas; not Operational Grip explainer; not a sales CTA page; not company hit pieces; not a brand page for the retired name |

Each published strip has an indexable permanent route under `/tales-of-the-grip/{slug}` for direct sharing and search. The hub remains the public scrolling series, with the newest published strip first, collection-level share controls, and a dedicated large social preview. Publication dates are shown without posting times. Quiet leftovers may retain direct routes without appearing in the public series.

---

### `/training`

| Field | Intent |
|---|---|
| **Purpose** | Pure routing page into training formats. Training is an entry point, not the center of 3Back |
| **Audience** | People seeking private, hybrid, or future AI-assisted learning paths |
| **Primary actions** | Choose Private Training, Hybrid Instructor-Led, or Expert Echo AI (Coming Soon / request) |
| **Closing note** | Primary work is diagnosing and improving how teams execute; training is one entry point |
| **Indexability** | Complete; index, follow |
| **Related** | `/courses`, `/events`, path.3back.com (hybrid advanced paths) |
| **Non-goals** | Not a full course catalog; not Scrum-as-identity marketing |

---

### `/training/scrum-mastering-1`

| Field | Intent |
|---|---|
| **Purpose** | Sell Scrum Mastering I as a foundation course. Public self-paced and private live are two modes of the same course. Domain Guides is the path if skill must stay in the company. |
| **Audience** | Individuals who will take the self-paced course. Leaders buying the course for a team. |
| **Primary actions** | Enroll when public checkout exists. Request private SM1. Read the data sheet. Explore Domain Guides. |
| **Indexability** | Complete. index, follow. Canonical `https://3back.com/training/scrum-mastering-1`. |
| **Related** | `/courses`, `/training`, `/domain-guides`, `/reviews`, LO PDF, data sheet PDF. Series continues at SM2 and SM3. Domain Guides band is shared with the other SGO course pages. |
| **Non-goals** | Not an SA credential page. Not a six-course ladder. Not Domain Guides itself. |
| **Redirects** | `/rsm1` and `/courses/rsm-1` 301 here. |

---

### `/training/scrum-mastering-1/learning-objectives`

| Field | Intent |
|---|---|
| **Purpose** | Official SM1 learning objectives PDF. |
| **Indexability** | File rewrite. Not an HTML page. Not in the sitemap as HTML. |
| **Related** | Parent course page. |

---

### `/training/scrum-mastering-1-data-sheet`

| Field | Intent |
|---|---|
| **Purpose** | Team leave-behind PDF for SM1 private / org buyers. |
| **Indexability** | File rewrite. Not an HTML page. Not in the sitemap as HTML. |
| **Related** | Parent course page. Linked from Private Live. |

---

### `/training/scrum-mastering-2`

| Field | Intent |
|---|---|
| **Purpose** | Sell Scrum Mastering II. Promise: Build a Great Team. Same course, two modes: public self-paced coming soon and private live. Domain Guides if skill must stay in the company. |
| **Audience** | Individuals on the self-paced path when it opens. Leaders buying the course for a team. |
| **Primary actions** | Request private SM2. Read the data sheet. Explore Domain Guides. |
| **Indexability** | Complete; index, follow. Canonical `https://3back.com/training/scrum-mastering-2/`. |
| **Related** | `/courses`, `/training`, `/domain-guides`, `/reviews`, LO PDF, data sheet PDF. |
| **Non-goals** | Not SA. Not a ladder. Not RPL. Not Domain Guides itself. |
| **Redirects** | `/rsm2` and `/courses/rsm-2` 301 here. |
| **Header** | Start this conversation → `#sm2-private-inquiry`. Notify `rsm2-private@3back.com`. |

### `/training/scrum-mastering-3`

| Field | Intent |
|---|---|
| **Purpose** | Sell Scrum Mastering III. Live page promise is organizational improvement / RSM3. Same chassis as SM1. Public enrollment coming soon. Private live inquiry live. |
| **Audience** | Individuals on the self-paced path when it opens. Leaders buying the course for a team. |
| **Primary actions** | Request private SM3. Read the data sheet. Explore Domain Guides. |
| **Indexability** | Complete; index, follow. Canonical `https://3back.com/training/scrum-mastering-3/`. |
| **Related** | `/courses`, `/training`, `/domain-guides`, LO PDF, data sheet PDF. |
| **Non-goals** | Not SA. Not a ladder. Not Domain Guides itself. |
| **Redirects** | `/courses/rsm-3` 301 here. `/rsm3` if present in `_redirects`. |
| **Header** | Start this conversation → `#sm3-private-inquiry`. |

### `/training/product-ownership-1`

| Field | Intent |
|---|---|
| **Purpose** | Sell Product Ownership I. Promise: Lead a Team. One owner. One backlog. Same chassis as SM1. |
| **Audience** | Individuals on the self-paced path when it opens. Leaders buying the course for a team. |
| **Primary actions** | Request private PO1. Read the data sheet. Explore Domain Guides. |
| **Indexability** | Complete; index, follow. Canonical `https://3back.com/training/product-ownership-1/`. |
| **Related** | `/courses`, `/training`, `/domain-guides`, LO PDF, data sheet PDF. |
| **Non-goals** | Not SA. Not a ladder. Not Domain Guides itself. |
| **Redirects** | `/rpo1` and `/courses/rpo-1` 301 here. |
| **Header** | Start this conversation → `#po1-private-inquiry`. Notify `rpo1-private@3back.com`. |

### `/training/product-ownership-2`

| Field | Intent |
|---|---|
| **Purpose** | Sell Product Ownership II. Promise: Making Hard Decisions. Same chassis as PO1. |
| **Audience** | Individuals on the self-paced path when it opens. Leaders buying the course for a team. |
| **Primary actions** | Request private PO2. Read the data sheet. Explore Domain Guides. |
| **Indexability** | Complete; index, follow. Canonical `https://3back.com/training/product-ownership-2/`. |
| **Related** | `/courses`, `/training`, `/domain-guides`, LO PDF, data sheet PDF. |
| **Non-goals** | Not SA. Not a ladder. Not Domain Guides itself. |
| **Redirects** | `/rpo2` and `/courses/rpo-2` 301 here. |
| **Header** | Start this conversation → `#po2-private-inquiry`. Notify `rpo2-private@3back.com`. |

### `/training/product-ownership-3`

| Field | Intent |
|---|---|
| **Purpose** | Sell Product Ownership III. Live page title Product Ownership III: Leading Agile Organizations. Same chassis as PO1. Public enrollment coming soon. Private live inquiry live. |
| **Audience** | Individuals on the self-paced path when it opens. Leaders buying the course for a team. |
| **Primary actions** | Request private PO3. Read the data sheet. Explore Domain Guides. |
| **Indexability** | Complete; index, follow. Canonical `https://3back.com/training/product-ownership-3/`. |
| **Related** | `/courses`, `/training`, `/domain-guides`, LO PDF, data sheet PDF. |
| **Non-goals** | Not SA. Not a ladder. Not Domain Guides itself. Do not treat the live “Agile” in the subtitle as a brand-home claim. |
| **Redirects** | `/courses/rpo-3` 301 here. `/rpo3` if present in `_redirects`. |
| **Header** | Start this conversation → `#po3-private-inquiry`. |

### `/training/scaling-scrum-with-scrum`

| Field | Intent |
|---|---|
| **Purpose** | Sell Scaling Scrum with Scrum. One course. One mark. Promise: Respond at the scale the work requires. Scaling is a series of moves forced by demand. Scrum stays Scrum. Required prerequisite sits for days before the course. Private live is the offer now. Public enrollment coming soon. |
| **Audience** | Leaders accountable for whether the business can execute. Teams taking the course together. Not individuals collecting the next badge as the primary buyer. |
| **Primary actions** | Request private SSwS. Read the data sheet. Explore Domain Guides. |
| **Indexability** | Complete; index, follow. Canonical `https://3back.com/training/scaling-scrum-with-scrum/`. |
| **Related** | `/courses`, `/training`, `/domain-guides`, LO PDF, data sheet PDF. |
| **Non-goals** | Not a second and third orange badge. Not STS or MTS as public courses. Not a book-cover hero. Not a price. Not Agile Scaling Professional on 3Back. Not Domain Guides itself. Not Recognized Scrum Guide. |
| **Redirects** | `/ssws`, `/courses/scaling-scrum-with-scrum-professional`, `/courses/single-team-scrum`, `/courses/multi-team-scrum` 301 here. |
| **Header** | Start this conversation → `#ssws-private-inquiry`. Notify `ssws-private@3back.com`. |
| **AI line** | Recorded on the page, data sheet, and LO: AI in the work is a participant, not a second system. How it is used can help or hurt a scaling move. |

### `/training/recognized-scrum-guide`

| Field | Intent |
|---|---|
| **Purpose** | Path hub for the Recognized Scrum Guide program. Stage 1. $2100 program. Primary action is Coming soon. Not a buy control this pass. |
| **Audience** | People with three to five years of deep work in one domain. Not a first Scrum class. |
| **Primary action** | Coming soon. One SGO door remains on `/courses`. |
| **Indexability** | Complete; index, follow. Canonical `https://3back.com/training/recognized-scrum-guide/`. |
| **Related** | `/courses`. Coursework inside the program is already on `/training/*`. |
| **Non-goals** | Not checkout. Not Stage 2 attestation machinery on the public page. Not a substitute for domain years. |
| **Redirects** | `/courses/recognized-scrum-guide` and `/rsg` 301 here if those rules are live. Inspect `_redirects` and record what is actually there. Do not invent a redirect. |

---

### `/reviews`

| Field | Intent |
|---|---|
| **Purpose** | Selected social proof. Reviews originally published online or provided directly to 3Back. Historical training feedback is allowed. The page must not present 3Back primarily as an Agile or Scrum training company. |
| **Audience** | Executives and operators checking depth and credibility. |
| **Primary action** | Read selected reviews. Continue to Workshops, Domain Guides, Training, or Events. |
| **Indexability** | Complete. index, follow. Canonical `https://3back.com/reviews`. In the sitemap. |
| **Related** | Footer Company. SM1, CSM, and CSPO “Read 3Back reviews.” |
| **Non-goals** | Not a stub. Not a scan archive. Not a Google/Trustpilot widget. Not comprehensive or representative of every student. Not proof that course feedback equals current Operational Grip outcomes. |

---

### `/courses`

| Field | Intent |
|---|---|
| **Purpose** | Catalog of 3Back course and adjacent offer objects. Complete SGO pages link to their canonical `/training/...` routes. The last band is 3Back’s own remaining offer, not a junk drawer of stubs. |
| **Audience** | Buyers and practitioners evaluating a specific course or the adjacent workshop / program. Not a career-path pitch. |
| **Primary actions** | Open a live course page. Request private delivery from that page. Hybrid SA advanced paths stay on path.3back.com where already linked. |
| **SGO grid now** | RSM1, RSM2, RSM3, RPO1, RPO2, RPO3, Scaling Scrum with Scrum, Recognized Scrum Guide, Domain Guides. |
| **Scaling collapse** | One card: Scaling Scrum with Scrum → `/training/scaling-scrum-with-scrum/`. Single-Team Scrum, Multi-Team Scrum, and Scaling Scrum with Scrum® Professional 301 to that canonical. |
| **Last band** | Heading: Additional 3Back courses, workshops, and programs. Three blocks only: Scrum for Teams → `/courses/scrum-for-teams`; Workshops → `/workshops`; Domain Guides → `/domain-guides`. Quiet charcoal-disc marks. Not credential badges. |
| **Retired** | Adaptive Team Model, Dysfunction Mapping Practitioner, Leading Remote Scrum Teams, and Scrum for Leadership removed from the catalog. Stub pages deleted. Do not 301 those four to SfT. |
| **Indexability** | Complete catalog page; index, follow. |
| **Related** | `/training`, live `/training/*` course pages, `/courses/scrum-for-teams`, `/workshops`, `/domain-guides`, `/why-domain-expertise-matters`. |
| **Non-goals** | Not the brand home. Not Operational Grip theory. Not a six-course ladder. Not Domain Guides as a course. No Industry / Pinnacle card or route. |

---

### `/courses/scrum-for-teams`

| Field | Intent |
|---|---|
| **Purpose** | Sell 3Back’s original private Scrum for Teams course, taught since 2004. Fitted to this organization and this application. Grounded in Exploring Scrum: The Fundamentals. Not a public class. Not a credential. |
| **Audience** | Leaders sending an intact team, or teams that have to share one way of working. |
| **Primary action** | Request a private course. Header Start this conversation → `#sft-private-inquiry`. Notify `sft-private@3back.com`. |
| **Duration** | Typically two days. Optional extra half-day for applied practice, mapping, and context. No third day named. |
| **AI add-on** | AI is a tool and a team member. Part of the team’s operating conditions and state. Not attributed to the 2013 book. |
| **Spokes** | LO rewrite `/courses/scrum-for-teams/learning-objectives`. Data sheet rewrite `/courses/scrum-for-teams-data-sheet`. Loose map: People, Product, Practices. |
| **Indexability** | Complete; index, follow. Canonical `https://3back.com/courses/scrum-for-teams`. |
| **Related** | `/courses` last band. Cover is a history object on the page, not a book landing. |
| **Non-goals** | Not a public seat. Not LMS. Not a badge. Not Domain Guides. Not SA or SGO. Not the four retired Additional course stubs. |
| **Redirects** | `/scrum-for-teams` 301 here. |

---

### `/domain-guides`

| Field | Intent |
|---|---|
| **Purpose** | Conversation funnel for the Domain Guides program. Qualify the reader and take the inquiry. 3Back helps develop the company's own guides. 3Back is not the Guide. |
| **Audience** | Executives and leaders accountable for whether the business can execute. Not individuals collecting a badge. |
| **Primary action** | Submit the on-page form. Header Start this conversation → `#next-step`. |
| **Form** | First name, Last name, Email, Email again, Organization required. What should we know? and Phone optional. Notify `domainguides@3back.com`. Subject `[Domain Guides]`. |
| **Secondary actions** | Reciprocal pair to `/why-domain-expertise-matters`. |
| **Indexability** | Complete; index, follow. Canonical `https://3back.com/domain-guides`. |
| **Related** | Footer Execution. `/why-domain-expertise-matters`. SGO course pages carry the same Domain Guides band. |
| **Non-goals** | Not the course catalog. Not a gated paper. Not the Domain Guides Program PDF. That PDF is a post-intake leave-behind only. Not a second Operational Grip essay. |

---

### `/why-domain-expertise-matters`

| Field | Intent |
|---|---|
| **Purpose** | Argument page. Why domain expertise must be developed in the work. An outside credential does not confer it. Coaches who stay beside the work create coverage, not capability. |
| **Audience** | Executives and senior leaders who inherited or bought generic coaching. |
| **Primary action** | Continue to Domain Guides. Header Start this conversation → `/domain-guides/#next-step`. |
| **Secondary actions** | Reciprocal pair on the page. Quiet Check Your Grip and How 3Back approaches learning. |
| **Indexability** | Complete; index, follow. Canonical `https://3back.com/why-domain-expertise-matters`. |
| **Related** | `/domain-guides`. Linked from `/courses`. |
| **Non-goals** | Not the program home. Not a syllabus. Not a credential page. Not `/contact/` as the primary close. |

---

### `/events`

| Field | Intent |
|---|---|
| **Purpose** | Public live class schedule and registration path (e.g. CSM, A-CSM, related live offerings) |
| **Audience** | People booking live public classes |
| **Primary action** | Find and enter a live event |
| **Indexability** | Complete; index, follow |
| **Related** | Training hybrid reciprocal links where approved |
| **Non-goals** | Not private training sales desk; not OG theory |

---

### `/workshops`

| Field | Intent |
|---|---|
| **Purpose** | Diagnostic workshops for leadership groups examining real work and where execution has lost grip |
| **Audience** | Leadership groups; transformation and operational leaders |
| **Primary action** | Understand workshop offer; path to conversation |
| **Indexability** | Complete; index, follow |
| **Non-goals** | Not open public cert calendar (that is Events) |

---

### `/contact` (Start a Conversation)

| Field | Intent |
|---|---|
| **Purpose** | Commercial and diagnostic contact: observable execution problem, bounded place to begin |
| **Audience** | Prospects ready to describe a real operating problem |
| **Primary action** | Submit contact form (Turnstile → Worker → Resend) |
| **Form (contact)** | Name, Email, Role, Execution problem required; Phone optional |
| **Notify** | Defaults toward `og@3back.com` (see Technical Manifest / contact-form docs) |
| **Indexability** | Complete; index, follow |
| **Non-goals** | Not paper download gate; not newsletter-only signup |

---

### `/about` (and `/about-us` if present in sitemap)

| Field | Intent |
|---|---|
| **Purpose** | People and posture behind 3Back; credibility without turning the site into a bio stack |
| **Audience** | Visitors checking who they would work with |
| **Primary action** | Trust → Start a Conversation |
| **Indexability** | Complete; index, follow |

---

### `/policies` (Course Policy)

| Field | Intent |
|---|---|
| **Purpose** | Course policies for on-demand, in-person, and live online public courses |
| **Audience** | Course buyers and participants |
| **Indexability** | Complete; index, follow |
| **Non-goals** | Not brand narrative |

---

### `/privacy-policy`

| Field | Intent |
|---|---|
| **Purpose** | Legal privacy notice for 3Back, LLC |
| **Audience** | Users and regulators |
| **Indexability** | Complete; index, follow |
| **Also records** | First-party uncaught script failures: known public path, kind, standard error name, first-party file and line. No message text. Weekly staff summary plus a four-week history on `/docs/client-errors`. |

---

### `/docs`

| Field | Intent |
|---|---|
| **Purpose** | Staff reading copies of current control files. One URL to type. Not a visitor product. |
| **Audience** | Four named 3Back staff email addresses |
| **Primary action** | Open a source file. Do not edit the live page. Changes go through the markdown, then a package. |
| **Indexability** | Complete for staff use. **noindex, nofollow**. Not in the sitemap. Not in header, footer, or Explore. |
| **Gate** | Cloudflare Access with an emailed one-time PIN. Session duration is one month. |
| **Protected scope** | `/docs`, `/docs/*`, `/assets/docs/*`, `/api/client-errors/history`, and `/api/deployments/history`. Production and preview `workers.dev` URLs are disabled to prevent bypass. |
| **Public scope** | Public website routes and `/api/client-error` remain outside Access. `/api/client-errors/digest` remains protected by its existing request-header secret for automation. |
| **Groups** | Work: Backlog, Publisher Role, Acceptance checks, Client errors. Technical: Technical Manifest, Redirect Map, AGENTS, Contact form, LMS, Sitemap, GitHub repository. Marketing: Brand brief, Visual Direction, Site Intent Map, Appendix A: SA Exception. |
| **Sitemap link** | `https://3back.com/sitemap-index.xml`. Not `/sitemap.xml`. |
| **Non-goals** | Not a public library. Not a second source of truth. Not a general login for public website routes. |

### `/docs/client-errors`

| Field | Intent |
|---|---|
| **Purpose** | Four-week cabinet of weekly first-party error summaries. The Monday email is the nudge. This page is the file. |
| **Indexability** | **noindex, nofollow**. Not in the sitemap. |
| **Retention** | Frozen weekly bodies, newest first, max four weeks. Event records expire in 14 days. |
| **Empty state** | No reports yet. |
| **Non-goals** | Not analytics. Not a replacement for the email. Not a visitor diagnostic UI. |

### `/docs/backlog`

| Field | Intent |
|---|---|
| **Purpose** | Staff working list. To Do and Done. Successful deployments is a separate section. |
| **Current state** | To Do and Done have no items. Successful deployments may list GitHub pushes to `main` as a proxy. That is not Cloudflare build success. |
| **Indexability** | **noindex, nofollow**. |
| **Non-goals** | Not a public roadmap. Do not invent To Do items. Do not call a PushEvent a successful deploy. |

---

### `/scrum-alliance-path-images`

| Field | Intent |
|---|---|
| **Purpose** | Temporary bridge that preserves exact historical public image URLs so external Scrum Alliance course listings can continue to hotlink them without change. Also provides a human-readable inventory of those assets. |
| **Audience** | External systems (Scrum Alliance) that reference the image URLs; internal operators who need to see which assets are still being served. |
| **Primary action** | None for human visitors. The page exists so the assets remain reachable at their original paths. |
| **Indexability** | Complete page; **noindex, nofollow**. Excluded from sitemap. |
| **Assets** | 13 files under `/wp-content/uploads/...` paths that must not be renamed, moved, or optimized. |
| **Non-goals** | Not brand content; not a marketing page; not linked from header or footer navigation; not a long-term destination. Remove or retire when Scrum Alliance no longer depends on these URLs. |

---

### `/scrum-101`

| Field | Intent |
|---|---|
| **Purpose** | Old-reference download page for Scrum 101: A Pocket Guide. How 3Back taught Scrum prior to 2024. Not current operating doctrine. |
| **Audience** | People who need the historical primer (including course prep). |
| **Primary action** | Download the PDF. |
| **Indexability** | Complete; index, follow. |
| **Related** | Ideas Books list; FAQ mentions of Scrum 101; legacy /resources/scrum-101 and the old WordPress PDF URL 301 here. |
| **Non-goals** | Not a course page; not Operational Grip; not a new Resources hub. |

---

### `/ideas`

| Field | Intent |
|---|---|
| **Purpose (target)** | Written-work hub: papers, posts, books. Analog closer to Atlantic Ideas / Stripe Press than a news wire |
| **Current state** | Complete; **index, follow**. Books list includes Scrum 101: A Pocket Guide → /scrum-101 |
| **Primary action (future)** | Browse recast and new work under OG lens |
| **Related** | Papers include No Head Works Alone and How 3Back Approaches Learning; posts; books; Tales of the Grip remains a separate place |
| **Non-goals** | Not CNN clone; not infographic dump; not company P&L hit series |

---

## Active campaigns / gated assets

| Campaign | Surface | Transaction | From | Notify |
|---|---|---|---|---|
| No Head Works Alone paper | `/papers/no-head-works-alone` | `gated_paper` | `noreply@3back.com` | `og@3back.com` · `[Paper] no-head-works-alone` |
| Domain Guides inquiry | `/domain-guides` | on-page form | existing contact/from stack | `domainguides@3back.com` · `[Domain Guides]` |

---

## Redirects / legacy (intent only)

| Legacy pattern | Intent |
|---|---|
| Old Insights / Articles / Papers as top-level destinations | Consolidate under Ideas (when real) + specific paper routes; Tales of the Grip for the cartoon series |
| `/insights` and related legacy URLs | Redirect over time; do not rebuild as parallel hubs |

Exact redirect table lives with technical publishing; this map only records **intent to consolidate**.

---

## Backlog epics (upcoming)

These are the next large chunks after the minimal releasable site. Not scheduled here—only named so intent stays visible. Each still runs Stage 1–8 when opened. Nothing in this list is live intent until implemented and this map is updated at Stage 8.

| Epic | Intent when done |
|---|---|
