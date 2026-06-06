---
title: Menu
description: Anchored action menu with MenuItem list semantics, keyboard navigation, and click-to-select command surfaces.
widget: Menu
category: overlays
flutterEquivalent: PopupMenuButton / MenuAnchor
status: shipped
related:
  - Popover
  - Tooltip
  - Dropdown
  - AppBar
  - Button
  - OverlayContainer
since: "0.0.1"
examples:
  - id: menu-basic
    file: examples/menu/basic.tsx
    category: basic
  - id: menu-overflow
    file: examples/menu/overflow.tsx
    category: common
  - id: menu-user-actions
    file: examples/menu/user-actions.tsx
    category: common
  - id: menu-context
    file: examples/menu/context.tsx
    category: common
  - id: menu-settings
    file: examples/menu/settings.tsx
    category: common
  - id: menu-button-trigger
    file: examples/menu/button-trigger.tsx
    category: open-close
  - id: menu-icon-trigger
    file: examples/menu/icon-trigger.tsx
    category: open-close
  - id: menu-programmatic-open
    file: examples/menu/programmatic-open.tsx
    category: open-close
  - id: menu-outside-click-dismiss
    file: examples/menu/outside-click-dismiss.tsx
    category: open-close
  - id: menu-escape-dismiss
    file: examples/menu/escape-dismiss.tsx
    category: open-close
  - id: menu-items-simple
    file: examples/menu/items-simple.tsx
    category: items
  - id: menu-items-disabled
    file: examples/menu/items-disabled.tsx
    category: items
  - id: menu-items-destructive
    file: examples/menu/items-destructive.tsx
    category: items
  - id: menu-items-grouped
    file: examples/menu/items-grouped.tsx
    category: items
  - id: menu-keyboard-arrows
    file: examples/menu/keyboard-arrows.tsx
    category: keyboard
  - id: menu-keyboard-enter
    file: examples/menu/keyboard-enter.tsx
    category: keyboard
  - id: menu-keyboard-escape
    file: examples/menu/keyboard-escape.tsx
    category: keyboard
  - id: menu-keyboard-typeahead
    file: examples/menu/keyboard-typeahead.tsx
    category: keyboard
  - id: menu-context-right-click
    file: examples/menu/context-right-click.tsx
    category: context
  - id: menu-context-file-actions
    file: examples/menu/context-file-actions.tsx
    category: context
  - id: menu-context-item-actions
    file: examples/menu/context-item-actions.tsx
    category: context
  - id: menu-vs-dropdown-menu
    file: examples/menu/vs-dropdown-menu.tsx
    category: comparison
  - id: menu-vs-dropdown-dropdown
    file: examples/menu/vs-dropdown-dropdown.tsx
    category: comparison
  - id: menu-vs-popover-menu
    file: examples/menu/vs-popover-menu.tsx
    category: comparison
  - id: menu-vs-popover-popover
    file: examples/menu/vs-popover-popover.tsx
    category: comparison
  - id: menu-composition-icon-button
    file: examples/menu/composition-icon-button.tsx
    category: composition
  - id: menu-composition-appbar
    file: examples/menu/composition-appbar.tsx
    category: composition
  - id: menu-composition-list-items
    file: examples/menu/composition-list-items.tsx
    category: composition
  - id: menu-composition-cards
    file: examples/menu/composition-cards.tsx
    category: composition
  - id: menu-best-concise-labels
    file: examples/menu/best-concise-labels.tsx
    category: best-practice
  - id: menu-best-logical-grouping
    file: examples/menu/best-logical-grouping.tsx
    category: best-practice
  - id: menu-best-destructive
    file: examples/menu/best-destructive.tsx
    category: best-practice
  - id: menu-best-predictable-ordering
    file: examples/menu/best-predictable-ordering.tsx
    category: best-practice
  - id: menu-anti-huge
    file: examples/menu/anti-huge.tsx
    category: anti-pattern
  - id: menu-anti-nested
    file: examples/menu/anti-nested.tsx
    category: anti-pattern
  - id: menu-anti-unrelated
    file: examples/menu/anti-unrelated.tsx
    category: anti-pattern
  - id: menu-anti-workflows
    file: examples/menu/anti-workflows.tsx
    category: anti-pattern
---

# Menu

## Overview

`Menu` is an **anchored action list** — click a trigger, pick a command, menu closes. It maps to Flutter's [`PopupMenuButton`](https://api.flutter.dev/flutter/material/PopupMenuButton-class.html) and [`MenuAnchor`](https://api.flutter.dev/flutter/material/MenuAnchor-class.html) patterns.

Built on [`Popover`](/docs/widgets/overlays/popover), `Menu` adds **`role="menu"`** semantics, roving focus, and arrow-key navigation. Use **`MenuItem`** for actions and **`MenuDivider`** to group related items.

Place an **`OverlayContainer`** ancestor at the app root (inside **`ThemeProvider`**).

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Action selection** | User picks one command; `onSelect$` fires, menu closes |
| **Contextual actions** | Edit, copy, delete — tied to a row, file, or toolbar button |
| **Command surfaces** | Compact overflow of operations without leaving the page |
| **Compact action presentation** | Collapsed until opened — ideal for 3–8 actions |

### When to use Menu

- Overflow (⋮) menus on list rows or cards
- User account actions (profile, settings, sign out)
- Toolbar command pickers with uniform action rows
- Contextual file or item operations

Use **`Dropdown`** for form field single-choice selection, **`Popover`** for rich custom panels, and **`Dialog`** for blocking workflows.

### Menu vs Popover vs Dialog vs Dropdown

| | `Menu` | `Popover` | `Dialog` | `Dropdown` |
| --- | --- | --- | --- | --- |
| **Purpose** | Action commands | Custom panel | Modal task | Form selection |
| **Structure** | `MenuItem` list | Free-form slot | Title / content / actions | Native `<select>` |
| **Selection model** | Fire-and-forget action | Interactive panel | Confirm / submit | Persist chosen value |
| **Keyboard** | Arrow keys + Enter | Tab to controls | Focus trap | Native picker |
| **Best for** | Edit / Copy / Delete | Filters, cards | Forms, confirms | Country, category |

---

## Import

```tsx
import {
  AppBar,
  Button,
  Card,
  Column,
  Dropdown,
  OverlayContainer,
  OverlayPlacement,
  Popover,
  Row,
  Text,
  ThemeProvider,
  Menu,
  MenuDivider,
  MenuItem,
} from "qwik-flutter-ui";

import type { DropdownOption } from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working menu with trigger slot and items.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  OverlayContainer,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Menu>
        <Button q:slot="trigger" type="button">
          Open menu
        </Button>
        <MenuItem onSelect$={$(() => {})}>Edit</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Copy</MenuItem>
        <MenuDivider />
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Delete</MenuItem>
      </Menu>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-basic`).

---

## Common Usage

### Overflow Menu

Standard ⋮ trigger for secondary actions on a list row.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Menu,
  MenuItem,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Row gap={8}>
        <Text>Quarterly report.pdf</Text>
        <Menu placement={OverlayPlacement.bottom}>
          <Button q:slot="trigger" type="button" aria-label="Document actions">
            ⋮
          </Button>
          <MenuItem onSelect$={$(() => {})}>Rename</MenuItem>
          <MenuItem onSelect$={$(() => {})}>Download</MenuItem>
          <MenuItem onSelect$={$(() => {})}>Delete</MenuItem>
        </Menu>
      </Row>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-overflow`).

---

### User Actions Menu

Account commands from an avatar or name trigger.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  OverlayContainer,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Menu>
        <Button q:slot="trigger" type="button">
          Jane Doe
        </Button>
        <MenuItem onSelect$={$(() => {})}>View profile</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Account settings</MenuItem>
        <MenuDivider />
        <MenuItem onSelect$={$(() => {})}>Sign out</MenuItem>
      </Menu>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-user-actions`).

---

### Context Menu

Item-scoped actions anchored to the element they affect. Prefer a visible overflow button; v1 menus anchor to the **trigger**, not the cursor.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Menu,
  MenuItem,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Row gap={8}>
        <Text>Photo album</Text>
        <Menu placement={OverlayPlacement.end}>
          <Button q:slot="trigger" type="button" aria-label="Album actions">
            ⋮
          </Button>
          <MenuItem onSelect$={$(() => {})}>Share album</MenuItem>
          <MenuItem onSelect$={$(() => {})}>Add photos</MenuItem>
          <MenuItem onSelect$={$(() => {})}>Remove album</MenuItem>
        </Menu>
      </Row>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-context`).

---

### Settings Menu

Navigate to settings sections or toggle features.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  OverlayContainer,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Menu>
        <Button q:slot="trigger" type="button" aria-label="Settings">
          ⚙
        </Button>
        <MenuItem onSelect$={$(() => {})}>Notifications</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Privacy</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Appearance</MenuItem>
        <MenuDivider />
        <MenuItem onSelect$={$(() => {})}>Help center</MenuItem>
      </Menu>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-settings`).

---

## Opening and Closing

`Menu` inherits open/close behavior from the underlying **`Popover`**.

| Prop / behavior | Default | Description |
| --- | --- | --- |
| **`open`** | — | Controlled visibility |
| **`defaultOpen`** | `false` | Uncontrolled initial state |
| **`onOpenChange$`** | — | `(open, reason?)` with optional dismiss reason |
| **Click trigger** | Toggle on trigger click | Via underlying `Popover` |
| **Outside click** | Closes menu | `outsidePointer` reason |
| **`dismissOnEscape`** | `true` | Escape closes topmost overlay layer |
| **`placement`** | `top` | Pass `OverlayPlacement` to anchor the panel |

### Button Trigger

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
        <Button q:slot="trigger" type="button">
          Actions
        </Button>
        <MenuItem onSelect$={$(() => {})}>Edit</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Copy</MenuItem>
      </Menu>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-button-trigger`).

---

### Icon Trigger

Use a compact button with **`aria-label`** — no separate **`IconButton`** widget in v1.

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
        <MenuItem onSelect$={$(() => {})}>Delete</MenuItem>
      </Menu>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-icon-trigger`).

---

### Programmatic Open

Control **`open`** from application state. There is no separate **`PopupMenuButton`** widget — wire an external button to set **`open`** to `true`.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Menu,
  MenuItem,
  OverlayContainer,
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
          Open menu from code
        </Button>

        <Menu
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
        >
          <Button q:slot="trigger" type="button">
            Anchor
          </Button>
          <MenuItem onSelect$={$(() => {})}>Action</MenuItem>
        </Menu>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-programmatic-open`).

---

### Outside Click Dismiss

Clicking outside the trigger and menu panel closes the menu automatically.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Menu,
  MenuItem,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Menu
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
        >
          <Button q:slot="trigger" type="button">
            Anchor
          </Button>
          <MenuItem onSelect$={$(() => {})}>Edit</MenuItem>
        </Menu>
        <Text>Click outside the menu to dismiss.</Text>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-outside-click-dismiss`).

---

### Escape Dismiss

Press **Escape** to close when `dismissOnEscape={true}` (default).

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  Menu,
  MenuItem,
  OverlayContainer,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Menu open={open.value} onOpenChange$={$((next) => {
          open.value = next;
        })}>
          <Button q:slot="trigger" type="button">
            Anchor
          </Button>
          <MenuItem onSelect$={$(() => {})}>Edit</MenuItem>
        </Menu>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-escape-dismiss`).

---

## Menu Items

### Simple Items

Plain text labels with **`onSelect$`** handlers.

**Source**

```tsx
<Menu>
  <Button q:slot="trigger" type="button">Open</Button>
  <MenuItem onSelect$={onEdit$}>Edit</MenuItem>
  <MenuItem onSelect$={onCopy$}>Copy</MenuItem>
</Menu>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-items-simple`).

---

### Disabled Items

Set **`disabled={true}`** — item is skipped in keyboard navigation and ignores clicks.

**Source**

```tsx
<Menu>
  <Button q:slot="trigger" type="button">Open</Button>
  <MenuItem onSelect$={onEdit$}>Edit</MenuItem>
  <MenuItem disabled>Archive (unavailable)</MenuItem>
  <MenuItem onSelect$={onDelete$}>Delete</MenuItem>
</Menu>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-items-disabled`).

---

### Destructive Items

No built-in destructive variant — use a clear label, place **Delete** last, and separate with a **`MenuDivider`**.

**Source**

```tsx
<Menu>
  <Button q:slot="trigger" type="button">Open</Button>
  <MenuItem onSelect$={onEdit$}>Edit</MenuItem>
  <MenuItem onSelect$={onDuplicate$}>Duplicate</MenuItem>
  <MenuDivider />
  <MenuItem onSelect$={onDelete$}>Delete</MenuItem>
</Menu>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-items-destructive`).

---

### Grouped Items

Use **`MenuDivider`** between logical groups.

**Source**

```tsx
<Menu>
  <Button q:slot="trigger" type="button">Open</Button>
  <MenuItem onSelect$={onView$}>View</MenuItem>
  <MenuItem onSelect$={onEdit$}>Edit</MenuItem>
  <MenuDivider />
  <MenuItem onSelect$={onShare$}>Share</MenuItem>
  <MenuItem onSelect$={onExport$}>Export</MenuItem>
  <MenuDivider />
  <MenuItem onSelect$={onDelete$}>Delete</MenuItem>
</Menu>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-items-grouped`).

---

## Keyboard Navigation

When the menu opens, focus moves to the first enabled item. Roving **`tabIndex`** highlights the active item.

| Key | Behavior |
| --- | --- |
| **ArrowDown** | Next enabled item (wraps) |
| **ArrowUp** | Previous enabled item (wraps) |
| **Home** | First enabled item |
| **End** | Last enabled item |
| **Enter** / **Space** | Activate focused item |
| **Escape** | Close menu (via Popover) |
| **Tab** | Moves focus outside menu (non-modal) |

### Arrow Navigation

**Source**

```tsx
// Open menu, then use ArrowDown / ArrowUp to move between items.
<Menu>
  <Button q:slot="trigger" type="button">Open</Button>
  <MenuItem onSelect$={$(() => {})}>First</MenuItem>
  <MenuItem onSelect$={$(() => {})}>Second</MenuItem>
  <MenuItem onSelect$={$(() => {})}>Third</MenuItem>
</Menu>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-keyboard-arrows`).

---

### Enter Selection

**Enter** or **Space** on the focused item fires **`onSelect$`** and closes the menu.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-keyboard-enter`).

---

### Escape Close

**Escape** dismisses the menu and returns focus to the prior element.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-keyboard-escape`).

---

### Typeahead Search

**Not supported in v1.** Letter-key typeahead to jump to items is planned for a future release.

**Preview**

> **Preview placeholder** — code-only note (`id: menu-keyboard-typeahead`, `preview: false`).

---

## Context Menus

v1 menus **anchor to a trigger element** — there is no built-in cursor-positioned right-click menu. Recommended patterns:

- **Primary:** visible overflow (⋮) button per row or card
- **Optional:** `contextmenu` event opens the same controlled menu anchored to the item

### Right Click Menu

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Menu,
  MenuItem,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  const onContextMenu$ = $((event: MouseEvent) => {
    event.preventDefault();
    open.value = true;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Text onContextMenu$={onContextMenu$}>
          Right-click this text (opens anchored menu)
        </Text>

        <Menu
          open={open.value}
          onOpenChange$={$((next) => {
            open.value = next;
          })}
          trigger={<span aria-hidden="true" />}
        >
          <MenuItem onSelect$={$(() => {})}>Copy</MenuItem>
          <MenuItem onSelect$={$(() => {})}>Select all</MenuItem>
        </Menu>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

Prefer an visible overflow trigger for discoverability. Cursor-positioned context menus require custom positioning outside v1 `Menu`.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-context-right-click`).

---

### File Actions

**Source**

```tsx
<Row gap={8}>
  <Text>README.md</Text>
  <Menu placement={OverlayPlacement.bottom}>
    <Button q:slot="trigger" type="button" aria-label="File actions">
      ⋮
    </Button>
    <MenuItem onSelect$={onOpen$}>Open</MenuItem>
    <MenuItem onSelect$={onRename$}>Rename</MenuItem>
    <MenuDivider />
    <MenuItem onSelect$={onDelete$}>Delete</MenuItem>
  </Menu>
</Row>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-context-file-actions`).

---

### Item Actions

Attach one overflow menu per list item — not one global menu for all rows.

**Source**

```tsx
<Column gap={8}>
  {["Inbox", "Drafts", "Sent"].map((label) => (
    <Row key={label} gap={8}>
      <Text>{label}</Text>
      <Menu>
        <Button q:slot="trigger" type="button" aria-label={`${label} actions`}>
          ⋮
        </Button>
        <MenuItem onSelect$={$(() => {})}>Mark read</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Archive</MenuItem>
      </Menu>
    </Row>
  ))}
</Column>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-context-item-actions`).

---

## Menu vs Dropdown

| Factor | **Menu** | **Dropdown** |
| --- | --- | --- |
| **Purpose** | Execute actions | Select a value |
| **State** | Fire-and-forget | Controlled / uncontrolled value |
| **Presentation** | Overlay action list | Native `<select>` |
| **Form submit** | No | Yes — `name` + string value |
| **User expectation** | "Do something" | "Pick one option" |

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
        <Button q:slot="trigger" type="button">
          Actions
        </Button>
        <MenuItem onSelect$={$(() => {})}>Edit</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Delete</MenuItem>
      </Menu>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-vs-dropdown-menu`).

---

### Dropdown

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const COUNTRIES: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      name="country"
      decoration={{ label: "Country" }}
      options={COUNTRIES}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-vs-dropdown-dropdown`).

---

### Guidance summary

- **Menu** — commands that change app state (delete, share, navigate)
- **Dropdown** — form fields where the submitted value is a string token
- Never use a menu when the user is **choosing a persistent field value**

---

## Menu vs Popover

| Factor | **Menu** | **Popover** |
| --- | --- | --- |
| **Orientation** | Action-oriented | Content-oriented |
| **Structure** | `MenuItem` rows | Free-form slot |
| **Keyboard** | Arrow keys + Enter | Tab between controls |
| **Complexity** | Uniform action list | Forms, toggles, cards |

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
        <Button q:slot="trigger" type="button">More</Button>
        <MenuItem onSelect$={$(() => {})}>Edit</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Copy</MenuItem>
        <MenuItem onSelect$={$(() => {})}>Delete</MenuItem>
      </Menu>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-vs-popover-menu`).

---

### Popover

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  OverlayContainer,
  Popover,
  Switch,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Popover>
        <Button q:slot="trigger" type="button">Filter</Button>
        <Column gap={8}>
          <Switch label="In stock only" />
          <Switch label="On sale" />
        </Column>
      </Popover>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-vs-popover-popover`).

---

### Guidance summary

- **Menu** — homogeneous list of verb actions
- **Popover** — mixed content (toggles, text, buttons, short forms)
- If every row is the same shape and fires a command, use **`Menu`**

---

## Composition

### IconButton

Use **`Button`** with **`aria-label`** as the trigger until **`IconButton`** ships.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-composition-icon-button`).

---

### AppBar

Place overflow menus in **`AppBar`** **`actions`**.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <AppBar
        title={<Text as="h1">Inbox</Text>}
        actions={[
          <Menu key="overflow">
            <Button q:slot="trigger" type="button" aria-label="More">
              ⋮
            </Button>
            <MenuItem onSelect$={$(() => {})}>Mark all read</MenuItem>
            <MenuItem onSelect$={$(() => {})}>Settings</MenuItem>
          </Menu>,
        ]}
      />
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-composition-appbar`).

---

### ListView Items

One menu per row — anchor the trigger to that row's action area.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-composition-list-items`).

---

### Cards

Card-level overflow for card-scoped commands.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Card,
  Menu,
  MenuItem,
  OverlayContainer,
  Row,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <OverlayContainer>
      <Card>
        <Row gap={8}>
          <Text as="strong">Project Alpha</Text>
          <Menu>
            <Button q:slot="trigger" type="button" aria-label="Project actions">
              ⋮
            </Button>
            <MenuItem onSelect$={$(() => {})}>Edit</MenuItem>
            <MenuItem onSelect$={$(() => {})}>Archive</MenuItem>
          </Menu>
        </Row>
      </Card>
    </OverlayContainer>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-composition-cards`).

---

## Best Practices

### Concise labels

Use verbs — **Edit**, **Copy**, **Delete** — not full sentences.

**Source**

```tsx
// Good
<MenuItem onSelect$={onDelete$}>Delete</MenuItem>

// Avoid
<MenuItem onSelect$={onDelete$}>Delete this item permanently</MenuItem>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-best-concise-labels`).

---

### Logical grouping

Separate unrelated groups with **`MenuDivider`**.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-best-logical-grouping`).

---

### Clear destructive actions

Place destructive commands last, after a divider, with an unambiguous label.

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-best-destructive`).

---

### Predictable ordering

Follow platform conventions: primary actions first, destructive last, settings/help near the bottom.

**Source**

```tsx
<MenuItem onSelect$={onEdit$}>Edit</MenuItem>
<MenuItem onSelect$={onShare$}>Share</MenuItem>
<MenuDivider />
<MenuItem onSelect$={onArchive$}>Archive</MenuItem>
<MenuDivider />
<MenuItem onSelect$={onDelete$}>Delete</MenuItem>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: menu-best-predictable-ordering`).

---

## Anti-Patterns

### Huge menus

**Why:** Long action lists are hard to scan. Split into sub-pages, dialogs, or searchable views.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: menu-anti-huge`, `preview: false`).

---

### Deeply nested menus

**Why:** Nested submenus are **not supported in v1**. Use a dialog, route, or **`Popover`** with sections.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: menu-anti-nested`, `preview: false`).

---

### Unrelated actions

**Why:** Mixing account settings and document edits in one menu confuses scope. Anchor menus to one context.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: menu-anti-unrelated`, `preview: false`).

---

### Using menus for workflows

**Why:** Multi-step tasks (wizards, long forms) belong in **`Dialog`** or dedicated routes — not a dismiss-on-outside-click menu.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: menu-anti-workflows`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Trigger** | **`aria-haspopup="menu"`** on the trigger wrapper |
| **Menu list** | **`role="menu"`** on the list container |
| **Items** | **`role="menuitem"`** on each **`MenuItem`** |
| **Disabled items** | **`aria-disabled="true"`** — skipped in arrow navigation |
| **Dividers** | **`role="separator"`** on **`MenuDivider`** |
| **Keyboard** | Arrow keys, Home, End, Enter, Space, Escape |
| **Focus** | First item focused on open; focus restored on close |
| **Screen readers** | Item label text is the accessible name; trigger needs **`aria-label`** when icon-only |

Menus are **non-modal** — Tab can move focus outside the menu while it is open.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | Trigger HTML renders on server; menu panel absent when closed |
| **Closed menu** | No portal content in SSR output |
| **Resumability** | `onSelect$` and `onOpenChange$` hydrate as QRLs |
| **Interaction** | Click, keyboard, and positioning run client-side only |
| **OverlayContainer** | Required ancestor for overlay layer registration |

Menus are **interaction-driven** — expect no visible panel in static HTML until opened on the client.

---

## Flutter Equivalent

| Topic | Flutter | qwik-flutter-ui `Menu` |
| --- | --- | --- |
| **Widget** | `PopupMenuButton`, `MenuAnchor` | `Menu` + `MenuItem` + `MenuDivider` |
| **Items** | `PopupMenuItem` | `MenuItem` with slotted label |
| **Trigger** | Built-in button or custom | `q:slot="trigger"` or `trigger` prop |
| **Selection** | `onSelected` callback | `onSelect$` on each item |
| **Dividers** | `PopupMenuDivider` | `MenuDivider` |
| **Submenus** | Supported in Material | **Not in v1** |

**Flutter**

```dart
PopupMenuButton<String>(
  onSelected: (value) { /* handle */ },
  itemBuilder: (context) => [
    PopupMenuItem(value: 'edit', child: Text('Edit')),
    PopupMenuItem(value: 'delete', child: Text('Delete')),
  ],
);
```

**qwik-flutter-ui**

```tsx
<OverlayContainer>
  <Menu>
    <Button q:slot="trigger" type="button">Actions</Button>
    <MenuItem onSelect$={onEdit$}>Edit</MenuItem>
    <MenuItem onSelect$={onDelete$}>Delete</MenuItem>
  </Menu>
</OverlayContainer>
```

Similarities: anchored overlay, action list, dismiss on selection or outside click, keyboard-friendly list.

Differences: declarative JSX composition, per-item `onSelect$` QRLs, no built-in `PopupMenuButton` wrapper, no submenus in v1.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Popover](/docs/widgets/overlays/popover) | Underlying anchored panel — use for rich custom content |
| [Tooltip](/docs/widgets/overlays/tooltip) | Passive hints — not action lists |
| [Dropdown](/docs/widgets/forms/dropdown) | Form single-choice selection — not commands |
| [AppBar](/docs/widgets/app-structure/app-bar) | Toolbar overflow menus in `actions` |
| [Button](/docs/widgets/forms/button) | Standard menu trigger |
| [OverlayContainer](/docs/widgets/overlays/overlay-container) | Required overlay host at app root |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/menu/`
- **`category`** — groups examples (`basic`, `common`, `open-close`, `items`, `keyboard`, `context`, `comparison`, `composition`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links completing the Overlays documentation track
- **`flutterEquivalent`** — `PopupMenuButton / MenuAnchor`

When adding examples, wrap with **`ThemeProvider`** + **`OverlayContainer`**, use **`q:slot="trigger"`** for anchors, define handlers with **`$()`**, and import only from `qwik-flutter-ui`.
