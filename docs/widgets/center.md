---
title: Center
description: Centers a child horizontally and vertically within the parent's available space.
widget: Center
category: layout
flutterEquivalent: Center
status: shipped
related:
  - Align
  - Container
  - Row
  - Column
since: "0.0.1"
examples:
  - id: center-basic
    file: examples/center/basic.tsx
    category: basic
  - id: center-text
    file: examples/center/text.tsx
    category: common
  - id: center-empty-state
    file: examples/center/empty-state.tsx
    category: common
  - id: center-loading
    file: examples/center/loading.tsx
    category: common
  - id: center-cta
    file: examples/center/cta.tsx
    category: common
  - id: center-composition
    file: examples/center/composition.tsx
    category: composition
  - id: center-in-container
    file: examples/center/in-container.tsx
    category: common
  - id: center-in-column
    file: examples/center/in-column.tsx
    category: common
  - id: center-in-row
    file: examples/center/in-row.tsx
    category: common
  - id: center-in-app-shell
    file: examples/center/in-app-shell.tsx
    category: common
  - id: center-vs-align
    file: examples/center/vs-align.tsx
    category: common
  - id: center-vs-container
    file: examples/center/vs-container.tsx
    category: common
  - id: center-anti-nesting
    file: examples/center/anti-nesting.tsx
    category: anti-pattern
  - id: center-anti-spacing
    file: examples/center/anti-spacing.tsx
    category: anti-pattern
  - id: center-anti-redundant
    file: examples/center/anti-redundant.tsx
    category: anti-pattern
---

# Center

## Overview

`Center` positions its child at the **horizontal and vertical midpoint** of the parent's available space. It maps to Flutter's [`Center`](https://api.flutter.dev/flutter/widgets/Center-class.html).

Use `Center` when dead-center placement is the goal — empty states, loading placeholders, hero call-to-action blocks, and centered icons or labels inside a bounded region.

### Positioning model

| Concern | Behavior |
| --- | --- |
| **Horizontal centering** | `justify-content: center` |
| **Vertical centering** | `align-items: center` |
| **Content positioning** | Child keeps intrinsic size; `Center` fills the parent box (`width: 100%`, `height: 100%`) |

Vertical centering is only visible when the **parent provides a definite height** (same practical constraint as CSS flexbox).

### Center vs Align vs Container alignment

| Widget | Purpose |
| --- | --- |
| **`Center`** | Zero-config **both-axis center** |
| **`Align`** | Any **`Alignment`** on the 9-point grid; optional `widthFactor` / `heightFactor` |
| **`Container` `alignment`** | Align children inside a **box you size** with `width`, `height`, padding, and decoration |

`Center` is equivalent to **`Align` with `alignment={Alignment.center}`** when the parent supplies bounded constraints.

---

## Import

```tsx
import { Center } from "qwik-flutter-ui";
```

Import layout and content widgets when examples use them:

```tsx
import {
  Center,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

The smallest working `Center` — one centered text child.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Center, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container height={160} backgroundColor="#f8fafc">
      <Center>
        <Text>Centered</Text>
      </Center>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: center-basic`).

---

## Common Usage

### Centered Text

Center a heading or message inside a panel.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Center,
  Container,
  FontWeight,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container height={200} backgroundColor="#f1f5f9" borderRadius={8}>
      <Center>
        <Text as="h2" fontSize={24} fontWeight={FontWeight.bold}>
          Welcome back
        </Text>
      </Center>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: center-text`).

---

### Empty State

When a view has no data, center the empty-state message in the available area.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Center,
  Column,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container height={240} backgroundColor="#f8fafc" borderRadius={8}>
      <Center>
        <Column gap={8}>
          <Text fontSize={18}>No items yet</Text>
          <Text color="#64748b">Create your first project to get started.</Text>
        </Column>
      </Center>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: center-empty-state`).

---

### Loading State

Center status text while async content loads.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Center, Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container height={200} backgroundColor="#f8fafc">
      <Center>
        <Text color="#64748b">Loading…</Text>
      </Center>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: center-loading`).

---

### Call To Action

Center a short CTA block in a hero or modal body.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Center,
  Column,
  Container,
  FontWeight,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container height={280} padding={24} backgroundColor="#eff6ff" borderRadius={12}>
      <Center>
        <Column gap={16}>
          <Text as="h2" fontSize={22} fontWeight={FontWeight.bold}>
            Try Pro free for 14 days
          </Text>
          <Button type="button" onClick$={$(() => {})}>
            Start trial
          </Button>
        </Column>
      </Center>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: center-cta`).

---

## Composition

Combine `Center` with typography, actions, surfaces, and cards.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Card,
  Center,
  Column,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container height={320} padding={16} backgroundColor="#f8fafc">
      <Center>
        <Card padding={24}>
          <Column gap={12}>
            <Text as="h3">Invite teammates</Text>
            <Text as="p" color="#64748b">
              Collaborate on widgets and design tokens.
            </Text>
            <Button type="button" onClick$={$(() => {})}>
              Send invite
            </Button>
          </Column>
        </Card>
      </Center>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: center-composition`).

**Patterns:**

- **`Text`** — primary message; wrap multiple lines in `Column` inside `Center`
- **`Button`** — centered primary action in empty/CTA states
- **`Container`** — bounded region that defines where centering happens
- **`Card`** — elevated centered panel on a neutral background

---

## Layout Behavior

### Center sizing behavior

`Center` expands to **`width: 100%`** and **`height: 100%`** of its parent, then centers its child inside that box. The child does not stretch unless it has its own width/height styles.

### Parent constraints

The parent must allocate space. Examples: fixed `height` on `Container`, `Expanded` in a `Column`, or `flex: 1` regions like `AppShell` `<main>`.

### Child constraints

The child sizes to its **intrinsic content**. For wider centered blocks, wrap content in `Column` with `crossAxisAlignment.stretch` inside a width-constrained child, or set `maxWidth` on the child via `style`.

### Inside Container

Give the container explicit dimensions so `Center` has a region to fill.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Center, Container, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container width="100%" height={200} backgroundColor="#f1f5f9">
      <Center>
        <Text>Inside sized Container</Text>
      </Center>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: center-in-container`).

---

### Inside Column

Use **`Expanded`** so `Center` receives the remaining vertical space below a header.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Center,
  Column,
  Container,
  Expanded,
  FontWeight,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container height={280} padding={16} backgroundColor="#f8fafc">
      <Column gap={8}>
        <Text fontWeight={FontWeight.bold}>Page title</Text>
        <Expanded>
          <Center>
            <Text>Centered in remaining height</Text>
          </Center>
        </Expanded>
      </Column>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: center-in-column`).

---

### Inside Row

Set an explicit **row height** so vertical centering is visible.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Center,
  Container,
  Expanded,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row style={{ height: 120 }} gap={8}>
      <Container padding={12} backgroundColor="#e2e8f0">
        <Text>Sidebar</Text>
      </Container>
      <Expanded>
        <Center>
          <Text>Centered in main column</Text>
        </Center>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: center-in-row`).

---

### Inside AppShell

Center empty-state content in the main body region.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { AppBar, AppShell, Center, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppShell appBar={<AppBar title={<Text as="h1">Inbox</Text>} />}>
      <Center>
        <Text color="#64748b">No messages</Text>
      </Center>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: center-in-app-shell`).

---

## Alignment Comparisons

### Center

Dead-center on both axes — minimal API.

**Source**

```tsx
<Container height={160} backgroundColor="#f8fafc">
  <Center>
    <Text>Center</Text>
  </Center>
</Container>
```

---

### Align

Same visual result as `Center` when `alignment={Alignment.center}`; use **`Align`** for other grid positions.

**Source**

```tsx
import { Align, Alignment, Container, Text } from "qwik-flutter-ui";

<Container height={160} backgroundColor="#f8fafc">
  <Align alignment={Alignment.center}>
    <Text>Align center</Text>
  </Align>
</Container>
```

**When to prefer `Align`:** bottom-right FABs, top-left badges, fractional sizing via `widthFactor` / `heightFactor`.

---

### Container alignment

Align inside a **decorated box** you dimension explicitly — useful when centering is one part of a styled surface.

**Source**

```tsx
import { Alignment, Container, Text } from "qwik-flutter-ui";

<Container
  width="100%"
  height={160}
  alignment={Alignment.center}
  backgroundColor="#f8fafc"
>
  <Text>Container alignment</Text>
</Container>
```

**When to prefer `Container`:** padding, background, border, and alignment on one widget.

**Preview**

> **Preview placeholder** — alignment comparison renders here (`id: center-vs-align`, `center-vs-container`).

| Need | Widget |
| --- | --- |
| Center only | `Center` |
| Any grid position | `Align` |
| Styled box + alignment | `Container` |

---

## Best Practices

### Use Center for intent

When the design says "center this," use **`Center`** instead of manual flex styles on a raw `div`.

```tsx
<Container height={200}>
  <Center>
    <Text>Empty state</Text>
  </Center>
</Container>
```

### Prefer Center over alignment hacks

**Avoid** margin auto tricks or arbitrary padding to approximate vertical centering. **`Center`** matches Flutter semantics and stays consistent across the library.

### Avoid unnecessary wrappers

If you already use **`Container`** with `alignment={Alignment.center}` on a sized box, do not wrap the same child in **`Center`** again.

```tsx
<Container height={200} alignment={Alignment.center} backgroundColor="#f8fafc">
  <Text>Already centered</Text>
</Container>
```

One alignment mechanism per region is enough.

---

## Anti-Patterns

### Nested Centers

**Source** (avoid)

```tsx
<Container height={200}>
  <Center>
    <Center>
      <Text>Redundant</Text>
    </Center>
  </Center>
</Container>
```

**Preferred**

```tsx
<Container height={200}>
  <Center>
    <Text>Centered once</Text>
  </Center>
</Container>
```

**Why:** Inner `Center` adds a wrapper without changing placement.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: center-anti-nesting`, `preview: false`).

---

### Using Center for spacing

**Source** (avoid)

```tsx
<Column>
  <Text>Top</Text>
  <Center style={{ height: 48 }} />
  <Text>Bottom</Text>
</Column>
```

**Preferred**

```tsx
<Column gap={48}>
  <Text>Top</Text>
  <Text>Bottom</Text>
</Column>
```

**Why:** `Center` is for positioning content, not empty vertical gap. Use **`gap`**, **`Spacer`**, or **`SizedBox`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: center-anti-spacing`, `preview: false`).

---

### Combining redundant alignment widgets

**Source** (avoid)

```tsx
<Container height={200} alignment={Alignment.center}>
  <Center>
    <Align alignment={Alignment.center}>
      <Text>Triple aligned</Text>
    </Align>
  </Center>
</Container>
```

**Preferred**

```tsx
<Container height={200}>
  <Center>
    <Text>Centered</Text>
  </Center>
</Container>
```

**Why:** Multiple alignment layers obscure layout intent and add DOM noise.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: center-anti-redundant`, `preview: false`).

---

## Accessibility

### Semantic neutrality

`Center` renders a **`<div>`** with flex centering. It is not a landmark and does not change the semantic role of its child.

### Screen reader behavior

Assistive technology reads **child content** in DOM order. `Center` does not reorder or hide content. For empty states, ensure messages use **`Text`** with appropriate headings (`as="h2"`) where the copy is structurally important.

### Focus behavior

`Center` is **non-interactive** and not focusable. Focusable children (`Button`, `TextField`, links) inside a centered `Column` follow normal tab order.

---

## SSR

### Static rendering

`Center` renders a `<div>` with flex centering classes on the server. No client-only styling logic is required for layout.

### Resumability compatibility

`Center` is stateless — no event handlers or hooks. It adds no mandatory hydration JavaScript.

---

## Flutter Equivalent

| Topic | Flutter `Center` | qwik-flutter-ui `Center` |
| --- | --- | --- |
| Axes | Horizontal + vertical center | Same — flexbox center |
| Child | Single child convention | JSX slotted children |
| Sizing | Expands to parent constraints | `width: 100%`, `height: 100%` |
| Factors | `widthFactor` / `heightFactor` on Flutter `Center` | Use **`Align`** (not on `Center` v1) |
| Equivalent | `Align(alignment: Alignment.center)` | Same relationship |

**Flutter**

```dart
Center(
  child: Text('Centered'),
)
```

**qwik-flutter-ui**

```tsx
<Center>
  <Text>Centered</Text>
</Center>
```

**Similarities:** Same purpose and child-centric sizing.

**Differences:** Renders HTML `<div>`. No `widthFactor` / `heightFactor` on `Center` — use **`Align`** for fractional sizing. Parent height must come from CSS layout (Container, Expanded, AppShell main).

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Align](/docs/widgets/layout/align) | Arbitrary 9-point alignment; superset of centering. |
| [Container](/docs/widgets/layout/container) | Sized box with optional `alignment` and decoration. |
| [Row](/docs/widgets/layout/row) | Horizontal flex; pair with bounded height for centered cells. |
| [Column](/docs/widgets/layout/column) | Vertical flex; use `Expanded` + `Center` for centered body regions. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Center
description: Centers a child horizontally and vertically within the parent's available space.
widget: Center
category: layout
flutterEquivalent: Center
status: shipped
related:
  - Align
  - Container
  - Row
  - Column
since: "0.0.1"
examples:
  - id: center-basic
    file: examples/center/basic.tsx
    category: basic
  - id: center-text
    file: examples/center/text.tsx
    category: common
  - id: center-empty-state
    file: examples/center/empty-state.tsx
    category: common
  - id: center-loading
    file: examples/center/loading.tsx
    category: common
  - id: center-cta
    file: examples/center/cta.tsx
    category: common
  - id: center-composition
    file: examples/center/composition.tsx
    category: composition
  - id: center-in-container
    file: examples/center/in-container.tsx
    category: common
  - id: center-in-column
    file: examples/center/in-column.tsx
    category: common
  - id: center-in-row
    file: examples/center/in-row.tsx
    category: common
  - id: center-in-app-shell
    file: examples/center/in-app-shell.tsx
    category: common
  - id: center-vs-align
    file: examples/center/vs-align.tsx
    category: common
  - id: center-vs-container
    file: examples/center/vs-container.tsx
    category: common
  - id: center-anti-nesting
    file: examples/center/anti-nesting.tsx
    category: anti-pattern
  - id: center-anti-spacing
    file: examples/center/anti-spacing.tsx
    category: anti-pattern
  - id: center-anti-redundant
    file: examples/center/anti-redundant.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/center/` when the docs site is implemented.
