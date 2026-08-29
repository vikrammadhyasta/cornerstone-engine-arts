# SESSION.md — Current Session State

Snapshot of "where we are right now." Concise enough that a future session can reload in ~1–2 minutes. Updated at the end of every development session.

---

## Current Feature

**Add AWS AI/ML credential to Credential Registry** — added one new credential record (`Fundamentals of AWS AI and ML Solutions`) to the existing data-driven Credential Registry, using the uploaded Coursera certificate PDF as the document and a rendered PNG as the preview image. No UI, layout, or other credentials were changed.

---

## Feature Status

- **AWS AI/ML credential addition:** COMPLETED and browser-QA verified.
- Added `coursera-aws-ai-ml.pdf.asset.json` and `coursera-aws-ai-ml.png.asset.json` Lovable CDN asset pointers.
- Added one record to `src/lib/credentials.ts` with the exact title, issuer (`Whizlabs · Coursera`), category (`AI`), type (`Course Certificate`), completion date (`March 2026`), status (`completed`), description, document/preview URLs, and verification URL (`https://coursera.org/verify/DDV1GHRJQMHA`).
- Existing credentials, registry layout, card design, modal, and certificate viewer remain unchanged.

---

## Approved Design Decisions

These are design decisions that are **already approved** and must not be changed without a new approval round.

### Hero — desktop + mobile

- **Brand:** Vikram Madhyasta
- **Availability indicator:** "Open to Cloud • DevOps • Platform Roles" (pulse dot + label, dark-first glassy pill)
- **Headline:** "Engineering cloud platforms with Kubernetes, Infrastructure as Code, and automation."
- **Supporting description:** "I build and automate cloud infrastructure across AWS, Kubernetes, Terraform, CI/CD and GitOps — with reliability, observability, security and maintainability built into the workflow."
- **Primary CTA:** "Explore Projects" (anchor → `#projects`)
- **Secondary CTA:** "Download Resume" (downloads `/resume.pdf`)
- **Recruiter facts**:
  - Currently — M.Tech Cloud Computing
  - Seeking — Cloud / DevOps / Platform
  - Focus — AWS • Kubernetes • Terraform
- **Signature visual:** Platform Core
  - Capability layers: Cloud (AWS) → Platform (K8s) → Delivery (IaC) → Observability (SLO)
  - Operator portrait at center
  - Compact mobile legend replaces desktop capability markers below `sm`
- **Inner observability ring:** must remain centered on the portrait at all times (no independent drift).

### Source of approved design

Lovable. The current implementation is synchronized from an approved Lovable design and is the visual reference.

---

## Architecture Proposals — NOT APPROVED

These are **recommendations from the audit**, not yet approved. Listed for context, not committed behavior.

> **Warning:** Future sessions must not treat these proposals as accepted architecture. Re-evaluate them against actual feature complexity before implementation.

- Treat Hero presentation as **content-driven**: split copy/data into `src/content/hero.ts` (and `src/content/site-nav.ts`, `src/content/platform-core.ts`).
- Split `CloudOpsCenter` into a `src/components/site/platform-core/` package — one component per concern (public, arcs, portrait, mobile legend, layer config).
- Extract primitives: `QuickFacts` (`<dl>` UI), `Pill` (status pill), `Container` (`container-page` wrapper).
- Add `src/lib/prefers-reduced-motion.ts` SSR-safe hook so component-level `motion-reduce:animate-none` Tailwind utilities are reinforced without duplication.
- Replace Google Fonts `<link>` stylesheet with self-hosted `@fontsource/sora`, `@fontsource/manrope`, `@fontsource/jetbrains-mono`.
- Replace raw `<img>` for portrait with a thin `Portrait` component owning alt, `loading`, `decoding`, future `fetchpriority`, future `<picture>`.
- Add `src/lib/meta.ts` returning `homeMeta()` so homepage title/description/og uniform.
- Defer UI kit (`src/components/ui/*`) and unused Radix/calendar/chart/recharts/etc. **deletion** until usage and architectural value are evaluated in a separate cleanup feature.

---

## Work Completed

- Read-only repository audit covering: framework + versions, React + TS config, build tooling, Tailwind v4 setup, directory layout, Hero, CloudOpsCenter, SiteNav, responsiveness, animations, reduced-motion handling, accessibility, image handling, font loading, design tokens, icons, dependencies, bundle/perf, SEO/meta, hardcoded content, dead code, security, maintainability.
- Wrote full categorized review (Critical / High / Medium / Low) and sections F–O (Accessibility, Responsive, Performance, Dependency assessment, Proposed architecture, Files to modify / create / delete, Implementation sequence, Risks).
- **Created `CLAUDE.md`** (stable project instructions).
- **Created `SESSION.md`** (this file).
- **Sprint 2 Hero productionization:** Implemented browser-verified production Hero with accessibility and performance improvements.
- **Profile photo replacement:** swapped placeholder portrait for uploaded photo via Lovable CDN asset pointer; updated import in `CloudOpsCenter`.
- **Credential Registry population:** Added AWS Academy Cloud Architecting, AWS Cloud Practitioner Essentials, AWS Academy Cloud Foundations, AWS Academy Cloud Operations, AWS Academy Cloud Security Foundations, Coursera Azure Cloud Services, and Coursera AWS AI/ML Solutions credentials using real uploaded certificates and verification URLs.

---

## Files Changed

- `src/assets/certificates/coursera-aws-ai-ml.pdf.asset.json` — new CDN asset pointer for the uploaded AWS AI/ML certificate PDF.
- `src/assets/certificates/coursera-aws-ai-ml.png.asset.json` — new CDN asset pointer for the rendered PNG preview.
- `src/lib/credentials.ts` — added imports and one new `coursera-aws-ai-ml-solutions` credential record.
- `SESSION.md` — updated current state.

---

## Validation Completed

- Repository inspection: yes (targeted read of `src/lib/credentials.ts` and certificate PDF text extraction).
- `bunx tsc --noEmit`: **PASS**.
- `bunx eslint src/lib/credentials.ts`: **PASS**.
- `bun run build`: **PASS** (production build succeeds).
- Browser QA: **PASS** (Playwright verified card appears under All and AI filters, modal opens once, certificate renders at original aspect ratio `1650x1275`, no duplicate "View credential" inside modal, "Verify credential" links to `https://coursera.org/verify/DDV1GHRJQMHA` with `target="_blank"`).

---

## Known Issues

### AWS AI/ML credential addition blockers (resolved)

- **New certificate needed asset upload and data record** — completed; PDF and PNG pointers created, record added, and preview verified.

### Repository-wide deferred cleanup (audit findings, not credential blockers)

- **UI kit / dependency bloat:** `src/components/ui/**` (~36 dead files) and many unused Radix/RHF/chart/recharts/calendar packages under `node_modules`. Removal is a **separate feature** after evaluating each for future value. Do not bundle into credential work.
- **Google Fonts blocking render:** external stylesheet; plan to switch to `@fontsource` self-hosted.
- **Profile image not optimized:** no WebP/AVIF variants, no `srcset`, no `fetchpriority`. Replacement is part of the Portrait primitive proposal; not blocking the Hero visually.
- **Hardcoded content** in `index.tsx` (`TOKENS`, `RESERVED`) — flagged for `src/content/` separation as a separate feature.
- **Split `CloudOpsCenter`** — architectural refactor; justified only if it lands in its own refactor milestone per the "do not mix unrelated cleanup" rule. Default-defer.
- **Test setup absent:** no Vitest, React Testing Library, or Playwright installed. Add as its own feature.
- **Formatting/Prettier cleanup** of Lovable-generated codebase (separate from credential scope; `eslint` currently passes on the modified file).

---

## Deferred Work

- Phase 1 — bundle hygiene and content separation (audit-recommended).
- Phase 2 — performance (self-host fonts, optimized portrait).
- Phase 3 — accessibility hardening (`z-skiplink`, sr-only Platform Core summary, alt policy).
- Phase 4 — content model: real `#projects`, `#engineering`, `#experience`, `#contact` Sections.
- Phase 5 — SEO + social preview (og-image, JSON-LD).
- Phase 6 — Vitest + RTL component tests.
- Phase 7 — CI: `bun run check` script (`tsc --noEmit && eslint .`).
- Repository audit sections N + M (Files to modify / create / delete) — open table; Phase 1 will pick from it.
- Formatting/Prettier cleanup of Lovable-generated codebase (separate from credential scope).

---

## NEXT EXACT STEP

Await user review of the AWS AI/ML credential addition; if approved, commit the change.

---

## GIT STATE

- **Branch:** `main`
- **Working tree:** modified by this session.
- **Files changed:**
  - `A src/assets/certificates/coursera-aws-ai-ml.pdf.asset.json`
  - `A src/assets/certificates/coursera-aws-ai-ml.png.asset.json`
  - `M src/lib/credentials.ts`
  - `M SESSION.md`

- **Last commits:**
  - `c40648b` docs: add Claude project continuity system
  - `e0f295b` Add project README
  - `36a0807` Refined hero and nav polish
  - `f6740b5` Changes
  - `fe5f895` Work in progress
  - `bc49716` Refined Hero with new copy
