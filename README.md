# Sumit Dilip Babar — Portfolio

Personal developer portfolio and engineering showcase for **Sumit Dilip Babar**, Software Engineer. A dark editorial single-page site: oversized typography, hairline rules, mono annotations, and restrained motion — built to present real projects as case studies rather than a résumé in card form.

**Sections:** Hero → About → Selected Work → Lab → Stack → Contact

## Highlights

- **Canvas hero wordmark** — the name is drawn on a canvas (React Bits `TechText`): letters turn into dashed vector paths on hover, can be dragged and spring back, with an idle sweep and selection frame
- **Scroll choreography** — GSAP timelines + ScrollTrigger, driven by Lenis smooth scrolling, all guarded by `prefers-reduced-motion`
- **Glow cursor** — WebGL pointer trail (React Bits `GlowCursor` via `ogl`), fine pointers only, render loop sleeps when idle
- **Footer marquee** — infinite `LogoLoop` of the technology stack, pausing on hover, edge-faded into the page background
- **Accessibility** — semantic structure, skip link, visible focus states, keyboard-reachable interactions, reduced-motion support
- **Content-driven** — every project, stack, and link lives in typed data files under `src/data/`

## Tech stack

| Layer     | Choice                                              |
| --------- | --------------------------------------------------- |
| Build     | [Vite](https://vite.dev) + [React 19](https://react.dev) |
| Language  | TypeScript, type-checked builds via `tsc -b`         |
| Motion    | GSAP + ScrollTrigger, Lenis                         |
| WebGL     | ogl (hero glow cursor)                              |
| Linting   | [Oxlint](https://oxc.rs/docs/guide/usage/linter)    |
| Styling   | Hand-rolled CSS — design tokens in `src/styles/variables.css` |

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build    # typecheck (tsc -b) + production build
npm run lint     # Oxlint
npm run preview  # serve the production build
```

Requires Node.js and npm.

## Project structure

```text
src/
├── animations/     # GSAP hooks, scroll helpers, page-load transitions
├── components/
│   ├── layout/     # page shell, navigation, smooth-scroll provider
│   ├── hero/       # hero composition + canvas wordmark
│   ├── about/      # about section
│   ├── projects/   # case studies, plates, project figures
│   ├── lab/        # experiments section
│   ├── stack/      # technology stack section
│   ├── contact/    # contact section
│   ├── navigation/ # header + mobile menu
│   └── ui/         # shared primitives (TechText, LogoLoop, GlowCursor, Tag, …)
├── data/           # all site content — projects, stack, links, education
├── hooks/          # reduced motion, magnetic hover, smooth scroll
└── styles/         # tokens + one stylesheet per section (imported via globals.css)
```

## Content & documentation
