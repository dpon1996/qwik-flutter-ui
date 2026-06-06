---
title: Popover
description: Non-modal anchored panel for contextual actions, quick settings, and lightweight interactive content at a trigger element.
widget: Popover
category: overlays
flutterEquivalent: MenuAnchor / showMenu
status: shipped
related:
  - Tooltip
  - Menu
  - Dialog
  - Button
  - OverlayContainer
since: "0.0.1"
examples:
  - id: popover-basic
    file: examples/popover/basic.tsx
    category: basic
  - id: popover-user-profile-card
    file: examples/popover/user-profile-card.tsx
    category: common
  - id: popover-context-actions
    file: examples/popover/context-actions.tsx
    category: common
  - id: popover-quick-settings
    file: examples/popover/quick-settings.tsx
    category: common
  - id: popover-help-panel
    file: examples/popover/help-panel.tsx
    category: common
  - id: popover-click-trigger
    file: examples/popover/click-trigger.tsx
    category: open-close
  - id: popover-hover-trigger
    file: examples/popover/hover-trigger.tsx
    category: open-close
  - id: popover-programmatic-open
    file: examples/popover/programmatic-open.tsx
    category: open-close
  - id: popover-outside-click-dismiss
    file: examples/popover/outside-click-dismiss.tsx
    category: open-close
  - id: popover-placement-top
    file: examples/popover/placement-top.tsx
    category: placement
  - id: popover-placement-bottom
    file: examples/popover/placement-bottom.tsx
    category: placement
  - id: popover-placement-start
    file: examples/popover/placement-start.tsx
    category: placement
  - id: popover-placement-end
    file: examples/popover/placement-end.tsx
    category: placement
  - id: popover-placement-auto
    file: examples/popover/placement-auto.tsx
    category: placement
  - id: popover-content-informational
    file: examples/popover/content-informational.tsx
    category: content
  - id: popover-content-interactive
    file: examples/popover/content-interactive.tsx
    category: content
  - id: popover-content-form
    file: examples/popover/content-form.tsx
    category: content
  - id: popover-content-action-lists
    file: examples/popover/content-action-lists.tsx
    category: content
  - id: popover-vs-tooltip-tooltip
    file: examples/popover/vs-tooltip-tooltip.tsx
    category: comparison
  - id: popover-vs-tooltip-popover
    file: examples/popover/vs-tooltip-popover.tsx
    category: comparison
  - id: popover-vs-dialog-popover
    file: examples/popover/vs-dialog-popover.tsx
    category: comparison
  - id: popover-vs-dialog-dialog
    file: examples/popover/vs-dialog-dialog.tsx
    category: comparison
  - id: popover-composition-buttons
    file: examples/popover/composition-buttons.tsx
    category: composition
  - id: popover-composition-forms
    file: examples/popover/composition-forms.tsx
    category: composition
  - id: popover-composition-lists
    file: examples/popover/composition-lists.tsx
    category: composition
  - id: popover-composition-user-cards
    file: examples/popover/composition-user-cards.tsx
    category: composition
  - id: popover-best-lightweight
    file: examples/popover/best-lightweight.tsx
    category: best-practice
  - id: popover-best-anchor
    file: examples/popover/best-anchor.tsx
    category: best-practice
  - id: popover-best-contextual
    file: examples/popover/best-contextual.tsx
    category: best-practice
  - id: popover-anti-large-forms
    file: examples/popover/anti-large-forms.tsx
    category: anti-pattern
  - id: popover-anti-multi-step
    file: examples/popover/anti-multi-step.tsx
    category: anti-pattern
  - id: popover-anti-excessive-content
    file: examples/popover/anti-excessive-content.tsx
    category: anti-pattern
  - id: popover-anti-replacing-dialogs
    file: examples/popover/anti-replacing-dialogs.tsx
    category: anti-pattern
---

# Popover

## Overview

`Popover` is a **non-modal panel anchored to a trigger** — click to open, interact inside the panel, dismiss by clicking outside or pressing Escape. It maps to Flutter anchored-overlay patterns such as [`MenuAnchor`](https://api.flutter.dev/flutter/material/MenuAnchor-class.html) and [`showMenu`](https://api.flutter.dev/flutter/material/showMenu.html).

Unlike **`Dialog`**, a popover does **not** block the page with a backdrop or trap focus. Unlike **`Tooltip`**, it accepts **interactive content** — buttons, toggles, and short forms.

Use **`q:slot="trigger"`** for the anchor element and the **default slot** for panel content. Place an **`OverlayContainer`** ancestor at the app root (inside **`ThemeProvider`**).

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Anchored overlays** | Panel positions relative to the trigger with a fixed gap |
| **Contextual actions** | Edit, share, or filter controls near the element they affect |
| **Supplemental information** | Profile cards, help text, or metadata on demand |
| **Lightweight interactions** | Short tasks without leaving the current view |

### When to use Popover

- User profile preview from an avatar button
- Context menu–like actions that need custom layout (not a plain list)
- Quick settings toggles anchored to a toolbar icon
- Small help or info panels tied to a specific control

Use **`Menu`** for standard action lists, **`Dialog`** for blocking workflows, and **`Tooltip`** for passive hints.

### Popover vs Tooltip vs Menu vs Dialog

| | `Popover` | `Tooltip` | `Menu` | `Dialog` |
| --- | --- | --- | --- | --- |
| **Modal** | No | No | No | Yes (default) |
| **Interactive** | Yes | No | Yes (`MenuItem`) | Yes |
| **Trigger** | Click (default) | Hover + focus | Click | `open` prop |
| **Focus trap** | No | No | Partial (menu list) | Yes |
| **Backdrop** | No | No | No | Yes |
| **Best for** | Custom panels | Icon hints | Edit / Copy / Delete | Forms, confirms |

---

## Import

```tsx
import {
  Button,
  Card,
  Column,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Form,
  ListView,
  OverlayContainer,
  OverlayDismissReason,
  OverlayPlacement,
  OverlayTrigger,
  Popover,
  Row,
  Switch,
  Text,
  TextField,
  TextFormField,
  ThemeProvider,
  Tooltip,
} from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working popover with click trigger.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  Container,
  OverlayContainer,
  OverlayPlacement,
  Popover,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Popover placement={OverlayPlacement.bottom}>
        <Button q:slot="trigger" type="button">
          Open popover
        </Button>
        <Container padding={12}>
          <Text>Click outside or press Escape to dismiss.</Text>
        </Container>
      </Popover>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-basic`).

---

## Common Usage

### User Profile Card

Preview account details from an avatar or name button.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  Card,
  Column,
  OverlayContainer,
  OverlayPlacement,
  Popover,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Popover placement={OverlayPlacement.bottom}>
        <Button q:slot="trigger" type="button">
          Jane Doe
        </Button>
        <Card>
          <Column gap={8}>
            <Text as="strong">Jane Doe</Text>
            <Text>jane@example.com</Text>
            <Button type="button">View profile</Button>
          </Column>
        </Card>
      </Popover>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-user-profile-card`).

---

### Context Actions

Custom action layout when **`Menu`** structure is too rigid.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  OverlayContainer,
  OverlayPlacement,
  Popover,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Popover placement={OverlayPlacement.end}>
        <Button q:slot="trigger" type="button" aria-label="Document actions">
          ⋮
        </Button>
        <Column gap={8}>
          <Button type="button" onClick$={$(() => {})}>Rename</Button>
          <Button type="button" onClick$={$(() => {})}>Share</Button>
          <Button type="button" onClick$={$(() => {})}>Archive</Button>
        </Column>
      </Popover>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-context-actions`).

---

### Quick Settings

Short toggles anchored to a settings icon.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Column,
  OverlayContainer,
  OverlayPlacement,
  Popover,
  Switch,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const dark = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Popover placement={OverlayPlacement.bottom}>
          <Button q:slot="trigger" type="button" aria-label="Quick settings">
            ⚙
          </Button>
          <Column gap={12}>
            <Text as="strong">Display</Text>
            <Switch
              label="Dark mode"
              checked={dark.value}
              onChange$={$((on) => {
                dark.value = on;
              })}
            />
          </Column>
        </Popover>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-quick-settings`).

---

### Help Panel

Contextual help tied to a field or feature.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  OverlayContainer,
  OverlayPlacement,
  Popover,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Popover placement={OverlayPlacement.end}>
        <Button q:slot="trigger" type="button" aria-label="Help">
          ?
        </Button>
        <Column gap={8}>
          <Text as="strong">Export format</Text>
          <Text>
            CSV includes all visible columns. JSON preserves nested fields.
          </Text>
        </Column>
      </Popover>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-help-panel`).

---

## Opening and Closing

| Prop / behavior | Default | Description |
| --- | --- | --- |
| **`trigger`** | `OverlayTrigger.click` | Click toggles open/close |
| **`open`** | — | Controlled visibility |
| **`defaultOpen`** | `false` | Uncontrolled initial state |
| **`onOpenChange$`** | — | `(open, reason?)` — optional **`OverlayDismissReason`** |
| **`dismissOnEscape`** | `true` | Escape closes when this layer is topmost |

Dismiss reasons: **`escape`**, **`outsidePointer`**, **`programmatic`**.

### Click Trigger

Default behavior — click trigger to toggle.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  Container,
  OverlayContainer,
  OverlayPlacement,
  Popover,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Popover placement={OverlayPlacement.bottom}>
        <Button q:slot="trigger" type="button">
          Click popover
        </Button>
        <Container padding={12}>
          <Text>Uncontrolled click trigger.</Text>
        </Container>
      </Popover>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-click-trigger`).

---

### Hover Trigger

**Not supported in v1.** Popover supports **click** and **manual** (controlled) triggers only. Use **`Tooltip`** for hover hints.

**Preview**

> **Preview placeholder** — code-only note (`id: popover-hover-trigger`, `preview: false`).

---

### Programmatic Open

Control visibility with **`open`** + **`onOpenChange$`**. Set **`trigger={OverlayTrigger.manual}`** to disable click-toggle on the trigger.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Container,
  OverlayContainer,
  OverlayPlacement,
  OverlayTrigger,
  Popover,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Open from code
        </Button>

        <Popover
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
          trigger={OverlayTrigger.manual}
          placement={OverlayPlacement.bottom}
        >
          <Button q:slot="trigger" type="button">
            Anchor
          </Button>
          <Container padding={12}>
            <Text>Controlled popover.</Text>
          </Container>
        </Popover>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-programmatic-open`).

---

### Outside Click Dismiss

Clicking outside the trigger and panel closes the popover. Disable Escape with **`dismissOnEscape={false}`** when needed.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Container,
  OverlayContainer,
  OverlayPlacement,
  Popover,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Popover
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
          placement={OverlayPlacement.bottom}
        >
          <Button q:slot="trigger" type="button">
            Anchor
          </Button>
          <Container padding={12}>
            <Text>Click outside to dismiss.</Text>
          </Container>
        </Popover>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-outside-click-dismiss`).

---

## Placement

Pass **`placement`** with **`OverlayPlacement`**. The panel anchors to the trigger with an **8px gap**. Default is **`top`**. Position recalculates on scroll and resize while open.

| Placement | Position relative to trigger |
| --- | --- |
| **`top`** | Above, horizontally centered |
| **`bottom`** | Below, horizontally centered |
| **`start`** | Inline-start side, vertically centered |
| **`end`** | Inline-end side, vertically centered |

### Top

**Source**

```tsx
<Popover placement={OverlayPlacement.top}>
  <Button q:slot="trigger" type="button">Top</Button>
  <Text>Panel above trigger</Text>
</Popover>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-placement-top`).

---

### Bottom

**Source**

```tsx
<Popover placement={OverlayPlacement.bottom}>
  <Button q:slot="trigger" type="button">Bottom</Button>
  <Text>Panel below trigger</Text>
</Popover>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-placement-bottom`).

---

### Start

**Source**

```tsx
<Popover placement={OverlayPlacement.start}>
  <Button q:slot="trigger" type="button">Start</Button>
  <Text>Panel at inline-start</Text>
</Popover>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-placement-start`).

---

### End

**Source**

```tsx
<Popover placement={OverlayPlacement.end}>
  <Button q:slot="trigger" type="button">End</Button>
  <Text>Panel at inline-end</Text>
</Popover>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-placement-end`).

---

### Auto Placement

**Not supported in v1.** There is no flip or collision engine — choose **`placement`** manually based on available viewport space.

**Guidance**

- Triggers near the **top** of the screen → prefer **`bottom`**
- Triggers near the **bottom** → prefer **`top`**
- Toolbar overflow buttons → often **`bottom`** or **`end`**
- Side panels → **`start`** or **`end`**

**Preview**

> **Preview placeholder** — code-only note (`id: popover-placement-auto`, `preview: false`).

---

## Content

Panel max width is ~**20rem**. Keep content compact — scroll long lists inside the panel if needed.

### Informational Content

Read-only text and metadata.

**Source**

```tsx
<Popover placement={OverlayPlacement.bottom}>
  <Button q:slot="trigger" type="button">Details</Button>
  <Column gap={4}>
    <Text as="strong">Last synced</Text>
    <Text>Today at 2:45 PM</Text>
  </Column>
</Popover>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-content-informational`).

---

### Interactive Content

Buttons, links, and toggles the user activates intentionally.

**Source**

```tsx
<Popover placement={OverlayPlacement.bottom}>
  <Button q:slot="trigger" type="button">Actions</Button>
  <Column gap={8}>
    <Button type="button">Download</Button>
    <Button type="button">Print</Button>
  </Column>
</Popover>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-content-interactive`).

---

### Form Content

One or two fields — not a full workflow.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Form,
  Popover,
  TextFormField,
} from "qwik-flutter-ui";

export default component$(() => (
  <Popover placement={OverlayPlacement.bottom}>
    <Button q:slot="trigger" type="button">Add label</Button>
    <Form onSubmit$={$(() => {})}>
      <Column gap={12}>
        <TextFormField
          name="label"
          decoration={{ label: "Label name" }}
          required
        />
        <Button type="submit">Add</Button>
      </Column>
    </Form>
  </Popover>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-content-form`).

---

### Action Lists

Vertical stacks of actions — use **`Menu`** when items are uniform; use popover for mixed content.

**Source**

```tsx
<Popover placement={OverlayPlacement.bottom}>
  <Button q:slot="trigger" type="button">Manage</Button>
  <Column gap={4}>
    <Button type="button">Edit</Button>
    <Button type="button">Duplicate</Button>
    <Button type="button">Delete</Button>
  </Column>
</Popover>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-content-action-lists`).

---

## Popover vs Tooltip

| Factor | **Tooltip** | **Popover** |
| --- | --- | --- |
| **Information** | Passive hint | Rich panel |
| **Interactive** | No | Yes |
| **Trigger** | Hover / focus | Click |
| **Complexity** | One line of text | Buttons, forms, cards |

### Tooltip

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  OverlayPlacement,
  ThemeProvider,
  Tooltip,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Tooltip content="Keyboard shortcut: Ctrl+K" placement={OverlayPlacement.top}>
        <Button type="button">Search</Button>
      </Tooltip>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-vs-tooltip-tooltip`).

---

### Popover

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  OverlayContainer,
  OverlayPlacement,
  Popover,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Popover placement={OverlayPlacement.bottom}>
        <Button q:slot="trigger" type="button">
          Search
        </Button>
        <Column gap={8}>
          <TextField decoration={{ label: "Query" }} />
          <Button type="button">Search</Button>
        </Column>
      </Popover>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-vs-tooltip-popover`).

---

### Guidance summary

- **Tooltip** — label an icon or show a shortcut
- **Popover** — user opens a panel to read or interact
- If content needs **clicks or inputs**, use **`Popover`** — not **`Tooltip`**

---

## Popover vs Dialog

| Factor | **Popover** | **Dialog** |
| --- | --- | --- |
| **Modality** | Non-modal | Modal (default) |
| **Backdrop** | None | Dimmed backdrop |
| **Focus trap** | No | Yes |
| **Scope** | Contextual to trigger | Page-level task |
| **Workflow** | Quick, lightweight | Forms, multi-section |

### Popover

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  OverlayContainer,
  OverlayPlacement,
  Popover,
  Switch,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Popover placement={OverlayPlacement.bottom}>
        <Button q:slot="trigger" type="button">Filter</Button>
        <Column gap={8}>
          <Switch label="In stock only" />
        </Column>
      </Popover>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-vs-dialog-popover`).

---

### Dialog

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OverlayContainer,
  TextField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={$(() => {
          open.value = true;
        })}>
          Edit profile
        </Button>

        <Dialog open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogContent>
            <TextField decoration={{ label: "Display name" }} />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick$={$(() => {
              open.value = false;
            })}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-vs-dialog-dialog`).

---

### Guidance summary

- **Popover** — quick filter, profile peek, contextual controls
- **Dialog** — edit forms, confirmations, anything requiring focused attention
- Do not host **multi-step** or **critical** workflows in a popover

---

## Composition

### Buttons

Stack actions in **`Column gap`**.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-composition-buttons`).

---

### Forms

Short **`Form`** + **`TextFormField`** — submit closes via your handler.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-composition-forms`).

---

### Lists

Use **`ListView`** or **`Column`** for scrollable option lists inside the panel.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-composition-lists`).

---

### User Cards

Combine **`Card`**, **`Column`**, and **`Text`** for profile previews.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-composition-user-cards`).

---

## Best Practices

### Keep content lightweight

A few controls or a short paragraph — not a full page.

**Source**

```tsx
// Good — compact filter
<Popover placement={OverlayPlacement.bottom}>
  <Button q:slot="trigger" type="button">Filter</Button>
  <Switch label="Show archived" />
</Popover>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-best-lightweight`).

---

### Anchor to relevant elements

Open from the control the panel describes — avatar for profile, row action for row menu.

**Source**

```tsx
<Row gap={8}>
  <Text>Document.pdf</Text>
  <Popover placement={OverlayPlacement.end}>
    <Button q:slot="trigger" type="button" aria-label="Document actions">
      ⋮
    </Button>
    {/* actions for this document */}
  </Popover>
</Row>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-best-anchor`).

---

### Use for contextual interactions

The user stays on the current page — popover supplements, not replaces, the view.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: popover-best-contextual`).

---

## Anti-Patterns

### Large forms

**Why:** Panel max width is ~20rem; long forms are cramped and hard to use. Use **`Dialog`** or a dedicated route.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: popover-anti-large-forms`, `preview: false`).

---

### Multi-step workflows

**Why:** Popovers dismiss on outside click — easy to lose progress. Use a wizard route or modal.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: popover-anti-multi-step`, `preview: false`).

---

### Excessive content

**Why:** Long scrollable panels feel broken when anchored. Move detail to a side sheet or full page.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: popover-anti-excessive-content`, `preview: false`).

---

### Replacing dialogs

**Why:** Confirmations and blocking tasks need modal focus trap and backdrop. Use **`Dialog`** or **`AlertDialog`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: popover-anti-replacing-dialogs`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Trigger state** | **`aria-expanded`** reflects open/closed; **`aria-controls`** points to panel `id` when open |
| **Focus on open** | First focusable element inside the panel receives focus |
| **Focus on close** | Focus returns to the element that was focused before open |
| **Focus trap** | **No** — popover is non-modal; focus can move outside the panel |
| **Keyboard** | **Escape** closes when `dismissOnEscape={true}` (default) and layer is topmost |
| **Screen readers** | Provide a clear trigger label; panel content should be self-describing |
| **Tooltip overlap** | Do not put essential instructions only inside a popover — use visible labels too |

For uniform action lists with menu semantics, prefer **`Menu`** over a custom popover.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | Trigger HTML renders on server; panel is **not** in SSR output when closed |
| **Closed popover** | No portal content until opened on the client |
| **Resumability** | Click handlers and `onOpenChange$` hydrate as QRLs |
| **Positioning** | Anchor math runs in the browser after open — `getBoundingClientRect` |
| **OverlayContainer** | Required ancestor for overlay layer registration |

Popovers are **interaction-driven** — expect no visible panel in static HTML until the user opens them on the client.

---

## Flutter Equivalent

| Topic | Flutter patterns | qwik-flutter-ui `Popover` |
| --- | --- | --- |
| **Anchor** | `MenuAnchor`, `CompositedTransformFollower` | Trigger slot + fixed positioning |
| **Show API** | `showMenu()`, imperative overlay | Declarative JSX + click toggle |
| **Modal** | Usually non-modal | Non-modal (`modal={false}`) |
| **Content** | Any `Widget` | Default slot — `Column`, `Form`, etc. |
| **Placement** | `Alignment`, anchor rules | `OverlayPlacement` enum |
| **Dismiss** | Tap outside | Outside pointer + Escape |

**Flutter (`showMenu`)**

```dart
showMenu(
  context: context,
  position: RelativeRect.fromLTRB(100, 200, 100, 0),
  items: [
    PopupMenuItem(child: Text('Edit'), onTap: () {}),
    PopupMenuItem(child: Text('Delete'), onTap: () {}),
  ],
);
```

**qwik-flutter-ui**

```tsx
<OverlayContainer>
  <Popover placement={OverlayPlacement.bottom}>
    <Button q:slot="trigger" type="button">Actions</Button>
    <Column gap={8}>
      <Button type="button">Edit</Button>
      <Button type="button">Delete</Button>
    </Column>
  </Popover>
</OverlayContainer>
```

Similarities: anchored to trigger, non-modal, dismiss on outside interaction, custom panel content.

Differences: declarative slot API, manual placement (no auto-flip in v1), no built-in menu item roles — use **`Menu`** for list semantics.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Tooltip](/docs/widgets/overlays/tooltip) | Passive hover/focus hints — not interactive |
| [Menu](/docs/widgets/overlays/menu) | Structured action list with menu semantics |
| [Dialog](/docs/widgets/overlays/dialog) | Modal tasks — focus trap and backdrop |
| [Button](/docs/widgets/forms/button) | Common popover trigger |
| [OverlayContainer](/docs/widgets/overlays/overlay-container) | Required overlay host at app root |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/popover/`
- **`category`** — groups examples (`basic`, `common`, `open-close`, `placement`, `content`, `comparison`, `composition`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to overlay and form widgets
- **`flutterEquivalent`** — `MenuAnchor / showMenu`

When adding examples, wrap with **`ThemeProvider`** + **`OverlayContainer`**, use **`q:slot="trigger"`** for the anchor, and import only from `qwik-flutter-ui`.
