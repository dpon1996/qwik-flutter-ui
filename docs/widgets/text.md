---
title: Text
description: Display styled text with semantic HTML, flat typography props, and Flutter-familiar behavior.
widget: Text
category: typography
flutterEquivalent: Text
status: shipped
related:
  - Container
  - Center
  - Align
since: "0.0.1"
examples:
  - id: text-basic
    file: examples/text/basic.tsx
    category: basic
  - id: text-paragraph
    file: examples/text/paragraph.tsx
    category: common
  - id: text-heading
    file: examples/text/heading.tsx
    category: common
  - id: text-inline
    file: examples/text/inline.tsx
    category: common
  - id: text-selectable
    file: examples/text/selectable.tsx
    category: variation
  - id: text-alignment
    file: examples/text/alignment.tsx
    category: variation
  - id: text-max-lines
    file: examples/text/max-lines.tsx
    category: variation
  - id: text-overflow
    file: examples/text/overflow.tsx
    category: variation
---

# Text

## Overview

`Text` displays a run of styled text. It is the primary typography primitive in qwik-flutter-ui and maps directly to Flutter's [`Text`](https://api.flutter.dev/flutter/widgets/Text-class.html) widget.

Pass content as **JSX children**, not a `text` prop. Typography is configured with **flat props** (`fontSize`, `fontWeight`, `color`, …) instead of a nested `TextStyle` object.

Use `Text` whenever you need readable content: labels, headings, body copy, captions, and inline runs composed with layout widgets such as `Row`. Choose the `as` prop to control the HTML element (`p`, `h1`–`h6`, `span`, `label`, …) so pages stay semantic and accessible.

---

## Import

```tsx
import { Text } from "qwik-flutter-ui";
```

Import enums alongside `Text` when an example uses them:

```tsx
import { Text, FontWeight, TextAlign, TextOverflow } from "qwik-flutter-ui";
```

---

## Basic Example

The smallest working `Text` — default `as="span"`, theme-aware body styling, selectable by default.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Text>Hello, world</Text>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders a live `Text` example here (`id: text-basic`).

---

## Common Usage

### Paragraph text

Use `as="p"` for body copy. Browser default paragraph margins are reset; use layout widgets such as `Column` for spacing between blocks.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Column gap={16}>
      <Text as="p" lineHeight={1.6}>
        qwik-flutter-ui brings Flutter-style widgets to Qwik. Layout,
        typography, and forms share familiar prop names.
      </Text>
      <Text as="p" lineHeight={1.6}>
        Wrap paragraphs in Column and control spacing with gap instead of
        relying on browser margin defaults.
      </Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: text-paragraph`).

---

### Heading text

Use `as="h1"` through `as="h6"` for document structure. Heading tag defaults are reset in CSS so your `fontSize` and `fontWeight` props remain the source of truth.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, FontWeight, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Column gap={8}>
      <Text as="h1" fontSize={32} fontWeight={FontWeight.bold}>
        Dashboard
      </Text>
      <Text as="p">Overview of your account activity.</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: text-heading`).

---

### Inline text

Compose short inline runs by placing multiple `Text` widgets inside a `Row`. In v1, pass a single string per `Text` child; rich inline spans (`Text.rich` / nested `Text`) are planned for a future release.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { FontWeight, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Row gap={4}>
      <Text>Plan:</Text>
      <Text fontWeight={FontWeight.bold}>Pro</Text>
      <Text color="#64748b">(billed annually)</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: text-inline`).

---

## Variations

### Selectable text

`selectable` defaults to `true`, so users can copy text in the browser. Set `selectable={false}` for decorative labels or UI chrome where selection would be distracting.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Column gap={12}>
      <Text selectable={true}>Selectable — try highlighting this sentence.</Text>
      <Text selectable={false}>Not selectable — user-select is disabled.</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: text-selectable`).

---

### Text alignment

Use `textAlign` with the `TextAlign` enum. Values mirror CSS text alignment, including logical `start` and `end` for RTL layouts.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Text, TextAlign, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Column gap={12}>
      <Text textAlign={TextAlign.start}>Aligned to start</Text>
      <Text textAlign={TextAlign.center}>Aligned to center</Text>
      <Text textAlign={TextAlign.end}>Aligned to end</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: text-alignment`).

---

### Max lines

`maxLines` truncates multi-line content using line clamping. Pair it with `overflow={TextOverflow.ellipsis}` to append an ellipsis when text exceeds the limit.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Text, TextOverflow, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Text maxLines={2} overflow={TextOverflow.ellipsis}>
      qwik-flutter-ui is a Flutter-inspired component library for Qwik. It
      prioritizes semantic HTML, accessibility, SSR-friendly markup, and
      minimal client-side JavaScript through Qwik resumability.
    </Text>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: text-max-lines`).

---

### Overflow behavior

`overflow` controls how clipped text is presented. `ellipsis` and `clip` suit single-line truncation; `fade` approximates Flutter's fade overflow with a CSS mask (visual results may differ slightly by browser).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Text, TextOverflow, ThemeProvider } from "qwik-flutter-ui";

const LONG =
  "This label is intentionally long so truncation behavior is visible in the preview.";

export default component$(() => (
  <ThemeProvider>
    <Column gap={12} style={{ maxWidth: "240px" }}>
      <Text overflow={TextOverflow.ellipsis} softWrap={false}>
        {LONG}
      </Text>
      <Text overflow={TextOverflow.clip} softWrap={false}>
        {LONG}
      </Text>
      <Text overflow={TextOverflow.fade} softWrap={false}>
        {LONG}
      </Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: text-overflow`).

---

## Accessibility

### Semantic output

The `as` prop determines the rendered HTML element. Use heading tags (`h1`–`h6`) for titles, `p` for paragraphs, and `label` when associating copy with form controls. Default `span` is appropriate inside buttons or inline runs in a `Row`.

Browser default styles for semantic tags are reset so typography props stay predictable; this does **not** remove semantic meaning — assistive technologies still recognize the chosen tag.

### Heading usage

Follow a logical heading order (`h1` → `h2` → `h3`). Do not pick heading levels for font size alone — set `fontSize` and `fontWeight` on the correct level instead. One primary `h1` per page is recommended for document landmarks.

### Screen reader behavior

`Text` renders plain text content in the DOM with no extra ARIA roles. Screen readers announce the element according to its tag (heading, paragraph, label).

Standard `BaseProps` attributes pass through: use `id`, `aria-label`, or `aria-describedby` when a design requires accessible naming beyond visible text. `selectable={true}` (the default) preserves native copy and screen-reader text selection behavior in browsers.

---

## SSR

### Static rendering

`Text` renders fully on the server. Typography is applied via inline styles computed from props and theme defaults, so the first paint matches the client without a flash of unstyled content. No client-only APIs are required for basic text display.

### Resumability compatibility

`Text` is a stateless presentational widget — it does not register event handlers or use client-only hooks for rendering. It participates cleanly in Qwik's resumability model: HTML is complete after SSR, and hydration adds no mandatory client JavaScript for static text.

Theme defaults are read from `ThemeProvider` context at render time. Wrap examples and app roots in `ThemeProvider` so server and client produce consistent typography.

---

## Flutter Equivalent

| Topic | Flutter `Text` | qwik-flutter-ui `Text` |
| --- | --- | --- |
| Content | First positional `String` or `TextSpan` tree | JSX children: `<Text>Hello</Text>` |
| Styling | `TextStyle` via `style:` parameter | Flat props: `fontSize`, `fontWeight`, `color`, … |
| Semantics | Widget tree only; no HTML element choice | `as` prop selects HTML tag (`span`, `p`, `h1`, …) |
| Alignment | `textAlign:` parameter | `textAlign={TextAlign.center}` |
| Truncation | `maxLines` + `overflow:` | Same prop names; `TextOverflow` enum |
| Selectable | Platform-dependent; often false on mobile | Defaults to `true` (web convention) |
| Rich text | `Text.rich`, `TextSpan` | Single string per `Text` in v1; rich spans planned |

**Flutter**

```dart
Text(
  'Settings',
  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
  textAlign: TextAlign.center,
)
```

**qwik-flutter-ui**

```tsx
<Text fontSize={20} fontWeight={FontWeight.bold} textAlign={TextAlign.center}>
  Settings
</Text>
```

**Similarities:** Prop names for `textAlign`, `maxLines`, `overflow`, and `softWrap` align with Flutter. Font weight uses a `FontWeight` enum with familiar values.

**Differences:** No `text` prop or nested `TextStyle`. Semantic HTML via `as`. Text is selectable by default on the web. Nested inline spans (`Text.rich`) are not yet supported — compose multiple `Text` nodes in a `Row` instead.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Container](/docs/widgets/layout/container) | Wrap text in a box with padding, background, or border. |
| [Center](/docs/widgets/layout/center) | Center a `Text` child within its parent. |
| [Align](/docs/widgets/layout/align) | Position text against a specific alignment anchor. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Text
description: Display styled text with semantic HTML, flat typography props, and Flutter-familiar behavior.
widget: Text
category: typography
flutterEquivalent: Text
status: shipped
related:
  - Container
  - Center
  - Align
since: "0.0.1"
examples:
  - id: text-basic
    file: examples/text/basic.tsx
    category: basic
  - id: text-paragraph
    file: examples/text/paragraph.tsx
    category: common
  - id: text-heading
    file: examples/text/heading.tsx
    category: common
  - id: text-inline
    file: examples/text/inline.tsx
    category: common
  - id: text-selectable
    file: examples/text/selectable.tsx
    category: variation
  - id: text-alignment
    file: examples/text/alignment.tsx
    category: variation
  - id: text-max-lines
    file: examples/text/max-lines.tsx
    category: variation
  - id: text-overflow
    file: examples/text/overflow.tsx
    category: variation
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/text/` when the docs site is implemented.
