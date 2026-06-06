# Documentation Website Architecture

## Overview

The qwik-flutter-ui documentation site is a **static-first Qwik City application** living in `website/`. It documents the published npm package, renders live widget previews, and ships as pre-rendered HTML for fast loads and broad hosting support.

Design references:

| Site | Pattern adopted |
| --- | --- |
| Flutter Docs | Widget-centric pages, Flutter mapping sections, concept guides |
| Qwik Docs | MDX content, resumable islands, minimal JS |
| Material UI | Props tables, related-component links, recipe pages |
| Mantine | Example categories, copy-friendly snippets |
| shadcn/ui | Clean preview + code layout, focused single-purpose examples |

## Goals

Users must be able to:

1. **Install** the package with copy-paste commands
2. **Learn concepts** (Flutter mapping, theming, SSR)
3. **Browse widgets** by category
4. **See live examples** rendered in the browser
5. **Copy example code** with one click
6. **View API references** (props, types, enums, hooks)
7. **Explore related widgets** via cross-links

Every public widget gets a dedicated documentation page using the [Widget Page Template](./docs/WIDGET_PAGE_TEMPLATE.md).

---

## Tech stack

| Layer | Choice | Rationale |
| --- | --- | --- |
| Framework | Qwik + Qwik City | Same stack as the library; resumable previews; team familiarity |
| Content | MDX (`.mdx`) + frontmatter | Markdown for prose; JSX for live components |
| Styling | CSS Modules + design tokens | Matches library; no runtime CSS-in-JS |
| Syntax highlighting | Shiki (build-time) | SSR-safe, accurate TSX highlighting |
| API data | `lib-types/` + `docs/API_DESIGN.md` | Types from build output; prose from spec until codegen |
| Search | Pagefind (static) | Zero-server full-text search on static hosts |
| Analytics | Optional Plausible / none | Privacy-friendly; not required for v1 |

### Monorepo layout

```
qwik-flutter-ui/
├── src/                    # Library source (unchanged)
├── lib/                    # Built package (examples import this in CI)
├── lib-types/              # Generated .d.ts for PropsTable codegen
├── docs/API_DESIGN.md      # Authoritative API prose
└── website/                # Documentation app (this tree)
    ├── vite.config.ts      # Extends root or standalone Qwik City config
    ├── src/
    │   ├── routes/         # File-based routing
    │   ├── components/     # Doc shell (sidebar, header, search)
    │   └── root.tsx
    ├── docs/               # MDX content files
    ├── examples/           # Example modules (imported by MDX + playground)
    ├── playground/         # Playground route modules + registry
    └── public/
```

The docs app resolves `qwik-flutter-ui` to the workspace package (`../lib` after `npm run build`) during development and CI.

---

## Routing architecture

Qwik City file-based routes under `website/src/routes/`:

```
src/routes/
├── index.tsx                          # Landing / hero
├── docs/
│   ├── layout.tsx                     # Docs shell (sidebar + TOC)
│   ├── index.tsx                      # Docs home
│   ├── getting-started/
│   │   ├── index.mdx
│   │   ├── introduction.mdx
│   │   ├── installation.mdx
│   │   ├── quick-start.mdx
│   │   ├── design-principles.mdx
│   │   ├── flutter-mapping.mdx
│   │   └── theming.mdx
│   ├── widgets/
│   │   ├── layout.tsx                 # Widget category tabs
│   │   ├── index.tsx                  # Widget catalog grid
│   │   ├── layout/
│   │   │   ├── row.mdx
│   │   │   └── ...
│   │   ├── typography/
│   │   ├── forms/
│   │   ├── selection/
│   │   ├── theming/
│   │   ├── overlays/
│   │   ├── app-structure/
│   │   └── navigation/                # Planned (v1.9)
│   ├── examples/
│   │   ├── index.mdx
│   │   ├── widget-examples.mdx
│   │   ├── layout-recipes.mdx
│   │   ├── form-recipes.mdx
│   │   ├── dashboard-layouts.mdx
│   │   └── mobile-layouts.mdx
│   └── api/
│       ├── index.mdx
│       ├── components/
│       │   └── [slug].mdx             # Or static pages per export
│       ├── types/
│       ├── enums/
│       └── hooks/
├── playground/
│   ├── index.tsx                      # Example picker + preview
│   └── [widget]/
│       └── index.tsx                  # Widget-scoped playground
└── [...]                              # 404
```

### URL conventions

| Pattern | Example |
| --- | --- |
| Getting started | `/docs/getting-started/installation` |
| Widget page | `/docs/widgets/forms/text-field` |
| Recipe | `/docs/examples/form-recipes` |
| Playground | `/playground/text-field` |
| API component | `/docs/api/components/text-field` |

Slugs are **kebab-case** derived from PascalCase widget names (`TextField` → `text-field`).

---

## Content pipeline

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  MDX in docs/   │────►│  MDX compiler    │────►│  Static HTML    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                        │
         │                        ▼
         │               ┌──────────────────┐
         └──────────────►│ ExamplePreview   │
                         │ (imports example │
                         │  from examples/) │
                         └──────────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Shiki highlight  │
                         │ (raw source str) │
                         └──────────────────┘
```

### MDX component map

MDX files receive a fixed set of shortcodes via `docs/mdx-components.ts`:

```tsx
export const mdxComponents = {
  ExamplePreview,
  CodeBlock,
  PropsTable,
  WidgetHeader,
  FlutterComparison,
  RelatedWidgets,
  AccessibilityNotes,
  SSRNotes,
  Callout,
  PackageImport,
};
```

---

## Example system (summary)

Examples live in `website/examples/<widget>/` as standalone `.tsx` files. Each file:

- Exports a default Qwik component
- Exports a `meta` object (or uses co-located `.meta.ts`) matching [METADATA.md](./examples/METADATA.md)
- Has a co-located `.source.tsx` or is read via `?raw` import for display

See [examples/README.md](./examples/README.md) for full conventions.

---

## Live preview (summary)

`<ExamplePreview>` is the single entry point for rendering examples in docs. It wraps:

1. **Preview pane** — `ThemeProvider` + optional `OverlayContainer` + example component
2. **Source pane** — Shiki-highlighted code with copy button
3. **Toolbar** — expand/collapse, copy, optional theme toggle

See [components/README.md](./components/README.md).

---

## Playground (summary)

The playground at `/playground` is a **route-level shell** that reuses the same example registry as docs. v1: picker + preview + source + theme switch. v2+: live editor and property controls.

See [playground/README.md](./playground/README.md).

---

## API reference generation

### v1 (manual + types)

| Source | Used for |
| --- | --- |
| `lib-types/**/*.d.ts` | Prop names, types, required/optional |
| `docs/API_DESIGN.md` | Descriptions, defaults, Flutter notes |
| Hand-authored `PropsTable` rows | Until codegen script lands |

### v2 (codegen)

```
npm run build.types
       │
       ▼
scripts/generate-api-docs.ts
       │
       ▼
website/docs/api/_generated/
  ├── components.json
  ├── types.json
  ├── enums.json
  └── hooks.json
```

`PropsTable` reads JSON at build time; no runtime TypeScript parsing.

---

## Build and deployment

### Static generation (preferred)

```bash
# From repo root
npm run build              # library + types
cd website && npm run build   # qwik build → website/dist/
```

Qwik City pre-renders all MDX routes and playground pages. Client JS is limited to interactive islands (copy button, theme toggle, playground picker).

### SSR (optional)

Same Qwik City app can run in SSR mode for preview:

```bash
cd website && npm run dev     # vite --mode ssr
cd website && npm run preview
```

Production docs should use **static export** unless search or personalization requires SSR.

### Hosting matrix

| Platform | Config | Base path |
| --- | --- | --- |
| **GitHub Pages** | `website/.github/workflows/deploy-docs.yml`; `base: '/qwik-flutter-ui/'` in vite config when using project pages | `/qwik-flutter-ui/` |
| **Cloudflare Pages** | Build command: `npm run build && cd website && npm run build`; output: `website/dist` | `/` or custom domain |
| **Vercel** | Root directory: `website`; framework preset: Vite; install from monorepo root | `/` |

All three support static output. Use `adapter-static` or Qwik City's static pre-render list.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `DOCS_BASE_PATH` | Asset prefix for GitHub Pages |
| `SITE_URL` | Canonical URL for OG tags and sitemap |

---

## Docs shell UI

```
┌──────────────────────────────────────────────────────────────┐
│  Logo    Getting Started  Widgets  Examples  Playground  API │  ← TopNav
├──────────────┬───────────────────────────────────────────────┤
│              │  Breadcrumb                                   │
│   Sidebar    │  ─────────────────────────────────────────── │
│   (section   │  # Widget Title                               │
│    tree)     │  Overview …                                   │
│              │  ┌─────────────────────────────────────────┐ │
│              │  │ ExamplePreview                          │ │
│              │  └─────────────────────────────────────────┘ │
│              │  On this page (TOC) ──►                     │
└──────────────┴───────────────────────────────────────────────┘
```

- **Sidebar**: driven by `docs/NAVIGATION.md` → `navigation.ts` config
- **TOC**: extracted from MDX headings (`h2`, `h3`)
- **Search**: Pagefind index built post-static-generate

---

## Performance and accessibility

- Examples are **code-split** per widget; visiting `TextField` does not load `Dialog` examples
- Preview panes use `client:visible` or Qwik's natural lazy boundaries
- All doc components meet WCAG 2.1 AA (contrast, keyboard, focus rings)
- Copy buttons expose `aria-label`; live regions announce copy success

---

## Security

- Examples run in the same origin (no iframe sandbox needed for v1)
- No `eval` or dynamic `Function` in playground v1
- Future live editor: sandbox iframe with restricted imports

---

## Related documents

- [Navigation structure](./docs/NAVIGATION.md)
- [Widget page template](./docs/WIDGET_PAGE_TEMPLATE.md)
- [Example system](./examples/README.md)
- [Documentation components](./components/README.md)
- [Playground](./playground/README.md)
- [Coverage matrix](./examples/COVERAGE_MATRIX.md)
- [Roadmap](./ROADMAP.md)
