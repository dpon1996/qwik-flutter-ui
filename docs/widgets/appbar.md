---
title: AppBar
description: Primary top application toolbar with leading, title, and actions regions for identity, navigation, and page commands.
widget: AppBar
category: app-structure
flutterEquivalent: AppBar
status: shipped
related:
  - AppShell
  - Drawer
  - Menu
  - BottomNavigationBar
  - Button
since: "0.0.1"
examples:
  - id: appbar-basic
    file: examples/appbar/basic.tsx
    category: basic
  - id: appbar-simple-title
    file: examples/appbar/simple-title.tsx
    category: common
  - id: appbar-title-actions
    file: examples/appbar/title-actions.tsx
    category: common
  - id: appbar-dashboard-header
    file: examples/appbar/dashboard-header.tsx
    category: common
  - id: appbar-mobile-bar
    file: examples/appbar/mobile-bar.tsx
    category: common
  - id: appbar-structure-leading
    file: examples/appbar/structure-leading.tsx
    category: structure
  - id: appbar-structure-title
    file: examples/appbar/structure-title.tsx
    category: structure
  - id: appbar-structure-actions
    file: examples/appbar/structure-actions.tsx
    category: structure
  - id: appbar-leading-menu
    file: examples/appbar/leading-menu.tsx
    category: leading
  - id: appbar-leading-back
    file: examples/appbar/leading-back.tsx
    category: leading
  - id: appbar-leading-logo
    file: examples/appbar/leading-logo.tsx
    category: leading
  - id: appbar-leading-custom
    file: examples/appbar/leading-custom.tsx
    category: leading
  - id: appbar-action-search
    file: examples/appbar/action-search.tsx
    category: actions
  - id: appbar-action-notifications
    file: examples/appbar/action-notifications.tsx
    category: actions
  - id: appbar-action-profile-menu
    file: examples/appbar/action-profile-menu.tsx
    category: actions
  - id: appbar-action-multiple
    file: examples/appbar/action-multiple.tsx
    category: actions
  - id: appbar-title-text
    file: examples/appbar/title-text.tsx
    category: title
  - id: appbar-title-logo
    file: examples/appbar/title-logo.tsx
    category: title
  - id: appbar-title-custom
    file: examples/appbar/title-custom.tsx
    category: title
  - id: appbar-appshell-basic
    file: examples/appbar/appshell-basic.tsx
    category: appshell
  - id: appbar-appshell-dashboard
    file: examples/appbar/appshell-dashboard.tsx
    category: appshell
  - id: appbar-appshell-drawer
    file: examples/appbar/appshell-drawer.tsx
    category: appshell
  - id: appbar-vs-drawer-appbar
    file: examples/appbar/vs-drawer-appbar.tsx
    category: comparison
  - id: appbar-vs-drawer-drawer
    file: examples/appbar/vs-drawer-drawer.tsx
    category: comparison
  - id: appbar-vs-rail-appbar
    file: examples/appbar/vs-rail-appbar.tsx
    category: comparison
  - id: appbar-vs-rail-rail
    file: examples/appbar/vs-rail-rail.tsx
    category: comparison
  - id: appbar-best-concise-title
    file: examples/appbar/best-concise-title.tsx
    category: best-practice
  - id: appbar-best-meaningful-actions
    file: examples/appbar/best-meaningful-actions.tsx
    category: best-practice
  - id: appbar-best-consistent-placement
    file: examples/appbar/best-consistent-placement.tsx
    category: best-practice
  - id: appbar-best-predictable-nav
    file: examples/appbar/best-predictable-nav.tsx
    category: best-practice
  - id: appbar-anti-too-many-actions
    file: examples/appbar/anti-too-many-actions.tsx
    category: anti-pattern
  - id: appbar-anti-long-title
    file: examples/appbar/anti-long-title.tsx
    category: anti-pattern
  - id: appbar-anti-unrelated-controls
    file: examples/appbar/anti-unrelated-controls.tsx
    category: anti-pattern
  - id: appbar-anti-forms-in-bar
    file: examples/appbar/anti-forms-in-bar.tsx
    category: anti-pattern
---

# AppBar

## Overview

`AppBar` is the **primary top application toolbar** — leading control, title, and trailing actions in one horizontal bar. It maps to Flutter's [`AppBar`](https://api.flutter.dev/flutter/material/AppBar-class.html).

`AppBar` is **stateless**. It renders chrome only — drawer open state, routing, and command handlers live in your app. Place it in the **`appBar`** region of [`AppShell`](/docs/widgets/app-structure/app-shell).

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Application identity** | Title names the current app or screen |
| **Navigation actions** | Leading menu or back affordance |
| **Page actions** | Search, filters, share — commands for the current view |
| **Top-level commands** | End-aligned **`actions`** for frequent tasks |

### When to use AppBar

- Every full-page application view that needs a top toolbar
- Dashboard and admin layouts with title + commands
- Mobile-style apps with menu button and icon actions

Use **`BottomNavigationBar`** for primary destination switching (v1.8) and **`Drawer`** for full navigation lists — not duplicated inside the app bar.

### AppBar vs Header vs Toolbar vs NavigationRail

| | `AppBar` | Generic header | Toolbar (concept) | `NavigationRail` |
| --- | --- | --- | --- | --- |
| **Purpose** | App chrome API | Semantic HTML | Leading + title + actions layout | Persistent side nav (planned v1.9) |
| **Structure** | `leading`, `title`, `actions` | Any content | Regions inside `AppBar` | Vertical destination list |
| **Landmark** | `role="banner"` | `<header>` | Non-semantic slots | `<nav>` (planned) |
| **Placement** | Top of `AppShell` | Anywhere | Top bar | Start edge, full height |
| **Best for** | Material-style app bar | Marketing sections | — | Desktop primary nav |

---

## Import

```tsx
import {
  AppBar,
  AppShell,
  Button,
  Drawer,
  Menu,
  MenuDivider,
  MenuItem,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working app bar with a page title.

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
    <AppShell appBar={<AppBar title={<Text as="h1">Settings</Text>} />}>
      <Text>Page content</Text>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-basic`).

---

## Common Usage

### Simple Title

Title-only bar for read-focused pages.

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
    <AppShell appBar={<AppBar title={<Text as="h1">Inbox</Text>} />}>
      <Text>Message list…</Text>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-simple-title`).

---

### Title + Actions

Page title with one or more trailing commands.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  Button,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppShell
      appBar={
        <AppBar
          title={<Text as="h1">Projects</Text>}
          actions={[
            <Button key="new" type="button">
              New
            </Button>,
          ]}
        />
      }
    >
      <Text>Project list…</Text>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-title-actions`).

---

### Dashboard Header

Title plus utility actions for a dashboard view.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  Button,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppShell
      appBar={
        <AppBar
          title={<Text as="h1">Dashboard</Text>}
          actions={[
            <Button key="export" type="button">
              Export
            </Button>,
            <Button key="refresh" type="button" aria-label="Refresh">
              ↻
            </Button>,
          ]}
        />
      }
    >
      <Text>Metrics and charts…</Text>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-dashboard-header`).

---

### Mobile Application Bar

Compact bar with menu leading and icon actions.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  Button,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const drawerOpen = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
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
            title={<Text as="h1">Home</Text>}
            actions={[
              <Button key="search" type="button" aria-label="Search">
                ⌕
              </Button>,
            ]}
          />
        }
      >
        <Text>Feed content…</Text>
      </AppShell>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-mobile-bar`).

---

## Structure

Three regions — all optional, composed left to right.

| Region | Prop | Alignment | Owner responsibilities |
| --- | --- | --- | --- |
| **Leading** | `leading` | Start | Menu, back, or logo — **one** control; caller supplies labels and click handlers |
| **Title** | `title` | Flex-grow center area | Page or app name — prefer **`<Text as="h1">`** for the primary heading |
| **Actions** | `actions` | End | 0–N controls; order preserved left-to-right; dev warning above **5** actions |

**AppBar** lays out regions. It does **not** open drawers, navigate routes, or wire search automatically.

### Styling props

| Prop | Default | Description |
| --- | --- | --- |
| **`backgroundColor`** | `var(--qfu-color-surface)` | Toolbar background |
| **`foregroundColor`** | `var(--qfu-color-on-surface)` | Title and icon color |
| **`elevation`** | `1` | Material shadow tier |
| **`height`** | `56` (px) | Toolbar height |
| **`titleSpacing`** | `16` (px) | Inset before title text |

### leading

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-structure-leading`).

---

### title

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-structure-title`).

---

### actions

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-structure-actions`).

---

## Leading Content

Single start-aligned slot — omit when unused.

### Menu Button

Opens **`Drawer`** — wire `aria-expanded` to drawer open state.

**Source**

```tsx
<AppBar
  leading={
    <Button
      type="button"
      aria-label="Open navigation menu"
      aria-expanded={drawerOpen.value}
      onClick$={openDrawer$}
    >
      ☰
    </Button>
  }
  title={<Text as="h1">App</Text>}
/>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-leading-menu`).

---

### Back Button

Return to the previous view — caller owns navigation.

**Source**

```tsx
<AppBar
  leading={
    <Button type="button" aria-label="Back" onClick$={goBack$}>
      ←
    </Button>
  }
  title={<Text as="h1">Edit profile</Text>}
/>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-leading-back`).

---

### Logo

Brand mark in the leading slot on marketing or auth screens.

**Source**

```tsx
<AppBar
  leading={<Text as="span">◆ Acme</Text>}
  title={<Text as="h1">Sign in</Text>}
/>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-leading-logo`).

---

### Custom Content

Any JSX — avatar chip, breadcrumb prefix, or status indicator.

**Source**

```tsx
<AppBar
  leading={
    <Button type="button" aria-label="Workspace switcher">
      WS
    </Button>
  }
  title={<Text as="h1">Billing</Text>}
/>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-leading-custom`).

---

## Actions

Pass an array of JSX elements — typically **`Button`** or **`Menu`**. Provide **`key`** on each entry.

### Search Action

Icon button that opens search UI — route, dialog, or side panel.

**Source**

```tsx
actions={[
  <Button key="search" type="button" aria-label="Search" onClick$={openSearch$}>
    ⌕
  </Button>,
]}
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-action-search`).

---

### Notifications

**Source**

```tsx
actions={[
  <Button
    key="notifications"
    type="button"
    aria-label="Notifications"
    onClick$={openNotifications$}
  >
    🔔
  </Button>,
]}
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-action-notifications`).

---

### Profile Menu

Overflow account actions with **`Menu`**.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AppBar,
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  OverlayContainer,
  Text,
} from "qwik-flutter-ui";

// Inside AppShell + OverlayContainer:
actions={[
  <Menu key="profile">
    <Button q:slot="trigger" type="button" aria-label="Account menu">
      JD
    </Button>
    <MenuItem onSelect$={$(() => {})}>Profile</MenuItem>
    <MenuItem onSelect$={$(() => {})}>Settings</MenuItem>
    <MenuDivider />
    <MenuItem onSelect$={$(() => {})}>Sign out</MenuItem>
  </Menu>,
]}
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-action-profile-menu`).

---

### Multiple Actions

Order: primary page actions first, overflow last. Keep within **5** actions (dev warning above that).

**Source**

```tsx
actions={[
  <Button key="filters" type="button" onClick$={toggleFilters$}>
    Filters
  </Button>,
  <Button key="share" type="button" aria-label="Share">
    ↗
  </Button>,
  <Button key="more" type="button" aria-label="More options">
    ⋮
  </Button>,
]}
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-action-multiple`).

---

## Title Patterns

Title region truncates with ellipsis when space is limited.

### Text Title

Use one **`<Text as="h1">`** per page for the primary heading.

**Source**

```tsx
<AppBar title={<Text as="h1">Account settings</Text>} />
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-title-text`).

---

### Logo Title

Combine brand + screen name in the title slot.

**Source**

```tsx
<AppBar
  title={
    <>
      <Text as="span">Acme</Text>
      <Text as="h1"> / Dashboard</Text>
    </>
  }
/>
```

Prefer a short combined string when possible.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-title-logo`).

---

### Custom Header Content

Subtitle or status badge — keep compact; long content belongs in `<main>`.

**Source**

```tsx
import { Column, Text } from "qwik-flutter-ui";

<AppBar
  title={
    <Column gap={0}>
      <Text as="h1">Orders</Text>
      <Text>12 pending</Text>
    </Column>
  }
/>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-title-custom`).

---

## AppBar + AppShell

### Basic Application

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
    <AppShell appBar={<AppBar title={<Text as="h1">My App</Text>} />}>
      <Text>Body content</Text>
    </AppShell>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-appshell-basic`).

---

### Dashboard Layout

**Source**

```tsx
<AppShell
  appBar={
    <AppBar
      title={<Text as="h1">Analytics</Text>}
      actions={[
        <Button key="range" type="button">Last 30 days</Button>,
      ]}
    />
  }
>
  {/* dashboard body */}
</AppShell>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-appshell-dashboard`).

---

### Drawer Integration

Menu button in **`leading`** controls **`Drawer`** state in the parent route.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  Button,
  Container,
  Drawer,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const drawerOpen = useSignal(false);

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
              title={<Text as="h1">App</Text>}
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
                  <Button type="button">Home</Button>
                </Container>
              </nav>
            </Drawer>
          }
        >
          <Text>Main content</Text>
        </AppShell>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

Use **`q:slot="appBar"`** when the bar reads reactive signals from the parent.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-appshell-drawer`).

---

## AppBar vs Navigation Components

| Factor | **AppBar** | **Drawer** | **NavigationRail** |
| --- | --- | --- | --- |
| **Role** | Top toolbar + page title | Full navigation panel | Persistent side destinations |
| **Placement** | Top of view | Slide-in overlay / drawer region | Start edge, full height |
| **Visibility** | Always visible | Open on demand | Always visible (when used) |
| **Owns routes** | No | No | No (planned) |
| **Status** | Shipped | Shipped | Planned v1.9 |

### AppBar

**Source**

```tsx
<AppBar
  leading={<Button type="button" aria-label="Menu">☰</Button>}
  title={<Text as="h1">Settings</Text>}
  actions={[<Button key="save" type="button">Save</Button>]}
/>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-vs-drawer-appbar`).

---

### Drawer

**Source**

```tsx
<Drawer open={open.value} onOpenChange$={onOpenChange$}>
  <nav aria-label="Main">
    <Button type="button">Home</Button>
    <Button type="button">Settings</Button>
  </nav>
</Drawer>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-vs-drawer-drawer`).

---

### NavigationRail

**Not shipped in v1.** Planned for v1.9 — persistent vertical destination list on wide screens. Use **`Drawer`** + **`AppBar`** menu button until then.

**Preview**

> **Preview placeholder** — code-only note (`id: appbar-vs-rail-rail`, `preview: false`).

---

### Guidance summary

- **AppBar** — identity, page title, and top-level commands
- **Drawer** — full navigation tree opened from the menu button
- **NavigationRail** — (future) primary destinations on desktop without opening a drawer
- **BottomNavigationBar** — (v1.8) mobile destination switching — complements, not replaces, the app bar title

---

## Best Practices

### Concise titles

Short page names truncate gracefully — avoid paragraph-length titles.

**Source**

```tsx
// Good
<AppBar title={<Text as="h1">Billing</Text>} />

// Avoid
<AppBar title={<Text as="h1">Billing and subscription management for your organization</Text>} />
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-best-concise-title`).

---

### Meaningful actions

Icon actions need **`aria-label`**; text actions use clear verbs.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-best-meaningful-actions`).

---

### Consistent placement

Menu always **`leading`**; primary create/save in **`actions`**; same order across pages.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-best-consistent-placement`).

---

### Predictable navigation

Wire menu **`leading`** to **`Drawer`**; back button calls your router — AppBar does not auto-navigate.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: appbar-best-predictable-nav`).

---

## Anti-Patterns

### Too many actions

**Why:** More than **5** actions triggers a dev warning and crowds the toolbar. Move extras to a **`Menu`** overflow.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: appbar-anti-too-many-actions`, `preview: false`).

---

### Long titles

**Why:** Title region uses single-line ellipsis — long strings hide critical context. Put detail in the page body.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: appbar-anti-long-title`, `preview: false`).

---

### Unrelated controls

**Why:** Global account settings and page-specific filters in the same bar without grouping confuse scope. Use **`Menu`** or separate pages.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: appbar-anti-unrelated-controls`, `preview: false`).

---

### Complex forms inside AppBar

**Why:** Search fields, multi-input filters, and wizards belong in `<main>`, **`SideSheet`**, or **`Dialog`** — not the toolbar.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: appbar-anti-forms-in-bar`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Landmark** | Root **`role="banner"`** — one page-level banner per view inside **`AppShell`** |
| **Title** | Prefer **`<Text as="h1">`** — one primary heading per page |
| **Leading** | **`aria-label`** on icon-only controls — e.g. `"Open navigation menu"`, `"Back"` |
| **Actions** | Each action has visible text or **`aria-label`** |
| **Drawer toggle** | Set **`aria-expanded`** on menu button to match **`Drawer`** open state |
| **Keyboard** | Native button focus order: leading → actions (DOM order) |
| **Screen readers** | Announce toolbar as banner; title is the primary page name |

`AppBar` does not auto-generate back buttons or drawer toggles — callers supply accessible controls.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | Pure `<header>` + flex layout — no browser APIs in render |
| **Resumability** | No signals or context inside **`AppBar`** |
| **Reactive chrome** | Use **`AppBar q:slot="appBar"`** on **`AppShell`** so parent signals update leading/actions |
| **Deterministic markup** | Same HTML on server and client for a given props snapshot |

`AppBar` is safe to render on the server. Open/expanded states come from parent props at render time.

---

## Flutter Equivalent

| Topic | Flutter `AppBar` | qwik-flutter-ui `AppBar` |
| --- | --- | --- |
| **Regions** | `leading`, `title`, `actions` | Same prop names |
| **Height** | `toolbarHeight` | `height?: Length` (default 56) |
| **Elevation** | `elevation` | `elevation?: number` (default 1) |
| **Colors** | `backgroundColor`, `foregroundColor` | Same; theme CSS var defaults |
| **Auto leading** | `automaticallyImplyLeading` | **Not shipped** — set `leading` explicitly |
| **Drawer** | Auto menu icon | Caller wires `leading` → `Drawer` state |
| **Scaffold** | `Scaffold.appBar` | `AppShell.appBar` |

**Flutter**

```dart
AppBar(
  title: Text('Settings'),
  leading: IconButton(
    icon: Icon(Icons.menu),
    onPressed: () => Scaffold.of(context).openDrawer(),
  ),
  actions: [
    IconButton(icon: Icon(Icons.search), onPressed: () {}),
  ],
)
```

**qwik-flutter-ui**

```tsx
<AppShell
  appBar={
    <AppBar
      leading={
        <Button type="button" aria-label="Open navigation menu" onClick$={openDrawer$}>
          ☰
        </Button>
      }
      title={<Text as="h1">Settings</Text>}
      actions={[
        <Button key="search" type="button" aria-label="Search" onClick$={openSearch$}>
          ⌕
        </Button>,
      ]}
    />
  }
>
  {/* body */}
</AppShell>
```

Similarities: three-region toolbar, Material defaults, Flutter naming.

Differences: explicit leading (no auto back/menu), JSX `actions` array, no `flexibleSpace` or `SliverAppBar` in v1.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [AppShell](/docs/widgets/app-structure/app-shell) | Hosts **`AppBar`** in the top **`appBar`** region |
| [Drawer](/docs/widgets/app-structure/drawer) | Opened from **`leading`** menu button |
| [Menu](/docs/widgets/overlays/menu) | Profile or overflow menus in **`actions`** |
| [BottomNavigationBar](/docs/widgets/app-structure/bottom-navigation-bar) | Mobile destinations — complements app bar (v1.8) |
| [Button](/docs/widgets/forms/button) | Leading and action controls |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/appbar/`
- **`category`** — groups examples (`basic`, `common`, `structure`, `leading`, `actions`, `title`, `appshell`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to app-structure and overlay widgets
- **`flutterEquivalent`** — `AppBar`

When adding examples, place **`AppBar`** inside **`AppShell`**, use **`OverlayContainer`** when **`actions`** include **`Menu`**, set **`aria-label`** on icon buttons, and import only from `qwik-flutter-ui`.
