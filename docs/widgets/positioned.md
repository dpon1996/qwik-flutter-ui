---
title: Positioned
description: Absolute placement of a child inside a Stack using top, right, bottom, left, width, and height offsets.
widget: Positioned
category: layout
flutterEquivalent: Positioned
status: shipped
related:
  - Stack
  - Align
  - Container
  - SizedBox
since: "0.0.1"
examples:
  - id: positioned-basic
    file: examples/positioned/basic.tsx
    category: basic
  - id: positioned-corner-badge
    file: examples/positioned/corner-badge.tsx
    category: common
  - id: positioned-fab
    file: examples/positioned/fab.tsx
    category: common
  - id: positioned-status-indicator
    file: examples/positioned/status-indicator.tsx
    category: common
  - id: positioned-hero-overlay
    file: examples/positioned/hero-overlay.tsx
    category: common
  - id: positioned-top
    file: examples/positioned/top.tsx
    category: variation
  - id: positioned-bottom
    file: examples/positioned/bottom.tsx
    category: variation
  - id: positioned-left
    file: examples/positioned/left.tsx
    category: variation
  - id: positioned-right
    file: examples/positioned/right.tsx
    category: variation
  - id: positioned-combined
    file: examples/positioned/combined.tsx
    category: variation
  - id: positioned-fixed-size
    file: examples/positioned/fixed-size.tsx
    category: variation
  - id: positioned-stretch-horizontal
    file: examples/positioned/stretch-horizontal.tsx
    category: variation
  - id: positioned-stretch-vertical
    file: examples/positioned/stretch-vertical.tsx
    category: variation
  - id: positioned-fill
    file: examples/positioned/fill.tsx
    category: variation
  - id: positioned-composition
    file: examples/positioned/composition.tsx
    category: composition
  - id: positioned-vs-align-align
    file: examples/positioned/vs-align-align.tsx
    category: common
  - id: positioned-vs-align-positioned
    file: examples/positioned/vs-align-positioned.tsx
    category: common
  - id: positioned-multiple
    file: examples/positioned/multiple.tsx
    category: common
  - id: positioned-layer-priority
    file: examples/positioned/layer-priority.tsx
    category: common
  - id: positioned-anti-excessive
    file: examples/positioned/anti-excessive.tsx
    category: anti-pattern
  - id: positioned-anti-layout
    file: examples/positioned/anti-layout.tsx
    category: anti-pattern
  - id: positioned-anti-deep
    file: examples/positioned/anti-deep.tsx
    category: anti-pattern
---

# Positioned

## Overview

`Positioned` places its **single child** at explicit offsets inside a **`Stack`**. It maps to Flutter's [`Positioned`](https://api.flutter.dev/flutter/widgets/Positioned-class.html).

Use `Positioned` when overlays need **pixel-precise placement** — corner badges, floating action buttons, status dots, and full-width banner bars pinned to stack edges.

### Absolute placement model

| Concept | Behavior |
| --- | --- |
| **Precise placement** | Offsets via `top`, `right`, `bottom`, `left` |
| **Stack integration** | Meaningful inside a **`Stack`** parent (positioning context) |
| **Offset positioning** | Combine edges to stretch or fill between constraints |

**Important:** `Positioned` must be a **direct child of `Stack`** (or nested inside other stack children that remain within the stack's bounds). It is not a general-purpose page layout tool.

### Positioned vs Align vs Padding vs Margin

| Tool | Scope | Use when |
| --- | --- | --- |
| **`Positioned`** | Absolute offsets inside **`Stack`** | Corner badges, FABs, edge-pinned bars |
| **`Align`** | Relative alignment in available space | Grid-aligned overlay without pixel offsets |
| **`padding`** on `Container` | Inner inset from a box edge | Spacing **inside** a surface |
| **`margin`** on `Container` | Outer offset from siblings | Spacing **between** flow-layout siblings |

`Padding` and `margin` participate in normal document flow. **`Positioned`** removes the child from flow and pins it within the stack.

---

## Import

```tsx
import { Positioned } from "qwik-flutter-ui";
```

Import layout widgets when examples use them:

```tsx
import {
  Container,
  Positioned,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

A badge pinned to the top-start corner of a stack.

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
      <Container width={240} height={120} backgroundColor="#e2e8f0" />
      <Positioned top={8} left={8}>
        <Container padding={4} backgroundColor="#ffffff" borderRadius={4}>
          <Text>Badge</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-basic`).

---

## Common Usage

### Corner Badge

Promotional label on a product card.

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
      <Container width={200} height={140} backgroundColor="#f1f5f9" borderRadius={8} />
      <Positioned top={8} right={8}>
        <Container padding={{ x: 8, y: 4 }} backgroundColor="#ef4444" borderRadius={4}>
          <Text color="#ffffff">SALE</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-corner-badge`).

---

### Floating Action Button

Primary action pinned to the bottom-end of a content area.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Container,
  Positioned,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack>
      <Container width="100%" height={200} backgroundColor="#f8fafc" borderRadius={8}>
        <Text>Content</Text>
      </Container>
      <Positioned bottom={16} right={16}>
        <Button type="button" onClick$={$(() => {})}>
          Add
        </Button>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-fab`).

---

### Status Indicator

Online dot on a circular avatar.

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
      <Container
        width={48}
        height={48}
        backgroundColor="#cbd5e1"
        borderRadius={24}
      >
        <Text>JD</Text>
      </Container>
      <Positioned bottom={0} right={0}>
        <Container
          width={12}
          height={12}
          backgroundColor="#22c55e"
          borderRadius={6}
        />
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-status-indicator`).

---

### Hero Banner Overlay

Full-width caption bar pinned to the bottom.

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
      <Container width={320} height={180} backgroundColor="#334155" />
      <Positioned bottom={0} left={0} right={0}>
        <Container padding={16} backgroundColor="rgba(0,0,0,0.55)">
          <Text color="#ffffff">Explore the collection</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-hero-overlay`).

---

## Position Properties

Each edge prop accepts a **`Length`** (number in px or a CSS string like `"1rem"`).

### top

Pin content below the top edge.

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
      <Container width={240} height={120} backgroundColor="#dbeafe" />
      <Positioned top={12}>
        <Container padding={8} backgroundColor="#ffffff">
          <Text>12px from top</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-top`).

---

### bottom

Pin content above the bottom edge.

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
      <Container width={240} height={120} backgroundColor="#dbeafe" />
      <Positioned bottom={12}>
        <Container padding={8} backgroundColor="#ffffff">
          <Text>12px from bottom</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-bottom`).

---

### left

Pin content from the start edge.

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
      <Container width={240} height={120} backgroundColor="#dbeafe" />
      <Positioned left={12}>
        <Container padding={8} backgroundColor="#ffffff">
          <Text>12px from left</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-left`).

---

### right

Pin content from the end edge.

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
      <Container width={240} height={120} backgroundColor="#dbeafe" />
      <Positioned right={12}>
        <Container padding={8} backgroundColor="#ffffff">
          <Text>12px from right</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-right`).

---

### Combined positioning

Corner placement with two offsets.

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
      <Container width={240} height={120} backgroundColor="#dbeafe" />
      <Positioned top={8} right={8}>
        <Container padding={8} backgroundColor="#fef3c7" borderRadius={4}>
          <Text>Top-right</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-combined`).

**Visual difference:** `top` / `bottom` control vertical offset; `left` / `right` control horizontal offset. Combine pairs for corners and triples/quad for stretch sizing.

---

## Sizing

`width` and `height` set explicit dimensions. Omitting one axis lets opposing edge constraints define size.

### Fixed Size

Explicit width and height on the positioned child.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Positioned,
  Stack,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack>
      <Container width={280} height={160} backgroundColor="#f1f5f9" />
      <Positioned top={16} left={16} width={80} height={40}>
        <Container width="100%" height="100%" backgroundColor="#6366f1" borderRadius={4} />
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-fixed-size`).

---

### Stretch Horizontally

`left` + `right` pins both horizontal edges — width fills the gap.

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
      <Container width={280} height={120} backgroundColor="#e0e7ff" />
      <Positioned left={16} right={16} bottom={12}>
        <Container padding={8} backgroundColor="#ffffff">
          <Text>Stretches between left and right</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-stretch-horizontal`).

---

### Stretch Vertically

`top` + `bottom` pins both vertical edges — height fills the gap.

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
      <Container width={200} height={180} backgroundColor="#e0e7ff" />
      <Positioned top={12} bottom={12} left={12}>
        <Container padding={8} backgroundColor="#ffffff">
          <Text>Stretches top to bottom</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-stretch-vertical`).

---

### Fill Available Space

All four edges at `0` — overlay covers the entire stack (Flutter `Positioned.fill` equivalent).

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
      <Container width={280} height={160} backgroundColor="#818cf8" />
      <Positioned top={0} right={0} bottom={0} left={0}>
        <Container
          width="100%"
          height="100%"
          backgroundColor="rgba(0,0,0,0.4)"
        >
          <Text color="#ffffff">Full-stack overlay</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-fill`).

**Positioning constraints:** `top` + `bottom` defines height; `left` + `right` defines width. Avoid conflicting `width` with both `left` and `right` unless intentional.

---

## Composition

Combine `Positioned` with typography, surfaces, actions, and avatar-style containers.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Container,
  Positioned,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack>
      <Container width={300} height={180} backgroundColor="#f8fafc" borderRadius={8} />
      <Positioned top={12} left={12}>
        <Container
          width={40}
          height={40}
          backgroundColor="#cbd5e1"
          borderRadius={20}
        >
          <Text>AM</Text>
        </Container>
      </Positioned>
      <Positioned top={12} right={12}>
        <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
          ⋮
        </Button>
      </Positioned>
      <Positioned bottom={12} left={12} right={12}>
        <Container padding={8} backgroundColor="rgba(255,255,255,0.95)" borderRadius={4}>
          <Text>Card title</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-composition`).

**Patterns:**

- **`Container`** — badges, scrims, avatar circles
- **`Text`** — labels on overlays; set `color` on dark scrims
- **`Button`** — FABs and icon actions at stack edges
- Avatar-style circles — sized `Container` with `borderRadius`, not a separate widget

---

## Positioned vs Align

### Align

Grid-aligned placement without pixel offsets — useful when **`Stack` `alignment`** is not enough per child.

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
      <Container width={240} height={120} backgroundColor="#e2e8f0" />
      <Align alignment={Alignment.bottomCenter}>
        <Container padding={8} backgroundColor="#ffffff">
          <Text>Grid-aligned caption</Text>
        </Container>
      </Align>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-vs-align-align`).

---

### Positioned

Pixel offsets and edge pinning.

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
      <Container width={240} height={120} backgroundColor="#e2e8f0" />
      <Positioned bottom={8} right={8}>
        <Container padding={8} backgroundColor="#ffffff">
          <Text>8px from bottom-right</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-vs-align-positioned`).

| Prefer **`Align`** | Prefer **`Positioned`** |
| --- | --- |
| Centered or grid-aligned overlays | Exact pixel offsets (8px, 16px) |
| One overlay per alignment anchor | Multiple overlays at different corners |
| Fractional sizing via `widthFactor` | Full-width bars (`left` + `right`) |
| Simple captions with `Stack alignment` | FABs, status dots, edge-pinned chrome |

---

## Layout Behavior

### Stack ownership

`Positioned` is designed for use inside **`Stack`**. The stack provides the positioning context and bounds for absolute placement.

### Positioning context

Offsets are relative to the **`Stack`** edges. Give the stack a sized base layer so positioned children have predictable bounds.

### Paint order

Later stack children paint above earlier ones. **`Positioned`** siblings follow the same rule — reorder DOM nodes to change overlay priority.

### Multiple Positioned Widgets

Several positioned overlays on one surface.

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
      <Container width={300} height={180} backgroundColor="#f1f5f9" />
      <Positioned top={8} left={8}>
        <Container padding={4} backgroundColor="#fef3c7" borderRadius={4}>
          <Text>Draft</Text>
        </Container>
      </Positioned>
      <Positioned top={8} right={8}>
        <Container padding={4} backgroundColor="#dbeafe" borderRadius={4}>
          <Text>v3</Text>
        </Container>
      </Positioned>
      <Positioned bottom={8} left={8} right={8}>
        <Container padding={8} backgroundColor="rgba(0,0,0,0.5)">
          <Text color="#ffffff">Footer bar</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-multiple`).

---

### Layer Priority

Move a overlay later in the stack to raise its paint priority.

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
      <Container width={260} height={140} backgroundColor="#cbd5e1" />
      <Positioned top={40} left={40}>
        <Container padding={12} backgroundColor="#fca5a5">
          <Text>Back layer</Text>
        </Container>
      </Positioned>
      <Positioned top={24} left={24}>
        <Container padding={12} backgroundColor="#ffffff">
          <Text>Front layer (later sibling)</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: positioned-layer-priority`).

**Visual result:** The second `Positioned` block appears on top even though both overlap.

---

## Best Practices

### Use Positioned only inside Stack

Always wrap positioned overlays in a **`Stack`** with a sized base layer:

```tsx
import { Container, Positioned, Stack, Text } from "qwik-flutter-ui";

<Stack>
  <Container width={280} height={160} backgroundColor="#f8fafc" />
  <Positioned top={8} right={8}>
    <Text>Badge</Text>
  </Positioned>
</Stack>
```

### Keep offsets predictable

Use a consistent spacing scale (8, 12, 16) across badges and FABs:

```tsx
<Positioned bottom={16} right={16}>
  <Button type="button">Add</Button>
</Positioned>
```

### Avoid magic values

Name intent in surrounding structure rather than scattering unexplained offsets. Group related overlays and document edge insets in design tokens or shared constants in app code.

Prefer **`left={0} right={0}`** for full-width bars instead of guessing pixel widths.

---

## Anti-Patterns

### Excessive absolute positioning

**Source** (avoid)

```tsx
<Stack>
  <Container width={300} height={200} backgroundColor="#f8fafc" />
  <Positioned top={10} left={10}><Text>A</Text></Positioned>
  <Positioned top={30} left={40}><Text>B</Text></Positioned>
  <Positioned top={55} left={20}><Text>C</Text></Positioned>
  <Positioned top={80} left={60}><Text>D</Text></Positioned>
</Stack>
```

**Preferred**

```tsx
import { Column, Container, Stack, Text } from "qwik-flutter-ui";

<Stack>
  <Container width={300} height={200} backgroundColor="#f8fafc" />
  <Positioned bottom={16} left={16} right={16}>
    <Column gap={8}>
      <Text>Structured overlay content</Text>
    </Column>
  </Positioned>
</Stack>
```

**Why:** Many arbitrary offsets are hard to maintain. Use **`Column`** / **`Row`** inside one positioned region for internal layout.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: positioned-anti-excessive`, `preview: false`).

---

### Replacing layout systems with Positioned

**Source** (avoid)

```tsx
<Stack>
  <Container width={400} height={300} />
  <Positioned top={0} left={0}><Text>Header</Text></Positioned>
  <Positioned top={40} left={0}><Text>Body</Text></Positioned>
  <Positioned bottom={0} left={0}><Text>Footer</Text></Positioned>
</Stack>
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

**Why:** Page structure belongs in **`Column`** / **`Row`**, not simulated with absolute coordinates.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: positioned-anti-layout`, `preview: false`).

---

### Deep overlay hierarchies

**Source** (avoid)

```tsx
<Stack>
  <Container width={300} height={200} backgroundColor="#eee" />
  <Positioned top={0} left={0} right={0} bottom={0}>
    <Stack>
      <Positioned top={0} left={0} right={0} bottom={0}>
        <Stack>
          <Positioned top={8} left={8}>
            <Text>Deep</Text>
          </Positioned>
        </Stack>
      </Positioned>
    </Stack>
  </Positioned>
</Stack>
```

**Preferred**

```tsx
import { Container, Positioned, Stack, Text } from "qwik-flutter-ui";

<Stack>
  <Container width={300} height={200} backgroundColor="#eee" />
  <Positioned top={8} left={8}>
    <Text>Flat overlay</Text>
  </Positioned>
</Stack>
```

**Why:** Nested stacks with full-bleed positioned wrappers obscure which layer owns bounds. Flatten to one stack with ordered siblings.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: positioned-anti-deep`, `preview: false`).

---

## Accessibility

### Reading order

Screen readers follow **DOM order**, not visual position. Place primary overlay content in a logical sequence — base layer first, then supplementary overlays.

### DOM order

A visually top-right badge that appears "first" to sighted users may still be read **after** the base layer in DOM order. Put essential information in the base layer or early in the stack when it must be announced first.

### Focus order

Keyboard focus follows DOM order. **`Button`** and links inside **`Positioned`** overlays remain focusable — ensure they appear **after** non-interactive base content in the DOM when they are secondary actions, or manage focus explicitly for modal overlays.

**Visual position vs document structure:** A FAB at the bottom-right is still the last focusable item if it is the last child — which is usually acceptable for supplementary actions.

---

## SSR

### Static rendering

`Positioned` renders a `<div>` with absolute-position inline styles on the server. Placement is complete in initial HTML when the parent **`Stack`** supplies bounds.

### Resumability compatibility

`Positioned` is stateless — no layout wrapper hooks. Interactive children (`Button`) resume independently on the client.

---

## Flutter Equivalent

| Topic | Flutter `Positioned` | qwik-flutter-ui `Positioned` |
| --- | --- | --- |
| Purpose | Absolute child in `Stack` | Same |
| Edges | `top`, `right`, `bottom`, `left` | Same |
| Size | `width`, `height` | Same |
| Fill | `Positioned.fill` constructor | `top={0} right={0} bottom={0} left={0}` |
| Parent | Must be inside `Stack` | Same |

**Flutter**

```dart
Stack(
  children: [
    Container(width: 400, height: 300, color: Color(0xFFEEF)),
    Positioned(
      top: 8,
      left: 8,
      child: Text('Badge'),
    ),
    Positioned(
      bottom: 0,
      left: 0,
      right: 0,
      child: Container(
        padding: EdgeInsets.all(12),
        color: Colors.black54,
        child: Text('Footer'),
      ),
    ),
  ],
)
```

**qwik-flutter-ui**

```tsx
<Stack>
  <Container width={400} height={300} backgroundColor="#eef" />
  <Positioned top={8} left={8}>
    <Text>Badge</Text>
  </Positioned>
  <Positioned bottom={0} left={0} right={0}>
    <Container padding={12} backgroundColor="rgba(0,0,0,0.55)">
      <Text color="#ffffff">Footer</Text>
    </Container>
  </Positioned>
</Stack>
```

**Similarities:** Same edge and size props, same stack integration, same stretch-via-opposing-edges pattern.

**Differences:** Renders HTML `<div>`. No `Positioned.fill` shorthand — set all four edges to `0`. No `Positioned.directional` — use explicit edges. Length values accept numbers (px) or CSS strings.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Stack](/docs/widgets/layout/stack) | Required parent for absolute placement context. |
| [Align](/docs/widgets/layout/align) | Grid alignment alternative without pixel offsets. |
| [Container](/docs/widgets/layout/container) | Sized base layers, badges, scrims, padding/margin in flow layout. |
| [SizedBox](/docs/widgets/layout/sized-box) | Fixed-size gaps in flow layout — not absolute placement. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Positioned
description: Absolute placement of a child inside a Stack using top, right, bottom, left, width, and height offsets.
widget: Positioned
category: layout
flutterEquivalent: Positioned
status: shipped
related:
  - Stack
  - Align
  - Container
  - SizedBox
since: "0.0.1"
examples:
  - id: positioned-basic
    file: examples/positioned/basic.tsx
    category: basic
  - id: positioned-corner-badge
    file: examples/positioned/corner-badge.tsx
    category: common
  - id: positioned-fab
    file: examples/positioned/fab.tsx
    category: common
  - id: positioned-status-indicator
    file: examples/positioned/status-indicator.tsx
    category: common
  - id: positioned-hero-overlay
    file: examples/positioned/hero-overlay.tsx
    category: common
  - id: positioned-top
    file: examples/positioned/top.tsx
    category: variation
  - id: positioned-bottom
    file: examples/positioned/bottom.tsx
    category: variation
  - id: positioned-left
    file: examples/positioned/left.tsx
    category: variation
  - id: positioned-right
    file: examples/positioned/right.tsx
    category: variation
  - id: positioned-combined
    file: examples/positioned/combined.tsx
    category: variation
  - id: positioned-fixed-size
    file: examples/positioned/fixed-size.tsx
    category: variation
  - id: positioned-stretch-horizontal
    file: examples/positioned/stretch-horizontal.tsx
    category: variation
  - id: positioned-stretch-vertical
    file: examples/positioned/stretch-vertical.tsx
    category: variation
  - id: positioned-fill
    file: examples/positioned/fill.tsx
    category: variation
  - id: positioned-composition
    file: examples/positioned/composition.tsx
    category: composition
  - id: positioned-vs-align-align
    file: examples/positioned/vs-align-align.tsx
    category: common
  - id: positioned-vs-align-positioned
    file: examples/positioned/vs-align-positioned.tsx
    category: common
  - id: positioned-multiple
    file: examples/positioned/multiple.tsx
    category: common
  - id: positioned-layer-priority
    file: examples/positioned/layer-priority.tsx
    category: common
  - id: positioned-anti-excessive
    file: examples/positioned/anti-excessive.tsx
    category: anti-pattern
  - id: positioned-anti-layout
    file: examples/positioned/anti-layout.tsx
    category: anti-pattern
  - id: positioned-anti-deep
    file: examples/positioned/anti-deep.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/positioned/` when the docs site is implemented.
