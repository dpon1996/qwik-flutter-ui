# Documentation Components

Reusable Qwik components for the docs site. Live in `website/components/` (imported by MDX and routes). **Not** exported from the `qwik-flutter-ui` npm package.

---

## Component index

| Component | Purpose |
| --- | --- |
| `ExamplePreview` | Preview + source + copy |
| `CodeBlock` | Syntax-highlighted code display |
| `PropsTable` | API props reference table |
| `WidgetHeader` | Title, badge, description hero |
| `FlutterComparison` | Flutter parity section |
| `RelatedWidgets` | Cross-link cards |
| `AccessibilityNotes` | A11y guidance wrapper |
| `SSRNotes` | SSR / resumability notes |
| `PackageImport` | Import snippet generator |
| `Callout` | Info / warning / tip boxes |

Supporting shell components: `DocsLayout`, `Sidebar`, `TableOfContents`, `TopNav`, `SearchDialog`.

---

## ExamplePreview

Primary example renderer. Used on every widget page and optionally in recipes.

### Props

```ts
export type ExamplePreviewProps = {
  /** Unique id for anchor links: #text-field-basic */
  id: string;

  /** Qwik component constructor (from example module default export) */
  example: Component<any> | null;

  /** Raw TSX source string for display */
  source: string;

  /** Optional metadata override (else inferred from example module) */
  meta?: ExampleMeta;

  /** Show live preview pane (false for anti-patterns) */
  preview?: boolean;

  /** Allow interaction inside preview (dialogs, menus) */
  interactive?: boolean;

  /** Start with code panel expanded */
  defaultExpanded?: boolean;

  /** Optional explanation rendered below preview */
  children?: JSXOutput;
};
```

### Layout

```
┌─ ExamplePreview ─────────────────────────────────────────────┐
│ ┌─ Preview (optional) ────────────────────────────────────┐ │
│ │  PreviewShell + <Example />                               │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─ Toolbar ────────────────────────────────────────────────┐ │
│ │  TSX          [Copy]  [Expand ▼]                         │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌─ CodeBlock ──────────────────────────────────────────────┐ │
│ │  highlighted source (collapsed: max 12 lines)            │ │
│ └──────────────────────────────────────────────────────────┘ │
│ {children} — explanation prose                               │
└──────────────────────────────────────────────────────────────┘
```

### Behavior

1. Wraps example in `PreviewShell` (ThemeProvider, optional OverlayContainer)
2. Lazy-loads example component on visible (`useVisibleTask$` boundary)
3. Passes `source` to `CodeBlock`
4. Copy button writes raw source (not highlighted HTML) to clipboard
5. Expand toggles `max-height` on code panel
6. Emits `aria-live` announcement on successful copy

### Usage

```mdx
<ExamplePreview
  id="text-field-basic"
  example={BasicExample}
  source={basicSource}
>
  The simplest TextField — pass `placeholder` for hint text.
</ExamplePreview>
```

---

## CodeBlock

Standalone syntax-highlighted code (getting started snippets, anti-patterns, CLI commands).

### Props

```ts
export type CodeBlockProps = {
  code: string;
  lang?: "tsx" | "ts" | "bash" | "json" | "css";
  filename?: string;
  showLineNumbers?: boolean;
  maxCollapsedLines?: number;
  copyable?: boolean;
  defaultExpanded?: boolean;
};
```

### Requirements

| Requirement | Implementation |
| --- | --- |
| Syntax highlighting | Shiki at build time → HTML string or pre-computed tokens |
| Expand/collapse | CSS `max-height` + button; `defaultExpanded` prop |
| Copy button | Clipboard API; fallback `execCommand` |
| Line numbers | Optional column via Shiki `lineOptions` or CSS counter |

### Shiki integration

```ts
// website/components/shiki/highlighter.ts
import { createHighlighter } from "shiki";

export async function highlight(code: string, lang: string): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    theme: "github-light-default",
  });
}
```

Dark mode: swap theme class on parent `[data-theme="dark"]`.

---

## PropsTable

Renders API reference from static JSON or hand-authored rows.

### Props

```ts
export type PropsTableProps = {
  component: string;
  /** Override generated data during v1 */
  rows?: PropRow[];
  showInherited?: boolean; // BaseProps
};

export type PropRow = {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
};
```

### Rendered table

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | — | Hint text when empty |
| `disabled` | `boolean` | `false` | Disables input |

- Required props marked with asterisk
- Type strings link to `/docs/api/types/...` when applicable
- Enum types link to `/docs/api/enums/...`

Data source v1: `website/docs/api/_data/<component>.json` hand-maintained from API_DESIGN.md.

---

## WidgetHeader

Hero block at top of widget pages.

### Props

```ts
export type WidgetHeaderProps = {
  title: string;
  description: string;
  status?: "shipped" | "planned" | "deprecated";
  flutterEquivalent?: string;
  since?: string;
};
```

Renders title (h1), status badge, description, and optional "Flutter: `TextField`" pill.

---

## FlutterComparison

Structured Flutter parity section.

### Props

```ts
export type FlutterComparisonProps = {
  flutter: string;
  notes: string[];
  codeSample?: { flutter: string; qwik: string };
};
```

Optional side-by-side code when paradigms differ (constructor vs props).

---

## RelatedWidgets

Grid of linked cards at page bottom.

### Props

```ts
export type RelatedWidget = {
  name: string;
  href: string;
  reason: string;
};

export type RelatedWidgetsProps = {
  widgets: RelatedWidget[];
};
```

Auto-generation v2: build graph from `related` frontmatter across all widget MDX files.

---

## AccessibilityNotes

Semantic wrapper ensuring consistent heading and slot for prose.

```tsx
export const AccessibilityNotes = component$(
  (props: { widget: string; children?: JSXOutput }) => (
    <section aria-labelledby={`${props.widget}-a11y`}>
      <h2 id={`${props.widget}-a11y`}>Accessibility</h2>
      <div>{props.children}</div>
    </section>
  ),
);
```

Content authored in MDX as child nodes (lists, paragraphs).

---

## SSRNotes

Same pattern as AccessibilityNotes for SSR/resumability content.

---

## PackageImport

Generates import snippet from widget names.

```tsx
<PackageImport names={["TextField", "ThemeProvider"]} />
```

Output:

```tsx
import { TextField, ThemeProvider } from "qwik-flutter-ui";
```

---

## Callout

```tsx
<Callout type="info" title="OverlayContainer required">
  Mount OverlayContainer once at app root before using Dialog.
</Callout>
```

Types: `info` | `warning` | `tip` | `error`.

---

## File structure

```
website/components/
├── README.md
├── example-preview/
│   ├── ExamplePreview.tsx
│   ├── ExamplePreview.module.css
│   └── PreviewShell.tsx
├── code-block/
│   ├── CodeBlock.tsx
│   ├── CodeBlock.module.css
│   └── CopyButton.tsx
├── props-table/
│   ├── PropsTable.tsx
│   └── PropsTable.module.css
├── widget-header/
│   └── WidgetHeader.tsx
├── flutter-comparison/
│   └── FlutterComparison.tsx
├── related-widgets/
│   └── RelatedWidgets.tsx
├── notes/
│   ├── AccessibilityNotes.tsx
│   └── SSRNotes.tsx
├── callout/
│   └── Callout.tsx
├── package-import/
│   └── PackageImport.tsx
├── shell/
│   ├── DocsLayout.tsx
│   ├── Sidebar.tsx
│   ├── TopNav.tsx
│   └── TableOfContents.tsx
└── shiki/
    └── highlighter.ts
```

---

## Styling tokens

Docs-specific CSS variables (not part of library theme):

```css
:root {
  --docs-sidebar-width: 280px;
  --docs-toc-width: 220px;
  --docs-preview-bg: var(--qf-color-surface-container-low, #f5f5f5);
  --docs-code-bg: #f6f8fa;
  --docs-border: #e2e8f0;
}
```

---

## Testing

Component tests in `website/tests/components/`:

- `CodeBlock` copy emits correct string
- `PropsTable` renders required marker
- `ExamplePreview` hides preview when `preview={false}`

Visual regression optional via Playwright screenshots of ExamplePreview.

---

## Related

- [Widget page template](../docs/WIDGET_PAGE_TEMPLATE.md)
- [Example system](../examples/README.md)
- [Playground](../playground/README.md)
