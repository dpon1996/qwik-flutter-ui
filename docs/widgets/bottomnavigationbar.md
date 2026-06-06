---
title: BottomNavigationBar
description: Bottom destination navigation for mobile-oriented apps with controlled selection, keyboard support, and AppShell integration.
widget: BottomNavigationBar
category: app-structure
flutterEquivalent: BottomNavigationBar
status: shipped
related:
  - AppShell
  - AppBar
  - Drawer
  - NavigationRail
  - Tabs
since: "0.0.1"
examples:
  - id: bottomnavigationbar-basic
    file: examples/bottom-navigation-bar/basic.tsx
    category: basic
  - id: bottomnavigationbar-home-app
    file: examples/bottom-navigation-bar/home-app.tsx
    category: common
  - id: bottomnavigationbar-social-app
    file: examples/bottom-navigation-bar/social-app.tsx
    category: common
  - id: bottomnavigationbar-commerce-app
    file: examples/bottom-navigation-bar/commerce-app.tsx
    category: common
  - id: bottomnavigationbar-dashboard-app
    file: examples/bottom-navigation-bar/dashboard-app.tsx
    category: common
  - id: bottomnavigationbar-controlled
    file: examples/bottom-navigation-bar/controlled.tsx
    category: selection
  - id: bottomnavigationbar-uncontrolled
    file: examples/bottom-navigation-bar/uncontrolled.tsx
    category: selection
  - id: bottomnavigationbar-default-selection
    file: examples/bottom-navigation-bar/default-selection.tsx
    category: selection
  - id: bottomnavigationbar-icon-label
    file: examples/bottom-navigation-bar/icon-label.tsx
    category: items
  - id: bottomnavigationbar-label-only
    file: examples/bottom-navigation-bar/label-only.tsx
    category: items
  - id: bottomnavigationbar-disabled-item
    file: examples/bottom-navigation-bar/disabled-item.tsx
    category: items
  - id: bottomnavigationbar-multiple-destinations
    file: examples/bottom-navigation-bar/multiple-destinations.tsx
    category: items
  - id: bottomnavigationbar-three-destinations
    file: examples/bottom-navigation-bar/three-destinations.tsx
    category: patterns
  - id: bottomnavigationbar-four-destinations
    file: examples/bottom-navigation-bar/four-destinations.tsx
    category: patterns
  - id: bottomnavigationbar-five-destinations
    file: examples/bottom-navigation-bar/five-destinations.tsx
    category: patterns
  - id: bottomnavigationbar-appshell-mobile
    file: examples/bottom-navigation-bar/appshell-mobile.tsx
    category: appshell
  - id: bottomnavigationbar-appshell-dashboard
    file: examples/bottom-navigation-bar/appshell-dashboard.tsx
    category: appshell
  - id: bottomnavigationbar-appshell-appbar
    file: examples/bottom-navigation-bar/appshell-appbar.tsx
    category: appshell
  - id: bottomnavigationbar-vs-rail-bottom
    file: examples/bottom-navigation-bar/vs-rail-bottom.tsx
    category: comparison
  - id: bottomnavigationbar-vs-rail-rail
    file: examples/bottom-navigation-bar/vs-rail-rail.tsx
    category: comparison
  - id: bottomnavigationbar-vs-drawer-bottom
    file: examples/bottom-navigation-bar/vs-drawer-bottom.tsx
    category: comparison
  - id: bottomnavigationbar-vs-drawer-drawer
    file: examples/bottom-navigation-bar/vs-drawer-drawer.tsx
    category: comparison
  - id: bottomnavigationbar-best-three-to-five
    file: examples/bottom-navigation-bar/best-three-to-five.tsx
    category: best-practice
  - id: bottomnavigationbar-best-clear-icons
    file: examples/bottom-navigation-bar/best-clear-icons.tsx
    category: best-practice
  - id: bottomnavigationbar-best-concise-labels
    file: examples/bottom-navigation-bar/best-concise-labels.tsx
    category: best-practice
  - id: bottomnavigationbar-best-predictable-order
    file: examples/bottom-navigation-bar/best-predictable-order.tsx
    category: best-practice
  - id: bottomnavigationbar-anti-too-many
    file: examples/bottom-navigation-bar/anti-too-many.tsx
    category: anti-pattern
  - id: bottomnavigationbar-anti-unclear-icons
    file: examples/bottom-navigation-bar/anti-unclear-icons.tsx
    category: anti-pattern
  - id: bottomnavigationbar-anti-missing-labels
    file: examples/bottom-navigation-bar/anti-missing-labels.tsx
    category: anti-pattern
  - id: bottomnavigationbar-anti-deep-nesting
    file: examples/bottom-navigation-bar/anti-deep-nesting.tsx
    category: anti-pattern
---

# BottomNavigationBar

## Overview

`BottomNavigationBar` is the **primary bottom destination navigation bar** for mobile-oriented applications. It renders a horizontal row of destinations with optional icon and label, tracks the active destination, and fires `onChange$` when the user selects a new item. It maps to Flutter's [`BottomNavigationBar`](https://api.flutter.dev/flutter/material/BottomNavigationBar-class.html).

`BottomNavigationBar` does **not** navigate by itself — it reports selection changes so your application can swap content, scroll to a section, or call your router.

Place it in the **`bottomNavigationBar`** region of [`AppShell`](/docs/widgets/app-structure/app-shell) for persistent bottom chrome.

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Primary mobile navigation** | Top-level app sections reachable in one tap |
| **Destination switching** | Exactly one active destination at a time |
| **Application sections** | Home, Search, Profile — not nested routes inside the bar |
| **Persistent navigation** | Fixed bottom chrome while main content scrolls |

### When to use BottomNavigationBar

- Mobile-style apps with **3–5 top-level sections**
- Apps where users frequently switch between primary destinations
- Layouts that pair bottom nav with [`AppBar`](/docs/widgets/app-structure/app-bar) and scrollable `<main>` content

Use [`Drawer`](/docs/widgets/app-structure/drawer) for longer navigation lists, [`NavigationRail`](/docs/widgets/navigation/navigation-rail) (planned v1.9) for persistent desktop side nav, and **Tabs** (planned) for in-page section switching — not duplicated inside the bottom bar.

### BottomNavigationBar vs NavigationRail vs Drawer vs Tabs

| | `BottomNavigationBar` | `NavigationRail` | `Drawer` | Tabs |
| --- | --- | --- | --- | --- |
| **Purpose** | Primary bottom destinations | Persistent side destinations | Modal nav panel | In-page sections |
| **Placement** | Bottom of `AppShell` | Start edge, full height | Start edge overlay | Below app bar / in content |
| **Visibility** | Always visible | Always visible (planned) | Opens on demand | Always visible in region |
| **Best for** | Mobile primary nav | Desktop primary nav | Many links, secondary nav | Related content on one screen |
| **Depth** | Flat top-level only | Flat top-level (planned) | Hierarchical lists OK | One level per tab row |
| **Status** | **Shipped** | Planned v1.9 | **Shipped** | Planned |

---

## Import

```tsx
import {
  AppBar,
  AppShell,
  BottomNavigationBar,
  BottomNavigationItem,
  Column,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working bottom navigation bar with three destinations.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  BottomNavigationBar,
  BottomNavigationItem,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <BottomNavigationBar aria-label="Primary">
      <BottomNavigationItem value="home" label="Home" />
      <BottomNavigationItem value="search" label="Search" />
      <BottomNavigationItem value="profile" label="Profile" />
    </BottomNavigationBar>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-basic`).

---

## Common Usage

### Home App

Three destinations — Home, Activity, Profile — typical consumer app layout.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  BottomNavigationBar,
  BottomNavigationItem,
  Column,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const dest = useSignal("home");

  const onChange$ = $((next: string) => {
    dest.value = next;
  });

  return (
    <ThemeProvider theme={{}}>
      <AppShell
        appBar={<AppBar title={<Text as="h1">My App</Text>} />}
        bottomNavigationBar={
          <BottomNavigationBar
            aria-label="Primary"
            value={dest.value}
            onChange$={onChange$}
          >
            <BottomNavigationItem value="home" label="Home" icon={<span>⌂</span>} />
            <BottomNavigationItem value="activity" label="Activity" icon={<span>◉</span>} />
            <BottomNavigationItem value="profile" label="Profile" icon={<span>👤</span>} />
          </BottomNavigationBar>
        }
      >
        <Column gap={16} style={{ padding: "24px" }}>
          <Text>Current section: {dest.value}</Text>
        </Column>
      </AppShell>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-home-app`).

---

### Social Application

Feed, Explore, Notifications, Messages — four destinations with icons.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppShell,
  BottomNavigationBar,
  BottomNavigationItem,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const dest = useSignal("feed");

  return (
    <ThemeProvider theme={{}}>
      <AppShell
        bottomNavigationBar={
          <BottomNavigationBar
            aria-label="Primary"
            value={dest.value}
            onChange$={$((next: string) => {
              dest.value = next;
            })}
          >
            <BottomNavigationItem value="feed" label="Feed" icon={<span>⌂</span>} />
            <BottomNavigationItem value="explore" label="Explore" icon={<span>⌕</span>} />
            <BottomNavigationItem value="notifications" label="Alerts" icon={<span>◉</span>} />
            <BottomNavigationItem value="messages" label="Messages" icon={<span>✉</span>} />
          </BottomNavigationBar>
        }
      >
        <Text style={{ padding: "24px" }}>View: {dest.value}</Text>
      </AppShell>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-social-app`).

---

### Commerce Application

Shop, Categories, Cart, Account — predictable ordering for shopping apps.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppShell,
  BottomNavigationBar,
  BottomNavigationItem,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const dest = useSignal("shop");

  return (
    <ThemeProvider theme={{}}>
      <AppShell
        bottomNavigationBar={
          <BottomNavigationBar
            aria-label="Store navigation"
            defaultValue="shop"
            onChange$={$((next: string) => {
              dest.value = next;
            })}
          >
            <BottomNavigationItem value="shop" label="Shop" icon={<span>⌂</span>} />
            <BottomNavigationItem value="categories" label="Categories" icon={<span>☰</span>} />
            <BottomNavigationItem value="cart" label="Cart" icon={<span>🛒</span>} />
            <BottomNavigationItem value="account" label="Account" icon={<span>👤</span>} />
          </BottomNavigationBar>
        }
      >
        <Text style={{ padding: "24px" }}>Store section: {dest.value}</Text>
      </AppShell>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-commerce-app`).

---

### Dashboard Application

Overview, Reports, Settings — compact dashboard with five or fewer items.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  BottomNavigationBar,
  BottomNavigationItem,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const dest = useSignal("overview");

  return (
    <ThemeProvider theme={{}}>
      <AppShell
        appBar={<AppBar title={<Text as="h1">Dashboard</Text>} />}
        bottomNavigationBar={
          <BottomNavigationBar
            aria-label="Dashboard sections"
            value={dest.value}
            onChange$={$((next: string) => {
              dest.value = next;
            })}
          >
            <BottomNavigationItem value="overview" label="Overview" icon={<span>▦</span>} />
            <BottomNavigationItem value="reports" label="Reports" icon={<span>📊</span>} />
            <BottomNavigationItem value="settings" label="Settings" icon={<span>⚙</span>} />
          </BottomNavigationBar>
        }
      >
        <Text style={{ padding: "24px" }}>Panel: {dest.value}</Text>
      </AppShell>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-dashboard-app`).

---

## Selection State

`BottomNavigationBar` supports **controlled** and **uncontrolled** selection — the same model as [`RadioGroup`](/docs/widgets/forms/radio-group).

| Mode | Props | Who owns selection |
| --- | --- | --- |
| **Controlled** | `value` + `onChange$` | Parent |
| **Uncontrolled** | `defaultValue` + optional `onChange$` | Bar (internal state) |
| **Default** | Neither — first item | Bar selects first registered item |

`onChange$` fires on **user interaction only** — not when `value` is updated programmatically.

Do not pass both `value` and `defaultValue`.

### Controlled Navigation

Parent owns active destination; bar reflects `value`.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  BottomNavigationBar,
  BottomNavigationItem,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const dest = useSignal("home");

  return (
    <ThemeProvider theme={{}}>
      <BottomNavigationBar
        aria-label="Primary"
        value={dest.value}
        onChange$={$((next: string) => {
          dest.value = next;
        })}
      >
        <BottomNavigationItem value="home" label="Home" />
        <BottomNavigationItem value="settings" label="Settings" />
      </BottomNavigationBar>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-controlled`).

---

### Uncontrolled Navigation

Bar manages selection internally; listen with `onChange$` if needed.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  BottomNavigationBar,
  BottomNavigationItem,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <BottomNavigationBar
      aria-label="Primary"
      defaultValue="settings"
      onChange$={$((value: string) => {
        console.log("Selected:", value);
      })}
    >
      <BottomNavigationItem value="home" label="Home" />
      <BottomNavigationItem value="settings" label="Settings" />
    </BottomNavigationBar>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-uncontrolled`).

---

### Default Selection

When `value` and `defaultValue` are omitted, the **first** `BottomNavigationItem` is selected.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  BottomNavigationBar,
  BottomNavigationItem,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <BottomNavigationBar aria-label="Primary">
      <BottomNavigationItem value="home" label="Home" />
      <BottomNavigationItem value="search" label="Search" />
    </BottomNavigationBar>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-default-selection`).

---

## Navigation Items

Compose destinations with **`BottomNavigationItem`** children. Each item requires a unique **`value`** and a **`label`**.

### Icon + Label

Recommended pattern — icon above label for quick recognition.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  BottomNavigationBar,
  BottomNavigationItem,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <BottomNavigationBar aria-label="Primary" defaultValue="home">
      <BottomNavigationItem value="home" label="Home" icon={<span>⌂</span>} />
      <BottomNavigationItem value="search" label="Search" icon={<span>⌕</span>} />
    </BottomNavigationBar>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-icon-label`).

---

### Label Only

Valid when space is tight — labels remain required for accessibility.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  BottomNavigationBar,
  BottomNavigationItem,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <BottomNavigationBar aria-label="Primary" defaultValue="home">
      <BottomNavigationItem value="home" label="Home" />
      <BottomNavigationItem value="settings" label="Settings" />
    </BottomNavigationBar>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-label-only`).

---

### Disabled Item

Use `disabled` to prevent selection — useful for unavailable sections or gated features.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  BottomNavigationBar,
  BottomNavigationItem,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <BottomNavigationBar aria-label="Primary" defaultValue="home">
      <BottomNavigationItem value="home" label="Home" />
      <BottomNavigationItem value="premium" label="Premium" disabled />
      <BottomNavigationItem value="profile" label="Profile" />
    </BottomNavigationBar>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-disabled-item`).

---

### Multiple Destinations

Map data to items when you have a stable destination list.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  BottomNavigationBar,
  BottomNavigationItem,
  ThemeProvider,
} from "qwik-flutter-ui";

const DESTINATIONS = [
  { value: "home", label: "Home", icon: "⌂" },
  { value: "search", label: "Search", icon: "⌕" },
  { value: "library", label: "Library", icon: "▤" },
  { value: "profile", label: "Profile", icon: "👤" },
] as const;

export default component$(() => (
  <ThemeProvider theme={{}}>
    <BottomNavigationBar aria-label="Primary" defaultValue="home">
      {DESTINATIONS.map((dest) => (
        <BottomNavigationItem
          key={dest.value}
          value={dest.value}
          label={dest.label}
          icon={<span>{dest.icon}</span>}
        />
      ))}
    </BottomNavigationBar>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-multiple-destinations`).

---

## Mobile Navigation Patterns

Material guidance recommends **3–5 primary destinations**. More items reduce tap targets and readability.

### Three Destinations

Ideal for simple apps — Home, Search, Profile.

**Source**

```tsx
<BottomNavigationBar aria-label="Primary" defaultValue="home">
  <BottomNavigationItem value="home" label="Home" icon={<span>⌂</span>} />
  <BottomNavigationItem value="search" label="Search" icon={<span>⌕</span>} />
  <BottomNavigationItem value="profile" label="Profile" icon={<span>👤</span>} />
</BottomNavigationBar>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-three-destinations`).

---

### Four Destinations

Common for social and commerce — add one secondary top-level section.

**Source**

```tsx
<BottomNavigationBar aria-label="Primary" defaultValue="feed">
  <BottomNavigationItem value="feed" label="Feed" icon={<span>⌂</span>} />
  <BottomNavigationItem value="explore" label="Explore" icon={<span>⌕</span>} />
  <BottomNavigationItem value="alerts" label="Alerts" icon={<span>◉</span>} />
  <BottomNavigationItem value="profile" label="Profile" icon={<span>👤</span>} />
</BottomNavigationBar>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-four-destinations`).

---

### Five Destinations

Practical maximum — use only when all five are equally important.

**Source**

```tsx
<BottomNavigationBar aria-label="Primary" defaultValue="home">
  <BottomNavigationItem value="home" label="Home" icon={<span>⌂</span>} />
  <BottomNavigationItem value="search" label="Search" icon={<span>⌕</span>} />
  <BottomNavigationItem value="library" label="Library" icon={<span>▤</span>} />
  <BottomNavigationItem value="alerts" label="Alerts" icon={<span>◉</span>} />
  <BottomNavigationItem value="profile" label="Profile" icon={<span>👤</span>} />
</BottomNavigationBar>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-five-destinations`).

---

## BottomNavigationBar + AppShell

Wire bottom navigation through **`AppShell.bottomNavigationBar`** (or `q:slot="bottomNavigationBar"`) so it stays pinned while `<main>` scrolls.

### Mobile App Layout

Full scaffold — app bar, scrollable body, bottom nav.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  BottomNavigationBar,
  BottomNavigationItem,
  Column,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const dest = useSignal("home");

  return (
    <ThemeProvider theme={{}}>
      <AppShell
        appBar={<AppBar title={<Text as="h1">Mobile App</Text>} />}
        bottomNavigationBar={
          <BottomNavigationBar
            aria-label="Primary"
            value={dest.value}
            onChange$={$((next: string) => {
              dest.value = next;
            })}
          >
            <BottomNavigationItem value="home" label="Home" icon={<span>⌂</span>} />
            <BottomNavigationItem value="search" label="Search" icon={<span>⌕</span>} />
            <BottomNavigationItem value="profile" label="Profile" icon={<span>👤</span>} />
          </BottomNavigationBar>
        }
      >
        <Column gap={16} style={{ padding: "24px" }}>
          <Text>Body for: {dest.value}</Text>
        </Column>
      </AppShell>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-appshell-mobile`).

---

### Dashboard Layout

Bottom nav for section switching with a title bar — pair with scrollable analytics content.

**Source**

```tsx
<AppShell
  appBar={
    <AppBar
      title={<Text as="h1">Analytics</Text>}
      actions={[
        <Button key="export" type="button">Export</Button>,
      ]}
    />
  }
  bottomNavigationBar={
    <BottomNavigationBar aria-label="Dashboard" defaultValue="overview">
      <BottomNavigationItem value="overview" label="Overview" icon={<span>▦</span>} />
      <BottomNavigationItem value="reports" label="Reports" icon={<span>📊</span>} />
      <BottomNavigationItem value="settings" label="Settings" icon={<span>⚙</span>} />
    </BottomNavigationBar>
  }
>
  {/* scrollable dashboard body */}
</AppShell>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-appshell-dashboard`).

---

### AppBar Integration

`AppBar` names the current screen; `BottomNavigationBar` switches top-level sections. Drawer menu (☰) handles secondary navigation.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  BottomNavigationBar,
  BottomNavigationItem,
  Button,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const dest = useSignal("home");

  return (
    <ThemeProvider theme={{}}>
      <AppShell
        appBar={
          <AppBar
            leading={<Button type="button" aria-label="Open menu">☰</Button>}
            title={<Text as="h1">App</Text>}
          />
        }
        bottomNavigationBar={
          <BottomNavigationBar
            aria-label="Primary"
            value={dest.value}
            onChange$={$((next: string) => {
              dest.value = next;
            })}
          >
            <BottomNavigationItem value="home" label="Home" icon={<span>⌂</span>} />
            <BottomNavigationItem value="settings" label="Settings" icon={<span>⚙</span>} />
          </BottomNavigationBar>
        }
      >
        <Text style={{ padding: "24px" }}>Section: {dest.value}</Text>
      </AppShell>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-appshell-appbar`).

---

## BottomNavigationBar vs NavigationRail

| Factor | **BottomNavigationBar** | **NavigationRail** |
| --- | --- | --- |
| **Placement** | Bottom edge | Start edge, full height |
| **Screen size** | Phone / narrow layouts | Tablet / desktop (planned) |
| **Thumb reach** | Optimized for one-handed use | Optimized for mouse / wide screens |
| **Item count** | 3–5 recommended | 3–7 (planned) |
| **Status** | **Shipped** | Planned v1.9 |

### BottomNavigationBar

**Source**

```tsx
<BottomNavigationBar aria-label="Primary" defaultValue="home">
  <BottomNavigationItem value="home" label="Home" icon={<span>⌂</span>} />
  <BottomNavigationItem value="search" label="Search" icon={<span>⌕</span>} />
</BottomNavigationBar>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-vs-rail-bottom`).

---

### NavigationRail

Persistent vertical destinations on wide screens (planned).

**Preview**

> **Preview placeholder** — planned widget (`id: bottomnavigationbar-vs-rail-rail`, `preview: false`).

---

### Guidance summary

- **BottomNavigationBar** — primary mobile destinations; always visible at the bottom
- **NavigationRail** — (future) same destinations on desktop without consuming vertical thumb space
- Use [`MediaQuery`](/docs/widgets/layout/media-query) in your app to swap patterns at breakpoints — not built into either widget in v1.8

---

## BottomNavigationBar vs Drawer

| Factor | **BottomNavigationBar** | **Drawer** |
| --- | --- | --- |
| **Visibility** | Always visible | Opens on demand |
| **Destinations** | 3–5 primary | Many links, hierarchy OK |
| **Discoverability** | High — always on screen | Lower — behind menu button |
| **Navigation depth** | Flat top-level only | Deeper trees, grouped sections |
| **Interaction** | One tap | Open panel → select → close |

### BottomNavigationBar

Flat primary sections at the bottom.

**Source**

```tsx
<BottomNavigationBar aria-label="Primary" defaultValue="home">
  <BottomNavigationItem value="home" label="Home" icon={<span>⌂</span>} />
  <BottomNavigationItem value="search" label="Search" icon={<span>⌕</span>} />
  <BottomNavigationItem value="profile" label="Profile" icon={<span>👤</span>} />
</BottomNavigationBar>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-vs-drawer-bottom`).

---

### Drawer

Full navigation list opened from the app bar menu.

**Source**

```tsx
<Drawer open={drawerOpen.value} onOpenChange$={onDrawerOpenChange$}>
  <nav aria-label="Main">
    <Button type="button">Home</Button>
    <Button type="button">Settings</Button>
    <Button type="button">Help</Button>
  </nav>
</Drawer>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-vs-drawer-drawer`).

---

### Guidance summary

- **BottomNavigationBar** — the 3–5 sections users open most often
- **Drawer** — infrequent destinations, account settings, admin links, hierarchical nav
- Combine both: bottom bar for Home / Search / Profile; drawer for Settings, Help, Sign out

---

## Best Practices

### Three to five primary destinations

Keep the bar focused on top-level sections users switch between daily.

**Source**

```tsx
<BottomNavigationBar aria-label="Primary" defaultValue="home">
  <BottomNavigationItem value="home" label="Home" icon={<span>⌂</span>} />
  <BottomNavigationItem value="search" label="Search" icon={<span>⌕</span>} />
  <BottomNavigationItem value="profile" label="Profile" icon={<span>👤</span>} />
</BottomNavigationBar>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-best-three-to-five`).

---

### Clear icons

Use familiar, distinct icons paired with labels — not abstract glyphs alone.

**Source**

```tsx
<BottomNavigationItem value="home" label="Home" icon={<span>⌂</span>} />
<BottomNavigationItem value="search" label="Search" icon={<span>⌕</span>} />
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-best-clear-icons`).

---

### Concise labels

One or two words — "Home", "Search", "Profile". Avoid sentence-length labels.

**Source**

```tsx
<BottomNavigationItem value="home" label="Home" />
<BottomNavigationItem value="profile" label="Profile" />
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-best-concise-labels`).

---

### Predictable ordering

Place the most important destination first (often Home). Keep order stable across app versions.

**Source**

```tsx
<BottomNavigationBar aria-label="Primary" defaultValue="home">
  <BottomNavigationItem value="home" label="Home" />
  <BottomNavigationItem value="library" label="Library" />
  <BottomNavigationItem value="profile" label="Profile" />
</BottomNavigationBar>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: bottomnavigationbar-best-predictable-order`).

---

## Anti-Patterns

### Too many destinations

**Why:** Tap targets shrink, labels truncate, and users cannot scan the bar quickly. Use a drawer for overflow links.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: bottomnavigationbar-anti-too-many`, `preview: false`).

---

### Unclear icons

**Why:** Icons without recognizable meaning force guesswork. Always pair with a `label`.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: bottomnavigationbar-anti-unclear-icons`, `preview: false`).

---

### Missing labels

**Why:** `label` is required on every `BottomNavigationItem` for screen readers and when icons fail to load.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: bottomnavigationbar-anti-missing-labels`, `preview: false`).

---

### Deeply nested navigation

**Why:** Bottom nav is for flat top-level sections. Nested routes belong in page content, drawers, or future tab components — not inside the bar.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: bottomnavigationbar-anti-deep-nesting`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Navigation semantics** | Root renders **`<nav>`** — supply **`aria-label`** on `BottomNavigationBar` (especially when the page has other `<nav>` landmarks) |
| **Items** | Each destination is a **`<button type="button">`** |
| **Active destination** | Selected item has **`aria-current="page"`** |
| **Disabled items** | Native **`disabled`** + **`aria-disabled="true"`** |
| **Icons** | Treat as decorative — labels provide the accessible name |
| **Keyboard** | **Roving `tabIndex`** — one tab stop for the bar; **ArrowLeft/ArrowRight** move between items; **Home/End** jump to first/last enabled item |
| **Screen readers** | Active change announced via **`aria-current`** update — no live region in v1.8 |

Do not use `role="tablist"` — bottom nav is destination navigation, not in-page tabs.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | Full `<nav>` + item buttons render in SSR HTML |
| **Active destination** | `value` or `defaultValue` sets `aria-current="page"` on the correct item |
| **Resumability** | `onChange$` hydrates as a QRL; uncontrolled selection uses a resumable internal signal |
| **Navigation state** | Caller-owned in controlled mode; bar-owned in uncontrolled mode |
| **Browser APIs** | None during render — keyboard handlers attach on the client |

Treat `onChange$` as **client-only**. Do not pass both `value` and `defaultValue`.

---

## Flutter Equivalent

| Topic | Flutter `BottomNavigationBar` | qwik-flutter-ui `BottomNavigationBar` |
| --- | --- | --- |
| **Items** | `items: [BottomNavigationBarItem(…)]` | **`BottomNavigationItem` children** |
| **Selection** | `currentIndex: int` | **`value` / `defaultValue`: string** |
| **Change handler** | `onTap: (int index) {}` | **`onChange$: (value: string) => void`** |
| **Scaffold slot** | `Scaffold.bottomNavigationBar` | **`AppShell.bottomNavigationBar`** |
| **Bar types** | `fixed` / `shifting` | Single fixed style in v1.8 |
| **Label visibility** | `showSelectedLabels` / `showUnselectedLabels` | Labels always shown in v1.8 |
| **Badges** | Supported | **Not in v1.8** |
| **Routing** | Caller navigates in `onTap` | Caller navigates in `onChange$` |

**Flutter**

```dart
Scaffold(
  appBar: AppBar(title: Text('App')),
  bottomNavigationBar: BottomNavigationBar(
    currentIndex: _index,
    onTap: (index) => setState(() => _index = index),
    items: const [
      BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
      BottomNavigationBarItem(icon: Icon(Icons.search), label: 'Search'),
    ],
  ),
  body: /* content */,
);
```

**qwik-flutter-ui**

```tsx
<AppShell
  bottomNavigationBar={
    <BottomNavigationBar
      aria-label="Primary"
      value={dest.value}
      onChange$={$((next: string) => {
        dest.value = next;
      })}
    >
      <BottomNavigationItem value="home" label="Home" icon={<span>⌂</span>} />
      <BottomNavigationItem value="search" label="Search" icon={<span>⌕</span>} />
    </BottomNavigationBar>
  }
>
  {/* body */}
</AppShell>
```

Similarities: bottom placement, icon + label items, single active destination, scaffold integration.

Differences: string `value` instead of index, JSX composition instead of `items` array, no shifting animation or badge support in v1.8.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [AppShell](/docs/widgets/app-structure/app-shell) | Hosts **`BottomNavigationBar`** in the **`bottomNavigationBar`** region |
| [AppBar](/docs/widgets/app-structure/app-bar) | Top chrome — pairs with bottom nav for full mobile layout |
| [Drawer](/docs/widgets/app-structure/drawer) | Secondary / hierarchical navigation opened from menu |
| [NavigationRail](/docs/widgets/navigation/navigation-rail) | Persistent side nav for desktop (planned v1.9) |
| [Tabs](/docs/widgets/navigation/tabs) | In-page section switching (planned) |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/bottom-navigation-bar/`
- **`category`** — groups examples (`basic`, `common`, `selection`, `items`, `patterns`, `appshell`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to app-structure and planned navigation widgets
- **`status: shipped`** — widget is exported from `qwik-flutter-ui` and available in the playground

---

## Public API Reference

### `BottomNavigationBar`

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string` | Controlled active destination — must match a child `BottomNavigationItem.value` |
| `defaultValue` | `string` | Uncontrolled initial destination; first item when omitted |
| `onChange$` | `QRL<(value: string) => void>` | Fires when the user selects a destination |
| `aria-label` | `string` | **Recommended** — names the navigation landmark |
| `children` | `BottomNavigationItem` | Destination items |

### `BottomNavigationItem`

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string` | **Required** — stable destination id, unique among siblings |
| `label` | `string` | **Required** — visible and accessible name |
| `icon` | `JSXOutput` | Optional icon above label |
| `disabled` | `boolean` | Prevents selection |

Both components extend **`BaseProps`** (`id`, `class`, `style`, `data-*`, ARIA attributes).

### v1.8 non-goals

- Routing / URL synchronization
- Link / `href` items
- Badges and notification dots
- Adaptive or responsive hide/show
- More than five items (dev warning)
- Floating bar over content (use in-flow `AppShell` slot)
