# CLAUDE.md — Cloud & DevOps Engineering Portfolio

Stable project instructions for every Claude Code session working in this repository. Permanent. Updated only when durable rules change.

---

## PROJECT

This is **Vikram Madhyasta's production-quality Cloud & DevOps engineering portfolio**.

The site is a recruiter-facing engineering artifact, not a generic resume page. Every implementation decision should reflect real Cloud, DevOps, Platform Engineering and SRE capability.

---

## PRIMARY GOAL

Build a recruiter-focused engineering portfolio that demonstrates real Cloud, DevOps, Platform Engineering and SRE capability rather than a generic resume website.

---

## DEVELOPMENT ENVIRONMENT

- Ubuntu LTS virtual machine on VMware Workstation.
- All development, Git, builds and testing happens inside Ubuntu.
- Bun is the current package manager.

---

## CURRENT STACK — VERIFIED FROM REPOSITORY AUDIT

Do not guess versions. Re-verify any version before quoting if it has been more than a release cycle.

- **Framework:** TanStack Start `^1.168.26` + TanStack Router `^1.170.16` (file-based routes via `@tanstack/router-plugin`)
- **UI:** React `19.2.0` + `react-dom 19.2.0`
- **Language:** TypeScript `^5.8.3`, `strict: true`, `moduleResolution: Bundler`, `target: ES2022`
- **Build:** Vite `^8.0.16`, `@vitejs/plugin-react ^5.2.0`, `nitro 3.0.260603-beta`, `vite-tsconfig-paths`
- **SSR runtime:** Nitro default Cloudflare target (via `@lovable.dev/vite-tanstack-config`)
- **Styling:** Tailwind v4 (`^4.2.1`) via `@tailwindcss/vite`, `tw-animate-css ^1.3.4`. **No `tailwind.config.ts`; no `postcss.config`.** Configuration is CSS-first via `@theme` / `@utility` / `@custom-variant` in `src/styles.css`.
- **State / data:** `@tanstack/react-query ^5.101.1` (in router context; not yet used by features)
- **Icons:** `lucide-react ^0.575.0`
- **Lint / format:** ESLint `^9` (flat config), Prettier `^3`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- **Lockfile:** `bun.lock` + `bunfig.toml` committed

### Architectural notes

- TanStack Start's server entry is `src/server.ts` (SSR error wrapper around the bundled entry).
- `src/start.ts` defines `requestMiddleware` (error + CSRF on `serverFn`).
- `src/routeTree.gen.ts` is generated — never edit by hand.
- `@/*` path alias resolves to `src/*` (do not move).
- `sideEffects: false` in `package.json` is intentional — preserve.

---

## ENGINEERING PRIORITIES

When in tension, optimize for these in order:

1. **Maintainability**
2. **Accessibility**
3. **Performance**
4. **Responsive quality**
5. **Semantic HTML**
6. **TypeScript quality**
7. **Clean React architecture**
8. **Minimal, justified dependencies**
9. **SEO**
10. **Recruiter impact**

User experience, accessibility, engineering quality, and visual polish are all release requirements. Never sacrifice accessibility or maintainability for visual effects.

---

## DESIGN WORKFLOW

- **Lovable** is used for visual exploration and design.
- **Claude Code** owns production implementation.
- Approved Lovable designs are preserved **unless** there is a concrete accessibility, responsiveness, performance or engineering reason to change them.
- Visual recommendations must always be separated from engineering recommendations and explained.

---

## FEATURE WORKFLOW

```
Requirements
→ Lovable design
→ design review
→ approval
→ Claude architecture review
→ implementation
→ code review
→ accessibility review
→ responsive review
→ performance review
→ build / lint / typecheck
→ commit
```

Skip any step only with an explicit recorded reason in `SESSION.md`.

---

## IMPORTANT — guardrails

These rules apply at every step of every session.

1. **Do not redesign approved UI without explicit approval.** Surface the recommendation separately and request sign-off.
2. **Do not make broad repository refactors while implementing a feature** unless they are necessary for that feature.
3. **Do not install dependencies merely for convenience.** Every new dep must justify itself (size, risk, maintenance).
4. **Do not delete scaffold / dependencies / components until usage and future architectural value have been evaluated.** Audit first; decide second; delete third.
5. **Do not mix unrelated cleanup with feature implementation.** A Hero PR must not also touch the design-foundation placeholders.
6. **Prefer existing design tokens and primitives over creating duplicates.** Check `src/styles.css` `@theme` / `@utility` first.
7. **Use Context7** when current library, framework, SDK, API, CLI tool or cloud service documentation must be verified. Don't rely on memory for current docs.

---

## BEFORE MODIFYING CODE

In every session, in this order:

1. Read `CLAUDE.md`.
2. Read `SESSION.md`.
3. Inspect `git status`.
4. Understand the current feature and previous decisions.

If any of these are missing or stale, do not proceed; update them first.

---

## BEFORE ENDING A DEVELOPMENT SESSION

In every session, in this order:

1. Run relevant validation (`tsc --noEmit`, `eslint .`, `vite build`, feature tests as applicable).
2. Review `git diff`.
3. Update `SESSION.md` to reflect the new current state.
4. Record unresolved problems and the **exact next action**.
5. **Do not claim something is complete if validation has not been performed.**

If any step is skipped, say so explicitly in `SESSION.md` "Known Issues" or "Deferred Work".

---

## SECRETS

Do not store secrets, API keys, tokens, credentials or any sensitive information in `CLAUDE.md` or `SESSION.md`.
