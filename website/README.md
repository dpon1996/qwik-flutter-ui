# qwik-flutter-ui Documentation Website

Professional documentation platform for **qwik-flutter-ui** — inspired by [Flutter Docs](https://docs.flutter.dev/), [Qwik Docs](https://qwik.dev/docs/), [MUI](https://mui.com/), [Mantine](https://mantine.dev/), and [shadcn/ui](https://ui.shadcn.com/).

This directory contains **architecture and design specifications only**. No widget APIs are modified here; no runnable examples are implemented in this phase.

## Deliverables

| Document | Description |
| --- | --- |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Full website architecture, tech stack, routing, build, deployment |
| [docs/NAVIGATION.md](./docs/NAVIGATION.md) | Site navigation structure and URL map |
| [docs/WIDGET_PAGE_TEMPLATE.md](./docs/WIDGET_PAGE_TEMPLATE.md) | Standard template every widget page follows |
| [examples/README.md](./examples/README.md) | Example system architecture and directory conventions |
| [examples/METADATA.md](./examples/METADATA.md) | Example frontmatter schema |
| [examples/COVERAGE_MATRIX.md](./examples/COVERAGE_MATRIX.md) | Per-widget example coverage plan |
| [playground/README.md](./playground/README.md) | Interactive playground architecture |
| [components/README.md](./components/README.md) | Reusable documentation components |
| [ROADMAP.md](./ROADMAP.md) | Phased implementation roadmap |

## Directory layout

```
website/
├── README.md                 ← you are here
├── ARCHITECTURE.md           ← platform overview
├── ROADMAP.md                ← phased delivery plan
├── docs/                     ← MDX/Markdown content (Getting Started, Widgets, API)
│   ├── NAVIGATION.md
│   ├── WIDGET_PAGE_TEMPLATE.md
│   ├── getting-started/
│   ├── widgets/
│   ├── examples/
│   └── api/
├── examples/                 ← isolated, importable widget examples (one dir per widget)
│   ├── README.md
│   ├── METADATA.md
│   ├── COVERAGE_MATRIX.md
│   └── <widget-name>/
│       └── *.tsx
├── playground/               ← interactive demo shell (routes + registry)
│   └── README.md
├── components/               ← docs-only Qwik components (ExamplePreview, PropsTable, …)
│   └── README.md
└── public/                   ← static assets (logo, og images, favicons)
```

## Relationship to the library

```
qwik-flutter-ui/                 website/
├── src/lib/          ────────►  examples import from "qwik-flutter-ui"
├── src/components/   ────────►  docs pages reference public API
├── src/index.ts      ────────►  API reference generated from lib-types/
└── docs/API_DESIGN.md ───────►  source of truth for props until codegen lands
```

The existing playground at `src/routes/index.tsx` remains the **contributor demo** during migration. The documentation site in `website/` becomes the **public docs experience** once implemented.

## Quick links (planned routes)

| Section | Base path |
| --- | --- |
| Getting Started | `/docs/getting-started/` |
| Widgets | `/docs/widgets/` |
| Examples | `/docs/examples/` |
| Playground | `/playground/` |
| API Reference | `/docs/api/` |

See [docs/NAVIGATION.md](./docs/NAVIGATION.md) for the complete tree.
