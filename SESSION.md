# SESSION.md — Current Session State

Snapshot of "where we are right now." Concise enough that a future session can reload in ~1–2 minutes. Updated at the end of every development session.

---

## Current Feature

**Hero** — Vikram Madhyasta's recruiter-facing Hero, including the signature Platform Core visualization.

---

## Feature Status

- **Repository audit:** completed (read-only inspection).
- **Production Hero implementation / refinement:** NOT yet approved to begin.
- **Approved Hero design:** confirmed preserved in code (Lovable-sync source).

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

---

## Files Changed

- `CLAUDE.md` — created.
- `SESSION.md` — created.

No other files modified, installed, or deleted.

---

## Validation Completed

- Repository inspection: yes (files, package.json, tsconfig, vite.config, styles.css, hero, cloud-ops-center, site-nav, site-background, panel-card, section, root route, server entry, start entry, router factory, full `src/components/ui/` listing).
- `tsc --noEmit`: **not run** (TypeScript untouched; no code change to validate against — to be run when implementation begins).
- `eslint .`: **not run** (no code change to lint).
- `vite build`: **not run** (no code change to build).
- Browser / a11y testing: **not run** (visual change scope 0 in this session).

---

## Known Issues

### Hero blockers (must address before declaring Hero production-ready)

- **`/resume.pdf` is not in the repository.** Hero and SiteNav both link to it. Without the asset, the Download Resume CTA renders a 404.
- **`#projects` target does not yet exist as real content.** The Hero's primary CTA currently jumps to a Lovable placeholder slot (dashed-border empty card). Either the Projects feature ships in the same milestone OR the Hero CTA semantics are clarified. Do not invent Projects content inside the Hero feature.
- **Lovable design-foundation placeholder sections are still in `src/routes/index.tsx`.** These must be replaced feature-by-feature with real portfolio content. Removing them is **deferred**, not the Hero feature's responsibility.
- **Custom `focus:z-100` on the skip-link may not resolve** (not a Tailwind v4 default). Needs `--z-skiplink` token or `focus:z-[60]`.

### Repository-wide deferred cleanup (audit findings, not Hero blockers)

- **UI kit / dependency bloat:** `src/components/ui/**` (~36 dead files) and many unused Radix/RHF/chart/recharts/calendar packages under `node_modules`. Removal is a **separate feature** after evaluating each for future value. Do not bundle into Hero work.
- **Google Fonts blocking render:** external stylesheet; plan to switch to `@fontsource` self-hosted.
- **Profile image not optimized:** no WebP/AVIF variants, no `srcset`, no `fetchpriority`. Replacement is part of the Portrait primitive proposal; not blocking the Hero visually.
- **Hardcoded content** in `index.tsx` (`TOKENS`, `RESERVED`) — flagged for `src/content/` separation as a separate feature.
- **Split `CloudOpsCenter`** — architectural refactor; justified only if it lands in this Hero milestone per the "do not mix unrelated cleanup" rule. Default-defer.
- **Test setup absent:** no Vitest, React Testing Library, or Playwright installed. Add as its own feature.

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

---

## Next Exact Step

**Stop. Wait for human review of `CLAUDE.md` and `SESSION.md`.**

Once reviewed and approved:

1. Decide whether the Hero scope includes any subset of:
   - Self-host fonts (P2)
   - Portrait optimization (P3)
   - QuickFacts extraction (J)
   - `z-skiplink` fix (A11y-3)
2. Decide whether Phase 1 (bundle hygiene + content split) ships alongside, before, or after Hero.
3. Confirm ownership of **`/resume.pdf` asset** (Hero blocker #1).
4. Confirm ownership of the **#projects target** (Hero blocker #2).

Do not start implementation until explicit approval is given in this conversation.

---

## Git State

- **Branch:** `main`
- **Working tree:** clean before this session; modified now by the addition of `CLAUDE.md` and `SESSION.md` (uncommitted).
- **Last commits:**
  - `e0f295b` Add project README
  - `36a0807` Refined hero and nav polish
  - `f6740b5` Changes
  - `fe5f895` Work in progress
  - `bc49716` Refined Hero with new copy

These last four commits have vague messages ("Changes", "Work in progress") and have not been renamed. Renaming is a separate concern; do not bundle with Hero work.
