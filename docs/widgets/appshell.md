---
title: AppShell
description: Root application layout shell with semantic regions for app bar, drawer, side sheet, main content, and bottom navigation.
widget: AppShell
category: app-structure
flutterEquivalent: Scaffold
status: shipped
related:
  - AppBar
  - Drawer
  - SideSheet
  - BottomNavigationBar
  - OverlayContainer
  - Column
  - Expanded
since: "0.0.1"
examples:
  - id: appshell-basic
    file: examples/appshell/basic.tsx
    category: basic
  - id: appshell-minimal
    file: examples/appshell/minimal.tsx
    category: common
  - id: appshell-dashboard
    file: examples/appshell/dashboard.tsx
    category: common
  - id: appshell-admin
    file: examples/appshell/admin.tsx
    category: common
  - id: appshell-mobile
    file: examples/appshell/mobile.tsx
    category: common
  - id: appshell-region-appbar
    file: examples/appshell/region-appbar.tsx
    category: regions
  - id: appshell-region-drawer
    file: examples/appshell/region-drawer.tsx
    category: regions
  - id: appshell-region-sidesheet
    file: examples/appshell/region-sidesheet.tsx
    category: regions
  - id: appshell-region-main
    file: examples/appshell/region-main.tsx
    category: regions
  - id: appshell-region-bottom-nav
    file: examples/appshell/region-bottom-nav.tsx
    category: regions
  - id: appshell-composition-appbar
    file: examples/appshell/composition-appbar.tsx
    category: composition
  - id: appshell-composition-drawer
    file: examples/appshell/composition-drawer.tsx
    category: composition
  - id: appshell-composition-sidesheet
    file: examples/appshell/composition-sidesheet.tsx
    category: composition
  - id: appshell-composition-bottom-nav
    file: examples/appshell/composition-bottom-nav.tsx
    category: composition
  - id: appshell-pattern-content-only
    file: examples/appshell/pattern-content-only.tsx
    category: patterns
  - id: appshell-pattern-appbar-content
    file: examples/appshell/pattern-appbar-content.tsx
    category: patterns
  - id: appshell-pattern-drawer-content
    file: examples/appshell/pattern-drawer-content.tsx
    category: patterns
  - id: appshell-pattern-full
    file: examples/appshell/pattern-full.tsx
    category: patterns
  - id: appshell-vs-row-appshell
    file: examples/appshell/vs-row-appshell.tsx
    category: comparison
  - id: appshell-vs-row-row
    file: examples/appshell/vs-row-row.tsx
    category: comparison
  - id: appshell-best-one-per-app
    file: examples/appshell/best-one-per-app.tsx
    category: best-practice
  - id: appshell-best-clear-responsibilities
    file: examples/appshell/best-clear-responsibilities.tsx
    category: best-practice
  - id: appshell-best-compose-chrome
    file: examples/appshell/best-compose-chrome.tsx
    category: best-practice
  - id: appshell-anti-nested
    file: examples/appshell/anti-nested.tsx
    category: anti-pattern
  - id: appshell-anti-local-layout
    file: examples/appshell/anti-local-layout.tsx
    category: anti-pattern
  - id: appshell-anti-excessive-nesting
    file: examples/appshell/anti-excessive-nesting.tsx
    category: anti-pattern
---

# AppShell

## Overview

`AppShell` is the **root application layout shell** — it defines persistent page regions and a primary content area. It maps to Flutter's [`Scaffold`](https://api.flutter.dev/flutter/material/Scaffold-class.html).

`AppShell` is **stateless**. It owns **structure and semantic landmarks only** — drawer open state, side sheet visibility, and navigation selection live in your app or in chrome widgets (`Drawer`, `SideSheet`, etc.).

Wrap the app with **`ThemeProvider`** and **`OverlayContainer`** for overlays; place **`AppShell`** inside for page structure.

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Application structure** | Top chrome, body row, optional bottom nav — one layout for the whole app |
| **Persistent layout regions** | `appBar`, `drawer`, `sideSheet`, `bottomNavigationBar` slots |
| **Application-level composition** | Wire chrome widgets once at the root; pages fill `<main>` |
| **Layout ownership** | AppShell positions regions; chrome widgets own visibility and interaction |

### When to use AppShell

- Every full-page Qwik application view
- Dashboards, admin panels, and mobile-style apps with shared chrome
- Any layout that needs a single `<main>` landmark and optional header/nav regions

Use **`Row`**, **`Column`**, and **`Container`** inside `<main>` for page-level layout — not as a substitute for `AppShell`.

### AppShell vs Container vs Row vs Column

| | `AppShell` | `Container` | `Row` / `Column` |
| --- | --- | --- | --- |
| **Scope** | Application root | Styled box / padding | Flex child arrangement |
| **Landmarks** | `<header>`, `<main>`, `<nav>` | None | None |
| **Regions** | appBar, drawer, sideSheet, bottom nav | N/A | N/A |
| **State** | None | None | None |
| **Best for** | App chrome + body | Cards, panels, spacing | Page content layout |

---

## Import

```tsx
import {
  AppBar,
  AppShell,
  Button,
  Column,
  Container,
  Drawer,
  Expanded,
  OverlayContainer,
  Row,
  SideSheet,
  SideSheetPosition,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working shell — body content only.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AppShell,
  Column,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppShell>
      <Column gap={16}>
        <Text as="h1">Welcome</Text>
        <Text>Page content goes here.</Text>
      </Column>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-basic`).

---

## Common Usage

### Minimal Application

Content-only shell for simple apps or marketing pages.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AppShell,
  Column,
  Container,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppShell>
      <Container padding={24}>
        <Column gap={12}>
          <Text as="h1">Hello</Text>
          <Text>A minimal app with no chrome regions.</Text>
        </Column>
      </Container>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-minimal`).

---

### Dashboard Layout

App bar plus scrollable dashboard body.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  Column,
  Container,
  Expanded,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppShell
      appBar={<AppBar title={<Text as="h1">Dashboard</Text>} />}
    >
      <Container padding={24}>
        <Column gap={16}>
          <Text as="h2">Overview</Text>
          <Row gap={16}>
            <Expanded>
              <Container padding={16} backgroundColor="#f5f5f5">
                <Text>Users: 1,204</Text>
              </Container>
            </Expanded>
            <Expanded>
              <Container padding={16} backgroundColor="#f5f5f5">
                <Text>Revenue: $48k</Text>
              </Container>
            </Expanded>
          </Row>
        </Column>
      </Container>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-dashboard`).

---

### Admin Layout

Full chrome: app bar, navigation drawer, and filter side sheet.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  Button,
  Column,
  Container,
  Drawer,
  OverlayContainer,
  SideSheet,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const drawerOpen = useSignal(false);
  const sideSheetOpen = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <AppShell
          appBar={
            <AppBar
              leading={
                <Button
                  type="button"
                  aria-label="Open navigation menu"
                  aria-expanded={drawerOpen.value}
                  onClick$={$(() => {
                    drawerOpen.value = true;
                  })}
                >
                  ☰
                </Button>
              }
              title={<Text as="h1">Admin</Text>}
              actions={[
                <Button
                  key="filters"
                  type="button"
                  onClick$={$(() => {
                    sideSheetOpen.value = !sideSheetOpen.value;
                  })}
                >
                  Filters
                </Button>,
              ]}
            />
          }
          drawer={
            <Drawer
              open={drawerOpen.value}
              onOpenChange$={$((next) => {
                drawerOpen.value = next;
              })}
            >
              <nav aria-label="Main">
                <Container padding={16}>
                  <Column gap={8}>
                    <Button type="button">Users</Button>
                    <Button type="button">Reports</Button>
                  </Column>
                </Container>
              </nav>
            </Drawer>
          }
          sideSheet={
            <SideSheet open={sideSheetOpen.value} aria-label="Filters">
              <Container padding={16}>
                <Text>Filter panel</Text>
              </Container>
            </SideSheet>
          }
        >
          <Container padding={24}>
            <Text>Admin content</Text>
          </Container>
        </AppShell>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-admin`).

---

### Mobile Application

App bar, main content, and bottom destination bar region.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  Button,
  Column,
  Container,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppShell
      appBar={<AppBar title={<Text as="h1">Inbox</Text>} />}
      bottomNavigationBar={
        <Row gap={8}>
          <Button type="button">Home</Button>
          <Button type="button">Search</Button>
          <Button type="button">Profile</Button>
        </Row>
      }
    >
      <Container padding={16}>
        <Column gap={8}>
          <Text>Message list…</Text>
        </Column>
      </Container>
    </AppShell>
  </ThemeProvider>
));
```

Use **`BottomNavigationBar`** when it ships (v1.8) — until then, place destination controls in the **`bottomNavigationBar`** region.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-mobile`).

---

## Layout Regions

Empty regions are **not displayed** — omit a prop or leave its slot empty when unused.

| Region | Prop / slot | HTML | Owner responsibilities |
| --- | --- | --- | --- |
| **appBar** | `appBar` or `q:slot="appBar"` | `<header>` | **`AppBar`** — title, leading, actions; toolbar a11y |
| **drawer** | `drawer` or `q:slot="drawer"` | Wrapper + **`Drawer`** `<aside>` | **`Drawer`** — open state, backdrop, focus trap |
| **sideSheet** | `sideSheet` or `q:slot="sideSheet"` | Wrapper + **`SideSheet`** `<aside>` | **`SideSheet`** — `open`, edge position, panel content |
| **main content** | default slot / `children` | `<main>` | **Your pages** — route content, page layout |
| **bottomNavigationBar** | `bottomNavigationBar` or `q:slot="bottomNavigationBar"` | `<nav>` | **`BottomNavigationBar`** (v1.8) or custom nav — destination selection |

**AppShell** positions regions. It does **not** manage drawer open state, active tab index, or routing.

Prefer **`q:slot`** for reactive chrome (e.g. `AppBar` with signals) so Qwik tracks subscriptions in the parent tree.

### appBar

Top application header — typically **`AppBar`**.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-region-appbar`).

---

### drawer

Modal slide-in navigation panel — **`Drawer`**.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-region-drawer`).

---

### sideSheet

Non-modal edge panel for filters or details — **`SideSheet`**.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-region-sidesheet`).

---

### main content

Always rendered. Exactly **one** primary `<main>` landmark per view.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-region-main`).

---

### bottomNavigationBar

Bottom destination navigation — **`BottomNavigationBar`** (specified v1.8).

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-region-bottom-nav`).

---

## Composition

### AppBar

**Source**

```tsx
<AppShell appBar={<AppBar title={<Text as="h1">Settings</Text>} />}>
  {/* main content */}
</AppShell>
```

Or with a reactive slot:

```tsx
<AppShell>
  <AppBar q:slot="appBar" title={<Text as="h1">{title.value}</Text>} />
  {/* main content */}
</AppShell>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-composition-appbar`).

---

### Drawer

Wire **`AppBar.leading`** to drawer open state.

**Source**

```tsx
<AppShell
  appBar={
    <AppBar
      leading={
        <Button
          type="button"
          aria-label="Open navigation menu"
          onClick$={openDrawer$}
        >
          ☰
        </Button>
      }
      title={<Text as="h1">App</Text>}
    />
  }
  drawer={
    <Drawer open={drawerOpen.value} onOpenChange$={onDrawerOpenChange$}>
      <nav aria-label="Main">{/* links */}</nav>
    </Drawer>
  }
>
  {/* main content */}
</AppShell>
```

Place **`OverlayContainer`** above **`AppShell`** when using **`Drawer`**.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-composition-drawer`).

---

### SideSheet

Inspector or filter panel alongside main content.

**Source**

```tsx
<AppShell
  sideSheet={
    <SideSheet
      open={filtersOpen.value}
      position={SideSheetPosition.right}
      aria-label="Filters"
    >
      {/* filter controls */}
    </SideSheet>
  }
>
  {/* main content */}
</AppShell>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-composition-sidesheet`).

---

### BottomNavigationBar

Reserve the bottom region for primary destinations.

**Source**

```tsx
<AppShell
  bottomNavigationBar={
    <Row gap={8}>
      <Button type="button">Home</Button>
      <Button type="button">Settings</Button>
    </Row>
  }
>
  {/* main content */}
</AppShell>
```

Replace with **`BottomNavigationBar`** when available.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-composition-bottom-nav`).

---

## AppShell Layout Patterns

### Content Only

**Source**

```tsx
<AppShell>
  <Text>Body only</Text>
</AppShell>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-pattern-content-only`).

---

### AppBar + Content

**Source**

```tsx
<AppShell appBar={<AppBar title={<Text as="h1">Page</Text>} />}>
  <Text>Body</Text>
</AppShell>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-pattern-appbar-content`).

---

### Drawer + Content

**Source**

```tsx
<AppShell
  appBar={/* menu button + title */}
  drawer={<Drawer open={open.value}>{/* nav */}</Drawer>}
>
  <Text>Body</Text>
</AppShell>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-pattern-drawer-content`).

---

### Full Application Layout

All regions — desktop admin or adaptive apps.

**Source**

```tsx
<AppShell
  appBar={<AppBar title={<Text as="h1">App</Text>} />}
  drawer={<Drawer>{/* nav */}</Drawer>}
  sideSheet={<SideSheet open={false}>{/* panel */}</SideSheet>}
  bottomNavigationBar={<Row>{/* destinations */}</Row>}
>
  <Text>Body</Text>
</AppShell>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-pattern-full`).

---

## Responsive Considerations

`AppShell` does **not** switch layouts by breakpoint — that belongs in your app.

| Layout | Typical pattern |
| --- | --- |
| **Mobile** | `AppBar` + **`bottomNavigationBar`**; hide or replace drawer |
| **Desktop** | `AppBar` + **`drawer`** or persistent **`sideSheet`**; omit bottom nav |
| **Future** | Pair with **`MediaQuery`** to toggle regions (e.g. drawer vs bottom nav) |

Keep chrome state in the parent route — `AppShell` stays a pure layout wrapper.

---

## AppShell vs Layout Widgets

| Factor | **AppShell** | **Row** / **Column** |
| --- | --- | --- |
| **Structure** | Application regions + `<main>` | Flex children inside a parent |
| **Landmarks** | Header, main, nav | None |
| **Reuse** | Once per app view | Many times per page |
| **Scope** | App chrome | Page sections, forms, cards |

### AppShell

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppShell appBar={<AppBar title={<Text as="h1">App</Text>} />}>
      <Text>Primary page content in main.</Text>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-vs-row-appshell`).

---

### Row

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AppShell,
  Container,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppShell>
      <Container padding={24}>
        <Row gap={16}>
          <Text>Left column</Text>
          <Text>Right column</Text>
        </Row>
      </Container>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-vs-row-row`).

---

### Guidance summary

- **AppShell** — where the app lives (chrome + main)
- **Row / Column** — how content flows inside `<main>`
- **Container** — styled surfaces inside pages — not app root structure

---

## Best Practices

### One AppShell per application root

Use a single shell per top-level view — not per card or dialog.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-best-one-per-app`).

---

### Keep responsibilities clear

AppShell positions regions; **`Drawer`**, **`SideSheet`**, and routes own state.

**Source**

```tsx
// Good — drawer state in parent route
const drawerOpen = useSignal(false);

<AppShell drawer={<Drawer open={drawerOpen.value} onOpenChange$={...} />}>
  {/* pages */}
</AppShell>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-best-clear-responsibilities`).

---

### Compose with AppBar and Drawer

Wire menu button in **`AppBar.leading`** to **`Drawer`** open state.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appshell-best-compose-chrome`).

---

## Anti-Patterns

### Nested AppShells

**Why:** Duplicates `<main>` landmarks and breaks semantic structure. One shell; nest **`Column`** / **`Row`** inside.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: appshell-anti-nested`, `preview: false`).

---

### Using AppShell for local layouts

**Why:** Cards, modals, and sidebar sections are page content — use **`Container`**, **`Row`**, or **`Column`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: appshell-anti-local-layout`, `preview: false`).

---

### Excessive structural nesting

**Why:** Deep shell → container → row → column chains without purpose add noise. Flatten page layout inside `<main>`.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: appshell-anti-excessive-nesting`, `preview: false`).

---

## Accessibility

| Region | Landmark | Notes |
| --- | --- | --- |
| **appBar** | `<header>` | **`AppBar`** adds **`role="banner"`** — one page-level banner per view |
| **drawer** | `<aside>` | Owned by **`Drawer`**; label nav with **`aria-label`** |
| **sideSheet** | `<aside>` | Owned by **`SideSheet`**; use **`aria-label`** on the panel |
| **main content** | `<main>` | Always present — primary page content |
| **bottomNavigationBar** | `<nav>` | Label with **`aria-label`** on destination controls |

Semantic structure:

```
AppShell
├── header          → AppBar
├── body
│   ├── drawer      → Drawer (aside when open)
│   ├── main        → page content (required)
│   └── sideSheet   → SideSheet (aside when open)
└── nav             → bottom navigation
```

Interactive a11y (labels, focus, keyboard) belongs to chrome widgets — not **`AppShell`**.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | Pure structural HTML + CSS — no browser APIs in render |
| **Resumability** | No signals or context inside **`AppShell`** |
| **State** | Drawer, side sheet, and nav state live in parent components |
| **Bootstrap** | Shell markup is identical on server and client |
| **Overlays** | **`OverlayContainer`** wraps the app for **`Drawer`** / dialog overlays — separate from shell layout |

`AppShell` is safe to render on the server with closed drawer/side sheet defaults.

---

## Flutter Equivalent

| Topic | Flutter `Scaffold` | qwik-flutter-ui `AppShell` |
| --- | --- | --- |
| **Body** | `Scaffold.body` | Default slot / `children` → `<main>` |
| **App bar** | `Scaffold.appBar` | `appBar` prop or `q:slot="appBar"` |
| **Drawer** | `Scaffold.drawer` | `drawer` prop — **`Drawer`** widget |
| **End drawer** | `Scaffold.endDrawer` | Use **`SideSheet`** or **`Drawer`** pattern |
| **Bottom nav** | `Scaffold.bottomNavigationBar` | `bottomNavigationBar` prop |
| **FAB** | `floatingActionButton` | **Not in v1** — use **`Button`** in page content |
| **Open drawer** | `ScaffoldState.openDrawer()` | Controlled **`Drawer`** `open` + `onOpenChange$` |
| **Theme** | `MaterialApp` | **`ThemeProvider`** |

**Flutter**

```dart
Scaffold(
  appBar: AppBar(title: Text('Settings')),
  drawer: Drawer(child: /* navigation */),
  body: Center(child: Text('Content')),
  bottomNavigationBar: BottomNavigationBar(items: [/* … */]),
);
```

**qwik-flutter-ui**

```tsx
<ThemeProvider theme={{}}>
  <OverlayContainer>
    <AppShell
      appBar={<AppBar title={<Text as="h1">Settings</Text>} />}
      drawer={<Drawer open={drawerOpen.value}>{/* navigation */}</Drawer>}
      bottomNavigationBar={/* destinations */}
    >
      <Text>Content</Text>
    </AppShell>
  </OverlayContainer>
</ThemeProvider>
```

Similarities: named chrome regions, flex-growing body, Flutter scaffold mental model.

Differences: JSX slots, stateless shell, declarative drawer open, **`OverlayContainer`** for overlay stack, no built-in FAB.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [AppBar](/docs/widgets/app-structure/app-bar) | Top toolbar in **`appBar`** region |
| [Drawer](/docs/widgets/app-structure/drawer) | Modal navigation in **`drawer`** region |
| [SideSheet](/docs/widgets/app-structure/side-sheet) | Edge panel in **`sideSheet`** region |
| [BottomNavigationBar](/docs/widgets/app-structure/bottom-navigation-bar) | Destination nav in **`bottomNavigationBar`** region (v1.8) |
| [OverlayContainer](/docs/widgets/overlays/overlay-container) | Required ancestor for **`Drawer`** overlays |
| [Column](/docs/widgets/layout/column) | Page layout inside `<main>` |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/appshell/`
- **`category`** — groups examples (`basic`, `common`, `regions`, `composition`, `patterns`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to app-structure and layout widgets
- **`flutterEquivalent`** — `Scaffold`

When adding examples, wrap with **`ThemeProvider`**, add **`OverlayContainer`** when using **`Drawer`**, prefer **`q:slot`** for reactive chrome, and import only from `qwik-flutter-ui`.
