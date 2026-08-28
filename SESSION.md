# SESSION.md — Current Session State

Snapshot of "where we are right now." Concise enough that a future session can reload in ~1–2 minutes. Updated at the end of every development session.

---

## Current Feature

**Responsive dark core visibility** — the large dark radial disc behind the portrait/orbit in the homepage Platform Core is now hidden on tablet and mobile, while the orbital rings, technology icons, and portrait remain fully visible. No layout, animation, or desktop appearance changed.


---

## Feature Status

- **Profile photo replacement:** COMPLETED and browser-QA verified.
- Replaced `src/assets/profile-photo.jpg` with `src/assets/profile-photo.jpg.asset.json` pointing to the uploaded photo on the Lovable CDN.
- Updated `src/components/site/cloud-ops-center.tsx` import to use the asset URL.
- **Responsive dark core visibility:** COMPLETED and browser-QA verified.
- Targeted the `aura-reveal` wrapper containing `aura-core` in `cloud-ops-center.tsx` with `hidden lg:block`.
- Desktop/laptop: dark radial disc remains visible with original size, glow, and animation.
- Tablet/mobile: only the dark radial disc is hidden; orbital rings, technology icons, portrait, and all animations remain.
- No layout, text, routing, navigation, project pages, project cards, or other sections modified.


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


---

## Files Changed

- `src/assets/profile-photo.jpg.asset.json` — new CDN asset pointer for the uploaded profile photo.
- `src/components/site/cloud-ops-center.tsx` — changed portrait import to use the asset pointer URL; added `hidden lg:block` to the `aura-reveal` dark-radial-disc wrapper so it hides on tablet/mobile while desktop/laptop keep the original glow and animation.

- `SESSION.md` — updated current state.

---

## Validation Completed

- Repository inspection: yes (targeted read of `cloud-ops-center.tsx`).
- `tsc --noEmit`: **PASS** (TypeScript compiles without errors).
- `eslint src/components/site/cloud-ops-center.tsx`: **NOT GREEN** due to pre-existing Prettier/formatting errors at lines 160–161 (unrelated to this fix; formatting cleanup is a separate feature).
- `bun run build`: **PASS** (production build succeeds).
- Browser QA: **PASS** — Playwright verification at 1280×900, 768×1024, 390×844 confirms:
  - Desktop: dark radial core visible; orbital rings, portrait visible.
  - Tablet: dark radial core hidden; orbital rings, portrait visible.
  - Mobile: dark radial core hidden; mobile orbit ring and portrait visible; desktop orbit correctly switches to compact mobile composition.

---

## Known Issues

### Profile photo replacement blockers (resolved)

- **Placeholder portrait needed replacement** — replaced with uploaded photo via Lovable CDN asset pointer; no visual distortion or overflow on desktop/tablet/mobile.


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

Await user review of the profile photo replacement; if approved, commit the change.


---

## GIT STATE

- **Branch:** `main`
- **Working tree:** modified by this session.
- **Files changed:**
  - `M src/components/site/cloud-ops-center.tsx`
  - `A src/assets/profile-photo.jpg.asset.json`
  - `D src/assets/profile-photo.jpg`
  - `M SESSION.md`

- **Last commits:**
  - `c40648b` docs: add Claude project continuity system
  - `e0f295b` Add project README
  - `36a0807` Refined hero and nav polish
  - `f6740b5` Changes
  - `fe5f895` Work in progress
  - `bc49716` Refined Hero with new copy
