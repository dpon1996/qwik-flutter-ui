---
title: Wrap
description: Multi-line flex layout that automatically wraps children onto new runs when horizontal or vertical space runs out.
widget: Wrap
category: layout
flutterEquivalent: Wrap
status: shipped
related:
  - Row
  - Column
  - GridView
  - Container
since: "0.0.1"
examples:
  - id: wrap-basic
    file: examples/wrap/basic.tsx
    category: basic
  - id: wrap-tag-list
    file: examples/wrap/tag-list.tsx
    category: common
  - id: wrap-filter-chips
    file: examples/wrap/filter-chips.tsx
    category: common
  - id: wrap-button-group
    file: examples/wrap/button-group.tsx
    category: common
  - id: wrap-category-list
    file: examples/wrap/category-list.tsx
    category: common
  - id: wrap-spacing
    file: examples/wrap/spacing.tsx
    category: variation
  - id: wrap-run-spacing
    file: examples/wrap/run-spacing.tsx
    category: variation
  - id: wrap-combined-spacing
    file: examples/wrap/combined-spacing.tsx
    category: variation
  - id: wrap-align-start
    file: examples/wrap/align-start.tsx
    category: variation
  - id: wrap-align-center
    file: examples/wrap/align-center.tsx
    category: variation
  - id: wrap-align-end
    file: examples/wrap/align-end.tsx
    category: variation
  - id: wrap-align-space-between
    file: examples/wrap/align-space-between.tsx
    category: variation
  - id: wrap-align-space-around
    file: examples/wrap/align-space-around.tsx
    category: variation
  - id: wrap-align-space-evenly
    file: examples/wrap/align-space-evenly.tsx
    category: variation
  - id: wrap-mobile-tags
    file: examples/wrap/mobile-tags.tsx
    category: common
  - id: wrap-toolbar-actions
    file: examples/wrap/toolbar-actions.tsx
    category: common
  - id: wrap-dashboard-filters
    file: examples/wrap/dashboard-filters.tsx
    category: common
  - id: wrap-responsive-buttons
    file: examples/wrap/responsive-buttons.tsx
    category: common
  - id: wrap-row-overflow
    file: examples/wrap/row-overflow.tsx
    category: common
  - id: wrap-row-solution
    file: examples/wrap/row-solution.tsx
    category: common
  - id: wrap-composition
    file: examples/wrap/composition.tsx
    category: composition
  - id: wrap-anti-simple-row
    file: examples/wrap/anti-simple-row.tsx
    category: anti-pattern
  - id: wrap-anti-nesting
    file: examples/wrap/anti-nesting.tsx
    category: anti-pattern
  - id: wrap-anti-gridview
    file: examples/wrap/anti-gridview.tsx
    category: anti-pattern
---

# Wrap

## Overview

`Wrap` lays out children along a **main axis** and **automatically moves overflow items to the next run** (line or column). It maps to Flutter's [`Wrap`](https://api.flutter.dev/flutter/widgets/Wrap-class.html).

Use `Wrap` when sibling count or width is **unknown or variable** — tag lists, filter chips, responsive button groups, and category pills that must reflow on narrow viewports.

### Multi-line layout model

| Concept | Behavior |
| --- | --- |
| **Automatic line wrapping** | Children flow to the next run when the current run is full |
| **Responsive layouts** | Reflows without manual breakpoints when space shrinks |
| **Flowing content** | Each child keeps intrinsic size; runs stack on the cross axis |

### Wrap vs Row vs Column vs GridView

| Widget | Layout | Wraps | Use when |
| --- | --- | --- | --- |
| **`Wrap`** | Main-axis flow with line breaks | Yes | Tags, chips, unknown item counts |
| **`Row`** | Single horizontal line | No | Toolbars, label + control pairs |
| **`Column`** | Single vertical stack | No | Forms, page sections |
| **`GridView`** | Scrollable 2D grid | N/A (grid cells) | Uniform tile grids with scroll |

`Row` has **no `wrap` prop** — use **`Wrap`** when siblings should break to new lines.

---

## Import

```tsx
import { Wrap } from "qwik-flutter-ui";
```

Import layout widgets and enums when examples use them:

```tsx
import {
  Button,
  Container,
  Text,
  Wrap,
  WrapAlignment,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

Three labels flow onto multiple lines when space is tight.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, Wrap, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={8} runSpacing={8} style={{ maxWidth: 200 }}>
      <Container padding={8} backgroundColor="#e2e8f0" borderRadius={4}>
        <Text>React</Text>
      </Container>
      <Container padding={8} backgroundColor="#e2e8f0" borderRadius={4}>
        <Text>Qwik</Text>
      </Container>
      <Container padding={8} backgroundColor="#e2e8f0" borderRadius={4}>
        <Text>TypeScript</Text>
      </Container>
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-basic`).

---

## Common Usage

### Tag List

Technology tags that wrap naturally as the container narrows.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, Wrap, ThemeProvider } from "qwik-flutter-ui";

const tags = ["Design", "Frontend", "Accessibility", "Performance", "SSR"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={8} runSpacing={8}>
      {tags.map((tag) => (
        <Container
          key={tag}
          padding={8}
          backgroundColor="#dbeafe"
          borderRadius={4}
        >
          <Text>{tag}</Text>
        </Container>
      ))}
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-tag-list`).

---

### Filter Chips

Selectable-style filters using compact containers.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, Wrap, ThemeProvider } from "qwik-flutter-ui";

const filters = ["All", "Active", "Archived", "Draft", "Published"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={8} runSpacing={8}>
      {filters.map((filter, index) => (
        <Container
          key={filter}
          padding={{ x: 12, y: 6 }}
          backgroundColor={index === 0 ? "#1e293b" : "#f1f5f9"}
          borderRadius={16}
        >
          <Text color={index === 0 ? "#f8fafc" : undefined}>{filter}</Text>
        </Container>
      ))}
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-filter-chips`).

---

### Button Group

Action buttons that wrap on small screens instead of overflowing.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Wrap,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={8} runSpacing={8}>
      <Button type="button" onClick$={$(() => {})}>
        Save
      </Button>
      <Button type="button" variant={ButtonVariant.outlined} onClick$={$(() => {})}>
        Preview
      </Button>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Cancel
      </Button>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Export
      </Button>
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-button-group`).

---

### Category List

Category pills for browse or filter UIs.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, Wrap, ThemeProvider } from "qwik-flutter-ui";

const categories = [
  "Electronics",
  "Home",
  "Books",
  "Sports",
  "Garden",
  "Toys",
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={8} runSpacing={8}>
      {categories.map((category) => (
        <Container
          key={category}
          padding={{ x: 16, y: 8 }}
          backgroundColor="#f8fafc"
          borderRadius={8}
        >
          <Text>{category}</Text>
        </Container>
      ))}
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-category-list`).

---

## Spacing

`Wrap` uses **`spacing`** (gap along the main axis between siblings) and **`runSpacing`** (gap between runs). Unlike `Row` / `Column`, it does **not** use `gap` — this matches Flutter's `Wrap.spacing` / `Wrap.runSpacing` API.

### spacing

Horizontal gap between items on the same run.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, Wrap, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={16} style={{ maxWidth: 240 }}>
      <Container padding={8} backgroundColor="#fecaca">
        <Text>A</Text>
      </Container>
      <Container padding={8} backgroundColor="#fca5a5">
        <Text>B</Text>
      </Container>
      <Container padding={8} backgroundColor="#f87171">
        <Text>C</Text>
      </Container>
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-spacing`).

**Visual difference:** Larger `spacing` increases horizontal distance between siblings on the same line.

---

### runSpacing

Vertical gap between wrapped runs.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, Wrap, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={8} runSpacing={24} style={{ maxWidth: 160 }}>
      <Container padding={8} backgroundColor="#bbf7d0">
        <Text>1</Text>
      </Container>
      <Container padding={8} backgroundColor="#86efac">
        <Text>2</Text>
      </Container>
      <Container padding={8} backgroundColor="#4ade80">
        <Text>3</Text>
      </Container>
      <Container padding={8} backgroundColor="#22c55e">
        <Text>4</Text>
      </Container>
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-run-spacing`).

**Visual difference:** Larger `runSpacing` increases vertical distance between lines when items wrap.

---

### Combined Spacing

Use both props together for even gaps in a tag cloud.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, Wrap, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={8} runSpacing={8} style={{ maxWidth: 220 }}>
      {["Alpha", "Beta", "Gamma", "Delta", "Epsilon"].map((label) => (
        <Container
          key={label}
          padding={8}
          backgroundColor="#e0e7ff"
          borderRadius={4}
        >
          <Text>{label}</Text>
        </Container>
      ))}
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-combined-spacing`).

---

## Alignment

`Wrap` uses the **`WrapAlignment`** enum for **`alignment`** (main axis within each run) and **`runAlignment`** (cross axis between runs). Default is **`WrapAlignment.start`** for both.

### start

Items align to the start of each run.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Text,
  Wrap,
  WrapAlignment,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap
      spacing={8}
      runSpacing={8}
      alignment={WrapAlignment.start}
      style={{ maxWidth: 280 }}
    >
      <Container padding={8} backgroundColor="#e2e8f0"><Text>A</Text></Container>
      <Container padding={8} backgroundColor="#e2e8f0"><Text>B</Text></Container>
      <Container padding={8} backgroundColor="#e2e8f0"><Text>C</Text></Container>
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-align-start`).

---

### center

Items center within each run.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Text,
  Wrap,
  WrapAlignment,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap
      spacing={8}
      runSpacing={8}
      alignment={WrapAlignment.center}
      style={{ maxWidth: 280 }}
    >
      <Container padding={8} backgroundColor="#e2e8f0"><Text>A</Text></Container>
      <Container padding={8} backgroundColor="#e2e8f0"><Text>B</Text></Container>
      <Container padding={8} backgroundColor="#e2e8f0"><Text>C</Text></Container>
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-align-center`).

---

### end

Items align to the end of each run.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Text,
  Wrap,
  WrapAlignment,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap
      spacing={8}
      runSpacing={8}
      alignment={WrapAlignment.end}
      style={{ maxWidth: 280 }}
    >
      <Container padding={8} backgroundColor="#e2e8f0"><Text>A</Text></Container>
      <Container padding={8} backgroundColor="#e2e8f0"><Text>B</Text></Container>
      <Container padding={8} backgroundColor="#e2e8f0"><Text>C</Text></Container>
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-align-end`).

---

### spaceBetween

Extra space distributed **between** items on each run (not before the first or after the last).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Text,
  Wrap,
  WrapAlignment,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap
      spacing={8}
      runSpacing={8}
      alignment={WrapAlignment.spaceBetween}
      style={{ maxWidth: 320 }}
    >
      <Container padding={8} backgroundColor="#fde68a"><Text>A</Text></Container>
      <Container padding={8} backgroundColor="#fde68a"><Text>B</Text></Container>
      <Container padding={8} backgroundColor="#fde68a"><Text>C</Text></Container>
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-align-space-between`).

---

### spaceAround

Equal space **around** each item (half-size space at the edges).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Text,
  Wrap,
  WrapAlignment,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap
      spacing={8}
      runSpacing={8}
      alignment={WrapAlignment.spaceAround}
      style={{ maxWidth: 320 }}
    >
      <Container padding={8} backgroundColor="#ddd6fe"><Text>A</Text></Container>
      <Container padding={8} backgroundColor="#ddd6fe"><Text>B</Text></Container>
      <Container padding={8} backgroundColor="#ddd6fe"><Text>C</Text></Container>
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-align-space-around`).

---

### spaceEvenly

Equal space **between and around** all items on each run.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  Text,
  Wrap,
  WrapAlignment,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap
      spacing={8}
      runSpacing={8}
      alignment={WrapAlignment.spaceEvenly}
      style={{ maxWidth: 320 }}
    >
      <Container padding={8} backgroundColor="#bfdbfe"><Text>A</Text></Container>
      <Container padding={8} backgroundColor="#bfdbfe"><Text>B</Text></Container>
      <Container padding={8} backgroundColor="#bfdbfe"><Text>C</Text></Container>
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-align-space-evenly`).

---

## Responsive Layouts

### Mobile Tag List

Tags reflow on narrow viewports without custom breakpoints.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, Wrap, ThemeProvider } from "qwik-flutter-ui";

const tags = ["Mobile", "Tablet", "Desktop", "PWA", "Offline"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16} style={{ maxWidth: 320 }}>
      <Wrap spacing={8} runSpacing={8}>
        {tags.map((tag) => (
          <Container
            key={tag}
            padding={8}
            backgroundColor="#f1f5f9"
            borderRadius={4}
          >
            <Text>{tag}</Text>
          </Container>
        ))}
      </Wrap>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-mobile-tags`).

---

### Toolbar Actions

Overflowing toolbar buttons wrap to a second row on small screens.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Container,
  Wrap,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={12} backgroundColor="#f8fafc" style={{ maxWidth: 360 }}>
      <Wrap spacing={8} runSpacing={8}>
        <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
          Bold
        </Button>
        <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
          Italic
        </Button>
        <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
          Link
        </Button>
        <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
          Code
        </Button>
        <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
          Quote
        </Button>
      </Wrap>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-toolbar-actions`).

---

### Dashboard Filters

Many filter chips share one flowing row that wraps as needed.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, Wrap, ThemeProvider } from "qwik-flutter-ui";

const filters = [
  "Last 7 days",
  "Last 30 days",
  "Revenue",
  "Signups",
  "Retention",
  "North America",
  "Europe",
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={8} runSpacing={8}>
      {filters.map((filter) => (
        <Container
          key={filter}
          padding={{ x: 12, y: 6 }}
          backgroundColor="#eff6ff"
          borderRadius={16}
        >
          <Text>{filter}</Text>
        </Container>
      ))}
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-dashboard-filters`).

---

### Responsive Button Layout

Form actions that stack on mobile and spread on wider containers.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Container,
  Wrap,
  WrapAlignment,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16} style={{ maxWidth: 400 }}>
      <Wrap spacing={8} runSpacing={8} alignment={WrapAlignment.end}>
        <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
          Cancel
        </Button>
        <Button type="button" variant={ButtonVariant.outlined} onClick$={$(() => {})}>
          Save draft
        </Button>
        <Button type="submit">Publish</Button>
      </Wrap>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-responsive-buttons`).

---

## Wrap vs Row

### Row Overflow

Many siblings in a constrained `Row` overflow horizontally.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Row, Text, ThemeProvider } from "qwik-flutter-ui";

const tags = ["React", "Qwik", "TypeScript", "CSS", "Testing", "Docs"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8} style={{ maxWidth: 280 }}>
      {tags.map((tag) => (
        <Container
          key={tag}
          padding={8}
          backgroundColor="#fecaca"
          borderRadius={4}
        >
          <Text>{tag}</Text>
        </Container>
      ))}
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-row-overflow`).

---

### Wrap Solution

Same tags in `Wrap` reflow onto multiple lines.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, Wrap, ThemeProvider } from "qwik-flutter-ui";

const tags = ["React", "Qwik", "TypeScript", "CSS", "Testing", "Docs"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={8} runSpacing={8} style={{ maxWidth: 280 }}>
      {tags.map((tag) => (
        <Container
          key={tag}
          padding={8}
          backgroundColor="#bbf7d0"
          borderRadius={4}
        >
          <Text>{tag}</Text>
        </Container>
      ))}
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-row-solution`).

| Prefer **`Row`** | Prefer **`Wrap`** |
| --- | --- |
| Fixed sibling count that always fits | Unknown or variable item count |
| Toolbar with `Spacer` / `Expanded` | Tag, chip, and filter lists |
| Single-line alignment (`mainAxisAlignment`) | Content that must break to new lines |
| Label + control pairs | Responsive button groups |

---

## Composition

Combine `Wrap` with buttons, chip-style containers, surfaces, and labels.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Container,
  Text,
  Wrap,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={8} runSpacing={8}>
      <Container padding={{ x: 12, y: 6 }} backgroundColor="#e0e7ff" borderRadius={16}>
        <Text>Chip-style label</Text>
      </Container>
      <Text color="#64748b">·</Text>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Edit
      </Button>
      <Button type="button" variant={ButtonVariant.outlined} onClick$={$(() => {})}>
        Share
      </Button>
      <Container padding={8} backgroundColor="#f8fafc" borderRadius={8}>
        <Text>Grouped note</Text>
      </Container>
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: wrap-composition`).

**Patterns:**

- **`Container`** — chip and pill styling (`padding`, `borderRadius`, `backgroundColor`)
- **`Button`** — actions mixed with tags; use `ButtonVariant` for density
- **`Text`** — inline separators and short labels
- Avoid nesting `Row` inside every child — `Wrap` already handles flow

---

## Best Practices

### Use Wrap for unknown item counts

Dynamic lists from APIs or user input should flow without horizontal overflow:

```tsx
<Wrap spacing={8} runSpacing={8}>
  {tags.map((tag) => (
    <Container key={tag} padding={8} backgroundColor="#f1f5f9" borderRadius={4}>
      <Text>{tag}</Text>
    </Container>
  ))}
</Wrap>
```

### Use spacing consistently

Set **`spacing`** and **`runSpacing`** together for uniform tag-cloud gaps:

```tsx
<Wrap spacing={8} runSpacing={8}>
  …
</Wrap>
```

On `Row`, use **`gap`** instead — `Wrap` intentionally uses Flutter's `spacing` / `runSpacing` names.

### Prefer Wrap over overflow-prone Rows

When siblings may exceed container width, default to `Wrap`:

```tsx
import { Wrap } from "qwik-flutter-ui";

<Wrap spacing={8} runSpacing={8}>
  …
</Wrap>
```

Reserve **`Row`** for layouts that must stay on one line.

---

## Anti-Patterns

### Using Wrap for simple Rows

**Source** (avoid)

```tsx
<Wrap spacing={8}>
  <Button type="button">Cancel</Button>
  <Button type="submit">Save</Button>
</Wrap>
```

**Preferred**

```tsx
import { Row, Button } from "qwik-flutter-ui";

<Row gap={8}>
  <Button type="button">Cancel</Button>
  <Button type="submit">Save</Button>
</Row>
```

**Why:** Two buttons that always fit on one line are simpler with **`Row`** and **`gap`**. `Wrap` adds unnecessary run logic.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: wrap-anti-simple-row`, `preview: false`).

---

### Excessive nesting

**Source** (avoid)

```tsx
<Wrap spacing={8} runSpacing={8}>
  <Wrap spacing={4} runSpacing={4}>
    <Wrap spacing={4} runSpacing={4}>
      <Text>Over-nested</Text>
    </Wrap>
  </Wrap>
</Wrap>
```

**Preferred**

```tsx
import { Container, Text, Wrap } from "qwik-flutter-ui";

<Wrap spacing={8} runSpacing={8}>
  <Container padding={8}>
    <Text>Single Wrap parent</Text>
  </Container>
</Wrap>
```

**Why:** One `Wrap` per flowing group is enough. Nested wraps obscure spacing and alignment.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: wrap-anti-nesting`, `preview: false`).

---

### Using Wrap where GridView is more appropriate

**Source** (avoid)

```tsx
<Wrap spacing={16} runSpacing={16}>
  {products.map((p) => (
    <Container key={p.id} width={160} height={200}>
      <Text>{p.name}</Text>
    </Container>
  ))}
</Wrap>
```

**Preferred**

```tsx
import { GridView, Container, Text } from "qwik-flutter-ui";

<GridView columns={3} gap={16} mainAxisSpacing={16}>
  {products.map((p) => (
    <Container key={p.id} padding={12}>
      <Text>{p.name}</Text>
    </Container>
  ))}
</GridView>
```

**Why:** Uniform product or photo grids need **aligned columns**, **scroll**, and **aspect ratios** — use **`GridView`**. `Wrap` flows by intrinsic width, not a fixed grid.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: wrap-anti-gridview`, `preview: false`).

---

## Accessibility

### Semantic neutrality

`Wrap` renders a **non-semantic `<div>`** flex container. It does not define landmarks or headings by itself.

### Reading order

DOM order matches **visual flow order** (left-to-right, top-to-bottom in horizontal mode). Screen readers traverse children in document order — the same order users see after wrapping.

Place meaningful labels on interactive children (`Button`, `TextField`) rather than on the `Wrap` wrapper.

### Screen reader expectations

Each child is announced individually. For filter chip groups, wrap related controls in a **`Container`** with **`role="group"`** and an **`aria-label`** (or a visible **`Text`** heading above the group) so assistive technology understands the set purpose.

---

## SSR

### Static rendering

`Wrap` renders a `<div>` with CSS module classes and optional inline gap styles on the server. Wrapped layout is complete after SSR — no client measurement required for line breaks (browser flex-wrap handles reflow).

### Resumability compatibility

`Wrap` is stateless — no event handlers or client hooks on the layout wrapper itself. No mandatory hydration JavaScript for wrapping behavior.

---

## Flutter Equivalent

| Topic | Flutter `Wrap` | qwik-flutter-ui `Wrap` |
| --- | --- | --- |
| Purpose | Multi-line flex flow | Same |
| Spacing | `spacing` / `runSpacing` | Same prop names |
| Alignment | `WrapAlignment` | Same enum |
| Cross alignment | `WrapCrossAlignment` | Same enum |
| Row `gap` | N/A on Flutter `Row` | Library adds `gap` on `Row`/`Column` only |
| `wrap` on `Row` | Not available | Use separate `Wrap` widget |

**Flutter**

```dart
Wrap(
  spacing: 8,
  runSpacing: 8,
  children: tags.map((t) => Chip(label: Text(t))).toList(),
)
```

**qwik-flutter-ui**

```tsx
<Wrap spacing={8} runSpacing={8}>
  {tags.map((tag) => (
    <Container key={tag} padding={8} backgroundColor="#f1f5f9" borderRadius={4}>
      <Text>{tag}</Text>
    </Container>
  ))}
</Wrap>
```

**Similarities:** Same spacing API, alignment enums, and tag-list idiom.

**Differences:** Renders HTML `<div>` with CSS flex-wrap. No built-in `Chip` widget — use **`Container`** + **`Text`** or **`Button`**. Spacing prop names differ from `Row gap` / `Column gap` (Flutter parity).

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Row](/docs/widgets/layout/row) | Single-line horizontal layout — no wrapping. |
| [Column](/docs/widgets/layout/column) | Single-column vertical stack. |
| [GridView](/docs/widgets/layout/grid-view) | Scrollable 2D grid for uniform tiles. |
| [Container](/docs/widgets/layout/container) | Chip styling, padding, and surfaces inside `Wrap`. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Wrap
description: Multi-line flex layout that automatically wraps children onto new runs when horizontal or vertical space runs out.
widget: Wrap
category: layout
flutterEquivalent: Wrap
status: shipped
related:
  - Row
  - Column
  - GridView
  - Container
since: "0.0.1"
examples:
  - id: wrap-basic
    file: examples/wrap/basic.tsx
    category: basic
  - id: wrap-tag-list
    file: examples/wrap/tag-list.tsx
    category: common
  - id: wrap-filter-chips
    file: examples/wrap/filter-chips.tsx
    category: common
  - id: wrap-button-group
    file: examples/wrap/button-group.tsx
    category: common
  - id: wrap-category-list
    file: examples/wrap/category-list.tsx
    category: common
  - id: wrap-spacing
    file: examples/wrap/spacing.tsx
    category: variation
  - id: wrap-run-spacing
    file: examples/wrap/run-spacing.tsx
    category: variation
  - id: wrap-combined-spacing
    file: examples/wrap/combined-spacing.tsx
    category: variation
  - id: wrap-align-start
    file: examples/wrap/align-start.tsx
    category: variation
  - id: wrap-align-center
    file: examples/wrap/align-center.tsx
    category: variation
  - id: wrap-align-end
    file: examples/wrap/align-end.tsx
    category: variation
  - id: wrap-align-space-between
    file: examples/wrap/align-space-between.tsx
    category: variation
  - id: wrap-align-space-around
    file: examples/wrap/align-space-around.tsx
    category: variation
  - id: wrap-align-space-evenly
    file: examples/wrap/align-space-evenly.tsx
    category: variation
  - id: wrap-mobile-tags
    file: examples/wrap/mobile-tags.tsx
    category: common
  - id: wrap-toolbar-actions
    file: examples/wrap/toolbar-actions.tsx
    category: common
  - id: wrap-dashboard-filters
    file: examples/wrap/dashboard-filters.tsx
    category: common
  - id: wrap-responsive-buttons
    file: examples/wrap/responsive-buttons.tsx
    category: common
  - id: wrap-row-overflow
    file: examples/wrap/row-overflow.tsx
    category: common
  - id: wrap-row-solution
    file: examples/wrap/row-solution.tsx
    category: common
  - id: wrap-composition
    file: examples/wrap/composition.tsx
    category: composition
  - id: wrap-anti-simple-row
    file: examples/wrap/anti-simple-row.tsx
    category: anti-pattern
  - id: wrap-anti-nesting
    file: examples/wrap/anti-nesting.tsx
    category: anti-pattern
  - id: wrap-anti-gridview
    file: examples/wrap/anti-gridview.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/wrap/` when the docs site is implemented.
