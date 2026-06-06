---
title: Stack
description: Layered layout that paints children on top of each other — the foundation for overlays, badges, and Positioned placement.
widget: Stack
category: layout
flutterEquivalent: Stack
status: shipped
related:
  - Positioned
  - Align
  - Container
  - Row
  - Column
since: "0.0.1"
examples:
  - id: stack-basic
    file: examples/stack/basic.tsx
    category: basic
  - id: stack-image-overlay
    file: examples/stack/image-overlay.tsx
    category: common
  - id: stack-floating-badge
    file: examples/stack/floating-badge.tsx
    category: common
  - id: stack-avatar-status
    file: examples/stack/avatar-status.tsx
    category: common
  - id: stack-hero-banner
    file: examples/stack/hero-banner.tsx
    category: common
  - id: stack-two-layers
    file: examples/stack/two-layers.tsx
    category: variation
  - id: stack-three-layers
    file: examples/stack/three-layers.tsx
    category: variation
  - id: stack-multiple-overlays
    file: examples/stack/multiple-overlays.tsx
    category: variation
  - id: stack-align-top-left
    file: examples/stack/align-top-left.tsx
    category: variation
  - id: stack-align-center
    file: examples/stack/align-center.tsx
    category: variation
  - id: stack-align-bottom-right
    file: examples/stack/align-bottom-right.tsx
    category: variation
  - id: stack-align-custom
    file: examples/stack/align-custom.tsx
    category: variation
  - id: stack-composition
    file: examples/stack/composition.tsx
    category: composition
  - id: stack-banner-overlay
    file: examples/stack/banner-overlay.tsx
    category: common
  - id: stack-card-overlay
    file: examples/stack/card-overlay.tsx
    category: common
  - id: stack-floating-actions
    file: examples/stack/floating-actions.tsx
    category: common
  - id: stack-only
    file: examples/stack/stack-only.tsx
    category: common
  - id: stack-with-positioned
    file: examples/stack/with-positioned.tsx
    category: common
  - id: stack-anti-nesting
    file: examples/stack/anti-nesting.tsx
    category: anti-pattern
  - id: stack-anti-layout
    file: examples/stack/anti-layout.tsx
    category: anti-pattern
  - id: stack-anti-overlap
    file: examples/stack/anti-overlap.tsx
    category: anti-pattern
---

# Stack

## Overview

`Stack` lays out children **on top of each other** in the same bounds, with later siblings painted above earlier ones. It maps to Flutter's [`Stack`](https://api.flutter.dev/flutter/widgets/Stack-class.html).

Use `Stack` for **layered UI** — image captions, badges on avatars, hero banners, and floating actions. Pair with **`Positioned`** when overlays need explicit offsets.

### Layered layout model

| Concept | Behavior |
| --- | --- |
| **Layered layouts** | All direct children occupy the same region |
| **Overlapping content** | Later children visually cover earlier ones |
| **Z-order rendering** | Paint order follows **child order** (last on top) |

Give the stack a **bounded base layer** (sized `Container`, `Image`, or explicit `width` / `height`) so overlays have a known frame.

### Stack vs Row vs Column vs Wrap

| Widget | Layout | Overlap | Use when |
| --- | --- | --- | --- |
| **`Stack`** | Layered (same cell) | Yes | Badges, banners, overlays |
| **`Row`** | Horizontal line | No | Toolbars, inline groups |
| **`Column`** | Vertical stack | No | Forms, page sections |
| **`Wrap`** | Flow with line breaks | No | Tags and chip lists |

---

## Import

```tsx
import { Stack } from "qwik-flutter-ui";
```

Import layout widgets and enums when examples use them:

```tsx
import {
  Alignment,
  Container,
  Image,
  Positioned,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

A base surface with a label aligned on top (default **`Alignment.topLeft`**).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Stack, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack>
      <Container width={240} height={120} backgroundColor="#e2e8f0" />
      <Container padding={8} backgroundColor="rgba(255,255,255,0.9)">
        <Text>Overlay label</Text>
      </Container>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-basic`).

---

## Common Usage

### Image Overlay

Caption aligned to the bottom of a photo.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Alignment,
  BoxFit,
  Container,
  Image,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack alignment={Alignment.bottomCenter}>
      <Image
        src="/hero.jpg"
        alt="Mountain landscape at sunset"
        width={320}
        height={180}
        fit={BoxFit.cover}
      />
      <Container padding={{ x: 12, y: 8 }} backgroundColor="rgba(0,0,0,0.55)">
        <Text color="#ffffff">Sunset Ridge Trail</Text>
      </Container>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-image-overlay`).

---

### Floating Badge

A corner badge on a card surface using **`Positioned`**.

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
      <Container width={200} height={120} backgroundColor="#f1f5f9" borderRadius={8} />
      <Positioned top={8} right={8}>
        <Container padding={{ x: 8, y: 4 }} backgroundColor="#ef4444" borderRadius={4}>
          <Text color="#ffffff">NEW</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-floating-badge`).

---

### Profile Avatar Status

Online indicator dot on a circular avatar.

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
        width={56}
        height={56}
        backgroundColor="#cbd5e1"
        borderRadius={28}
      >
        <Text>AM</Text>
      </Container>
      <Positioned bottom={2} right={2}>
        <Container
          width={14}
          height={14}
          backgroundColor="#22c55e"
          borderRadius={7}
        />
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-avatar-status`).

---

### Hero Banner

Title block over a full-width hero background.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Alignment,
  Container,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack alignment={Alignment.bottomLeft}>
      <Container width="100%" height={200} backgroundColor="#1e293b" />
      <Container padding={20} backgroundColor="rgba(0,0,0,0.45)">
        <Text as="h2" color="#ffffff">
          Build faster with qwik-flutter-ui
        </Text>
        <Text color="#e2e8f0">Layered layouts for web apps</Text>
      </Container>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-hero-banner`).

---

## Layering Behavior

### Child rendering order

Direct children share one layer cell. **First child = back**, **last child = front**.

### Stacking order

Non-positioned children align per **`alignment`**. **`Positioned`** children use absolute offsets inside the stack.

### Paint order

Visual z-order matches **DOM order** — the last sibling appears on top regardless of size.

### Two Layers

Base surface plus a single overlay.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Stack, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack>
      <Container width={280} height={140} backgroundColor="#dbeafe" />
      <Container padding={12} backgroundColor="rgba(255,255,255,0.85)">
        <Text>Two-layer overlay</Text>
      </Container>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-two-layers`).

---

### Three Layers

Background, scrim, and foreground text.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Alignment,
  Container,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack alignment={Alignment.center}>
      <Container width={280} height={160} backgroundColor="#6366f1" />
      <Container
        width={280}
        height={160}
        backgroundColor="rgba(0,0,0,0.35)"
      />
      <Text color="#ffffff">Three layers</Text>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-three-layers`).

**Visual result:** Indigo base → dark scrim → centered white text on top.

---

### Multiple Overlays

Several **`Positioned`** badges on one surface.

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
      <Container width={300} height={180} backgroundColor="#f8fafc" borderRadius={8} />
      <Positioned top={8} left={8}>
        <Container padding={4} backgroundColor="#fef3c7" borderRadius={4}>
          <Text>Draft</Text>
        </Container>
      </Positioned>
      <Positioned top={8} right={8}>
        <Container padding={4} backgroundColor="#dbeafe" borderRadius={4}>
          <Text>v2</Text>
        </Container>
      </Positioned>
      <Positioned bottom={8} right={8}>
        <Container padding={4} backgroundColor="#dcfce7" borderRadius={4}>
          <Text>Live</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-multiple-overlays`).

---

## Alignment

The **`alignment`** prop positions **non-positioned** children within the stack. Default is **`Alignment.topLeft`** (Flutter `Alignment.topStart`).

### topLeft

Overlays hug the top-start corner.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Alignment,
  Container,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack alignment={Alignment.topLeft}>
      <Container width={240} height={120} backgroundColor="#e2e8f0" />
      <Container padding={8} backgroundColor="#ffffff">
        <Text>Top start</Text>
      </Container>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-align-top-left`).

---

### center

Overlays center within the stack bounds.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Alignment,
  Container,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack alignment={Alignment.center}>
      <Container width={240} height={120} backgroundColor="#e2e8f0" />
      <Container padding={12} backgroundColor="#ffffff">
        <Text>Centered</Text>
      </Container>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-align-center`).

---

### bottomRight

Overlays align to the bottom-end corner (Flutter `Alignment.bottomEnd`).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Alignment,
  Container,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack alignment={Alignment.bottomRight}>
      <Container width={240} height={120} backgroundColor="#e2e8f0" />
      <Container padding={8} backgroundColor="#ffffff">
        <Text>Bottom end</Text>
      </Container>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-align-bottom-right`).

---

### Custom alignment

Use **`Align`** inside `Stack` when one overlay needs a different anchor than siblings.

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
      <Container width={280} height={160} backgroundColor="#cbd5e1" />
      <Align alignment={Alignment.bottomLeft}>
        <Container padding={8} backgroundColor="#ffffff">
          <Text>Custom bottom-left</Text>
        </Container>
      </Align>
      <Align alignment={Alignment.topRight}>
        <Container padding={8} backgroundColor="#fef3c7">
          <Text>Custom top-right</Text>
        </Container>
      </Align>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-align-custom`).

---

## Composition

Combine `Stack` with surfaces, typography, actions, and images.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  BoxFit,
  Button,
  Container,
  Image,
  Positioned,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack>
      <Image
        src="/product.jpg"
        alt="Wireless headphones on a desk"
        width={320}
        height={200}
        fit={BoxFit.cover}
      />
      <Positioned top={8} right={8}>
        <Button type="button" onClick$={$(() => {})}>
          Save
        </Button>
      </Positioned>
      <Positioned bottom={0} left={0} right={0}>
        <Container padding={12} backgroundColor="rgba(0,0,0,0.5)">
          <Text color="#ffffff">Premium headphones</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-composition`).

**Patterns:**

- **`Container`** — sized base layers, scrims, and badges
- **`Image`** — photo backgrounds with `fit={BoxFit.cover}`
- **`Text`** — captions and titles; set `color` on dark scrims
- **`Button`** — floating actions; prefer **`Positioned`** for corner placement
- **`Positioned`** — precise offsets when `alignment` is not enough

---

## Responsive Layouts

### Banner Overlay

Full-width hero with a bottom caption bar.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Alignment,
  Container,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack alignment={Alignment.bottomCenter} style={{ maxWidth: 480 }}>
      <Container width="100%" height={180} backgroundColor="#334155" />
      <Container width="100%" padding={16} backgroundColor="rgba(0,0,0,0.5)">
        <Text color="#ffffff">Responsive banner caption</Text>
      </Container>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-banner-overlay`).

---

### Card Overlay

Gradient scrim over a card for readable text on any background.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Container,
  FontWeight,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Card padding={0} style={{ width: 280 }}>
      <Stack>
        <Container height={140} backgroundColor="#818cf8" />
        <Container
          height={140}
          backgroundColor="rgba(0,0,0,0.3)"
        />
        <Container padding={16}>
          <Text color="#ffffff" fontWeight={FontWeight.bold}>
            Featured item
          </Text>
          <Text color="#f1f5f9">Overlay keeps text readable</Text>
        </Container>
      </Stack>
    </Card>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-card-overlay`).

---

### Floating Actions

A corner action button that stays pinned on resize.

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
        <Text>Content area</Text>
      </Container>
      <Positioned bottom={12} right={12}>
        <Button type="button" onClick$={$(() => {})}>
          Add
        </Button>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-floating-actions`).

**Responsive note:** Size the base layer with **`width="100%"`** or **`maxWidth`** on the stack. Use **`Positioned`** with fixed offsets for FAB-style controls.

---

## Stack vs Positioned

### Stack Only

Align overlays with **`alignment`** — no pixel offsets.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Alignment,
  Container,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Stack alignment={Alignment.bottomCenter}>
      <Container width={260} height={140} backgroundColor="#e0e7ff" />
      <Container padding={8} backgroundColor="#ffffff">
        <Text>Aligned caption</Text>
      </Container>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-only`).

**When `Stack` alone is enough:** All overlays share one **`alignment`** anchor (centered badge, bottom caption, full-width aligned bar).

---

### Stack + Positioned

Pin overlays to exact edges or stretch between constraints.

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
          <Text>Top-left badge</Text>
        </Container>
      </Positioned>
      <Positioned bottom={0} left={0} right={0}>
        <Container padding={12} backgroundColor="rgba(0,0,0,0.6)">
          <Text color="#ffffff">Full-width footer bar</Text>
        </Container>
      </Positioned>
    </Stack>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: stack-with-positioned`).

| Prefer **`Stack` + `alignment`** | Prefer **`Stack` + `Positioned`** |
| --- | --- |
| Single anchor for all overlays | Corner badges and FABs |
| Centered or edge-aligned captions | Full-width bars (`left` + `right`) |
| Simple hero text blocks | Offset dots (avatar status) |

See [Positioned](/docs/widgets/layout/positioned) for the full offset API.

---

## Best Practices

### Keep layering simple

One `Stack` per overlay surface — base layer plus one or two overlays:

```tsx
<Stack alignment={Alignment.bottomCenter}>
  <Image src="/photo.jpg" alt="Description" width={320} height={180} />
  <Container padding={8} backgroundColor="rgba(0,0,0,0.5)">
    <Text color="#ffffff">Caption</Text>
  </Container>
</Stack>
```

### Use Stack intentionally

Reach for `Stack` only when content **must overlap**. Side-by-side layout belongs in **`Row`** or **`Wrap`**.

### Avoid excessive overlap

Do not stack opaque layers that hide each other without purpose. Use a single scrim plus foreground content.

```tsx
import { Clip, Stack } from "qwik-flutter-ui";

<Stack clipBehavior={Clip.none}>
  …
</Stack>
```

Set **`clipBehavior={Clip.none}`** only when overlays should extend outside the stack bounds (default is **`Clip.hardEdge`**).

---

## Anti-Patterns

### Deeply nested Stacks

**Source** (avoid)

```tsx
<Stack>
  <Stack>
    <Stack>
      <Text>Over-nested</Text>
    </Stack>
  </Stack>
</Stack>
```

**Preferred**

```tsx
import { Container, Stack, Text } from "qwik-flutter-ui";

<Stack>
  <Container width={240} height={120} backgroundColor="#f1f5f9" />
  <Text>Single Stack with clear layers</Text>
</Stack>
```

**Why:** Each nested `Stack` adds layout complexity without benefit. Flatten to one stack with ordered children.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: stack-anti-nesting`, `preview: false`).

---

### Replacing layout structure with Stack

**Source** (avoid)

```tsx
<Stack>
  <Text>Title</Text>
  <Text>Subtitle</Text>
  <Text>Body copy that should not overlap</Text>
</Stack>
```

**Preferred**

```tsx
import { Column, Text } from "qwik-flutter-ui";

<Column gap={8}>
  <Text>Title</Text>
  <Text>Subtitle</Text>
  <Text>Body copy</Text>
</Column>
```

**Why:** Sequential reading content belongs in **`Column`**, not overlapping layers.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: stack-anti-layout`, `preview: false`).

---

### Unnecessary overlap

**Source** (avoid)

```tsx
<Stack>
  <Container width={200} height={100} backgroundColor="#fecaca" />
  <Container width={200} height={100} backgroundColor="#fca5a5" />
  <Container width={200} height={100} backgroundColor="#f87171" />
</Stack>
```

**Preferred**

```tsx
import { Column, Container } from "qwik-flutter-ui";

<Column gap={8}>
  <Container width={200} height={40} backgroundColor="#fecaca" />
  <Container width={200} height={40} backgroundColor="#fca5a5" />
</Column>
```

**Why:** Fully opaque same-size layers hide each other. Use **`Column`** when blocks should stack vertically without overlap.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: stack-anti-overlap`, `preview: false`).

---

## Accessibility

### Reading order

Screen readers traverse children in **DOM order** (first to last), not visual top-to-bottom. Put the **primary content first** in the DOM when it should be announced first — even if a later layer paints on top visually.

### Focus order

Keyboard focus follows **DOM order**, not paint order. Interactive overlays (`Button`, links) that appear visually on top should still appear **after** the base content in the DOM if they are primary actions — or use logical tab order via native focus management.

### Screen reader expectations

- Give **`Image`** layers meaningful **`alt`** text (or `decorative` when purely visual).
- Do not rely on color-only badges — include visible **`Text`** labels.
- Hidden scrim layers should not contain focusable elements unless they are interactive.

**Visual order vs DOM order:** A caption rendered as the second child may paint over an image but is still read after the image in DOM order — which is usually correct (image description, then caption).

---

## SSR

### Static rendering

`Stack` renders a `<div>` with layout classes on the server. Layer order and alignment are present in the initial HTML — no client measurement required.

### Resumability compatibility

`Stack` is stateless — no event handlers on the layout wrapper itself. Overlays with `Button` handlers resume independently on the client.

---

## Flutter Equivalent

| Topic | Flutter `Stack` | qwik-flutter-ui `Stack` |
| --- | --- | --- |
| Purpose | Layered children | Same |
| `alignment` | Default `Alignment.topStart` | Default `Alignment.topLeft` |
| `clipBehavior` | Default clip | Default `Clip.hardEdge` |
| Positioned children | `Positioned` widget | Same |
| Sizing | `StackFit` enum | Base layer sets bounds explicitly |

**Flutter**

```dart
Stack(
  alignment: Alignment.bottomCenter,
  children: [
    Image.asset('hero.jpg'),
    Container(
      color: Colors.black54,
      child: Text('Caption', style: TextStyle(color: Colors.white)),
    ),
  ],
)
```

**qwik-flutter-ui**

```tsx
<Stack alignment={Alignment.bottomCenter}>
  <Image src="/hero.jpg" alt="Hero" width={320} height={180} />
  <Container padding={8} backgroundColor="rgba(0,0,0,0.55)">
    <Text color="#ffffff">Caption</Text>
  </Container>
</Stack>
```

**Similarities:** Same layering model, `alignment` for non-positioned children, `Positioned` for offsets, clips by default.

**Differences:** Renders HTML `<div>`. Alignment enum uses **`topLeft`** naming (maps to Flutter `topStart`). Image uses **`src`** + **`alt`** props. Give the base layer explicit dimensions for predictable stack bounds.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Positioned](/docs/widgets/layout/positioned) | Absolute offsets inside `Stack`. |
| [Align](/docs/widgets/layout/align) | Custom child alignment within available space. |
| [Container](/docs/widgets/layout/container) | Sized base layers, scrims, and badges. |
| [Row](/docs/widgets/layout/row) | Horizontal layout without overlap. |
| [Column](/docs/widgets/layout/column) | Vertical layout without overlap. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Stack
description: Layered layout that paints children on top of each other — the foundation for overlays, badges, and Positioned placement.
widget: Stack
category: layout
flutterEquivalent: Stack
status: shipped
related:
  - Positioned
  - Align
  - Container
  - Row
  - Column
since: "0.0.1"
examples:
  - id: stack-basic
    file: examples/stack/basic.tsx
    category: basic
  - id: stack-image-overlay
    file: examples/stack/image-overlay.tsx
    category: common
  - id: stack-floating-badge
    file: examples/stack/floating-badge.tsx
    category: common
  - id: stack-avatar-status
    file: examples/stack/avatar-status.tsx
    category: common
  - id: stack-hero-banner
    file: examples/stack/hero-banner.tsx
    category: common
  - id: stack-two-layers
    file: examples/stack/two-layers.tsx
    category: variation
  - id: stack-three-layers
    file: examples/stack/three-layers.tsx
    category: variation
  - id: stack-multiple-overlays
    file: examples/stack/multiple-overlays.tsx
    category: variation
  - id: stack-align-top-left
    file: examples/stack/align-top-left.tsx
    category: variation
  - id: stack-align-center
    file: examples/stack/align-center.tsx
    category: variation
  - id: stack-align-bottom-right
    file: examples/stack/align-bottom-right.tsx
    category: variation
  - id: stack-align-custom
    file: examples/stack/align-custom.tsx
    category: variation
  - id: stack-composition
    file: examples/stack/composition.tsx
    category: composition
  - id: stack-banner-overlay
    file: examples/stack/banner-overlay.tsx
    category: common
  - id: stack-card-overlay
    file: examples/stack/card-overlay.tsx
    category: common
  - id: stack-floating-actions
    file: examples/stack/floating-actions.tsx
    category: common
  - id: stack-only
    file: examples/stack/stack-only.tsx
    category: common
  - id: stack-with-positioned
    file: examples/stack/with-positioned.tsx
    category: common
  - id: stack-anti-nesting
    file: examples/stack/anti-nesting.tsx
    category: anti-pattern
  - id: stack-anti-layout
    file: examples/stack/anti-layout.tsx
    category: anti-pattern
  - id: stack-anti-overlap
    file: examples/stack/anti-overlap.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/stack/` when the docs site is implemented.
