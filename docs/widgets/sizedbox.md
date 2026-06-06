---
title: SizedBox
description: Fixed-width and fixed-height box for spacing, sizing, and empty gaps between layout siblings.
widget: SizedBox
category: layout
flutterEquivalent: SizedBox
status: shipped
related:
  - Spacer
  - Expanded
  - Flexible
  - Container
  - Row
  - Column
since: "0.0.1"
examples:
  - id: sizedbox-basic
    file: examples/sizedbox/basic.tsx
    category: basic
  - id: sizedbox-vertical-spacing
    file: examples/sizedbox/vertical-spacing.tsx
    category: common
  - id: sizedbox-horizontal-spacing
    file: examples/sizedbox/horizontal-spacing.tsx
    category: common
  - id: sizedbox-fixed-width
    file: examples/sizedbox/fixed-width.tsx
    category: common
  - id: sizedbox-fixed-height
    file: examples/sizedbox/fixed-height.tsx
    category: common
  - id: sizedbox-between-buttons
    file: examples/sizedbox/between-buttons.tsx
    category: common
  - id: sizedbox-between-fields
    file: examples/sizedbox/between-fields.tsx
    category: common
  - id: sizedbox-between-sections
    file: examples/sizedbox/between-sections.tsx
    category: common
  - id: sizedbox-between-cards
    file: examples/sizedbox/between-cards.tsx
    category: common
  - id: sizedbox-width-only
    file: examples/sizedbox/width-only.tsx
    category: variation
  - id: sizedbox-height-only
    file: examples/sizedbox/height-only.tsx
    category: variation
  - id: sizedbox-width-height
    file: examples/sizedbox/width-height.tsx
    category: variation
  - id: sizedbox-responsive-length
    file: examples/sizedbox/responsive-length.tsx
    category: variation
  - id: sizedbox-in-row
    file: examples/sizedbox/in-row.tsx
    category: composition
  - id: sizedbox-in-column
    file: examples/sizedbox/in-column.tsx
    category: composition
  - id: sizedbox-in-form
    file: examples/sizedbox/in-form.tsx
    category: composition
  - id: sizedbox-in-card
    file: examples/sizedbox/in-card.tsx
    category: composition
  - id: sizedbox-row-behavior
    file: examples/sizedbox/row-behavior.tsx
    category: common
  - id: sizedbox-column-behavior
    file: examples/sizedbox/column-behavior.tsx
    category: common
  - id: sizedbox-expanded-behavior
    file: examples/sizedbox/expanded-behavior.tsx
    category: common
  - id: sizedbox-anti-container
    file: examples/sizedbox/anti-container.tsx
    category: anti-pattern
  - id: sizedbox-anti-nesting
    file: examples/sizedbox/anti-nesting.tsx
    category: anti-pattern
  - id: sizedbox-anti-magic-values
    file: examples/sizedbox/anti-magic-values.tsx
    category: anti-pattern
---

# SizedBox

## Overview

`SizedBox` is a box with an optional **fixed width**, **fixed height**, or both. It maps to Flutter's [`SizedBox`](https://api.flutter.dev/flutter/widgets/SizedBox-class.html).

Use `SizedBox` to reserve exact space: vertical or horizontal gaps, fixed-size wrappers for avatars and icons, and empty placeholders between siblings outside flex `gap` patterns.

### Roles

| Role | API |
| --- | --- |
| **Spacing** | Childless `height={16}` or `width={8}` between elements |
| **Fixed width** | `width={48}` or `width="50%"` |
| **Fixed height** | `height={56}` or `height="1rem"` |
| **Empty space** | No child — renders an empty `div` with declared dimensions |

Numeric `Length` values become **pixels**. String values pass through as CSS (`"1rem"`, `"50%"`, `"clamp(...)"`).

### SizedBox vs Spacer vs Container vs Expanded

| Widget | Behavior | Use when |
| --- | --- | --- |
| **`SizedBox`** | **Fixed** width/height; `flex-shrink: 0` | Known gap size or fixed child bounds |
| **`Spacer`** | **Flexible** empty space (`flex-grow`) | Push siblings apart in `Row` / `Column` |
| **`Container`** | Sizing + padding + decoration | Styled surface, not a bare gap |
| **`Expanded`** | Child **fills remaining** main-axis space | One region should grow in flex layout |

Inside `Row` / `Column`, prefer **`gap`** for uniform spacing between all children. Use **`SizedBox`** when spacing is asymmetric or outside flex parents.

---

## Import

```tsx
import { SizedBox } from "qwik-flutter-ui";
```

Import layout widgets when examples use them:

```tsx
import {
  Column,
  Row,
  SizedBox,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

Childless vertical gap between two text nodes.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, SizedBox, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column>
      <Text>Above</Text>
      <SizedBox height={16} />
      <Text>Below</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-basic`).

---

## Common Usage

### Vertical Spacing

Reserve fixed vertical space between stacked content.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, SizedBox, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column>
      <Text as="h2">Title</Text>
      <SizedBox height={12} />
      <Text as="p">Subtitle copy appears below the title.</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-vertical-spacing`).

---

### Horizontal Spacing

Fixed horizontal gap inside a row (when `gap` is not used).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Row, SizedBox, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row>
      <Text>Label</Text>
      <SizedBox width={8} />
      <Text>Value</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-horizontal-spacing`).

---

### Fixed Width Element

Wrap content in a box with explicit width.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  SizedBox,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <SizedBox width={120}>
      <Container padding={8} backgroundColor="#dbeafe">
        <Text>Fixed 120px</Text>
      </Container>
    </SizedBox>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-fixed-width`).

---

### Fixed Height Element

Reserve a consistent height for a divider or media slot.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  SizedBox,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <SizedBox width="100%" height={4}>
      <Container width="100%" height={4} backgroundColor="#e2e8f0" />
    </SizedBox>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-fixed-height`).

---

## Spacing Patterns

Use a **consistent spacing scale** (8, 12, 16, 24, 32). Prefer **`Column gap`** / **`Row gap`** when every sibling shares the same spacing.

### Between Buttons

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Row, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Button type="button" onClick$={$(() => {})}>
        Cancel
      </Button>
      <Button type="button" onClick$={$(() => {})}>
        Save
      </Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-between-buttons`).

**Recommended:** `Row gap={8}` instead of manual `SizedBox` between each button.

---

### Between Form Fields

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Column,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Column gap={16}>
        <TextFormField name="name" decoration={{ label: "Name" }} />
        <TextFormField name="email" decoration={{ label: "Email" }} />
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-between-fields`).

**Recommended:** `Column gap={16}` for form field stacks.

---

### Between Sections

Larger gap between logical page sections.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, SizedBox, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column>
      <Text as="h2">Account</Text>
      <Text>Profile settings</Text>
      <SizedBox height={32} />
      <Text as="h2">Billing</Text>
      <Text>Payment methods</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-between-sections`).

**Recommended:** Use **`SizedBox height={32}`** when only one large break is needed between section groups.

---

### Between Cards

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Card, Column, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={16}>
      <Card padding={16}>
        <Text>Card one</Text>
      </Card>
      <Card padding={16}>
        <Text>Card two</Text>
      </Card>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-between-cards`).

**Recommended:** `Column gap={16}` between cards in a list.

---

## Sizing Patterns

### Width Only

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { SizedBox, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <SizedBox width={200}>
      <Text>Width constrained to 200px</Text>
    </SizedBox>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-width-only`).

---

### Height Only

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { SizedBox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <SizedBox height={24} />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-height-only`).

---

### Width and Height

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Center,
  Container,
  SizedBox,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <SizedBox width={64} height={64}>
      <Container width="100%" height="100%" backgroundColor="#6366f1" borderRadius={8}>
        <Center>
          <Text color="#fff">AB</Text>
        </Center>
      </Container>
    </SizedBox>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-width-height`).

---

### Responsive Length Values

`Length` accepts numbers (px) or CSS strings.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, SizedBox, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={12}>
      <SizedBox width={240} height={8}>
        <Text>240px width (number → px)</Text>
      </SizedBox>
      <SizedBox width="12rem" height={8}>
        <Text>12rem width</Text>
      </SizedBox>
      <SizedBox width="50%" height={8}>
        <Text>50% of parent width</Text>
      </SizedBox>
      <SizedBox width="clamp(200px, 50%, 480px)" height={8}>
        <Text>Fluid clamp width</Text>
      </SizedBox>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-responsive-length`).

| Value type | Example | CSS output |
| --- | --- | --- |
| px (number) | `width={240}` | `240px` |
| rem | `width="1rem"` | `1rem` |
| % | `width="50%"` | `50%` |
| clamp | `width="clamp(200px, 50%, 480px)"` | passed through |

---

## Composition

### SizedBox inside Row

Horizontal gap or fixed-width slot between row children.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Row, SizedBox, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row>
      <Text>Status</Text>
      <SizedBox width={16} />
      <Text>Active</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-in-row`).

---

### SizedBox inside Column

Vertical gap between stacked sections.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, SizedBox, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column>
      <Text>Step 1</Text>
      <SizedBox height={16} />
      <Text>Step 2</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-in-column`).

---

### SizedBox inside Form

Prefer `Column gap` for uniform field spacing; `SizedBox` for one-off breaks.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Column,
  Form,
  SizedBox,
  Text,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Column gap={16}>
        <TextFormField name="email" decoration={{ label: "Email" }} />
        <SizedBox height={8} />
        <Text color="#64748b">Optional section</Text>
        <TextFormField name="company" decoration={{ label: "Company" }} />
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-in-form`).

---

### SizedBox inside Card

Small break between title and body inside a card.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Card, Column, SizedBox, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Card padding={16}>
      <Column>
        <Text as="h3">Notifications</Text>
        <SizedBox height={8} />
        <Text as="p">Manage email and push alerts.</Text>
      </Column>
    </Card>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-in-card`).

---

## Layout Behavior

### Constraint behavior

`SizedBox` applies **`flex-shrink: 0`** inside flex parents so declared dimensions are honored. It does not expand to fill free space — that is **`Expanded`** / **`Spacer`**.

### Fixed sizing

Width and height are inline styles computed at render time (SSR-safe). Omitted axes size to the child's intrinsic dimensions when a child is present.

### Interaction with parent layout

Parent must allow the declared size. In a narrow `Row`, a wide `SizedBox` may overflow unless the row scrolls or wraps.

### Row + SizedBox

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Row, SizedBox, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row>
      <SizedBox width={80}>
        <Text>Fixed</Text>
      </SizedBox>
      <Text>Flexible neighbor</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-row-behavior`).

---

### Column + SizedBox

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, SizedBox, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column>
      <Text>Header</Text>
      <SizedBox height={24} />
      <Text>Body</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-column-behavior`).

---

### Expanded + SizedBox

Use **`Expanded`** for regions that grow; **`SizedBox`** inside for fixed-size content in that region.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Expanded,
  Row,
  SizedBox,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row style={{ height: 80 }}>
      <SizedBox width={48}>
        <Text>Icon</Text>
      </SizedBox>
      <Expanded>
        <Column>
          <Text>Title</Text>
          <Text color="#64748b">Subtitle</Text>
        </Column>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sizedbox-expanded-behavior`).

---

## Best Practices

### Use SizedBox for spacing

When you need a **specific** gap and `gap` is not appropriate, use childless `SizedBox`.

```tsx
<Column>
  <Text>Section A</Text>
  <SizedBox height={32} />
  <Text>Section B</Text>
</Column>
```

### Keep spacing consistent

Stick to a small scale: **8, 12, 16, 24, 32**. Reuse the same values across forms, cards, and pages.

### Avoid empty Containers for spacing

**Preferred**

```tsx
<SizedBox height={16} />
```

**Avoid**

```tsx
<Container height={16} />
```

`Container` implies decoration and layout surface; `SizedBox` expresses fixed space only.

---

## Anti-Patterns

### Container used only for spacing

**Source** (avoid)

```tsx
<Column>
  <Text>Top</Text>
  <Container height={16} />
  <Text>Bottom</Text>
</Column>
```

**Preferred**

```tsx
<Column gap={16}>
  <Text>Top</Text>
  <Text>Bottom</Text>
</Column>
```

**Why:** `Container` adds semantic weight and unnecessary props surface for empty space.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: sizedbox-anti-container`, `preview: false`).

---

### Excessive nesting

**Source** (avoid)

```tsx
<SizedBox height={16}>
  <SizedBox height={16}>
    <SizedBox height={16} />
  </SizedBox>
</SizedBox>
```

**Preferred**

```tsx
<SizedBox height={48} />
```

**Why:** Combine fixed gaps into one declaration.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: sizedbox-anti-nesting`, `preview: false`).

---

### Magic spacing values

**Source** (avoid)

```tsx
<SizedBox height={13} />
<SizedBox height={19} />
<SizedBox height={27} />
```

**Preferred**

```tsx
<Column gap={16}>
  {/* consistent 16px rhythm */}
</Column>
```

**Why:** Arbitrary values make layouts harder to maintain and visually inconsistent.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: sizedbox-anti-magic-values`, `preview: false`).

---

## Accessibility

### Semantic neutrality

`SizedBox` renders a **`<div>`** with no landmark role. Childless spacers are **ignored by screen readers** (empty elements with no text).

### Screen reader behavior

Do not put meaningful content only in a `SizedBox` without text — use **`Text`** or labeled controls. Decorative spacing boxes do not appear in the accessibility tree as content.

If a `SizedBox` wraps interactive content, focus order follows the child widget.

---

## SSR

### Static rendering

Width and height are emitted as **inline styles** on the server. Childless spacers render as empty `<div>` elements with explicit dimensions.

### Resumability compatibility

`SizedBox` is stateless — no event handlers or client hooks. Layout requires no mandatory hydration JavaScript.

---

## Flutter Equivalent

| Topic | Flutter `SizedBox` | qwik-flutter-ui `SizedBox` |
| --- | --- | --- |
| Fixed size | `width` / `height` | Same prop names; `Length` type |
| Empty gap | `SizedBox(height: 16)` | `<SizedBox height={16} />` |
| Child wrapper | `SizedBox(child: …)` | JSX children |
| `SizedBox.expand` | Named constructor | `width="100%" height="100%"` (v1) |
| `SizedBox.shrink` | Named constructor | `width={0} height={0}` (v1) |
| Flex spacing | Often `SizedBox` between children | Prefer **`Row`/`Column` `gap`** extension |

**Flutter**

```dart
Column(
  children: [
    Text('Header'),
    SizedBox(height: 16),
    Text('Body'),
  ],
)

SizedBox(
  width: 48,
  height: 48,
  child: Avatar(),
)
```

**qwik-flutter-ui**

```tsx
<Column gap={16}>
  <Text>Header</Text>
  <Text>Body</Text>
</Column>

<SizedBox width={48} height={48}>
  <Container width="100%" height="100%" backgroundColor="#6366f1" borderRadius={8} />
</SizedBox>
```

**Similarities:** Fixed dimensions, childless spacing, optional child.

**Differences:** HTML `<div>`. String `Length` for responsive CSS. No named constructors — use explicit dimensions. Library recommends **`gap`** on flex widgets where spacing is uniform.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Spacer](/docs/widgets/layout/spacer) | Flexible empty space in flex layouts. |
| [Expanded](/docs/widgets/layout/expanded) | Child fills remaining main-axis space. |
| [Flexible](/docs/widgets/layout/flexible) | Loose-fit flex child. |
| [Container](/docs/widgets/layout/container) | Sized, decorated box — not for bare gaps. |
| [Row](/docs/widgets/layout/row) | Horizontal parent; use `gap` or horizontal `SizedBox`. |
| [Column](/docs/widgets/layout/column) | Vertical parent; use `gap` or vertical `SizedBox`. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: SizedBox
description: Fixed-width and fixed-height box for spacing, sizing, and empty gaps between layout siblings.
widget: SizedBox
category: layout
flutterEquivalent: SizedBox
status: shipped
related:
  - Spacer
  - Expanded
  - Flexible
  - Container
  - Row
  - Column
since: "0.0.1"
examples:
  - id: sizedbox-basic
    file: examples/sizedbox/basic.tsx
    category: basic
  - id: sizedbox-vertical-spacing
    file: examples/sizedbox/vertical-spacing.tsx
    category: common
  - id: sizedbox-horizontal-spacing
    file: examples/sizedbox/horizontal-spacing.tsx
    category: common
  - id: sizedbox-fixed-width
    file: examples/sizedbox/fixed-width.tsx
    category: common
  - id: sizedbox-fixed-height
    file: examples/sizedbox/fixed-height.tsx
    category: common
  - id: sizedbox-between-buttons
    file: examples/sizedbox/between-buttons.tsx
    category: common
  - id: sizedbox-between-fields
    file: examples/sizedbox/between-fields.tsx
    category: common
  - id: sizedbox-between-sections
    file: examples/sizedbox/between-sections.tsx
    category: common
  - id: sizedbox-between-cards
    file: examples/sizedbox/between-cards.tsx
    category: common
  - id: sizedbox-width-only
    file: examples/sizedbox/width-only.tsx
    category: variation
  - id: sizedbox-height-only
    file: examples/sizedbox/height-only.tsx
    category: variation
  - id: sizedbox-width-height
    file: examples/sizedbox/width-height.tsx
    category: variation
  - id: sizedbox-responsive-length
    file: examples/sizedbox/responsive-length.tsx
    category: variation
  - id: sizedbox-in-row
    file: examples/sizedbox/in-row.tsx
    category: composition
  - id: sizedbox-in-column
    file: examples/sizedbox/in-column.tsx
    category: composition
  - id: sizedbox-in-form
    file: examples/sizedbox/in-form.tsx
    category: composition
  - id: sizedbox-in-card
    file: examples/sizedbox/in-card.tsx
    category: composition
  - id: sizedbox-row-behavior
    file: examples/sizedbox/row-behavior.tsx
    category: common
  - id: sizedbox-column-behavior
    file: examples/sizedbox/column-behavior.tsx
    category: common
  - id: sizedbox-expanded-behavior
    file: examples/sizedbox/expanded-behavior.tsx
    category: common
  - id: sizedbox-anti-container
    file: examples/sizedbox/anti-container.tsx
    category: anti-pattern
  - id: sizedbox-anti-nesting
    file: examples/sizedbox/anti-nesting.tsx
    category: anti-pattern
  - id: sizedbox-anti-magic-values
    file: examples/sizedbox/anti-magic-values.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/sizedbox/` when the docs site is implemented.
