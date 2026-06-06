---
title: Expanded
description: Flexible wrapper that forces its child to fill remaining main-axis space inside Row and Column.
widget: Expanded
category: layout
flutterEquivalent: Expanded
status: shipped
related:
  - Flexible
  - Spacer
  - Row
  - Column
  - SizedBox
since: "0.0.1"
examples:
  - id: expanded-basic
    file: examples/expanded/basic.tsx
    category: basic
  - id: expanded-two-columns
    file: examples/expanded/two-columns.tsx
    category: common
  - id: expanded-sidebar
    file: examples/expanded/sidebar.tsx
    category: common
  - id: expanded-form
    file: examples/expanded/form.tsx
    category: common
  - id: expanded-dashboard
    file: examples/expanded/dashboard.tsx
    category: common
  - id: expanded-single
    file: examples/expanded/single.tsx
    category: variation
  - id: expanded-multiple
    file: examples/expanded/multiple.tsx
    category: variation
  - id: expanded-flex-values
    file: examples/expanded/flex-values.tsx
    category: variation
  - id: expanded-in-row
    file: examples/expanded/in-row.tsx
    category: composition
  - id: expanded-in-column
    file: examples/expanded/in-column.tsx
    category: composition
  - id: expanded-appshell
    file: examples/expanded/appshell.tsx
    category: composition
  - id: expanded-card
    file: examples/expanded/card.tsx
    category: composition
  - id: expanded-vs-flexible
    file: examples/expanded/vs-flexible.tsx
    category: common
  - id: expanded-vs-spacer
    file: examples/expanded/vs-spacer.tsx
    category: common
  - id: expanded-vs-fixed-width
    file: examples/expanded/vs-fixed-width.tsx
    category: common
  - id: expanded-fluid
    file: examples/expanded/fluid.tsx
    category: common
  - id: expanded-sidebar-content
    file: examples/expanded/sidebar-content.tsx
    category: common
  - id: expanded-dashboard-panels
    file: examples/expanded/dashboard-panels.tsx
    category: common
  - id: expanded-anti-no-flex
    file: examples/expanded/anti-no-flex.tsx
    category: anti-pattern
  - id: expanded-anti-width-conflict
    file: examples/expanded/anti-width-conflict.tsx
    category: anti-pattern
  - id: expanded-anti-nesting
    file: examples/expanded/anti-nesting.tsx
    category: anti-pattern
---

# Expanded

## Overview

`Expanded` is a **flex child wrapper** that forces its **single child** to fill remaining space along the **main axis** of a `Row` or `Column`. It maps to Flutter's [`Expanded`](https://api.flutter.dev/flutter/widgets/Expanded-class.html).

Use `Expanded` when a widget should **grow with available space** — search fields in toolbars, main content beside a fixed sidebar, equal-width columns, or scrollable regions between header and footer.

### Fill-available-space model

| Concept | Behavior |
| --- | --- |
| **Filling remaining space** | Takes leftover main-axis room after fixed-size siblings layout |
| **Flex layouts** | Only participates inside `Row` / `Column` flex parents |
| **Responsive growth** | Share of space scales with viewport; ratios controlled by **`flex`** |

`Expanded` always wraps **content**. It is the tight-fit flex primitive for widgets that must stretch to their allocation.

### Expanded vs Flexible vs Spacer vs SizedBox

| Widget | Space type | Has child | Use when |
| --- | --- | --- | --- |
| **`Expanded`** | Flexible (tight) | Yes | Child must **fill** its flex allocation |
| **`Flexible`** | Flexible (loose) | Yes | Child **participates** in flex but keeps natural size |
| **`Spacer`** | Flexible (grow) | No | Empty flexible gap; push siblings apart |
| **`SizedBox`** | Fixed | Optional | Exact px/rem/% gap or fixed wrapper |

`Expanded` is **`Flexible` with tight fit** — the child grows to consume its assigned share.

---

## Import

```tsx
import { Expanded } from "qwik-flutter-ui";
```

Import layout widgets when examples use them:

```tsx
import {
  Column,
  Container,
  Expanded,
  Row,
  Text,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

A search field grows between a label and a button.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Expanded,
  Row,
  Text,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Text>Search</Text>
      <Expanded>
        <TextField decoration={{ placeholder: "Query…" }} />
      </Expanded>
      <Button type="button" onClick$={$(() => {})}>
        Go
      </Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-basic`).

---

## Common Usage

### Two Equal Columns

Split horizontal space evenly between two panels.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={16} style={{ height: 200 }}>
      <Expanded>
        <Container padding={16} backgroundColor="#f1f5f9">
          <Text>Left panel</Text>
        </Container>
      </Expanded>
      <Expanded>
        <Container padding={16} backgroundColor="#e2e8f0">
          <Text>Right panel</Text>
        </Container>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-two-columns`).

---

### Sidebar Layout

Fixed-width navigation beside fluid main content.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row style={{ height: 280 }}>
      <Container width={220} padding={16} backgroundColor="#f8fafc">
        <Column gap={8}>
          <Text>Dashboard</Text>
          <Text>Settings</Text>
          <Text>Profile</Text>
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

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-sidebar`).

---

### Form Layout

Label column stays fixed; inputs stretch on the same row.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  Row,
  Text,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={12}>
      <Row gap={12}>
        <Container width={100}>
          <Text>Name</Text>
        </Container>
        <Expanded>
          <TextField decoration={{ placeholder: "Full name" }} />
        </Expanded>
      </Row>
      <Row gap={12}>
        <Container width={100}>
          <Text>Email</Text>
        </Container>
        <Expanded>
          <TextField decoration={{ placeholder: "you@example.com" }} />
        </Expanded>
      </Row>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-form`).

---

### Dashboard Layout

Metric cards on top; primary chart area grows below.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Column,
  Container,
  Expanded,
  FontWeight,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={16} style={{ height: 360 }}>
      <Row gap={12} style={{ height: 100 }}>
        <Expanded>
          <Card padding={12}>
            <Text>Users</Text>
            <Text fontWeight={FontWeight.bold}>1,204</Text>
          </Card>
        </Expanded>
        <Expanded>
          <Card padding={12}>
            <Text>Revenue</Text>
            <Text fontWeight={FontWeight.bold}>$8.2k</Text>
          </Card>
        </Expanded>
        <Expanded>
          <Card padding={12}>
            <Text>Orders</Text>
            <Text fontWeight={FontWeight.bold}>342</Text>
          </Card>
        </Expanded>
      </Row>
      <Expanded>
        <Card padding={16}>
          <Container padding={16} backgroundColor="#f8fafc">
            <Text>Chart area grows with available height.</Text>
          </Container>
        </Card>
      </Expanded>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-dashboard`).

---

## Flex Behavior

### How Expanded consumes space

Inside a `Row` or `Column`, `Expanded` receives a share of **remaining main-axis space** after siblings with intrinsic or fixed sizes layout. Default **`flex={1}`**. Multiple `Expanded` siblings divide leftover space in proportion to their `flex` values. The child is **stretched** to fill that allocation.

### Interaction with Row

`Expanded` grows **horizontally** — ideal for fluid inputs, content columns, and main regions beside fixed sidebars.

### Interaction with Column

`Expanded` grows **vertically** — ideal for scrollable main areas between header and footer when the column has bounded height.

### Single Expanded

One flexible region between fixed siblings.

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
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Text>Label</Text>
      <Expanded>
        <Container padding={8} backgroundColor="#f1f5f9">
          <Text>Grows to fill</Text>
        </Container>
      </Expanded>
      <Text>Fixed</Text>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-single`).

---

### Multiple Expanded

Two equal `Expanded` siblings split space 50/50 (default `flex={1}` each).

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
  <ThemeProvider theme={{}}>
    <Row gap={8} style={{ height: 120 }}>
      <Expanded>
        <Container padding={12} backgroundColor="#dbeafe">
          <Text>A</Text>
        </Container>
      </Expanded>
      <Expanded>
        <Container padding={12} backgroundColor="#bfdbfe">
          <Text>B</Text>
        </Container>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-multiple`).

---

### Different Flex Values

Three panels with **`flex={1}`**, **`flex={2}`**, and **`flex={3}`** — space divides 1:2:3.

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
  <ThemeProvider theme={{}}>
    <Row gap={8} style={{ height: 100 }}>
      <Expanded flex={1}>
        <Container padding={12} backgroundColor="#fecaca">
          <Text>flex: 1</Text>
        </Container>
      </Expanded>
      <Expanded flex={2}>
        <Container padding={12} backgroundColor="#fca5a5">
          <Text>flex: 2</Text>
        </Container>
      </Expanded>
      <Expanded flex={3}>
        <Container padding={12} backgroundColor="#f87171">
          <Text>flex: 3</Text>
        </Container>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-flex-values`).

**Visual difference:** With `flex={1}`, `flex={2}`, and `flex={3}`, the middle panel is twice as wide as the first, and the third is three times as wide as the first.

---

## Composition

### Expanded inside Row

Primary horizontal pattern — fixed leading content, fluid middle, fixed trailing actions.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Expanded,
  Row,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Expanded>
        <TextField decoration={{ placeholder: "Filter results…" }} />
      </Expanded>
      <Button type="button" onClick$={$(() => {})}>
        Apply
      </Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-in-row`).

---

### Expanded inside Column

Main content grows between header and footer when the column has bounded height.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column style={{ height: 240 }}>
      <Text as="h2">Settings</Text>
      <Expanded>
        <Container padding={16} backgroundColor="#f8fafc">
          <Text>Main panel fills vertical space.</Text>
        </Container>
      </Expanded>
      <Text color="#64748b">Footer actions</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-in-column`).

---

### AppShell layouts

Pair `Expanded` with `AppShell` body content so the main region fills space below the app bar.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  Column,
  Expanded,
  SingleChildScrollView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppShell appBar={<AppBar title="Dashboard" />}>
      <Column style={{ height: "100%" }}>
        <Expanded>
          <SingleChildScrollView padding={16}>
            <Text>Scrollable main content inside a flex shell.</Text>
          </SingleChildScrollView>
        </Expanded>
      </Column>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-appshell`).

---

### Card layouts

Stretch card body content while keeping header and actions at natural height.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Card,
  Column,
  Container,
  Expanded,
  FontWeight,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Card padding={16} style={{ height: 220 }}>
      <Column gap={12} style={{ height: "100%" }}>
        <Text fontWeight={FontWeight.bold}>Project summary</Text>
        <Expanded>
          <Container padding={12} backgroundColor="#f8fafc">
            <Text>Details grow to fill the card body.</Text>
          </Container>
        </Expanded>
        <Row gap={8}>
          <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
            Dismiss
          </Button>
          <Button type="button" onClick$={$(() => {})}>
            Open
          </Button>
        </Row>
      </Column>
    </Card>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-card`).

---

## Layout Comparisons

### Expanded vs Flexible

**Expanded** — child fills the allocated flex space:

```tsx
<Row gap={8} style={{ height: 80 }}>
  <Expanded>
    <Container padding={8} backgroundColor="#dbeafe">
      <Text>Stretches to fill</Text>
    </Container>
  </Expanded>
  <Text>Action</Text>
</Row>
```

**Flexible** — child may stay at natural size while still participating in flex:

```tsx
import { Flexible, Row, Text } from "qwik-flutter-ui";

<Row gap={8}>
  <Flexible>
    <Text>Short label</Text>
  </Flexible>
  <Text>Action</Text>
</Row>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-vs-flexible`).

Use **`Expanded`** when the child must grow; **`Flexible`** when the child should shrink if needed but not be forced to fill.

---

### Expanded vs Spacer

**Expanded** — flexible region **with content** that fills the slot:

```tsx
<Row gap={8}>
  <Text>Search</Text>
  <Expanded>
    <TextField decoration={{ placeholder: "Query…" }} />
  </Expanded>
  <Button type="button">Go</Button>
</Row>
```

**Spacer** — empty flexible space between siblings:

```tsx
import { Row, Spacer, Text } from "qwik-flutter-ui";

<Row>
  <Text>Title</Text>
  <Spacer />
  <Text>Action</Text>
</Row>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-vs-spacer`).

Use **`Expanded`** when a **widget** should grow; **`Spacer`** when the gap itself should grow with no content.

---

### Expanded vs Fixed Width

**Expanded** — grows with remaining space:

```tsx
<Row>
  <Text>Title</Text>
  <Expanded>
    <TextField decoration={{ placeholder: "Filter…" }} />
  </Expanded>
</Row>
```

**Fixed width** — stays at the declared size:

```tsx
import { Container, Row, Text } from "qwik-flutter-ui";

<Row gap={8}>
  <Container width={200} padding={8} backgroundColor="#f1f5f9">
    <Text>Fixed 200px</Text>
  </Container>
  <Text>Does not grow</Text>
</Row>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-vs-fixed-width`).

Use **`Expanded`** for fluid layouts; **`Container width`** / **`SizedBox width`** when the design specifies an exact size.

---

## Responsive Layouts

### Fluid Layout

A full-width row where the input field adapts to viewport width.

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
    <Container padding={16}>
      <Row gap={8}>
        <Expanded>
          <TextField decoration={{ placeholder: "Search the catalog…" }} />
        </Expanded>
      </Row>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-fluid`).

---

### Sidebar + Content

Fixed sidebar; main pane scales on wider viewports.

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
  <ThemeProvider theme={{}}>
    <Row style={{ minHeight: 240 }}>
      <Container width={200} padding={16} backgroundColor="#1e293b">
        <Text color="#f8fafc">Nav</Text>
      </Container>
      <Expanded>
        <Container padding={24}>
          <Text>Content width follows the viewport.</Text>
        </Container>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-sidebar-content`).

---

### Dashboard Panels

Weighted columns (`flex={1}` and `flex={2}`) for asymmetric dashboards.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Container,
  Expanded,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={16} style={{ height: 200 }}>
      <Expanded flex={1}>
        <Card padding={16}>
          <Text>Sidebar widgets</Text>
        </Card>
      </Expanded>
      <Expanded flex={2}>
        <Card padding={16}>
          <Container padding={16} backgroundColor="#f8fafc">
            <Text>Primary chart — twice the width of the sidebar.</Text>
          </Container>
        </Card>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: expanded-dashboard-panels`).

---

## Best Practices

### Use Expanded for fill behavior

When a child must occupy all leftover main-axis space:

```tsx
<Row gap={8}>
  <Text>Filter</Text>
  <Expanded>
    <TextField decoration={{ placeholder: "Type to filter…" }} />
  </Expanded>
</Row>
```

### Use flex ratios intentionally

Express layout proportions explicitly instead of nesting wrappers:

```tsx
<Row gap={8}>
  <Expanded flex={1}>
    <Container padding={12}>Narrow</Container>
  </Expanded>
  <Expanded flex={3}>
    <Container padding={12}>Wide</Container>
  </Expanded>
</Row>
```

### Combine with Row and Column

`Expanded` only distributes space inside flex parents — build shells with `Row` for horizontal fill and `Column` for vertical fill:

```tsx
<Column style={{ height: 400 }}>
  <Text>Header</Text>
  <Expanded>
    <Container padding={16}>Main</Container>
  </Expanded>
  <Text>Footer</Text>
</Column>
```

---

## Anti-Patterns

### Expanded outside flex layouts

**Source** (avoid)

```tsx
<Container padding={16}>
  <Expanded>
    <Text>Will not fill the container as intended.</Text>
  </Expanded>
</Container>
```

**Preferred**

```tsx
import { Column, Container, Expanded, Text } from "qwik-flutter-ui";

<Container padding={16} style={{ height: 200 }}>
  <Column style={{ height: "100%" }}>
    <Expanded>
      <Text>Fills inside a Column flex parent.</Text>
    </Expanded>
  </Column>
</Container>
```

**Why:** `Expanded` only distributes space inside **`Row`** or **`Column`**. Outside a flex parent, flex grow has **no effect** (silent no-op).

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: expanded-anti-no-flex`, `preview: false`).

---

### Conflicting width constraints

**Source** (avoid)

```tsx
<Row>
  <Expanded>
    <Container width={800}>
      <Text>Fixed 800px inside Expanded</Text>
    </Container>
  </Expanded>
</Row>
```

**Preferred**

```tsx
<Row>
  <Expanded>
    <Container padding={16}>
      <Text>Let Expanded control width; use maxWidth if capping is needed.</Text>
    </Container>
  </Expanded>
</Row>
```

**Why:** Hard-coded widths on `Expanded` children fight the flex allocation and break responsive layouts. Prefer **`maxWidth`** on `Container` when a cap is required.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: expanded-anti-width-conflict`, `preview: false`).

---

### Excessive nesting

**Source** (avoid)

```tsx
<Row>
  <Expanded>
    <Column>
      <Expanded>
        <Row>
          <Expanded>
            <Text>Deep nesting for simple fill</Text>
          </Expanded>
        </Row>
      </Expanded>
    </Column>
  </Expanded>
</Row>
```

**Preferred**

```tsx
import { Column, Expanded, Row, Text } from "qwik-flutter-ui";

<Column style={{ height: 200 }}>
  <Expanded>
    <Text>One Expanded at the level that needs fill</Text>
  </Expanded>
</Column>
```

**Why:** Each `Expanded` only affects its direct flex parent. Unnecessary layers obscure which axis owns the fill behavior and make overflow harder to debug.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: expanded-anti-nesting`, `preview: false`).

---

## Accessibility

### Semantic neutrality

`Expanded` renders a **`<div>` wrapper** around its child. It does not introduce landmarks, labels, or roles by itself.

### Screen reader behavior

Assistive technology reads the **child content**, not the `Expanded` wrapper. Put labels on **`TextField`**, **`Button`**, and semantic elements inside the child — not on `Expanded`.

When `Expanded` wraps interactive controls, ensure the child exposes the correct native semantics (e.g. `<input>`, `<button>`).

---

## SSR

### Static rendering

`Expanded` renders a `<div>` with flex-related inline styles on the server. Layout is complete after SSR when the parent `Row` / `Column` provides flex context and bounded dimensions where vertical fill is expected.

### Resumability compatibility

`Expanded` is stateless — no event handlers or client hooks. No mandatory hydration JavaScript for fill behavior.

---

## Flutter Equivalent

| Topic | Flutter `Expanded` | qwik-flutter-ui `Expanded` |
| --- | --- | --- |
| Purpose | Tight-fit flex child | Same |
| Parent | `Row` / `Column` | Same |
| `flex` prop | Default `1` | Default `1` |
| Child | Single widget | Single slotted child |
| Outside flex | No effect | Silent no-op |
| vs `Flexible` | `Expanded` == `Flexible(fit: tight)` | `Expanded` forces fill; `Flexible` allows natural size |

**Flutter**

```dart
Row(
  children: [
    Icon(Icons.search),
    Expanded(
      child: TextField(
        decoration: InputDecoration(hintText: 'Search...'),
      ),
    ),
    ElevatedButton(onPressed: () {}, child: Text('Go')),
  ],
)
```

**qwik-flutter-ui**

```tsx
<Row gap={8}>
  <Text>Search</Text>
  <Expanded>
    <TextField decoration={{ placeholder: "Search..." }} />
  </Expanded>
  <Button type="button">Go</Button>
</Row>
```

**Similarities:** Same `flex` API, same parent widgets, same search-bar and sidebar idioms.

**Differences:** Renders HTML `<div>`. Decoration is a **`decoration` prop object** on `TextField`, not a constructor argument. No dev warning when used outside flex (silent no-op). Prefer **`Row gap` / `Column gap`** for uniform fixed spacing between siblings.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Flexible](/docs/widgets/layout/flexible) | Loose-fit flex wrapper — child keeps natural size. |
| [Spacer](/docs/widgets/layout/spacer) | Empty flexible gap — no child content. |
| [Row](/docs/widgets/layout/row) | Horizontal flex parent for `Expanded`. |
| [Column](/docs/widgets/layout/column) | Vertical flex parent for `Expanded`. |
| [SizedBox](/docs/widgets/layout/sized-box) | Fixed-size gap or wrapper — does not grow. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Expanded
description: Flexible wrapper that forces its child to fill remaining main-axis space inside Row and Column.
widget: Expanded
category: layout
flutterEquivalent: Expanded
status: shipped
related:
  - Flexible
  - Spacer
  - Row
  - Column
  - SizedBox
since: "0.0.1"
examples:
  - id: expanded-basic
    file: examples/expanded/basic.tsx
    category: basic
  - id: expanded-two-columns
    file: examples/expanded/two-columns.tsx
    category: common
  - id: expanded-sidebar
    file: examples/expanded/sidebar.tsx
    category: common
  - id: expanded-form
    file: examples/expanded/form.tsx
    category: common
  - id: expanded-dashboard
    file: examples/expanded/dashboard.tsx
    category: common
  - id: expanded-single
    file: examples/expanded/single.tsx
    category: variation
  - id: expanded-multiple
    file: examples/expanded/multiple.tsx
    category: variation
  - id: expanded-flex-values
    file: examples/expanded/flex-values.tsx
    category: variation
  - id: expanded-in-row
    file: examples/expanded/in-row.tsx
    category: composition
  - id: expanded-in-column
    file: examples/expanded/in-column.tsx
    category: composition
  - id: expanded-appshell
    file: examples/expanded/appshell.tsx
    category: composition
  - id: expanded-card
    file: examples/expanded/card.tsx
    category: composition
  - id: expanded-vs-flexible
    file: examples/expanded/vs-flexible.tsx
    category: common
  - id: expanded-vs-spacer
    file: examples/expanded/vs-spacer.tsx
    category: common
  - id: expanded-vs-fixed-width
    file: examples/expanded/vs-fixed-width.tsx
    category: common
  - id: expanded-fluid
    file: examples/expanded/fluid.tsx
    category: common
  - id: expanded-sidebar-content
    file: examples/expanded/sidebar-content.tsx
    category: common
  - id: expanded-dashboard-panels
    file: examples/expanded/dashboard-panels.tsx
    category: common
  - id: expanded-anti-no-flex
    file: examples/expanded/anti-no-flex.tsx
    category: anti-pattern
  - id: expanded-anti-width-conflict
    file: examples/expanded/anti-width-conflict.tsx
    category: anti-pattern
  - id: expanded-anti-nesting
    file: examples/expanded/anti-nesting.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/expanded/` when the docs site is implemented.
