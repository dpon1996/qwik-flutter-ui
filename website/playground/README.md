# Playground Architecture

Interactive demo environment at `/playground`. Reuses the [example registry](../examples/README.md) — no duplicate example code.

---

## Goals

### v1 (required)

- Render any registered example
- Switch examples via widget + scenario picker
- View syntax-highlighted source
- Copy source to clipboard
- Toggle light/dark theme (via ThemeProvider tokens)

### v2+ (future, not required for v1)

- Live Monaco/CodeMirror editor
- Hot reload on edit
- Property controls panel (knobs)
- Shareable URLs with encoded state
- Responsive viewport frames (mobile / tablet)

---

## Directory layout

```
website/playground/
├── README.md
├── registry-bridge.ts      # Re-exports examples/registry.ts
├── routes/                 # Route modules (or live under src/routes/playground/)
│   ├── layout.tsx          # Playground chrome (minimal header)
│   ├── index.tsx           # All-widgets picker
│   └── [widget]/
│       └── index.tsx       # Widget-scoped playground
└── components/
    ├── PlaygroundShell.tsx
    ├── ExamplePicker.tsx
    ├── PreviewFrame.tsx
    ├── SourcePanel.tsx
    └── ThemeToggle.tsx
```

Actual Qwik City routes mount from `website/src/routes/playground/` and import from `website/playground/components/`.

---

## Page layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Playground          [Widget ▼ TextField]  [Example ▼ Basic]   │
│                      [Theme ◐]  [Open in docs ↗]                │
├──────────────────────────────┬──────────────────────────────────┤
│                              │  Source                    [Copy]│
│   PreviewFrame               │  ┌────────────────────────────┐│
│   ┌──────────────────────┐   │  │ 1  import { ...            ││
│   │                      │   │  │ 2  ...                     ││
│   │  [live example]      │   │  └────────────────────────────┘│
│   │                      │   │  [Expand ▼]                    │
│   └──────────────────────┘   │                                  │
│                              │  meta.title · meta.description   │
└──────────────────────────────┴──────────────────────────────────┘
```

Mobile: stacked layout — preview on top, source below.

---

## Components

### PlaygroundShell

Top-level layout. Provides:

- URL sync (`?example=text-field/basic`)
- `ThemeProvider` + conditional `OverlayContainer`
- Error boundary for example render failures

```tsx
export type PlaygroundShellProps = {
  widgetSlug?: string;
  exampleId?: string;
};
```

### ExamplePicker

Two-level select:

1. **Widget** — grouped by category (Layout, Forms, …)
2. **Example** — filtered by selected widget, sorted by `meta.order`

Changing selection updates URL without full page reload.

### PreviewFrame

- Neutral background (`--docs-preview-bg`)
- Padding and max-width constraints
- Optional device chrome (v2)
- `min-height: 200px` for empty states

Reads `meta.requiresOverlayContainer` to wrap content.

### SourcePanel

Delegates to `CodeBlock` from [../components/README.md](../components/README.md).

Loads source via registry `loadSource()`.

### ThemeToggle

Flips `colorScheme` on `ThemeProvider` via context or data attribute. Persists to `localStorage` (`docs-theme`).

---

## URL schema

| URL | Behavior |
| --- | --- |
| `/playground` | Last visited or first example |
| `/playground/text-field` | First example for TextField |
| `/playground/text-field?ex=basic` | Specific example |
| `/playground/text-field?ex=validation&theme=dark` | Example + theme |

Slug mapping: `TextField` → `text-field` (shared util with docs).

---

## Data flow

```
User selects example
        │
        ▼
ExamplePicker ──► update URL (useNavigate)
        │
        ▼
PlaygroundShell ──► registry.load(id)
        │
        ├──► PreviewFrame ──► dynamic import default component
        │
        └──► SourcePanel ──► registry.loadSource(id)
```

Examples are **lazy loaded** — switching widgets fetches a new chunk.

---

## Error handling

| Failure | UX |
| --- | --- |
| Example throw on render | Red error Callout in preview; source still visible |
| Missing example id | 404 with link to widget list |
| Planned widget | Info Callout + link to API spec |

---

## Relationship to contributor playground

| | `src/routes/index.tsx` | `website/playground` |
| --- | --- | --- |
| Audience | Contributors | End users |
| Content | Inline demos | Registry-driven examples |
| Scope | All widgets in one page | One example at a time |
| Future | May deprecate after migration | Public docs playground |

Migration path: extract demos from `index.tsx` into `website/examples/` over time.

---

## Future: live editor (v2)

```
┌─────────────┬─────────────┐
│   Editor    │   Preview   │
│  (Monaco)   │  (iframe)   │
├─────────────┴─────────────┤
│   Props panel (knobs)     │
└───────────────────────────┘
```

Architecture notes for v2:

- Sandboxed iframe with `postMessage` bridge
- Allowed imports whitelist: `@builder.io/qwik`, `qwik-flutter-ui`
- Debounced compile via esbuild-wasm in worker
- Not in v1 scope

---

## Future: property controls (v2)

Generate controls from `PropsTable` metadata:

- Boolean → Switch
- Enum → Dropdown
- String → TextField
- Number → slider

Requires props introspection from generated API JSON.

---

## Related

- [Example system](../examples/README.md)
- [ExamplePreview / CodeBlock](../components/README.md)
- [Roadmap](../ROADMAP.md) — Phase 2 playground delivery
