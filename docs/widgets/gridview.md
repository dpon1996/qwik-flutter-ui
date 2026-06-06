---
title: GridView
description: Scrollable CSS grid for two-dimensional tile collections — products, photos, dashboards, and category browse.
widget: GridView
category: layout
flutterEquivalent: GridView
status: shipped
related:
  - ListView
  - SingleChildScrollView
  - Wrap
  - Container
since: "0.0.1"
examples:
  - id: gridview-basic
    file: examples/grid-view/basic.tsx
    category: basic
  - id: gridview-product-catalog
    file: examples/grid-view/product-catalog.tsx
    category: common
  - id: gridview-photo-gallery
    file: examples/grid-view/photo-gallery.tsx
    category: common
  - id: gridview-dashboard-cards
    file: examples/grid-view/dashboard-cards.tsx
    category: common
  - id: gridview-category-grid
    file: examples/grid-view/category-grid.tsx
    category: common
  - id: gridview-two-columns
    file: examples/grid-view/two-columns.tsx
    category: variation
  - id: gridview-three-columns
    file: examples/grid-view/three-columns.tsx
    category: variation
  - id: gridview-four-columns
    file: examples/grid-view/four-columns.tsx
    category: variation
  - id: gridview-responsive
    file: examples/grid-view/responsive.tsx
    category: variation
  - id: gridview-gap
    file: examples/grid-view/gap.tsx
    category: variation
  - id: gridview-main-axis-spacing
    file: examples/grid-view/main-axis-spacing.tsx
    category: variation
  - id: gridview-combined-spacing
    file: examples/grid-view/combined-spacing.tsx
    category: variation
  - id: gridview-composition
    file: examples/grid-view/composition.tsx
    category: composition
  - id: gridview-vs-list-list
    file: examples/grid-view/vs-list-list.tsx
    category: common
  - id: gridview-vs-list-grid
    file: examples/grid-view/vs-list-grid.tsx
    category: common
  - id: gridview-vs-wrap-wrap
    file: examples/grid-view/vs-wrap-wrap.tsx
    category: common
  - id: gridview-vs-wrap-grid
    file: examples/grid-view/vs-wrap-grid.tsx
    category: common
  - id: gridview-responsive-catalog
    file: examples/grid-view/responsive-catalog.tsx
    category: common
  - id: gridview-admin-dashboard
    file: examples/grid-view/admin-dashboard.tsx
    category: common
  - id: gridview-media-gallery
    file: examples/grid-view/media-gallery.tsx
    category: common
  - id: gridview-statistics-cards
    file: examples/grid-view/statistics-cards.tsx
    category: common
  - id: gridview-anti-sequential
    file: examples/grid-view/anti-sequential.tsx
    category: anti-pattern
  - id: gridview-anti-inconsistent
    file: examples/grid-view/anti-inconsistent.tsx
    category: anti-pattern
  - id: gridview-anti-nesting
    file: examples/grid-view/anti-nesting.tsx
    category: anti-pattern
---

# GridView

## Overview

`GridView` scrolls **many sibling tiles** arranged in a **two-dimensional CSS grid**. It maps to Flutter's [`GridView`](https://api.flutter.dev/flutter/widgets/GridView-class.html).

Use `GridView` for **visual collections** — product catalogs, photo galleries, dashboard metric tiles, and category browse — when items should align in columns and scroll as a grid.

### Grid layout model

| Concept | Behavior |
| --- | --- |
| **Grid layouts** | Fixed **`columns`** or responsive **`minItemWidth`** |
| **Two-dimensional collections** | Items fill rows then wrap to the next row |
| **Responsive presentation** | **`minItemWidth`** auto-fills columns at breakpoints |
| **Repeated content** | Map data to slotted grid cells |

Give the grid a **bounded size** on the scroll axis (explicit height/width, `Expanded`, or flex parent).

### GridView vs ListView vs Wrap

| Widget | Layout | Scroll | Use when |
| --- | --- | --- | --- |
| **`GridView`** | Fixed-column grid | Yes (scrollport) | Product tiles, photo grids |
| **`ListView`** | Single column (or row) | Yes | Feeds, settings rows |
| **`Wrap`** | Flow by intrinsic width | No (by itself) | Tags, chips that reflow |

---

## Import

```tsx
import { GridView } from "qwik-flutter-ui";
```

Import layout and media widgets when examples use them:

```tsx
import {
  BoxFit,
  Card,
  GridView,
  Image,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

A two-column grid of labels.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const items = ["A", "B", "C", "D"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={2} gap={8} mainAxisSpacing={8} padding={16} style={{ height: 200 }}>
      {items.map((item) => (
        <Container key={item} padding={16} backgroundColor="#e2e8f0">
          <Text>{item}</Text>
        </Container>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-basic`).

---

## Common Usage

### Product Catalog

Square product tiles in a browse grid.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  BoxFit,
  Card,
  Column,
  FontWeight,
  GridView,
  Image,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const products = [
  { id: "lamp", name: "Desk lamp", price: "$49", src: "/lamp.jpg" },
  { id: "chair", name: "Office chair", price: "$199", src: "/chair.jpg" },
  { id: "rug", name: "Area rug", price: "$89", src: "/rug.jpg" },
  { id: "vase", name: "Ceramic vase", price: "$32", src: "/vase.jpg" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={2} gap={12} mainAxisSpacing={12} padding={16} style={{ height: 420 }}>
      {products.map((product) => (
        <Card key={product.id} padding={0}>
          <AspectRatio aspectRatio={1}>
            <Image
              src={product.src}
              alt={product.name}
              width="100%"
              height="100%"
              fit={BoxFit.cover}
            />
          </AspectRatio>
          <Column gap={4} style={{ padding: 12 }}>
            <Text fontWeight={FontWeight.bold}>{product.name}</Text>
            <Text color="#64748b">{product.price}</Text>
          </Column>
        </Card>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-product-catalog`).

---

### Photo Gallery

Uniform thumbnails with **`childAspectRatio`**.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  BoxFit,
  GridView,
  Image,
  ThemeProvider,
} from "qwik-flutter-ui";

const photos = [
  { id: "1", src: "/photo-1.jpg", alt: "Sunset over hills" },
  { id: "2", src: "/photo-2.jpg", alt: "City skyline at night" },
  { id: "3", src: "/photo-3.jpg", alt: "Forest trail" },
  { id: "4", src: "/photo-4.jpg", alt: "Ocean waves" },
  { id: "5", src: "/photo-5.jpg", alt: "Mountain peak" },
  { id: "6", src: "/photo-6.jpg", alt: "Desert dunes" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView
      columns={3}
      gap={8}
      mainAxisSpacing={8}
      childAspectRatio={1}
      padding={16}
      style={{ height: 360 }}
    >
      {photos.map((photo) => (
        <Image
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          width="100%"
          height="100%"
          fit={BoxFit.cover}
        />
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-photo-gallery`).

---

### Dashboard Cards

Metric tiles in a multi-column dashboard.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Column,
  FontWeight,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const metrics = [
  { id: "users", label: "Users", value: "1,204" },
  { id: "revenue", label: "Revenue", value: "$8.2k" },
  { id: "orders", label: "Orders", value: "342" },
  { id: "uptime", label: "Uptime", value: "99.9%" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={2} gap={12} mainAxisSpacing={12} padding={16} style={{ height: 280 }}>
      {metrics.map((metric) => (
        <Card key={metric.id} padding={16}>
          <Column gap={4}>
            <Text color="#64748b">{metric.label}</Text>
            <Text fontWeight={FontWeight.bold}>{metric.value}</Text>
          </Column>
        </Card>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-dashboard-cards`).

---

### Category Grid

Category browse tiles with icons and labels.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

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
    <GridView columns={3} gap={8} mainAxisSpacing={8} padding={16} style={{ height: 260 }}>
      {categories.map((category) => (
        <Container
          key={category}
          padding={16}
          backgroundColor="#f1f5f9"
          borderRadius={8}
        >
          <Text>{category}</Text>
        </Container>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-category-grid`).

---

## Grid Configuration

Set **`columns`** for a fixed column count, or **`minItemWidth`** for responsive auto-fill columns. If both are set, **`columns` wins**.

### Two Columns

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={2} gap={8} mainAxisSpacing={8} style={{ height: 160, padding: 12 }}>
      <Container padding={12} backgroundColor="#fecaca"><Text>1</Text></Container>
      <Container padding={12} backgroundColor="#fca5a5"><Text>2</Text></Container>
      <Container padding={12} backgroundColor="#f87171"><Text>3</Text></Container>
      <Container padding={12} backgroundColor="#ef4444"><Text>4</Text></Container>
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-two-columns`).

---

### Three Columns

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={3} gap={8} mainAxisSpacing={8} style={{ height: 180, padding: 12 }}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Container key={n} padding={12} backgroundColor="#bbf7d0">
          <Text>{n}</Text>
        </Container>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-three-columns`).

---

### Four Columns

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={4} gap={6} mainAxisSpacing={6} style={{ height: 160, padding: 12 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <Container key={n} padding={8} backgroundColor="#bfdbfe">
          <Text>{n}</Text>
        </Container>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-four-columns`).

---

### Responsive Grid

**`minItemWidth`** — columns auto-fill as the container widens (Flutter `maxCrossAxisExtent` analogue).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const items = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView
      minItemWidth={140}
      gap={12}
      mainAxisSpacing={12}
      padding={16}
      style={{ height: 320, maxWidth: 640 }}
    >
      {items.map((item) => (
        <Card key={item} padding={12}>
          <Text>{item}</Text>
        </Card>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-responsive`).

**Visual difference:** More columns produce narrower cells; **`minItemWidth`** adds columns automatically on wider viewports.

---

## Spacing

Flutter maps **`crossAxisSpacing`** → **`gap`** and **`mainAxisSpacing`** → **`mainAxisSpacing`** (when **`axis`** is vertical).

### gap

Cross-axis spacing between columns.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={2} gap={24} mainAxisSpacing={8} style={{ height: 140, padding: 12 }}>
      <Container padding={12} backgroundColor="#e0e7ff"><Text>A</Text></Container>
      <Container padding={12} backgroundColor="#c7d2fe"><Text>B</Text></Container>
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-gap`).

---

### mainAxisSpacing

Row spacing along the scroll axis (vertical scroll → space between rows).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={2} gap={8} mainAxisSpacing={32} style={{ height: 200, padding: 12 }}>
      {[1, 2, 3, 4].map((n) => (
        <Container key={n} padding={12} backgroundColor="#fde68a">
          <Text>{n}</Text>
        </Container>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-main-axis-spacing`).

---

### Combined Spacing

Use both props for even gutters in a product grid.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const tiles = ["One", "Two", "Three", "Four"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={2} gap={16} mainAxisSpacing={16} padding={16} style={{ height: 240 }}>
      {tiles.map((tile) => (
        <Card key={tile} padding={16}>
          <Text>{tile}</Text>
        </Card>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-combined-spacing`).

**Layout behavior:** **`gap`** controls horizontal gutters; **`mainAxisSpacing`** controls vertical gutters between rows.

---

## Composition

Combine grid cells from cards, images, actions, and surfaces.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  BoxFit,
  Button,
  ButtonVariant,
  Card,
  Column,
  Container,
  FontWeight,
  GridView,
  Image,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const items = [
  { id: "1", name: "Headphones", src: "/headphones.jpg" },
  { id: "2", name: "Keyboard", src: "/keyboard.jpg" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={2} gap={12} mainAxisSpacing={12} padding={16} style={{ height: 360 }}>
      {items.map((item) => (
        <Card key={item.id} padding={0}>
          <AspectRatio aspectRatio={4 / 3}>
            <Image
              src={item.src}
              alt={item.name}
              width="100%"
              height="100%"
              fit={BoxFit.cover}
            />
          </AspectRatio>
          <Column gap={8} style={{ padding: 12 }}>
            <Text fontWeight={FontWeight.bold}>{item.name}</Text>
            <Button type="button" variant={ButtonVariant.outlined} onClick$={$(() => {})}>
              View
            </Button>
          </Column>
        </Card>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-composition`).

**Patterns:**

- **`Card`** — product and metric tiles
- **`Image`** + **`AspectRatio`** or **`childAspectRatio`** — uniform media cells
- **`Button`** — per-tile actions
- **`Container`** — simple category chips and placeholders

---

## GridView vs ListView

### List Layout

One item per row — reading order top to bottom.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Card, ListView, Text, ThemeProvider } from "qwik-flutter-ui";

const items = [
  { id: "1", name: "Desk lamp" },
  { id: "2", name: "Office chair" },
  { id: "3", name: "Monitor stand" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <ListView gap={8} padding={16} style={{ height: 260 }}>
      {items.map((item) => (
        <Card key={item.id} padding={12}>
          <Text>{item.name}</Text>
        </Card>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-vs-list-list`).

---

### Grid Layout

Multi-column tiles for browse-heavy UIs.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Card, GridView, Text, ThemeProvider } from "qwik-flutter-ui";

const items = [
  { id: "1", name: "Desk lamp" },
  { id: "2", name: "Office chair" },
  { id: "3", name: "Monitor stand" },
  { id: "4", name: "Keyboard" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={2} gap={12} mainAxisSpacing={12} padding={16} style={{ height: 280 }}>
      {items.map((item) => (
        <Card key={item.id} padding={12}>
          <Text>{item.name}</Text>
        </Card>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-vs-list-grid`).

| Prefer **`ListView`** | Prefer **`GridView`** |
| --- | --- |
| Feeds and mail folders | Product and photo browse |
| Dense reading order | Visual catalog scanning |
| Variable row height | Uniform tile cells |

---

## GridView vs Wrap

### Wrap

Items flow by intrinsic width and wrap to new lines — no grid scrollport.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, Text, Wrap, ThemeProvider } from "qwik-flutter-ui";

const tags = ["Design", "Engineering", "Docs", "Release", "Community", "Support"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Wrap spacing={8} runSpacing={8} style={{ maxWidth: 320 }}>
      {tags.map((tag) => (
        <Container key={tag} padding={8} backgroundColor="#e2e8f0" borderRadius={4}>
          <Text>{tag}</Text>
        </Container>
      ))}
    </Wrap>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-vs-wrap-wrap`).

---

### GridView

Fixed columns, scrollport, and predictable cell alignment.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, GridView, Text, ThemeProvider } from "qwik-flutter-ui";

const tags = ["Design", "Engineering", "Docs", "Release", "Community", "Support"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={3} gap={8} mainAxisSpacing={8} padding={12} style={{ height: 200 }}>
      {tags.map((tag) => (
        <Container key={tag} padding={8} backgroundColor="#dbeafe" borderRadius={4}>
          <Text>{tag}</Text>
        </Container>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-vs-wrap-grid`).

| Topic | **`Wrap`** | **`GridView`** |
| --- | --- | --- |
| Content flow | Intrinsic width, reflow | Fixed column grid |
| Alignment | Per-run flex alignment | CSS grid columns |
| Predictable sizing | Variable cell widths | Uniform column tracks |
| Collection layouts | Tags and chips | Catalogs and galleries |
| Scroll | Needs external scroll parent | Built-in scrollport |

---

## Responsive Layouts

### Product Catalog

**`minItemWidth`** for responsive columns in a constrained shell.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Column,
  FontWeight,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const products = [
  { id: "1", name: "Lamp", price: "$49" },
  { id: "2", name: "Chair", price: "$199" },
  { id: "3", name: "Rug", price: "$89" },
  { id: "4", name: "Vase", price: "$32" },
  { id: "5", name: "Shelf", price: "$120" },
  { id: "6", name: "Mirror", price: "$75" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView
      minItemWidth={160}
      gap={12}
      mainAxisSpacing={12}
      padding={16}
      style={{ height: 400, maxWidth: 720 }}
    >
      {products.map((product) => (
        <Card key={product.id} padding={12}>
          <Column gap={4}>
            <Text fontWeight={FontWeight.bold}>{product.name}</Text>
            <Text color="#64748b">{product.price}</Text>
          </Column>
        </Card>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-responsive-catalog`).

---

### Admin Dashboard

Fixed two-column metric grid below a header.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Column,
  Container,
  Expanded,
  FontWeight,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const stats = [
  { id: "signups", label: "Signups", value: "842" },
  { id: "mrr", label: "MRR", value: "$12.4k" },
  { id: "churn", label: "Churn", value: "2.1%" },
  { id: "nps", label: "NPS", value: "68" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column style={{ height: 360 }}>
      <Container padding={16}>
        <Text as="h2" fontWeight={FontWeight.bold}>
          Overview
        </Text>
      </Container>
      <Expanded>
        <GridView columns={2} gap={12} mainAxisSpacing={12} padding={16}>
          {stats.map((stat) => (
            <Card key={stat.id} padding={16}>
              <Column gap={4}>
                <Text color="#64748b">{stat.label}</Text>
                <Text fontWeight={FontWeight.bold}>{stat.value}</Text>
              </Column>
            </Card>
          ))}
        </GridView>
      </Expanded>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-admin-dashboard`).

---

### Media Gallery

Square thumbnails with **`childAspectRatio={1}`**.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  BoxFit,
  GridView,
  Image,
  ThemeProvider,
} from "qwik-flutter-ui";

const photos = Array.from({ length: 9 }, (_, i) => ({
  id: String(i + 1),
  src: `/gallery-${i + 1}.jpg`,
  alt: `Gallery photo ${i + 1}`,
}));

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView
      columns={3}
      gap={4}
      mainAxisSpacing={4}
      childAspectRatio={1}
      padding={8}
      style={{ height: 400 }}
    >
      {photos.map((photo) => (
        <Image
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          width="100%"
          height="100%"
          fit={BoxFit.cover}
        />
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-media-gallery`).

---

### Statistics Cards

Four-up KPI row on wide layouts.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Column,
  FontWeight,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const kpis = [
  { id: "visits", label: "Visits", value: "24.1k" },
  { id: "conv", label: "Conversion", value: "3.8%" },
  { id: "aov", label: "AOV", value: "$56" },
  { id: "ret", label: "Retention", value: "41%" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={4} gap={12} mainAxisSpacing={12} padding={16} style={{ height: 140 }}>
      {kpis.map((kpi) => (
        <Card key={kpi.id} padding={12}>
          <Column gap={2}>
            <Text color="#64748b">{kpi.label}</Text>
            <Text fontWeight={FontWeight.bold}>{kpi.value}</Text>
          </Column>
        </Card>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: gridview-statistics-cards`).

**Responsive note:** Use **`minItemWidth`** when column count should adapt; use fixed **`columns`** when the design specifies exact breakpoints.

---

## Best Practices

### Consistent item sizing

Use **`childAspectRatio`** or wrap media in **`AspectRatio`** so cells stay uniform:

```tsx
<GridView columns={3} childAspectRatio={1} gap={8} mainAxisSpacing={8}>
  {photos.map((photo) => (
    <Image key={photo.id} src={photo.src} alt={photo.alt} width="100%" height="100%" fit={BoxFit.cover} />
  ))}
</GridView>
```

### Predictable spacing

Set **`gap`** and **`mainAxisSpacing`** together for even gutters:

```tsx
<GridView columns={2} gap={16} mainAxisSpacing={16} padding={16}>
  …
</GridView>
```

### Use grids for visual collections

Product browse, photo walls, and dashboard tiles — not sequential prose or form sections.

---

## Anti-Patterns

### Grid for sequential content

**Source** (avoid)

```tsx
<GridView columns={2}>
  {articleParagraphs.map((p) => (
    <Text key={p.id}>{p.body}</Text>
  ))}
</GridView>
```

**Preferred**

```tsx
import { Column, SingleChildScrollView, Text } from "qwik-flutter-ui";

<SingleChildScrollView padding={16}>
  <Column gap={12}>
    {articleParagraphs.map((p) => (
      <Text key={p.id} as="p">
        {p.body}
      </Text>
    ))}
  </Column>
</SingleChildScrollView>
```

**Why:** Reading content belongs in a **single column**, not a multi-column grid.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: gridview-anti-sequential`, `preview: false`).

---

### Inconsistent card sizing

**Source** (avoid)

```tsx
<GridView columns={3} childAspectRatio={1}>
  {items.map((item) => (
    <Card key={item.id} padding={item.id === "1" ? 48 : 8}>
      <Text>{item.name}</Text>
    </Card>
  ))}
</GridView>
```

**Preferred**

```tsx
import { Card, GridView, Text } from "qwik-flutter-ui";

<GridView columns={3} gap={12} mainAxisSpacing={12} childAspectRatio={1}>
  {items.map((item) => (
    <Card key={item.id} padding={12}>
      <Text>{item.name}</Text>
    </Card>
  ))}
</GridView>
```

**Why:** Mixed padding and aspect ratios break visual rhythm. Reuse one tile template.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: gridview-anti-inconsistent`, `preview: false`).

---

### Excessive nesting

**Source** (avoid)

```tsx
<GridView columns={2}>
  {items.map((item) => (
    <GridView key={item.id} columns={2}>
      <Text>{item.name}</Text>
    </GridView>
  ))}
</GridView>
```

**Preferred**

```tsx
import { Card, GridView, Text } from "qwik-flutter-ui";

<GridView columns={2} gap={12} mainAxisSpacing={12}>
  {items.map((item) => (
    <Card key={item.id} padding={12}>
      <Text>{item.name}</Text>
    </Card>
  ))}
</GridView>
```

**Why:** One **`GridView`** per scroll region. Nest layout inside cells, not nested grids.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: gridview-anti-nesting`, `preview: false`).

---

## Accessibility

### Reading order

Grid items are announced in **DOM order** (row by row in LTR). Map data in the order users should perceive it.

### Keyboard navigation

Native overflow scrolling supports keyboard scroll when the scrollport is focused. Use **`tabIndex={0}`** on the scrollport when nested grid scroll must capture keyboard input.

Interactive cells should contain **`Button`**, links, or native inputs — not click-only surfaces without roles.

### Screen reader expectations

`GridView` does **not** apply **`role="grid"`** or **`role="gridcell"`** by default. Opt in via **`BaseProps`** only for true data grids. Product browse grids are usually collections of cards, not spreadsheet grids.

---

## SSR

### Static rendering

`GridView` renders a scrollport with a CSS grid and all slotted children in the initial HTML. Layout uses CSS Grid and overflow — no client measurement.

### Resumability compatibility

The grid container is stateless. Interactive cell content resumes independently on the client.

---

## Flutter Equivalent

| Topic | Flutter `GridView` | qwik-flutter-ui `GridView` |
| --- | --- | --- |
| Purpose | Scrollable 2D grid | Same |
| Column count | `crossAxisCount` | **`columns`** |
| Responsive columns | `maxCrossAxisExtent` | **`minItemWidth`** |
| Cross spacing | `crossAxisSpacing` | **`gap`** |
| Main spacing | `mainAxisSpacing` | **`mainAxisSpacing`** |
| Cell aspect | `childAspectRatio` | **`childAspectRatio`** |
| Scroll axis | `scrollDirection` | **`axis`** |
| Builders | `GridView.builder` | Slotted children only in v1 |

**Flutter**

```dart
GridView.count(
  crossAxisCount: 2,
  crossAxisSpacing: 16,
  mainAxisSpacing: 16,
  padding: EdgeInsets.all(16),
  children: products.map((p) => Card(
    child: Text(p.name),
  )).toList(),
)
```

**qwik-flutter-ui**

```tsx
<GridView columns={2} gap={16} mainAxisSpacing={16} padding={16}>
  {products.map((product) => (
    <Card key={product.id} padding={12}>
      <Text>{product.name}</Text>
    </Card>
  ))}
</GridView>
```

**Similarities:** Scrollport grid model, spacing props, aspect ratio cells, slotted children.

**Differences:** Flat props instead of `gridDelegate`. **`gap`** naming (Flutter `crossAxisSpacing`). Prop is **`axis`** not **`scrollDirection`**. CSS Grid implementation; non-virtualized in v1. If both **`columns`** and **`minItemWidth`** are set, **`columns` wins**.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [ListView](/docs/widgets/layout/list-view) | Single-column scrollable collections. |
| [SingleChildScrollView](/docs/widgets/layout/single-child-scroll-view) | One structured subtree — forms and articles. |
| [Wrap](/docs/widgets/layout/wrap) | Flow layout without a grid scrollport. |
| [Container](/docs/widgets/layout/container) | Cell backgrounds and padding inside tiles. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: GridView
description: Scrollable CSS grid for two-dimensional tile collections — products, photos, dashboards, and category browse.
widget: GridView
category: layout
flutterEquivalent: GridView
status: shipped
related:
  - ListView
  - SingleChildScrollView
  - Wrap
  - Container
since: "0.0.1"
examples:
  - id: gridview-basic
    file: examples/grid-view/basic.tsx
    category: basic
  - id: gridview-product-catalog
    file: examples/grid-view/product-catalog.tsx
    category: common
  - id: gridview-photo-gallery
    file: examples/grid-view/photo-gallery.tsx
    category: common
  - id: gridview-dashboard-cards
    file: examples/grid-view/dashboard-cards.tsx
    category: common
  - id: gridview-category-grid
    file: examples/grid-view/category-grid.tsx
    category: common
  - id: gridview-two-columns
    file: examples/grid-view/two-columns.tsx
    category: variation
  - id: gridview-three-columns
    file: examples/grid-view/three-columns.tsx
    category: variation
  - id: gridview-four-columns
    file: examples/grid-view/four-columns.tsx
    category: variation
  - id: gridview-responsive
    file: examples/grid-view/responsive.tsx
    category: variation
  - id: gridview-gap
    file: examples/grid-view/gap.tsx
    category: variation
  - id: gridview-main-axis-spacing
    file: examples/grid-view/main-axis-spacing.tsx
    category: variation
  - id: gridview-combined-spacing
    file: examples/grid-view/combined-spacing.tsx
    category: variation
  - id: gridview-composition
    file: examples/grid-view/composition.tsx
    category: composition
  - id: gridview-vs-list-list
    file: examples/grid-view/vs-list-list.tsx
    category: common
  - id: gridview-vs-list-grid
    file: examples/grid-view/vs-list-grid.tsx
    category: common
  - id: gridview-vs-wrap-wrap
    file: examples/grid-view/vs-wrap-wrap.tsx
    category: common
  - id: gridview-vs-wrap-grid
    file: examples/grid-view/vs-wrap-grid.tsx
    category: common
  - id: gridview-responsive-catalog
    file: examples/grid-view/responsive-catalog.tsx
    category: common
  - id: gridview-admin-dashboard
    file: examples/grid-view/admin-dashboard.tsx
    category: common
  - id: gridview-media-gallery
    file: examples/grid-view/media-gallery.tsx
    category: common
  - id: gridview-statistics-cards
    file: examples/grid-view/statistics-cards.tsx
    category: common
  - id: gridview-anti-sequential
    file: examples/grid-view/anti-sequential.tsx
    category: anti-pattern
  - id: gridview-anti-inconsistent
    file: examples/grid-view/anti-inconsistent.tsx
    category: anti-pattern
  - id: gridview-anti-nesting
    file: examples/grid-view/anti-nesting.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/grid-view/` when the docs site is implemented.
