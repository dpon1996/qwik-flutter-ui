---
title: Row
description: Horizontal flex layout for aligning children on the main and cross axes — the primary one-dimensional layout primitive.
widget: Row
category: layout
flutterEquivalent: Row
status: shipped
related:
  - Column
  - Wrap
  - Spacer
  - Expanded
  - Flexible
since: "0.0.1"
examples:
  - id: row-basic
    file: examples/row/basic.tsx
    category: basic
  - id: row-nav-actions
    file: examples/row/nav-actions.tsx
    category: common
  - id: row-form-actions
    file: examples/row/form-actions.tsx
    category: common
  - id: row-toolbar
    file: examples/row/toolbar.tsx
    category: common
  - id: row-card-actions
    file: examples/row/card-actions.tsx
    category: common
  - id: row-main-start
    file: examples/row/main-start.tsx
    category: variation
  - id: row-main-center
    file: examples/row/main-center.tsx
    category: variation
  - id: row-main-end
    file: examples/row/main-end.tsx
    category: variation
  - id: row-main-space-between
    file: examples/row/main-space-between.tsx
    category: variation
  - id: row-main-space-around
    file: examples/row/main-space-around.tsx
    category: variation
  - id: row-main-space-evenly
    file: examples/row/main-space-evenly.tsx
    category: variation
  - id: row-cross-start
    file: examples/row/cross-start.tsx
    category: variation
  - id: row-cross-center
    file: examples/row/cross-center.tsx
    category: variation
  - id: row-cross-end
    file: examples/row/cross-end.tsx
    category: variation
  - id: row-cross-stretch
    file: examples/row/cross-stretch.tsx
    category: variation
  - id: row-spacer
    file: examples/row/spacer.tsx
    category: composition
  - id: row-expanded
    file: examples/row/expanded.tsx
    category: composition
  - id: row-flexible
    file: examples/row/flexible.tsx
    category: composition
  - id: row-composition
    file: examples/row/composition.tsx
    category: composition
  - id: row-overflow
    file: examples/row/overflow.tsx
    category: common
  - id: row-anti-nesting
    file: examples/row/anti-nesting.tsx
    category: anti-pattern
  - id: row-anti-fixed-width
    file: examples/row/anti-fixed-width.tsx
    category: anti-pattern
  - id: row-anti-overflow
    file: examples/row/anti-overflow.tsx
    category: anti-pattern
---

# Row

## Overview

`Row` lays out children **horizontally** in a single line. It maps to Flutter's [`Row`](https://api.flutter.dev/flutter/widgets/Row-class.html) and is implemented as a CSS flex container (`display: flex; flex-direction: row`).

Use `Row` when siblings should sit side-by-side: toolbars, button groups, label + control pairs, and card footers.

### Axes

| Axis | Direction in `Row` | CSS mapping | Controlled by |
| --- | --- | --- | --- |
| **Main axis** | Horizontal (left ↔ right) | `justify-content` | `mainAxisAlignment` |
| **Cross axis** | Vertical (top ↕ bottom) | `align-items` | `crossAxisAlignment` |

Default alignment: **`mainAxisAlignment.start`**, **`crossAxisAlignment.center`** (Flutter parity).

### Row vs Wrap vs Stack

| Widget | Layout | When to use |
| --- | --- | --- |
| **`Row`** | Single horizontal line | Fixed set of siblings that fit on one row |
| **`Wrap`** | Horizontal with line breaks | Tags, chips, responsive groups that may wrap |
| **`Stack`** | Overlapping layers | Badges on images, positioned overlays |

`Row` has **no `wrap` prop** — use **`Wrap`** when content may exceed available width.

---

## Import

```tsx
import { Row } from "qwik-flutter-ui";
```

Import alignment enums and children when examples use them:

```tsx
import {
  Row,
  Text,
  MainAxisAlignment,
  CrossAxisAlignment,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

The smallest working `Row` — two text children with gap.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Text>Left</Text>
      <Text>Right</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-basic`).

---

## Common Usage

### Navigation Actions

Space leading control, title, and trailing actions across the row.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  MainAxisAlignment,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} gap={8}>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        ← Back
      </Button>
      <Text>Settings</Text>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Save
      </Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-nav-actions`).

---

### Form Actions

Align submit and cancel buttons to the trailing edge.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  MainAxisAlignment,
  Row,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row mainAxisAlignment={MainAxisAlignment.end} gap={8}>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Cancel
      </Button>
      <Button type="submit">Save</Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-form-actions`).

---

### Toolbar Layout

Compact tool strip with consistent spacing via `gap`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, ButtonVariant, Row, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={4}>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Bold
      </Button>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Italic
      </Button>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Link
      </Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-toolbar`).

---

### Card Actions

Footer actions inside a card surface.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Container,
  MainAxisAlignment,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16} borderRadius={8} border="1px solid #e2e8f0">
      <Text as="p">Upgrade to Pro for advanced features.</Text>
      <Row mainAxisAlignment={MainAxisAlignment.end} gap={8}>
        <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
          Dismiss
        </Button>
        <Button type="button" onClick$={$(() => {})}>
          Upgrade
        </Button>
      </Row>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-card-actions`).

---

## Alignment

Each example sets **`mainAxisAlignment`** only. Children are short labels inside bordered containers for visual clarity.

### MainAxisAlignment.start

Children pack to the **start** of the row (default).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { MainAxisAlignment, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row mainAxisAlignment={MainAxisAlignment.start} gap={8}>
      <Text>A</Text>
      <Text>B</Text>
      <Text>C</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-main-start`).

---

### MainAxisAlignment.center

Children group at the **horizontal center**.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { MainAxisAlignment, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row mainAxisAlignment={MainAxisAlignment.center} gap={8}>
      <Text>A</Text>
      <Text>B</Text>
      <Text>C</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-main-center`).

---

### MainAxisAlignment.end

Children pack to the **end** (trailing edge in LTR).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { MainAxisAlignment, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row mainAxisAlignment={MainAxisAlignment.end} gap={8}>
      <Text>A</Text>
      <Text>B</Text>
      <Text>C</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-main-end`).

---

### MainAxisAlignment.spaceBetween

First child at start, last at end, **equal space between** siblings.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { MainAxisAlignment, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row mainAxisAlignment={MainAxisAlignment.spaceBetween}>
      <Text>Left</Text>
      <Text>Center</Text>
      <Text>Right</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-main-space-between`).

---

### MainAxisAlignment.spaceAround

**Equal space around** each child (half-size space at edges).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { MainAxisAlignment, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row mainAxisAlignment={MainAxisAlignment.spaceAround}>
      <Text>A</Text>
      <Text>B</Text>
      <Text>C</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-main-space-around`).

---

### MainAxisAlignment.spaceEvenly

**Equal space between and before/after** all children.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { MainAxisAlignment, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row mainAxisAlignment={MainAxisAlignment.spaceEvenly}>
      <Text>A</Text>
      <Text>B</Text>
      <Text>C</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-main-space-evenly`).

---

## Cross Axis Alignment

Use **`crossAxisAlignment`** to vertically position children of different heights. Examples use a tall middle child to show the effect.

### start

Children align to the **top** of the row.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  CrossAxisAlignment,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row crossAxisAlignment={CrossAxisAlignment.start} gap={8}>
      <Text>Short</Text>
      <Container padding={16} backgroundColor="#f1f5f9">
        <Text>Tall block</Text>
      </Container>
      <Text>Short</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-cross-start`).

---

### center

Children align to the **vertical center** (default).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  CrossAxisAlignment,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row crossAxisAlignment={CrossAxisAlignment.center} gap={8}>
      <Text>Short</Text>
      <Container padding={16} backgroundColor="#f1f5f9">
        <Text>Tall block</Text>
      </Container>
      <Text>Short</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-cross-center`).

---

### end

Children align to the **bottom** of the row.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  CrossAxisAlignment,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row crossAxisAlignment={CrossAxisAlignment.end} gap={8}>
      <Text>Short</Text>
      <Container padding={16} backgroundColor="#f1f5f9">
        <Text>Tall block</Text>
      </Container>
      <Text>Short</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-cross-end`).

---

### stretch

Children **stretch to the row's height** (tallest sibling defines cross-axis size).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  CrossAxisAlignment,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row crossAxisAlignment={CrossAxisAlignment.stretch} gap={8}>
      <Container padding={8} backgroundColor="#dbeafe">
        <Text>Stretches</Text>
      </Container>
      <Container padding={24} backgroundColor="#f1f5f9">
        <Text>Tallest</Text>
      </Container>
      <Container padding={8} backgroundColor="#dbeafe">
        <Text>Stretches</Text>
      </Container>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-cross-stretch`).

---

## Flexible Layout

Flex children distribute **remaining main-axis space** inside a `Row`.

| Widget | Behavior | Use when |
| --- | --- | --- |
| **`Spacer`** | Empty flex item that grows | Push siblings apart (e.g. title left, actions right) |
| **`Expanded`** | Child fills allocated flex space | Search field or content area should consume leftover width |
| **`Flexible`** | Child may keep natural size but participates in flex | Toolbar item shares space without forcing fill |

### Spacer

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Row, Spacer, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row>
      <Text>Title</Text>
      <Spacer />
      <Text>Actions</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-spacer`).

---

### Expanded

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Expanded, Row, TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Expanded>
        <TextField decoration={{ placeholder: "Search…" }} />
      </Expanded>
      <Text>Go</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-expanded`).

---

### Flexible

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Flexible, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Flexible>
        <Text>May shrink</Text>
      </Flexible>
      <Text>Fixed trailing</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-flexible`).

---

## Composition

Combine `Row` with typography, actions, and surfaces.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Container,
  CrossAxisAlignment,
  Expanded,
  FontWeight,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={12} backgroundColor="#f8fafc" borderRadius={8}>
      <Row crossAxisAlignment={CrossAxisAlignment.center} gap={12}>
        <Text fontWeight={FontWeight.bold}>⌕</Text>
        <Expanded>
          <Text>Search results</Text>
        </Expanded>
        <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
          Filter
        </Button>
      </Row>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-composition`).

**Patterns:**

- **`Text`** — labels, titles, inline glyphs
- **`Button`** — trailing actions; use `ButtonVariant.text` in dense rows
- **`Container`** — padded surfaces and visual grouping
- **`Expanded`** — let one child consume remaining width

---

## Overflow

### Row overflow behavior

`Row` defaults to **`overflow: visible`**. When children exceed the row width, content may **overflow horizontally** rather than wrap or shrink automatically.

### When to use Wrap

If siblings should **move to the next line**, use **`Wrap`** instead of `Row`.

### When to use Expanded

If one child should **absorb remaining width** and allow siblings to keep intrinsic size, wrap that child in **`Expanded`** (or **`Flexible`** for loose fit).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Expanded, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    {/* Without Expanded — long text may overflow the row */}
    <Row gap={8} style={{ maxWidth: 280 }}>
      <Text>Label</Text>
      <Text>
        This description is long and may overflow without Expanded or Wrap.
      </Text>
    </Row>

    {/* With Expanded — middle content shares remaining space */}
    <Row gap={8} style={{ maxWidth: 280 }}>
      <Text>Label</Text>
      <Expanded>
        <Text>This description uses available width inside Expanded.</Text>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: row-overflow`).

For tag lists and chip groups that must wrap, prefer **`Wrap`** with `spacing` / `runSpacing`.

---

## Best Practices

### Predictable spacing

Prefer **`gap`** on `Row` over manual spacers between every child.

```tsx
<Row gap={8}>
  <Text>A</Text>
  <Text>B</Text>
  <Text>C</Text>
</Row>
```

`gap` is a library extension over Flutter — it maps to CSS `gap` and keeps spacing consistent.

### Alignment consistency

Pick **`mainAxisAlignment`** once per pattern: `spaceBetween` for toolbars, `end` for form actions, `start` for reading order. Avoid mixing alignment strategies on the same surface without reason.

### Use Spacer over empty Containers

**Preferred**

```tsx
<Row>
  <Text>Title</Text>
  <Spacer />
  <Button type="button">Action</Button>
</Row>
```

**Avoid**

```tsx
<Row>
  <Text>Title</Text>
  <Container width={9999} />
  <Button type="button">Action</Button>
</Row>
```

`Spacer` expresses intent and participates correctly in flex layout.

---

## Anti-Patterns

### Excessive nesting

**Source** (avoid)

```tsx
<Row>
  <Row>
    <Row gap={8}>
      <Text>Over-nested</Text>
    </Row>
  </Row>
</Row>
```

**Preferred**

```tsx
<Row gap={8}>
  <Text>Flat structure</Text>
</Row>
```

**Why:** Each `Row` adds a wrapper `div`. Unnecessary nesting increases DOM depth and makes alignment harder to reason about.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: row-anti-nesting`, `preview: false`).

---

### Fixed-width layouts

**Source** (avoid)

```tsx
<Row gap={8}>
  <Container width={200}><Text>Col 1</Text></Container>
  <Container width={200}><Text>Col 2</Text></Container>
  <Container width={200}><Text>Col 3</Text></Container>
</Row>
```

**Preferred**

```tsx
<Row gap={8}>
  <Expanded><Text>Col 1</Text></Expanded>
  <Expanded><Text>Col 2</Text></Expanded>
  <Expanded><Text>Col 3</Text></Expanded>
</Row>
```

**Why:** Fixed widths break on narrow viewports. Flex children adapt to available space.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: row-anti-fixed-width`, `preview: false`).

---

### Overflow-prone layouts

**Source** (avoid)

```tsx
<Row gap={8}>
  <Text>Items:</Text>
  <Text>Alpha</Text>
  <Text>Beta</Text>
  <Text>Gamma</Text>
  <Text>Delta</Text>
  <Text>Epsilon</Text>
  <Text>Zeta</Text>
</Row>
```

**Preferred**

```tsx
<Wrap spacing={8} runSpacing={8}>
  <Text>Alpha</Text>
  <Text>Beta</Text>
  <Text>Gamma</Text>
  {/* … */}
</Wrap>
```

**Why:** Many siblings in one `Row` overflow horizontally. `Wrap` breaks to new lines.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: row-anti-overflow`, `preview: false`).

---

## Accessibility

### Semantic output

`Row` renders a **`<div>`** with flex layout. It is a **non-semantic** grouping container — do not use `Row` alone to convey structure. Use **`Text as="h1"`**, **`<nav>`** via `Container as="nav"`, or landmarks where meaning matters.

### Keyboard neutrality

`Row` is **non-interactive**. It does not trap focus or handle keyboard events. Interactive children (`Button`, `TextField`, links) keep their native tab order left-to-right within the row (respecting `textDirection` when set).

### Screen reader expectations

Assistive technology traverses **child content in DOM order**. `Row` does not announce itself as a list or toolbar unless you set an appropriate **`role`** (e.g. `role="toolbar"` on a tool strip) via `BaseProps`.

---

## SSR

### Static rendering

`Row` renders complete markup on the server. Alignment and size classes are applied via CSS modules; **`gap`** and **`textDirection`** emit as inline styles when set. No client-only APIs are required for layout.

### Resumability compatibility

`Row` is stateless — no event handlers or hooks. It adds no mandatory hydration JavaScript. Layout is fully determined by SSR HTML and CSS.

---

## Flutter Equivalent

| Topic | Flutter `Row` | qwik-flutter-ui `Row` |
| --- | --- | --- |
| Direction | Horizontal | Horizontal (`flex-direction: row`) |
| Main alignment | `mainAxisAlignment` | Same enum names |
| Cross alignment | `crossAxisAlignment` | Same enum names; default **`center`** |
| Main size | `mainAxisSize` | `MainAxisSize.max` → `width: 100%`; `min` → `fit-content` |
| Spacing | Manual `SizedBox` between children | **`gap` prop** (CSS extension) |
| Wrap | Separate `Wrap` widget | Same — no `wrap` on `Row` |
| Overflow | `overflow` clip modes | Default **visible**; use `Wrap` / `Expanded` |

**Flutter**

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Text('Left'),
    Spacer(),
    Text('Right'),
  ],
)
```

**qwik-flutter-ui**

```tsx
<Row mainAxisAlignment={MainAxisAlignment.spaceBetween} gap={8}>
  <Text>Left</Text>
  <Spacer />
  <Text>Right</Text>
</Row>
```

**Similarities:** Axis model, alignment enums, `Spacer` / `Expanded` / `Flexible` composition.

**Differences:** Native **`gap`** prop. No `children:` array — JSX slots. Renders HTML `<div>`. Default cross alignment is **`center`** (explicit for Flutter parity; CSS flex default is `stretch`).

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Column](/docs/widgets/layout/column) | Vertical counterpart — same `FlexProps`, swapped axes. |
| [Wrap](/docs/widgets/layout/wrap) | Horizontal layout with line breaks for overflow. |
| [Spacer](/docs/widgets/layout/spacer) | Pushes siblings apart along the main axis. |
| [Expanded](/docs/widgets/layout/expanded) | Forces a child to fill remaining row width. |
| [Flexible](/docs/widgets/layout/flexible) | Loose-fit flex child that may keep natural size. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Row
description: Horizontal flex layout for aligning children on the main and cross axes — the primary one-dimensional layout primitive.
widget: Row
category: layout
flutterEquivalent: Row
status: shipped
related:
  - Column
  - Wrap
  - Spacer
  - Expanded
  - Flexible
since: "0.0.1"
examples:
  - id: row-basic
    file: examples/row/basic.tsx
    category: basic
  - id: row-nav-actions
    file: examples/row/nav-actions.tsx
    category: common
  - id: row-form-actions
    file: examples/row/form-actions.tsx
    category: common
  - id: row-toolbar
    file: examples/row/toolbar.tsx
    category: common
  - id: row-card-actions
    file: examples/row/card-actions.tsx
    category: common
  - id: row-main-start
    file: examples/row/main-start.tsx
    category: variation
  - id: row-main-center
    file: examples/row/main-center.tsx
    category: variation
  - id: row-main-end
    file: examples/row/main-end.tsx
    category: variation
  - id: row-main-space-between
    file: examples/row/main-space-between.tsx
    category: variation
  - id: row-main-space-around
    file: examples/row/main-space-around.tsx
    category: variation
  - id: row-main-space-evenly
    file: examples/row/main-space-evenly.tsx
    category: variation
  - id: row-cross-start
    file: examples/row/cross-start.tsx
    category: variation
  - id: row-cross-center
    file: examples/row/cross-center.tsx
    category: variation
  - id: row-cross-end
    file: examples/row/cross-end.tsx
    category: variation
  - id: row-cross-stretch
    file: examples/row/cross-stretch.tsx
    category: variation
  - id: row-spacer
    file: examples/row/spacer.tsx
    category: composition
  - id: row-expanded
    file: examples/row/expanded.tsx
    category: composition
  - id: row-flexible
    file: examples/row/flexible.tsx
    category: composition
  - id: row-composition
    file: examples/row/composition.tsx
    category: composition
  - id: row-overflow
    file: examples/row/overflow.tsx
    category: common
  - id: row-anti-nesting
    file: examples/row/anti-nesting.tsx
    category: anti-pattern
  - id: row-anti-fixed-width
    file: examples/row/anti-fixed-width.tsx
    category: anti-pattern
  - id: row-anti-overflow
    file: examples/row/anti-overflow.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/row/` when the docs site is implemented.
