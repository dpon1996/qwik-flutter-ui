---
title: SingleChildScrollView
description: Scrolls a single child when content overflows the available space — the primary pattern for forms, settings, and long prose.
widget: SingleChildScrollView
category: layout
flutterEquivalent: SingleChildScrollView
status: shipped
related:
  - Column
  - ListView
  - GridView
since: "0.0.1"
examples:
  - id: singlechildscrollview-basic
    file: examples/single-child-scroll-view/basic.tsx
    category: basic
  - id: singlechildscrollview-long-form
    file: examples/single-child-scroll-view/long-form.tsx
    category: common
  - id: singlechildscrollview-settings
    file: examples/single-child-scroll-view/settings.tsx
    category: common
  - id: singlechildscrollview-terms
    file: examples/single-child-scroll-view/terms.tsx
    category: common
  - id: singlechildscrollview-article
    file: examples/single-child-scroll-view/article.tsx
    category: common
  - id: singlechildscrollview-vertical
    file: examples/single-child-scroll-view/vertical.tsx
    category: variation
  - id: singlechildscrollview-horizontal
    file: examples/single-child-scroll-view/horizontal.tsx
    category: variation
  - id: singlechildscrollview-column-overflow
    file: examples/single-child-scroll-view/column-overflow.tsx
    category: common
  - id: singlechildscrollview-scrollable-column
    file: examples/single-child-scroll-view/scrollable-column.tsx
    category: common
  - id: singlechildscrollview-fixed-vs-scroll
    file: examples/single-child-scroll-view/fixed-vs-scroll.tsx
    category: common
  - id: singlechildscrollview-composition
    file: examples/single-child-scroll-view/composition.tsx
    category: composition
  - id: singlechildscrollview-vs-listview-scsv
    file: examples/single-child-scroll-view/vs-listview-scsv.tsx
    category: common
  - id: singlechildscrollview-vs-listview-list
    file: examples/single-child-scroll-view/vs-listview-list.tsx
    category: common
  - id: singlechildscrollview-anti-huge-list
    file: examples/single-child-scroll-view/anti-huge-list.tsx
    category: anti-pattern
  - id: singlechildscrollview-anti-nested
    file: examples/single-child-scroll-view/anti-nested.tsx
    category: anti-pattern
  - id: singlechildscrollview-anti-unnecessary
    file: examples/single-child-scroll-view/anti-unnecessary.tsx
    category: anti-pattern
---

# SingleChildScrollView

## Overview

`SingleChildScrollView` scrolls **one child subtree** when its content exceeds the available space along the scroll axis. It maps to Flutter's [`SingleChildScrollView`](https://api.flutter.dev/flutter/widgets/SingleChildScrollView-class.html).

Use it when a **single layout** (usually a `Column`) may overflow — long forms, settings screens, legal text, and article pages.

### Scrolling model

| Concept | Behavior |
| --- | --- |
| **Scrolling a single child** | One slotted subtree scrolls as a unit |
| **Handling overflow** | Scrollport appears when content exceeds bounds |
| **Vertical scrolling** | Default **`axis={Axis.vertical}`** |
| **Horizontal scrolling** | **`axis={Axis.horizontal}`** with a horizontal child (`Row`) |

The scrollport needs a **bounded size** on the scroll axis (sized parent, `Expanded`, or viewport height).

### SingleChildScrollView vs ListView vs GridView

| Widget | Child model | Use when |
| --- | --- | --- |
| **`SingleChildScrollView`** | One structured subtree | Forms, settings, prose |
| **`ListView`** | Many sibling list items | Feeds, settings rows, repeated cards |
| **`GridView`** | Many tiles in a grid | Product grids, photo galleries |

---

## Import

```tsx
import { SingleChildScrollView } from "qwik-flutter-ui";
```

Import layout widgets and enums when examples use them:

```tsx
import {
  Axis,
  Column,
  SingleChildScrollView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

A scrollable column inside a fixed-height container.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  SingleChildScrollView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container style={{ height: 160 }}>
      <SingleChildScrollView padding={16}>
        <Column gap={8}>
          <Text>Line 1</Text>
          <Text>Line 2</Text>
          <Text>Line 3</Text>
          <Text>Line 4</Text>
          <Text>Line 5</Text>
          <Text>Line 6</Text>
        </Column>
      </SingleChildScrollView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-basic`).

---

## Common Usage

### Long Form

Profile or account form that scrolls when fields exceed viewport height.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  CrossAxisAlignment,
  Form,
  SingleChildScrollView,
  Text,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container style={{ height: 320 }}>
      <SingleChildScrollView padding={16}>
        <Form onSubmit$={$(() => {})}>
          <Column gap={16} crossAxisAlignment={CrossAxisAlignment.stretch}>
            <Text as="h2">Edit profile</Text>
            <TextFormField name="name" decoration={{ label: "Name" }} />
            <TextFormField name="email" decoration={{ label: "Email" }} />
            <TextFormField
              name="bio"
              decoration={{ label: "Bio", placeholder: "Tell us about yourself" }}
              maxLines={4}
            />
            <TextFormField name="website" decoration={{ label: "Website" }} />
            <Button type="submit">Save</Button>
          </Column>
        </Form>
      </SingleChildScrollView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-long-form`).

---

### Settings Screen

Grouped settings fields in one scrollable column.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  SingleChildScrollView,
  Switch,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container style={{ height: 280 }}>
      <SingleChildScrollView padding={16}>
        <Column gap={20}>
          <Text as="h2">Notifications</Text>
          <Switch label="Email alerts" checked />
          <Switch label="Push notifications" checked={false} />
          <Text as="h2">Privacy</Text>
          <Switch label="Share analytics" checked={false} />
          <Switch label="Public profile" checked />
        </Column>
      </SingleChildScrollView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-settings`).

---

### Terms and Conditions

Long legal copy that scrolls as one document.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  SingleChildScrollView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container style={{ height: 240 }}>
      <SingleChildScrollView padding={16}>
        <Column gap={12}>
          <Text as="h2">Terms of service</Text>
          <Text as="p">
            By using this service you agree to the following terms. Content may be
            updated periodically. Please review this document carefully before
            continuing.
          </Text>
          <Text as="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Additional
            paragraphs continue below the fold and require scrolling to read in full.
          </Text>
          <Text as="p">
            Contact support if you have questions about these terms.
          </Text>
        </Column>
      </SingleChildScrollView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-terms`).

---

### Article Content

Blog or help article with headings and body paragraphs.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  FontWeight,
  SingleChildScrollView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container style={{ height: 300 }}>
      <SingleChildScrollView padding={16}>
        <Column gap={12}>
          <Text as="h1" fontWeight={FontWeight.bold}>
            Getting started
          </Text>
          <Text as="p">
            Welcome to qwik-flutter-ui. This guide walks through layout primitives
            and scrolling patterns for web apps.
          </Text>
          <Text as="h2">Layout</Text>
          <Text as="p">
            Start with Column and Row, then add SingleChildScrollView when content
            may exceed the viewport.
          </Text>
        </Column>
      </SingleChildScrollView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-article`).

---

## Scroll Direction

Use **`axis`** to set scroll orientation. Default is **`Axis.vertical`**.

> **API note:** Flutter names this prop `scrollDirection`. qwik-flutter-ui uses **`axis`** with the same `Axis` enum and equivalent behavior.

### Vertical Scrolling

Default — content scrolls top to bottom.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  SingleChildScrollView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container style={{ height: 120 }}>
      <SingleChildScrollView padding={12}>
        <Column gap={8}>
          <Text>Item A</Text>
          <Text>Item B</Text>
          <Text>Item C</Text>
          <Text>Item D</Text>
        </Column>
      </SingleChildScrollView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-vertical`).

---

### Horizontal Scrolling

Tag strip or carousel row — pair with **`Row`** and non-shrinking children.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Axis,
  Container,
  Row,
  SingleChildScrollView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const tags = ["Design", "Engineering", "Docs", "Release", "Community"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container style={{ width: 280 }}>
      <SingleChildScrollView axis={Axis.horizontal} padding={{ x: 12 }}>
        <Row gap={8}>
          {tags.map((tag) => (
            <Container
              key={tag}
              padding={8}
              backgroundColor="#e2e8f0"
              borderRadius={4}
              style={{ flexShrink: 0 }}
            >
              <Text>{tag}</Text>
            </Container>
          ))}
        </Row>
      </SingleChildScrollView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-horizontal`).

**Behavior difference:** Vertical scroll uses **`Column`** children; horizontal scroll uses **`Row`** with **`flexShrink: 0`** so items do not compress.

---

## Overflow Handling

### Column Overflow

A `Column` without a scroll parent overflows when content exceeds height.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container style={{ height: 120, overflow: "hidden" }}>
      <Column gap={8}>
        <Text>Visible</Text>
        <Text>Visible</Text>
        <Text>Clipped — no scroll</Text>
        <Text>Clipped — no scroll</Text>
      </Column>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-column-overflow`).

---

### Scrollable Column

Wrap the column in **`SingleChildScrollView`** to scroll overflow.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  SingleChildScrollView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container style={{ height: 120 }}>
      <SingleChildScrollView padding={12}>
        <Column gap={8}>
          <Text>Item 1</Text>
          <Text>Item 2</Text>
          <Text>Item 3</Text>
          <Text>Item 4</Text>
        </Column>
      </SingleChildScrollView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-scrollable-column`).

---

### Fixed Layout vs Scroll Layout

**Fixed** — short content fits; scroll adds little value.

**Scroll** — bounded parent + scroll view when content may grow.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  SingleChildScrollView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column style={{ height: 200 }} gap={16}>
      <Text as="h2">Fixed header</Text>
      <Expanded>
        <SingleChildScrollView padding={16}>
          <Column gap={8}>
            <Text>Scrollable body</Text>
            <Text>More content</Text>
            <Text>Footer stays outside scroll</Text>
          </Column>
        </SingleChildScrollView>
      </Expanded>
      <Text color="#64748b">Fixed footer</Text>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-fixed-vs-scroll`).

**Why scrolling is needed:** Flex children like **`Column`** default to visible overflow. A scrollport converts excess content into user-scrollable space instead of clipping.

---

## Composition

Combine scroll view with column layout, typography, forms, and surfaces.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Container,
  CrossAxisAlignment,
  Form,
  SingleChildScrollView,
  Text,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container style={{ height: 360 }} backgroundColor="#f8fafc">
      <SingleChildScrollView padding={24}>
        <Form onSubmit$={$(() => {})}>
          <Column gap={16} crossAxisAlignment={CrossAxisAlignment.stretch}>
            <Container padding={16} backgroundColor="#ffffff" borderRadius={8}>
              <Text as="h2">Contact</Text>
              <Text color="#64748b">We respond within one business day.</Text>
            </Container>
            <TextFormField name="email" decoration={{ label: "Email" }} />
            <TextFormField
              name="message"
              decoration={{ label: "Message" }}
              maxLines={5}
            />
            <Button type="submit">Send</Button>
          </Column>
        </Form>
      </SingleChildScrollView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-composition`).

**Patterns:**

- **`Column`** — primary child; use **`gap`** for spacing
- **`Text`** — headings (`as="h1"`, `as="p"`) and body copy
- **`Form`** + **`TextFormField`** — scrollable forms
- **`Container`** — section surfaces inside the scroll subtree
- **`padding`** on **`SingleChildScrollView`** — inset scroll content from edges

---

## SingleChildScrollView vs ListView

### SingleChildScrollView

One structured subtree — varied sections and form fields.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  SingleChildScrollView,
  Text,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container style={{ height: 200 }}>
      <SingleChildScrollView padding={16}>
        <Column gap={12}>
          <Text as="h2">Account</Text>
          <TextFormField name="name" decoration={{ label: "Display name" }} />
          <TextFormField name="email" decoration={{ label: "Email" }} />
        </Column>
      </SingleChildScrollView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-vs-listview-scsv`).

---

### ListView

Many similar sibling rows with list spacing.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  ListView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const items = ["Inbox", "Drafts", "Sent", "Archive", "Trash", "Spam"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <ListView padding={8} gap={4} style={{ height: 200 }}>
      {items.map((item) => (
        <Container key={item} padding={12} backgroundColor="#f8fafc">
          <Text>{item}</Text>
        </Container>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: singlechildscrollview-vs-listview-list`).

| Topic | **`SingleChildScrollView`** | **`ListView`** |
| --- | --- | --- |
| Content shape | One **`Column`** / structured subtree | Many repeated siblings |
| Finite content | Ideal — forms, articles, settings | Works for moderate lists |
| Large collections | All DOM nodes render at once | Same in v1 — prefer **`ListView`** semantics for uniform rows |
| Spacing | Use **`Column gap`** | Built-in **`gap`** between items |

---

## Best Practices

### Use for finite content

Forms, settings, legal text, and help articles — content with varied structure:

```tsx
<SingleChildScrollView padding={16}>
  <Column gap={16}>
    …
  </Column>
</SingleChildScrollView>
```

### Prefer ListView for long collections

When rendering **many similar rows**, use **`ListView`** instead of mapping dozens of items inside one **`Column`**:

```tsx
import { ListView, Text } from "qwik-flutter-ui";

<ListView gap={8} padding={16}>
  {items.map((item) => (
    <Text key={item.id}>{item.label}</Text>
  ))}
</ListView>
```

### Avoid nested scrolling when possible

One scrollport per axis per screen region. Nest scroll views only when the design requires it (e.g. horizontal chip strip inside vertical page scroll).

Pair with **`Expanded`** inside flex shells so the scroll view receives bounded height:

```tsx
<Expanded>
  <SingleChildScrollView padding={16}>
    <Column gap={12}>…</Column>
  </SingleChildScrollView>
</Expanded>
```

---

## Anti-Patterns

### Huge lists inside SingleChildScrollView

**Source** (avoid)

```tsx
<SingleChildScrollView>
  <Column gap={8}>
    {Array.from({ length: 500 }, (_, i) => (
      <Text key={i}>Row {i}</Text>
    ))}
  </Column>
</SingleChildScrollView>
```

**Preferred**

```tsx
import { ListView, Text } from "qwik-flutter-ui";

<ListView gap={8} padding={16}>
  {items.map((item) => (
    <Text key={item.id}>{item.label}</Text>
  ))}
</ListView>
```

**Why:** Long uniform lists belong in **`ListView`**. **`SingleChildScrollView`** is for one structured subtree, not hundreds of repeated rows.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: singlechildscrollview-anti-huge-list`, `preview: false`).

---

### Nested scroll views

**Source** (avoid)

```tsx
<SingleChildScrollView>
  <Column>
    <SingleChildScrollView>
      <Text>Nested scroll</Text>
    </SingleChildScrollView>
  </Column>
</SingleChildScrollView>
```

**Preferred**

```tsx
import { Column, SingleChildScrollView, Text } from "qwik-flutter-ui";

<SingleChildScrollView padding={16}>
  <Column gap={12}>
    <Text>Single scroll region</Text>
  </Column>
</SingleChildScrollView>
```

**Why:** Nested vertical scrollports confuse keyboard and pointer interaction. Flatten to one primary scroll area.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: singlechildscrollview-anti-nested`, `preview: false`).

---

### Unnecessary scroll wrappers

**Source** (avoid)

```tsx
<Container style={{ height: 400 }}>
  <SingleChildScrollView>
    <Column gap={8}>
      <Text>Short content</Text>
    </Column>
  </SingleChildScrollView>
</Container>
```

**Preferred**

```tsx
import { Column, Container, Text } from "qwik-flutter-ui";

<Container padding={16}>
  <Column gap={8}>
    <Text>Short content</Text>
  </Column>
</Container>
```

**Why:** If content always fits, skip the scroll wrapper — it adds scrollport complexity without benefit.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: singlechildscrollview-anti-unnecessary`, `preview: false`).

---

## Accessibility

### Keyboard scrolling

Native overflow scrolling supports arrow keys and Page Up/Down when the scrollport is focused. Pass **`tabIndex={0}`** via **`BaseProps`** when a nested scroll region must receive keyboard focus explicitly.

### Screen reader behavior

`SingleChildScrollView` does **not** set `role="region"` by default. Content inside is announced in DOM order as users scroll.

For horizontal scroll (`axis={Axis.horizontal}`), set **`aria-orientation="horizontal"`** via **`BaseProps`** when it helps assistive technology.

### Focus navigation

Tab order follows DOM structure inside the scroll subtree. Ensure form fields and buttons inside scroll areas remain reachable — do not trap focus unless building a modal (use overlay widgets for that).

Prefer **document-level scroll** for primary page content when the app shell allows it.

---

## SSR

### Static rendering

`SingleChildScrollView` renders a scrollport `<div>` with `overflow: auto` on the server. Full content is in the initial HTML — scrolling is handled by the browser without hydration-specific scroll logic.

### Resumability compatibility

No scroll listeners or measurement hooks on the scroll view itself. Form and button handlers inside the child subtree resume independently on the client.

---

## Flutter Equivalent

| Topic | Flutter `SingleChildScrollView` | qwik-flutter-ui `SingleChildScrollView` |
| --- | --- | --- |
| Purpose | Scroll one child | Same |
| Scroll axis | `scrollDirection` (`Axis`) | **`axis`** (`Axis`) — same behavior |
| `padding` | `EdgeInsets` | Same |
| `reverse` | Supported | Supported |
| `clipBehavior` | Default clip | Default **`Clip.hardEdge`** |
| Virtualization | None | None |

**Flutter**

```dart
SingleChildScrollView(
  padding: EdgeInsets.all(16),
  child: Column(
    children: [
      Text('Profile', style: TextStyle(fontSize: 24)),
      TextField(decoration: InputDecoration(labelText: 'Name')),
    ],
  ),
)
```

**qwik-flutter-ui**

```tsx
<SingleChildScrollView padding={16}>
  <Column gap={12}>
    <Text as="h2">Profile</Text>
    <TextFormField name="name" decoration={{ label: "Name" }} />
  </Column>
</SingleChildScrollView>
```

**Similarities:** Single-child scroll model, padding, reverse, clip behavior, pairing with **`Column`**.

**Differences:** Prop is **`axis`** not **`scrollDirection`**. Renders HTML overflow scroll. No **`ScrollController`** or **`physics`** in v1. Child forms use **`TextFormField`** with **`decoration`** objects.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Column](/docs/widgets/layout/column) | Primary child layout for vertical scroll content. |
| [ListView](/docs/widgets/layout/list-view) | Scrollable list of many sibling items. |
| [GridView](/docs/widgets/layout/grid-view) | Scrollable two-dimensional tile grid. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: SingleChildScrollView
description: Scrolls a single child when content overflows the available space — the primary pattern for forms, settings, and long prose.
widget: SingleChildScrollView
category: layout
flutterEquivalent: SingleChildScrollView
status: shipped
related:
  - Column
  - ListView
  - GridView
since: "0.0.1"
examples:
  - id: singlechildscrollview-basic
    file: examples/single-child-scroll-view/basic.tsx
    category: basic
  - id: singlechildscrollview-long-form
    file: examples/single-child-scroll-view/long-form.tsx
    category: common
  - id: singlechildscrollview-settings
    file: examples/single-child-scroll-view/settings.tsx
    category: common
  - id: singlechildscrollview-terms
    file: examples/single-child-scroll-view/terms.tsx
    category: common
  - id: singlechildscrollview-article
    file: examples/single-child-scroll-view/article.tsx
    category: common
  - id: singlechildscrollview-vertical
    file: examples/single-child-scroll-view/vertical.tsx
    category: variation
  - id: singlechildscrollview-horizontal
    file: examples/single-child-scroll-view/horizontal.tsx
    category: variation
  - id: singlechildscrollview-column-overflow
    file: examples/single-child-scroll-view/column-overflow.tsx
    category: common
  - id: singlechildscrollview-scrollable-column
    file: examples/single-child-scroll-view/scrollable-column.tsx
    category: common
  - id: singlechildscrollview-fixed-vs-scroll
    file: examples/single-child-scroll-view/fixed-vs-scroll.tsx
    category: common
  - id: singlechildscrollview-composition
    file: examples/single-child-scroll-view/composition.tsx
    category: composition
  - id: singlechildscrollview-vs-listview-scsv
    file: examples/single-child-scroll-view/vs-listview-scsv.tsx
    category: common
  - id: singlechildscrollview-vs-listview-list
    file: examples/single-child-scroll-view/vs-listview-list.tsx
    category: common
  - id: singlechildscrollview-anti-huge-list
    file: examples/single-child-scroll-view/anti-huge-list.tsx
    category: anti-pattern
  - id: singlechildscrollview-anti-nested
    file: examples/single-child-scroll-view/anti-nested.tsx
    category: anti-pattern
  - id: singlechildscrollview-anti-unnecessary
    file: examples/single-child-scroll-view/anti-unnecessary.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/single-child-scroll-view/` when the docs site is implemented.
