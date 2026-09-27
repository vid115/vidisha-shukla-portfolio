# Vidisha Shukla — Portfolio

A premium, animated portfolio for a frontend developer, built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Every fact — every client, technology, achievement, and date — is sourced directly from the provided resume; nothing about the experience is invented.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run typecheck  # tsc project-reference build (app code only, not tests)
npm run test       # run the test suite once
npm run test:watch # run tests in watch mode
```

`npm run build` is deliberately just `vite build` (esbuild transform, no `tsc` gate) so a deploy never fails on a type-level nit — see **Deployment** below for why. Run `npm run typecheck` yourself, or wire it into CI, to catch type errors before they reach a PR.

## Project structure

```
src/
  components/            Shared UI
    architecture/         Per-project architecture diagrams (see below)
    CodeFrame.tsx          "Editor window" chrome used for the hero panel,
                            project cards, the architecture section, and the
                            contact form — one consistent visual device
                            instead of a different card style per section
    TiltCard.tsx            Pointer-tilt + spotlight interaction for cards
    FlowDiagram.tsx         The recurring connected-node visual motif
    CountUpStat.tsx         Animates the About section's stats on scroll-into-view
    SkipLink.tsx            Keyboard/screen-reader "skip to content" link
    Navbar.tsx, Footer.tsx, ScrollReveal.tsx, SectionHeading.tsx,
    ThemeToggle.tsx, CustomCursor.tsx
  sections/               One file per page section (Hero, About, Experience, ...)
  data/                   Resume content as typed data — edit here, not in components
  hooks/                  useTheme, useActiveSection, usePrefersReducedMotion, useTilt
  lib/                    Small pure-function helpers (see below)
  App.tsx, main.tsx, index.css
public/
  favicon.svg
  robots.txt
  resume/Vidisha-Shukla-Resume.pdf   Served by the "Download Resume" buttons
```

### `src/components/architecture/`

Each project gets an architecture diagram that matches how it actually works, rather than one generic flowchart reused three times:

- **`MicroFrontendVisual`** (Honeywell) — a host shell composing independent modules into shared state and one API, drawn as a real org-chart connector (pure CSS, no SVG needed).
- **`PipelineVisual`** (Intel) — a numbered left-to-right release pipeline. The numbers are earned here: IBems genuinely shipped through a sequential CI/CD process.
- **`DataFlowVisual`** (Philips) — two services exchanging requests and responses, shown as a left/right conversation rather than a pipeline.

`ProjectArchitectureVisual` routes between them based on each project's `architecture.type`, with a TypeScript exhaustiveness check so a new architecture type without a matching visual fails to compile.

### `src/lib/`

- **`duration.ts`** — computes "3 yr 6 mo so far" for the current role live, from an ISO start date, instead of a string that quietly goes stale. Fixed-length roles (the internship) pass their duration explicitly instead.
- **`skillLinks.ts`** — cross-references a skill against what each project's `technologies` array actually lists, so hovering a skill in the Skills section can honestly show "used on Honeywell, Intel" (or nothing, rather than a guessed connection).

## Editing content

Everything text-based lives in `src/data/` as plain typed objects/arrays. Update resume details there rather than in components.

### Adding a GitHub link

No GitHub URL was in the source resume, so the GitHub icon is hidden by default rather than pointing at a placeholder. To show it, set a real URL in `src/data/profile.ts`:

```ts
github: "https://github.com/your-handle",
```

### Replacing the resume PDF

"Download Resume" points at `public/resume/Vidisha-Shukla-Resume.pdf`. Replace that file (same name) to update what's downloaded.

### Wiring up the contact form

`src/sections/Contact.tsx` is frontend-only right now — submitting shows a confirmation but sends nothing. `handleSubmit` has inline comments for wiring it to Formspree, EmailJS, or a custom API.

## Design notes

- **Visual language**: a "code editor" chrome (`CodeFrame`) is reused across the hero panel, project cards, the architecture section, and the contact form — one deliberate device rather than a different card treatment per section.
- **Theme**: dark by default, with an equally polished light mode; persisted to `localStorage`.
- **Motion**: ambient/looping animation (connector pulses, the pipeline's flow dot) runs as plain CSS, not Framer Motion — cheaper to run and automatically paused by `motion-reduce:` for anyone with `prefers-reduced-motion` set. One-shot reveal and interaction animations use Framer Motion. Orb drift in the hero only runs on `sm+` viewports.
- **Custom cursor**: fine-pointer (mouse/trackpad) devices only; untouched on touch devices.
- **Accessibility**: skip-to-content link, a real focus trap in the project modal (Tab cycles within it, focus returns to the triggering card on close), keyboard-operable skill/category interactions, and `scroll-margin-top` on every section so the fixed navbar never clips a heading you jump to.

## Testing

A focused Vitest + React Testing Library suite — not exhaustive, but covering the pieces with real logic:

- `src/lib/duration.test.ts`, `src/lib/skillLinks.test.ts` — pure-function tests for the derived-duration and skill-cross-reference logic.
- `src/components/Footer.test.tsx` — confirms real profile data is linked, and specifically that no GitHub link renders when none is configured (protects that deliberate design decision).
- `src/components/SectionHeading.test.tsx` — basic render coverage for the shared heading component.

`src/setupTests.ts` polyfills `matchMedia` and `IntersectionObserver` for jsdom, since several hooks depend on both.

## Deployment (Vercel)

This repo is set up to deploy straight from GitHub with zero manual configuration:

1. Push this folder to a GitHub repository (see below if you're starting from the extracted zip).
2. In Vercel: **Add New… → Project → Import** the repo.
3. Vercel auto-detects Vite; `vercel.json` in this repo pins the same settings explicitly (`npm run build`, output directory `dist`) so detection can't drift:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **No environment variables are required** — this is a fully static site with no backend calls (the contact form is frontend-only until you wire it up, see above).
5. Click **Deploy**. Every subsequent push to the connected branch redeploys automatically.

### Pushing this folder to GitHub for the first time

```bash
cd vidisha-portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### Why the build won't fail on a type error

`npm run build` runs `vite build` only. Vite transpiles TypeScript with esbuild (strips types, doesn't check them), so a type-level mistake can't block a deploy — only a genuine syntax error would. Full type-checking still exists (`npm run typecheck`, using TypeScript's project-reference build); it's just decoupled from the deploy path on purpose. If you'd rather have Vercel fail loudly on type errors too, change the `build` script back to `"tsc -b && vite build"`.

### A note on the lockfile

This project doesn't ship a `package-lock.json` (it was built in an offline sandbox with no registry access). Vercel's first build will run `npm install` and resolve fresh versions within the ranges in `package.json`, which works fine — but for fully reproducible builds across deploys, run `npm install` once locally after cloning and commit the generated `package-lock.json`.

### Other static hosts

Nothing here is Vercel-specific beyond `vercel.json` (which a different host will simply ignore). `npm run build` → `dist/` deploys as-is to Netlify, GitHub Pages, Cloudflare Pages, or any static host.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide React icons · Vitest · React Testing Library
