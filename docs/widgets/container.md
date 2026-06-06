---
title: Container
description: A box with sizing, spacing, flat decoration, and child alignment — the primary surface primitive for layout.
widget: Container
category: layout
flutterEquivalent: Container
status: shipped
related:
  - SizedBox
  - Center
  - Align
  - Row
  - Column
since: "0.0.1"
examples:
  - id: container-basic
    file: examples/container/basic.tsx
    category: basic
  - id: container-padding
    file: examples/container/padding.tsx
    category: common
  - id: container-colored
    file: examples/container/colored.tsx
    category: common
  - id: container-sized
    file: examples/container/sized.tsx
    category: common
  - id: container-border
    file: examples/container/border.tsx
    category: common
  - id: container-rounded
    file: examples/container/rounded.tsx
    category: common
  - id: container-in-row
    file: examples/container/in-row.tsx
    category: composition
  - id: container-in-column
    file: examples/container/in-column.tsx
    category: composition
  - id: container-with-center
    file: examples/container/with-center.tsx
    category: composition
  - id: container-with-align
    file: examples/container/with-align.tsx
    category: composition
  - id: container-width
    file: examples/container/width.tsx
    category: variation
  - id: container-height
    file: examples/container/height.tsx
    category: variation
  - id: container-constraints
    file: examples/container/constraints.tsx
    category: variation
  - id: container-background-color
    file: examples/container/background-color.tsx
    category: variation
  - id: container-border-side
    file: examples/container/border-side.tsx
    category: variation
  - id: container-border-radius
    file: examples/container/border-radius.tsx
    category: variation
  - id: container-box-shadow
    file: examples/container/box-shadow.tsx
    category: variation
  - id: container-anti-nesting
    file: examples/container/anti-nesting.tsx
    category: anti-pattern
  - id: container-anti-spacer
    file: examples/container/anti-spacer.tsx
    category: anti-pattern
---

# Container

## Overview

`Container` is a general-purpose box that combines **sizing**, **spacing**, **decoration**, and **child alignment** in one widget. It maps to Flutter's [`Container`](https://api.flutter.dev/flutter/widgets/Container-class.html).

Use `Container` when a single element needs padding, background, borders, fixed dimensions, or to align its child within a bounded area. Decoration props are **flat** (`backgroundColor`, `borderRadius`, `border`, …) — there is no nested `decoration` object.

### When to use Container

- Wrap content with **padding** or **margin**
- Apply **background color**, **borders**, **radius**, or **shadow**
- Set explicit **width**, **height**, or **min/max constraints**
- **Align a child** inside a sized box via the `alignment` prop

### When NOT to use Container

| Need | Prefer instead |
| --- | --- |
| Fixed gap between flex children | `gap` on `Row` / `Column` |
| Empty space or fixed-size spacer only | `SizedBox` or `Spacer` |
| Material-style elevated panel | `Card` |
| Center a child in a parent | `Center` (or `Align` for non-center positions) |
| Position a child on the 9-point grid in a parent | `Align` |
| Horizontal or vertical flex layout | `Row` / `Column` |

### Spacing

`padding` and `margin` accept `EdgeInsets` — a number (all sides), a tuple, or an object with `top` / `right` / `bottom` / `left` / `x` / `y` keys. Numbers become pixels; strings pass through as CSS values.

### Decoration

Flat decoration props map to CSS: `backgroundColor`, `borderRadius`, `border`, `boxShadow`, `gradient`, `opacity`, and `transform`. When both `backgroundColor` and `gradient` are set, the gradient paints on top (CSS behavior).

### Sizing

`width`, `height`, `minWidth`, `maxWidth`, `minHeight`, and `maxHeight` accept `Length` values (`number` → px, or CSS strings such as `"100%"` and `"min(100%, 480px)"`).

### Alignment wrappers

`Container` can align its child via `alignment={Alignment.center}` (flexbox inside the box). For layout-level centering or grid positioning, prefer dedicated widgets — `Center` fills the parent and centers both axes; `Align` places a child at any `Alignment` value within the parent's constraints.

---

## Import

```tsx
import { Container } from "qwik-flutter-ui";
```

Import shared types and enums when examples use them:

```tsx
import {
  Container,
  Alignment,
  BorderStyle,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

The smallest working `Container` — padding and a text child.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container padding={16}>
      <Text>Hello inside a Container</Text>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-basic`).

---

## Common Usage

### Padding Container

Add inner spacing with `padding`. Prefer `EdgeInsets` object form when sides differ.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container padding={{ x: 24, y: 16 }} backgroundColor="#f8fafc">
      <Text>Content inset from the container edges.</Text>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-padding`).

---

### Colored Container

Set a surface color with `backgroundColor`. Use theme-friendly values or CSS color strings.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container padding={16} backgroundColor="#dbeafe">
      <Text>Highlighted callout block</Text>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-colored`).

---

### Sized Container

Give the box explicit dimensions. Pair with `alignment` when content should sit off-center inside the box.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Alignment, Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container
      width={280}
      height={120}
      alignment={Alignment.center}
      backgroundColor="#f1f5f9"
    >
      <Text>Fixed-size surface</Text>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-sized`).

---

### Border Container

Draw a border with a CSS string or a structured `BorderSide`.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { BorderStyle, Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container
      padding={16}
      border={{ width: 1, color: "#cbd5e1", style: BorderStyle.solid }}
    >
      <Text>Outlined container</Text>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-border`).

---

### Rounded Container

Round corners with `borderRadius`. A single number applies to all corners; use an object for per-corner control.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container
      padding={16}
      borderRadius={12}
      backgroundColor="#fff"
      border="1px solid #e2e8f0"
    >
      <Text>Rounded surface</Text>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-rounded`).

---

## Layout Composition

### Container inside Row

Use `Container` as a flex item. Combine with `Expanded` when a panel should consume remaining horizontal space.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Expanded,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Row gap={12}>
      <Container padding={12} backgroundColor="#fef3c7">
        <Text>Sidebar</Text>
      </Container>
      <Expanded>
        <Container padding={12} backgroundColor="#ecfdf5">
          <Text>Main content grows to fill the row.</Text>
        </Container>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-in-row`).

**Pattern:** `Row` handles axis layout; `Container` supplies per-panel padding and surface styling.

---

### Container inside Column

Stack surfaces vertically. Prefer `Column` `gap` for space between containers instead of margin-only wrappers.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Column gap={16}>
      <Container padding={16} backgroundColor="#f8fafc">
        <Text>Section one</Text>
      </Container>
      <Container padding={16} backgroundColor="#f8fafc">
        <Text>Section two</Text>
      </Container>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-in-column`).

**Pattern:** One `Container` per logical section; `Column gap` replaces nested spacing boxes.

---

### Container with Center

Place a sized `Container` in the tree and use `Center` to center its child when the container fills available space from a parent.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Center,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container width="100%" height={160} backgroundColor="#f1f5f9">
      <Center>
        <Text>Centered in a full-width container</Text>
      </Center>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-with-center`).

**Pattern:** `Center` is for layout-level centering; use `Container` `alignment` when the box itself has fixed size and you do not need a separate centering widget.

---

### Container with Align

Position a child at a specific anchor — for example, bottom-end — inside a bounded parent.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Align,
  Alignment,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container width={240} height={120} backgroundColor="#e0e7ff">
      <Align alignment={Alignment.bottomRight}>
        <Text>Bottom-right</Text>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-with-align`).

**Pattern:** The parent `Container` must provide bounded width and height so `Align` has space to position against.

---

## Variations

Each example below changes **one concept** only.

### Width

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container width={200} padding={12} backgroundColor="#f8fafc">
      <Text>Fixed width: 200px</Text>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-width`).

---

### Height

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container height={80} padding={12} backgroundColor="#f8fafc">
      <Text>Fixed height: 80px</Text>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-height`).

---

### Constraints

Use `minWidth`, `maxWidth`, and related props as flat alternatives to Flutter's `BoxConstraints`.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container
      width="100%"
      minWidth={200}
      maxWidth={480}
      padding={16}
      backgroundColor="#f8fafc"
    >
      <Text>Fluid width clamped between 200px and 480px.</Text>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-constraints`).

---

### Background color

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container padding={16} backgroundColor="#dcfce7">
      <Text>backgroundColor only</Text>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-background-color`).

---

### Border

Structured `BorderSide` with explicit width, color, and style.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { BorderStyle, Container, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container
      width={120}
      height={48}
      border={{ width: 2, color: "#6366f1", style: BorderStyle.dashed }}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-border-side`).

---

### Border radius

Per-corner radius matches Flutter's `BorderRadius.only(...)`.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container
      width={120}
      height={64}
      backgroundColor="#6366f1"
      borderRadius={{ topLeft: 24, bottomRight: 24 }}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-border-radius`).

---

### Box shadow

Pass a structured `BoxShadow` or a raw CSS shadow string.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider>
    <Container
      padding={16}
      backgroundColor="#fff"
      borderRadius={8}
      boxShadow={{ offsetY: 4, blur: 12, color: "rgba(0,0,0,0.12)" }}
    >
      <Text>Elevated surface</Text>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: container-box-shadow`).

---

## Best Practices

### Group styling in Container

Combine padding, background, border, and radius on one `Container` instead of splitting them across nested wrappers. One styled box is easier to read and matches Flutter's single-`Container` idiom.

```tsx
<Container
  padding={16}
  backgroundColor="#fff"
  borderRadius={12}
  border="1px solid #e2e8f0"
>
  <Text>Card-like content</Text>
</Container>
```

For Material-style elevation presets, prefer `Card` over hand-tuned shadows.

### Avoid excessive nesting

Each wrapper adds DOM depth and mental overhead. If an outer `Container` only exists to pass padding to an inner `Container` that already has decoration, merge props onto one box.

### Use SizedBox when only spacing is required

Fixed vertical or horizontal gaps without decoration belong on `SizedBox`, `Spacer`, or `Row` / `Column` `gap` — not an empty `Container`.

```tsx
<Column gap={16}>
  <Header />
  <Body />
</Column>
```

---

## Anti-Patterns

### Deeply nested Containers

**Source** (avoid)

```tsx
<Container padding={8}>
  <Container padding={8}>
    <Container padding={8} backgroundColor="#fff">
      <Text>Over-nested</Text>
    </Container>
  </Container>
</Container>
```

**Why:** Three boxes each add padding and DOM nodes. Merge into a single `Container` with the intended `padding` and `backgroundColor`, or use `Column gap` for spacing between siblings.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: container-anti-nesting`, `preview: false`).

---

### Container for spacing only

**Source** (avoid)

```tsx
<Column>
  <Text>Title</Text>
  <Container height={16} />
  <Text>Body</Text>
</Column>
```

**Preferred**

```tsx
<Column gap={16}>
  <Text>Title</Text>
  <Text>Body</Text>
</Column>
```

**Why:** `Container` carries decoration and alignment semantics. An empty height-only box is a `SizedBox` at best; in flex layouts, `gap` is clearer and cheaper.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: container-anti-spacer`, `preview: false`).

---

## Accessibility

### Semantic output

Use the `as` prop to render meaningful HTML: `section`, `article`, `header`, `footer`, `nav`, `aside`, or `main`. Default `div` is appropriate for purely presentational grouping with no landmark role.

### Decorative containers

Purely visual wrappers (background panels, rounded borders) should not mimic interactive controls. Do not attach click handlers to decorative containers without a button role and keyboard support — use `Button` for actions.

If a container is purely decorative and duplicates visible structure, consider `aria-hidden="true"` on the wrapper while keeping text in semantic children.

### ARIA passthrough

`Container` extends `BaseProps`. Standard attributes pass through to the DOM: `id`, `role`, any `aria-*` attribute, and `data-*` for tests. Unknown props are rejected at compile time.

```tsx
<Container as="nav" aria-label="Primary">
  {/* navigation links */}
</Container>
```

---

## SSR

### Static rendering

`Container` emits complete markup on the server. Sizing, spacing, and decoration are applied via inline styles computed from props, so the first paint includes backgrounds, borders, and dimensions without client-side styling logic.

### Resumability compatibility

`Container` is stateless — no event handlers or client hooks are required for layout or decoration. It aligns with Qwik resumability: SSR HTML is authoritative, and hydration adds no mandatory JavaScript for static boxes.

User-provided `class` and `style` merge with internal values; user values win (§0.6). SSR and client merges produce the same result when props are identical.

---

## Flutter Equivalent

| Topic | Flutter `Container` | qwik-flutter-ui `Container` |
| --- | --- | --- |
| Decoration | Nested `BoxDecoration` | Flat props: `backgroundColor`, `borderRadius`, `border`, … |
| Padding / margin | `EdgeInsets` | Same `EdgeInsets` shapes (§0.3) |
| Constraints | `BoxConstraints` via parent or `width`/`height` | Flat `minWidth`, `maxWidth`, `minHeight`, `maxHeight` |
| Child alignment | `alignment:` property | Same `Alignment` enum |
| Semantic HTML | N/A | `as` prop selects tag (`section`, `header`, …) |
| Clip behavior | `clipBehavior` | Deferred in v1; use `style={{ overflow: "hidden" }}` |
| Elevated panels | `Container` + shadow | Prefer `Card` for Material-style surfaces |

**Flutter**

```dart
Container(
  width: 240,
  padding: EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Color(0xFFE2E8F0)),
  ),
  child: Text('Card'),
)
```

**qwik-flutter-ui**

```tsx
<Container
  width={240}
  padding={16}
  backgroundColor="#fff"
  borderRadius={12}
  border="1px solid #e2e8f0"
>
  <Text>Card</Text>
</Container>
```

**Similarities:** `padding`, `margin`, `width`, `height`, `alignment`, and `EdgeInsets` mirror Flutter. `BorderRadius` object form matches `BorderRadius.only`.

**Differences:** No nested `decoration` or `BoxDecoration`. Gradient and `backgroundColor` can both be set (gradient wins visually). Per-side borders and `clip` are deferred to v1.1 — use `style` escape hatches where needed.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [SizedBox](/docs/widgets/layout/sized-box) | Fixed dimensions or empty spacing without decoration. |
| [Center](/docs/widgets/layout/center) | Centers a child on both axes within the parent. |
| [Align](/docs/widgets/layout/align) | Positions a child at any `Alignment` anchor. |
| [Row](/docs/widgets/layout/row) | Horizontal flex layout; `Container` styles individual items. |
| [Column](/docs/widgets/layout/column) | Vertical flex layout; stack styled sections with `gap`. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Container
description: A box with sizing, spacing, flat decoration, and child alignment — the primary surface primitive for layout.
widget: Container
category: layout
flutterEquivalent: Container
status: shipped
related:
  - SizedBox
  - Center
  - Align
  - Row
  - Column
since: "0.0.1"
examples:
  - id: container-basic
    file: examples/container/basic.tsx
    category: basic
  - id: container-padding
    file: examples/container/padding.tsx
    category: common
  - id: container-colored
    file: examples/container/colored.tsx
    category: common
  - id: container-sized
    file: examples/container/sized.tsx
    category: common
  - id: container-border
    file: examples/container/border.tsx
    category: common
  - id: container-rounded
    file: examples/container/rounded.tsx
    category: common
  - id: container-in-row
    file: examples/container/in-row.tsx
    category: composition
  - id: container-in-column
    file: examples/container/in-column.tsx
    category: composition
  - id: container-with-center
    file: examples/container/with-center.tsx
    category: composition
  - id: container-with-align
    file: examples/container/with-align.tsx
    category: composition
  - id: container-width
    file: examples/container/width.tsx
    category: variation
  - id: container-height
    file: examples/container/height.tsx
    category: variation
  - id: container-constraints
    file: examples/container/constraints.tsx
    category: variation
  - id: container-background-color
    file: examples/container/background-color.tsx
    category: variation
  - id: container-border-side
    file: examples/container/border-side.tsx
    category: variation
  - id: container-border-radius
    file: examples/container/border-radius.tsx
    category: variation
  - id: container-box-shadow
    file: examples/container/box-shadow.tsx
    category: variation
  - id: container-anti-nesting
    file: examples/container/anti-nesting.tsx
    category: anti-pattern
  - id: container-anti-spacer
    file: examples/container/anti-spacer.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/container/` when the docs site is implemented.
