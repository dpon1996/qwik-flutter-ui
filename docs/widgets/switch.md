---
title: Switch
description: On/off toggle control via native switch input with label, form registration, and distinct switch semantics.
widget: Switch
category: forms
flutterEquivalent: Switch
status: shipped
related:
  - Checkbox
  - Radio
  - RadioGroup
  - Form
  - TextFormField
since: "0.0.1"
examples:
  - id: switch-basic
    file: examples/switch/basic.tsx
    category: basic
  - id: switch-dark-mode
    file: examples/switch/dark-mode.tsx
    category: common
  - id: switch-notifications
    file: examples/switch/notifications.tsx
    category: common
  - id: switch-privacy-setting
    file: examples/switch/privacy-setting.tsx
    category: common
  - id: switch-feature-flag
    file: examples/switch/feature-flag.tsx
    category: common
  - id: switch-controlled
    file: examples/switch/controlled.tsx
    category: state
  - id: switch-uncontrolled
    file: examples/switch/uncontrolled.tsx
    category: state
  - id: switch-preferences-form
    file: examples/switch/preferences-form.tsx
    category: form-integration
  - id: switch-settings-screen
    file: examples/switch/settings-screen.tsx
    category: form-integration
  - id: switch-profile-settings
    file: examples/switch/profile-settings.tsx
    category: form-integration
  - id: switch-required-toggle
    file: examples/switch/required-toggle.tsx
    category: validation
  - id: switch-preference-validation
    file: examples/switch/preference-validation.tsx
    category: validation
  - id: switch-disabled
    file: examples/switch/disabled.tsx
    category: variation
  - id: switch-default-on
    file: examples/switch/default-on.tsx
    category: variation
  - id: switch-non-editable
    file: examples/switch/non-editable.tsx
    category: variation
  - id: switch-vs-checkbox-switch
    file: examples/switch/vs-checkbox-switch.tsx
    category: comparison
  - id: switch-vs-checkbox-checkbox
    file: examples/switch/vs-checkbox-checkbox.tsx
    category: comparison
  - id: switch-best-immediate-state
    file: examples/switch/best-immediate-state.tsx
    category: best-practice
  - id: switch-best-form-choices
    file: examples/switch/best-form-choices.tsx
    category: best-practice
  - id: switch-best-clear-labels
    file: examples/switch/best-clear-labels.tsx
    category: best-practice
  - id: switch-anti-multi-select
    file: examples/switch/anti-multi-select.tsx
    category: anti-pattern
  - id: switch-anti-unlabeled
    file: examples/switch/anti-unlabeled.tsx
    category: anti-pattern
  - id: switch-anti-excessive-list
    file: examples/switch/anti-excessive-list.tsx
    category: anti-pattern
---

# Switch

## Overview

`Switch` is an on/off toggle for settings and preferences. It maps to Flutter's [`Switch`](https://api.flutter.dev/flutter/material/Switch-class.html) and renders a native **`<input type="checkbox" role="switch">`**.

Use `Switch` when flipping a setting should feel **immediate** — the user expects the control to take effect right away (often via `onChange$` updating app state). Change handlers use **`onChange$`** (HTML `change` event); there is no `onInput$`.

`Switch` shares the **same prop names** as [`Checkbox`](/docs/widgets/forms/checkbox) (Decision #81). The difference is **semantics** (`role="switch"`) and **visual presentation**.

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Immediate state changes** | Toggle updates checked state on change — wire `onChange$` to apply settings instantly |
| **On/off controls** | Checked = on (`true`), unchecked = off (`false`) |
| **Preference toggles** | Dark mode, notifications, privacy flags — one boolean per switch |

### When to use Switch

- Settings screens and preference panels
- Features that enable/disable behavior immediately
- Boolean fields inside **`Form`** when switch semantics fit (`FormValues[name]` is **`boolean`**)
- Toolbar or list-row toggles where users expect a switch, not a checkbox

### Switch vs Checkbox vs Radio

| | `Switch` | `Checkbox` | `Radio` / `RadioGroup` |
| --- | --- | --- | --- |
| **Role** | `switch` | `checkbox` | Radio group — single string value |
| **Selection model** | Independent boolean | Independent boolean | **Mutually exclusive** |
| **User expectation** | Immediate on/off | Opt-in / confirm / multi-select | Pick one option |
| **Typical use** | Dark mode, notifications | Terms acceptance, feature lists | Plan tier, payment method |
| **Form value** | `boolean` | `boolean` | `string` |

---

## Import

```tsx
import {
  Button,
  Checkbox,
  Column,
  Form,
  Switch,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

import type { FormValues } from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working `Switch` with a visible label.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Switch label="Dark mode" />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-basic`).

---

## Common Usage

### Dark Mode Toggle

Controlled switch — apply theme change in `onChange$`.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const darkMode = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <Switch
        label="Dark mode"
        checked={darkMode.value}
        onChange$={$((on) => {
          darkMode.value = on;
        })}
      />
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-dark-mode`).

---

### Notifications Toggle

Push or email notification preference with uncontrolled default.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Switch
      label="Push notifications"
      defaultChecked={true}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-notifications`).

---

### Privacy Setting

Profile visibility or data-sharing toggle.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const profilePublic = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <Switch
        label="Make my profile public"
        checked={profilePublic.value}
        onChange$={$((on) => {
          profilePublic.value = on;
        })}
      />
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-privacy-setting`).

---

### Feature Flag

Enable beta or experimental functionality — often persisted on save or immediately via handler.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const betaEnabled = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <Switch
        label="Enable beta features"
        checked={betaEnabled.value}
        onChange$={$((on) => {
          betaEnabled.value = on;
        })}
      />
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-feature-flag`).

---

## State Management

### Controlled Switch

Pass **`checked`** and update state in **`onChange$`**. The parent owns the value.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const enabled = useSignal(true);

  return (
    <ThemeProvider theme={{}}>
      <Switch
        label="Email digests"
        checked={enabled.value}
        onChange$={$((on) => {
          enabled.value = on;
        })}
      />
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-controlled`).

---

### Uncontrolled Switch

Use **`defaultChecked`** for SSR-friendly initial state.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Switch
      label="Sound effects"
      defaultChecked={false}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-uncontrolled`).

---

### Behavior differences

| | Controlled | Uncontrolled |
| --- | --- | --- |
| **Props** | `checked` + `onChange$` | `defaultChecked` |
| **State owner** | Parent signal / store | Internal + DOM |
| **SSR** | Pass server `checked` from props | `defaultChecked` in static HTML |
| **When to use** | Live UI that reacts instantly (theme, visibility) | Simple defaults; save on form submit |

Never pass **`checked`** and **`defaultChecked`** together.

---

## Form Integration

When **`name`** is set inside **`Form`**, the switch registers and submits a **`boolean`** in **`FormValues`**.

### Preferences Form

Multiple switches collected on submit.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Column,
  Form,
  Switch,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log({
      notifications: values.notifications as boolean,
      marketing: values.marketing as boolean,
    });
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <Switch
            name="notifications"
            label="Push notifications"
            defaultChecked={true}
          />
          <Switch
            name="marketing"
            label="Marketing emails"
            defaultChecked={false}
          />
          <Button type="submit">Save preferences</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-preferences-form`).

---

### Settings Screen

Grouped switches with a section heading — changes apply on explicit save.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Form,
  Switch,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Column gap={16}>
        <Text as="h2">Notifications</Text>
        <Switch name="push" label="Push alerts" defaultChecked={true} />
        <Switch name="email" label="Email summaries" defaultChecked={false} />
        <Switch name="sms" label="SMS alerts" defaultChecked={false} />
        <Button type="submit">Save settings</Button>
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-settings-screen`).

---

### Profile Settings

Controlled switches inside a form for editable profile preferences.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Column,
  Form,
  Switch,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const showEmail = useSignal(true);

  const onSubmit$ = $((values: FormValues) => {
    console.log("Profile", values);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <Switch
            name="showEmail"
            label="Show email on profile"
            checked={showEmail.value}
            onChange$={$((on) => {
              showEmail.value = on;
            })}
          />
          <Switch
            name="showActivity"
            label="Show activity status"
            defaultChecked={false}
          />
          <Button type="submit">Update profile</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-profile-settings`).

---

### Recommended patterns

1. Use **`onChange$`** for immediate UI updates when the setting should apply before submit
2. Set **`name`** on switches inside **`Form`** that should appear in **`FormValues`**
3. Submit with **`<Button type="submit">`** when persisting a batch of preferences
4. Prefer **`Switch`** for settings; prefer **`Checkbox`** for consent and opt-in copy in registration flows

---

## Validation

| Mechanism | Support on `Switch` | Notes |
| --- | --- | --- |
| **`required`** | Yes | Native constraint — switch must be on to submit |
| **`validator$`** | **No** | No `SwitchFormField` in v1 — use [`CheckboxFormField`](/docs/widgets/forms/checkbox-form-field) if checkbox semantics are acceptable, or validate in **`onSubmit$`** |

### Required Toggle

Rare — use when the user must explicitly enable a setting (e.g. acknowledge a mandatory channel).

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Form, Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Switch
        name="securityAlerts"
        label="Enable security alerts (required)"
        required
      />
      <Button type="submit">Continue</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-required-toggle`).

---

### Preference Validation

Validate boolean preferences in **`onSubmit$`** when business rules exceed native `required`.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Form,
  Switch,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const error = useSignal("");

  const onSubmit$ = $((values: FormValues) => {
    const twoFactor = values.twoFactor as boolean;
    const backupEmail = values.backupEmail as boolean;

    if (!twoFactor && !backupEmail) {
      error.value = "Enable two-factor authentication or backup email alerts";
      return;
    }

    error.value = "";
    console.log("Saved", values);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Switch name="twoFactor" label="Two-factor authentication" />
        <Switch name="backupEmail" label="Backup email alerts" />
        {error.value && <Text>{error.value}</Text>}
        <Button type="submit">Save</Button>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-preference-validation`).

---

## Variations

Each example demonstrates **one concept** only.

### Disabled

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Switch
      label="Enterprise SSO (upgrade required)"
      defaultChecked={false}
      disabled
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-disabled`).

---

### Default On

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Switch
      label="Product announcements"
      defaultChecked={true}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-default-on`).

---

### Read Only

`Switch` does not ship **`readOnly`** in v1. Use **`disabled`** with a fixed **`checked`** state when the on/off value must be visible but not editable.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Switch
      label="Security alerts (managed by admin)"
      checked={true}
      disabled
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-non-editable`).

---

## Switch vs Checkbox

Both share boolean state and the same prop names. Choose based on **user expectations** and **context**.

| Scenario | Use **Switch** | Use **Checkbox** |
| --- | --- | --- |
| **Immediate actions** | Apply theme, mute, visibility on toggle | Defer until form submit |
| **Form submissions** | Settings saved in batch — OK with switch | Terms, consent, registration opt-in |
| **Preference settings** | Notification channels, feature flags | Optional add-ons listed as checkboxes |
| **User expectations** | "Flip a setting" | "Agree" or "select from a list" |

### Switch

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const darkMode = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <Switch
        label="Dark mode"
        checked={darkMode.value}
        onChange$={$((on) => {
          darkMode.value = on;
        })}
      />
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-vs-checkbox-switch`).

---

### Checkbox

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Checkbox
      label="I agree to the terms of service"
      required
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-vs-checkbox-checkbox`).

---

### Guidance summary

- **Switch** — single setting that feels like a physical toggle; `role="switch"` for assistive technology
- **Checkbox** — consent, legal opt-in, or lists where multiple items can be selected
- **Radio** — mutually exclusive choices — never use switches for "pick one plan"

---

## Best Practices

### Use Switch for immediate state changes

Wire `onChange$` to update app state when the setting should apply without waiting for submit.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const muted = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <Switch
        label="Mute notifications"
        checked={muted.value}
        onChange$={$((on) => {
          muted.value = on;
        })}
      />
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-best-immediate-state`).

---

### Use Checkbox for form choices

Registration consent and legal acceptance belong on **`Checkbox`**, not **`Switch`**.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Checkbox
      label="I agree to the privacy policy"
      required
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-best-form-choices`).

---

### Provide clear labels

Describe the **on** state — what enabling the switch does.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Switch, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Switch label="Show online status to teammates" />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: switch-best-clear-labels`).

---

## Anti-Patterns

### Switch for multi-select choices

**Source** (avoid)

```tsx
<Column gap={8}>
  <Switch label="Free plan" />
  <Switch label="Pro plan" />
</Column>
```

**Preferred**

```tsx
import { Column, Radio, RadioGroup } from "qwik-flutter-ui";

<RadioGroup name="plan" defaultValue="free">
  <Column gap={8}>
    <Radio value="free" label="Free plan" />
    <Radio value="pro" label="Pro plan" />
  </Column>
</RadioGroup>
```

**Why:** Plan tier is a single choice. Switches imply independent on/off settings, not mutually exclusive options.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: switch-anti-multi-select`, `preview: false`).

---

### Unlabeled switches

**Source** (avoid)

```tsx
<Switch name="analytics" />
```

**Preferred**

```tsx
<Switch name="analytics" label="Share anonymous usage data" />
```

**Why:** Without a label, assistive technology cannot announce what the switch controls.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: switch-anti-unlabeled`, `preview: false`).

---

### Excessive toggle lists

**Source** (avoid)

```tsx
{/* Long undifferentiated list of switches */}
<Switch label="Option 1" />
<Switch label="Option 2" />
{/* ...many more... */}
```

**Preferred**

Group into sections with headings, collapse advanced settings, or use a dedicated settings layout.

**Why:** Too many toggles overwhelm users. Group related preferences and hide advanced options.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: switch-anti-excessive-list`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Label association** | `label` prop renders `<label for={inputId}>`. Provide stable `id` when multiple forms share a page |
| **Keyboard interaction** | Native switch — **Space** toggles when focused; **Tab** moves focus |
| **Screen reader expectations** | Announces as **switch** (not checkbox); on/off state |
| **Checked state announcements** | Browser exposes checked state; label describes what "on" means |
| **Required state** | Native `required` + visible `*` beside label when `required={true}` |

Do not use `Switch` where checkbox semantics are expected (consent forms) — role mismatch confuses users of assistive technology.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | Native `<input type="checkbox" role="switch">` and label render on the server |
| **Initial state** | **`defaultChecked={true}`** emits the `checked` attribute; controlled **`checked`** from server props for resume |
| **Resumability** | Markup serializes into HTML; **`onChange$`** hydrates lazily as a QRL |
| **Progressive enhancement** | Native **`name`** / **`value`** participate in HTML form POST without JavaScript |
| **FormValues** | Boolean normalization in **`onSubmit$`**; native POST sends string `value` when checked |

---

## Flutter Equivalent

| Topic | Flutter `Switch` | qwik-flutter-ui `Switch` |
| --- | --- | --- |
| **Value** | `value: bool` | `checked` / `defaultChecked` |
| **Change handler** | `onChanged: (bool)` | `onChange$` QRL with `boolean` |
| **Label** | External `Text` / `ListTile` | `label` prop → native `<label>` |
| **Form integration** | Manual / `SwitchListTile` | `name` + `Form` → `FormValues` boolean |
| **Semantics** | Material switch widget | Native input + `role="switch"` |
| **DOM** | Skia render tree | Native HTML input |

**Flutter**

```dart
Switch(
  value: darkMode,
  onChanged: (v) => setState(() => darkMode = v),
)
```

**qwik-flutter-ui**

```tsx
<Switch
  label="Dark mode"
  checked={darkMode.value}
  onChange$={$((on) => {
    darkMode.value = on;
  })}
/>
```

Similarities: boolean on/off, disabled state, immediate toggle UX.

Differences: native HTML input, built-in label prop, QRL handlers, shared API surface with `Checkbox`.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Checkbox](/docs/widgets/forms/checkbox) | Same props; checkbox role for consent and multi-select lists |
| [Radio](/docs/widgets/forms/radio) | Single option in a mutually exclusive group |
| [RadioGroup](/docs/widgets/forms/radio-group) | Container for exclusive radio selection |
| [Form](/docs/widgets/forms/form) | Parent for boolean submit payloads and batch save |
| [TextFormField](/docs/widgets/forms/text-form-field) | Text fields alongside switches in settings forms |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/switch/`
- **`category`** — groups examples (`basic`, `common`, `state`, `form-integration`, `validation`, `variation`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to `Checkbox`, `Radio`, and form widgets
- **`flutterEquivalent`** — `Switch`

When adding examples, keep one concept per file, always include a **`label`**, wrap **`onChange$`** with **`$()`**, and import only from `qwik-flutter-ui`.
