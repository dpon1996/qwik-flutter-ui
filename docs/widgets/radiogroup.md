---
title: RadioGroup
description: Mutually exclusive radio set with fieldset grouping, selection state ownership, and Form registration.
widget: RadioGroup
category: forms
flutterEquivalent: RadioListTile / groupValue pattern
status: shipped
related:
  - Radio
  - RadioGroupFormField
  - Dropdown
  - Checkbox
  - Form
since: "0.0.1"
examples:
  - id: radiogroup-basic
    file: examples/radiogroup/basic.tsx
    category: basic
  - id: radiogroup-payment
    file: examples/radiogroup/payment.tsx
    category: common
  - id: radiogroup-theme
    file: examples/radiogroup/theme.tsx
    category: common
  - id: radiogroup-language
    file: examples/radiogroup/language.tsx
    category: common
  - id: radiogroup-shipping
    file: examples/radiogroup/shipping.tsx
    category: common
  - id: radiogroup-controlled
    file: examples/radiogroup/controlled.tsx
    category: state
  - id: radiogroup-uncontrolled
    file: examples/radiogroup/uncontrolled.tsx
    category: state
  - id: radiogroup-group-label
    file: examples/radiogroup/group-label.tsx
    category: labels
  - id: radiogroup-group-description
    file: examples/radiogroup/group-description.tsx
    category: labels
  - id: radiogroup-required-selection
    file: examples/radiogroup/required-selection.tsx
    category: labels
  - id: radiogroup-in-form
    file: examples/radiogroup/in-form.tsx
    category: form-integration
  - id: radiogroup-registration
    file: examples/radiogroup/registration.tsx
    category: form-integration
  - id: radiogroup-checkout
    file: examples/radiogroup/checkout.tsx
    category: form-integration
  - id: radiogroup-required-validation
    file: examples/radiogroup/required-validation.tsx
    category: validation
  - id: radiogroup-custom-validation
    file: examples/radiogroup/custom-validation.tsx
    category: validation
  - id: radiogroup-error-messaging
    file: examples/radiogroup/error-messaging.tsx
    category: validation
  - id: radiogroup-disabled
    file: examples/radiogroup/disabled.tsx
    category: variation
  - id: radiogroup-default-selection
    file: examples/radiogroup/default-selection.tsx
    category: variation
  - id: radiogroup-non-editable
    file: examples/radiogroup/non-editable.tsx
    category: variation
  - id: radiogroup-long-labels
    file: examples/radiogroup/long-labels.tsx
    category: variation
  - id: radiogroup-vs-dropdown-radiogroup
    file: examples/radiogroup/vs-dropdown-radiogroup.tsx
    category: comparison
  - id: radiogroup-vs-dropdown-dropdown
    file: examples/radiogroup/vs-dropdown-dropdown.tsx
    category: comparison
  - id: radiogroup-best-small-sets
    file: examples/radiogroup/best-small-sets.tsx
    category: best-practice
  - id: radiogroup-best-clear-labels
    file: examples/radiogroup/best-clear-labels.tsx
    category: best-practice
  - id: radiogroup-best-meaningful-defaults
    file: examples/radiogroup/best-meaningful-defaults.tsx
    category: best-practice
  - id: radiogroup-anti-too-many
    file: examples/radiogroup/anti-too-many.tsx
    category: anti-pattern
  - id: radiogroup-anti-unclear-labels
    file: examples/radiogroup/anti-unclear-labels.tsx
    category: anti-pattern
  - id: radiogroup-anti-large-datasets
    file: examples/radiogroup/anti-large-datasets.tsx
    category: anti-pattern
---

# RadioGroup

## Overview

`RadioGroup` owns **mutually exclusive selection** for a set of [`Radio`](/docs/widgets/forms/radio) options. It maps to Flutter's pattern of sharing **`groupValue`** across [`Radio`](https://api.flutter.dev/flutter/material/Radio-class.html) / [`RadioListTile`](https://api.flutter.dev/flutter/material/RadioListTile-class.html) widgets and renders a native **`<fieldset>`** with optional **`<legend>`**.

`RadioGroup` is the **state owner** — `name`, `value`, `defaultValue`, `onChange$`, `disabled`, and `required` live here. Child `Radio` widgets only declare option **`value`** and **`label`**.

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Mutually exclusive selection** | Exactly one option selected; selecting another deselects the previous |
| **Grouped Radio controls** | Shared `name` on native inputs; keyboard and screen-reader group semantics |
| **Form integration** | Registers with `Form` → `FormValues[name]` is a **`string`** token |
| **Validation** | Native `required` on the group; custom rules via **`RadioGroupFormField`** + `validator$` |

### When to use RadioGroup

- **Small choice sets** (typically 2–7 options) where all choices should be visible
- Payment method, shipping speed, plan tier, theme, or language selection
- Forms that submit a single string enum-like value

### Radio vs RadioGroup vs Dropdown

| | `Radio` | `RadioGroup` | `Dropdown` |
| --- | --- | --- | --- |
| **Role** | One option | Container + state owner | Single-choice `<select>` |
| **Use alone** | No — requires `RadioGroup` | Yes — wraps `Radio` children | Yes — `options` prop |
| **Options visible** | All options shown | All options shown | Collapsed until opened |
| **Best for** | Declaring option tokens | Grouping and form wiring | Long lists, many choices |
| **Value type** | `string` per option | Selected `string` | Selected `string` |

---

## Import

```tsx
import {
  AutovalidateMode,
  Button,
  Column,
  Dropdown,
  Form,
  Radio,
  RadioGroup,
  RadioGroupFormField,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

import type { DropdownOption, FormValues } from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working `RadioGroup` with two options and a legend.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="plan" legend="Plan" defaultValue="free">
      <Column gap={8}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-basic`).

---

## Common Usage

### Payment Method

Checkout-style payment selection with a sensible default.

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-payment`).

---

### Theme Selection

Controlled group — apply theme when selection changes.

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-theme`).

---

### Language Selection

Uncontrolled group with initial locale.

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-language`).

---

### Shipping Method

Delivery window with price hints in option labels.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="shipping" legend="Shipping method" defaultValue="standard">
      <Column gap={8}>
        <Radio value="standard" label="Standard — free (5–7 days)" />
        <Radio value="express" label="Express — $9.99 (2–3 days)" />
        <Radio value="overnight" label="Overnight — $19.99" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-shipping`).

---

## State Management

### Controlled RadioGroup

Pass **`value`** and **`onChange$`**. The parent owns the selected token.

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-controlled`).

---

### Uncontrolled RadioGroup

Use **`defaultValue`** for SSR-friendly initial selection.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="tier" legend="Support tier" defaultValue="basic">
      <Column gap={8}>
        <Radio value="basic" label="Basic" />
        <Radio value="premium" label="Premium" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-uncontrolled`).

---

### Behavior differences

| | Controlled | Uncontrolled |
| --- | --- | --- |
| **Props** | `value` + `onChange$` | `defaultValue` |
| **State owner** | Parent signal / store | Internal + DOM |
| **SSR** | Server `value` from props | `defaultValue` in static HTML |
| **When to use** | Live UI reacting to selection | Simple forms with fixed defaults |

Never pass **`value`** and **`defaultValue`** together.

---

## Labels and Legends

### Group Label

Use **`legend`** on `RadioGroup` — renders `<legend>` inside the fieldset.

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-group-label`).

---

### Group Description

Use **`RadioGroupFormField`** with **`decoration.helperText`** for supporting copy below the group.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroupFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroupFormField
      name="plan"
      defaultValue="free"
      decoration={{
        label: "Billing plan",
        helperText: "You can change your plan anytime in account settings.",
      }}
    >
      <Column gap={8}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </Column>
    </RadioGroupFormField>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-group-description`).

---

### Required Selection

Set **`required`** on the group for native validation.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Column, Form, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <RadioGroup name="plan" legend="Choose a plan" required>
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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-required-selection`).

---

### Legend vs decoration.label

| Source | Renders | When to use |
| --- | --- | --- |
| **`legend`** on `RadioGroup` | `<legend>` | Plain groups outside validated form chrome |
| **`decoration.label`** on `RadioGroupFormField` | `<legend>` via decoration | Forms with helper/error text and consistent field styling |

When both `legend` and `decoration.label` are set on `RadioGroupFormField`, **`decoration.label` wins** (FD10). Provide one group name, not both.

### Accessibility expectations

- Every group needs an accessible name: **`legend`**, **`aria-label`**, or **`aria-labelledby`**
- Each `Radio` needs its own **`label`** for the option text
- Helper and error text link via **`aria-describedby`** on the fieldset when using `RadioGroupFormField`

---

## Form Integration

### RadioGroup in Form

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
    console.log(values.plan);
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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-in-form`).

---

### Registration Form

Plan selection alongside text fields.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Form,
  Radio,
  RadioGroupFormField,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Column gap={16}>
        <TextFormField
          name="email"
          required
          decoration={{ label: "Email" }}
        />
        <RadioGroupFormField
          name="plan"
          required
          defaultValue="free"
          decoration={{
            label: "Billing plan",
            helperText: "Choose a billing plan",
          }}
        >
          <Column gap={8}>
            <Radio value="free" label="Free" />
            <Radio value="pro" label="Pro" />
          </Column>
        </RadioGroupFormField>
        <Button type="submit">Create account</Button>
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-registration`).

---

### Checkout Flow

Multiple independent groups in one form — each with its own `name`.

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
    console.log(values.payment, values.shipping);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={24}>
          <RadioGroup
            name="payment"
            legend="Payment method"
            defaultValue="card"
            required
          >
            <Column gap={8}>
              <Radio value="card" label="Card" />
              <Radio value="paypal" label="PayPal" />
            </Column>
          </RadioGroup>
          <RadioGroup
            name="shipping"
            legend="Shipping speed"
            defaultValue="standard"
            required
          >
            <Column gap={8}>
              <Radio value="standard" label="Standard" />
              <Radio value="express" label="Express" />
            </Column>
          </RadioGroup>
          <Button type="submit">Place order</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-checkout`).

---

### Recommended patterns

1. Set required **`name`** on every `RadioGroup` inside **`Form`**
2. Provide **`legend`** or use **`RadioGroupFormField`** with **`decoration.label`**
3. Give each **`Radio`** a **`label`**
4. Use **`RadioGroupFormField`** when you need **`validator$`** or helper/error decoration
5. Narrow **`FormValues`** at submit (`values.plan as "free" | "pro"`)

---

## Validation

| Mechanism | Where | Behavior |
| --- | --- | --- |
| **`required`** | `RadioGroup` | Native — one option must be selected before submit |
| **`validator$`** | `RadioGroupFormField` | QRL returning error string or `undefined` |
| **`Form.autovalidateMode`** | `Form` | Controls when `validator$` runs between submits |

### Required Selection

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Column, Form, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-required-validation`).

---

### Custom Validation

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-custom-validation`).

---

### Error Messaging

Validator output and `decoration.errorText` render with **`role="alert"`** and set **`aria-invalid`** on the fieldset.

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
        decoration={{ label: "Billing plan" }}
        validator$={$((v) =>
          v === "" ? "Please select a billing plan" : undefined,
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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-error-messaging`).

---

## Variations

Each example demonstrates **one concept** only.

### Disabled Group

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup
      name="plan"
      legend="Plan (locked)"
      defaultValue="free"
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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-disabled`).

---

### Default Selection

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-default-selection`).

---

### Read Only Group

`RadioGroup` does not ship **`readOnly`** in v1. Use **`disabled`** to display the current selection without allowing changes.

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-non-editable`).

---

### Long Option Labels

Descriptive labels for plans or shipping tiers — wrap naturally in the option row.

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
          label="Free — basic features for personal projects at no cost"
        />
        <Radio
          value="pro"
          label="Pro — advanced features, team collaboration, and priority support"
        />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-long-labels`).

---

## RadioGroup vs Dropdown

Both submit a single **`string`** value. Choose based on option count and discoverability.

| Factor | **RadioGroup** | **Dropdown** |
| --- | --- | --- |
| **Visible options** | All options always visible | Options hidden until opened |
| **Discoverability** | High — users scan all choices | Lower — must open to see list |
| **Number of choices** | Best for **small sets** (≈2–7) | Best for **long lists** (8+) |
| **User experience** | Compare options side by side | Compact; saves vertical space |
| **Mobile** | More scrolling with many options | Native picker on many devices |

### RadioGroup

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-vs-dropdown-radiogroup`).

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
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "in", label: "India" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      name="country"
      label="Country"
      options={COUNTRIES}
      placeholder="Select a country"
      defaultValue="us"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-vs-dropdown-dropdown`).

---

### Guidance summary

- **RadioGroup** — few options where comparing labels matters (shipping, plans, payment types)
- **Dropdown** — country lists, category pickers, or anywhere vertical space is limited
- **Rule of thumb** — if users benefit from seeing every option at once, use `RadioGroup`; otherwise use `Dropdown`

---

## Best Practices

### Use for small choice sets

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-best-small-sets`).

---

### Keep labels clear

Parallel structure across options — same grammatical pattern.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="billing" legend="Billing cycle" defaultValue="monthly">
      <Column gap={8}>
        <Radio value="monthly" label="Monthly billing" />
        <Radio value="yearly" label="Yearly billing (save 20%)" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-best-clear-labels`).

---

### Use meaningful defaults

Pre-select the most common or safest option — not always the highest tier.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { Column, Radio, RadioGroup, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <RadioGroup name="shipping" legend="Shipping" defaultValue="standard">
      <Column gap={8}>
        <Radio value="standard" label="Standard (free)" />
        <Radio value="express" label="Express ($9.99)" />
      </Column>
    </RadioGroup>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: radiogroup-best-meaningful-defaults`).

---

## Anti-Patterns

### Too many options

**Source** (avoid)

```tsx
<RadioGroup name="country" legend="Country">
  {/* 50+ Radio options */}
</RadioGroup>
```

**Preferred**

Use **`Dropdown`** with an `options` array for long lists.

**Why:** Long radio lists push content down, slow scanning, and hurt mobile usability.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: radiogroup-anti-too-many`, `preview: false`).

---

### Unclear labels

**Source** (avoid)

```tsx
<RadioGroup name="plan" legend="Plan">
  <Radio value="1" label="Option 1" />
  <Radio value="2" label="Option 2" />
</RadioGroup>
```

**Preferred**

```tsx
<RadioGroup name="plan" legend="Billing plan" defaultValue="free">
  <Column gap={8}>
    <Radio value="free" label="Free" />
    <Radio value="pro" label="Pro" />
  </Column>
</RadioGroup>
```

**Why:** Opaque value tokens and generic labels force users to guess what each option means.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: radiogroup-anti-unclear-labels`, `preview: false`).

---

### Using RadioGroup for large datasets

**Source** (avoid)

```tsx
{/* Rendering hundreds of Radio options from an API */}
<RadioGroup name="city" legend="City">
  {cities.map((c) => (
    <Radio key={c.id} value={c.id} label={c.name} />
  ))}
</RadioGroup>
```

**Preferred**

```tsx
<Dropdown
  name="city"
  label="City"
  options={cityOptions}
  placeholder="Search or select a city"
/>
```

**Why:** Searchable or scrollable single-select controls scale better than massive radio lists.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: radiogroup-anti-large-datasets`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Fieldset / legend** | `RadioGroup` renders `<fieldset>`; `legend` or `decoration.label` names the group |
| **Keyboard navigation** | Arrow keys move between radios in the group; **Space** selects the focused option |
| **Screen reader expectations** | Group name from legend; each option announces label and position ("2 of 3") |
| **Validation announcements** | `RadioGroupFormField` errors use **`role="alert"`**; fieldset gets **`aria-invalid`** |
| **Required state** | Native **`required`** on the group — one option must be selected |

Provide **`legend`**, **`aria-label`**, or **`aria-labelledby`** on every `RadioGroup`. Development builds warn when no accessible name is present.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | `<fieldset>`, `<legend>`, and radio inputs render complete markup on the server |
| **Initial selection** | **`defaultValue`** marks the matching radio `checked` in HTML |
| **Controlled resume** | Pass server **`value`** for controlled groups after hydration |
| **Resumability** | Structure serializes into HTML; **`onChange$`** and **`validator$`** hydrate as QRLs |
| **Progressive enhancement** | Native **`name`** / **`value`** participate in HTML POST without JavaScript |
| **FormValues** | Selected token submitted as **`string`** in `onSubmit$` |

Option values are always **strings** — encode numbers or enums as strings (`"2"`, `"plan_pro"`).

---

## Flutter Equivalent

Flutter has no single `RadioGroup` widget — you compose multiple `Radio` / `RadioListTile` widgets sharing **`groupValue`**.

| Topic | Flutter pattern | qwik-flutter-ui `RadioGroup` |
| --- | --- | --- |
| **Group value** | `groupValue` on each `Radio` | `value` / `defaultValue` on `RadioGroup` |
| **Change handler** | `onChanged` on each `Radio` | **`onChange$`** on `RadioGroup` only |
| **Grouping** | `Column` of radios | `<fieldset>` + context |
| **Label** | `RadioListTile(title: …)` | `legend` + per-`Radio` `label` |
| **Form value** | Manual state | `FormValues[name]: string` |
| **Value type** | Generic `T` | **`string` only** in v1 |

**Flutter**

```dart
Column(
  children: [
    RadioListTile<String>(
      title: Text('Free'),
      value: 'free',
      groupValue: plan,
      onChanged: (v) => setState(() => plan = v),
    ),
    RadioListTile<String>(
      title: Text('Pro'),
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

Similarities: mutually exclusive selection, disabled group, string-like option tokens.

Differences: centralized state owner, native fieldset semantics, single `onChange$`, no generic value type in v1.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Radio](/docs/widgets/forms/radio) | Child option — declares `value` and `label` only |
| [RadioGroupFormField](/docs/widgets/forms/radio-group-form-field) | Validated group with decoration and `validator$` |
| [Dropdown](/docs/widgets/forms/dropdown) | Single-choice alternative for long option lists |
| [Checkbox](/docs/widgets/forms/checkbox) | Independent booleans — not mutually exclusive |
| [Form](/docs/widgets/forms/form) | Parent for string submit payloads and validation timing |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/radiogroup/`
- **`category`** — groups examples (`basic`, `common`, `state`, `labels`, `form-integration`, `validation`, `variation`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to `Radio`, `Dropdown`, and form widgets
- **`flutterEquivalent`** — `RadioListTile` / `groupValue` pattern

When adding examples, always include **`name`** and an accessible group name, wrap **`Radio`** children in **`Column gap`**, wrap **`onChange$`** and **`validator$`** with **`$()`**, and import only from `qwik-flutter-ui`.
