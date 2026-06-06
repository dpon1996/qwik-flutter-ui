---
title: Tooltip
description: Hover and focus-triggered contextual hints for icon buttons, toolbar actions, and supplemental help text.
widget: Tooltip
category: overlays
flutterEquivalent: Tooltip
status: shipped
related:
  - Popover
  - Menu
  - Button
  - OverlayContainer
since: "0.0.1"
examples:
  - id: tooltip-basic
    file: examples/tooltip/basic.tsx
    category: basic
  - id: tooltip-icon-button-help
    file: examples/tooltip/icon-button-help.tsx
    category: common
  - id: tooltip-form-field-hint
    file: examples/tooltip/form-field-hint.tsx
    category: common
  - id: tooltip-toolbar-action
    file: examples/tooltip/toolbar-action.tsx
    category: common
  - id: tooltip-status-indicator
    file: examples/tooltip/status-indicator.tsx
    category: common
  - id: tooltip-hover-trigger
    file: examples/tooltip/hover-trigger.tsx
    category: trigger
  - id: tooltip-focus-trigger
    file: examples/tooltip/focus-trigger.tsx
    category: trigger
  - id: tooltip-touch-trigger
    file: examples/tooltip/touch-trigger.tsx
    category: trigger
  - id: tooltip-placement-top
    file: examples/tooltip/placement-top.tsx
    category: placement
  - id: tooltip-placement-bottom
    file: examples/tooltip/placement-bottom.tsx
    category: placement
  - id: tooltip-placement-start
    file: examples/tooltip/placement-start.tsx
    category: placement
  - id: tooltip-placement-end
    file: examples/tooltip/placement-end.tsx
    category: placement
  - id: tooltip-content-short-hint
    file: examples/tooltip/content-short-hint.tsx
    category: content
  - id: tooltip-content-action-explanation
    file: examples/tooltip/content-action-explanation.tsx
    category: content
  - id: tooltip-content-a11y-supplement
    file: examples/tooltip/content-a11y-supplement.tsx
    category: content
  - id: tooltip-vs-popover-tooltip
    file: examples/tooltip/vs-popover-tooltip.tsx
    category: comparison
  - id: tooltip-vs-popover-popover
    file: examples/tooltip/vs-popover-popover.tsx
    category: comparison
  - id: tooltip-vs-menu-tooltip
    file: examples/tooltip/vs-menu-tooltip.tsx
    category: comparison
  - id: tooltip-vs-menu-menu
    file: examples/tooltip/vs-menu-menu.tsx
    category: comparison
  - id: tooltip-composition-icon-button
    file: examples/tooltip/composition-icon-button.tsx
    category: composition
  - id: tooltip-composition-button
    file: examples/tooltip/composition-button.tsx
    category: composition
  - id: tooltip-composition-text
    file: examples/tooltip/composition-text.tsx
    category: composition
  - id: tooltip-composition-form-controls
    file: examples/tooltip/composition-form-controls.tsx
    category: composition
  - id: tooltip-best-concise
    file: examples/tooltip/best-concise.tsx
    category: best-practice
  - id: tooltip-best-not-essential-only
    file: examples/tooltip/best-not-essential-only.tsx
    category: best-practice
  - id: tooltip-best-clarification
    file: examples/tooltip/best-clarification.tsx
    category: best-practice
  - id: tooltip-anti-long-paragraphs
    file: examples/tooltip/anti-long-paragraphs.tsx
    category: anti-pattern
  - id: tooltip-anti-interactive-content
    file: examples/tooltip/anti-interactive-content.tsx
    category: anti-pattern
  - id: tooltip-anti-critical-info
    file: examples/tooltip/anti-critical-info.tsx
    category: anti-pattern
---

# Tooltip

## Overview

`Tooltip` shows a **small, non-modal hint** anchored to a trigger element on hover or keyboard focus. It maps to Flutter's [`Tooltip`](https://api.flutter.dev/flutter/material/Tooltip-class.html).

Tooltips provide **passive, supplemental information** — they do not accept input, trap focus, or block the page.

Wrap the trigger as a **child** of `Tooltip`. Place an **`OverlayContainer`** ancestor at the app root (inside **`ThemeProvider`**).

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Contextual help** | Short explanation tied to a specific control |
| **Icon explanations** | Clarify icon-only buttons with no visible label |
| **Supplemental information** | Extra detail that repeats or expands visible UI |
| **Hover and focus interactions** | Opens after a delay on pointer enter or focus in |

### When to use Tooltip

- Explain an icon-only toolbar or action button
- Clarify an abbreviated label (e.g. "APR")
- Describe what a status dot or badge means
- Add non-essential context next to a form field

Do **not** use tooltips for required instructions, confirmations, or interactive panels.

### Tooltip vs Popover vs Menu vs Dialog

| | `Tooltip` | `Popover` | `Menu` | `Dialog` |
| --- | --- | --- | --- | --- |
| **Purpose** | Passive hint | Contextual panel | Action list | Modal task |
| **Trigger** | Hover + focus (default) | Click (default) | Click | Programmatic `open` |
| **Interactive** | No (`pointer-events: none`) | Yes | Yes | Yes |
| **Modal** | No | No | No | Yes (default) |
| **Focus trap** | No | No | No | Yes |
| **Best for** | Icon labels, hints | Filters, pickers | Edit / Copy / Delete | Forms, confirms |

---

## Import

```tsx
import {
  Button,
  Column,
  Container,
  Menu,
  MenuItem,
  OverlayContainer,
  OverlayPlacement,
  OverlayTrigger,
  Popover,
  Row,
  Text,
  TextField,
  ThemeProvider,
  Tooltip,
} from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working tooltip with a button trigger.

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
      <Tooltip content="Helpful hint" placement={OverlayPlacement.top}>
        <Button type="button">Hover or focus me</Button>
      </Tooltip>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-basic`).

---

## Common Usage

### Icon Button Help

Clarify icon-only controls with an accessible name on the trigger plus tooltip text.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  OverlayPlacement,
  Row,
  ThemeProvider,
  Tooltip,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Row gap={8}>
        <Tooltip content="Add to favorites" placement={OverlayPlacement.top}>
          <Button type="button" aria-label="Add to favorites">
            ★
          </Button>
        </Tooltip>
        <Tooltip content="Share link" placement={OverlayPlacement.top}>
          <Button type="button" aria-label="Share link">
            ↗
          </Button>
        </Tooltip>
      </Row>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-icon-button-help`).

---

### Form Field Hint

Pair a field with a help trigger — keep primary guidance in `helperText` when possible.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  OverlayPlacement,
  Row,
  TextField,
  ThemeProvider,
  Tooltip,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Row gap={8}>
        <TextField
          name="taxId"
          decoration={{
            label: "Tax ID",
            helperText: "Required for business accounts",
          }}
        />
        <Tooltip
          content="9-digit employer identification number"
          placement={OverlayPlacement.end}
        >
          <Button type="button" aria-label="Tax ID help">
            ?
          </Button>
        </Tooltip>
      </Row>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-form-field-hint`).

---

### Toolbar Action

Describe toolbar actions that use compact icons.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  OverlayPlacement,
  Row,
  ThemeProvider,
  Tooltip,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Row gap={4}>
        <Tooltip content="Bold" placement={OverlayPlacement.bottom}>
          <Button type="button" aria-label="Bold">
            B
          </Button>
        </Tooltip>
        <Tooltip content="Italic" placement={OverlayPlacement.bottom}>
          <Button type="button" aria-label="Italic">
            I
          </Button>
        </Tooltip>
        <Tooltip content="Underline" placement={OverlayPlacement.bottom}>
          <Button type="button" aria-label="Underline">
            U
          </Button>
        </Tooltip>
      </Row>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-toolbar-action`).

---

### Status Indicator

Explain a visual status marker.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Container,
  OverlayContainer,
  OverlayPlacement,
  Row,
  Text,
  ThemeProvider,
  Tooltip,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Row gap={8}>
        <Text>Server status</Text>
        <Tooltip content="All systems operational" placement={OverlayPlacement.top}>
          <Container
            width={12}
            height={12}
            style={{ background: "#4caf50", borderRadius: "50%" }}
            tabIndex={0}
            aria-label="Server status"
          />
        </Tooltip>
      </Row>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-status-indicator`).

---

## Trigger Behavior

| Prop | Default | Behavior |
| --- | --- | --- |
| **`trigger`** | *(omitted)* | **Hover and focus** both enabled |
| **`delayDuration`** | `700` (ms) | Delay before showing on hover or focus |
| **`open`** | — | Controlled visibility |
| **`defaultOpen`** | `false` | Uncontrolled initial state |
| **`onOpenChange$`** | — | Fires when open state changes |

v1 supports **hover** and **focus** triggers only — no touch long-press or follow-cursor.

### Hover Trigger

Pointer enter starts the show timer; pointer leave hides immediately.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  OverlayPlacement,
  OverlayTrigger,
  ThemeProvider,
  Tooltip,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Tooltip
        content="Shown on hover"
        placement={OverlayPlacement.top}
        trigger={OverlayTrigger.hover}
      >
        <Button type="button">Hover me</Button>
      </Tooltip>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-hover-trigger`).

---

### Keyboard Focus Trigger

Tab to the trigger to show the tooltip — essential for keyboard and screen-reader users.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  OverlayContainer,
  OverlayPlacement,
  OverlayTrigger,
  ThemeProvider,
  Tooltip,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Tooltip
        content="Shown on focus"
        placement={OverlayPlacement.top}
        trigger={OverlayTrigger.focus}
      >
        <Button type="button">Tab to me</Button>
      </Tooltip>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-focus-trigger`).

---

### Touch Trigger

Touch devices have **no hover**. With default triggers (hover + focus), tapping a **focusable** trigger moves focus and opens the tooltip after **`delayDuration`**.

**Recommendations**

- Use **focusable** triggers (`<button>`, `<a>`, `tabIndex={0}`)
- Provide a visible **`aria-label`** on icon-only triggers — do not rely on tooltip text alone
- **Long-press** tooltips are **not supported in v1**

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
      <Tooltip content="Tap then wait briefly" placement={OverlayPlacement.top}>
        <Button type="button" aria-label="More information">
          i
        </Button>
      </Tooltip>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-touch-trigger`).

---

## Placement

Pass **`placement`** with **`OverlayPlacement`**. The tooltip anchors to the trigger with an 8px gap. Default is **`top`**.

| Placement | Position relative to trigger |
| --- | --- |
| **`top`** | Above, horizontally centered |
| **`bottom`** | Below, horizontally centered |
| **`start`** | To the inline-start side, vertically centered |
| **`end`** | To the inline-end side, vertically centered |

Position updates on scroll and resize while open.

### Top

**Source**

```tsx
<Tooltip content="Above the trigger" placement={OverlayPlacement.top}>
  <Button type="button">Top</Button>
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-placement-top`).

---

### Bottom

**Source**

```tsx
<Tooltip content="Below the trigger" placement={OverlayPlacement.bottom}>
  <Button type="button">Bottom</Button>
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-placement-bottom`).

---

### Start

**Source**

```tsx
<Tooltip content="Inline-start side" placement={OverlayPlacement.start}>
  <Button type="button">Start</Button>
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-placement-start`).

---

### End

**Source**

```tsx
<Tooltip content="Inline-end side" placement={OverlayPlacement.end}>
  <Button type="button">End</Button>
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-placement-end`).

---

## Content

Pass **`content`** as a string or JSX. Keep copy **short** — tooltips max out around 16rem wide.

### Short Hint

**Source**

```tsx
<Tooltip content="Copy to clipboard">
  <Button type="button" aria-label="Copy">
    ⧉
  </Button>
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-content-short-hint`).

---

### Action Explanation

Describe what happens when the user activates the control.

**Source**

```tsx
<Tooltip content="Download a PDF export of this report">
  <Button type="button">Export</Button>
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-content-action-explanation`).

---

### Accessibility Label Supplement

Tooltip text **supplements** — never replaces — an accessible name on the trigger.

**Source**

```tsx
<Tooltip content="Opens account settings in a new panel">
  <Button type="button" aria-label="Settings">
    ⚙
  </Button>
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-content-a11y-supplement`).

---

### Recommended content patterns

- **One short phrase** — not a sentence paragraph
- **Present tense** — "Copy link", not "You can copy the link"
- **No interactive elements** inside tooltip content — use **`Popover`** instead
- **Duplicate visible labels sparingly** — add detail the UI does not already show

---

## Tooltip vs Popover

| Factor | **Tooltip** | **Popover** |
| --- | --- | --- |
| **Information** | Passive hint | Rich contextual panel |
| **Interactive** | No | Yes — buttons, inputs |
| **Trigger** | Hover / focus | Click (default) |
| **Dismiss** | Pointer/focus leave | Outside click, Escape |
| **User expectation** | Glanceable tip | Lightweight panel |

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
      <Tooltip content="Keyboard shortcut: Ctrl+S" placement={OverlayPlacement.top}>
        <Button type="button">Save</Button>
      </Tooltip>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-vs-popover-tooltip`).

---

### Popover

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
          Filter
        </Button>
        <Container padding={12}>
          <Text>Interactive filter controls go here.</Text>
        </Container>
      </Popover>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-vs-popover-popover`).

---

### Guidance summary

- **Tooltip** — name an icon, show a shortcut, clarify a badge
- **Popover** — small panel the user reads or interacts with intentionally
- If the user must **click inside** the overlay, use **`Popover`**

---

## Tooltip vs Menu

| Factor | **Tooltip** | **Menu** |
| --- | --- | --- |
| **Purpose** | Explain | Select an action |
| **Interaction** | Hover / focus glance | Click to open, pick item |
| **Content** | Plain text hint | `MenuItem` list |
| **Actions** | None | Edit, Copy, Delete, etc. |

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
      <Tooltip content="More options" placement={OverlayPlacement.top}>
        <Button type="button" aria-label="More options">
          ⋮
        </Button>
      </Tooltip>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-vs-menu-tooltip`).

---

### Menu

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Menu,
  MenuItem,
  OverlayContainer,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Menu>
        <Button q:slot="trigger" type="button" aria-label="More options">
          ⋮
        </Button>
        <MenuItem onSelect$={$(() => {})}>Edit</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Copy</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Delete</MenuItem>
      </Menu>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-vs-menu-menu`).

---

### Guidance summary

- **Tooltip** — tells the user what a control **is**
- **Menu** — lets the user **do** something
- A "more" button often needs a **`Menu`**, not only a tooltip saying "More options"

---

## Composition

The trigger is the **child** of `Tooltip` (default slot). The trigger must be **focusable** for keyboard access.

### IconButton

Use a compact **`Button`** with **`aria-label`** until a dedicated **`IconButton`** widget ships.

**Source**

```tsx
<Tooltip content="Delete item" placement={OverlayPlacement.top}>
  <Button type="button" aria-label="Delete item">
    🗑
  </Button>
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-composition-icon-button`).

---

### Button

Standard labeled buttons can still benefit from extra context (e.g. shortcuts).

**Source**

```tsx
<Tooltip content="Save changes (Ctrl+S)" placement={OverlayPlacement.bottom}>
  <Button type="button">Save</Button>
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-composition-button`).

---

### Text

Wrap abbreviated inline text with a focusable element.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  OverlayContainer,
  OverlayPlacement,
  Text,
  ThemeProvider,
  Tooltip,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Tooltip content="Annual percentage rate" placement={OverlayPlacement.top}>
        <Text as="span" tabIndex={0}>
          APR
        </Text>
      </Tooltip>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-composition-text`).

---

### Form Controls

Place the tooltip on a **separate help trigger** beside the field — do not wrap the input itself (focus conflicts).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  OverlayContainer,
  OverlayPlacement,
  Row,
  TextField,
  ThemeProvider,
  Tooltip,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Column gap={8}>
        <Row gap={8}>
          <TextField
            name="password"
            type="password"
            decoration={{ label: "Password" }}
          />
          <Tooltip
            content="At least 12 characters with a number and symbol"
            placement={OverlayPlacement.end}
          >
            <Button type="button" aria-label="Password requirements">
              ?
            </Button>
          </Tooltip>
        </Row>
      </Column>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-composition-form-controls`).

---

## Best Practices

### Keep content concise

A few words beat a full sentence.

**Source**

```tsx
// Good
<Tooltip content="Undo">
  <Button type="button" aria-label="Undo">↶</Button>
</Tooltip>

// Avoid
<Tooltip content="Click this button if you would like to undo the most recent change you made">
  <Button type="button" aria-label="Undo">↶</Button>
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-best-concise`).

---

### Avoid essential information only in tooltips

Required instructions must appear in visible UI — labels, helper text, or inline copy.

**Source**

```tsx
// Good — helper text is always visible
<TextField
  decoration={{
    label: "API key",
    helperText: "Find this in Settings → Developer",
  }}
/>

// Avoid — required steps only in tooltip
<Tooltip content="Find this in Settings → Developer">
  <TextField decoration={{ label: "API key" }} />
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-best-not-essential-only`).

---

### Use for clarification, not instruction

Tooltips **clarify** existing UI; they do not teach multi-step workflows.

**Source**

```tsx
// Good — clarifies an icon
<Tooltip content="Sync now">
  <Button type="button" aria-label="Sync">↻</Button>
</Tooltip>

// Avoid — multi-step instructions
<Tooltip content="Step 1: Open settings. Step 2: Click Sync. Step 3: Wait.">
  <Button type="button">Sync</Button>
</Tooltip>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: tooltip-best-clarification`).

---

## Anti-Patterns

### Long paragraphs

**Why:** Tooltips are glance surfaces (~16rem max width). Move detail to helper text, a popover, or docs.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: tooltip-anti-long-paragraphs`, `preview: false`).

---

### Interactive content

**Why:** Tooltip panels use `pointer-events: none` — links and buttons inside cannot be clicked. Use **`Popover`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: tooltip-anti-interactive-content`, `preview: false`).

---

### Critical information hidden in tooltips

**Why:** Hover-only users on touch devices may never see the content. Errors, legal text, and required steps need persistent visible UI or **`Dialog`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: tooltip-anti-critical-info`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Keyboard access** | Tab to a focusable trigger — tooltip opens on focus (default triggers) |
| **Screen readers** | Trigger uses **`aria-describedby`** pointing to tooltip `id` when open |
| **Tooltip role** | Panel has **`role="tooltip"`** |
| **Accessible name** | Icon-only triggers need **`aria-label`** — tooltip does not replace it |
| **Focus behavior** | No focus trap — focus stays on trigger; tooltip is not tabbable |
| **Hover alternatives** | Default triggers include **focus** — do not use hover-only for essential info |
| **Touch** | Focus-after-tap shows tooltip on focusable triggers; long-press not supported |

Ensure tooltip content **repeats or expands** information already available to assistive tech via the trigger's accessible name.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | Trigger HTML renders on server; tooltip panel is **not** in SSR output when closed |
| **Closed tooltip** | No portal content until client interaction opens it |
| **Resumability** | Hover/focus listeners attach in client effects; `onOpenChange$` hydrates as QRL |
| **OverlayContainer** | Required ancestor for overlay layer registration |
| **Client-side triggers** | Show/hide timing runs in the browser — `delayDuration` starts after pointer/focus events |

Tooltips are **interaction-driven** — expect no visible hint in static HTML until the user hovers or focuses the trigger on the client.

---

## Flutter Equivalent

| Topic | Flutter `Tooltip` | qwik-flutter-ui `Tooltip` |
| --- | --- | --- |
| **API** | Wrap child widget | Child trigger in default slot |
| **Message** | `message:` string | `content:` string or JSX |
| **Trigger** | Long-press (mobile), hover (desktop) | Hover + focus (default); no long-press in v1 |
| **Wait** | `waitDuration` | `delayDuration` (default 700ms) |
| **Placement** | `preferBelow`, `verticalOffset` | `OverlayPlacement` enum |
| **Modal** | No | No — non-modal `OverlayPortal` |

**Flutter**

```dart
Tooltip(
  message: 'Add to favorites',
  child: IconButton(
    icon: Icon(Icons.star),
    onPressed: () {},
  ),
)
```

**qwik-flutter-ui**

```tsx
<OverlayContainer>
  <Tooltip content="Add to favorites" placement={OverlayPlacement.top}>
    <Button type="button" aria-label="Add to favorites">
      ★
    </Button>
  </Tooltip>
</OverlayContainer>
```

Similarities: anchored hint, non-modal, short message, delay before show.

Differences: explicit `OverlayContainer`, focus trigger (not long-press), `OverlayPlacement` sides, string/JSX `content`.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Popover](/docs/widgets/overlays/popover) | Interactive anchored panel — click trigger |
| [Menu](/docs/widgets/overlays/menu) | Action selection at trigger |
| [Button](/docs/widgets/forms/button) | Common tooltip trigger — especially icon-only |
| [OverlayContainer](/docs/widgets/overlays/overlay-container) | Required overlay host at app root |
| [Dialog](/docs/widgets/overlays/dialog) | Modal tasks — not passive hints |

Icon-only triggers today use **`Button`** with **`aria-label`**. A dedicated **`IconButton`** widget is planned for a future release.

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/tooltip/`
- **`category`** — groups examples (`basic`, `common`, `trigger`, `placement`, `content`, `comparison`, `composition`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to overlay and form widgets
- **`flutterEquivalent`** — `Tooltip`

When adding examples, wrap with **`ThemeProvider`** + **`OverlayContainer`**, use **focusable** triggers with **`aria-label`** for icon-only controls, and import only from `qwik-flutter-ui`.
