# Example System Architecture

Isolated, importable example modules power docs previews, the playground, and future codegen tests. Each example demonstrates **one concept** — never a kitchen sink.

---

## Directory convention

```
website/examples/
├── README.md
├── METADATA.md
├── COVERAGE_MATRIX.md
├── registry.ts                 # Central index (auto-generated in v2)
├── _shared/                    # Doc-only helpers (not published)
│   ├── preview-shell.tsx       # ThemeProvider + OverlayContainer wrapper
│   └── sample-data.ts          # Shared mock options (countries, etc.)
└── <widget-slug>/              # kebab-case, matches URL slug
    ├── basic.tsx
    ├── basic.source.ts         # Optional: explicit source string export
    ├── validation.tsx
    ├── disabled.tsx
    └── index.ts                # Re-exports all examples + meta
```

### Naming rules

| Rule | Example |
| --- | --- |
| Directory | kebab-case matching widget slug: `text-field/` |
| File | kebab-case scenario: `with-decoration.tsx` |
| Component export | PascalCase + `Example` suffix: `BasicTextFieldExample` |
| Default export | The renderable Qwik component |

---

## Example file anatomy

```tsx
// website/examples/text-field/basic.tsx

import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";
import type { ExampleMeta } from "../_shared/types";

/** Smallest working TextField. */
export const meta: ExampleMeta = {
  title: "Basic",
  description: "Default TextField with placeholder.",
  widget: "TextField",
  category: "basic",
  difficulty: "beginner",
};

export default component$(() => (
  <ThemeProvider>
    <TextField placeholder="Enter your name" />
  </ThemeProvider>
));
```

### Source for display

Docs need the **raw TSX string** for syntax highlighting. Two supported patterns:

#### Pattern A — `?raw` import (preferred)

```tsx
// In MDX or ExamplePreview loader
import BasicExample from "../../examples/text-field/basic.tsx?raw";
```

Build pipeline validates `?raw` imports resolve.

#### Pattern B — co-located `.source.ts`

```ts
// basic.source.ts
export const source = `import { component$ } from "@builder.io/qwik";
...
`;
```

Use when `?raw` strips comments or formatting matters.

---

## Example categories

Every widget should cover as many categories as apply:

| Category | ID | Purpose |
| --- | --- | --- |
| **Basic** | `basic` | Smallest possible working example |
| **Common Usage** | `common-*` | Real-world default configuration |
| **Variations** | `variation-*` | Different prop combinations |
| **Composition** | `compose-*` | Used alongside other widgets |
| **Best Practices** | `best-*` | Recommended patterns |
| **Anti-Patterns** | `anti-*` | Incorrect usage with explanation (static code or commented) |

Not every widget needs all six. See [COVERAGE_MATRIX.md](./COVERAGE_MATRIX.md) for per-widget minimums.

### Anti-pattern examples

Anti-patterns render as **code-only** blocks (no live preview) or show a strikethrough Callout:

```mdx
<ExamplePreview
  id="row-anti-nested-scroll"
  example={null}
  source={antiPatternSource}
  preview={false}
  callout="Avoid nesting Row inside Row without Expanded — use Column or Wrap instead."
/>
```

---

## Registry

`website/examples/registry.ts` maps widgets to example modules:

```ts
export type ExampleEntry = {
  id: string;                    // "text-field/basic"
  widget: string;                // "TextField"
  slug: string;                  // "basic"
  meta: ExampleMeta;
  load: () => Promise<{ default: unknown; meta: ExampleMeta }>;
  loadSource: () => Promise<string>;
};

export const exampleRegistry: ExampleEntry[] = [
  {
    id: "text-field/basic",
    widget: "TextField",
    slug: "basic",
    meta: { /* ... */ },
    load: () => import("./text-field/basic"),
    loadSource: () => import("./text-field/basic.tsx?raw").then(m => m.default),
  },
];
```

Playground and docs both consume `exampleRegistry` — **single source of truth**.

---

## Wrapper shell

Examples should stay minimal. Shared chrome lives in `_shared/preview-shell.tsx`:

```tsx
export const PreviewShell = component$((props: { overlays?: boolean; children: any }) => (
  <ThemeProvider>
    {props.overlays ? (
      <OverlayContainer>{props.children}</OverlayContainer>
    ) : (
      props.children
    )}
  </ThemeProvider>
));
```

Overlay widget examples set `overlays: true` in meta:

```ts
export const meta: ExampleMeta = {
  // ...
  requiresOverlayContainer: true,
};
```

`ExamplePreview` reads `meta.requiresOverlayContainer` and wraps automatically.

---

## MDX integration

Widget MDX files import examples at the top:

```tsx
import BasicExample, { meta as basicMeta } from "../../examples/text-field/basic";
import basicSource from "../../examples/text-field/basic.tsx?raw";
```

Then embed:

```mdx
<ExamplePreview
  id="text-field-basic"
  example={BasicExample}
  source={basicSource}
  meta={basicMeta}
/>
```

---

## Validation (CI)

Future `scripts/validate-examples.ts` checks:

1. Every widget in `COVERAGE_MATRIX.md` has a directory
2. Required scenario files exist
3. Each example compiles (TypeScript)
4. `meta.widget` matches directory mapping
5. No example exceeds line limit (default 40 lines)
6. Anti-pattern examples have `preview: false` or `category: "anti-pattern"`

---

## Relationship to tests

Examples are **documentation**, not tests. However:

- Vitest can import examples for smoke renders (optional, Phase 3)
- Playwright visual regression may snapshot preview panes (optional, Phase 4)

Do not duplicate example logic in `tests/` — import from `website/examples/` instead.

---

## Related

- [METADATA.md](./METADATA.md) — frontmatter schema
- [COVERAGE_MATRIX.md](./COVERAGE_MATRIX.md) — required examples per widget
- [../components/README.md](../components/README.md) — `ExamplePreview` renderer
