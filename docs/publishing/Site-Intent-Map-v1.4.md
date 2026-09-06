# 3Back Site Intent Map

**Version:** 1.4  
**Date:** 2026-09-06  
**Scope:** record /papers/how-3back-approaches-learning, the live SM1 family, and /reviews stub (Stage 8 closeout)  
**Twin to:** Technical Manifest (`docs/publishing/technical-manifest.md`)  
**Update rule:** Stage 8 closeout only (after live verification). Increment version on material change.

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
| Ideas | Written-work hub (papers, posts, books). Currently stub; not a finished destination |
| About | Who is behind 3Back |
| Start a Conversation | Primary commercial contact action |

### Footer Explore

| Item | Intent |
|---|---|
| Operational Grip | Core idea (web-facing intro / awareness) |
| Ideas | Written work hub (when real) |
| Doomscroll | Place for Tales of the Grip series |

Papers and Articles are **formats inside Ideas**, not separate footer destinations.

### Footer Learning / Company

Training, Workshops, Domain Guides, Events, About, Start a Conversation, Privacy, Course Policy — operational and legal paths. Not the brand center.

---

## Routes

### `/` — Homepage

| Field | Intent |
|---|---|
| **Purpose** | Orient a visitor to 3Back as the Team Execution Company; show the operating lens; route into Operational Grip, written work, and contact |
| **Audience** | Executives and leaders accountable for organizational execution; operators who feel the problem before they have the language |
| **Primary actions** | Start a Conversation; Explore Operational Grip; open Current Thinking cards (paper, Tales) |
| **Indexability** | Complete; index, follow |
| **Non-goals** | Not a course catalog; not a news wire; not a Scrum marketing home |

**Section intent (homepage)**

| Section | Purpose |
|---|---|
| Hero | Name the problem (boundaries / team execution) and offer contact or OG path |
| How 3Back Works / operating lens | Show the observable → local change → observe effects loop without a sales pitch |
| Current Thinking | Two quiet cards: paper (No Head Works Alone) and Tales of the Grip (Doomscroll). Tease, do not dump library |
| Other bands | Support recognition of execution failure and bounded action; no loud cert marketing |

---

### `/operational-grip`

| Field | Intent |
|---|---|
| **Purpose** | Web-facing introduction and awareness for Operational Grip. Lead-gen / orientation to the idea—not the book and not the deep library |
| **Audience** | Leaders who need language for “we look busy but execution is impaired” |
| **Primary actions** | Understand the idea; path toward conversation or related surfaces |
| **Indexability** | Complete; index, follow |
| **Non-goals** | Not the full manuscript; not a training syllabus; not a credential page |

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

### `/doomscroll`

| Field | Intent |
|---|---|
| **Purpose** | Destination for **Tales of the Grip**—a recurring editorial cartoon about organizational execution. Recognition first; instruction never |
| **Audience** | Same multi-level audience as OG: executives through practitioners; humor must cut both ways |
| **Primary action** | Read the sample; recognize the pattern; return for episodes as they ship |
| **Indexability** | Complete; index, follow |
| **Related** | Homepage right Current Thinking card; Footer Explore |
| **Non-goals** | Not Ideas; not Operational Grip explainer; not a fake episode grid; not a sales CTA page; not company hit pieces |

Place name = **Doomscroll**. Series name on page = **Tales of the Grip**.

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
| **Related** | `/courses`, `/training`, `/domain-guides`, `/reviews`, LO PDF, data sheet PDF. |
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

### `/reviews`

| Field | Intent |
|---|---|
| **Purpose** | 3Back review archive. Stub until the archive is loaded. |
| **Indexability** | Stub. noindex, nofollow. Not in the sitemap. |
| **Related** | SM1 reviews band. Later other commercial pages. |

---

### `/courses`

| Field | Intent |
|---|---|
| **Purpose** | Course catalog / listing surface for private and hybrid credential paths |
| **Audience** | Buyers and practitioners evaluating specific courses |
| **Primary actions** | Request private delivery; follow hybrid options (including path.3back.com and events where applicable) |
| **Indexability** | Present in sitemap; treat as catalog surface (stubs acceptable for individual courses over time) |
| **Non-goals** | Not the brand home; not Operational Grip theory |

---

### `/why-domain-expertise-matters`

| Field | Intent |
|---|---|
| **Purpose** | Explain why domain expertise must be developed in the work. An outside credential does not transfer expertise into the operating context. Coaches without domain expertise can create coverage and framework theater without building capability. |
| **Audience** | Executives and senior leaders who inherited or bought generic coaching. |
| **Primary action** | Start a Conversation (`/contact/`). |
| **Secondary actions** | Grip Check (`/grip-check/`) and Domain Guides (`/domain-guides/`). |
| **Indexability** | Complete; index, follow. |
| **Related** | Linked from `/courses`. This is not the Domain Guides program page. |
| **Non-goals** | Not a syllabus. Not a credential page. Not `/domain-guides`. |

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
| **Related** | Papers include No Head Works Alone and How 3Back Approaches Learning; posts; books; Doomscroll remains a separate place |
| **Non-goals** | Not CNN clone; not infographic dump; not company P&L hit series |

---

## Active campaigns / gated assets

| Campaign | Surface | Transaction | From | Notify |
|---|---|---|---|---|
| No Head Works Alone paper | `/papers/no-head-works-alone` | `gated_paper` | `noreply@3back.com` | `og@3back.com` · `[Paper] no-head-works-alone` |

---

## Redirects / legacy (intent only)

| Legacy pattern | Intent |
|---|---|
| Old Insights / Articles / Papers as top-level destinations | Consolidate under Ideas (when real) + specific paper routes; Doomscroll for Tales |
| `/insights` and related legacy URLs | Redirect over time; do not rebuild as parallel hubs |

Exact redirect table lives with technical publishing; this map only records **intent to consolidate**.

---

## Backlog epics (upcoming)

These are the next large chunks after the minimal releasable site. Not scheduled here—only named so intent stays visible. Each still runs Stage 1–8 when opened. Nothing in this list is live intent until implemented and this map is updated at Stage 8.

| Epic | Intent when done |
|---|---|
