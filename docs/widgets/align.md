---
title: Align
description: Positions a child on the nine-point alignment grid within the parent's available space — without absolute offsets.
widget: Align
category: layout
flutterEquivalent: Align
status: shipped
related:
  - Center
  - Positioned
  - Stack
  - Container
since: "0.0.1"
examples:
  - id: align-basic
    file: examples/align/basic.tsx
    category: basic
  - id: align-top-start
    file: examples/align/top-start.tsx
    category: common
  - id: align-top-end
    file: examples/align/top-end.tsx
    category: common
  - id: align-bottom-start
    file: examples/align/bottom-start.tsx
    category: common
  - id: align-bottom-end
    file: examples/align/bottom-end.tsx
    category: common
  - id: align-center
    file: examples/align/center.tsx
    category: common
  - id: align-start
    file: examples/align/start.tsx
    category: variation
  - id: align-center-grid
    file: examples/align/center-grid.tsx
    category: variation
  - id: align-end
    file: examples/align/end.tsx
    category: variation
  - id: align-custom
    file: examples/align/custom.tsx
    category: variation
  - id: align-composition
    file: examples/align/composition.tsx
    category: composition
  - id: align-in-container
    file: examples/align/in-container.tsx
    category: common
  - id: align-in-column
    file: examples/align/in-column.tsx
    category: common
  - id: align-in-row
    file: examples/align/in-row.tsx
    category: common
  - id: align-in-stack
    file: examples/align/in-stack.tsx
    category: common
  - id: align-vs-center-center
    file: examples/align/vs-center-center.tsx
    category: common
  - id: align-vs-center-align
    file: examples/align/vs-center-align.tsx
    category: common
  - id: align-vs-positioned-align
    file: examples/align/vs-positioned-align.tsx
    category: common
  - id: align-vs-positioned-positioned
    file: examples/align/vs-positioned-positioned.tsx
    category: common
  - id: align-anti-layout
    file: examples/align/anti-layout.tsx
    category: anti-pattern
  - id: align-anti-nesting
    file: examples/align/anti-nesting.tsx
    category: anti-pattern
  - id: align-anti-center
    file: examples/align/anti-center.tsx
    category: anti-pattern
---

# Align

## Overview

`Align` positions its **single child** on the **nine-point `Alignment` grid** within the parent's available space. It maps to Flutter's [`Align`](https://api.flutter.dev/flutter/widgets/Align-class.html).

Use `Align` when content should sit at a **grid anchor** — top-start badges, bottom-end actions, centered overlays — **without** pixel offsets or absolute placement.

### Alignment model

| Concept | Behavior |
| --- | --- |
| **Child alignment** | Places the child at an `Alignment` anchor |
| **Parent constraints** | Fills available space from the parent (`width` / `height` 100%) |
| **Without absolute positioning** | Relative grid placement — not `top` / `left` offsets |

Alignment is only visible when the **parent supplies bounded constraints** (sized `Container`, `Expanded`, or `Stack`).

### Align vs Center vs Positioned vs Container alignment

| Widget | Purpose |
| --- | --- |
| **`Align`** | Any **`Alignment`** value; optional `widthFactor` / `heightFactor` |
| **`Center`** | Sugar for **`Align` with `alignment={Alignment.center}`** |
| **`Positioned`** | Pixel offsets inside **`Stack`** only |
| **`Container` `alignment`** | Align a child inside a **box you size and decorate** |

---

## Import

```tsx
import { Align } from "qwik-flutter-ui";
```

Import layout widgets and enums when examples use them:

```tsx
import {
  Align,
  Alignment,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

A label aligned to the bottom-end of a bounded region.

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
  <ThemeProvider theme={{}}>
    <Container height={120} backgroundColor="#f1f5f9">
      <Align alignment={Alignment.bottomRight}>
        <Text>Bottom end</Text>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-basic`).

---

## Common Usage

### Top Start

Badge at the top-start corner (Flutter `Alignment.topStart` → **`Alignment.topLeft`**).

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
  <ThemeProvider theme={{}}>
    <Container height={140} backgroundColor="#e0e7ff">
      <Align alignment={Alignment.topLeft}>
        <Container padding={8} backgroundColor="#ffffff" borderRadius={4}>
          <Text>Top start</Text>
        </Container>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-top-start`).

---

### Top End

Action chip at the top-end corner.

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
  <ThemeProvider theme={{}}>
    <Container height={140} backgroundColor="#e0e7ff">
      <Align alignment={Alignment.topRight}>
        <Container padding={8} backgroundColor="#ffffff" borderRadius={4}>
          <Text>Top end</Text>
        </Container>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-top-end`).

---

### Bottom Start

Caption anchored to the bottom-start.

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
  <ThemeProvider theme={{}}>
    <Container height={140} backgroundColor="#dbeafe">
      <Align alignment={Alignment.bottomLeft}>
        <Container padding={8} backgroundColor="rgba(255,255,255,0.9)">
          <Text>Bottom start</Text>
        </Container>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-bottom-start`).

---

### Bottom End

FAB-style control at the bottom-end.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Align,
  Alignment,
  Button,
  Container,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container height={180} backgroundColor="#f8fafc">
      <Align alignment={Alignment.bottomRight}>
        <Button type="button" onClick$={$(() => {})}>
          Go
        </Button>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-bottom-end`).

---

### Center

Both-axis center — equivalent to **`Center`**.

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
  <ThemeProvider theme={{}}>
    <Container height={140} backgroundColor="#f1f5f9">
      <Align alignment={Alignment.center}>
        <Text>Centered</Text>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-center`).

---

## Alignment Values

The **`Alignment`** enum defines nine grid positions. Default is **`Alignment.center`**.

### start

Top-start anchor — content hugs the start corner.

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
  <ThemeProvider theme={{}}>
    <Container height={120} backgroundColor="#fecaca">
      <Align alignment={Alignment.topLeft}>
        <Text>Start</Text>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-start`).

---

### center

Dead center on both axes.

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
  <ThemeProvider theme={{}}>
    <Container height={120} backgroundColor="#bbf7d0">
      <Align alignment={Alignment.center}>
        <Text>Center</Text>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-center-grid`).

---

### end

Bottom-end anchor — content hugs the end corner.

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
  <ThemeProvider theme={{}}>
    <Container height={120} backgroundColor="#bfdbfe">
      <Align alignment={Alignment.bottomRight}>
        <Text>End</Text>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-end`).

---

### Custom alignment

Mid-edge placement and fractional sizing with **`widthFactor`**.

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
  <ThemeProvider theme={{}}>
    <Container height={160} backgroundColor="#e2e8f0">
      <Align alignment={Alignment.bottomCenter} widthFactor={0.6}>
        <Container padding={12} backgroundColor="#ffffff" borderRadius={8}>
          <Text>Bottom-center bar at 60% width</Text>
        </Container>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-custom`).

**Visual difference:** Corners pin to two edges; center values pin to one axis midpoint; `widthFactor` / `heightFactor` shrink the align region relative to the parent.

---

## Composition

Combine `Align` with typography, actions, surfaces, and cards.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Align,
  Alignment,
  Button,
  ButtonVariant,
  Card,
  Container,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Card padding={0} style={{ width: 280 }}>
      <Stack>
        <Container height={160} backgroundColor="#818cf8" />
        <Align alignment={Alignment.topLeft}>
          <Container padding={8} margin={8} backgroundColor="#ffffff" borderRadius={4}>
            <Text>Sale</Text>
          </Container>
        </Align>
        <Align alignment={Alignment.bottomCenter}>
          <Container padding={12} backgroundColor="rgba(0,0,0,0.45)">
            <Text color="#ffffff">Featured product</Text>
          </Container>
        </Align>
        <Align alignment={Alignment.topRight}>
          <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
            ⋮
          </Button>
        </Align>
      </Stack>
    </Card>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-composition`).

**Patterns:**

- **`Text`** — captions and badges at grid anchors
- **`Button`** — corner actions; pair with bounded parent height
- **`Container`** — scrims and chip backgrounds inside `Align`
- **`Card`** — wrap a **`Stack`** for layered overlays on a card surface
- **Multiple anchors** — use **`Stack`** so several **`Align`** siblings share one canvas

---

## Layout Behavior

### Parent constraints

`Align` expands to fill its parent's available box. Without a bounded parent, alignment has no visible effect.

### Child sizing

The child keeps **intrinsic size** unless `widthFactor` / `heightFactor` constrain the align region.

### Alignment space

The full parent region is the alignment canvas — the child is placed at the chosen anchor within that canvas.

### Align inside Container

Sized container provides height for vertical alignment.

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
  <ThemeProvider theme={{}}>
    <Container width={280} height={120} backgroundColor="#f8fafc" borderRadius={8}>
      <Align alignment={Alignment.centerRight}>
        <Text>Center-right</Text>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-in-container`).

---

### Align inside Column

Use **`Expanded`** so `Align` receives vertical space.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Align,
  Alignment,
  Column,
  Container,
  Expanded,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column style={{ height: 200 }}>
      <Text>Header</Text>
      <Expanded>
        <Container height="100%" backgroundColor="#f1f5f9">
          <Align alignment={Alignment.center}>
            <Text>Centered in remaining space</Text>
          </Align>
        </Container>
      </Expanded>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-in-column`).

---

### Align inside Row

Use **`Expanded`** so `Align` receives horizontal space.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Align,
  Alignment,
  Container,
  Expanded,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row style={{ height: 80 }}>
      <Text>Label</Text>
      <Expanded>
        <Container height="100%" backgroundColor="#e2e8f0">
          <Align alignment={Alignment.centerRight}>
            <Text>Value</Text>
          </Align>
        </Container>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-in-row`).

---

### Align inside Stack

Grid-aligned overlay without pixel offsets.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Align,
  Alignment,
  Container,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack>
      <Container width={280} height={160} backgroundColor="#334155" />
      <Align alignment={Alignment.topRight}>
        <Container padding={8} backgroundColor="rgba(255,255,255,0.9)" borderRadius={4}>
          <Text>New</Text>
        </Container>
      </Align>
      <Align alignment={Alignment.bottomCenter}>
        <Container padding={8} backgroundColor="rgba(0,0,0,0.5)">
          <Text color="#ffffff">Caption</Text>
        </Container>
      </Align>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-in-stack`).

---

## Align vs Center

### Center

Minimal API for dead-center placement.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Center, Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container height={140} backgroundColor="#f8fafc">
      <Center>
        <Text>Center widget</Text>
      </Center>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-vs-center-center`).

---

### Align(center)

Same visual result with explicit alignment.

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
  <ThemeProvider theme={{}}>
    <Container height={140} backgroundColor="#f8fafc">
      <Align alignment={Alignment.center}>
        <Text>Align center</Text>
      </Align>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-vs-center-align`).

| Topic | **`Center`** | **`Align`** |
| --- | --- | --- |
| API | No props | `alignment`, `widthFactor`, `heightFactor` |
| Centering | Built-in | `alignment={Alignment.center}` |
| Other grid positions | Not supported | All nine `Alignment` values |
| When to prefer | Design says "center this" | Any non-center anchor or fractional factors |

---

## Align vs Positioned

### Align

Relative grid placement inside available space.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Align,
  Alignment,
  Container,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack>
      <Container width={260} height={140} backgroundColor="#e2e8f0" />
      <Align alignment={Alignment.bottomRight}>
        <Container padding={8} backgroundColor="#ffffff">
          <Text>Grid-aligned</Text>
        </Container>
      </Align>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-vs-positioned-align`).

---

### Positioned

Absolute pixel offsets from stack edges.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Positioned,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack>
      <Container width={260} height={140} backgroundColor="#e2e8f0" />
      <Positioned bottom={12} right={12}>
        <Container padding={8} backgroundColor="#ffffff">
          <Text>12px from edges</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: align-vs-positioned-positioned`).

| Topic | **`Align`** | **`Positioned`** |
| --- | --- | --- |
| Placement | Grid anchor | `top` / `right` / `bottom` / `left` offsets |
| Context | Any bounded parent | **`Stack`** (absolute placement) |
| Stretch bars | `widthFactor` or nested `Container` | `left` + `right` or all four edges |
| When to prefer | Corner/center grid anchors | Exact pixel insets, full-bleed bars |

---

## Best Practices

### Use Align for semantic positioning

Express intent with **`Alignment`** instead of manual margins:

```tsx
<Container height={160} backgroundColor="#f8fafc">
  <Align alignment={Alignment.bottomRight}>
    <Button type="button">Action</Button>
  </Align>
</Container>
```

### Prefer Align over magic margins

Avoid pushing content with arbitrary `margin` when a grid anchor communicates the design:

```tsx
import { Align, Alignment, Container, Text } from "qwik-flutter-ui";

<Container height={120}>
  <Align alignment={Alignment.topLeft}>
    <Text>Badge</Text>
  </Align>
</Container>
```

Use **`margin`** on `Container` for spacing **between** flow siblings, not for overlay placement.

### Keep alignment predictable

Pick one anchor per overlay region. For multiple overlays at different corners inside a **`Stack`**, use separate **`Align`** siblings with distinct `alignment` values.

---

## Anti-Patterns

### Replacing layout systems with Align

**Source** (avoid)

```tsx
<Container height={300}>
  <Align alignment={Alignment.topLeft}><Text>Header</Text></Align>
  <Align alignment={Alignment.centerLeft}><Text>Body</Text></Align>
  <Align alignment={Alignment.bottomLeft}><Text>Footer</Text></Align>
</Container>
```

**Preferred**

```tsx
import { Column, Container, Text } from "qwik-flutter-ui";

<Column gap={8}>
  <Text>Header</Text>
  <Text>Body</Text>
  <Text>Footer</Text>
</Column>
```

**Why:** Sequential content belongs in **`Column`**, not simulated with stacked align widgets.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: align-anti-layout`, `preview: false`).

---

### Excessive nesting

**Source** (avoid)

```tsx
<Container height={200}>
  <Align alignment={Alignment.center}>
    <Align alignment={Alignment.center}>
      <Align alignment={Alignment.center}>
        <Text>Nested</Text>
      </Align>
    </Align>
  </Align>
</Container>
```

**Preferred**

```tsx
import { Align, Alignment, Container, Text } from "qwik-flutter-ui";

<Container height={200}>
  <Align alignment={Alignment.center}>
    <Text>Single Align</Text>
  </Align>
</Container>
```

**Why:** One `Align` per placement goal is enough.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: align-anti-nesting`, `preview: false`).

---

### Using Align when Center is sufficient

**Source** (avoid)

```tsx
<Align alignment={Alignment.center}>
  <Text>Only centering needed</Text>
</Align>
```

**Preferred**

```tsx
import { Center, Text } from "qwik-flutter-ui";

<Center>
  <Text>Only centering needed</Text>
</Center>
```

**Why:** **`Center`** communicates intent with less API surface when no other grid position is required.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: align-anti-center`, `preview: false`).

---

## Accessibility

### Semantic neutrality

`Align` renders a **non-semantic `<div>`** wrapper. It does not define landmarks or headings.

### Reading order

DOM order is unchanged — the child is read in its document position. **`Align`** does not reorder content for assistive technology.

### Focus order

Keyboard focus follows DOM order, not visual grid position. Interactive children inside **`Align`** remain focusable in DOM sequence.

Do not use **`Align`** to move content off-screen; use **`Visibility`** or conditional rendering instead.

---

## SSR

### Static rendering

`Align` renders a `<div>` with alignment classes on the server. Placement is complete in initial HTML when the parent supplies bounded constraints.

### Resumability compatibility

`Align` is stateless — no event handlers on the layout wrapper. Interactive children resume independently on the client.

---

## Flutter Equivalent

| Topic | Flutter `Align` | qwik-flutter-ui `Align` |
| --- | --- | --- |
| Purpose | Grid-aligned child placement | Same |
| `alignment` | `Alignment` enum | Same (`topLeft` = `topStart`) |
| `widthFactor` / `heightFactor` | Supported | Supported |
| vs `Center` | `Center` == `Align(center)` | Same |
| vs `Positioned` | Relative grid vs absolute offsets | Same |

**Flutter**

```dart
Align(
  alignment: Alignment.bottomRight,
  child: ElevatedButton(onPressed: () {}, child: Text('Action')),
)
```

**qwik-flutter-ui**

```tsx
<Container height={180}>
  <Align alignment={Alignment.bottomRight}>
    <Button type="button">Action</Button>
  </Align>
</Container>
```

**Similarities:** Same nine-point grid, same factor props, same relationship to `Center` and `Positioned`.

**Differences:** Renders HTML `<div>`. Enum uses **`topLeft`** / **`bottomRight`** naming (maps to Flutter `topStart` / `bottomEnd`). Parent must provide bounded constraints for alignment to be visible.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Center](/docs/widgets/layout/center) | Sugar for `Align` with `Alignment.center`. |
| [Positioned](/docs/widgets/layout/positioned) | Absolute offsets inside `Stack`. |
| [Stack](/docs/widgets/layout/stack) | Layered parent for grid-aligned overlays. |
| [Container](/docs/widgets/layout/container) | Sized decorated box with optional `alignment` prop. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Align
description: Positions a child on the nine-point alignment grid within the parent's available space — without absolute offsets.
widget: Align
category: layout
flutterEquivalent: Align
status: shipped
related:
  - Center
  - Positioned
  - Stack
  - Container
since: "0.0.1"
examples:
  - id: align-basic
    file: examples/align/basic.tsx
    category: basic
  - id: align-top-start
    file: examples/align/top-start.tsx
    category: common
  - id: align-top-end
    file: examples/align/top-end.tsx
    category: common
  - id: align-bottom-start
    file: examples/align/bottom-start.tsx
    category: common
  - id: align-bottom-end
    file: examples/align/bottom-end.tsx
    category: common
  - id: align-center
    file: examples/align/center.tsx
    category: common
  - id: align-start
    file: examples/align/start.tsx
    category: variation
  - id: align-center-grid
    file: examples/align/center-grid.tsx
    category: variation
  - id: align-end
    file: examples/align/end.tsx
    category: variation
  - id: align-custom
    file: examples/align/custom.tsx
    category: variation
  - id: align-composition
    file: examples/align/composition.tsx
    category: composition
  - id: align-in-container
    file: examples/align/in-container.tsx
    category: common
  - id: align-in-column
    file: examples/align/in-column.tsx
    category: common
  - id: align-in-row
    file: examples/align/in-row.tsx
    category: common
  - id: align-in-stack
    file: examples/align/in-stack.tsx
    category: common
  - id: align-vs-center-center
    file: examples/align/vs-center-center.tsx
    category: common
  - id: align-vs-center-align
    file: examples/align/vs-center-align.tsx
    category: common
  - id: align-vs-positioned-align
    file: examples/align/vs-positioned-align.tsx
    category: common
  - id: align-vs-positioned-positioned
    file: examples/align/vs-positioned-positioned.tsx
    category: common
  - id: align-anti-layout
    file: examples/align/anti-layout.tsx
    category: anti-pattern
  - id: align-anti-nesting
    file: examples/align/anti-nesting.tsx
    category: anti-pattern
  - id: align-anti-center
    file: examples/align/anti-center.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/align/` when the docs site is implemented.
