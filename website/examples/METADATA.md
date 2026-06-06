# Example Metadata Schema

Every example file exports a `meta` object (or uses a co-located `.meta.ts`). Metadata drives playground labels, search facets, difficulty badges, and coverage validation.

---

## Frontmatter (MDX recipes)

Recipe pages under `docs/examples/` use YAML frontmatter at the top of `.mdx` files:

```yaml
---
title: Login Form
description: Email and password fields with validation and submit handling.
widget: Form
category: form-recipes
difficulty: intermediate
tags:
  - validation
  - submission
relatedWidgets:
  - TextFormField
  - Button
---
```

---

## Example module metadata (`.tsx` files)

```ts
export type ExampleCategory =
  | "basic"
  | "common"
  | "variation"
  | "composition"
  | "best-practice"
  | "anti-pattern";

export type ExampleDifficulty = "beginner" | "intermediate" | "advanced";

export type ExampleMeta = {
  /** Display title in playground picker and docs heading */
  title: string;

  /** One sentence shown under title */
  description: string;

  /** PascalCase widget name (canonical export) */
  widget: string;

  /** Example category for grouping and coverage checks */
  category: ExampleCategory;

  /** Skill level badge */
  difficulty: ExampleDifficulty;

  /** Optional tags for search */
  tags?: string[];

  /** Wrap preview in OverlayContainer */
  requiresOverlayContainer?: boolean;

  /** Skip live preview (anti-patterns, setup-only snippets) */
  preview?: boolean;

  /** Default expanded state for code panel */
  defaultExpanded?: boolean;

  /** Sort order within widget (lower first) */
  order?: number;
};
```

---

## Field reference

| Field | Required | Type | Description |
| --- | --- | --- | --- |
| `title` | Yes | `string` | Human-readable name: `"Basic"`, `"With validation"` |
| `description` | Yes | `string` | ≤ 120 chars |
| `widget` | Yes | `string` | PascalCase: `"TextField"` |
| `category` | Yes | `ExampleCategory` | See categories below |
| `difficulty` | Yes | `ExampleDifficulty` | Badge in playground |
| `tags` | No | `string[]` | Free-form: `["controlled", "email"]` |
| `requiresOverlayContainer` | No | `boolean` | Default `false`; `true` for Dialog, Menu, etc. |
| `preview` | No | `boolean` | Default `true`; set `false` for code-only |
| `defaultExpanded` | No | `boolean` | Code panel starts expanded |
| `order` | No | `number` | Manual sort override |

---

## Category definitions

| Category | When to use |
| --- | --- |
| `basic` | Minimum viable example; required for every widget |
| `common` | Typical production configuration |
| `variation` | Explores one prop or variant (size, alignment, variant enum) |
| `composition` | Shows widget alongside others (Form + TextFormField) |
| `best-practice` | Recommended pattern from API_DESIGN.md |
| `anti-pattern` | Shows what **not** to do; usually `preview: false` |

---

## Difficulty guidelines

| Level | Criteria |
| --- | --- |
| `beginner` | No signals, no QRLs, ≤ 10 lines JSX |
| `intermediate` | Uses `useSignal`, form validation, or 2+ widgets |
| `advanced` | Custom QRLs, overlay stacking, AppShell composition |

---

## Example

```ts
export const meta: ExampleMeta = {
  title: "Validation",
  description: "TextFormField with required and email validators.",
  widget: "TextFormField",
  category: "common",
  difficulty: "intermediate",
  tags: ["validation", "email"],
  order: 20,
};
```

---

## JSON export (playground / search)

Registry builds a flattened JSON index at build time:

```json
{
  "id": "text-form-field/validation",
  "title": "Validation",
  "description": "TextFormField with required and email validators.",
  "widget": "TextFormField",
  "widgetSlug": "text-form-field",
  "category": "common",
  "difficulty": "intermediate",
  "tags": ["validation", "email"]
}
```

Output path: `website/dist/_examples/index.json` (generated, not committed).
