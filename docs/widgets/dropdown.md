---
title: Dropdown
description: Single-choice selection via native select with compact presentation, option data arrays, and form registration.
widget: Dropdown
category: forms
flutterEquivalent: DropdownButton
status: shipped
related:
  - DropdownFormField
  - RadioGroup
  - Checkbox
  - Form
  - TextFormField
since: "0.0.1"
examples:
  - id: dropdown-basic
    file: examples/dropdown/basic.tsx
    category: basic
  - id: dropdown-country
    file: examples/dropdown/country.tsx
    category: common
  - id: dropdown-language
    file: examples/dropdown/language.tsx
    category: common
  - id: dropdown-theme
    file: examples/dropdown/theme.tsx
    category: common
  - id: dropdown-category
    file: examples/dropdown/category.tsx
    category: common
  - id: dropdown-controlled
    file: examples/dropdown/controlled.tsx
    category: state
  - id: dropdown-uncontrolled
    file: examples/dropdown/uncontrolled.tsx
    category: state
  - id: dropdown-label
    file: examples/dropdown/label.tsx
    category: decoration
  - id: dropdown-helper
    file: examples/dropdown/helper.tsx
    category: decoration
  - id: dropdown-required-indicator
    file: examples/dropdown/required-indicator.tsx
    category: decoration
  - id: dropdown-error
    file: examples/dropdown/error.tsx
    category: decoration
  - id: dropdown-placeholder
    file: examples/dropdown/placeholder.tsx
    category: decoration
  - id: dropdown-in-form
    file: examples/dropdown/in-form.tsx
    category: form-integration
  - id: dropdown-registration
    file: examples/dropdown/registration.tsx
    category: form-integration
  - id: dropdown-checkout
    file: examples/dropdown/checkout.tsx
    category: form-integration
  - id: dropdown-required-validation
    file: examples/dropdown/required-validation.tsx
    category: validation
  - id: dropdown-custom-validation
    file: examples/dropdown/custom-validation.tsx
    category: validation
  - id: dropdown-error-messaging
    file: examples/dropdown/error-messaging.tsx
    category: validation
  - id: dropdown-disabled
    file: examples/dropdown/disabled.tsx
    category: variation
  - id: dropdown-default-selection
    file: examples/dropdown/default-selection.tsx
    category: variation
  - id: dropdown-long-labels
    file: examples/dropdown/long-labels.tsx
    category: variation
  - id: dropdown-large-option-set
    file: examples/dropdown/large-option-set.tsx
    category: variation
  - id: dropdown-vs-radiogroup-dropdown
    file: examples/dropdown/vs-radiogroup-dropdown.tsx
    category: comparison
  - id: dropdown-vs-radiogroup-radiogroup
    file: examples/dropdown/vs-radiogroup-radiogroup.tsx
    category: comparison
  - id: dropdown-best-medium-large-sets
    file: examples/dropdown/best-medium-large-sets.tsx
    category: best-practice
  - id: dropdown-best-clear-labels
    file: examples/dropdown/best-clear-labels.tsx
    category: best-practice
  - id: dropdown-best-sensible-defaults
    file: examples/dropdown/best-sensible-defaults.tsx
    category: best-practice
  - id: dropdown-anti-two-options
    file: examples/dropdown/anti-two-options.tsx
    category: anti-pattern
  - id: dropdown-anti-unclear-labels
    file: examples/dropdown/anti-unclear-labels.tsx
    category: anti-pattern
  - id: dropdown-anti-nested-structures
    file: examples/dropdown/anti-nested-structures.tsx
    category: anti-pattern
---

# Dropdown

## Overview

`Dropdown` provides **single-choice selection** from a list of options. It maps to Flutter's [`DropdownButton`](https://api.flutter.dev/flutter/material/DropdownButton-class.html) and renders a native **`<select>`** with **`<option>`** children — no custom overlay in v1.

Options are passed as data via **`DropdownOption[]`**. Change handlers use **`onChange$`** (HTML `change` event).

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Single selection** | One option token at a time; value is a **`string`** |
| **Compact presentation** | Options collapsed until the user opens the native picker |
| **Large option sets** | Scales to dozens or hundreds of flat options without vertical clutter |
| **Form integration** | Registers with `Form` when `name` is set → `FormValues[name]` is **`string`** |

### When to use Dropdown

- Country, language, category, or timezone pickers
- Any single-choice list with **roughly 8+ options** or limited vertical space
- Forms that submit a string token with progressive enhancement (native POST)

### Dropdown vs RadioGroup vs Checkbox

| | `Dropdown` | `RadioGroup` | `Checkbox` |
| --- | --- | --- | --- |
| **Selection** | One `string` | One `string` | Independent `boolean` |
| **Presentation** | Collapsed `<select>` | All options visible | Per-option toggle |
| **Best for** | Medium/large lists | Small sets (≈2–7) | Multi-select / opt-in |
| **Compare options** | Must open list | Scan all at once | N/A |

For custom validation messages and helper/error decoration, use **`DropdownFormField`**.

---

## Import

```tsx
import {
  Button,
  Column,
  Dropdown,
  DropdownFormField,
  Form,
  Radio,
  RadioGroup,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

import type { DropdownOption, FormValues } from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working `Dropdown` with label, placeholder, and options.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      label="Country"
      options={OPTIONS}
      placeholder="Select a country"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-basic`).

---

## Common Usage

### Country Selection

Classic address form field with placeholder and default.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const COUNTRIES: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
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

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-country`).

---

### Language Selection

Controlled dropdown for locale switching.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const LANGUAGES: DropdownOption[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "ja", label: "日本語" },
];

export default component$(() => {
  const locale = useSignal("en");

  return (
    <ThemeProvider theme={{}}>
      <Dropdown
        label="Language"
        options={LANGUAGES}
        value={locale.value}
        onChange$={$((next) => {
          locale.value = next;
        })}
      />
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-language`).

---

### Theme Selection

Compact alternative to radio buttons when space is limited.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const THEMES: DropdownOption[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System default" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      name="theme"
      label="Color theme"
      options={THEMES}
      defaultValue="system"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-theme`).

---

### Category Selection

Larger flat option list for content classification.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const CATEGORIES: DropdownOption[] = [
  { value: "news", label: "News" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
  { value: "entertainment", label: "Entertainment" },
  { value: "business", label: "Business" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "travel", label: "Travel" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      name="category"
      label="Category"
      options={CATEGORIES}
      placeholder="Choose a category"
      required
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-category`).

---

## State Management

### Controlled Dropdown

Pass **`value`** and update in **`onChange$`**.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

export default component$(() => {
  const status = useSignal("draft");

  return (
    <ThemeProvider theme={{}}>
      <Dropdown
        label="Status"
        options={OPTIONS}
        value={status.value}
        onChange$={$((next) => {
          status.value = next;
        })}
      />
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-controlled`).

---

### Uncontrolled Dropdown

Use **`defaultValue`** for SSR-friendly initial selection.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      label="Plan"
      options={OPTIONS}
      defaultValue="free"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-uncontrolled`).

---

### Behavior differences

| | Controlled | Uncontrolled |
| --- | --- | --- |
| **Props** | `value` + `onChange$` | `defaultValue` |
| **State owner** | Parent signal / store | Internal + DOM |
| **SSR** | Server `value` from props | `defaultValue` marks `selected` on `<option>` |
| **When to use** | Live UI reacting to selection | Simple forms with fixed defaults |

Never pass **`value`** and **`defaultValue`** together.

---

## Labels and Decoration

Plain **`Dropdown`** supports **`label`**, **`placeholder`**, and **`required`**. Helper text and error display use **`DropdownFormField`** with **`decoration`**.

| Feature | Plain `Dropdown` | `DropdownFormField` |
| --- | --- | --- |
| **Label** | `label` prop | `decoration.label` (preferred) or `label` |
| **Helper text** | — | `decoration.helperText` |
| **Error text** | — | `validator$` output or `decoration.errorText` |
| **Required `*`** | Shown beside `label` when `required` | `decoration.required` + native `required` |
| **Placeholder** | `placeholder` prop | `placeholder` prop (stays on control) |

When both `label` and `decoration.label` are set on `DropdownFormField`, **`decoration.label` wins** (FD10).

### Label

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown label="Country" options={OPTIONS} />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-label`).

---

### Helper Text

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { DropdownFormField, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <DropdownFormField
      name="country"
      options={OPTIONS}
      placeholder="Select a country"
      decoration={{
        label: "Country",
        helperText: "Shipping address country",
      }}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-helper`).

---

### Required Indicator

Native **`required`** plus visual **`*`** beside the label.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      label="Country"
      options={OPTIONS}
      placeholder="Select a country"
      required
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-required-indicator`).

---

### Error Text

Use **`DropdownFormField`** for validator-driven or server-provided errors.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { DropdownFormField, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <DropdownFormField
      name="country"
      options={OPTIONS}
      decoration={{
        label: "Country",
        errorText: "We do not ship to the selected country.",
      }}
      defaultValue="us"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-error`).

---

### Placeholder

Rendered as `<option value="" disabled hidden>`. Does **not** satisfy **`required`** — user must pick a real option.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      label="Country"
      options={OPTIONS}
      placeholder="Select a country"
      required
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-placeholder`).

---

## Form Integration

### Dropdown in Form

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { DropdownOption, FormValues } from "qwik-flutter-ui";
import {
  Button,
  Dropdown,
  Form,
  ThemeProvider,
} from "qwik-flutter-ui";

const COUNTRIES: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log(values.country);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Dropdown
          name="country"
          label="Country"
          options={COUNTRIES}
          placeholder="Select a country"
          defaultValue="us"
        />
        <Button type="submit">Save</Button>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-in-form`).

---

### Registration Form

Country and plan fields alongside text input.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import {
  Button,
  Column,
  DropdownFormField,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

const COUNTRIES: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
];

const PLANS: DropdownOption[] = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Column gap={16}>
        <TextFormField
          name="email"
          required
          decoration={{ label: "Email" }}
        />
        <DropdownFormField
          name="country"
          required
          options={COUNTRIES}
          placeholder="Select a country"
          decoration={{ label: "Country" }}
        />
        <DropdownFormField
          name="plan"
          options={PLANS}
          defaultValue="free"
          decoration={{ label: "Plan" }}
        />
        <Button type="submit">Create account</Button>
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-registration`).

---

### Checkout Flow

Shipping country with validated selection.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { DropdownOption, FormValues } from "qwik-flutter-ui";
import {
  Button,
  Column,
  DropdownFormField,
  Form,
  ThemeProvider,
} from "qwik-flutter-ui";

const COUNTRIES: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
];

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log("Ship to", values.country);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <DropdownFormField
            name="country"
            required
            options={COUNTRIES}
            placeholder="Select shipping country"
            decoration={{
              label: "Ship to",
              helperText: "Where should we deliver your order?",
            }}
            validator$={$((v) =>
              v === "" ? "Please select a country" : undefined,
            )}
          />
          <Button type="submit">Continue to payment</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-checkout`).

---

### Recommended patterns

1. Set **`name`** on every dropdown inside **`Form`**
2. Use **`placeholder`** + **`required`** when no default should be assumed
3. Prefer **`defaultValue`** when a sensible pre-selection exists
4. Use **`DropdownFormField`** for **`validator$`**, helper text, and errors
5. Narrow **`FormValues`** at submit (`values.country as string`)

---

## Validation

| Mechanism | Where | Behavior |
| --- | --- | --- |
| **`required`** | `Dropdown` / `DropdownFormField` | Empty placeholder (`value=""`) fails native validation |
| **`validator$`** | `DropdownFormField` | Returns error string or `undefined`; blocks submit when invalid |
| **`Form.autovalidateMode`** | `Form` | Controls when `validator$` runs |

### Required Selection

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Button, Dropdown, Form, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Dropdown
        name="country"
        label="Country"
        options={OPTIONS}
        placeholder="Select a country"
        required
      />
      <Button type="submit">Submit</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-required-validation`).

---

### Custom Validation

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AutovalidateMode,
  Button,
  DropdownFormField,
  Form,
  ThemeProvider,
} from "qwik-flutter-ui";
import type { DropdownOption } from "qwik-flutter-ui";

const REGIONS: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "eu", label: "European Union" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form
      autovalidateMode={AutovalidateMode.onUserInteraction}
      onSubmit$={$(() => {})}
    >
      <DropdownFormField
        name="region"
        options={REGIONS}
        placeholder="Select a region"
        decoration={{ label: "Sales region" }}
        validator$={$((v) => {
          if (v === "") return "Select a region to continue";
          if (v === "eu") return "EU sales require a separate agreement";
          return undefined;
        })}
      />
      <Button type="submit">Submit</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-custom-validation`).

---

### Error Messaging

Errors render with **`role="alert"`** and set **`aria-invalid`** on the `<select>`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import {
  Button,
  DropdownFormField,
  Form,
  ThemeProvider,
} from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <DropdownFormField
        name="country"
        required
        options={OPTIONS}
        placeholder="Select a country"
        decoration={{ label: "Country" }}
        validator$={$((v) =>
          v === "" ? "Please select a country" : undefined,
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-error-messaging`).

---

## Variations

Each example demonstrates **one concept** only.

### Disabled

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      label="Plan (locked)"
      options={OPTIONS}
      defaultValue="pro"
      disabled
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-disabled`).

---

### Default Selection

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      label="Language"
      options={OPTIONS}
      defaultValue="en"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-default-selection`).

---

### Long Labels

Option labels can be descriptive — native `<option>` text wraps per browser.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const PLANS: DropdownOption[] = [
  {
    value: "free",
    label: "Free — basic features for personal projects at no cost",
  },
  {
    value: "pro",
    label: "Pro — advanced features, team collaboration, and priority support",
  },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      label="Plan"
      options={PLANS}
      defaultValue="free"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-long-labels`).

---

### Large Option Set

Dropdowns scale well to long flat lists.

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
  { value: "br", label: "Brazil" },
  { value: "mx", label: "Mexico" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "kr", label: "South Korea" },
  { value: "nl", label: "Netherlands" },
  { value: "se", label: "Sweden" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      name="country"
      label="Country"
      options={COUNTRIES}
      placeholder="Select a country"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-large-option-set`).

---

## Dropdown vs RadioGroup

| Factor | **Dropdown** | **RadioGroup** |
| --- | --- | --- |
| **Discoverability** | Options hidden until opened | All options visible |
| **Space usage** | Compact — one row | Grows with option count |
| **Number of options** | Medium/large sets (8+) | Small sets (≈2–7) |
| **User experience** | Familiar native picker | Compare options at a glance |

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
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      name="country"
      label="Country"
      options={COUNTRIES}
      placeholder="Select a country"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-vs-radiogroup-dropdown`).

---

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-vs-radiogroup-radiogroup`).

---

### Guidance summary

- **Dropdown** — countries, categories, timezones, any list where vertical space matters
- **RadioGroup** — payment type, shipping tier, plan pickers with few options to compare
- **Two options only** — prefer `RadioGroup` unless space is extremely constrained

---

## Best Practices

### Use for medium and large option sets

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const TIMEZONES: DropdownOption[] = [
  { value: "utc", label: "UTC" },
  { value: "est", label: "Eastern Time (US)" },
  { value: "pst", label: "Pacific Time (US)" },
  { value: "gmt", label: "GMT" },
  { value: "cet", label: "Central European Time" },
  { value: "jst", label: "Japan Standard Time" },
  { value: "aest", label: "Australian Eastern Time" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      label="Timezone"
      options={TIMEZONES}
      placeholder="Select timezone"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-best-medium-large-sets`).

---

### Keep labels clear

Use human-readable option labels — not opaque codes alone.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "monthly", label: "Monthly billing" },
  { value: "yearly", label: "Yearly billing (save 20%)" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown label="Billing cycle" options={OPTIONS} />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-best-clear-labels`).

---

### Provide sensible defaults

Pre-select the most common option when it is safe to do so.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import type { DropdownOption } from "qwik-flutter-ui";
import { Dropdown, ThemeProvider } from "qwik-flutter-ui";

const OPTIONS: DropdownOption[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Dropdown
      label="Language"
      options={OPTIONS}
      defaultValue="en"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: dropdown-best-sensible-defaults`).

---

## Anti-Patterns

### Dropdown for two options

**Source** (avoid)

```tsx
<Dropdown
  label="Plan"
  options={[
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ]}
  placeholder="Select a plan"
/>
```

**Preferred**

```tsx
import { Column, Radio, RadioGroup } from "qwik-flutter-ui";

<RadioGroup name="plan" legend="Plan" defaultValue="free">
  <Column gap={8}>
    <Radio value="free" label="Free" />
    <Radio value="pro" label="Pro" />
  </Column>
</RadioGroup>
```

**Why:** Two visible radio options are faster to scan than opening a dropdown.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: dropdown-anti-two-options`, `preview: false`).

---

### Unclear labels

**Source** (avoid)

```tsx
<Dropdown
  label="Type"
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]}
/>
```

**Preferred**

```tsx
<Dropdown
  label="Document type"
  options={[
    { value: "invoice", label: "Invoice" },
    { value: "receipt", label: "Receipt" },
  ]}
/>
```

**Why:** Generic labels force users to guess meaning. Use descriptive copy for labels and options.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: dropdown-anti-unclear-labels`, `preview: false`).

---

### Huge nested option structures

**Source** (avoid)

```tsx
{/* Expecting optgroup / nested hierarchy — not supported in v1 */}
<Dropdown
  label="Location"
  options={[
    { value: "us-ca", label: "US › California" },
    { value: "us-ny", label: "US › New York" },
    /* hundreds of flattened pseudo-nested entries */
  ]}
/>
```

**Preferred**

Split into cascading dropdowns (country → region), use search/typeahead (deferred v2), or flatten with clear prefix labels.

**Why:** v1 `Dropdown` is a flat native `<select>` — no `<optgroup>` API, no multi-level nesting, no search. Flattening large hierarchies hurts usability.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: dropdown-anti-nested-structures`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Label association** | `label` or `decoration.label` → `<label for={selectId}>` |
| **Keyboard navigation** | Native `<select>` — **Space** / **Enter** opens; arrow keys move options |
| **Screen reader expectations** | Announces as combobox/listbox; reads label, value, and option count |
| **Validation announcements** | `DropdownFormField` errors use **`role="alert"`**; control gets **`aria-invalid`** |
| **Helper text** | Linked via **`aria-describedby`** when using `DropdownFormField` |

Native `<select>` provides platform-appropriate picker behavior on mobile without custom ARIA.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | `<label>`, `<select>`, and `<option>` elements render on the server |
| **Initial selection** | **`defaultValue`** / **`value`** marks matching `<option selected>` in HTML |
| **Placeholder** | Rendered as `<option value="" disabled hidden>` in SSR output |
| **Resumability** | Markup serializes into HTML; **`onChange$`** and **`validator$`** hydrate as QRLs |
| **Progressive enhancement** | Native **`name`** submits selected value on HTML POST without JavaScript |
| **FormValues** | Selected token is **`string`** in `onSubmit$` |

All option **`value`** props are strings — encode numbers or enums as strings at the boundary.

---

## Flutter Equivalent

| Topic | Flutter | qwik-flutter-ui `Dropdown` |
| --- | --- | --- |
| **Widget** | `DropdownButton` / `DropdownMenu` | Native `<select>` |
| **Options** | `DropdownMenuItem` list | `DropdownOption[]` data |
| **Hint** | `hint:` widget | `placeholder` prop |
| **Value type** | Generic `T` | **`string` only** in v1 |
| **Overlay UI** | Material dropdown overlay | Browser native picker (v1) |
| **Multi-select** | Separate widgets | **Not in v1** (`multiple` deferred v2) |
| **Change handler** | `onChanged` | `onChange$` QRL |

**Flutter**

```dart
DropdownButton<String>(
  value: country,
  hint: Text('Select a country'),
  items: countries
      .map((c) => DropdownMenuItem(value: c.id, child: Text(c.name)))
      .toList(),
  onChanged: (v) => setState(() => country = v),
)
```

**qwik-flutter-ui**

```tsx
<Dropdown
  label="Country"
  name="country"
  placeholder="Select a country"
  options={countries}
  defaultValue="us"
  onChange$={$((next) => {
    country.value = next;
  })}
/>
```

Similarities: single selection, disabled state, form-friendly string values, hint/placeholder pattern.

Differences: native HTML control (no Material overlay), data-driven options array, QRL handlers, no generic value type in v1.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [RadioGroup](/docs/widgets/forms/radio-group) | Visible options for small mutually exclusive sets |
| [Radio](/docs/widgets/forms/radio) | Option inside `RadioGroup` — alternative presentation model |
| [Checkbox](/docs/widgets/forms/checkbox) | Multi-select booleans — not single choice |
| [DropdownFormField](/docs/widgets/forms/dropdown-form-field) | Validated dropdown with decoration and `validator$` |
| [Form](/docs/widgets/forms/form) | Parent for string submit payloads and validation timing |
| [TextFormField](/docs/widgets/forms/text-form-field) | Text fields alongside dropdowns in forms |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/dropdown/`
- **`category`** — groups examples (`basic`, `common`, `state`, `decoration`, `form-integration`, `validation`, `variation`, `comparison`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to selection controls and form widgets
- **`flutterEquivalent`** — `DropdownButton`

When adding examples, keep one concept per file, use **`DropdownOption[]`** with string values, wrap **`onChange$`** and **`validator$`** with **`$()`**, and import only from `qwik-flutter-ui`.
