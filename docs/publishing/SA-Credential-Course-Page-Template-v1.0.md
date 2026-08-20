# 3Back SA Credential Course Page Template v1.0

**Status:** Standing pattern  
**Source of truth:** Live `/certified-scrummaster-training/` (2026-08-20)  
**Governs:** Official Scrum Alliance® credential course pages only (CSM, CSPO, A-CSM, CSP-SM, A-CSPO, CSP-PO, and any later SA credentials delivered the same way)  
**Brand rule:** SA Course Ecosystem exception (Appendix A). Commercial push is allowed inside this sub-system. Primary brand hierarchy is unchanged: execution work leads; training is entry, not the center.

This document is the template. Future SA course pages copy structure, posture, schema shape, and claim discipline from the CSM page. They do not invent a new layout.

---

## 1. Purpose of each page

Each page sells one official Scrum Alliance® credential course.

It must:
- Explain what the credential is
- Explain why take it with 3Back
- Show what is included
- Offer private (primary) and open-enrollment paths
- Support exam readiness claims that are true for that course
- Convert to private request or events schedule
- Stay inside the SA sub-ecosystem (no Operational Grip pitch, no Scrum for Teams wormhole)

Audience (same for all six unless Douglas changes it):
- Primary: leaders and managers sending people or teams
- Secondary: individuals who need to become effective on a Scrum team

---

## 2. Route and naming

| Credential | Preferred route |
|------------|-----------------|
| CSM | `/certified-scrummaster-training/` |
| CSPO | `/certified-scrum-product-owner-training/` (or existing live path if already set) |
| A-CSM | follow same `certified-…-training` pattern |
| CSP-SM | same pattern |
| A-CSPO | same pattern |
| CSP-PO | same pattern |

Rules:
- One credential per page
- Indexable complete page
- Canonical on 3back.com
- No footer nav listing of individual credentials (inbound from Training, Courses, Events, FAQ only)

---

## 3. Required page sections (order)

Copy this order. Do not reorder for taste.

### 3.1 Hero
- Eyebrow: `Scrum Alliance® credential`
- H1: full credential name with ® where required (e.g. `Certified ScrumMaster® Training`)
- One-sentence promise: official course + founding-era delivery claim (credential-specific name only)
- Primary CTA: **Request an on-site (or private virtual) course**
- Official badge: full transparent PNG, never cropped, never with a rule through it
- Optional hero visual: commercial SA posture (can be stronger than quiet-authority primary brand). Prefer craft/substance over stock faces unless Douglas approves faces for a specific course.

### 3.2 Private request form (on-page)
Expand/reveal on CTA click. Same Worker/Turnstile/Resend pattern as CSM.

Fields (all required unless noted):
- First name
- Last name
- Email
- Email again
- Company name
- Note

Destination: `requestonsitecourse@3back.com` (or the approved course-request mailbox).  
Success: short confirmation on page. No new Zaraz event required unless Douglas adds one later.

### 3.3 What the credential is
Short foundation block:
- What the credential is from Scrum Alliance
- Hours / live instruction
- Prerequisites (usually none for foundational)
- Exam shape if applicable
- Taught by Certified Scrum Trainer® (or correct SA trainer designation)

### 3.4 Social proof strip (when approved assets exist)
Static, declared, not linked until a `/reviews` page exists:
- Five gold stars
- **4.8**
- Based on thousands of student reviews
- Award-winning mark (laurel or equivalent)
- 25,000+ students trained

Do not invent review counts. Use only verified language Douglas has locked.

### 3.5 Why take it with 3Back
Required claims (adapt credential name only):
- Delivered continuously from the days of inception to the present
- 25,000+ students
- Judgment and applied practice, not framework recitation
- Credential that sticks in real organizations, not résumé theater

Optional short About line only if it stays true to site About and does not reintroduce retired “make teams better” language.

### 3.6 What you get with 3Back
Numbered or listed inclusions. CSM baseline (adjust only when the course truly differs):

1. Live instruction with a Certified Scrum Trainer®
2. Study and practice support (Study Guide / course materials written for this class)
3. Exam and membership path included where SA rules allow

Explicit inclusion list must include, when true for that course:
- Official live course hours
- Course-specific study materials
- Practice exams (if offered)
- LMS access
- Exam fee and attempt rules
- Membership upon passing (if applicable)
- Pass-rate support language only when true (CSM uses 99%)

CTA: **Download the [Credential] data sheet** for agenda and logistics.

Secondary: link to `/scrum-alliance-courses-faq/#` + credential anchor.

### 3.7 How teams take the course
Private-first:
- Most organizations bring the course in as private training (onsite or virtual) so the group shares one language
- Open enrollment via `/events` when that fits
- Either path = same credential and same preparation support

Repeat CTAs:
- Request an on-site (or private virtual) course
- View course schedule

### 3.8 Who this is for
- Primarily leaders/managers sending people or teams
- Also individuals who need to become effective members of a Scrum team
- Do not deny the individual; do not center the page on solo résumé seekers

### 3.9 Closing path band
- Request on-site / private virtual
- View course schedule
- Download data sheet
- Scrum Alliance Courses FAQ (deep link to credential section)

### 3.10 Legal
`[Credential]® is a certification mark of Scrum Alliance, Inc.`  
Use ® on Scrum Alliance®, Certified ScrumMaster® / credential name, CSM® / short form, Certified Scrum Trainer® as required.

---

## 4. Writing rules

- No em dashes (—) or en dashes used as em dashes. Periods or commas only.
- Commercial and clear. This sub-ecosystem may be louder than primary quiet-authority pages.
- No Operational Grip pitch on these pages.
- No Scrum for Teams cross-sell on these pages (deferred wormhole).
- No “we make teams better.”
- Registered marks correct.
- Do not invent statistics, pass rates, review counts, or history claims.

---

## 5. SEO / schema / discovery

**Title pattern:** `[Full Credential Name] Training | 3Back`  
Example: `Certified ScrumMaster® Training | 3Back`

**Meta description:** official credential + founding-era delivery + private/open + materials + volume claim. No Scrum/Agile fluff beyond the credential itself.

**Robots:** `index, follow`  
**Canonical:** production URL for that course  
**Sitemap:** include

**Course schema (required):**
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "[Credential] Training",
  "description": "[meta-aligned description]",
  "provider": {
    "@type": "Organization",
    "name": "3Back",
    "url": "https://3back.com/"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Private training",
      "url": "https://3back.com/contact/",
      "description": "Private onsite or virtual [Credential] training."
    },
    {
      "@type": "Offer",
      "name": "Open enrollment",
      "url": "https://3back.com/events",
      "description": "Open enrollment seats are available through scheduled events."
    }
  ]
}
```

FAQ schema lives on `/scrum-alliance-courses-faq/`, not duplicated as the primary FAQ surface on every course page.

---

## 6. Visual posture (SA exception)

- Paper / charcoal / sparse amber
- Stronger commercial energy than primary brand pages is allowed
- Full official SA badge, transparent, never cropped
- Prefer substance imagery (materials, craft) over stock classroom faces unless approved
- Data sheet download must work (static public PDF path; Worker must not break on import)
- Mobile: badge centered; CTAs usable; form usable

---

## 7. Companion data sheet (required for each credential)

Two-page searchable PDF leave-behind.

**Page 1:** sell + logistics  
- Full badge  
- Why team training  
- Client quote block when approved  
- Short About (site-aligned)  
- Why 3Back  
- What every participant receives  
- At a Glance  
- Included materials with real book/cover art when available  
- No orange bar through headings  
- No CTA banner covering art  

**Page 2:** agenda + outcomes  
- What the class covers  
- Course outcomes (roomy, not cramped)  
- Your goals (blank lines for private delivery)  
- Full agenda sections  
- Larger bottom CTA: Request on-site / private virtual  
- Legal line  

**File naming:** `3Back-[Credential]-Data-Sheet-vX.Y.pdf`  
**Live path:** stable `/downloads/…` URL linked from the course page.

Round-one CSM reference: `3Back-CSM-Data-Sheet-v1.6.pdf`.

---

## 8. Linking surface

Inbound only:
- `/training`
- `/courses` (catalog)
- `/events` (when dates exist)
- `/scrum-alliance-courses-faq/#…`

Do **not** list individual SA credentials under footer Learning. Footer stays Training · Workshops · Events.

---

## 9. Explicit exclusions (all SA credential pages)

- Operational Grip pitch
- Scrum for Teams recommendation
- Footer credential list
- Fake review pages or invented counts
- Membership/login walls
- Em dashes in public copy
- Cropped badges
- Broken data-sheet downloads
- Silent “quiet authority” imagery that does no selling work in this sub-ecosystem

---

## 10. Implementation checklist (per new course page)

1. Confirm credential name, hours, exam rules, materials, pass-rate language with Douglas  
2. Lock route  
3. Clone CSM section order and CTA pattern  
4. Swap credential-specific copy, badge, materials, FAQ anchor  
5. Course schema  
6. Private request form wired to approved mailbox  
7. Data sheet PDF (searchable) + working download URL  
8. Events schedule only if dates exist  
9. Local review: desktop + mobile, badge, form, PDF, schema  
10. Douglas approval before commit / push / deploy  

---

## 11. Repo placement (recommended)

When authorized into the publishing repo:

`docs/publishing/SA-Credential-Course-Page-Template-v1.0.md`

Also reference from Appendix A (SA Course Ecosystem) so future course work cannot “forget” the commercial pattern.

---

## 12. Version

- **v1.0** — 2026-08-20  
- Source: live CSM page + approved data sheet direction  
- Residual social-proof and imagery polish may still iterate on CSM; template absorbs locked outcomes, not every residual experiment
