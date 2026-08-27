# SESSION.md — Current Session State

Snapshot of "where we are right now." Concise enough that a future session can reload in ~1–2 minutes. Updated at the end of every development session.

---

## Current Feature

**Hero dark-core anchoring fix** — the soft dark radial disc (`aura-core`) previously lived in the page-level `HeroAura` backdrop and drifted independently of the profile photo. It is now structurally anchored inside `CloudOpsCenter` as a centered child of the same platform-core wrapper as the portrait, so disc and photo move/scale/reposition together on every viewport.

---

## Feature Status

- **Hero anchoring fix:** COMPLETED and browser-QA verified.
- Innermost observability ring is now static; outer rings and arc illuminations continue their existing parallax/orbital animations.
- No visual redesign, size change, or layout change introduced.

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
- **Hero anchoring fix:** Removed independent `animate-core-drift` from the innermost observability capability plane in `CloudOpsCenter` so it stays centered on the portrait while outer rings and arcs keep animating.

---

## Files Changed

- `src/components/site/cloud-ops-center.tsx` — conditionally excluded `animate-core-drift` for the `observability` capability plane; updated comment to explain anchoring intent.
- `SESSION.md` — updated current state.

---

## Validation Completed

- Repository inspection: yes (targeted read of `cloud-ops-center.tsx`).
- `tsc --noEmit`: **PASS** (TypeScript compiles without errors).
- `eslint src/components/site/cloud-ops-center.tsx`: **NOT GREEN** due to pre-existing Prettier/formatting errors at lines 160–161 (unrelated to this fix; formatting cleanup is a separate feature).
- `bun run build`: **PASS** (production build succeeds).
- Browser QA: **PASS** (Playwright screenshots at 1280×900, 768×1024, 390×844; time-series screenshots at 0/4/9/13/18s confirm inner ring remains centered on portrait).

---

## Known Issues

### Hero blockers (resolved)

- **Inner observability ring drifted independently of portrait** — fixed by removing its `animate-core-drift` class.

### Repository-wide deferred cleanup (audit findings, not Hero blockers)

- **UI kit / dependency bloat:** `src/components/ui/**` (~36 dead files) and many unused Radix/RHF/chart/recharts/calendar packages under `node_modules`. Removal is a **separate feature** after evaluating each for future value. Do not bundle into Hero work.
- **Google Fonts blocking render:** external stylesheet; plan to switch to `@fontsource` self-hosted.
- **Profile image not optimized:** no WebP/AVIF variants, no `srcset`, no `fetchpriority`. Replacement is part of the Portrait primitive proposal; not blocking the Hero visually.
- **Hardcoded content** in `index.tsx` (`TOKENS`, `RESERVED`) — flagged for `src/content/` separation as a separate feature.
- **Split `CloudOpsCenter`** — architectural refactor; justified only if it lands in its own refactor milestone per the "do not mix unrelated cleanup" rule. Default-defer.
- **Test setup absent:** no Vitest, React Testing Library, or Playwright installed. Add as its own feature.
- **Formatting/Prettier cleanup** of Lovable-generated codebase (separate from Hero scope; `eslint` currently fails on formatting in several files).

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
- Formatting/Prettier cleanup of Lovable-generated codebase (separate from Hero scope).

---

## NEXT EXACT STEP

Await user review of the hero anchoring fix; if approved, commit the change.

---

## GIT STATE

- **Branch:** `main`
- **Working tree:** modified by this session.
- **Files changed:**
  - `M src/components/site/cloud-ops-center.tsx`
  - `M SESSION.md`
- **Last commits:**
  - `c40648b` docs: add Claude project continuity system
  - `e0f295b` Add project README
  - `36a0807` Refined hero and nav polish
  - `f6740b5` Changes
  - `fe5f895` Work in progress
  - `bc49716` Refined Hero with new copy
