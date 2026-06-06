# Widget Documentation Page Template

Every widget page uses the **same section order and MDX structure**. Authors copy `_templates/widget-page.mdx` and fill placeholders. Consistency enables predictable TOC, search indexing, and automated related-widget graphs.

---

## Template (authoring source)

File: `website/docs/_templates/widget-page.mdx`

```mdx
---
title: TextField
description: A single-line text input with Flutter-style decoration and validation hooks.
widget: TextField
category: forms
flutterEquivalent: TextField
status: shipped          # shipped | planned | deprecated
related:
  - TextFormField
  - Form
  - InputDecoration
since: "0.1.0"
---

<WidgetHeader
  title="TextField"
  description="A single-line text input with Flutter-style decoration."
  status="shipped"
  flutterEquivalent="TextField"
/>

## Overview

Short explanation (2–4 sentences): what the widget does, when to use it, and how it differs from close alternatives.

## Import

<PackageImport names={["TextField"]} />

## Basic Example

Smallest working example — one concept only.

<ExamplePreview
  id="text-field-basic"
  example={BasicExample}
  source={basicSource}
/>

## Live Preview

Interactive preview with the primary demo. Same as basic unless the widget needs user interaction to demonstrate (e.g. Dialog open state).

<ExamplePreview
  id="text-field-live"
  example={LiveExample}
  source={liveSource}
  interactive
/>

## Common Scenarios

Focused examples — **one file per scenario**, never a kitchen sink.

### Controlled value

<ExamplePreview id="text-field-controlled" example={ControlledExample} source={controlledSource} />

### With decoration

<ExamplePreview id="text-field-decoration" example={DecorationExample} source={decorationSource} />

### Disabled and read-only

<ExamplePreview id="text-field-disabled" example={DisabledExample} source={disabledSource} />

## API

<PropsTable component="TextField" />

## Accessibility

<AccessibilityNotes widget="TextField">

- Describe keyboard interaction (Tab, Enter, Escape where relevant).
- Document ARIA roles inherited from semantic HTML.
- Note label association requirements for form fields.

</AccessibilityNotes>

## SSR

<SSRNotes widget="TextField">

- Initial HTML output description.
- Hydration boundaries (if any).
- Caveats (e.g. overlay portals, client-only APIs).

</SSRNotes>

## Flutter Equivalent

<FlutterComparison
  flutter="TextField"
  notes={[
    "Uses JSX children instead of InputDecoration constructor — decoration is a prop object.",
    "onChange$ replaces onChanged callback.",
  ]}
/>

## Related Widgets

<RelatedWidgets
  widgets={[
    { name: "TextFormField", href: "/docs/widgets/forms/text-form-field", reason: "Form-integrated variant with validation" },
    { name: "Form", href: "/docs/widgets/forms/form", reason: "Wrap fields for collective validation" },
  ]}
/>
```

---

## Section requirements

| Section | Required | Max length / notes |
| --- | --- | --- |
| **Overview** | Yes | 2–4 sentences + optional bullet list of key props |
| **Import** | Yes | Auto-generated from `PackageImport` |
| **Basic Example** | Yes | Single file, ≤ 15 lines of JSX |
| **Live Preview** | Yes | Can duplicate Basic for static widgets; must be interactive for overlays |
| **Common Scenarios** | Yes | 3–6 subsections; maps to [example categories](../examples/README.md) |
| **API** | Yes | `PropsTable` or link to `/docs/api/components/<slug>` |
| **Accessibility** | Yes | Bulleted guidance; link to WCAG patterns where applicable |
| **SSR** | Yes | Required for every widget (core library principle) |
| **Flutter Equivalent** | Yes | Widget name + parity notes; honest about differences |
| **Related Widgets** | Yes | 2–5 links with one-line `reason` |

---

## Frontmatter schema

```yaml
title: string              # Display name (PascalCase)
description: string        # SEO + WidgetHeader subtitle
widget: string             # Canonical export name
category: string           # layout | typography | forms | selection | theming | overlays | app-structure | navigation
flutterEquivalent: string  # Flutter class name
status: shipped | planned | deprecated
related: string[]          # PascalCase widget names for graph
since: semver              # First version exported
```

---

## Example page layout (rendered)

Visual structure users see on every widget page:

```
┌─────────────────────────────────────────────────────────┐
│  TextField                              [shipped badge] │
│  A single-line text input with Flutter-style decoration.│
├─────────────────────────────────────────────────────────┤
│  Overview                                               │
│  ─────────                                              │
│  Prose…                                                 │
├─────────────────────────────────────────────────────────┤
│  Import                                                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │ import { TextField } from "qwik-flutter-ui";     │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  Basic Example                                          │
│  ┌ Preview ─────────────────────────────────────────┐  │
│  │  [live widget]                                    │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌ Code ──────────────────────── [Copy] [Expand ▼] ─┐  │
│  │  1 │ import { ...                                  │  │
│  └───────────────────────────────────────────────────┘  │
│  Explanation prose (1–2 sentences)                      │
├─────────────────────────────────────────────────────────┤
│  … Common Scenarios (repeat preview + code blocks) …    │
├─────────────────────────────────────────────────────────┤
│  API                                                    │
│  ┌ PropsTable ──────────────────────────────────────┐  │
│  │ Name │ Type │ Default │ Description               │  │
│  └───────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  Accessibility │ SSR │ Flutter Equivalent │ Related    │
└─────────────────────────────────────────────────────────┘
```

---

## Category-specific scenario guidance

### Layout widgets

Scenarios should cover: basic composition, gap/spacing, alignment props, responsive width (`Length`), nesting with `Expanded`/`Flexible`.

### Form widgets

Scenarios should cover: controlled vs uncontrolled, validation, decoration, disabled/read-only, form integration.

### Overlay widgets

Scenarios must include: open/close trigger, focus trap behavior note, `OverlayContainer` setup reminder on first overlay page user visits.

### App structure widgets

Scenarios should show: minimal shell, with `AppBar`, with `Drawer`/`SideSheet`, responsive collapse.

### Theming

`ThemeProvider` page covers tokens and CSS variables; `useTheme` page covers reading theme in custom components.

---

## Planned widgets

Pages for **planned** widgets (Navigation section) use the same template with:

- `status: planned`
- Placeholder `ExamplePreview` replaced with `<Callout type="info">Coming in v1.9</Callout>`
- API section links to `docs/API_DESIGN.md` anchor
- Still published so navigation and search remain complete

---

## Checklist (per widget)

- [ ] Frontmatter complete
- [ ] Overview written
- [ ] Basic example file in `examples/<widget>/basic.tsx`
- [ ] Scenario examples match [COVERAGE_MATRIX](../examples/COVERAGE_MATRIX.md)
- [ ] PropsTable populated
- [ ] Accessibility + SSR sections filled
- [ ] Flutter comparison reviewed against API_DESIGN.md
- [ ] Related widgets linked (bidirectional where possible)
- [ ] Playground registry entry added
- [ ] API reference page stub created
