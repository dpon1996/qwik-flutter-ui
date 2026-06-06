---
title: Button
description: A labeled pressable control with Material-style variants, theme integration, and Qwik event handlers.
widget: Button
category: forms
flutterEquivalent: FilledButton / OutlinedButton / TextButton
status: shipped
related:
  - Text
  - Container
  - Dialog
  - AppBar
since: "0.0.1"
examples:
  - id: button-basic
    file: examples/button/basic.tsx
    category: basic
  - id: button-primary
    file: examples/button/primary.tsx
    category: common
  - id: button-secondary
    file: examples/button/secondary.tsx
    category: common
  - id: button-form-submit
    file: examples/button/form-submit.tsx
    category: common
  - id: button-dialog-actions
    file: examples/button/dialog-actions.tsx
    category: common
  - id: button-filled
    file: examples/button/filled.tsx
    category: variation
  - id: button-outlined
    file: examples/button/outlined.tsx
    category: variation
  - id: button-text
    file: examples/button/text.tsx
    category: variation
  - id: button-disabled
    file: examples/button/disabled.tsx
    category: variation
  - id: button-full-width
    file: examples/button/full-width.tsx
    category: variation
  - id: button-on-click
    file: examples/button/on-click.tsx
    category: common
  - id: button-async
    file: examples/button/async.tsx
    category: common
  - id: button-navigation
    file: examples/button/navigation.tsx
    category: common
  - id: button-in-row
    file: examples/button/in-row.tsx
    category: composition
  - id: button-in-column
    file: examples/button/in-column.tsx
    category: composition
  - id: button-in-app-bar
    file: examples/button/in-app-bar.tsx
    category: composition
  - id: button-in-dialog
    file: examples/button/in-dialog.tsx
    category: composition
  - id: button-anti-vague-label
    file: examples/button/anti-vague-label.tsx
    category: anti-pattern
  - id: button-anti-many-primary
    file: examples/button/anti-many-primary.tsx
    category: anti-pattern
  - id: button-anti-icon-only
    file: examples/button/anti-icon-only.tsx
    category: anti-pattern
---

# Button

## Overview

`Button` is a labeled pressable control for user actions — submit a form, confirm a dialog, navigate, or trigger application logic. It maps to Flutter's [`FilledButton`](https://api.flutter.dev/flutter/material/FilledButton-class.html), [`OutlinedButton`](https://api.flutter.dev/flutter/material/OutlinedButton-class.html), and [`TextButton`](https://api.flutter.dev/flutter/material/TextButton-class.html), unified behind a single component with a `variant` prop.

`Button` is the first **interactive** widget in the library. Label text is passed as **JSX children** (`<Button>Save</Button>`). Handlers use Qwik's **`onClick$`** (not Flutter's `onPressed`).

### When to use Button

- Confirm or cancel a decision
- Submit or reset a form
- Open overlays (dialogs, sheets, menus)
- Navigate when styled as a button but rendered as a link (`href`)

### Primary user interactions

| Interaction | API |
| --- | --- |
| Click / tap | `onClick$` |
| Keyboard activate | Native `<button>` or focusable `<a>` (Space / Enter) |
| Form submit | `type="submit"` inside `Form` |
| Disabled state | `disabled={true}` — suppresses activation and `onClick$` |
| Link navigation | `href` (renders `<a>`) |

Default element is `<button type="button">`, which prevents accidental form submission when a button sits inside a form.

---

## Import

```tsx
import { Button } from "qwik-flutter-ui";
```

Import variants and layout widgets when examples use them:

```tsx
import {
  Button,
  ButtonVariant,
  Row,
  ThemeProvider,
} from "qwik-flutter-ui";
```

For async handlers, import Qwik primitives:

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
```

---

## Basic Example

The smallest working `Button` — default filled variant with a click handler.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const onPress$ = $(() => {
    console.log("Pressed");
  });

  return (
    <ThemeProvider theme={{}}>
      <Button type="button" onClick$={onPress$}>
        Press me
      </Button>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-basic`).

---

## Common Usage

### Primary Action

Use `ButtonVariant.filled` (the default) for the main action on a surface — one per view when possible.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const onSave$ = $(() => {
    /* persist changes */
  });

  return (
    <ThemeProvider theme={{}}>
      <Button type="button" onClick$={onSave$}>
        Save changes
      </Button>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-primary`).

---

### Secondary Action

Use `ButtonVariant.outlined` or `ButtonVariant.text` for lower-emphasis actions paired with a primary button.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, ButtonVariant, Row, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const onSave$ = $(() => {});
  const onCancel$ = $(() => {});

  return (
    <ThemeProvider theme={{}}>
      <Row gap={8}>
        <Button type="button" onClick$={onSave$}>
          Save
        </Button>
        <Button
          type="button"
          variant={ButtonVariant.outlined}
          onClick$={onCancel$}
        >
          Cancel
        </Button>
      </Row>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-secondary`).

---

### Form Submission

Set `type="submit"` on the primary button inside `Form`. Use `type="button"` on non-submit actions so they do not trigger validation.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Form,
  Row,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $(() => {
    /* Form collects values via onSubmit$ */
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <TextFormField name="email" label="Email" />
        <Row gap={8}>
          <Button type="submit">Sign up</Button>
          <Button type="button" variant={ButtonVariant.text}>
            Skip
          </Button>
        </Row>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-form-submit`).

---

### Dialog Actions

Place buttons in `DialogActions` (or `AlertDialogActions`). Put dismissive actions first, destructive or confirming actions last — matching Material reading order.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OverlayContainer,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(false);

  const onOpen$ = $(() => {
    open.value = true;
  });

  const onClose$ = $(() => {
    open.value = false;
  });

  const onOpenChange$ = $((next: boolean) => {
    open.value = next;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Button type="button" onClick$={onOpen$}>
          Delete item
        </Button>

        <Dialog open={open.value} onOpenChange$={onOpenChange$}>
          <DialogTitle>Delete this item?</DialogTitle>
          <DialogContent>
            <Text>This action cannot be undone.</Text>
          </DialogContent>
          <DialogActions>
            <Button type="button" variant={ButtonVariant.text} onClick$={onClose$}>
              Cancel
            </Button>
            <Button type="button" onClick$={onClose$}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-dialog-actions`).

---

## Variations

Each example below demonstrates **one concept** only.

### Filled Button

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Button, ButtonVariant, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Button type="button" variant={ButtonVariant.filled}>
      Filled
    </Button>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-filled`).

---

### Outlined Button

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Button, ButtonVariant, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Button type="button" variant={ButtonVariant.outlined}>
      Outlined
    </Button>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-outlined`).

---

### Text Button

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Button, ButtonVariant, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Button type="button" variant={ButtonVariant.text}>
      Text
    </Button>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-text`).

---

### Disabled Button

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Button, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Button type="button" disabled>
      Unavailable
    </Button>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-disabled`).

---

### Full Width Button

Stretch a button to its parent's width with the `style` prop. Common in mobile forms and stacked action areas.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Button, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Button type="button" style={{ width: "100%" }}>
      Continue
    </Button>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-full-width`).

---

## Event Handling

Qwik uses **`onClick$`** for press handlers. Define handlers with **`$()`** so they serialize correctly for resumability.

### onClick$

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const onDelete$ = $(() => {
    /* handle delete */
  });

  return (
    <ThemeProvider theme={{}}>
      <Button type="button" onClick$={onDelete$}>
        Delete
      </Button>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-on-click`).

**Pattern:** Always pass a QRL (`$()`). Inline arrow functions without `$()` break resumability. `onClick$` is omitted when `disabled` is true.

---

### Async Action

Disable the button or swap label text while async work runs. Avoid duplicate submissions.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { Button, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const saving = useSignal(false);

  const onSave$ = $(async () => {
    saving.value = true;
    try {
      await fetch("/api/save", { method: "POST" });
    } finally {
      saving.value = false;
    }
  });

  return (
    <ThemeProvider theme={{}}>
      <Button type="button" onClick$={onSave$} disabled={saving.value}>
        {saving.value ? "Saving…" : "Save"}
      </Button>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-async`).

**Pattern:** Use `disabled` during in-flight requests. For long operations, update the label so screen readers announce progress.

---

### Navigation Trigger

When `href` is set, `Button` renders an `<a>` element. Use for link-styled navigation; keep `onClick$` for client-side routing if needed.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Button, ButtonVariant, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Button
      variant={ButtonVariant.text}
      href="/docs/getting-started"
    >
      Read the docs
    </Button>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-navigation`).

**Pattern:** Add `target="_blank"` and `rel="noopener noreferrer"` for external links. Disabled link buttons use `aria-disabled` and remove `href`.

---

## Layout Composition

### Button in Row

Align actions horizontally — primary first or dismissive-first depending on platform convention.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  ButtonVariant,
  Row,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Row gap={8}>
      <Button type="button" onClick$={$(() => {})}>
        Confirm
      </Button>
      <Button type="button" variant={ButtonVariant.text} onClick$={$(() => {})}>
        Cancel
      </Button>
    </Row>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-in-row`).

**Pattern:** `Row gap` replaces margin hacks between adjacent buttons.

---

### Button in Column

Stack full-width actions vertically on narrow layouts.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Column, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={12}>
      <Button type="button" style={{ width: "100%" }} onClick$={$(() => {})}>
        Continue
      </Button>
      <Button type="button" style={{ width: "100%" }} onClick$={$(() => {})}>
        Sign in with email
      </Button>
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-in-column`).

---

### Button in AppBar

Pass icon or text buttons through the `actions` slot. Prefer `ButtonVariant.text` or `aria-label` for icon-only toolbar actions.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { AppBar, Button, ButtonVariant, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <AppBar
      title={<Text as="h1">Settings</Text>}
      actions={[
        <Button
          key="save"
          type="button"
          variant={ButtonVariant.text}
          onClick$={$(() => {})}
        >
          Save
        </Button>,
      ]}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-in-app-bar`).

**Pattern:** Limit toolbar actions (AppBar warns in dev beyond five). Use concise labels or `aria-label` for icons.

---

### Button in Dialog

See [Dialog Actions](#dialog-actions). `DialogActions` lays out slotted buttons in a trailing row.

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
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const open = useSignal(true);

  const onClose$ = $(() => {
    open.value = false;
  });

  return (
    <ThemeProvider theme={{}}>
      <OverlayContainer>
        <Dialog open={open.value}>
          <DialogTitle>Rename file</DialogTitle>
          <DialogContent>
            <Text>Enter a new name for report.pdf.</Text>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick$={onClose$}>
              Rename
            </Button>
          </DialogActions>
        </Dialog>
      </OverlayContainer>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: button-in-dialog`).

---

## Best Practices

### Clear action labels

Use verbs that describe the outcome: **Save changes**, **Delete account**, **Send invite** — not **OK**, **Click here**, or **Submit** when the action is specific.

```tsx
<Button type="button" onClick$={onDeleteAccount$}>
  Delete account
</Button>
```

### One primary action per surface

Reserve `ButtonVariant.filled` for the single most important action. Supporting actions use `outlined` or `text`.

```tsx
<Row gap={8}>
  <Button type="button" onClick$={onPublish$}>Publish</Button>
  <Button type="button" variant={ButtonVariant.text} onClick$={onDraft$}>
    Save draft
  </Button>
</Row>
```

### Use variants consistently

| Variant | Use for |
| --- | --- |
| `filled` | Primary confirmation |
| `outlined` | Secondary alternative |
| `text` | Tertiary / dismissive / toolbar |
| `elevated` | Legacy elevated emphasis (shadow + fill) |

Do not mix custom `backgroundColor` on every button — rely on `ThemeProvider` and variants first.

---

## Anti-Patterns

### Vague labels

**Source** (avoid)

```tsx
<Button type="button" onClick$={onContinue$}>OK</Button>
<Button type="button" onClick$={onContinue$}>Click here</Button>
```

**Preferred**

```tsx
<Button type="button" onClick$={onContinue$}>Continue to checkout</Button>
```

**Why:** Screen reader users hear the button name out of context. Vague labels fail WCAG 2.4.6 (Headings and Labels).

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: button-anti-vague-label`, `preview: false`).

---

### Too many primary buttons

**Source** (avoid)

```tsx
<Row gap={8}>
  <Button type="button">Save</Button>
  <Button type="button">Export</Button>
  <Button type="button">Share</Button>
</Row>
```

**Preferred**

```tsx
<Row gap={8}>
  <Button type="button">Save</Button>
  <Button type="button" variant={ButtonVariant.outlined}>Export</Button>
  <Button type="button" variant={ButtonVariant.text}>Share</Button>
</Row>
```

**Why:** Multiple filled buttons compete visually and confuse hierarchy.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: button-anti-many-primary`, `preview: false`).

---

### Icon-only buttons without labels

**Source** (avoid)

```tsx
<Button type="button" onClick$={onSettings$}>⚙</Button>
```

**Preferred**

```tsx
<Button type="button" aria-label="Settings" onClick$={onSettings$}>
  ⚙
</Button>
```

**Why:** Icon glyphs are not consistently announced. `aria-label` provides an accessible name (required for icon-only controls).

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: button-anti-icon-only`, `preview: false`).

---

## Accessibility

### Keyboard interaction

Native `<button>` elements are focusable and activatable with **Enter** and **Space**. Link buttons (`href`) activate with **Enter**. Focus order follows document order.

### Focus behavior

`Button` includes a visible **`:focus-visible`** ring in its stylesheet. Do not remove focus outlines without providing an equivalent custom indicator.

### Screen reader expectations

- `<button>` is announced as a button with its text content (or `aria-label`).
- `type="submit"` is announced as a submit button within forms.
- `disabled` removes the control from interaction; disabled links use `aria-disabled="true"`.

### Disabled state

On `<button>`, `disabled` is native. On `<a>`, `href` is removed, `tabIndex={-1}`, and `aria-disabled="true"` is set. `onClick$` is not attached when disabled.

---

## SSR

### Static rendering

`Button` renders a complete `<button>` or `<a>` on the server with variant classes and theme-derived inline styles. Label text is present in HTML for the first paint.

### Resumability compatibility

The button markup is static. **`onClick$` handlers hydrate lazily** through Qwik's resumability model — no eager client bundle is required for inert buttons, but interactivity resumes when the handler boundary loads.

### Event hydration behavior

Handlers must be **`QRL`s** created with `$()`. The optimizer serializes them for replay after SSR. Avoid inline non-QRL functions in `onClick$`.

---

## Theming

### ThemeProvider interaction

Wrap the app in `ThemeProvider`. `Button` reads `colorScheme` and `buttonTheme` from context via `useTheme()` when explicit color props are omitted.

```tsx
<ThemeProvider inherit={false} theme={{}}>
  <Button type="button">Themed</Button>
</ThemeProvider>
```

Themed styling requires an ancestor `ThemeProvider` — CSS variables and context defaults are not injected without it.

### Button theme usage

Override shared button defaults through `theme.buttonTheme` on `ThemeProvider`:

```tsx
import { createThemeData, ThemeProvider, Button } from "qwik-flutter-ui";

const theme = createThemeData({
  buttonTheme: {
    borderRadius: 8,
    padding: [12, 24],
  },
});

<ThemeProvider theme={theme}>
  <Button type="button">Custom radius</Button>
</ThemeProvider>
```

`ButtonTheme` fields: `foregroundColor`, `backgroundColor`, `borderColor`, `borderRadius`, `padding`.

### Color inheritance

Variant presets map to `ColorScheme` roles when props are omitted:

| Variant | Default colors |
| --- | --- |
| `filled`, `elevated` | `onPrimary` text on `primary` background |
| `outlined` | `primary` text, `outline` border |
| `text` | `primary` text |

Explicit `color` and `backgroundColor` props on `Button` override theme values.

---

## Flutter Equivalent

| Topic | Flutter | qwik-flutter-ui `Button` |
| --- | --- | --- |
| Primary filled | `FilledButton` | `variant={ButtonVariant.filled}` (default) |
| Outlined | `OutlinedButton` | `variant={ButtonVariant.outlined}` |
| Text / ghost | `TextButton` | `variant={ButtonVariant.text}` |
| Elevated (M2) | `ElevatedButton` | `variant={ButtonVariant.elevated}` |
| Handler | `onPressed: () {}` | `onClick$={$(() => {})}` |
| Disabled | `onPressed: null` | `disabled={true}` |
| Label | `child: Text('Save')` | `<Button>Save</Button>` |
| Style | `ButtonStyle` / `styleFrom` | Flat props + `buttonTheme` |
| Link | `TextButton` + routing | `href` renders `<a>` |

**Flutter**

```dart
FilledButton(
  onPressed: () => save(),
  child: Text('Save'),
)

OutlinedButton(
  onPressed: null,
  child: Text('Unavailable'),
)
```

**qwik-flutter-ui**

```tsx
<Button type="button" onClick$={onSave$}>
  Save
</Button>

<Button type="button" disabled>
  Unavailable
</Button>
```

**Similarities:** Material variant concepts, slotted label content, disabled suppresses activation.

**Differences:** Single `Button` component with `variant` instead of three widget classes. `onClick$` replaces `onPressed`. No `ButtonStyle` object — flat decoration props and `ThemeProvider` instead. `type="submit"` maps to HTML form submission.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Text](/docs/widgets/typography/text) | Button labels are slotted text content; use `Text` for surrounding copy. |
| [Container](/docs/widgets/layout/container) | Surfaces and padding around button groups. |
| [Dialog](/docs/widgets/overlays/dialog) | `DialogActions` hosts confirm / cancel buttons. |
| [AppBar](/docs/widgets/app-structure/app-bar) | Toolbar actions slot accepts `Button` children. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: Button
description: A labeled pressable control with Material-style variants, theme integration, and Qwik event handlers.
widget: Button
category: forms
flutterEquivalent: FilledButton / OutlinedButton / TextButton
status: shipped
related:
  - Text
  - Container
  - Dialog
  - AppBar
since: "0.0.1"
examples:
  - id: button-basic
    file: examples/button/basic.tsx
    category: basic
  - id: button-primary
    file: examples/button/primary.tsx
    category: common
  - id: button-secondary
    file: examples/button/secondary.tsx
    category: common
  - id: button-form-submit
    file: examples/button/form-submit.tsx
    category: common
  - id: button-dialog-actions
    file: examples/button/dialog-actions.tsx
    category: common
  - id: button-filled
    file: examples/button/filled.tsx
    category: variation
  - id: button-outlined
    file: examples/button/outlined.tsx
    category: variation
  - id: button-text
    file: examples/button/text.tsx
    category: variation
  - id: button-disabled
    file: examples/button/disabled.tsx
    category: variation
  - id: button-full-width
    file: examples/button/full-width.tsx
    category: variation
  - id: button-on-click
    file: examples/button/on-click.tsx
    category: common
  - id: button-async
    file: examples/button/async.tsx
    category: common
  - id: button-navigation
    file: examples/button/navigation.tsx
    category: common
  - id: button-in-row
    file: examples/button/in-row.tsx
    category: composition
  - id: button-in-column
    file: examples/button/in-column.tsx
    category: composition
  - id: button-in-app-bar
    file: examples/button/in-app-bar.tsx
    category: composition
  - id: button-in-dialog
    file: examples/button/in-dialog.tsx
    category: composition
  - id: button-anti-vague-label
    file: examples/button/anti-vague-label.tsx
    category: anti-pattern
  - id: button-anti-many-primary
    file: examples/button/anti-many-primary.tsx
    category: anti-pattern
  - id: button-anti-icon-only
    file: examples/button/anti-icon-only.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/button/` when the docs site is implemented.
