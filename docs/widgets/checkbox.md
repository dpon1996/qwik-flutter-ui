---
title: Checkbox
description: Boolean selection control via native checkbox input with label, form registration, and theme-aware styling.
widget: Checkbox
category: forms
flutterEquivalent: Checkbox
status: shipped
related:
  - Switch
  - Radio
  - RadioGroup
  - Form
  - CheckboxFormField
  - TextFormField
since: "0.0.1"
examples:
  - id: checkbox-basic
    file: examples/checkbox/basic.tsx
    category: basic
  - id: checkbox-accept-terms
    file: examples/checkbox/accept-terms.tsx
    category: common
  - id: checkbox-newsletter
    file: examples/checkbox/newsletter.tsx
    category: common
  - id: checkbox-feature-toggle
    file: examples/checkbox/feature-toggle.tsx
    category: common
  - id: checkbox-multi-select-preferences
    file: examples/checkbox/multi-select-preferences.tsx
    category: common
  - id: checkbox-controlled
    file: examples/checkbox/controlled.tsx
    category: state
  - id: checkbox-uncontrolled
    file: examples/checkbox/uncontrolled.tsx
    category: state
  - id: checkbox-label-inline
    file: examples/checkbox/label-inline.tsx
    category: labels
  - id: checkbox-label-long
    file: examples/checkbox/label-long.tsx
    category: labels
  - id: checkbox-label-required
    file: examples/checkbox/label-required.tsx
    category: labels
  - id: checkbox-in-form
    file: examples/checkbox/in-form.tsx
    category: form-integration
  - id: checkbox-required-acceptance
    file: examples/checkbox/required-acceptance.tsx
    category: form-integration
  - id: checkbox-validation-example
    file: examples/checkbox/validation-example.tsx
    category: form-integration
  - id: checkbox-required-validation
    file: examples/checkbox/required-validation.tsx
    category: validation
  - id: checkbox-terms-acceptance
    file: examples/checkbox/terms-acceptance.tsx
    category: validation
  - id: checkbox-custom-validation
    file: examples/checkbox/custom-validation.tsx
    category: validation
  - id: checkbox-disabled
    file: examples/checkbox/disabled.tsx
    category: variation
  - id: checkbox-non-editable
    file: examples/checkbox/non-editable.tsx
    category: variation
  - id: checkbox-checked-default
    file: examples/checkbox/checked-default.tsx
    category: variation
  - id: checkbox-vs-switch-checkbox
    file: examples/checkbox/vs-switch-checkbox.tsx
    category: comparison
  - id: checkbox-vs-switch-switch
    file: examples/checkbox/vs-switch-switch.tsx
    category: comparison
  - id: checkbox-best-always-label
    file: examples/checkbox/best-always-label.tsx
    category: best-practice
  - id: checkbox-best-opt-in
    file: examples/checkbox/best-opt-in.tsx
    category: best-practice
  - id: checkbox-best-group-options
    file: examples/checkbox/best-group-options.tsx
    category: best-practice
  - id: checkbox-anti-unlabeled
    file: examples/checkbox/anti-unlabeled.tsx
    category: anti-pattern
  - id: checkbox-anti-mutually-exclusive
    file: examples/checkbox/anti-mutually-exclusive.tsx
    category: anti-pattern
  - id: checkbox-anti-excessive-list
    file: examples/checkbox/anti-excessive-list.tsx
    category: anti-pattern
---

# Checkbox

## Overview

`Checkbox` captures a **boolean** on/off choice. It maps to Flutter's [`Checkbox`](https://api.flutter.dev/flutter/material/Checkbox-class.html) and renders a native **`<input type="checkbox">`** — never a custom `div` with `role="checkbox"`.

Use `Checkbox` for independent yes/no decisions. Change handlers use **`onChange$`** (HTML `change` event); there is no `onInput$`.

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Boolean selection** | Checked = `true`, unchecked = `false` |
| **Opt-in choices** | Consent, subscriptions, optional features — user explicitly enables |
| **Multiple selections** | Each `Checkbox` is independent; use separate controls with distinct `name` keys for multi-select lists |

### When to use Checkbox

- Terms acceptance, marketing opt-in, permission toggles in a list
- Settings where **multiple options** can be enabled at once
- Boolean fields inside **`Form`** (`FormValues[name]` is **`boolean`**)
- Progressive enhancement with native `name` / `value` on HTML POST

### Checkbox vs Switch vs Radio

| | `Checkbox` | `Switch` | `Radio` / `RadioGroup` |
| --- | --- | --- | --- |
| **Value type** | `boolean` | `boolean` | Single `string` from a set |
| **Selection model** | Independent on/off | Independent on/off | **Mutually exclusive** — one option |
| **Native element** | `type="checkbox"` | `type="checkbox"` + `role="switch"` | `type="radio"` inside a group |
| **Best for** | Opt-in lists, consent, multi-select booleans | Immediate settings (dark mode, notifications) | Choose one plan, one payment method |
| **Multiple checked** | Yes — each checkbox is separate | Yes | No — one radio selected per group |

For validated forms with custom error messages, use **`CheckboxFormField`** instead of plain `Checkbox`.

---

## Import

```tsx
import {
  Button,
  Checkbox,
  CheckboxFormField,
  Column,
  Form,
  Switch,
  ThemeProvider,
} from "qwik-flutter-ui";

import type { FormValues } from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working `Checkbox` with a visible label.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Checkbox label="Subscribe to newsletter" />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-basic`).

---

## Common Usage

### Accept Terms

Required consent before submit. Pair with `Form` and `required` for native validation, or `CheckboxFormField` for custom messages.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Checkbox, Column, Form, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Column gap={16}>
        <Checkbox
          name="terms"
          label="I agree to the terms of service"
          required
        />
        <Button type="submit">Continue</Button>
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-accept-terms`).

---

### Newsletter Subscription

Optional opt-in with uncontrolled default (unchecked).

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Checkbox,
  Form,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log("Newsletter:", values.newsletter);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Checkbox
          name="newsletter"
          label="Send me product updates and tips"
          defaultChecked={false}
        />
        <Button type="submit">Save preferences</Button>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-newsletter`).

---

### Feature Toggle

Enable optional product features — multiple checkboxes can be checked independently.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { Checkbox, Column, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const analytics = useSignal(true);
  const crashReports = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <Column gap={12}>
        <Checkbox
          label="Enable analytics"
          checked={analytics.value}
          onChange$={$((checked) => {
            analytics.value = checked;
          })}
        />
        <Checkbox
          label="Send crash reports"
          checked={crashReports.value}
          onChange$={$((checked) => {
            crashReports.value = checked;
          })}
        />
      </Column>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-feature-toggle`).

---

### Multi-Select Preferences

Each preference is a separate boolean with its own `name` in `FormValues`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Checkbox,
  Column,
  Form,
  Text,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log(values);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <Text as="h3">Email preferences</Text>
          <Checkbox
            name="productUpdates"
            label="Product updates"
            defaultChecked={true}
          />
          <Checkbox
            name="events"
            label="Events and webinars"
            defaultChecked={false}
          />
          <Checkbox
            name="partners"
            label="Partner offers"
            defaultChecked={false}
          />
          <Button type="submit">Save</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-multi-select-preferences`).

---

## State Management

### Controlled Checkbox

Pass **`checked`** and update state in **`onChange$`**. The parent owns the value.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const agree = useSignal(false);

  return (
    <ThemeProvider theme={{}}>
      <Checkbox
        label="I agree to the terms"
        checked={agree.value}
        onChange$={$((checked) => {
          agree.value = checked;
        })}
      />
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-controlled`).

---

### Uncontrolled Checkbox

Use **`defaultChecked`** for SSR-friendly initial state. The control manages its own checked state after mount.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Checkbox
      label="Remember me"
      defaultChecked={true}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-uncontrolled`).

---

### Behavior differences

| | Controlled | Uncontrolled |
| --- | --- | --- |
| **Props** | `checked` + `onChange$` | `defaultChecked` |
| **State owner** | Parent signal / store | Internal + DOM |
| **SSR** | Pass server `checked` from props | `defaultChecked` in static HTML |
| **When to use** | Live UI that reacts to checked state | Simple forms, defaults only |

Never pass **`checked`** and **`defaultChecked`** together.

---

## Labels

Always provide a visible **`label`**. The prop renders `<label for={inputId}>` associated with the native control.

### Inline Label

Default layout — label beside the checkbox control.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Checkbox label="Enable notifications" />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-label-inline`).

---

### Long Label

Use full sentences for consent copy. The label wraps naturally in the control row.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Checkbox label="I agree to receive marketing emails about new features, events, and product updates. I can unsubscribe at any time." />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-label-long`).

---

### Required Label

Set **`required={true}`** for native constraint and **`aria-required`**. When `label` is set, a visual **`*`** appears beside the label text.

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-label-required`).

---

### Recommended labeling practices

- One **`label`** per checkbox — describe what checking means
- Do not rely on placeholder text (checkboxes have no placeholder)
- For helper or error copy in forms, use **`CheckboxFormField`** with **`decoration.helperText`** / validator output

---

## Form Integration

When **`name`** is set inside **`Form`**, the checkbox registers and submits a **`boolean`** in **`FormValues`**. Native HTML POST sends the `value` attribute (default `"on"`) when checked; unchecked fields are omitted.

### Checkbox in Form

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Checkbox,
  Form,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log(values.marketing); // boolean
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Checkbox
          name="marketing"
          label="Send me occasional updates"
          defaultChecked={false}
        />
        <Button type="submit">Save</Button>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-in-form`).

---

### Required Acceptance

Native **`required`** blocks submit when unchecked.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Checkbox,
  Form,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Checkbox
        name="terms"
        label="I accept the terms and conditions"
        required
      />
      <Button type="submit">Create account</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-required-acceptance`).

---

### Validation Example

For custom validation messages that block submit, use **`CheckboxFormField`** with **`validator$`**.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  CheckboxFormField,
  Form,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <CheckboxFormField
        name="terms"
        required
        decoration={{
          label: "I agree to the terms of service",
          helperText: "You must accept to continue",
        }}
        validator$={$((checked) =>
          checked ? undefined : "Please accept the terms",
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-validation-example`).

---

### Recommended patterns

1. Set **`name`** on every checkbox inside **`Form`**
2. Use plain **`Checkbox`** for native **`required`** only
3. Use **`CheckboxFormField`** when you need **`validator$`** or helper/error decoration
4. Submit with **`<Button type="submit">`**
5. Read booleans from **`FormValues`** — narrow at the handler boundary

---

## Validation

| Mechanism | Widget | Behavior |
| --- | --- | --- |
| **`required`** | `Checkbox` | Native constraint — must be checked to submit |
| **`validator$`** | `CheckboxFormField` | Returns error string or `undefined`; blocks `onSubmit$` when invalid |
| **`Form.autovalidateMode`** | `Form` | Controls when `validator$` runs (see [Form](/docs/widgets/forms/form)) |

`validator$` receives a **`boolean`** and must be wrapped with **`$()`**.

### Required Checkbox

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Checkbox, Form, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Checkbox
        name="confirm"
        label="I confirm this information is accurate"
        required
      />
      <Button type="submit">Submit</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-required-validation`).

---

### Terms Acceptance

Custom message when the user must explicitly opt in.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AutovalidateMode,
  Button,
  CheckboxFormField,
  Form,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form
      autovalidateMode={AutovalidateMode.onUserInteraction}
      onSubmit$={$(() => {})}
    >
      <CheckboxFormField
        name="terms"
        required
        decoration={{ label: "I agree to the terms of service" }}
        validator$={$((checked) =>
          checked ? undefined : "You must accept the terms to continue",
        )}
      />
      <Button type="submit">Register</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-terms-acceptance`).

---

### Custom Validation

Business rules in `validator$` — e.g. age-gate confirmation.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  CheckboxFormField,
  Form,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <CheckboxFormField
        name="ageConfirm"
        decoration={{
          label: "I confirm I am 18 years of age or older",
        }}
        validator$={$((checked) =>
          checked ? undefined : "You must confirm your age to proceed",
        )}
      />
      <Button type="submit">Continue</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-custom-validation`).

---

## Variations

Each example demonstrates **one concept** only.

### Disabled

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Checkbox
      label="Premium feature (unavailable on your plan)"
      defaultChecked={false}
      disabled
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-disabled`).

---

### Read Only

`Checkbox` does not ship **`readOnly`** in v1. Use **`disabled`** with a fixed **`checked`** state when the value must be visible but not editable.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Checkbox
      label="Terms accepted on Jan 12, 2026"
      checked={true}
      disabled
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-non-editable`).

---

### Checked by Default

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Checkbox
      label="Subscribe to newsletter"
      defaultChecked={true}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-checked-default`).

---

## Checkbox vs Switch

Both controls represent **boolean** state and share the **same prop names** (Decision #81). The difference is **semantics** and **visual presentation**.

| Prefer **Checkbox** | Prefer **Switch** |
| --- | --- |
| Consent and legal opt-in | Immediate settings (dark mode, notifications) |
| Multi-select lists of options | Single on/off that takes effect immediately |
| Forms with several independent booleans | Compact toolbar or list-row toggles |
| Checkbox role expected by users | Switch role for assistive technology |

### Checkbox

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, Column, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={12}>
      <Checkbox label="Email me about security updates" />
      <Checkbox label="Email me about new features" />
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-vs-switch-checkbox`).

---

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-vs-switch-switch`).

---

## Best Practices

### Always provide labels

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Checkbox label="Send me weekly digest emails" />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-best-always-label`).

---

### Use for opt-in actions

Checkboxes should represent affirmative consent — not pre-checked traps for marketing.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Checkbox
      label="Yes, send me product announcements (optional)"
      defaultChecked={false}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-best-opt-in`).

---

### Group related options

Use **`Column gap`** and a heading to group related checkboxes.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, Column, Text, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={12}>
      <Text as="h3">Notifications</Text>
      <Checkbox label="Push notifications" />
      <Checkbox label="Email summaries" />
      <Checkbox label="SMS alerts" />
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: checkbox-best-group-options`).

---

## Anti-Patterns

### Unlabeled checkboxes

**Source** (avoid)

```tsx
<Checkbox name="marketing" />
```

**Preferred**

```tsx
<Checkbox name="marketing" label="Send me product updates" />
```

**Why:** Without a label, the control has no accessible name. Screen reader users cannot tell what they are agreeing to.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: checkbox-anti-unlabeled`, `preview: false`).

---

### Checkbox for mutually exclusive choices

**Source** (avoid)

```tsx
<Column gap={8}>
  <Checkbox label="Free plan" />
  <Checkbox label="Pro plan" />
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

**Why:** Multiple checkboxes allow selecting more than one plan. Billing tier is a single choice — use **`RadioGroup`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: checkbox-anti-mutually-exclusive`, `preview: false`).

---

### Excessive checkbox lists

**Source** (avoid)

```tsx
{/* Dozens of undifferentiated checkboxes with no grouping */}
<Checkbox label="Option 1" />
<Checkbox label="Option 2" />
{/* ... 30 more ... */}
```

**Preferred**

Group into sections, use **`Dropdown`** for long single-select lists, or paginate preferences.

**Why:** Long flat lists are hard to scan and increase cognitive load. Group related options or use a more appropriate control.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: checkbox-anti-excessive-list`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Label association** | `label` prop renders `<label for={inputId}>`. Stable `id` when multiple forms share a page |
| **Keyboard interaction** | Native checkbox — **Space** toggles when focused; **Tab** moves focus |
| **Screen reader expectations** | Announces as checkbox (not switch); checked/unchecked state; required when `required={true}` |
| **Required state** | Native `required` + visible `*` beside label when `label` is set |
| **Errors** | `CheckboxFormField` sets `aria-invalid` and `role="alert"` on error text |

`Switch` uses **`role="switch"`** for distinct semantics — do not interchange roles for the same UX pattern without reason.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | Native `<input type="checkbox">` and label render on the server |
| **Initial state** | **`defaultChecked={true}`** emits the `checked` attribute in HTML; controlled **`checked`** from server props for resume |
| **Resumability** | Markup serializes into HTML; **`onChange$`** hydrates lazily as a QRL |
| **Progressive enhancement** | Native **`name`** / **`value`** participate in HTML form POST without JavaScript |
| **FormValues** | Boolean normalization happens client-side in **`onSubmit$`**; native POST uses string `value` when checked |

**Not in v1:** `indeterminate` / tri-state — cannot be represented in SSR HTML (deferred v2).

---

## Flutter Equivalent

| Topic | Flutter `Checkbox` | qwik-flutter-ui `Checkbox` |
| --- | --- | --- |
| **Value** | `value: bool?` | `checked` / `defaultChecked` |
| **Change handler** | `onChanged: (bool?)` | `onChange$` QRL with `boolean` |
| **Label** | External `Text` widget | `label` prop → native `<label>` |
| **Form integration** | `CheckboxListTile` / manual | `name` + `Form` → `FormValues` boolean |
| **Tri-state** | `tristate: true` | **Not in v1** |
| **DOM** | Skia render tree | Native `<input type="checkbox">` |

**Flutter**

```dart
Checkbox(
  value: agree,
  onChanged: (v) => setState(() => agree = v ?? false),
)
```

**qwik-flutter-ui**

```tsx
<Checkbox
  label="I agree"
  checked={agree.value}
  onChange$={$((checked) => {
    agree.value = checked;
  })}
/>
```

Similarities: boolean toggle, disabled state, form-friendly values.

Differences: native HTML input, built-in label prop, QRL handlers, no indeterminate in v1.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Switch](/docs/widgets/forms/switch) | Same API; `role="switch"` for settings-style toggles |
| [Radio](/docs/widgets/forms/radio) | Single option inside a mutually exclusive group |
| [RadioGroup](/docs/widgets/forms/radio-group) | Container for mutually exclusive radio options |
| [Form](/docs/widgets/forms/form) | Parent for boolean submit payloads and validation timing |
| [CheckboxFormField](/docs/widgets/forms/checkbox-form-field) | Validated checkbox with decoration and `validator$` |
| [TextFormField](/docs/widgets/forms/text-form-field) | Text counterpart in validated forms |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/checkbox/`
- **`category`** — groups examples (`basic`, `common`, `state`, `labels`, `form-integration`, `validation`, `variation`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to selection controls and form widgets
- **`flutterEquivalent`** — `Checkbox`

When adding examples, keep one concept per file, always include a **`label`**, wrap **`onChange$`** and **`validator$`** with **`$()`**, and import only from `qwik-flutter-ui`.
