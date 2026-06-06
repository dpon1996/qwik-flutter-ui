---
title: Radio
description: Single option in a mutually exclusive radio group — must be used inside RadioGroup with string value tokens.
widget: Radio
category: forms
flutterEquivalent: Radio
status: shipped
related:
  - RadioGroup
  - RadioGroupFormField
  - Checkbox
  - Switch
  - Form
since: "0.0.1"
examples:
  - id: radio-basic
    file: examples/radio/basic.tsx
    category: basic
  - id: radio-select-gender
    file: examples/radio/select-gender.tsx
    category: common
  - id: radio-select-theme
    file: examples/radio/select-theme.tsx
    category: common
  - id: radio-select-payment
    file: examples/radio/select-payment.tsx
    category: common
  - id: radio-select-language
    file: examples/radio/select-language.tsx
    category: common
  - id: radio-controlled
    file: examples/radio/controlled.tsx
    category: state
  - id: radio-grouped-selection
    file: examples/radio/grouped-selection.tsx
    category: state
  - id: radio-label-inline
    file: examples/radio/label-inline.tsx
    category: labels
  - id: radio-label-long
    file: examples/radio/label-long.tsx
    category: labels
  - id: radio-label-required
    file: examples/radio/label-required.tsx
    category: labels
  - id: radio-in-form
    file: examples/radio/in-form.tsx
    category: form-integration
  - id: radio-required-selection
    file: examples/radio/required-selection.tsx
    category: form-integration
  - id: radio-validation-example
    file: examples/radio/validation-example.tsx
    category: form-integration
  - id: radio-required-validation
    file: examples/radio/required-validation.tsx
    category: validation
  - id: radio-custom-validation
    file: examples/radio/custom-validation.tsx
    category: validation
  - id: radio-disabled
    file: examples/radio/disabled.tsx
    category: variation
  - id: radio-default-selection
    file: examples/radio/default-selection.tsx
    category: variation
  - id: radio-non-editable
    file: examples/radio/non-editable.tsx
    category: variation
  - id: radio-vs-checkbox-radio
    file: examples/radio/vs-checkbox-radio.tsx
    category: comparison
  - id: radio-vs-checkbox-checkbox
    file: examples/radio/vs-checkbox-checkbox.tsx
    category: comparison
  - id: radio-best-mutually-exclusive
    file: examples/radio/best-mutually-exclusive.tsx
    category: best-practice
  - id: radio-best-always-label
    file: examples/radio/best-always-label.tsx
    category: best-practice
  - id: radio-best-group-options
    file: examples/radio/best-group-options.tsx
    category: best-practice
  - id: radio-anti-without-group
    file: examples/radio/anti-without-group.tsx
    category: anti-pattern
  - id: radio-anti-multi-select
    file: examples/radio/anti-multi-select.tsx
    category: anti-pattern
  - id: radio-anti-unlabeled
    file: examples/radio/anti-unlabeled.tsx
    category: anti-pattern
---

# Radio

## Overview

`Radio` represents **one option** in a mutually exclusive set. It maps to Flutter's [`Radio`](https://api.flutter.dev/flutter/material/Radio-class.html) and renders a native **`<input type="radio">`**.

**`Radio` must be used inside [`RadioGroup`](/docs/widgets/forms/radio-group).** Selection state — `value`, `defaultValue`, `onChange$`, and `name` — lives on **`RadioGroup`**, not on individual `Radio` widgets. Each `Radio` only declares its option **`value`** (string) and optional **`label`**.

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Mutually exclusive selection** | Only one option in a group can be selected at a time |
| **Single-choice inputs** | Submit value is a single **`string`** token (`FormValues[name]`) |
| **Grouped behavior** | `RadioGroup` owns checked state; `Radio` derives `checked` from group selection === `value` |

### When to use Radio

- Choose **one** plan, payment method, shipping speed, or language
- Settings where options exclude each other
- Forms that submit a single string enum-like value

### Radio vs Checkbox vs Switch

| | `Radio` + `RadioGroup` | `Checkbox` | `Switch` |
| --- | --- | --- | --- |
| **Selection** | Exactly one from a set | Independent booleans | Independent boolean |
| **Value type** | `string` | `boolean` | `boolean` |
| **Typical use** | Plan tier, payment type | Terms, multi-select lists | On/off settings |
| **Grouping** | **Required** (`RadioGroup`) | Optional | Optional |

Use **`Checkbox`** or **`Switch`** when multiple options can be on simultaneously. Use **`Radio`** when picking one option disables the others.

---

## Import

```tsx
import {
  Button,
  Column,
  Form,
  Radio,
  RadioGroup,
  RadioGroupFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

import type { FormValues } from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working setup — `RadioGroup` with two `Radio` options and a group legend.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="size" legend="Size" defaultValue="medium">
      <Column gap={8}>
        <Radio value="small" label="Small" />
        <Radio value="medium" label="Medium" />
        <Radio value="large" label="Large" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-basic`).

---

## Common Usage

Each example wraps `Radio` options in `RadioGroup` with a descriptive **`legend`**.

### Select Gender

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="gender" legend="Gender" defaultValue="prefer-not">
      <Column gap={8}>
        <Radio value="female" label="Female" />
        <Radio value="male" label="Male" />
        <Radio value="non-binary" label="Non-binary" />
        <Radio value="prefer-not" label="Prefer not to say" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-select-gender`).

---

### Select Theme

Controlled group — theme applies when selection changes.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const theme = useSignal("system");

  return (
    <ThemeProvider theme={{}}>
      <RadioGroup
        name="theme"
        legend="Color theme"
        value={theme.value}
        onChange$={$((next) => {
          theme.value = next;
        })}
      >
        <Column gap={8}>
          <Radio value="light" label="Light" />
          <Radio value="dark" label="Dark" />
          <Radio value="system" label="System default" />
        </Column>
      </RadioGroup>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-select-theme`).

---

### Select Payment Method

Required selection in a checkout form.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Column, Form, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <RadioGroup
        name="payment"
        legend="Payment method"
        required
        defaultValue="card"
      >
        <Column gap={8}>
          <Radio value="card" label="Credit or debit card" />
          <Radio value="paypal" label="PayPal" />
          <Radio value="bank" label="Bank transfer" />
        </Column>
      </RadioGroup>
      <Button type="submit">Continue</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-select-payment`).

---

### Select Language

Compact list of locale options.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="language" legend="Language" defaultValue="en">
      <Column gap={8}>
        <Radio value="en" label="English" />
        <Radio value="es" label="Español" />
        <Radio value="fr" label="Français" />
        <Radio value="de" label="Deutsch" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-select-language`).

---

## State Management

Selection is always managed by **`RadioGroup`**. Individual `Radio` widgets do not accept `checked` or `onChange$`.

### Controlled Radio

Pass **`value`** and **`onChange$`** on **`RadioGroup`**. Each `Radio` reflects whether its `value` matches the group selection.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const plan = useSignal("free");

  return (
    <ThemeProvider theme={{}}>
      <RadioGroup
        name="plan"
        legend="Billing plan"
        value={plan.value}
        onChange$={$((next) => {
          plan.value = next;
        })}
      >
        <Column gap={8}>
          <Radio value="free" label="Free" />
          <Radio value="pro" label="Pro" />
        </Column>
      </RadioGroup>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-controlled`).

---

### Grouped Selection

Uncontrolled group with **`defaultValue`** — the group tracks selection internally after mount.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="shipping" legend="Shipping speed" defaultValue="standard">
      <Column gap={8}>
        <Radio value="standard" label="Standard (5–7 days)" />
        <Radio value="express" label="Express (2–3 days)" />
        <Radio value="overnight" label="Overnight" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-grouped-selection`).

---

### Behavior differences

| | Controlled (`RadioGroup`) | Uncontrolled (`RadioGroup`) |
| --- | --- | --- |
| **Props** | `value` + `onChange$` | `defaultValue` |
| **State owner** | Parent signal / store | Internal + DOM |
| **SSR** | Pass server `value` from props | `defaultValue` in static HTML |
| **`Radio` role** | Declares options only | Declares options only |

Never pass **`value`** and **`defaultValue`** together on `RadioGroup`.

---

## Labels

Each `Radio` should have a **`label`**. The group should have a **`legend`** (or `aria-label`) naming the set.

### Inline Label

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="priority" legend="Priority" defaultValue="normal">
      <Column gap={8}>
        <Radio value="low" label="Low" />
        <Radio value="normal" label="Normal" />
        <Radio value="high" label="High" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-label-inline`).

---

### Long Label

Option labels can be full sentences — useful for plan descriptions.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="plan" legend="Choose a plan" defaultValue="free">
      <Column gap={8}>
        <Radio
          value="free"
          label="Free — basic features for personal projects"
        />
        <Radio
          value="pro"
          label="Pro — advanced features and priority support"
        />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-label-long`).

---

### Required Selection

Set **`required`** on **`RadioGroup`** so native validation requires one option before submit.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Column, Form, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <RadioGroup name="plan" legend="Billing plan" required>
        <Column gap={8}>
          <Radio value="free" label="Free" />
          <Radio value="pro" label="Pro" />
        </Column>
      </RadioGroup>
      <Button type="submit">Continue</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-label-required`).

---

### Recommended labeling practices

- Provide **`legend`** on `RadioGroup` — it names the set for screen readers
- Give every **`Radio`** a **`label`** — do not rely on value tokens alone
- Keep option labels parallel in structure ("Free", "Pro", "Enterprise" — not mixed formats)

---

## Form Integration

`RadioGroup` registers with **`Form`** and submits **`FormValues[name]`** as a **`string`**.

### Radio in Form

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Column,
  Form,
  Radio,
  RadioGroup,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log(values.plan); // string
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <RadioGroup name="plan" legend="Plan" defaultValue="free">
          <Column gap={8}>
            <Radio value="free" label="Free" />
            <Radio value="pro" label="Pro" />
          </Column>
        </RadioGroup>
        <Button type="submit">Save</Button>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-in-form`).

---

### Required Selection

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Form,
  Radio,
  RadioGroup,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <RadioGroup name="country" legend="Country" required>
        <Column gap={8}>
          <Radio value="us" label="United States" />
          <Radio value="ca" label="Canada" />
          <Radio value="uk" label="United Kingdom" />
        </Column>
      </RadioGroup>
      <Button type="submit">Submit</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-required-selection`).

---

### Validation Example

Use **`RadioGroupFormField`** for custom **`validator$`** messages and helper/error decoration.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Form,
  Radio,
  RadioGroupFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <RadioGroupFormField
        name="plan"
        required
        decoration={{
          label: "Billing plan",
          helperText: "Choose a billing plan",
        }}
        validator$={$((v) =>
          v === "" ? "Please select a plan" : undefined,
        )}
      >
        <Column gap={8}>
          <Radio value="free" label="Free" />
          <Radio value="pro" label="Pro" />
        </Column>
      </RadioGroupFormField>
      <Button type="submit">Submit</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-validation-example`).

---

### Recommended patterns

1. Wrap options in **`RadioGroup`** with required **`name`**
2. Provide **`legend`** or **`aria-label`** on the group
3. Use **`RadioGroupFormField`** when you need **`validator$`** or helper/error text
4. Submit with **`<Button type="submit">`**
5. Narrow **`FormValues`** at the handler (`values.plan as "free" | "pro"`)

---

## Validation

| Mechanism | Where | Behavior |
| --- | --- | --- |
| **`required`** | `RadioGroup` | Native constraint — one option must be selected |
| **`validator$`** | `RadioGroupFormField` | Returns error string or `undefined`; blocks submit when invalid |
| **`Form.autovalidateMode`** | `Form` | Controls when `validator$` runs |

`Radio` itself has no validator — validation applies to the **group**.

### Required Selection

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Column, Form, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <RadioGroup name="tier" legend="Support tier" required>
        <Column gap={8}>
          <Radio value="basic" label="Basic" />
          <Radio value="premium" label="Premium" />
        </Column>
      </RadioGroup>
      <Button type="submit">Continue</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-required-validation`).

---

### Custom Validation

Business rules on the selected string token.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AutovalidateMode,
  Button,
  Column,
  Form,
  Radio,
  RadioGroupFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form
      autovalidateMode={AutovalidateMode.onUserInteraction}
      onSubmit$={$(() => {})}
    >
      <RadioGroupFormField
        name="plan"
        decoration={{ label: "Billing plan" }}
        validator$={$((v) => {
          if (v === "") return "Select a plan to continue";
          if (v === "enterprise") return "Contact sales for Enterprise";
          return undefined;
        })}
      >
        <Column gap={8}>
          <Radio value="free" label="Free" />
          <Radio value="pro" label="Pro" />
          <Radio value="enterprise" label="Enterprise" />
        </Column>
      </RadioGroupFormField>
      <Button type="submit">Submit</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-custom-validation`).

---

## Variations

Each example demonstrates **one concept** only. Variations apply to **`RadioGroup`** and individual **`Radio`** options.

### Disabled

Disable the entire group or individual options.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup
      name="plan"
      legend="Plan"
      defaultValue="free"
      disabled
    >
      <Column gap={8}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro (unavailable)" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-disabled`).

---

### Default Selection

Pre-select an option with **`defaultValue`** on `RadioGroup`.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="plan" legend="Plan" defaultValue="pro">
      <Column gap={8}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-default-selection`).

---

### Read Only

`Radio` does not ship **`readOnly`** in v1. Use **`disabled`** on `RadioGroup` to show the current selection without allowing changes.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup
      name="plan"
      legend="Current plan (managed by billing)"
      defaultValue="pro"
      disabled
    >
      <Column gap={8}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-non-editable`).

---

## Radio vs Checkbox

| Scenario | Use **Radio** | Use **Checkbox** |
| --- | --- | --- |
| **Single choice** | Pick one plan, one payment method | — |
| **Multiple choice** | — | Select any combination of add-ons |
| **User expectations** | "Choose one of these" | "Check all that apply" |

### Radio

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="plan" legend="Choose one plan" defaultValue="free">
      <Column gap={8}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-vs-checkbox-radio`).

---

### Checkbox

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Checkbox, Column, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Column gap={8}>
      <Checkbox label="Email updates" />
      <Checkbox label="SMS alerts" />
      <Checkbox label="Push notifications" />
    </Column>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-vs-checkbox-checkbox`).

---

### Guidance summary

- **Radio** — mutually exclusive options; exactly one selected value
- **Checkbox** — independent toggles; zero or more can be checked
- **Switch** — single boolean on/off settings, not a list of alternatives

---

## Best Practices

### Use Radio for mutually exclusive choices

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="delivery" legend="Delivery window" defaultValue="morning">
      <Column gap={8}>
        <Radio value="morning" label="Morning (8am–12pm)" />
        <Radio value="afternoon" label="Afternoon (12pm–5pm)" />
        <Radio value="evening" label="Evening (5pm–9pm)" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-best-mutually-exclusive`).

---

### Always provide labels

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="size" legend="T-shirt size" defaultValue="m">
      <Column gap={8}>
        <Radio value="s" label="Small" />
        <Radio value="m" label="Medium" />
        <Radio value="l" label="Large" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-best-always-label`).

---

### Group related options

Use **`RadioGroup`** + **`Column gap`** — never scatter related radios without a fieldset.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="billing" legend="Billing cycle" defaultValue="monthly">
      <Column gap={8}>
        <Radio value="monthly" label="Monthly" />
        <Radio value="yearly" label="Yearly (save 20%)" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radio-best-group-options`).

---

## Anti-Patterns

### Single Radio without grouping

**Source** (avoid)

```tsx
<Radio value="yes" label="Yes" />
```

**Preferred**

```tsx
<RadioGroup name="confirm" legend="Confirm action" defaultValue="yes">
  <Column gap={8}>
    <Radio value="yes" label="Yes" />
    <Radio value="no" label="No" />
  </Column>
</RadioGroup>
```

**Why:** `Radio` outside `RadioGroup` renders a disabled inert fallback. Selection state and form registration require `RadioGroup`.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: radio-anti-without-group`, `preview: false`).

---

### Radio for multi-select behavior

**Source** (avoid)

```tsx
{/* Using separate RadioGroups or checkboxes styled as radios for multi-select */}
<RadioGroup name="tags" legend="Tags">
  <Radio value="design" label="Design" />
</RadioGroup>
<RadioGroup name="tags" legend="">
  <Radio value="engineering" label="Engineering" />
</RadioGroup>
```

**Preferred**

```tsx
import { Checkbox, Column } from "qwik-flutter-ui";

<Column gap={8}>
  <Checkbox name="tagDesign" label="Design" />
  <Checkbox name="tagEngineering" label="Engineering" />
</Column>
```

**Why:** Radio groups enforce single selection. Multiple independent choices need **`Checkbox`**.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: radio-anti-multi-select`, `preview: false`).

---

### Unlabeled Radio controls

**Source** (avoid)

```tsx
<RadioGroup name="plan" legend="Plan">
  <Radio value="free" />
  <Radio value="pro" />
</RadioGroup>
```

**Preferred**

```tsx
<RadioGroup name="plan" legend="Plan" defaultValue="free">
  <Column gap={8}>
    <Radio value="free" label="Free" />
    <Radio value="pro" label="Pro" />
  </Column>
</RadioGroup>
```

**Why:** Without per-option labels, users and screen readers cannot distinguish choices — only the group legend is announced.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: radio-anti-unlabeled`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Label association** | Each `Radio` `label` → `<label for={inputId}>`. Group **`legend`** names the set |
| **Keyboard interaction** | Arrow keys move between radios in the group (browser default); **Space** selects focused option |
| **Screen reader expectations** | Announces as radio; position in set ("1 of 3"); group name from legend |
| **Checked state announcements** | Browser announces selected option when focus moves or selection changes |
| **Required state** | Native `required` on `RadioGroup` — one option must be selected |

Provide **`legend`**, **`aria-label`**, or **`aria-labelledby`** on `RadioGroup` for an accessible group name.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | `<fieldset>`, `<legend>`, and native radio inputs render on the server |
| **Initial selection** | **`defaultValue`** on `RadioGroup` marks the matching radio `checked` in HTML |
| **Controlled resume** | Pass server **`value`** on `RadioGroup` for controlled fields after hydration |
| **Resumability** | Markup serializes into HTML; **`onChange$`** hydrates lazily as a QRL |
| **Progressive enhancement** | Native **`name`** / **`value`** participate in HTML form POST without JavaScript |
| **FormValues** | Selected option token submitted as **`string`** in `onSubmit$` |

Option **`value`** props are always strings — encode numbers or enums as strings (e.g. `"2"`, `"plan_pro"`).

---

## Flutter Equivalent

| Topic | Flutter `Radio` | qwik-flutter-ui `Radio` |
| --- | --- | --- |
| **Group value** | `groupValue` on each `Radio` | Owned by `RadioGroup.value` / `defaultValue` |
| **Option value** | Generic `T` | **`string` only** in v1 |
| **Change handler** | `onChanged` on each `Radio` | **`onChange$`** on `RadioGroup` only |
| **Checked** | `value == groupValue` | Derived from group context |
| **Standalone use** | Supported with manual `groupValue` | **Must use `RadioGroup`** in v1 |
| **DOM** | Skia render tree | Native `<input type="radio">` in `<fieldset>` |

**Flutter**

```dart
Column(
  children: [
    Radio<String>(
      value: 'free',
      groupValue: plan,
      onChanged: (v) => setState(() => plan = v),
    ),
    Radio<String>(
      value: 'pro',
      groupValue: plan,
      onChanged: (v) => setState(() => plan = v),
    ),
  ],
)
```

**qwik-flutter-ui**

```tsx
<RadioGroup
  name="plan"
  legend="Plan"
  value={plan.value}
  onChange$={$((next) => {
    plan.value = next;
  })}
>
  <Column gap={8}>
    <Radio value="free" label="Free" />
    <Radio value="pro" label="Pro" />
  </Column>
</RadioGroup>
```

Similarities: mutually exclusive selection, disabled options, form-friendly string values.

Differences: group-owned state, native HTML fieldset/legend, string-only values, no per-radio `onChange$`.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [RadioGroup](/docs/widgets/forms/radio-group) | **Required parent** — owns selection state, `name`, and `onChange$` |
| [RadioGroupFormField](/docs/widgets/forms/radio-group-form-field) | Validated group with decoration and `validator$` |
| [Checkbox](/docs/widgets/forms/checkbox) | Independent booleans — multi-select and opt-in |
| [Switch](/docs/widgets/forms/switch) | Boolean on/off settings — not mutually exclusive lists |
| [Form](/docs/widgets/forms/form) | Parent for string submit payloads and validation timing |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/radio/`
- **`category`** — groups examples (`basic`, `common`, `state`, `labels`, `form-integration`, `validation`, `variation`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to `RadioGroup` and selection controls
- **`flutterEquivalent`** — `Radio`

When adding examples, always wrap `Radio` in **`RadioGroup`**, provide **`legend`** and per-option **`label`**, wrap **`onChange$`** and **`validator$`** with **`$()`**, and import only from `qwik-flutter-ui`.
