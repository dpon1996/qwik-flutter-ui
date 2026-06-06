---
title: SideSheet
description: Non-modal edge overlay panel for filters, inspectors, and secondary contextual content alongside the primary workflow.
widget: SideSheet
category: app-structure
flutterEquivalent: side panel / companion sheet
status: shipped
related:
  - Drawer
  - AppShell
  - Dialog
  - Popover
  - OverlayContainer
  - AppBar
since: "0.0.1"
examples:
  - id: sidesheet-basic
    file: examples/sidesheet/basic.tsx
    category: basic
  - id: sidesheet-details-panel
    file: examples/sidesheet/details-panel.tsx
    category: common
  - id: sidesheet-filters-panel
    file: examples/sidesheet/filters-panel.tsx
    category: common
  - id: sidesheet-inspector-panel
    file: examples/sidesheet/inspector-panel.tsx
    category: common
  - id: sidesheet-settings-panel
    file: examples/sidesheet/settings-panel.tsx
    category: common
  - id: sidesheet-position-start
    file: examples/sidesheet/position-start.tsx
    category: positioning
  - id: sidesheet-position-end
    file: examples/sidesheet/position-end.tsx
    category: positioning
  - id: sidesheet-content-readonly
    file: examples/sidesheet/content-readonly.tsx
    category: content
  - id: sidesheet-content-editable
    file: examples/sidesheet/content-editable.tsx
    category: content
  - id: sidesheet-content-inspector
    file: examples/sidesheet/content-inspector.tsx
    category: content
  - id: sidesheet-content-analytics
    file: examples/sidesheet/content-analytics.tsx
    category: content
  - id: sidesheet-appshell-dashboard
    file: examples/sidesheet/appshell-dashboard.tsx
    category: appshell
  - id: sidesheet-appshell-admin
    file: examples/sidesheet/appshell-admin.tsx
    category: appshell
  - id: sidesheet-appshell-analytics
    file: examples/sidesheet/appshell-analytics.tsx
    category: appshell
  - id: sidesheet-appshell-cms
    file: examples/sidesheet/appshell-cms.tsx
    category: appshell
  - id: sidesheet-vs-drawer-drawer
    file: examples/sidesheet/vs-drawer-drawer.tsx
    category: comparison
  - id: sidesheet-vs-drawer-sidesheet
    file: examples/sidesheet/vs-drawer-sidesheet.tsx
    category: comparison
  - id: sidesheet-vs-dialog-sidesheet
    file: examples/sidesheet/vs-dialog-sidesheet.tsx
    category: comparison
  - id: sidesheet-vs-dialog-dialog
    file: examples/sidesheet/vs-dialog-dialog.tsx
    category: comparison
  - id: sidesheet-best-secondary
    file: examples/sidesheet/best-secondary.tsx
    category: best-practice
  - id: sidesheet-best-preserve-workflow
    file: examples/sidesheet/best-preserve-workflow.tsx
    category: best-practice
  - id: sidesheet-best-contextual
    file: examples/sidesheet/best-contextual.tsx
    category: best-practice
  - id: sidesheet-best-not-full-page
    file: examples/sidesheet/best-not-full-page.tsx
    category: best-practice
  - id: sidesheet-anti-navigation
    file: examples/sidesheet/anti-navigation.tsx
    category: anti-pattern
  - id: sidesheet-anti-huge-workflows
    file: examples/sidesheet/anti-huge-workflows.tsx
    category: anti-pattern
  - id: sidesheet-anti-unrelated
    file: examples/sidesheet/anti-unrelated.tsx
    category: anti-pattern
  - id: sidesheet-anti-replace-structure
    file: examples/sidesheet/anti-replace-structure.tsx
    category: anti-pattern
---

# SideSheet

## Overview

`SideSheet` is a **non-modal panel fixed to a screen edge** — filters, inspectors, details, and other secondary content overlaid above the page. Flutter has no direct `Scaffold` equivalent; it maps to **companion side panel** and **Material side sheet** patterns on the web.

Unlike **`Drawer`**, there is **no backdrop** and **no focus trap** — the main workflow stays interactive. Unlike **`Dialog`**, the panel stays anchored to an edge and preserves page context.

Control visibility with **`open`** only (controlled). Place **`SideSheet`** inside **`OverlayContainer`**, typically as a **sibling** to [`AppShell`](/docs/widgets/app-structure/app-shell).

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Contextual content** | Details about the current selection or view |
| **Inspector panels** | Properties, metadata, or preview alongside a canvas |
| **Detail panels** | Read-only or editable info without leaving the page |
| **Secondary application content** | Supplements `<main>` — not a replacement for it |

### When to use SideSheet

- Filter panels toggled from an app bar action
- Record details when a list row is selected
- Property inspectors in builders or CMS tools
- Quick settings that affect the current view

Use **`Drawer`** for primary app navigation, **`Dialog`** for blocking modal tasks, and **`Popover`** for small anchored pickers.

### SideSheet vs Drawer vs Dialog vs Popover

| | `SideSheet` | `Drawer` | `Dialog` | `Popover` |
| --- | --- | --- | --- | --- |
| **Purpose** | Secondary content | App navigation | Modal task | Small anchored UI |
| **Modal** | No | Yes | Yes (default) | No |
| **Backdrop** | No | Yes | Yes | No |
| **Focus trap** | No | Yes | Yes | No |
| **Edge** | left / right / top / bottom | Start only | Centered | Near trigger |
| **Best for** | Filters, inspectors | Nav menu | Confirm, forms | Compact pickers |

---

## Import

```tsx
import {
  AppBar,
  AppShell,
  Button,
  Checkbox,
  Column,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  OverlayContainer,
  Popover,
  Row,
  SideSheet,
  SideSheetPosition,
  Switch,
  Text,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working side sheet with controlled **`open`**.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppShell,
  Button,
  Container,
  OverlayContainer,
  SideSheet,
  SideSheetPosition,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <AppShell>
          <Container padding={24}>
            <Button type="button" onClick$={$(() => {
              open.value = !open.value;
            })}>
              Toggle panel
            </Button>
          </Container>
        </AppShell>

        <SideSheet
          id="basic-panel"
          open={open.value}
          width={320}
          position={SideSheetPosition.right}
          aria-label="Details"
        >
          <Container padding={16}>
            <Text>Secondary panel content</Text>
          </Container>
        </SideSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-basic`).

---

## Common Usage

### Details Panel

Show metadata for the selected list item.

**Source**

```tsx
<SideSheet
  id="record-details"
  open={detailsOpen.value}
  width={360}
  position={SideSheetPosition.right}
  aria-label="Record details"
>
  <Container padding={16}>
    <Column gap={12}>
      <Text as="h2">Order #1042</Text>
      <Text>Status: Shipped</Text>
      <Text>Customer: Jane Doe</Text>
      <Button type="button" onClick$={closeDetails$}>Close</Button>
    </Column>
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-details-panel`).

---

### Filters Panel

Toggle filters from the app bar without blocking the list.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  AppBar,
  AppShell,
  Button,
  Checkbox,
  Column,
  Container,
  OverlayContainer,
  SideSheet,
  SideSheetPosition,
  Switch,
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
              title={<Text as="h1">Reports</Text>}
              actions={[
                <Button
                  key="filters"
                  type="button"
                  aria-expanded={open.value}
                  aria-controls="report-filters"
                  onClick$={$(() => {
                    open.value = !open.value;
                  })}
                >
                  Filters
                </Button>,
              ]}
            />
          }
        >
          <Text>Report table…</Text>
        </AppShell>

        <SideSheet
          id="report-filters"
          open={open.value}
          width={320}
          position={SideSheetPosition.right}
          aria-label="Report filters"
        >
          <Container padding={16}>
            <Column gap={12}>
              <Text as="h2">Filters</Text>
              <Switch label="Show archived" />
              <Checkbox label="Include drafts" />
              <Button type="button" onClick$={close$}>Apply</Button>
            </Column>
          </Container>
        </SideSheet>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-filters-panel`).

---

### Inspector Panel

Design or CMS property editor alongside a canvas.

**Source**

```tsx
<SideSheet
  open={inspectorOpen.value}
  width={300}
  position={SideSheetPosition.right}
  aria-label="Properties inspector"
>
  <Container padding={16}>
    <Column gap={12}>
      <Text as="h2">Properties</Text>
      <TextField decoration={{ label: "Label" }} />
      <TextField decoration={{ label: "Width" }} />
    </Column>
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-inspector-panel`).

---

### Settings Panel

View-specific settings — not full app settings.

**Source**

```tsx
<SideSheet
  open={settingsOpen.value}
  width={340}
  position={SideSheetPosition.right}
  aria-label="View settings"
>
  <Container padding={16}>
    <Column gap={12}>
      <Text as="h2">View settings</Text>
      <Switch label="Compact rows" />
      <Switch label="Show thumbnails" />
    </Column>
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-settings-panel`).

---

## Positioning

Pass **`position`** with **`SideSheetPosition`**. Default is **`right`**.

| Position | Edge | Size prop |
| --- | --- | --- |
| **`left`** / **`start`** | Inline-start, full height | **`width`** (default 360px) |
| **`right`** / **`end`** | Inline-end, full height | **`width`** |
| **`top`** | Top, full width | **`height`** (default 360px) |
| **`bottom`** | Bottom, full width | **`height`** |

Panel scrolls when content overflows.

### Start SideSheet

**Source**

```tsx
<SideSheet
  open={open.value}
  width={280}
  position={SideSheetPosition.left}
  aria-label="Inspector"
>
  <Container padding={16}>
    <Text>Start-edge panel</Text>
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-position-start`).

---

### End SideSheet

**Source**

```tsx
<SideSheet
  open={open.value}
  width={360}
  position={SideSheetPosition.right}
  aria-label="Filters"
>
  <Container padding={16}>
    <Text>End-edge panel (default side)</Text>
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-position-end`).

---

## Content Patterns

Keep panels focused — one purpose per sheet.

### Read-Only Details

**Source**

```tsx
<SideSheet open={open.value} width={320} aria-label="Shipment details">
  <Container padding={16}>
    <Column gap={8}>
      <Text as="h2">Shipment</Text>
      <Text>Carrier: UPS</Text>
      <Text>ETA: June 12</Text>
    </Column>
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-content-readonly`).

---

### Editable Settings

Short forms — not multi-step wizards.

**Source**

```tsx
<SideSheet open={open.value} width={340} aria-label="Column settings">
  <Container padding={16}>
    <Column gap={12}>
      <TextField decoration={{ label: "Column title" }} />
      <Switch label="Visible" defaultChecked={true} />
      <Button type="button">Save</Button>
    </Column>
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-content-editable`).

---

### Property Inspector

Fields bound to the selected object.

**Source**

```tsx
<SideSheet open={open.value} width={300} aria-label="Layer inspector">
  <Container padding={16}>
    <Column gap={8}>
      <Text as="h2">Layer</Text>
      <TextField decoration={{ label: "Name" }} />
      <TextField decoration={{ label: "Opacity" }} />
    </Column>
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-content-inspector`).

---

### Analytics Panel

Summary metrics alongside a chart.

**Source**

```tsx
<SideSheet open={open.value} width={380} aria-label="Metrics breakdown">
  <Container padding={16}>
    <Column gap={12}>
      <Text as="h2">Breakdown</Text>
      <Text>Visits: 12,400</Text>
      <Text>Conversion: 3.2%</Text>
      <Text>Bounce rate: 41%</Text>
    </Column>
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-content-analytics`).

---

## SideSheet + AppShell

Recommended pattern: **`SideSheet`** as a **sibling** inside **`OverlayContainer`**, not only the **`AppShell.sideSheet`** slot — the portaled panel stacks above all page chrome.

Wire toggles from **`AppBar.actions`** with **`aria-expanded`** and **`aria-controls`**.

### Dashboard Layout

List + filter sheet on the end edge.

**Source**

```tsx
<OverlayContainer>
  <AppShell appBar={<AppBar title={<Text as="h1">Dashboard</Text>} actions={[filterButton]} />}>
    {/* charts and tables */}
  </AppShell>
  <SideSheet id="dashboard-filters" open={open.value} width={320} aria-label="Filters">
    {/* filter controls */}
  </SideSheet>
</OverlayContainer>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-appshell-dashboard`).

---

### Admin Panel

User detail sheet when a row is selected.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-appshell-admin`).

---

### Analytics Application

Metrics breakdown sheet alongside a chart canvas.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-appshell-analytics`).

---

### Content Management System

Property inspector for the selected block.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-appshell-cms`).

---

## SideSheet vs Drawer

| Factor | **Drawer** | **SideSheet** |
| --- | --- | --- |
| **Navigation** | Primary app nav | Not for nav |
| **Content** | Link lists | Filters, details, inspectors |
| **Interaction** | Modal — blocks page | Non-modal — page stays usable |
| **Dismiss** | Backdrop + Escape | Caller toggles **`open`** |
| **User expectation** | "Go elsewhere" | "Adjust this view" |

### Drawer

**Source**

```tsx
<Drawer open={drawerOpen.value} onOpenChange$={onDrawerOpenChange$}>
  <nav aria-label="Main">
    <Button type="button">Home</Button>
    <Button type="button">Settings</Button>
  </nav>
</Drawer>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-vs-drawer-drawer`).

---

### SideSheet

**Source**

```tsx
<SideSheet open={filtersOpen.value} width={320} aria-label="Filters">
  <Container padding={16}>
    <Switch label="Show archived" />
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-vs-drawer-sidesheet`).

---

### Guidance summary

- **Drawer** — hamburger menu, app-wide destinations, modal
- **SideSheet** — contextual tools that complement the current page
- Never put the main nav tree in **`SideSheet`**

---

## SideSheet vs Dialog

| Factor | **SideSheet** | **Dialog** |
| --- | --- | --- |
| **Context** | Primary view stays visible | Centered — blocks attention |
| **Workflow** | Parallel editing / filtering | Blocking confirm or submit |
| **Density** | Tall scrollable panel | Compact centered box |
| **Dismiss** | Toggle **`open`** | Backdrop + Escape |

### SideSheet

**Source**

```tsx
<SideSheet open={open.value} width={360} aria-label="Edit fields">
  <Container padding={16}>
    <TextField decoration={{ label: "Title" }} />
    <Button type="button">Update</Button>
  </Container>
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-vs-dialog-sidesheet`).

---

### Dialog

**Source**

```tsx
<Dialog open={open.value} onOpenChange$={onOpenChange$}>
  <DialogTitle>Delete project?</DialogTitle>
  <DialogContent>
    <Text>This cannot be undone.</Text>
  </DialogContent>
  <DialogActions>
    <Button type="button">Cancel</Button>
    <Button type="button">Delete</Button>
  </DialogActions>
</Dialog>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-vs-dialog-dialog`).

---

### Guidance summary

- **SideSheet** — user still sees the list/chart while adjusting options
- **Dialog** — user must finish or dismiss before continuing
- Destructive confirmations belong in **`Dialog`** or **`AlertDialog`**, not **`SideSheet`**

---

## Layout Behavior

| Topic | Behavior |
| --- | --- |
| **Layout participation** | **Does not** shrink `<main>` — overlays above content via **`OverlayPortal`** |
| **Pointer events** | Clicks outside the panel reach the page; panel receives clicks inside |
| **Content ownership** | Caller composes children — no built-in header or list model |
| **Visibility** | Controlled **`open`** only — no **`onOpenChange$`** on the widget |
| **AppShell** | Optional **`sideSheet`** slot for structure; **portaled sibling** is the primary integration path |
| **OverlayContainer** | Required ancestor — registers overlay layer when open |
| **Z-index** | Stacks above page chrome and non-modal overlays |

`SideSheet` supplements the primary workflow — it does not replace **`AppShell`** regions or routing.

---

## Best Practices

### Use for secondary content

Filters, inspectors, and selection details — not primary page body.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-best-secondary`).

---

### Preserve primary workflow

Users can still scroll and click the main view while the sheet is open.

**Source**

```tsx
// Good — list remains interactive while filters are open
<SideSheet open={filtersOpen.value} aria-label="Filters">
  {/* filter controls */}
</SideSheet>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-best-preserve-workflow`).

---

### Keep content contextual

Panel content should relate to the current selection or view.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-best-contextual`).

---

### Avoid replacing full pages

Route-sized content belongs in `<main>`, not a side sheet.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: sidesheet-best-not-full-page`).

---

## Anti-Patterns

### Navigation inside SideSheet

**Why:** App navigation belongs in **`Drawer`** or future **`NavigationRail`**. Side sheets are for contextual tools.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: sidesheet-anti-navigation`, `preview: false`).

---

### Huge workflows

**Why:** Multi-step onboarding or checkout blocks context and lacks modal guardrails. Use routes or **`Dialog`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: sidesheet-anti-huge-workflows`, `preview: false`).

---

### Unrelated content

**Why:** A global announcements feed in a filter sheet confuses purpose. One panel, one job.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: sidesheet-anti-unrelated`, `preview: false`).

---

### Replacing application structure

**Why:** **`SideSheet`** is not **`AppShell`**, **`Drawer`**, or a full layout. Do not host entire apps in a sheet.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: sidesheet-anti-replace-structure`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Landmark** | Root **`<aside>`** — complementary content when open |
| **Accessible name** | Set **`aria-label`** or **`aria-labelledby`** on the panel (or heading inside) |
| **Toggle control** | Trigger uses **`aria-expanded`** + **`aria-controls`** pointing to panel **`id`** |
| **Focus** | **No focus trap** — user can tab between main content and panel |
| **Keyboard** | No built-in Escape dismiss — provide a **Close** button or toggle |
| **Screen readers** | Panel is complementary to main content; label describes purpose ("Filters", "Details") |
| **Closed state** | **`hidden`** + **`aria-hidden="true"`** on closed anchor — removed from a11y tree |
| **Navigation** | Use **`<nav>`** inside only when content is primarily navigation links |

Provide an explicit **Close** control or toggle when the sheet must be dismissible for keyboard users.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Closed sheet** | Hidden `<aside>` anchor only — no portaled panel in SSR HTML |
| **`open={true}`** | Portal content mounts on the client when open |
| **Resumability** | Controlled **`open`** from parent signals resumes cleanly |
| **Static rendering** | Page and closed anchor render on server; overlay layer is client-driven |
| **OverlayContainer** | Required for layer registration when open |

Prefer **`open={false}`** on the server; open after hydration when needed.

---

## Flutter Equivalent

Flutter's `Scaffold` has no first-class **`SideSheet`**. Closest patterns:

| Flutter pattern | qwik-flutter-ui |
| --- | --- |
| Companion / end panel (custom) | **`SideSheet`** with **`open`** |
| **`Drawer`** / **`endDrawer`** | **`Drawer`** — modal navigation, not **`SideSheet`** |
| Modal bottom / side sheet with scrim | **`Dialog`** or **`ModalBottomSheet`** |
| Persistent split view | **`SideSheet`** with **`open={true}`** |

**Flutter-style companion panel (conceptual)**

```dart
// Custom overlay or Row layout — no standard SideSheet on Scaffold
EndDrawer(child: FilterPanel()); // modal drawer — use Drawer in qwik-flutter-ui
```

**qwik-flutter-ui**

```tsx
<OverlayContainer>
  <AppShell appBar={/* toggle in actions */}>
    {/* main list / canvas */}
  </AppShell>
  <SideSheet
    id="filters"
    open={panelOpen.value}
    width={320}
    position={SideSheetPosition.right}
    aria-label="Filters"
  >
    <Column gap={8}>
      <Text as="h2">Filters</Text>
      {/* controls */}
    </Column>
  </SideSheet>
</OverlayContainer>
```

Similarities: edge-anchored secondary UI, toggled visibility, companion to main content.

Differences: explicit **`SideSheetPosition`**, non-modal by design (no scrim), controlled **`open`** only, portaled above chrome via **`OverlayContainer`**.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Drawer](/docs/widgets/app-structure/drawer) | Modal navigation — not secondary panels |
| [AppShell](/docs/widgets/app-structure/app-shell) | Page shell; sheet typically siblings inside `OverlayContainer` |
| [Dialog](/docs/widgets/overlays/dialog) | Blocking modal — confirmations and dense forms |
| [Popover](/docs/widgets/overlays/popover) | Small anchored panel at a trigger |
| [AppBar](/docs/widgets/app-structure/app-bar) | Toggle actions in **`actions`** |
| [OverlayContainer](/docs/widgets/overlays/overlay-container) | Required overlay host |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/sidesheet/`
- **`category`** — groups examples (`basic`, `common`, `positioning`, `content`, `appshell`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to app-structure and overlay widgets
- **`flutterEquivalent`** — side panel / companion sheet

When adding examples, wrap with **`ThemeProvider`** + **`OverlayContainer`**, set **`aria-label`** on the panel, wire **`aria-controls`** on toggles, and import only from `qwik-flutter-ui`.
