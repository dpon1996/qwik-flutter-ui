---
title: Column
description: Vertical flex layout for stacking children on the main and cross axes — the primary vertical layout primitive.
widget: Column
category: layout
flutterEquivalent: Column
status: shipped
related:
  - Row
  - SingleChildScrollView
  - ListView
  - Spacer
  - Expanded
  - Flexible
since: "0.0.1"
examples:
  - id: column-basic
    file: examples/column/basic.tsx
    category: basic
  - id: column-form-layout
    file: examples/column/form-layout.tsx
    category: common
  - id: column-settings
    file: examples/column/settings.tsx
    category: common
  - id: column-dashboard
    file: examples/column/dashboard.tsx
    category: common
  - id: column-card-content
    file: examples/column/card-content.tsx
    category: common
  - id: column-main-start
    file: examples/column/main-start.tsx
    category: variation
  - id: column-main-center
    file: examples/column/main-center.tsx
    category: variation
  - id: column-main-end
    file: examples/column/main-end.tsx
    category: variation
  - id: column-main-space-between
    file: examples/column/main-space-between.tsx
    category: variation
  - id: column-main-space-around
    file: examples/column/main-space-around.tsx
    category: variation
  - id: column-main-space-evenly
    file: examples/column/main-space-evenly.tsx
    category: variation
  - id: column-cross-start
    file: examples/column/cross-start.tsx
    category: variation
  - id: column-cross-center
    file: examples/column/cross-center.tsx
    category: variation
  - id: column-cross-end
    file: examples/column/cross-end.tsx
    category: variation
  - id: column-cross-stretch
    file: examples/column/cross-stretch.tsx
    category: variation
  - id: column-spacer
    file: examples/column/spacer.tsx
    category: composition
  - id: column-expanded
    file: examples/column/expanded.tsx
    category: composition
  - id: column-flexible
    file: examples/column/flexible.tsx
    category: composition
  - id: column-composition
    file: examples/column/composition.tsx
    category: composition
  - id: column-scrolling
    file: examples/column/scrolling.tsx
    category: common
  - id: column-anti-nesting
    file: examples/column/anti-nesting.tsx
    category: anti-pattern
  - id: column-anti-no-scroll
    file: examples/column/anti-no-scroll.tsx
    category: anti-pattern
  - id: column-anti-fixed-height
    file: examples/column/anti-fixed-height.tsx
    category: anti-pattern
---

# Column

## Overview

`Column` lays out children **vertically** in a single stack. It maps to Flutter's [`Column`](https://api.flutter.dev/flutter/widgets/Column-class.html) and is implemented as a CSS flex container (`display: flex; flex-direction: column`).

Use `Column` when siblings should stack top-to-bottom: forms, settings screens, card bodies, and page sections.

### Axes

| Axis | Direction in `Column` | CSS mapping | Controlled by |
| --- | --- | --- | --- |
| **Main axis** | Vertical (top ↕ bottom) | `justify-content` | `mainAxisAlignment` |
| **Cross axis** | Horizontal (left ↔ right) | `align-items` | `crossAxisAlignment` |

Default alignment: **`mainAxisAlignment.start`**, **`crossAxisAlignment.center`**.

### Column vs Row vs Wrap vs Stack

| Widget | Layout | When to use |
| --- | --- | --- |
| **`Column`** | Single vertical stack | Forms, settings, stacked sections |
| **`Row`** | Single horizontal line | Toolbars, inline actions |
| **`Wrap`** | Flow with line breaks | Tags and chips that may wrap horizontally |
| **`Stack`** | Overlapping layers | Badges, positioned overlays |

`Column` shares the same **`FlexProps`** as `Row` — only axis semantics differ.

---

## Import

```tsx
import { Column } from "qwik-flutter-ui";
```

Import alignment enums and children when examples use them:

```tsx
import {
  Column,
  Text,
  MainAxisAlignment,
  CrossAxisAlignment,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

The smallest working `Column` — two stacked text children with gap.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={8}>
      <Text>First</Text>
      <Text>Second</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-basic`).

---

## Common Usage

### Form Layout

Stack labeled fields with consistent vertical spacing.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values) => {
    console.log(values);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <TextFormField
            name="name"
            decoration={{ label: "Full name" }}
          />
          <TextFormField
            name="email"
            decoration={{ label: "Email", placeholder: "you@example.com" }}
          />
          <Button type="submit">Create account</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-form-layout`).

---

### Settings Screen

Section title followed by grouped options.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  CrossAxisAlignment,
  FontWeight,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={24} crossAxisAlignment={CrossAxisAlignment.start}>
      <Text as="h1" fontSize={28} fontWeight={FontWeight.bold}>
        Settings
      </Text>
      <Column gap={8}>
        <Text fontWeight={FontWeight.bold}>Account</Text>
        <Text>Manage your profile and password.</Text>
      </Column>
      <Column gap={8}>
        <Text fontWeight={FontWeight.bold}>Notifications</Text>
        <Text>Choose email and push preferences.</Text>
      </Column>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-settings`).

---

### Dashboard Section

Metric cards in a vertical stack inside a bounded panel.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  FontWeight,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16} backgroundColor="#f8fafc" borderRadius={8}>
      <Column gap={12}>
        <Text fontWeight={FontWeight.bold}>Overview</Text>
        <Container padding={12} backgroundColor="#fff" borderRadius={8}>
          <Text>Revenue: $12,400</Text>
        </Container>
        <Container padding={12} backgroundColor="#fff" borderRadius={8}>
          <Text>Active users: 1,204</Text>
        </Container>
      </Column>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-dashboard`).

---

### Card Content

Body copy and actions stacked inside a card surface.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16} borderRadius={12} border="1px solid #e2e8f0">
      <Column gap={12}>
        <Text as="h2">Pro plan</Text>
        <Text as="p">Unlimited projects and priority support.</Text>
        <Button type="button" onClick$={$(() => {})}>
          Upgrade
        </Button>
      </Column>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-card-content`).

---

## Alignment

Each example sets **`mainAxisAlignment`** only (vertical distribution along the main axis).

### MainAxisAlignment.start

Children pack to the **top** (default).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, MainAxisAlignment, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column
      mainAxisAlignment={MainAxisAlignment.start}
      gap={8}
      style={{ height: 160 }}
    >
      <Text>A</Text>
      <Text>B</Text>
      <Text>C</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-main-start`).

---

### MainAxisAlignment.center

Children group at the **vertical center**.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, MainAxisAlignment, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column
      mainAxisAlignment={MainAxisAlignment.center}
      gap={8}
      style={{ height: 160 }}
    >
      <Text>A</Text>
      <Text>B</Text>
      <Text>C</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-main-center`).

---

### MainAxisAlignment.end

Children pack to the **bottom**.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, MainAxisAlignment, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column
      mainAxisAlignment={MainAxisAlignment.end}
      gap={8}
      style={{ height: 160 }}
    >
      <Text>A</Text>
      <Text>B</Text>
      <Text>C</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-main-end`).

---

### MainAxisAlignment.spaceBetween

First child at top, last at bottom, **equal space between** siblings.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, MainAxisAlignment, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column mainAxisAlignment={MainAxisAlignment.spaceBetween} style={{ height: 160 }}>
      <Text>Top</Text>
      <Text>Middle</Text>
      <Text>Bottom</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-main-space-between`).

---

### MainAxisAlignment.spaceAround

**Equal space around** each child.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, MainAxisAlignment, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column mainAxisAlignment={MainAxisAlignment.spaceAround} style={{ height: 160 }}>
      <Text>A</Text>
      <Text>B</Text>
      <Text>C</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-main-space-around`).

---

### MainAxisAlignment.spaceEvenly

**Equal space between and before/after** all children.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, MainAxisAlignment, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column mainAxisAlignment={MainAxisAlignment.spaceEvenly} style={{ height: 160 }}>
      <Text>A</Text>
      <Text>B</Text>
      <Text>C</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-main-space-evenly`).

---

## Cross Axis Alignment

Use **`crossAxisAlignment`** to horizontally position children of different widths.

### start

Children align to the **start** (left in LTR).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  CrossAxisAlignment,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column crossAxisAlignment={CrossAxisAlignment.start} gap={8}>
      <Text>Short</Text>
      <Container padding={16} backgroundColor="#f1f5f9" style={{ width: 200 }}>
        <Text>Wide block</Text>
      </Container>
      <Text>Short</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-cross-start`).

---

### center

Children align to the **horizontal center** (default).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  CrossAxisAlignment,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column crossAxisAlignment={CrossAxisAlignment.center} gap={8}>
      <Text>Short</Text>
      <Container padding={16} backgroundColor="#f1f5f9" style={{ width: 200 }}>
        <Text>Wide block</Text>
      </Container>
      <Text>Short</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-cross-center`).

---

### end

Children align to the **end** (right in LTR).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  CrossAxisAlignment,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column crossAxisAlignment={CrossAxisAlignment.end} gap={8}>
      <Text>Short</Text>
      <Container padding={16} backgroundColor="#f1f5f9" style={{ width: 200 }}>
        <Text>Wide block</Text>
      </Container>
      <Text>Short</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-cross-end`).

---

### stretch

Children **stretch to the column's width** (widest sibling defines cross-axis size when column is bounded).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  CrossAxisAlignment,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column crossAxisAlignment={CrossAxisAlignment.stretch} gap={8} style={{ width: 240 }}>
      <Container padding={8} backgroundColor="#dbeafe">
        <Text>Stretches full width</Text>
      </Container>
      <Container padding={8} backgroundColor="#dbeafe">
        <Text>Also full width</Text>
      </Container>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-cross-stretch`).

---

## Flexible Layout

Flex children distribute **remaining main-axis (vertical) space** inside a `Column`.

| Widget | Behavior | Use when |
| --- | --- | --- |
| **`Spacer`** | Empty flex item that grows vertically | Push footer to bottom of a full-height column |
| **`Expanded`** | Child fills allocated flex space | Main content area between header and footer |
| **`Flexible`** | Child may keep natural height but participates in flex | Section shares space without forcing fill |

### Spacer

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Spacer, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column style={{ height: 200 }}>
      <Text>Header</Text>
      <Spacer />
      <Text>Footer</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-spacer`).

---

### Expanded

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Container, Expanded, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column style={{ height: 240 }}>
      <Text>Header</Text>
      <Expanded>
        <Container padding={16} backgroundColor="#f8fafc">
          <Text>Scrollable or growing main content</Text>
        </Container>
      </Expanded>
      <Text>Footer</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-expanded`).

---

### Flexible

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Flexible, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column style={{ height: 200 }} gap={8}>
      <Text>Fixed header</Text>
      <Flexible>
        <Text>May use less than full height</Text>
      </Flexible>
      <Text>Fixed footer</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-flexible`).

---

## Composition

Stack typography, actions, surfaces, and form fields.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  CrossAxisAlignment,
  Form,
  InputType,
  Text,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={24} backgroundColor="#f8fafc" borderRadius={12}>
      <Form onSubmit$={$(() => {})}>
        <Column gap={16} crossAxisAlignment={CrossAxisAlignment.stretch}>
          <Text as="h2">Sign in</Text>
          <TextFormField
            name="email"
            decoration={{ label: "Email", placeholder: "you@example.com" }}
          />
          <TextFormField
            name="password"
            decoration={{ label: "Password" }}
            type={InputType.password}
          />
          <Button type="submit">Continue</Button>
        </Column>
      </Form>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-composition`).

**Patterns:**

- **`Text`** — headings and body copy (`as="h1"`, `as="p"`)
- **`Button`** — primary action at the bottom of the stack
- **`Container`** — padded card or section background
- **`Form` + `TextFormField`** — validated vertical field lists

---

## Scrolling Considerations

### Column overflow behavior

`Column` defaults to **`overflow: visible`**. When total child height exceeds the parent, content **overflows vertically** unless a scroll container or flex constraint handles it.

### When to use SingleChildScrollView

Wrap a **`Column`** in **`SingleChildScrollView`** when the entire subtree scrolls as one unit — settings forms, legal text, profile pages.

### When to use ListView

Use **`ListView`** when you have **many repeated siblings** (feed items, settings rows, cards) that scroll together. `ListView` owns the scrollport; do not nest a long `Column` inside it without reason.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  ListView,
  SingleChildScrollView,
  Text,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

const ITEMS = ["Inbox", "Drafts", "Sent", "Archive"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    {/* SingleChildScrollView — one scrollable Column (e.g. form) */}
    <Container style={{ height: 200 }}>
      <SingleChildScrollView padding={16}>
        <Column gap={12}>
          <TextFormField name="bio" decoration={{ label: "Bio" }} maxLines={4} />
          <TextFormField name="url" decoration={{ label: "Website" }} />
        </Column>
      </SingleChildScrollView>
    </Container>

    {/* ListView — many similar rows */}
    <ListView padding={8} gap={4} style={{ height: 160 }}>
      {ITEMS.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: column-scrolling`).

Pair **`Expanded`** + scroll view when the column lives inside a flex shell (e.g. `AppShell` body).

---

## Best Practices

### Consistent spacing

Use **`gap`** on `Column` instead of margin on every child.

```tsx
<Column gap={16}>
  <Text as="h2">Title</Text>
  <Text as="p">Body</Text>
  <Button type="button">Action</Button>
</Column>
```

### Predictable alignment

Use **`crossAxisAlignment.stretch`** for full-width form fields and buttons. Use **`crossAxisAlignment.start`** for left-aligned reading content.

### Use Spacer for flexible gaps

**Preferred** — push footer actions to the bottom of a full-height column:

```tsx
import { Column, MainAxisSize, Spacer, Text, Button } from "qwik-flutter-ui";

<Column mainAxisSize={MainAxisSize.max} style={{ minHeight: "100%" }}>
  <Text>Content</Text>
  <Spacer />
  <Button type="button">Continue</Button>
</Column>
```

Avoid empty **`SizedBox`** or **`Container`** blocks solely to create vertical space inside flex layouts — use **`Spacer`** or **`gap`**.

---

## Anti-Patterns

### Deeply nested Columns

**Source** (avoid)

```tsx
<Column>
  <Column>
    <Column gap={8}>
      <Text>Over-nested</Text>
    </Column>
  </Column>
</Column>
```

**Preferred**

```tsx
<Column gap={8}>
  <Text>Flat structure</Text>
</Column>
```

**Why:** Redundant wrappers add DOM depth without layout benefit. One `Column` with `gap` is enough for most stacks.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: column-anti-nesting`, `preview: false`).

---

### Large scrolling content without scroll containers

**Source** (avoid)

```tsx
<Column gap={16}>
  {/* dozens of fields — overflows viewport */}
  <TextFormField name="field1" decoration={{ label: "Field 1" }} />
  <TextFormField name="field2" decoration={{ label: "Field 2" }} />
  {/* … */}
</Column>
```

**Preferred**

```tsx
<SingleChildScrollView padding={16}>
  <Column gap={16}>
    <TextFormField name="field1" decoration={{ label: "Field 1" }} />
    <TextFormField name="field2" decoration={{ label: "Field 2" }} />
    {/* … */}
  </Column>
</SingleChildScrollView>
```

**Why:** Unbounded `Column` height overflows the viewport; users cannot reach off-screen content.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: column-anti-no-scroll`, `preview: false`).

---

### Fixed-height layouts causing overflow

**Source** (avoid)

```tsx
<Column style={{ height: 120 }}>
  <Text>Title</Text>
  <Text>Long body copy that cannot fit in 120px and will overflow.</Text>
  <Button type="button">Action</Button>
</Column>
```

**Preferred**

```tsx
<Column gap={12}>
  <Text>Title</Text>
  <Expanded>
    <SingleChildScrollView>
      <Text>Long body copy scrolls inside Expanded.</Text>
    </SingleChildScrollView>
  </Expanded>
  <Button type="button">Action</Button>
</Column>
```

**Why:** Fixed heights clip content. Let the column grow, scroll, or use `Expanded` for flexible middle sections.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: column-anti-fixed-height`, `preview: false`).

---

## Accessibility

### Semantic output

`Column` renders a **`<div>`** flex container. It does not convey document structure by itself. Use **`Text as="h1"`**, **`Container as="section"`**, or native landmarks for meaningful regions.

### Screen reader expectations

Assistive technology reads **children in DOM order** — top to bottom matches visual order in default `verticalDirection`. Set **`textDirection`** when mirroring for RTL layouts.

### Reading order

Keep DOM order aligned with visual reading order. Do not use CSS alone to reorder critical content without considering screen reader sequence.

Interactive elements inside a `Column` follow natural tab order from first to last child.

---

## SSR

### Static rendering

`Column` renders complete markup on the server. Alignment classes come from CSS modules; **`gap`** and **`textDirection`** emit as inline styles when set.

### Resumability compatibility

`Column` is stateless — no event handlers or client hooks. Layout requires no mandatory hydration JavaScript.

---

## Flutter Equivalent

| Topic | Flutter `Column` | qwik-flutter-ui `Column` |
| --- | --- | --- |
| Direction | Vertical | Vertical (`flex-direction: column`) |
| Main alignment | Vertical (`mainAxisAlignment`) | Same enum — maps to `justify-content` |
| Cross alignment | Horizontal (`crossAxisAlignment`) | Same enum — maps to `align-items`; default **`center`** |
| Main size | `mainAxisSize` | `max` → `height: 100%`; `min` → `fit-content` |
| Spacing | Manual `SizedBox` | **`gap` prop** (CSS extension) |
| Reverse flow | `verticalDirection: up` | `verticalDirection.up` → `column-reverse` |
| Scroll | `SingleChildScrollView` child | Same pairing |

**Flutter**

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('Settings', style: TextStyle(fontSize: 20)),
    SizedBox(height: 12),
    Text('Manage your account'),
  ],
)
```

**qwik-flutter-ui**

```tsx
<Column crossAxisAlignment={CrossAxisAlignment.start} gap={12}>
  <Text fontSize={20}>Settings</Text>
  <Text>Manage your account</Text>
</Column>
```

**Similarities:** Same axis model and enums as `Row`. Same flex children (`Spacer`, `Expanded`, `Flexible`).

**Differences:** Native **`gap`** prop. JSX slots instead of `children:` list. Renders HTML `<div>`. **`Row`** is the horizontal counterpart with identical props.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Row](/docs/widgets/layout/row) | Horizontal counterpart — same `FlexProps`. |
| [SingleChildScrollView](/docs/widgets/layout/single-child-scroll-view) | Scrolls one `Column` subtree when content exceeds viewport. |
| [ListView](/docs/widgets/layout/list-view) | Scrolls many repeated children. |
| [Spacer](/docs/widgets/layout/spacer) | Pushes siblings apart along the main axis. |
| [Expanded](/docs/widgets/layout/expanded) | Forces a child to fill remaining column height. |
| [Flexible](/docs/widgets/layout/flexible) | Loose-fit flex child along the main axis. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Column
description: Vertical flex layout for stacking children on the main and cross axes — the primary vertical layout primitive.
widget: Column
category: layout
flutterEquivalent: Column
status: shipped
related:
  - Row
  - SingleChildScrollView
  - ListView
  - Spacer
  - Expanded
  - Flexible
since: "0.0.1"
examples:
  - id: column-basic
    file: examples/column/basic.tsx
    category: basic
  - id: column-form-layout
    file: examples/column/form-layout.tsx
    category: common
  - id: column-settings
    file: examples/column/settings.tsx
    category: common
  - id: column-dashboard
    file: examples/column/dashboard.tsx
    category: common
  - id: column-card-content
    file: examples/column/card-content.tsx
    category: common
  - id: column-main-start
    file: examples/column/main-start.tsx
    category: variation
  - id: column-main-center
    file: examples/column/main-center.tsx
    category: variation
  - id: column-main-end
    file: examples/column/main-end.tsx
    category: variation
  - id: column-main-space-between
    file: examples/column/main-space-between.tsx
    category: variation
  - id: column-main-space-around
    file: examples/column/main-space-around.tsx
    category: variation
  - id: column-main-space-evenly
    file: examples/column/main-space-evenly.tsx
    category: variation
  - id: column-cross-start
    file: examples/column/cross-start.tsx
    category: variation
  - id: column-cross-center
    file: examples/column/cross-center.tsx
    category: variation
  - id: column-cross-end
    file: examples/column/cross-end.tsx
    category: variation
  - id: column-cross-stretch
    file: examples/column/cross-stretch.tsx
    category: variation
  - id: column-spacer
    file: examples/column/spacer.tsx
    category: composition
  - id: column-expanded
    file: examples/column/expanded.tsx
    category: composition
  - id: column-flexible
    file: examples/column/flexible.tsx
    category: composition
  - id: column-composition
    file: examples/column/composition.tsx
    category: composition
  - id: column-scrolling
    file: examples/column/scrolling.tsx
    category: common
  - id: column-anti-nesting
    file: examples/column/anti-nesting.tsx
    category: anti-pattern
  - id: column-anti-no-scroll
    file: examples/column/anti-no-scroll.tsx
    category: anti-pattern
  - id: column-anti-fixed-height
    file: examples/column/anti-fixed-height.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/column/` when the docs site is implemented.
