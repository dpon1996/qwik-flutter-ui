---
title: Flexible
description: Loose-fit flex wrapper that lets its child participate in proportional space distribution without forced fill.
widget: Flexible
category: layout
flutterEquivalent: Flexible
status: shipped
related:
  - Expanded
  - Spacer
  - SizedBox
  - Row
  - Column
since: "0.0.1"
examples:
  - id: flexible-basic
    file: examples/flexible/basic.tsx
    category: basic
  - id: flexible-mixed-fixed
    file: examples/flexible/mixed-fixed.tsx
    category: common
  - id: flexible-sidebar
    file: examples/flexible/sidebar.tsx
    category: common
  - id: flexible-form
    file: examples/flexible/form.tsx
    category: common
  - id: flexible-dashboard
    file: examples/flexible/dashboard.tsx
    category: common
  - id: flexible-single
    file: examples/flexible/single.tsx
    category: variation
  - id: flexible-multiple
    file: examples/flexible/multiple.tsx
    category: variation
  - id: flexible-flex-values
    file: examples/flexible/flex-values.tsx
    category: variation
  - id: flexible-vs-expanded-expanded
    file: examples/flexible/vs-expanded-expanded.tsx
    category: common
  - id: flexible-vs-expanded-flexible
    file: examples/flexible/vs-expanded-flexible.tsx
    category: common
  - id: flexible-vs-expanded-side-by-side
    file: examples/flexible/vs-expanded-side-by-side.tsx
    category: common
  - id: flexible-in-row
    file: examples/flexible/in-row.tsx
    category: composition
  - id: flexible-in-column
    file: examples/flexible/in-column.tsx
    category: composition
  - id: flexible-dashboard-composition
    file: examples/flexible/dashboard-composition.tsx
    category: composition
  - id: flexible-form-composition
    file: examples/flexible/form-composition.tsx
    category: composition
  - id: flexible-sidebar-content
    file: examples/flexible/sidebar-content.tsx
    category: common
  - id: flexible-dashboard-cards
    file: examples/flexible/dashboard-cards.tsx
    category: common
  - id: flexible-adaptive-panels
    file: examples/flexible/adaptive-panels.tsx
    category: common
  - id: flexible-anti-no-flex
    file: examples/flexible/anti-no-flex.tsx
    category: anti-pattern
  - id: flexible-anti-width-conflict
    file: examples/flexible/anti-width-conflict.tsx
    category: anti-pattern
  - id: flexible-anti-hacks
    file: examples/flexible/anti-hacks.tsx
    category: anti-pattern
---

# Flexible

## Overview

`Flexible` is a **loose-fit flex child wrapper** that lets its **single child** participate in proportional space distribution along the **main axis** of a `Row` or `Column` **without forcing the child to fill** that allocation. It maps to Flutter's [`Flexible`](https://api.flutter.dev/flutter/widgets/Flexible-class.html) with default loose fit.

Use `Flexible` when content should **share flex space proportionally** but may keep its **natural (intrinsic) size** — compact labels beside actions, tag chips that shrink on narrow viewports, or dashboard tiles that grow in ratio without stretching inner content.

### Proportional layout model

| Concept | Behavior |
| --- | --- |
| **Flexible sizing** | Participates in flex distribution; child size is not forced to the allocation |
| **Proportional layouts** | Multiple `Flexible` siblings split space by **`flex`** ratio |
| **Optional growth** | Child grows only as much as its content needs, up to its flex share |

`Flexible` wraps **content**. For mandatory fill behavior, use **`Expanded`** instead.

### Flexible vs Expanded vs Spacer vs SizedBox

| Widget | Space type | Has child | Use when |
| --- | --- | --- | --- |
| **`Flexible`** | Flexible (loose) | Yes | Child **participates** in flex but keeps natural size |
| **`Expanded`** | Flexible (tight) | Yes | Child must **fill** its flex allocation |
| **`Spacer`** | Flexible (grow) | No | Empty flexible gap; push siblings apart |
| **`SizedBox`** | Fixed | Optional | Exact px/rem/% gap or fixed wrapper |

---

## Import

```tsx
import { Flexible } from "qwik-flutter-ui";
```

Import layout widgets when examples use them:

```tsx
import {
  Column,
  Container,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

A short label participates in flex beside a fixed sibling.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Flexible, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Flexible>
        <Text>Short label</Text>
      </Flexible>
      <Text>Fixed action</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-basic`).

---

## Common Usage

### Mixed Fixed + Flexible Layout

Fixed avatar, flexible username that may shrink, fixed button.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Container,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={12}>
      <Container width={40} height={40} backgroundColor="#cbd5e1" borderRadius={20} />
      <Flexible flex={1}>
        <Text>alexandra.morgan@example.com</Text>
      </Flexible>
      <Button type="button" onClick$={$(() => {})}>
        Follow
      </Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-mixed-fixed`).

---

### Sidebar Layout

Fixed sidebar; main region uses `Expanded` for fill; nav labels use `Flexible` so items do not stretch.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row style={{ height: 280 }}>
      <Container width={200} padding={16} backgroundColor="#f8fafc">
        <Column gap={8}>
          <Flexible>
            <Text>Dashboard</Text>
          </Flexible>
          <Flexible>
            <Text>Reports</Text>
          </Flexible>
          <Flexible>
            <Text>Settings</Text>
          </Flexible>
        </Column>
      </Container>
      <Expanded>
        <Container padding={16}>
          <Text>Main content fills remaining width.</Text>
        </Container>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-sidebar`).

---

### Form Layout

Fixed label column; tag chips use natural width inside `Flexible`; input fills with `Expanded`.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  Flexible,
  Row,
  Text,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={12}>
      <Row gap={12}>
        <Container width={80}>
          <Text>Tags</Text>
        </Container>
        <Flexible>
          <Row gap={4}>
            <Container padding={4} backgroundColor="#e2e8f0" borderRadius={4}>
              <Text>React</Text>
            </Container>
            <Container padding={4} backgroundColor="#e2e8f0" borderRadius={4}>
              <Text>Qwik</Text>
            </Container>
          </Row>
        </Flexible>
        <Expanded>
          <TextField decoration={{ placeholder: "Add tag…" }} />
        </Expanded>
      </Row>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-form`).

---

### Dashboard Layout

Metric cards share space proportionally; chart panel fills with `Expanded`.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Column,
  Container,
  Expanded,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={16} style={{ height: 320 }}>
      <Row gap={12} style={{ height: 80 }}>
        <Flexible flex={1}>
          <Card padding={12}>
            <Text>Users</Text>
            <Text>1,204</Text>
          </Card>
        </Flexible>
        <Flexible flex={1}>
          <Card padding={12}>
            <Text>Revenue</Text>
            <Text>$8.2k</Text>
          </Card>
        </Flexible>
        <Flexible flex={1}>
          <Card padding={12}>
            <Text>Orders</Text>
            <Text>342</Text>
          </Card>
        </Flexible>
      </Row>
      <Expanded>
        <Card padding={16}>
          <Container padding={16} backgroundColor="#f8fafc">
            <Text>Chart area fills remaining height.</Text>
          </Container>
        </Card>
      </Expanded>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-dashboard`).

---

## Flex Behavior

### How Flexible participates in space

Inside a `Row` or `Column`, `Flexible` receives a share of **remaining main-axis space** after fixed-size siblings layout. Default **`flex={1}`**. Unlike `Expanded`, the **child keeps its natural size** within that allocation and can shrink when space is tight.

### Interaction with Row

`Flexible` distributes **horizontal** flex shares. Content stays at intrinsic width unless the viewport forces shrinkage.

### Interaction with Column

`Flexible` distributes **vertical** flex shares. Useful when a section should participate in height distribution without forcing inner content to stretch.

### Loose vs tight fit

| Fit | Widget | Child behavior |
| --- | --- | --- |
| **Loose** | `Flexible` | Natural/intrinsic size; may use less than the flex allocation |
| **Tight** | `Expanded` | Must fill the full flex allocation |

In qwik-flutter-ui, **`Flexible` is always loose fit**. Use **`Expanded`** when tight fill is required.

### Single Flexible

One flexible region beside fixed siblings.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Flexible, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Text>Status:</Text>
      <Flexible>
        <Text>Online — natural width</Text>
      </Flexible>
      <Text>⋮</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-single`).

---

### Multiple Flexible

Two `Flexible` siblings with default `flex={1}` share leftover space equally.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8} style={{ height: 80 }}>
      <Flexible flex={1}>
        <Container padding={12} backgroundColor="#dbeafe">
          <Text>Panel A</Text>
        </Container>
      </Flexible>
      <Flexible flex={1}>
        <Container padding={12} backgroundColor="#bfdbfe">
          <Text>Panel B</Text>
        </Container>
      </Flexible>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-multiple`).

---

### Different Flex Values

Three panels with **`flex={1}`**, **`flex={2}`**, and **`flex={3}`** — space divides 1:2:3.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8} style={{ height: 100 }}>
      <Flexible flex={1}>
        <Container padding={12} backgroundColor="#fecaca">
          <Text>flex: 1</Text>
        </Container>
      </Flexible>
      <Flexible flex={2}>
        <Container padding={12} backgroundColor="#fca5a5">
          <Text>flex: 2</Text>
        </Container>
      </Flexible>
      <Flexible flex={3}>
        <Container padding={12} backgroundColor="#f87171">
          <Text>flex: 3</Text>
        </Container>
      </Flexible>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-flex-values`).

**Visual difference:** With `flex={1}`, `flex={2}`, and `flex={3}`, the middle panel receives twice the flex share of the first, and the third receives three times the share of the first.

---

## Flexible vs Expanded

### Expanded

Child **must fill** its flex allocation — use for inputs, main content, and scroll regions.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Expanded,
  Row,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8} style={{ height: 48 }}>
      <Expanded>
        <TextField decoration={{ placeholder: "Search…" }} />
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-vs-expanded-expanded`).

---

### Flexible

Child **keeps natural size** while participating in flex — use for labels, chips, and compact content.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Flexible, Row, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Flexible>
        <Text>Compact label</Text>
      </Flexible>
      <Text>Action</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-vs-expanded-flexible`).

---

### Side-by-Side Comparison

Same row structure; only the wrapper differs.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={16}>
      <Row gap={8} style={{ height: 64 }}>
        <Text>Expanded:</Text>
        <Expanded>
          <Container padding={8} backgroundColor="#dbeafe">
            <Text>Stretches to fill</Text>
          </Container>
        </Expanded>
      </Row>
      <Row gap={8} style={{ height: 64 }}>
        <Text>Flexible:</Text>
        <Flexible flex={1}>
          <Container padding={8} backgroundColor="#fef3c7">
            <Text>Natural width</Text>
          </Container>
        </Flexible>
      </Row>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-vs-expanded-side-by-side`).

| Prefer **`Expanded`** | Prefer **`Flexible`** |
| --- | --- |
| Search fields and text inputs | Short labels and status text |
| Main content beside a sidebar | Tag chips and compact badges |
| Scrollable regions between chrome | Toolbar items at intrinsic size |
| Equal-width panels that must fill | Content that may shrink on narrow viewports |

---

## Composition

### Flexible inside Row

Share horizontal space without forcing children to stretch.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Container padding={8} backgroundColor="#e2e8f0" borderRadius={4}>
        <Text>Pro</Text>
      </Container>
      <Flexible flex={1}>
        <Text>Member since 2024</Text>
      </Flexible>
      <Text>⋮</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-in-row`).

---

### Flexible inside Column

Section participates in vertical flex without filling unused height.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Flexible, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column style={{ height: 200 }} gap={8}>
      <Text>Header</Text>
      <Flexible>
        <Text>Optional section — natural height</Text>
      </Flexible>
      <Text>Footer</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-in-column`).

---

### Dashboard layouts

Combine `Flexible` metric tiles with `Expanded` chart area.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Column,
  Container,
  Expanded,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={12} style={{ height: 240 }}>
      <Row gap={8}>
        <Flexible flex={1}>
          <Card padding={12}>
            <Text>Active</Text>
          </Card>
        </Flexible>
        <Flexible flex={1}>
          <Card padding={12}>
            <Text>Pending</Text>
          </Card>
        </Flexible>
      </Row>
      <Expanded>
        <Card padding={16}>
          <Container padding={12} backgroundColor="#f8fafc">
            <Text>Trend chart</Text>
          </Container>
        </Card>
      </Expanded>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-dashboard-composition`).

---

### Form layouts

Pair fixed labels, `Flexible` chip rows, and `Expanded` inputs on one row.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  Flexible,
  Row,
  Text,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={12}>
      <Row gap={12}>
        <Container width={72}>
          <Text>Email</Text>
        </Container>
        <Expanded>
          <TextField decoration={{ placeholder: "you@example.com" }} />
        </Expanded>
      </Row>
      <Row gap={12}>
        <Container width={72}>
          <Text>Role</Text>
        </Container>
        <Flexible>
          <Container padding={4} backgroundColor="#e2e8f0" borderRadius={4}>
            <Text>Editor</Text>
          </Container>
        </Flexible>
      </Row>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-form-composition`).

---

## Responsive Layouts

### Content + Sidebar

Fixed sidebar; flexible status line; expanded main pane.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row style={{ minHeight: 200 }}>
      <Container width={180} padding={16} backgroundColor="#1e293b">
        <Text color="#f8fafc">Nav</Text>
      </Container>
      <Expanded>
        <Column gap={8}>
          <Container padding={16}>
            <Row gap={8}>
              <Flexible>
                <Text color="#64748b">Last synced: 2 min ago</Text>
              </Flexible>
            </Row>
          </Container>
          <Expanded>
            <Container padding={16}>
              <Text>Main content adapts to viewport width.</Text>
            </Container>
          </Expanded>
        </Column>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-sidebar-content`).

---

### Dashboard Cards

Weighted `Flexible` cards scale proportionally on wider screens.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={12}>
      <Flexible flex={1}>
        <Card padding={16}>
          <Text>Sessions</Text>
          <Text>842</Text>
        </Card>
      </Flexible>
      <Flexible flex={2}>
        <Card padding={16}>
          <Text>Conversion</Text>
          <Text>12.4%</Text>
        </Card>
      </Flexible>
      <Flexible flex={1}>
        <Card padding={16}>
          <Text>Bounce</Text>
          <Text>38%</Text>
        </Card>
      </Flexible>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-dashboard-cards`).

---

### Adaptive Panels

Asymmetric flex ratios for primary vs secondary panels.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Container,
  Flexible,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={16} style={{ height: 180 }}>
      <Flexible flex={1}>
        <Card padding={16}>
          <Text>Secondary</Text>
        </Card>
      </Flexible>
      <Flexible flex={3}>
        <Card padding={16}>
          <Container padding={12} backgroundColor="#f8fafc">
            <Text>Primary panel — three times the flex share.</Text>
          </Container>
        </Card>
      </Flexible>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: flexible-adaptive-panels`).

---

## Best Practices

### Use Expanded when fill is required

Inputs, main panes, and equal columns that must stretch:

```tsx
import { Expanded, Row, TextField } from "qwik-flutter-ui";

<Row gap={8}>
  <Expanded>
    <TextField decoration={{ placeholder: "Filter…" }} />
  </Expanded>
</Row>
```

### Use Flexible when content may shrink

Labels, chips, and compact items that participate in flex without forced growth:

```tsx
import { Flexible, Row, Text } from "qwik-flutter-ui";

<Row gap={8}>
  <Flexible flex={1}>
    <Text>Long username@example.com</Text>
  </Flexible>
  <Text>Edit</Text>
</Row>
```

### Keep flex ratios meaningful

Express intentional proportions with explicit `flex` values:

```tsx
import { Flexible, Row } from "qwik-flutter-ui";

<Row gap={8}>
  <Flexible flex={1}>…</Flexible>
  <Flexible flex={3}>…</Flexible>
</Row>
```

Avoid arbitrary ratios that do not match the design hierarchy.

---

## Anti-Patterns

### Flexible outside flex layouts

**Source** (avoid)

```tsx
<Container padding={16}>
  <Flexible>
    <Text>No flex parent — flex grow has no effect.</Text>
  </Flexible>
</Container>
```

**Preferred**

```tsx
import { Column, Container, Flexible, Text } from "qwik-flutter-ui";

<Container padding={16}>
  <Column>
    <Flexible>
      <Text>Inside a Column flex parent.</Text>
    </Flexible>
  </Column>
</Container>
```

**Why:** `Flexible` only distributes space inside **`Row`** or **`Column`**. Outside a flex parent, flex grow is a **silent no-op**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: flexible-anti-no-flex`, `preview: false`).

---

### Conflicting width constraints

**Source** (avoid)

```tsx
<Row>
  <Flexible flex={1}>
    <Container width={600}>
      <Text>Fixed 600px inside Flexible</Text>
    </Container>
  </Flexible>
</Row>
```

**Preferred**

```tsx
import { Container, Expanded, Row, Text } from "qwik-flutter-ui";

<Row>
  <Expanded>
    <Container padding={16}>
      <Text>Let flex control width; use maxWidth to cap if needed.</Text>
    </Container>
  </Expanded>
</Row>
```

**Why:** Hard-coded widths on flex children fight proportional distribution. Use **`Expanded`** when fill is intended; use **`maxWidth`** on `Container` when capping is required.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: flexible-anti-width-conflict`, `preview: false`).

---

### Replacing layout structure with flex hacks

**Source** (avoid)

```tsx
<Row>
  <Flexible flex={1} />
  <Flexible flex={1} />
  <Text>Centered with empty flex wrappers</Text>
  <Flexible flex={1} />
</Row>
```

**Preferred**

```tsx
import { MainAxisAlignment, Row, Text } from "qwik-flutter-ui";

<Row mainAxisAlignment={MainAxisAlignment.center}>
  <Text>Centered content</Text>
</Row>
```

**Why:** Empty `Flexible` wrappers obscure intent. Use **`mainAxisAlignment`**, **`Spacer`**, or **`Expanded`** for the actual layout goal.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: flexible-anti-hacks`, `preview: false`).

---

## Accessibility

### Semantic neutrality

`Flexible` renders a **`<div>` wrapper** around its child. It does not introduce landmarks, labels, or roles by itself.

### Screen reader behavior

Assistive technology reads the **child content**, not the `Flexible` wrapper. Put labels on **`TextField`**, **`Button`**, and semantic elements inside the child — not on `Flexible`.

When `Flexible` wraps interactive controls, ensure the child exposes the correct native semantics (e.g. `<input>`, `<button>`).

---

## SSR

### Static rendering

`Flexible` renders a `<div>` with flex-related inline styles on the server. Layout is complete after SSR when the parent `Row` / `Column` provides flex context.

### Resumability compatibility

`Flexible` is stateless — no event handlers or client hooks. No mandatory hydration JavaScript for flex participation behavior.

---

## Flutter Equivalent

| Topic | Flutter `Flexible` | qwik-flutter-ui `Flexible` |
| --- | --- | --- |
| Purpose | Loose-fit flex child | Same |
| Parent | `Row` / `Column` | Same |
| `flex` prop | Default `1` | Default `1` |
| Fit | Default `FlexFit.loose` | Loose fit only |
| Tight fill | Use `Expanded` or `Flexible(fit: tight)` | Use **`Expanded`** |
| Outside flex | No effect | Silent no-op |

**Flutter**

```dart
Row(
  children: [
    Flexible(
      flex: 1,
      child: Text('Short label'),
    ),
    Text('Action'),
  ],
)
```

**qwik-flutter-ui**

```tsx
<Row gap={8}>
  <Flexible flex={1}>
    <Text>Short label</Text>
  </Flexible>
  <Text>Action</Text>
</Row>
```

**Similarities:** Same `flex` API, same parent widgets, same loose-fit default behavior.

**Differences:** Renders HTML `<div>`. No `fit` prop — use **`Expanded`** for tight fill. No dev warning when used outside flex (silent no-op). Prefer **`Row gap` / `Column gap`** for uniform fixed spacing between siblings.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Expanded](/docs/widgets/layout/expanded) | Tight-fit flex wrapper — child must fill allocation. |
| [Spacer](/docs/widgets/layout/spacer) | Empty flexible gap — no child content. |
| [SizedBox](/docs/widgets/layout/sized-box) | Fixed-size gap or wrapper — does not grow. |
| [Row](/docs/widgets/layout/row) | Horizontal flex parent for `Flexible`. |
| [Column](/docs/widgets/layout/column) | Vertical flex parent for `Flexible`. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Flexible
description: Loose-fit flex wrapper that lets its child participate in proportional space distribution without forced fill.
widget: Flexible
category: layout
flutterEquivalent: Flexible
status: shipped
related:
  - Expanded
  - Spacer
  - SizedBox
  - Row
  - Column
since: "0.0.1"
examples:
  - id: flexible-basic
    file: examples/flexible/basic.tsx
    category: basic
  - id: flexible-mixed-fixed
    file: examples/flexible/mixed-fixed.tsx
    category: common
  - id: flexible-sidebar
    file: examples/flexible/sidebar.tsx
    category: common
  - id: flexible-form
    file: examples/flexible/form.tsx
    category: common
  - id: flexible-dashboard
    file: examples/flexible/dashboard.tsx
    category: common
  - id: flexible-single
    file: examples/flexible/single.tsx
    category: variation
  - id: flexible-multiple
    file: examples/flexible/multiple.tsx
    category: variation
  - id: flexible-flex-values
    file: examples/flexible/flex-values.tsx
    category: variation
  - id: flexible-vs-expanded-expanded
    file: examples/flexible/vs-expanded-expanded.tsx
    category: common
  - id: flexible-vs-expanded-flexible
    file: examples/flexible/vs-expanded-flexible.tsx
    category: common
  - id: flexible-vs-expanded-side-by-side
    file: examples/flexible/vs-expanded-side-by-side.tsx
    category: common
  - id: flexible-in-row
    file: examples/flexible/in-row.tsx
    category: composition
  - id: flexible-in-column
    file: examples/flexible/in-column.tsx
    category: composition
  - id: flexible-dashboard-composition
    file: examples/flexible/dashboard-composition.tsx
    category: composition
  - id: flexible-form-composition
    file: examples/flexible/form-composition.tsx
    category: composition
  - id: flexible-sidebar-content
    file: examples/flexible/sidebar-content.tsx
    category: common
  - id: flexible-dashboard-cards
    file: examples/flexible/dashboard-cards.tsx
    category: common
  - id: flexible-adaptive-panels
    file: examples/flexible/adaptive-panels.tsx
    category: common
  - id: flexible-anti-no-flex
    file: examples/flexible/anti-no-flex.tsx
    category: anti-pattern
  - id: flexible-anti-width-conflict
    file: examples/flexible/anti-width-conflict.tsx
    category: anti-pattern
  - id: flexible-anti-hacks
    file: examples/flexible/anti-hacks.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/flexible/` when the docs site is implemented.
