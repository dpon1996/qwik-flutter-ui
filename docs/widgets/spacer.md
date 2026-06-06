---
title: Spacer
description: Empty flexible spacer that consumes leftover main-axis space inside Row and Column.
widget: Spacer
category: layout
flutterEquivalent: Spacer
status: shipped
related:
  - SizedBox
  - Expanded
  - Flexible
  - Row
  - Column
since: "0.0.1"
examples:
  - id: spacer-basic
    file: examples/spacer/basic.tsx
    category: basic
  - id: spacer-push-apart
    file: examples/spacer/push-apart.tsx
    category: common
  - id: spacer-navigation
    file: examples/spacer/navigation.tsx
    category: common
  - id: spacer-toolbar
    file: examples/spacer/toolbar.tsx
    category: common
  - id: spacer-form-actions
    file: examples/spacer/form-actions.tsx
    category: common
  - id: spacer-single
    file: examples/spacer/single.tsx
    category: variation
  - id: spacer-multiple
    file: examples/spacer/multiple.tsx
    category: variation
  - id: spacer-flex-values
    file: examples/spacer/flex-values.tsx
    category: variation
  - id: spacer-in-row
    file: examples/spacer/in-row.tsx
    category: composition
  - id: spacer-in-column
    file: examples/spacer/in-column.tsx
    category: composition
  - id: spacer-app-bar-style
    file: examples/spacer/app-bar-style.tsx
    category: composition
  - id: spacer-card-actions
    file: examples/spacer/card-actions.tsx
    category: composition
  - id: spacer-vs-sizedbox
    file: examples/spacer/vs-sizedbox.tsx
    category: common
  - id: spacer-vs-expanded
    file: examples/spacer/vs-expanded.tsx
    category: common
  - id: spacer-vs-flexible
    file: examples/spacer/vs-flexible.tsx
    category: common
  - id: spacer-anti-no-flex
    file: examples/spacer/anti-no-flex.tsx
    category: anti-pattern
  - id: spacer-anti-many
    file: examples/spacer/anti-many.tsx
    category: anti-pattern
  - id: spacer-anti-hacks
    file: examples/spacer/anti-hacks.tsx
    category: anti-pattern
---

# Spacer

## Overview

`Spacer` is an **empty flexible widget** that expands along the **main axis** of a `Row` or `Column` to absorb leftover space. It maps to Flutter's [`Spacer`](https://api.flutter.dev/flutter/widgets/Spacer-class.html).

Use `Spacer` when siblings should stay at the edges of a flex container while the middle stretches — title left / actions right, header top / footer bottom, or proportional gaps between items.

### Flexible spacing model

| Concept | Behavior |
| --- | --- |
| **Flexible spacing** | Grows to fill unused main-axis space |
| **Consuming remaining space** | Takes space after fixed-size siblings layout |
| **Layout balancing** | Multiple `Spacer` widgets split leftover space by **`flex`** ratio |

`Spacer` has **no children**. It only reserves flexible empty space.

### Spacer vs SizedBox vs Expanded vs Flexible

| Widget | Space type | Has child | Use when |
| --- | --- | --- | --- |
| **`Spacer`** | **Flexible** (grow) | No | Push siblings apart; empty flexible gap |
| **`SizedBox`** | **Fixed** | Optional | Exact px/rem/% gap or fixed wrapper |
| **`Expanded`** | Flexible (tight) | Yes | Child must **fill** remaining space |
| **`Flexible`** | Flexible (loose) | Yes | Child **participates** in flex but keeps natural size |

`Spacer` is **`Expanded` without content** — flexible empty room on the main axis.

---

## Import

```tsx
import { Spacer } from "qwik-flutter-ui";
```

Import layout widgets when examples use them:

```tsx
import {
  Row,
  Spacer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

Push two labels to opposite ends of a row.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Row, Spacer, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row>
      <Text>Left</Text>
      <Spacer />
      <Text>Right</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-basic`).

---

## Common Usage

### Push Actions Apart

Keep a label at the start and actions at the end.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, ButtonVariant, Row, Spacer, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row>
      <Text>Document.pdf</Text>
      <Spacer />
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Share
      </Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-push-apart`).

---

### Navigation Layout

Back control on the left, title area, trailing actions on the right.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  FontWeight,
  Row,
  Spacer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        ← Back
      </Button>
      <Text fontWeight={FontWeight.bold}>Settings</Text>
      <Spacer />
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Save
      </Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-navigation`).

---

### Toolbar Layout

Fixed tools on the left, flexible empty space, utility action on the right.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, ButtonVariant, Row, Spacer, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={4}>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Bold
      </Button>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Italic
      </Button>
      <Spacer />
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        More
      </Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-toolbar`).

---

### Form Actions

Push secondary and primary buttons to the trailing edge.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Row,
  Spacer,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Spacer />
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Cancel
      </Button>
      <Button type="submit">Save</Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-form-actions`).

---

## Flex Behavior

### How Spacer consumes space

Inside a `Row` or `Column`, `Spacer` receives a share of **remaining main-axis space** after siblings with intrinsic or fixed sizes layout. Default **`flex={1}`**. Multiple spacers divide leftover space in proportion to their `flex` values.

### Interaction with Row

`Spacer` grows **horizontally** — pushes items to the left and right edges.

### Interaction with Column

`Spacer` grows **vertically** — pushes items toward the top and bottom (useful for footer pinning when the column has bounded height).

### Single Spacer

One flexible region between two siblings.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Row, Spacer, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row>
      <Text>Start</Text>
      <Spacer />
      <Text>End</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-single`).

---

### Multiple Spacers

Two spacers split the middle space equally (default `flex={1}` each).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Row, Spacer, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row>
      <Text>A</Text>
      <Spacer />
      <Text>B</Text>
      <Spacer />
      <Text>C</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-multiple`).

---

### Different Flex Values

Uneven split: first gap twice as wide as the second.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Row, Spacer, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row>
      <Text>A</Text>
      <Spacer flex={2} />
      <Text>B</Text>
      <Spacer flex={1} />
      <Text>C</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-flex-values`).

**Visual difference:** With `flex={2}` and `flex={1}`, the space between A–B is twice the space between B–C.

---

## Composition

### Spacer inside Row

Primary horizontal pattern — leading content, flexible middle, trailing content.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Row, Spacer, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row>
      <Text>Label</Text>
      <Spacer />
      <Text>Value</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-in-row`).

---

### Spacer inside Column

Pin footer content when the column has a bounded height.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Container, Spacer, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container height={240} padding={16} backgroundColor="#f8fafc">
      <Column>
        <Text as="h2">Page</Text>
        <Text>Main content</Text>
        <Spacer />
        <Text color="#64748b">Footer note</Text>
      </Column>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-in-column`).

---

### AppBar-style layouts

Mirror toolbar spacing with `Row` + `Spacer`, or use `AppBar` `actions` for real app chrome.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { AppBar, Row, Spacer, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppBar
      title={
        <Row gap={8}>
          <Text>Home</Text>
          <Spacer />
          <Text color="#64748b">v1.0</Text>
        </Row>
      }
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-app-bar-style`).

---

### Card actions

Push card footer actions to the trailing edge.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Card,
  Column,
  Row,
  Spacer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Card padding={16}>
      <Column gap={12}>
        <Text>Upgrade to Pro for advanced widgets.</Text>
        <Row gap={8}>
          <Spacer />
          <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
            Later
          </Button>
          <Button type="button" onClick$={$(() => {})}>
            Upgrade
          </Button>
        </Row>
      </Column>
    </Card>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-card-actions`).

---

## Layout Comparisons

### SizedBox vs Spacer

**SizedBox** — fixed 16px gap (does not grow):

```tsx
<Row>
  <Text>A</Text>
  <SizedBox width={16} />
  <Text>B</Text>
</Row>
```

**Spacer** — absorbs all remaining horizontal space:

```tsx
<Row>
  <Text>A</Text>
  <Spacer />
  <Text>B</Text>
</Row>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-vs-sizedbox`).

Use **`SizedBox`** for known gaps; **`Spacer`** when the middle should stretch with viewport width.

---

### Spacer vs Expanded

**Spacer** — empty flexible space:

```tsx
<Row>
  <Text>Title</Text>
  <Spacer />
  <Button type="button">Action</Button>
</Row>
```

**Expanded** — flexible region **with content** that fills the slot:

```tsx
<Row gap={8}>
  <Text>Search</Text>
  <Expanded>
    <TextField decoration={{ placeholder: "Query…" }} />
  </Expanded>
</Row>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-vs-expanded`).

Use **`Expanded`** when a **widget** should grow; **`Spacer`** when the gap itself should grow.

---

### Spacer vs Flexible

**Spacer** — no child; pure flexible empty space.

**Flexible** — wraps a child that may stay at natural size while participating in flex distribution:

```tsx
<Row>
  <Flexible>
    <Text>Short label</Text>
  </Flexible>
  <Button type="button">Go</Button>
</Row>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: spacer-vs-flexible`).

Use **`Flexible`** when content needs flex behavior; **`Spacer`** when you only need empty space.

---

## Best Practices

### Use Spacer for flexible gaps

When trailing content should stick to the far edge and the middle should stretch:

```tsx
<Row>
  <Text>Title</Text>
  <Spacer />
  <Button type="button">Edit</Button>
</Row>
```

### Use SizedBox for fixed gaps

When the design specifies an exact distance, use **`SizedBox`** or **`Row gap`** / **`Column gap`**.

```tsx
<Row gap={8}>
  <Button type="button">Cancel</Button>
  <Button type="submit">Save</Button>
</Row>
```

### Keep spacing predictable

For evenly spaced items with no edge pinning, prefer **`mainAxisAlignment`** or **`gap`** instead of multiple spacers.

```tsx
import { MainAxisAlignment, Row, Text } from "qwik-flutter-ui";

<Row mainAxisAlignment={MainAxisAlignment.spaceBetween}>
  <Text>A</Text>
  <Text>B</Text>
  <Text>C</Text>
</Row>
```

---

## Anti-Patterns

### Using Spacer outside flex layouts

**Source** (avoid)

```tsx
<Container padding={16}>
  <Text>Top</Text>
  <Spacer />
  <Text>Bottom</Text>
</Container>
```

**Preferred**

```tsx
<Column>
  <Text>Top</Text>
  <Spacer />
  <Text>Bottom</Text>
</Column>
```

**Why:** `Spacer` only works inside **`Row`** or **`Column`**. Outside a flex parent it has **no effect** (silent no-op).

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: spacer-anti-no-flex`, `preview: false`).

---

### Using multiple unnecessary Spacers

**Source** (avoid)

```tsx
<Row>
  <Text>A</Text>
  <Spacer />
  <Text>B</Text>
  <Spacer />
  <Text>C</Text>
</Row>
```

**Preferred** (when equal distribution is the goal)

```tsx
import { MainAxisAlignment, Row, Text } from "qwik-flutter-ui";

<Row mainAxisAlignment={MainAxisAlignment.spaceEvenly}>
  <Text>A</Text>
  <Text>B</Text>
  <Text>C</Text>
</Row>
```

**Why:** Multiple spacers are for **proportional** gaps, not general alignment. Use alignment enums when siblings should distribute evenly.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: spacer-anti-many`, `preview: false`).

---

### Replacing layout structure with Spacer hacks

**Source** (avoid)

```tsx
<Column>
  <Spacer />
  <Spacer />
  <Spacer />
  <Text>Content buried by spacers</Text>
</Column>
```

**Preferred**

```tsx
import { Column, MainAxisAlignment, Text } from "qwik-flutter-ui";

<Column mainAxisAlignment={MainAxisAlignment.center}>
  <Text>Centered content</Text>
</Column>
```

**Why:** Alignment props express intent directly. Stacking spacers obscures layout and breaks when the parent lacks height.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: spacer-anti-hacks`, `preview: false`).

---

## Accessibility

### Semantic neutrality

`Spacer` renders an **empty `<div>`** with flex grow styles. It carries no text, role, or landmark semantics.

### Screen reader behavior

Empty spacers are **not announced** as content. Ensure meaningful labels live in **`Text`**, **`Button`**, and form fields — not in spacer elements.

Do not use `Spacer` to create visual-only separation that should be described to assistive technology; put explanatory copy in visible text.

---

## SSR

### Static rendering

`Spacer` renders an empty `<div>` with flex-related inline styles on the server. Layout is complete after SSR when the parent `Row` / `Column` provides flex context.

### Resumability compatibility

`Spacer` is stateless — no event handlers or client hooks. No mandatory hydration JavaScript for spacing behavior.

---

## Flutter Equivalent

| Topic | Flutter `Spacer` | qwik-flutter-ui `Spacer` |
| --- | --- | --- |
| Purpose | Flexible empty space in flex | Same |
| Parent | `Row` / `Column` | Same |
| `flex` prop | Default `1` | Default `1` |
| Children | None | None (no slot) |
| Outside flex | No effect | Silent no-op |

**Flutter**

```dart
Row(
  children: [
    Text('Left'),
    Spacer(),
    Text('Right'),
  ],
)
```

**qwik-flutter-ui**

```tsx
<Row>
  <Text>Left</Text>
  <Spacer />
  <Text>Right</Text>
</Row>
```

**Similarities:** Same API surface (`flex`), same parent widgets, same push-apart idiom.

**Differences:** Renders HTML `<div>`. No dev warning when used outside flex (silent no-op). Prefer **`Row gap` / `Column gap`** for uniform fixed spacing (library extension).

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [SizedBox](/docs/widgets/layout/sized-box) | Fixed-size gap or wrapper — does not grow. |
| [Expanded](/docs/widgets/layout/expanded) | Flexible region **with a child** that fills space. |
| [Flexible](/docs/widgets/layout/flexible) | Flexible wrapper allowing natural child size. |
| [Row](/docs/widgets/layout/row) | Horizontal flex parent for `Spacer`. |
| [Column](/docs/widgets/layout/column) | Vertical flex parent for `Spacer`. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Spacer
description: Empty flexible spacer that consumes leftover main-axis space inside Row and Column.
widget: Spacer
category: layout
flutterEquivalent: Spacer
status: shipped
related:
  - SizedBox
  - Expanded
  - Flexible
  - Row
  - Column
since: "0.0.1"
examples:
  - id: spacer-basic
    file: examples/spacer/basic.tsx
    category: basic
  - id: spacer-push-apart
    file: examples/spacer/push-apart.tsx
    category: common
  - id: spacer-navigation
    file: examples/spacer/navigation.tsx
    category: common
  - id: spacer-toolbar
    file: examples/spacer/toolbar.tsx
    category: common
  - id: spacer-form-actions
    file: examples/spacer/form-actions.tsx
    category: common
  - id: spacer-single
    file: examples/spacer/single.tsx
    category: variation
  - id: spacer-multiple
    file: examples/spacer/multiple.tsx
    category: variation
  - id: spacer-flex-values
    file: examples/spacer/flex-values.tsx
    category: variation
  - id: spacer-in-row
    file: examples/spacer/in-row.tsx
    category: composition
  - id: spacer-in-column
    file: examples/spacer/in-column.tsx
    category: composition
  - id: spacer-app-bar-style
    file: examples/spacer/app-bar-style.tsx
    category: composition
  - id: spacer-card-actions
    file: examples/spacer/card-actions.tsx
    category: composition
  - id: spacer-vs-sizedbox
    file: examples/spacer/vs-sizedbox.tsx
    category: common
  - id: spacer-vs-expanded
    file: examples/spacer/vs-expanded.tsx
    category: common
  - id: spacer-vs-flexible
    file: examples/spacer/vs-flexible.tsx
    category: common
  - id: spacer-anti-no-flex
    file: examples/spacer/anti-no-flex.tsx
    category: anti-pattern
  - id: spacer-anti-many
    file: examples/spacer/anti-many.tsx
    category: anti-pattern
  - id: spacer-anti-hacks
    file: examples/spacer/anti-hacks.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/spacer/` when the docs site is implemented.
