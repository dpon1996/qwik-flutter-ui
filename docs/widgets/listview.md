---
title: ListView
description: Scrollable list of sibling items with built-in gap spacing — the primary pattern for feeds, settings rows, and collections.
widget: ListView
category: layout
flutterEquivalent: ListView
status: shipped
related:
  - SingleChildScrollView
  - GridView
  - Column
since: "0.0.1"
examples:
  - id: listview-basic
    file: examples/list-view/basic.tsx
    category: basic
  - id: listview-settings
    file: examples/list-view/settings.tsx
    category: common
  - id: listview-contacts
    file: examples/list-view/contacts.tsx
    category: common
  - id: listview-products
    file: examples/list-view/products.tsx
    category: common
  - id: listview-activity-feed
    file: examples/list-view/activity-feed.tsx
    category: common
  - id: listview-vertical
    file: examples/list-view/vertical.tsx
    category: variation
  - id: listview-horizontal
    file: examples/list-view/horizontal.tsx
    category: variation
  - id: listview-composition
    file: examples/list-view/composition.tsx
    category: composition
  - id: listview-vs-scsv-finite
    file: examples/list-view/vs-scsv-finite.tsx
    category: common
  - id: listview-vs-scsv-repeated
    file: examples/list-view/vs-scsv-repeated.tsx
    category: common
  - id: listview-vs-grid-list
    file: examples/list-view/vs-grid-list.tsx
    category: common
  - id: listview-vs-grid-grid
    file: examples/list-view/vs-grid-grid.tsx
    category: common
  - id: listview-mobile-feed
    file: examples/list-view/mobile-feed.tsx
    category: common
  - id: listview-settings-screen
    file: examples/list-view/settings-screen.tsx
    category: common
  - id: listview-dashboard-stream
    file: examples/list-view/dashboard-stream.tsx
    category: common
  - id: listview-anti-column
    file: examples/list-view/anti-column.tsx
    category: anti-pattern
  - id: listview-anti-nested
    file: examples/list-view/anti-nested.tsx
    category: anti-pattern
  - id: listview-anti-inconsistent
    file: examples/list-view/anti-inconsistent.tsx
    category: anti-pattern
---

# ListView

## Overview

`ListView` scrolls **many sibling items** in one scrollport along the main axis. It maps to Flutter's [`ListView`](https://api.flutter.dev/flutter/widgets/ListView-class.html).

Use `ListView` for **collections** — settings rows, contacts, product catalogs, and activity feeds — when items share a list layout and scroll together.

### List rendering model

| Concept | Behavior |
| --- | --- |
| **Scrollable lists** | One scrollport owns main-axis overflow |
| **Repeated content** | Map data to slotted children |
| **Collection rendering** | Each direct child is one list item |
| **Vertical and horizontal lists** | Default vertical; **`axis={Axis.horizontal}`** for carousels |

Give the list a **bounded size** on the scroll axis (explicit height/width, `Expanded`, or flex parent).

### ListView vs SingleChildScrollView vs GridView

| Widget | Child model | Use when |
| --- | --- | --- |
| **`ListView`** | Many sibling items | Feeds, settings rows, repeated cards |
| **`SingleChildScrollView`** | One structured subtree (`Column`) | Forms, articles, varied sections |
| **`GridView`** | Many tiles in columns | Product grids, photo galleries |

---

## Import

```tsx
import { ListView } from "qwik-flutter-ui";
```

Import layout widgets and enums when examples use them:

```tsx
import {
  Axis,
  Container,
  ListView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

A vertical list of labels with gap spacing.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { ListView, Text, ThemeProvider } from "qwik-flutter-ui";

const items = ["Inbox", "Drafts", "Sent", "Archive"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <ListView padding={8} gap={4} style={{ height: 200 }}>
      {items.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-basic`).

---

## Common Usage

### Settings List

Toggle rows with consistent list item chrome.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  ListView,
  Switch,
  ThemeProvider,
} from "qwik-flutter-ui";

const settings = [
  { id: "email", label: "Email alerts", checked: true },
  { id: "push", label: "Push notifications", checked: false },
  { id: "sms", label: "SMS updates", checked: false },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <ListView gap={8} padding={16} style={{ height: 240 }}>
      {settings.map((row) => (
        <Container key={row.id} padding={12} backgroundColor="#f8fafc" borderRadius={8}>
          <Switch label={row.label} checked={row.checked} />
        </Container>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-settings`).

---

### Contact List

Name and subtitle per row.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  FontWeight,
  ListView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const contacts = [
  { id: "1", name: "Alex Morgan", email: "alex@example.com" },
  { id: "2", name: "Jordan Lee", email: "jordan@example.com" },
  { id: "3", name: "Sam Patel", email: "sam@example.com" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <ListView gap={8} padding={16} style={{ height: 280 }}>
      {contacts.map((contact) => (
        <Container key={contact.id} padding={12} backgroundColor="#ffffff" borderRadius={8}>
          <Column gap={4}>
            <Text fontWeight={FontWeight.bold}>{contact.name}</Text>
            <Text color="#64748b">{contact.email}</Text>
          </Column>
        </Container>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-contacts`).

---

### Product List

Card-style product rows.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Column,
  FontWeight,
  ListView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const products = [
  { id: "lamp", title: "Desk lamp", price: "$49" },
  { id: "chair", title: "Office chair", price: "$199" },
  { id: "rug", title: "Area rug", price: "$89" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <ListView gap={12} padding={16} style={{ height: 320 }}>
      {products.map((product) => (
        <Card key={product.id} padding={16}>
          <Column gap={4}>
            <Text fontWeight={FontWeight.bold}>{product.title}</Text>
            <Text color="#64748b">{product.price}</Text>
          </Column>
        </Card>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-products`).

---

### Activity Feed

Timestamped events in scroll order.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  ListView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const events = [
  { id: "1", title: "Deploy completed", time: "2 min ago" },
  { id: "2", title: "New signup", time: "14 min ago" },
  { id: "3", title: "Invoice paid", time: "1 hr ago" },
  { id: "4", title: "Comment on PR #42", time: "3 hr ago" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <ListView gap={8} padding={16} style={{ height: 260 }}>
      {events.map((event) => (
        <Container key={event.id} padding={12} backgroundColor="#f1f5f9" borderRadius={8}>
          <Column gap={4}>
            <Text>{event.title}</Text>
            <Text color="#64748b">{event.time}</Text>
          </Column>
        </Container>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-activity-feed`).

---

## Scroll Direction

Use **`axis`** for scroll orientation. Default is **`Axis.vertical`**.

> **API note:** Flutter uses `scrollDirection`. qwik-flutter-ui uses **`axis`** with the same `Axis` enum.

### Vertical List

Standard top-to-bottom feed.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Container, ListView, Text, ThemeProvider } from "qwik-flutter-ui";

const rows = ["Row A", "Row B", "Row C", "Row D"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <ListView gap={8} padding={12} style={{ height: 160 }}>
      {rows.map((row) => (
        <Container key={row} padding={8} backgroundColor="#e2e8f0">
          <Text>{row}</Text>
        </Container>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-vertical`).

---

### Horizontal List

Chip or thumbnail carousel — use **`shrinkWrap`** and non-shrinking items.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Axis,
  Container,
  ListView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const chips = ["All", "Design", "Engineering", "Docs", "Release"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <ListView
      axis={Axis.horizontal}
      shrinkWrap
      gap={8}
      padding={{ x: 12 }}
      style={{ width: 280 }}
    >
      {chips.map((chip) => (
        <Container
          key={chip}
          padding={8}
          backgroundColor="#dbeafe"
          borderRadius={16}
          style={{ flexShrink: 0 }}
        >
          <Text>{chip}</Text>
        </Container>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-horizontal`).

**Behavior difference:** Vertical lists stack items in a column flex; horizontal lists use row flex. Set **`flexShrink: 0`** on horizontal items so they keep intrinsic width.

---

## List Composition

Combine list items from typography, surfaces, cards, and actions.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Card,
  Column,
  Container,
  FontWeight,
  ListView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const tasks = [
  { id: "1", title: "Review PR", detail: "Backend API changes" },
  { id: "2", title: "Update docs", detail: "ListView page draft" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <ListView gap={12} padding={16} style={{ height: 280 }}>
      {tasks.map((task) => (
        <Card key={task.id} padding={16}>
          <Column gap={8}>
            <Text fontWeight={FontWeight.bold}>{task.title}</Text>
            <Text color="#64748b">{task.detail}</Text>
            <Container>
              <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
                Open
              </Button>
            </Container>
          </Column>
        </Card>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-composition`).

**Patterns:**

- **`Text`** — primary and secondary line per row
- **`Container`** — row backgrounds and tap targets
- **`Card`** — elevated list tiles
- **`Button`** — trailing actions inside a row
- **`gap`** — spacing between items (library extension over Flutter)

---

## ListView vs SingleChildScrollView

### Finite Content

Varied sections belong in one scrollable **`Column`**.

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
    <Container style={{ height: 220 }}>
      <SingleChildScrollView padding={16}>
        <Form onSubmit$={$(() => {})}>
          <Column gap={12} crossAxisAlignment={CrossAxisAlignment.stretch}>
            <Text as="h2">Account</Text>
            <TextFormField name="name" decoration={{ label: "Name" }} />
            <TextFormField name="email" decoration={{ label: "Email" }} />
            <Button type="submit">Save</Button>
          </Column>
        </Form>
      </SingleChildScrollView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-vs-scsv-finite`).

---

### Repeated Content

Many similar rows — **`ListView`** owns spacing and list semantics.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  ListView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const folders = ["Inbox", "Drafts", "Sent", "Archive", "Trash"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <ListView gap={4} padding={8} style={{ height: 220 }}>
      {folders.map((folder) => (
        <Container key={folder} padding={12} backgroundColor="#f8fafc">
          <Text>{folder}</Text>
        </Container>
      ))}
    </ListView>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-vs-scsv-repeated`).

| Topic | **`SingleChildScrollView`** | **`ListView`** |
| --- | --- | --- |
| Content shape | One **`Column`** with varied sections | Many mapped siblings |
| Maintainability | Best for forms and prose | Best for uniform collections |
| Spacing | **`Column gap`** | Built-in **`gap`** between items |
| Performance (v1) | All nodes in DOM | All nodes in DOM — choose by structure, not virtualization |

---

## ListView vs GridView

### List Layout

One item per row — reading order top to bottom.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  Column,
  ListView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-vs-grid-list`).

---

### Grid Layout

Multi-column tiles for browse-heavy UIs.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Card,
  GridView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-vs-grid-grid`).

| Prefer **`ListView`** | Prefer **`GridView`** |
| --- | --- |
| Feeds and timelines | Product browse grids |
| Settings and mail folders | Photo galleries |
| One primary line per item | Two-dimensional tile layout |
| Dense reading order | Visual catalog scanning |

---

## Responsive Layouts

### Mobile Feed

Full-width list constrained by a max-width shell.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  ListView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const posts = [
  { id: "1", body: "Shipped ListView documentation." },
  { id: "2", body: "Updated scroll widget examples." },
  { id: "3", body: "Fixed form layout on mobile." },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16} style={{ maxWidth: 480, height: 320 }}>
      <ListView gap={12}>
        {posts.map((post) => (
          <Container key={post.id} padding={12} backgroundColor="#f8fafc" borderRadius={8}>
            <Text>{post.body}</Text>
          </Container>
        ))}
      </ListView>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-mobile-feed`).

---

### Settings Screen

List fills remaining space below a header.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  ListView,
  Switch,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const rows = [
  { id: "dark", label: "Dark mode" },
  { id: "compact", label: "Compact density" },
  { id: "beta", label: "Beta features" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column style={{ height: 280 }}>
      <Container padding={16}>
        <Text as="h2">Preferences</Text>
      </Container>
      <Expanded>
        <ListView gap={8} padding={16}>
          {rows.map((row) => (
            <Container key={row.id} padding={12} backgroundColor="#ffffff" borderRadius={8}>
              <Switch label={row.label} checked={false} />
            </Container>
          ))}
        </ListView>
      </Expanded>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-settings-screen`).

---

### Dashboard Activity Stream

Scrollable event list beside fixed dashboard chrome.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Column,
  Container,
  Expanded,
  FontWeight,
  ListView,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

const activity = [
  { id: "1", label: "Build passed", time: "09:12" },
  { id: "2", label: "Deploy started", time: "09:45" },
  { id: "3", label: "Alert resolved", time: "10:03" },
  { id: "4", label: "New comment", time: "10:18" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Container padding={16} backgroundColor="#f8fafc" style={{ height: 320 }}>
      <Column gap={12} style={{ height: "100%" }}>
        <Text fontWeight={FontWeight.bold}>Activity</Text>
        <Expanded>
          <ListView gap={8}>
            {activity.map((item) => (
              <Container key={item.id} padding={10} backgroundColor="#ffffff" borderRadius={6}>
                <Column gap={2}>
                  <Text>{item.label}</Text>
                  <Text color="#64748b">{item.time}</Text>
                </Column>
              </Container>
            ))}
          </ListView>
        </Expanded>
      </Column>
    </Container>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: listview-dashboard-stream`).

**Responsive note:** Pair **`Expanded`** with **`ListView`** inside flex shells so the list receives bounded height on mobile and desktop.

---

## Best Practices

### Use ListView for collections

Map data to direct children instead of building one giant **`Column`**:

```tsx
<ListView gap={8} padding={16} style={{ height: 400 }}>
  {items.map((item) => (
    <Container key={item.id} padding={12}>
      <Text>{item.label}</Text>
    </Container>
  ))}
</ListView>
```

### Keep item layouts consistent

Reuse one row component or card template so **`gap`** and alignment stay uniform:

```tsx
{contacts.map((contact) => (
  <Container key={contact.id} padding={12} backgroundColor="#f8fafc">
    <Text>{contact.name}</Text>
  </Container>
))}
```

Use **`itemExtent`** when every row must share the same main-axis size.

### Avoid unnecessary nesting

Do not wrap each item in an extra scroll view. One **`ListView`** per scroll region.

---

## Anti-Patterns

### Huge Column inside SingleChildScrollView instead of ListView

**Source** (avoid)

```tsx
<SingleChildScrollView>
  <Column gap={8}>
    {items.map((item) => (
      <Text key={item.id}>{item.label}</Text>
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

**Why:** Repeated siblings are **`ListView`**'s purpose — clearer intent and built-in list **`gap`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: listview-anti-column`, `preview: false`).

---

### Nested scrolling

**Source** (avoid)

```tsx
<SingleChildScrollView>
  <Column>
    <ListView style={{ height: 200 }}>…</ListView>
  </Column>
</SingleChildScrollView>
```

**Preferred**

```tsx
import { Column, ListView, Text } from "qwik-flutter-ui";

<Column style={{ height: 400 }}>
  <Text>Header</Text>
  <ListView gap={8} style={{ flex: 1, minHeight: 0 }}>
    …
  </ListView>
</Column>
```

**Why:** Nested scrollports fight for wheel and touch gestures. One primary scroll owner per axis.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: listview-anti-nested`, `preview: false`).

---

### Inconsistent item sizing

**Source** (avoid)

```tsx
<ListView itemExtent={56}>
  {items.map((item) => (
    <Container key={item.id} padding={24}>
      <Text>{item.label}</Text>
      <Text>{item.description}</Text>
    </Container>
  ))}
</ListView>
```

**Preferred**

```tsx
import { Column, Container, ListView, Text } from "qwik-flutter-ui";

<ListView gap={8}>
  {items.map((item) => (
    <Container key={item.id} padding={12}>
      <Column gap={4}>
        <Text>{item.label}</Text>
        <Text color="#64748b">{item.description}</Text>
      </Column>
    </Container>
  ))}
</ListView>
```

**Why:** **`itemExtent`** fixes main-axis size per child — multi-line content overflows. Omit **`itemExtent`** for variable-height rows, or trim row content to fit.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: listview-anti-inconsistent`, `preview: false`).

---

## Accessibility

### Reading order

Items are announced in **DOM order** (top to bottom for vertical lists). Map data in the order users should read it.

### Keyboard navigation

Native overflow scrolling supports keyboard scroll when the scrollport is focused. Pass **`tabIndex={0}`** when a nested list region must capture keyboard scroll explicitly.

Interactive rows should use **`Button`**, links, or native inputs — not click-only **`div`** wrappers without roles.

### Screen reader expectations

`ListView` does **not** set **`role="list"`** or **`role="listitem"`** by default. Opt in via **`role`** on **`BaseProps`** when markup represents a semantic list. Many feeds are card dashboards, not literal lists.

---

## SSR

### Static rendering

`ListView` renders a scrollport with all slotted children in the initial HTML. Scrolling uses CSS overflow — no client measurement or scroll listeners on the widget itself.

### Resumability compatibility

The list container is stateless. Interactive items (`Button`, `Switch`) inside rows resume independently on the client.

---

## Flutter Equivalent

| Topic | Flutter `ListView` | qwik-flutter-ui `ListView` |
| --- | --- | --- |
| Purpose | Scroll many children | Same |
| Scroll axis | `scrollDirection` | **`axis`** — equivalent |
| `padding` | `EdgeInsets` | Same |
| `gap` | Not on Flutter `ListView` | Library extension |
| Builders | `ListView.builder` | Slotted children only in v1 |
| Virtualization | Optional builder lazy build | Non-virtualized in v1 |

**Flutter**

```dart
ListView(
  padding: EdgeInsets.all(8),
  children: items.map((item) => ListTile(
    title: Text(item.title),
  )).toList(),
)
```

**qwik-flutter-ui**

```tsx
<ListView padding={8} gap={4}>
  {items.map((item) => (
    <Container key={item.id} padding={12}>
      <Text>{item.title}</Text>
    </Container>
  ))}
</ListView>
```

**Similarities:** Scrollport model, padding, reverse, slotted children pattern.

**Differences:** Prop is **`axis`** not **`scrollDirection`**. Built-in **`gap`**. No **`itemBuilder$`** in v1 — map in JSX. All items render in the DOM (moderate list sizes). Use **`Container`** / **`Card`** instead of **`ListTile`** (not shipped).

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [SingleChildScrollView](/docs/widgets/layout/single-child-scroll-view) | Scrolls one structured subtree — forms and articles. |
| [GridView](/docs/widgets/layout/grid-view) | Scrollable multi-column tile grid. |
| [Column](/docs/widgets/layout/column) | Non-scrolling vertical stack; pair with scroll widgets when needed. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: ListView
description: Scrollable list of sibling items with built-in gap spacing — the primary pattern for feeds, settings rows, and collections.
widget: ListView
category: layout
flutterEquivalent: ListView
status: shipped
related:
  - SingleChildScrollView
  - GridView
  - Column
since: "0.0.1"
examples:
  - id: listview-basic
    file: examples/list-view/basic.tsx
    category: basic
  - id: listview-settings
    file: examples/list-view/settings.tsx
    category: common
  - id: listview-contacts
    file: examples/list-view/contacts.tsx
    category: common
  - id: listview-products
    file: examples/list-view/products.tsx
    category: common
  - id: listview-activity-feed
    file: examples/list-view/activity-feed.tsx
    category: common
  - id: listview-vertical
    file: examples/list-view/vertical.tsx
    category: variation
  - id: listview-horizontal
    file: examples/list-view/horizontal.tsx
    category: variation
  - id: listview-composition
    file: examples/list-view/composition.tsx
    category: composition
  - id: listview-vs-scsv-finite
    file: examples/list-view/vs-scsv-finite.tsx
    category: common
  - id: listview-vs-scsv-repeated
    file: examples/list-view/vs-scsv-repeated.tsx
    category: common
  - id: listview-vs-grid-list
    file: examples/list-view/vs-grid-list.tsx
    category: common
  - id: listview-vs-grid-grid
    file: examples/list-view/vs-grid-grid.tsx
    category: common
  - id: listview-mobile-feed
    file: examples/list-view/mobile-feed.tsx
    category: common
  - id: listview-settings-screen
    file: examples/list-view/settings-screen.tsx
    category: common
  - id: listview-dashboard-stream
    file: examples/list-view/dashboard-stream.tsx
    category: common
  - id: listview-anti-column
    file: examples/list-view/anti-column.tsx
    category: anti-pattern
  - id: listview-anti-nested
    file: examples/list-view/anti-nested.tsx
    category: anti-pattern
  - id: listview-anti-inconsistent
    file: examples/list-view/anti-inconsistent.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/list-view/` when the docs site is implemented.
