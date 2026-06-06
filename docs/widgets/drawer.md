---
title: Drawer
description: Modal slide-in navigation panel for application-level nav with backdrop, focus trap, and AppShell integration.
widget: Drawer
category: app-structure
flutterEquivalent: Drawer
status: shipped
related:
  - AppShell
  - AppBar
  - SideSheet
  - Menu
  - OverlayContainer
  - Button
since: "0.0.1"
examples:
  - id: drawer-basic
    file: examples/drawer/basic.tsx
    category: basic
  - id: drawer-app-navigation
    file: examples/drawer/app-navigation.tsx
    category: common
  - id: drawer-dashboard-navigation
    file: examples/drawer/dashboard-navigation.tsx
    category: common
  - id: drawer-admin-panel
    file: examples/drawer/admin-panel.tsx
    category: common
  - id: drawer-mobile-navigation
    file: examples/drawer/mobile-navigation.tsx
    category: common
  - id: drawer-open-appbar-menu
    file: examples/drawer/open-appbar-menu.tsx
    category: open-close
  - id: drawer-open-programmatic
    file: examples/drawer/open-programmatic.tsx
    category: open-close
  - id: drawer-dismiss-backdrop
    file: examples/drawer/dismiss-backdrop.tsx
    category: open-close
  - id: drawer-dismiss-escape
    file: examples/drawer/dismiss-escape.tsx
    category: open-close
  - id: drawer-nav-links
    file: examples/drawer/nav-links.tsx
    category: content
  - id: drawer-nav-profile
    file: examples/drawer/nav-profile.tsx
    category: content
  - id: drawer-nav-settings
    file: examples/drawer/nav-settings.tsx
    category: content
  - id: drawer-nav-mixed
    file: examples/drawer/nav-mixed.tsx
    category: content
  - id: drawer-appshell
    file: examples/drawer/appshell.tsx
    category: appshell
  - id: drawer-appshell-appbar
    file: examples/drawer/appshell-appbar.tsx
    category: appshell
  - id: drawer-appshell-dashboard
    file: examples/drawer/appshell-dashboard.tsx
    category: appshell
  - id: drawer-vs-sidesheet-drawer
    file: examples/drawer/vs-sidesheet-drawer.tsx
    category: comparison
  - id: drawer-vs-sidesheet-sidesheet
    file: examples/drawer/vs-sidesheet-sidesheet.tsx
    category: comparison
  - id: drawer-vs-rail-drawer
    file: examples/drawer/vs-rail-drawer.tsx
    category: comparison
  - id: drawer-vs-rail-rail
    file: examples/drawer/vs-rail-rail.tsx
    category: comparison
  - id: drawer-best-concise
    file: examples/drawer/best-concise.tsx
    category: best-practice
  - id: drawer-best-grouping
    file: examples/drawer/best-grouping.tsx
    category: best-practice
  - id: drawer-best-hierarchy
    file: examples/drawer/best-hierarchy.tsx
    category: best-practice
  - id: drawer-best-ordering
    file: examples/drawer/best-ordering.tsx
    category: best-practice
  - id: drawer-anti-depth
    file: examples/drawer/anti-depth.tsx
    category: anti-pattern
  - id: drawer-anti-unrelated
    file: examples/drawer/anti-unrelated.tsx
    category: anti-pattern
  - id: drawer-anti-large-tree
    file: examples/drawer/anti-large-tree.tsx
    category: anti-pattern
  - id: drawer-anti-content-panel
    file: examples/drawer/anti-content-panel.tsx
    category: anti-pattern
---

# Drawer

## Overview

`Drawer` is a **modal slide-in panel** from the start edge for application navigation. It maps to Flutter's [`Drawer`](https://api.flutter.dev/flutter/material/Drawer-class.html).

When open, the drawer shows a **backdrop**, **traps focus** inside the panel, and dismisses on **backdrop click** or **Escape**. When closed, it renders an inert `<aside>` anchor with no portal content.

Place **`Drawer`** in the **`drawer`** region of [`AppShell`](/docs/widgets/app-structure/app-shell) (or as a sibling under **`OverlayContainer`**) and control **`open`** from your app or **`AppBar`** menu button.

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Application navigation** | Primary destinations — Home, Settings, Account |
| **Secondary navigation** | Less-frequent sections grouped below primary links |
| **Contextual navigation** | Screen-specific links when paired with route state (caller-owned) |
| **Temporary navigation surfaces** | Opens over content; closes after selection or dismiss |

### When to use Drawer

- Mobile and responsive apps with a hamburger menu
- Dashboard and admin apps with a structured nav tree
- Any layout that needs **modal** off-canvas navigation

Use **`SideSheet`** for non-modal filters or inspectors, **`Menu`** for small action lists, and **`NavigationRail`** (planned v1.9) for persistent desktop side nav.

### Drawer vs SideSheet vs NavigationRail vs Menu

| | `Drawer` | `SideSheet` | `NavigationRail` | `Menu` |
| --- | --- | --- | --- | --- |
| **Purpose** | App navigation | Secondary panel content | Persistent destinations | Command list |
| **Modal** | Yes — backdrop + focus trap | No | Always visible (planned) | No |
| **Edge** | Start (LTR) | Configurable edge | Start, full height | Near trigger |
| **Trigger** | AppBar menu | Toolbar / page action | N/A | Click |
| **Best for** | Full nav tree | Filters, details | Desktop primary nav | Edit / Delete |

---

## Import

```tsx
import {
  AppBar,
  AppShell,
  Button,
  Column,
  Container,
  Divider,
  Drawer,
  OverlayContainer,
  Row,
  SideSheet,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working drawer with controlled open state.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppShell,
  Button,
  Column,
  Container,
  Drawer,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <AppShell
          drawer={
            <Drawer
              open={open.value}
              onOpenChange$={$((next) => {
                open.value = next;
              })}
            >
              <nav aria-label="Main">
                <Container padding={16}>
                  <Column gap={8}>
                    <Button type="button">Home</Button>
                    <Button type="button">Settings</Button>
                  </Column>
                </Container>
              </nav>
            </Drawer>
          }
        >
          <Container padding={24}>
            <Button type="button" onClick$={$(() => {
              open.value = true;
            })}>
              Open drawer
            </Button>
            <Text>Page content</Text>
          </Container>
        </AppShell>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-basic`).

---

## Common Usage

### Application Navigation

Primary app sections in a labeled `<nav>`.

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
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);
  const close$ = $(() => {
    open.value = false;
  });

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
                  aria-expanded={open.value}
                  onClick$={$(() => {
                    open.value = true;
                  })}
                >
                  ☰
                </Button>
              }
              title={<Text as="h1">My App</Text>}
            />
          }
          drawer={
            <Drawer open={open.value} onOpenChange$={$((next) => {
              open.value = next;
            })}>
              <nav aria-label="Main">
                <Container padding={16}>
                  <Column gap={8}>
                    <Button type="button" onClick$={close$}>Home</Button>
                    <Button type="button" onClick$={close$}>Projects</Button>
                    <Button type="button" onClick$={close$}>Settings</Button>
                  </Column>
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

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-app-navigation`).

---

### Dashboard Navigation

Grouped sections for analytics and reporting apps.

**Source**

```tsx
<nav aria-label="Dashboard">
  <Container padding={16}>
    <Column gap={16}>
      <Column gap={8}>
        <Text as="strong">Overview</Text>
        <Button type="button">Summary</Button>
        <Button type="button">Reports</Button>
      </Column>
      <Column gap={8}>
        <Text as="strong">Manage</Text>
        <Button type="button">Users</Button>
        <Button type="button">Billing</Button>
      </Column>
    </Column>
  </Container>
</nav>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-dashboard-navigation`).

---

### Admin Panel

Extended nav for operator tools.

**Source**

```tsx
<nav aria-label="Admin">
  <Container padding={16}>
    <Column gap={8}>
      <Button type="button">Dashboard</Button>
      <Button type="button">Users</Button>
      <Button type="button">Roles</Button>
      <Button type="button">Audit log</Button>
      <Button type="button">System settings</Button>
    </Column>
  </Container>
</nav>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-admin-panel`).

---

### Mobile Navigation

Compact list for phone-width layouts — pair with **`AppBar`** menu **`leading`**.

**Source**

```tsx
<Drawer open={open.value} onOpenChange$={onOpenChange$}>
  <nav aria-label="Main">
    <Container padding={16}>
      <Column gap={4}>
        <Button type="button">Feed</Button>
        <Button type="button">Messages</Button>
        <Button type="button">Profile</Button>
      </Column>
    </Container>
  </nav>
</Drawer>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-mobile-navigation`).

---

## Opening and Closing

| Prop / behavior | Description |
| --- | --- |
| **`open`** | Controlled visibility — prefer **`false`** on SSR |
| **`defaultOpen`** | Uncontrolled initial state — **`defaultOpen={true}`** triggers SSR dev warning |
| **`onOpenChange$`** | `(open, reason?)` — optional **`OverlayDismissReason`** |
| **Backdrop click** | Closes with **`backdrop`** reason |
| **Escape** | Closes with **`escape`** reason |
| **Focus** | Moves to first focusable element on open; restores on close |

Dismiss reasons: **`escape`**, **`backdrop`**, **`programmatic`**.

### AppBar Menu Button

Wire **`AppBar.leading`** to set **`open`** to **`true`**. Set **`aria-expanded`** on the menu button.

**Source**

```tsx
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
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-open-appbar-menu`).

---

### Programmatic Open

Set **`open`** from any handler — keyboard shortcut, deep link, or onboarding.

**Source**

```tsx
const openDrawer$ = $(() => {
  drawerOpen.value = true;
});

<Button type="button" onClick$={openDrawer$}>
  Show navigation
</Button>

<Drawer open={drawerOpen.value} onOpenChange$={$((next) => {
  drawerOpen.value = next;
})}>
  {/* nav */}
</Drawer>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-open-programmatic`).

---

### Backdrop Dismiss

Clicking the dimmed backdrop closes the drawer automatically.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-dismiss-backdrop`).

---

### Escape Dismiss

Press **Escape** while the drawer is the topmost modal layer to close it.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-dismiss-escape`).

---

## Navigation Content

Default panel width is **304px** (scrollable). Wrap primary links in **`<nav aria-label="…">`**.

Recommended structure:

```
Drawer
└── nav (aria-label)
    └── Container (padding)
        ├── Primary destinations
        ├── Optional sections (grouped)
        └── Profile / settings footer
```

### Navigation Links

**Source**

```tsx
<nav aria-label="Main">
  <Container padding={16}>
    <Column gap={8}>
      <Button href="/">Home</Button>
      <Button href="/projects">Projects</Button>
      <Button href="/settings">Settings</Button>
    </Column>
  </Container>
</nav>
```

Close the drawer in **`onClick$`** when using buttons instead of links.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-nav-links`).

---

### User Profile Section

Footer area with account summary and sign out.

**Source**

```tsx
<nav aria-label="Main">
  <Container padding={16}>
    <Column gap={16}>
      <Column gap={8}>
        <Button type="button">Home</Button>
        <Button type="button">Inbox</Button>
      </Column>
      <Column gap={8}>
        <Text>Jane Doe</Text>
        <Button type="button">Sign out</Button>
      </Column>
    </Column>
  </Container>
</nav>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-nav-profile`).

---

### Settings Section

Grouped settings destinations.

**Source**

```tsx
<nav aria-label="Settings">
  <Container padding={16}>
    <Column gap={16}>
      <Text as="strong">Settings</Text>
      <Column gap={8}>
        <Button type="button">Account</Button>
        <Button type="button">Notifications</Button>
        <Button type="button">Privacy</Button>
      </Column>
    </Column>
  </Container>
</nav>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-nav-settings`).

---

### Mixed Navigation Content

Primary links, section headers, and footer actions in one panel.

**Source**

```tsx
<nav aria-label="Main">
  <Container padding={16}>
    <Column gap={16}>
      <Column gap={8}>
        <Button type="button">Dashboard</Button>
        <Button type="button">Analytics</Button>
      </Column>
      <Column gap={8}>
        <Text as="strong">Workspace</Text>
        <Button type="button">Team</Button>
        <Button type="button">Integrations</Button>
      </Column>
      <Button type="button">Help</Button>
    </Column>
  </Container>
</nav>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-nav-mixed`).

---

## Drawer + AppShell

### AppShell + Drawer

Pass **`Drawer`** to the **`drawer`** prop.

**Source**

```tsx
<OverlayContainer>
  <AppShell drawer={<Drawer open={open.value}>{/* nav */}</Drawer>}>
    {/* main */}
  </AppShell>
</OverlayContainer>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-appshell`).

---

### AppBar + Drawer

Menu button in **`AppBar.leading`**; drawer state in the route component.

**Source**

```tsx
<AppShell
  appBar={
    <AppBar
      leading={<Button type="button" aria-label="Open navigation menu" onClick$={openDrawer$}>☰</Button>}
      title={<Text as="h1">App</Text>}
    />
  }
  drawer={<Drawer open={open.value} onOpenChange$={onOpenChange$}>{/* nav */}</Drawer>}
>
  {/* main */}
</AppShell>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-appshell-appbar`).

---

### Full Dashboard Layout

**Source**

```tsx
<ThemeProvider theme={{}}>
  <OverlayContainer>
    <AppShell
      appBar={<AppBar leading={menuButton} title={<Text as="h1">Dashboard</Text>} />}
      drawer={<Drawer open={drawerOpen.value} onOpenChange$={onDrawerOpenChange$}>{navContent}</Drawer>}
    >
      <Container padding={24}>{dashboardBody}</Container>
    </AppShell>
  </OverlayContainer>
</ThemeProvider>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-appshell-dashboard`).

---

## Drawer vs SideSheet

| Factor | **Drawer** | **SideSheet** |
| --- | --- | --- |
| **Purpose** | Navigation | Filters, inspectors, details |
| **Modal** | Yes — backdrop + focus trap | No — page stays interactive |
| **Dismiss** | Backdrop + Escape | Caller toggles **`open`** |
| **Default edge** | Start | End (right) |
| **User expectation** | "Go somewhere else" | "Adjust view options" |

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-vs-sidesheet-drawer`).

---

### SideSheet

**Source**

```tsx
<SideSheet open={filtersOpen.value} aria-label="Filters">
  <Container padding={16}>
    <Text>Filter controls</Text>
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-vs-sidesheet-sidesheet`).

---

### Guidance summary

- **Drawer** — primary app navigation, modal, dismissible
- **SideSheet** — supplementary panel content without blocking the page
- Do not put filter forms in **`Drawer`** — use **`SideSheet`** or inline UI

---

## Drawer vs NavigationRail

| Factor | **Drawer** | **NavigationRail** |
| --- | --- | --- |
| **Mobile** | Hamburger → modal drawer | Hidden or replaced by drawer |
| **Desktop** | Optional — often replaced by rail | Persistent vertical destinations |
| **Discoverability** | Hidden until opened | Always visible icons/labels |
| **Status** | Shipped | Planned v1.9 |

### Drawer

**Source**

```tsx
<AppBar
  leading={
    <Button type="button" aria-label="Open navigation menu" onClick$={openDrawer$}>
      ☰
    </Button>
  }
  title={<Text as="h1">App</Text>}
/>
<Drawer open={open.value}>{/* full nav list */}</Drawer>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-vs-rail-drawer`).

---

### NavigationRail

**Not shipped in v1.** Planned for v1.9 — compact persistent side navigation on wide screens. Use **`Drawer`** on mobile and tablet until then.

**Preview**

> **Preview placeholder** — code-only note (`id: drawer-vs-rail-rail`, `preview: false`).

---

### Guidance summary

- **Drawer** — mobile-first, temporary, full navigation list
- **NavigationRail** — (future) desktop primary destinations without opening a panel
- On large screens, consider showing fewer drawer items or splitting primary nav to a future rail

---

## Best Practices

### Keep navigation concise

Top-level destinations only — defer deep hierarchies to in-page nav or routes.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-best-concise`).

---

### Group related destinations

Use **`Text`** section headers or **`Divider`** between groups.

**Source**

```tsx
<Column gap={16}>
  <Column gap={8}>
    <Text as="strong">Work</Text>
    <Button type="button">Projects</Button>
    <Button type="button">Tasks</Button>
  </Column>
  <Column gap={8}>
    <Text as="strong">Account</Text>
    <Button type="button">Profile</Button>
    <Button type="button">Billing</Button>
  </Column>
</Column>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-best-grouping`).

---

### Provide clear hierarchy

Section labels before nested groups — one visual level in the drawer; deeper levels live on pages.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-best-hierarchy`).

---

### Maintain consistent ordering

Same destination order on every screen — primary routes first, settings and sign out last.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: drawer-best-ordering`).

---

## Anti-Patterns

### Excessive navigation depth

**Why:** Multi-level trees are hard to scan in a slide-in panel. Flatten top level; use in-page tabs or sub-routes.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: drawer-anti-depth`, `preview: false`).

---

### Unrelated content

**Why:** Marketing copy, forms, or data tables do not belong in the nav drawer. Keep it wayfinding only.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: drawer-anti-unrelated`, `preview: false`).

---

### Very large navigation trees

**Why:** Long scrollable lists reduce discoverability. Split by role, search, or separate admin apps.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: drawer-anti-large-tree`, `preview: false`).

---

### Using Drawer as a content panel

**Why:** Filters, previews, and editors are **`SideSheet`** or page content — not modal navigation. Drawer blocks the app with a backdrop.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: drawer-anti-content-panel`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Navigation semantics** | Wrap links in **`<nav aria-label="Main">`** (or descriptive label) |
| **Panel** | Renders as **`<aside>`** — not **`role="dialog"`** |
| **Focus on open** | First focusable element in the panel receives focus |
| **Focus trap** | Tab cycles within the panel while open |
| **Focus on close** | Returns to the element that was focused before open |
| **Escape** | Closes the drawer |
| **Menu trigger** | **`aria-expanded`** on **`AppBar`** menu button matches **`open`** |
| **Backdrop** | Presentational — not announced as interactive content |
| **Closed state** | **`aria-hidden="true"`** and **`inert`** on closed anchor |

Close the drawer when a nav item activates — routing does not auto-close in v1.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Closed drawer** | Inert `<aside>` only — **no** backdrop or portaled panel in SSR HTML |
| **`open={false}`** | Preferred default on server |
| **`defaultOpen={true}`** | Dev warning on SSR — open after hydration instead |
| **Resumability** | `onOpenChange$` hydrates as QRL; listeners attach while open |
| **Overlay hydration** | Requires **`OverlayContainer`** ancestor when open |
| **Static rendering** | Trigger and closed anchor render on server; modal layer is client-only |

Treat drawer open state as **client-driven** for predictable SSR markup.

---

## Flutter Equivalent

| Topic | Flutter `Drawer` | qwik-flutter-ui `Drawer` |
| --- | --- | --- |
| **Placement** | `Scaffold.drawer` | `AppShell.drawer` or under `OverlayContainer` |
| **Open API** | `ScaffoldState.openDrawer()` | `open` + `onOpenChange$` |
| **Content** | `Drawer(child: …)` | JSX children — typically `<nav>` |
| **Width** | `Drawer.width` | Default **304px** via CSS; override with `class` / `style` |
| **Modal** | Backdrop when open | Backdrop + focus trap built in |
| **End drawer** | `endDrawer` | **Not in v1** — start edge only |
| **Permanent / mini drawer** | Supported in Material | **Not in v1** |

**Flutter**

```dart
Scaffold(
  appBar: AppBar(title: Text('App')),
  drawer: Drawer(
    child: ListView(
      children: [
        ListTile(title: Text('Home'), onTap: () {}),
        ListTile(title: Text('Settings'), onTap: () {}),
      ],
    ),
  ),
  body: /* content */,
);
```

**qwik-flutter-ui**

```tsx
<OverlayContainer>
  <AppShell
    appBar={
      <AppBar
        leading={
          <Button type="button" aria-label="Open navigation menu" onClick$={openDrawer$}>
            ☰
          </Button>
        }
        title={<Text as="h1">App</Text>}
      />
    }
    drawer={
      <Drawer open={open.value} onOpenChange$={onOpenChange$}>
        <nav aria-label="Main">
          <Button type="button">Home</Button>
          <Button type="button">Settings</Button>
        </nav>
      </Drawer>
    }
  >
    {/* body */}
  </AppShell>
</OverlayContainer>
```

Similarities: start-edge panel, modal backdrop, scaffold integration, navigation content.

Differences: declarative open state, no built-in `DrawerHeader` / list tiles, no swipe-to-open in v1, caller composes nav with **`Button`** / **`Column`**.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [AppShell](/docs/widgets/app-structure/app-shell) | Hosts **`Drawer`** in the **`drawer`** region |
| [AppBar](/docs/widgets/app-structure/app-bar) | Menu button in **`leading`** opens drawer |
| [SideSheet](/docs/widgets/app-structure/side-sheet) | Non-modal panel — filters, not primary nav |
| [NavigationRail](/docs/widgets/navigation/navigation-rail) | Persistent side nav (planned v1.9) |
| [Menu](/docs/widgets/overlays/menu) | Small action list — not full navigation |
| [OverlayContainer](/docs/widgets/overlays/overlay-container) | Required overlay host when drawer is open |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/drawer/`
- **`category`** — groups examples (`basic`, `common`, `open-close`, `content`, `appshell`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to app-structure and overlay widgets
- **`flutterEquivalent`** — `Drawer`

When adding examples, wrap with **`ThemeProvider`** + **`OverlayContainer`**, use **`<nav aria-label>`**, close on nav selection when appropriate, and import only from `qwik-flutter-ui`.
