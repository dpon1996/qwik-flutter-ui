---
title: AspectRatio
description: Locks proportional width-to-height sizing for media, tiles, and banners using a required aspectRatio value.
widget: AspectRatio
category: layout
flutterEquivalent: AspectRatio
status: shipped
related:
  - Container
  - SizedBox
  - Stack
  - GridView
since: "0.0.1"
examples:
  - id: aspectratio-basic
    file: examples/aspect-ratio/basic.tsx
    category: basic
  - id: aspectratio-image-container
    file: examples/aspect-ratio/image-container.tsx
    category: common
  - id: aspectratio-video-thumbnail
    file: examples/aspect-ratio/video-thumbnail.tsx
    category: common
  - id: aspectratio-card-media
    file: examples/aspect-ratio/card-media.tsx
    category: common
  - id: aspectratio-responsive-banner
    file: examples/aspect-ratio/responsive-banner.tsx
    category: common
  - id: aspectratio-square
    file: examples/aspect-ratio/square.tsx
    category: variation
  - id: aspectratio-4-3
    file: examples/aspect-ratio/ratio-4-3.tsx
    category: variation
  - id: aspectratio-16-9
    file: examples/aspect-ratio/ratio-16-9.tsx
    category: variation
  - id: aspectratio-21-9
    file: examples/aspect-ratio/ratio-21-9.tsx
    category: variation
  - id: aspectratio-responsive-image
    file: examples/aspect-ratio/responsive-image.tsx
    category: common
  - id: aspectratio-embedded-video
    file: examples/aspect-ratio/embedded-video.tsx
    category: common
  - id: aspectratio-hero-banner
    file: examples/aspect-ratio/hero-banner.tsx
    category: common
  - id: aspectratio-product-card
    file: examples/aspect-ratio/product-card.tsx
    category: common
  - id: aspectratio-in-row
    file: examples/aspect-ratio/in-row.tsx
    category: common
  - id: aspectratio-in-column
    file: examples/aspect-ratio/in-column.tsx
    category: common
  - id: aspectratio-in-container
    file: examples/aspect-ratio/in-container.tsx
    category: common
  - id: aspectratio-in-gridview
    file: examples/aspect-ratio/in-gridview.tsx
    category: common
  - id: aspectratio-composition
    file: examples/aspect-ratio/composition.tsx
    category: composition
  - id: aspectratio-vs-fixed
    file: examples/aspect-ratio/vs-fixed.tsx
    category: common
  - id: aspectratio-vs-aspectratio
    file: examples/aspect-ratio/vs-aspectratio.tsx
    category: common
  - id: aspectratio-anti-unnecessary
    file: examples/aspect-ratio/anti-unnecessary.tsx
    category: anti-pattern
  - id: aspectratio-anti-conflict
    file: examples/aspect-ratio/anti-conflict.tsx
    category: anti-pattern
  - id: aspectratio-anti-natural
    file: examples/aspect-ratio/anti-natural.tsx
    category: anti-pattern
---

# AspectRatio

## Overview

`AspectRatio` sizes its **single child** to maintain a fixed **width-to-height ratio**. It maps to Flutter's [`AspectRatio`](https://api.flutter.dev/flutter/widgets/AspectRatio-class.html).

Use `AspectRatio` for **media and tiles** — photos, video thumbnails, card headers, and hero banners — where height should follow width (or vice versa) without manual pixel math.

### Proportional sizing model

| Concept | Behavior |
| --- | --- |
| **Width-to-height ratio** | Required **`aspectRatio`** prop (`width / height`) |
| **Responsive media layouts** | Width from parent; height computed from ratio |
| **Predictable sizing** | Same proportions at every viewport width |

### AspectRatio vs SizedBox vs Container sizing vs fixed dimensions

| Tool | Sizing | Use when |
| --- | --- | --- |
| **`AspectRatio`** | Proportional **`width / height`** | Media, thumbnails, uniform tiles |
| **`SizedBox`** | Fixed **`width`** / **`height`** | Exact gaps or known pixel boxes |
| **`Container`** | Explicit dimensions + decoration | Styled surfaces with optional fixed size |
| **Fixed dimensions** | Hard-coded width and height | Legacy layouts; breaks responsiveness |

---

## Import

```tsx
import { AspectRatio } from "qwik-flutter-ui";
```

Import layout and media widgets when examples use them:

```tsx
import {
  AspectRatio,
  BoxFit,
  Container,
  Image,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

A 16∶9 region with a filled image.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  BoxFit,
  Image,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AspectRatio aspectRatio={16 / 9}>
      <Image
        src="/hero.jpg"
        alt="Landscape photo"
        width="100%"
        height="100%"
        fit={BoxFit.cover}
      />
    </AspectRatio>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-basic`).

---

## Common Usage

### Image Container

Photo frame that keeps proportions as the container widens.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  BoxFit,
  Container,
  Image,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16} style={{ maxWidth: 480 }}>
      <AspectRatio aspectRatio={4 / 3}>
        <Image
          src="/gallery.jpg"
          alt="Gallery photo"
          width="100%"
          height="100%"
          fit={BoxFit.cover}
        />
      </AspectRatio>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-image-container`).

---

### Video Thumbnail

Standard widescreen preview area for video content.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AspectRatio aspectRatio={16 / 9}>
      <Container width="100%" height="100%" backgroundColor="#1e293b">
        <Text color="#ffffff">▶ Preview</Text>
      </Container>
    </AspectRatio>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-video-thumbnail`).

---

### Card Media Header

Image header on a card with consistent media height.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  BoxFit,
  Card,
  Column,
  FontWeight,
  Image,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Card padding={0} style={{ width: 280 }}>
      <AspectRatio aspectRatio={16 / 9}>
        <Image
          src="/product.jpg"
          alt="Product photo"
          width="100%"
          height="100%"
          fit={BoxFit.cover}
        />
      </AspectRatio>
      <Column gap={8} style={{ padding: 16 }}>
        <Text fontWeight={FontWeight.bold}>Wireless headphones</Text>
        <Text color="#64748b">Free shipping</Text>
      </Column>
    </Card>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-card-media`).

---

### Responsive Banner

Full-width hero that scales height with viewport.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AspectRatio aspectRatio={21 / 9}>
      <Container width="100%" height="100%" backgroundColor="#334155">
        <Text color="#ffffff">Ultra-wide banner</Text>
      </Container>
    </AspectRatio>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-responsive-banner`).

---

## Common Ratios

Pass **`aspectRatio`** as `width / height`. Higher values produce wider boxes at the same width.

### 1:1 Square

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AspectRatio aspectRatio={1} style={{ maxWidth: 200 }}>
      <Container width="100%" height="100%" backgroundColor="#dbeafe">
        <Text>1:1</Text>
      </Container>
    </AspectRatio>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-square`).

---

### 4:3

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AspectRatio aspectRatio={4 / 3} style={{ maxWidth: 280 }}>
      <Container width="100%" height="100%" backgroundColor="#bbf7d0">
        <Text>4:3</Text>
      </Container>
    </AspectRatio>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-4-3`).

---

### 16:9

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AspectRatio aspectRatio={16 / 9} style={{ maxWidth: 320 }}>
      <Container width="100%" height="100%" backgroundColor="#fde68a">
        <Text>16:9</Text>
      </Container>
    </AspectRatio>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-16-9`).

---

### 21:9

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AspectRatio aspectRatio={21 / 9} style={{ maxWidth: 420 }}>
      <Container width="100%" height="100%" backgroundColor="#ddd6fe">
        <Text>21:9</Text>
      </Container>
    </AspectRatio>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-21-9`).

**Visual difference:** At the same width, **1:1** is shortest; **21:9** is the flattest. **16:9** is the standard video and hero ratio.

---

## Responsive Layouts

### Responsive Image

Image scales width with parent; height follows automatically.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  BoxFit,
  Container,
  Image,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16} style={{ maxWidth: 640 }}>
      <AspectRatio aspectRatio={16 / 9}>
        <Image
          src="/responsive.jpg"
          alt="Responsive photo"
          width="100%"
          height="100%"
          fit={BoxFit.cover}
        />
      </AspectRatio>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-responsive-image`).

---

### Embedded Video

Placeholder embed area that keeps 16∶9 on all screen sizes.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16}>
      <AspectRatio aspectRatio={16 / 9}>
        <Container width="100%" height="100%" backgroundColor="#0f172a">
          <Text color="#94a3b8">Video embed (16:9)</Text>
        </Container>
      </AspectRatio>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-embedded-video`).

---

### Hero Banner

Marketing hero with cinematic ratio.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Align,
  Alignment,
  AspectRatio,
  BoxFit,
  Container,
  Image,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AspectRatio aspectRatio={16 / 9}>
      <Stack>
        <Image
          src="/hero.jpg"
          alt="Product launch hero"
          width="100%"
          height="100%"
          fit={BoxFit.cover}
        />
        <Align alignment={Alignment.bottomLeft}>
          <Container padding={24} backgroundColor="rgba(0,0,0,0.45)">
            <Text as="h2" color="#ffffff">
              Launch week
            </Text>
          </Container>
        </Align>
      </Stack>
    </AspectRatio>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-hero-banner`).

---

### Product Card

Square product image in a catalog tile.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  BoxFit,
  Card,
  Column,
  Image,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Card padding={0} style={{ width: 180 }}>
      <AspectRatio aspectRatio={1}>
        <Image
          src="/sku.jpg"
          alt="Desk lamp"
          width="100%"
          height="100%"
          fit={BoxFit.cover}
        />
      </AspectRatio>
      <Column gap={4} style={{ padding: 12 }}>
        <Text>Desk lamp</Text>
        <Text color="#64748b">$49</Text>
      </Column>
    </Card>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-product-card`).

**Why `AspectRatio`:** One ratio declaration keeps media proportions consistent across breakpoints without recalculating heights.

---

## Layout Behavior

### Parent constraints

`AspectRatio` takes **width from the parent** (default `width: 100%`) and derives **height** from **`aspectRatio`**. Ensure the parent provides a meaningful width.

### Width-driven sizing

In **`Column`** or full-width containers, width flows from the parent; height is computed — the common case for responsive media.

### Height-driven sizing

When the parent constrains **height** instead of width, the ratio box resolves from available space along the constrained axis (same as CSS `aspect-ratio` behavior).

### Constraint resolution

If the parent has **no width**, the ratio box may collapse. Pair with **`width="100%"`** on a parent flex child, **`Expanded`**, or a sized **`Container`**.

### Inside Row

Wrap in **`Expanded`** so the ratio box receives horizontal space.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  BoxFit,
  Expanded,
  Image,
  Row,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={16} style={{ maxWidth: 640 }}>
      <Expanded>
        <AspectRatio aspectRatio={16 / 9}>
          <Image
            src="/a.jpg"
            alt="Photo A"
            width="100%"
            height="100%"
            fit={BoxFit.cover}
          />
        </AspectRatio>
      </Expanded>
      <Expanded>
        <AspectRatio aspectRatio={16 / 9}>
          <Image
            src="/b.jpg"
            alt="Photo B"
            width="100%"
            height="100%"
            fit={BoxFit.cover}
          />
        </AspectRatio>
      </Expanded>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-in-row`).

---

### Inside Column

Stacked media blocks with independent ratios.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  Column,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={16} style={{ maxWidth: 400 }}>
      <AspectRatio aspectRatio={16 / 9}>
        <Container width="100%" height="100%" backgroundColor="#dbeafe">
          <Text>Slide 1</Text>
        </Container>
      </AspectRatio>
      <AspectRatio aspectRatio={16 / 9}>
        <Container width="100%" height="100%" backgroundColor="#bfdbfe">
          <Text>Slide 2</Text>
        </Container>
      </AspectRatio>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-in-column`).

---

### Inside Container

Bounded surface with padding around proportional media.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16} backgroundColor="#f8fafc" borderRadius={12}>
      <AspectRatio aspectRatio={4 / 3}>
        <Container width="100%" height="100%" backgroundColor="#e2e8f0">
          <Text>Framed media</Text>
        </Container>
      </AspectRatio>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-in-container`).

---

### Inside GridView

Uniform tile ratio via **`childAspectRatio`** on the grid.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  BoxFit,
  Container,
  GridView,
  Image,
  ThemeProvider,
} from "qwik-flutter-ui";

const products = [
  { id: "1", name: "Lamp", src: "/lamp.jpg" },
  { id: "2", name: "Chair", src: "/chair.jpg" },
  { id: "3", name: "Rug", src: "/rug.jpg" },
  { id: "4", name: "Vase", src: "/vase.jpg" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <GridView columns={2} gap={12} mainAxisSpacing={12}>
      {products.map((p) => (
        <AspectRatio key={p.id} aspectRatio={1}>
          <Container width="100%" height="100%" backgroundColor="#f1f5f9">
            <Image
              src={p.src}
              alt={p.name}
              width="100%"
              height="100%"
              fit={BoxFit.cover}
            />
          </Container>
        </AspectRatio>
      ))}
    </GridView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-in-gridview`).

Wrap each cell in **`AspectRatio`** when tiles need explicit ratio control inside the grid.

Alternatively, set **`childAspectRatio`** on **`GridView`** alone when a uniform cell ratio is enough without per-cell wrappers.

---

## Composition

Layer media, surfaces, and overlays inside a ratio box.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Align,
  Alignment,
  AspectRatio,
  BoxFit,
  Card,
  Container,
  Image,
  Stack,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Card padding={0} style={{ width: 320 }}>
      <AspectRatio aspectRatio={16 / 9}>
        <Stack>
          <Image
            src="/featured.jpg"
            alt="Featured collection"
            width="100%"
            height="100%"
            fit={BoxFit.cover}
          />
          <Align alignment={Alignment.bottomLeft}>
            <Container padding={8} backgroundColor="rgba(0,0,0,0.55)">
              <Text color="#ffffff">New collection</Text>
            </Container>
          </Align>
        </Stack>
      </AspectRatio>
    </Card>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-composition`).

**Patterns:**

- **`Image`** — set **`width="100%"`**, **`height="100%"`**, **`fit={BoxFit.cover}`** to fill the ratio box
- **`Container`** — placeholder backgrounds and embed chrome
- **`Stack`** + **`Align`** — captions and badges over media
- **`Card`** — ratio box as the media header; body content below

---

## AspectRatio vs Fixed Size

### Fixed Width/Height

Hard-coded dimensions break responsiveness when the viewport changes.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  BoxFit,
  Container,
  Image,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16}>
      <Image
        src="/photo.jpg"
        alt="Fixed size photo"
        width={320}
        height={180}
        fit={BoxFit.cover}
      />
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-vs-fixed`).

---

### AspectRatio

Height follows width at a fixed ratio.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AspectRatio,
  BoxFit,
  Container,
  Image,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16}>
      <AspectRatio aspectRatio={16 / 9}>
        <Image
          src="/photo.jpg"
          alt="Responsive photo"
          width="100%"
          height="100%"
          fit={BoxFit.cover}
        />
      </AspectRatio>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: aspectratio-vs-aspectratio`).

| Topic | **Fixed width / height** | **`AspectRatio`** |
| --- | --- | --- |
| Responsiveness | Breaks when width changes | Scales proportionally |
| Maintainability | Update two values per breakpoint | One ratio constant |
| Adaptability | Manual height recalculation | Automatic height from width |

---

## Best Practices

### Use common media ratios

Standard ratios improve consistency:

```tsx
<AspectRatio aspectRatio={16 / 9}>…</AspectRatio>  {/* video, hero */}
<AspectRatio aspectRatio={1}>…</AspectRatio>       {/* square tile */}
<AspectRatio aspectRatio={4 / 3}>…</AspectRatio>   {/* photo */}
```

### Keep ratios predictable

Define ratios as expressions (`16 / 9`) rather than magic decimals (`1.777…`).

### Prefer AspectRatio for media content

Wrap photos, thumbnails, and embed placeholders — not plain text or form controls.

Pair with **`Image`** **`fit={BoxFit.cover}`** so media fills the box without distortion.

---

## Anti-Patterns

### Unnecessary AspectRatio wrappers

**Source** (avoid)

```tsx
<AspectRatio aspectRatio={1}>
  <Text>Single line of text</Text>
</AspectRatio>
```

**Preferred**

```tsx
import { Text } from "qwik-flutter-ui";

<Text>Single line of text</Text>
```

**Why:** Text and inline content should size naturally. **`AspectRatio`** is for proportional **media regions**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: aspectratio-anti-unnecessary`, `preview: false`).

---

### Conflicting width/height constraints

**Source** (avoid)

```tsx
<AspectRatio aspectRatio={16 / 9}>
  <Container width={400} height={200} backgroundColor="#eee" />
</AspectRatio>
```

**Preferred**

```tsx
import { AspectRatio, BoxFit, Container, Image } from "qwik-flutter-ui";

<AspectRatio aspectRatio={16 / 9}>
  <Image
    src="/photo.jpg"
    alt="Photo"
    width="100%"
    height="100%"
    fit={BoxFit.cover}
  />
</AspectRatio>
```

**Why:** Fixed height on the child fights the ratio box. Let **`AspectRatio`** own proportions; size the child to **`100%`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: aspectratio-anti-conflict`, `preview: false`).

---

### Forcing ratios where content should size naturally

**Source** (avoid)

```tsx
<AspectRatio aspectRatio={16 / 9}>
  <Button type="submit">Save changes</Button>
</AspectRatio>
```

**Preferred**

```tsx
import { Button, Column, TextFormField } from "qwik-flutter-ui";

<Column gap={16}>
  <TextFormField name="title" decoration={{ label: "Title" }} />
  <Button type="submit">Save changes</Button>
</Column>
```

**Why:** Forms and actions belong in **`Column`** / **`Row`**, not proportional media boxes.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: aspectratio-anti-natural`, `preview: false`).

---

## Accessibility

### Semantic neutrality

`AspectRatio` renders a **non-semantic `<div>`** wrapper. Meaningful names come from the child.

### Media accessibility considerations

- Provide **`alt`** on **`Image`** children (or **`decorative`** when purely visual).
- Ensure caption text inside overlays meets contrast requirements on photo backgrounds.
- Do not clip essential text — handle overflow on the child or add padding inside the ratio box.

---

## SSR

### Static rendering

`AspectRatio` applies CSS **`aspect-ratio`** via inline styles on the server. Proportional dimensions are present in initial HTML — no client measurement required.

### Resumability compatibility

`AspectRatio` is stateless — no event handlers on the layout wrapper. Media children resume independently on the client.

---

## Flutter Equivalent

| Topic | Flutter `AspectRatio` | qwik-flutter-ui `AspectRatio` |
| --- | --- | --- |
| Purpose | Proportional child sizing | Same |
| `aspectRatio` | Required `width / height` | Same |
| Sizing model | Width from parent; height derived | Same |
| Invalid ratio | Framework assertion / behavior | Clamps to **`1`** (dev warning) |

**Flutter**

```dart
AspectRatio(
  aspectRatio: 16 / 9,
  child: Image.network(
    'https://example.com/hero.jpg',
    fit: BoxFit.cover,
  ),
)
```

**qwik-flutter-ui**

```tsx
<AspectRatio aspectRatio={16 / 9}>
  <Image
    src="https://example.com/hero.jpg"
    alt="Hero"
    width="100%"
    height="100%"
    fit={BoxFit.cover}
  />
</AspectRatio>
```

**Similarities:** Same required ratio prop, same width-driven height model, natural pairing with **`Image`**.

**Differences:** Renders HTML `<div>` with CSS `aspect-ratio`. Child **`Image`** uses **`src`** / **`alt`**. Invalid ratios clamp to **`1`** rather than throwing.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Container](/docs/widgets/layout/container) | Padding, decoration, and explicit sizing around ratio boxes. |
| [SizedBox](/docs/widgets/layout/sized-box) | Fixed-size gaps — not proportional media. |
| [Stack](/docs/widgets/layout/stack) | Overlays and captions on top of ratio-bound media. |
| [GridView](/docs/widgets/layout/grid-view) | Grid tiles with **`childAspectRatio`** for uniform cells. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: AspectRatio
description: Locks proportional width-to-height sizing for media, tiles, and banners using a required aspectRatio value.
widget: AspectRatio
category: layout
flutterEquivalent: AspectRatio
status: shipped
related:
  - Container
  - SizedBox
  - Stack
  - GridView
since: "0.0.1"
examples:
  - id: aspectratio-basic
    file: examples/aspect-ratio/basic.tsx
    category: basic
  - id: aspectratio-image-container
    file: examples/aspect-ratio/image-container.tsx
    category: common
  - id: aspectratio-video-thumbnail
    file: examples/aspect-ratio/video-thumbnail.tsx
    category: common
  - id: aspectratio-card-media
    file: examples/aspect-ratio/card-media.tsx
    category: common
  - id: aspectratio-responsive-banner
    file: examples/aspect-ratio/responsive-banner.tsx
    category: common
  - id: aspectratio-square
    file: examples/aspect-ratio/square.tsx
    category: variation
  - id: aspectratio-4-3
    file: examples/aspect-ratio/ratio-4-3.tsx
    category: variation
  - id: aspectratio-16-9
    file: examples/aspect-ratio/ratio-16-9.tsx
    category: variation
  - id: aspectratio-21-9
    file: examples/aspect-ratio/ratio-21-9.tsx
    category: variation
  - id: aspectratio-responsive-image
    file: examples/aspect-ratio/responsive-image.tsx
    category: common
  - id: aspectratio-embedded-video
    file: examples/aspect-ratio/embedded-video.tsx
    category: common
  - id: aspectratio-hero-banner
    file: examples/aspect-ratio/hero-banner.tsx
    category: common
  - id: aspectratio-product-card
    file: examples/aspect-ratio/product-card.tsx
    category: common
  - id: aspectratio-in-row
    file: examples/aspect-ratio/in-row.tsx
    category: common
  - id: aspectratio-in-column
    file: examples/aspect-ratio/in-column.tsx
    category: common
  - id: aspectratio-in-container
    file: examples/aspect-ratio/in-container.tsx
    category: common
  - id: aspectratio-in-gridview
    file: examples/aspect-ratio/in-gridview.tsx
    category: common
  - id: aspectratio-composition
    file: examples/aspect-ratio/composition.tsx
    category: composition
  - id: aspectratio-vs-fixed
    file: examples/aspect-ratio/vs-fixed.tsx
    category: common
  - id: aspectratio-vs-aspectratio
    file: examples/aspect-ratio/vs-aspectratio.tsx
    category: common
  - id: aspectratio-anti-unnecessary
    file: examples/aspect-ratio/anti-unnecessary.tsx
    category: anti-pattern
  - id: aspectratio-anti-conflict
    file: examples/aspect-ratio/anti-conflict.tsx
    category: anti-pattern
  - id: aspectratio-anti-natural
    file: examples/aspect-ratio/anti-natural.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/aspect-ratio/` when the docs site is implemented.
