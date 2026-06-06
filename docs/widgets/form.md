---
title: Form
description: Groups form fields, coordinates validation, and handles submit with native HTML progressive enhancement.
widget: Form
category: forms
flutterEquivalent: Form
status: shipped
related:
  - TextFormField
  - TextField
  - CheckboxFormField
  - DropdownFormField
  - RadioGroupFormField
  - Button
since: "0.0.1"
examples:
  - id: form-basic
    file: examples/form/basic.tsx
    category: basic
  - id: form-login
    file: examples/form/login.tsx
    category: common
  - id: form-registration
    file: examples/form/registration.tsx
    category: common
  - id: form-contact
    file: examples/form/contact.tsx
    category: common
  - id: form-settings
    file: examples/form/settings.tsx
    category: common
  - id: form-required-validation
    file: examples/form/required-validation.tsx
    category: validation
  - id: form-email-validation
    file: examples/form/email-validation.tsx
    category: validation
  - id: form-multiple-validators
    file: examples/form/multiple-validators.tsx
    category: validation
  - id: form-custom-validation
    file: examples/form/custom-validation.tsx
    category: validation
  - id: form-submit-button
    file: examples/form/submit-button.tsx
    category: submission
  - id: form-successful-submission
    file: examples/form/successful-submission.tsx
    category: submission
  - id: form-validation-failure
    file: examples/form/validation-failure.tsx
    category: submission
  - id: form-state-simple
    file: examples/form/state-simple.tsx
    category: form-state
  - id: form-state-multiple-fields
    file: examples/form/state-multiple-fields.tsx
    category: form-state
  - id: form-state-mixed-types
    file: examples/form/state-mixed-types.tsx
    category: form-state
  - id: form-composition-mixed
    file: examples/form/composition-mixed.tsx
    category: composition
  - id: form-autovalidate-disabled
    file: examples/form/autovalidate-disabled.tsx
    category: validation-mode
  - id: form-autovalidate-on-interaction
    file: examples/form/autovalidate-on-interaction.tsx
    category: validation-mode
  - id: form-autovalidate-always
    file: examples/form/autovalidate-always.tsx
    category: validation-mode
  - id: form-best-group-fields
    file: examples/form/best-group-fields.tsx
    category: best-practice
  - id: form-best-validation-messages
    file: examples/form/best-validation-messages.tsx
    category: best-practice
  - id: form-best-focused-forms
    file: examples/form/best-focused-forms.tsx
    category: best-practice
  - id: form-anti-excessive-validation
    file: examples/form/anti-excessive-validation.tsx
    category: anti-pattern
  - id: form-anti-unclear-errors
    file: examples/form/anti-unclear-errors.tsx
    category: anti-pattern
  - id: form-anti-long-unstructured
    file: examples/form/anti-long-unstructured.tsx
    category: anti-pattern
---

# Form

## Overview

`Form` groups input widgets, coordinates validation, and handles submission. It maps to Flutter's [`Form`](https://api.flutter.dev/flutter/widgets/Form-class.html) and renders a native **`<form>`** element.

Use `Form` when multiple fields should validate together and produce a single submit payload. Individual **`*FormField`** widgets register with `Form` through Qwik context — no global store or `FormState` object in v1.

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Field registration** | `TextFormField`, `CheckboxFormField`, `DropdownFormField`, `RadioGroupFormField`, and controls with a `name` inside `Form` register for value collection and validation |
| **Validation** | Native HTML constraints (`required`, `type`, `minLength`, …) plus optional `validator$` QRLs on `*FormField` widgets |
| **Submission** | `<Button type="submit">` triggers validation; `onSubmit$` runs only when every registered validator passes |
| **Form state** | Internal field registry tracks values, touched state, and errors — not exposed as a public `FormState` API in v1 |

### When to use Form

- Login, registration, contact, or settings flows with multiple related fields
- Shared validation timing via `autovalidateMode`
- Typed submit handling with `onSubmit$` and `FormValues`
- Progressive enhancement with native `action` / `method` when JavaScript is unavailable

### Form vs native HTML form vs standalone fields

| | `Form` (qwik-flutter-ui) | Native `<form>` | Standalone fields |
| --- | --- | --- | --- |
| **Element** | Renders `<form>` | Browser form | No form wrapper |
| **Validation** | Native + `validator$` on `*FormField` | Browser constraints only | Per-field or manual |
| **Submit** | `onSubmit$` with `FormValues` when valid | Full page navigation | No coordinated submit |
| **Field registration** | Context-based registry | Native `name` attributes | No registry |
| **Error display** | `decoration.errorText` + ARIA | Browser popups (unless `noValidate`) | Manual `errorText` |
| **Best for** | Multi-field validated flows | Server-rendered POST without JS | Search bars, filters, one-off inputs |

Prefer **`TextFormField`** (and other `*FormField` widgets) inside `Form`. Use standalone **`TextField`**, **`Checkbox`**, or **`Dropdown`** when the field is outside a validated form or errors are managed manually.

---

## Import

```tsx
import {
  AutovalidateMode,
  Button,
  CheckboxFormField,
  Column,
  DropdownFormField,
  Form,
  InputType,
  Radio,
  RadioGroupFormField,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

import type { FormValues } from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working `Form` with one validated field and a submit button.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Column, Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Column gap={16}>
        <TextFormField
          name="email"
          decoration={{ label: "Email" }}
          required
        />
        <Button type="submit">Submit</Button>
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-basic`).

---

## Common Usage

Each example demonstrates one real-world form pattern.

### Login Form

Email and password with required validation. Keep the form short and focused on authentication.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Column,
  Form,
  InputType,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log("Login", values);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <TextFormField
            name="email"
            type={InputType.email}
            autoComplete="email"
            required
            decoration={{ label: "Email" }}
            validator$={$((v) =>
              v.includes("@") ? undefined : "Enter a valid email",
            )}
          />
          <TextFormField
            name="password"
            type={InputType.password}
            autoComplete="current-password"
            required
            decoration={{ label: "Password" }}
          />
          <Button type="submit">Sign in</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-login`).

---

### Registration Form

Collect account details and require terms acceptance with a checkbox validator.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  CheckboxFormField,
  Column,
  Form,
  InputType,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log("Register", values);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <TextFormField
            name="displayName"
            required
            decoration={{ label: "Display name" }}
            validator$={$((v) =>
              v.trim().length >= 2 ? undefined : "At least 2 characters",
            )}
          />
          <TextFormField
            name="email"
            type={InputType.email}
            autoComplete="email"
            required
            decoration={{ label: "Email" }}
          />
          <TextFormField
            name="password"
            type={InputType.password}
            autoComplete="new-password"
            required
            minLength={8}
            decoration={{
              label: "Password",
              helperText: "Minimum 8 characters",
            }}
          />
          <CheckboxFormField
            name="terms"
            required
            decoration={{ label: "I agree to the terms of service" }}
            validator$={$((checked) =>
              checked ? undefined : "You must accept the terms",
            )}
          />
          <Button type="submit">Create account</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-registration`).

---

### Contact Form

Name, email, and a multiline message field for support or feedback flows.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Column,
  Form,
  InputType,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log("Contact", values);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <TextFormField
            name="name"
            required
            decoration={{ label: "Your name" }}
          />
          <TextFormField
            name="email"
            type={InputType.email}
            required
            decoration={{ label: "Email" }}
          />
          <TextFormField
            name="message"
            required
            maxLines={5}
            minLines={3}
            decoration={{
              label: "Message",
              helperText: "Describe your question or issue",
            }}
            validator$={$((v) =>
              v.trim().length >= 10
                ? undefined
                : "Message must be at least 10 characters",
            )}
          />
          <Button type="submit">Send message</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-contact`).

---

### Settings Form

Profile text fields plus a boolean toggle. `Switch` registers with `Form` when `name` is set.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Column,
  Form,
  Switch,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log("Settings", values);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <TextFormField
            name="displayName"
            decoration={{ label: "Display name" }}
            defaultValue="Alex"
          />
          <Switch
            name="notifications"
            label="Email notifications"
            defaultChecked={true}
          />
          <Button type="submit">Save settings</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-settings`).

---

## Validation

Validation combines **native HTML constraints** with optional **`validator$`** QRLs on `*FormField` widgets. Return `undefined` when valid; return an error string when invalid. Do not throw from validators.

On submit, `Form`:

1. Checks native validity (`required`, `type`, `minLength`, …)
2. Runs every registered `validator$`
3. Calls `onSubmit$` only when all checks pass

Errors surface through `decoration.errorText`, `aria-invalid`, and `role="alert"` on the error node.

### Required Field Validation

Use native `required` for empty checks and `validator$` for trimmed or business rules.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="name"
        required
        decoration={{ label: "Full name" }}
        validator$={$((v) =>
          v.trim() ? undefined : "Name is required",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-required-validation`).

---

### Email Validation

Combine `type={InputType.email}` with a `validator$` for clearer error copy.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, InputType, TextFormField, ThemeProvider } from "qwik-flutter-ui";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="email"
        type={InputType.email}
        autoComplete="email"
        required
        decoration={{ label: "Email" }}
        validator$={$((v) =>
          EMAIL_PATTERN.test(v.trim()) ? undefined : "Enter a valid email address",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-email-validation`).

---

### Multiple Validators

Stack native constraints and one or more checks inside a single `validator$`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, InputType, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="password"
        type={InputType.password}
        required
        minLength={8}
        decoration={{ label: "Password" }}
        validator$={$((v) => {
          if (!/[A-Z]/.test(v)) return "Include at least one uppercase letter";
          if (!/[0-9]/.test(v)) return "Include at least one number";
          return undefined;
        })}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-multiple-validators`).

---

### Custom Validation

Cross-field or domain rules belong in `validator$`. Compare against props, signals, or constants — keep validators synchronous in v1.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

const RESERVED = ["admin", "root", "support"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="username"
        required
        decoration={{ label: "Username" }}
        validator$={$((v) => {
          const normalized = v.trim().toLowerCase();
          if (RESERVED.includes(normalized)) {
            return "This username is reserved";
          }
          return undefined;
        })}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-custom-validation`).

---

## Submission

### Submit Button

Use `<Button type="submit">` inside `Form`. Avoid `onClick$` handlers that bypass validation.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Column, Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Column gap={16}>
        <TextFormField
          name="email"
          required
          decoration={{ label: "Email" }}
        />
        <Button type="submit">Submit</Button>
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-submit-button`).

---

### Successful Submission

`onSubmit$` receives `FormValues` and the native `SubmitEvent`. Narrow types at the boundary.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Column,
  Form,
  Text,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const status = useSignal("");

  const onSubmit$ = $((values: FormValues) => {
    const email = values.email as string;
    status.value = `Saved ${email}`;
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <TextFormField
            name="email"
            required
            decoration={{ label: "Email" }}
          />
          <Button type="submit">Save</Button>
          {status.value && <Text>{status.value}</Text>}
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-successful-submission`).

---

### Validation Failure

When validation fails, `onSubmit$` is **not** called. Errors appear on individual fields; show a form-level summary only when it adds clarity.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Column, Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values) => {
    // Not reached while any field is invalid
    console.log(values);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <TextFormField
            name="email"
            required
            decoration={{ label: "Email" }}
            validator$={$((v) =>
              v.includes("@") ? undefined : "Enter a valid email",
            )}
          />
          <Button type="submit">Submit</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-validation-failure`).

---

### Recommended submission patterns

1. Wrap fields in **`Form`** with **`onSubmit$`**
2. Use **`*FormField`** widgets with required **`name`**
3. Submit with **`<Button type="submit">`**
4. Narrow **`FormValues`** at the handler boundary (`values.email as string`)
5. For server POST without JS, set **`action`** and **`method`**; re-render with `decoration.errorText` after failed POST

---

## Form State

Form state is managed internally through field registration. v1 does not expose `FormState`, `reset()`, or a public `useForm()` hook.

### Lifecycle overview

| Phase | What happens |
| --- | --- |
| **Mount** | `*FormField` widgets register `name`, `getValue$`, `setError$`, and optional `validate$` with `Form` |
| **Interaction** | Fields update values; `autovalidateMode` controls when `validator$` runs |
| **Submit** | Native validity → all `validator$` → `collectValues()` → `onSubmit$` |
| **Unmount** | Fields unregister from the internal registry |

### Simple Form

One registered field — minimal registration and submit flow.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Button, Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="nickname"
        decoration={{ label: "Nickname" }}
        defaultValue=""
      />
      <Button type="submit">Save</Button>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-state-simple`).

---

### Multiple Fields

Each `name` becomes a key in the submit payload. All validators must pass before submit.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Column,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log(values.firstName, values.lastName);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <TextFormField
            name="firstName"
            required
            decoration={{ label: "First name" }}
          />
          <TextFormField
            name="lastName"
            required
            decoration={{ label: "Last name" }}
          />
          <Button type="submit">Continue</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-state-multiple-fields`).

---

### Mixed Field Types

`FormValues` is `Record<string, unknown>`. Text and selection fields contribute `string`; checkboxes and switches contribute `boolean`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  CheckboxFormField,
  Column,
  Form,
  Switch,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log({
      title: values.title as string,
      newsletter: values.newsletter as boolean,
      alerts: values.alerts as boolean,
    });
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <TextFormField
            name="title"
            decoration={{ label: "Job title" }}
          />
          <CheckboxFormField
            name="newsletter"
            decoration={{ label: "Subscribe to newsletter" }}
          />
          <Switch name="alerts" label="Enable alerts" />
          <Button type="submit">Save</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-state-mixed-types`).

---

## Composition

`*FormField` widgets compose the standalone control (`TextField`, `Checkbox`, `Dropdown`, `RadioGroup`) with shared decoration chrome and form registration. Use them inside `Form` instead of wiring validation manually.

### Form with TextFormField, CheckboxFormField, DropdownFormField, RadioGroupFormField

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { DropdownOption, FormValues } from "qwik-flutter-ui";
import {
  Button,
  CheckboxFormField,
  Column,
  DropdownFormField,
  Form,
  Radio,
  RadioGroupFormField,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

const COUNTRIES: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
];

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log(values);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <TextFormField
            name="name"
            required
            decoration={{ label: "Full name" }}
          />

          <CheckboxFormField
            name="terms"
            required
            decoration={{ label: "I agree to the terms" }}
            validator$={$((checked) =>
              checked ? undefined : "Please accept the terms",
            )}
          />

          <RadioGroupFormField
            name="plan"
            required
            defaultValue="free"
            decoration={{ label: "Billing plan" }}
          >
            <Column gap={8}>
              <Radio value="free" label="Free" />
              <Radio value="pro" label="Pro" />
            </Column>
          </RadioGroupFormField>

          <DropdownFormField
            name="country"
            required
            options={COUNTRIES}
            placeholder="Select a country"
            decoration={{ label: "Country" }}
            validator$={$((v) =>
              v === "" ? "Please select a country" : undefined,
            )}
          />

          <Button type="submit">Submit</Button>
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-composition-mixed`).

---

### Composition patterns

| Pattern | Guidance |
| --- | --- |
| **Text input** | `TextFormField` with `decoration` and optional `validator$` |
| **Boolean consent** | `CheckboxFormField` — validator receives `boolean` |
| **Single choice (few options)** | `RadioGroupFormField` with `Radio` children |
| **Single choice (many options)** | `DropdownFormField` with `options` |
| **Layout** | Wrap fields in `Column` with consistent `gap` |
| **Actions** | Place `<Button type="submit">` after fields |

---

## Validation Modes

Control when `validator$` runs between interactions using **`autovalidateMode`** on `Form`. Submit-time validation **always** runs regardless of mode.

| Mode | Enum value | When `validator$` runs |
| --- | --- | --- |
| **Disabled** | `AutovalidateMode.disabled` (default) | Submit only |
| **On submit** | Same as disabled | Validators run when the user submits — no inline feedback until then |
| **On interaction** | `AutovalidateMode.onUserInteraction` | On `input` after the field is touched |
| **Always** | `AutovalidateMode.always` | On every `input` from first interaction |

Native HTML constraints are still checked on submit in all modes.

### Disabled (validate on submit)

Default mode — quiet until submit. Best for short forms or when inline errors would distract.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { AutovalidateMode, Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form
      autovalidateMode={AutovalidateMode.disabled}
      onSubmit$={$(() => {})}
    >
      <TextFormField
        name="email"
        decoration={{ label: "Email" }}
        validator$={$((v) =>
          v.includes("@") ? undefined : "Enter a valid email",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-autovalidate-disabled`).

---

### On Interaction

Validate after the user has interacted with a field — good balance for longer forms.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { AutovalidateMode, Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form
      autovalidateMode={AutovalidateMode.onUserInteraction}
      onSubmit$={$(() => {})}
    >
      <TextFormField
        name="email"
        decoration={{ label: "Email" }}
        validator$={$((v) =>
          v.includes("@") ? undefined : "Enter a valid email",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-autovalidate-on-interaction`).

---

### Always

Immediate feedback on every keystroke after first input. Use sparingly — can feel noisy on long forms.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { AutovalidateMode, Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form
      autovalidateMode={AutovalidateMode.always}
      onSubmit$={$(() => {})}
    >
      <TextFormField
        name="username"
        decoration={{ label: "Username" }}
        validator$={$((v) =>
          v.length >= 3 ? undefined : "At least 3 characters",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-autovalidate-always`).

---

## Best Practices

### Group related fields

Use layout widgets (`Column`, `Card`) and headings to separate sections. Users scan forms in chunks.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Card, Column, Form, Text, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Column gap={24}>
        <Card padding={16}>
          <Column gap={16}>
            <Text as="h3">Contact</Text>
            <TextFormField name="email" decoration={{ label: "Email" }} />
            <TextFormField name="phone" decoration={{ label: "Phone" }} />
          </Column>
        </Card>
        <Card padding={16}>
          <Column gap={16}>
            <Text as="h3">Shipping</Text>
            <TextFormField name="address" decoration={{ label: "Address" }} />
            <TextFormField name="city" decoration={{ label: "City" }} />
          </Column>
        </Card>
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-best-group-fields`).

---

### Use clear validation messages

State what went wrong and how to fix it. Avoid generic "Invalid" copy.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, InputType, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="email"
        type={InputType.email}
        required
        decoration={{ label: "Work email" }}
        validator$={$((v) =>
          v.includes("@")
            ? undefined
            : "Enter an email address like name@company.com",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-best-validation-messages`).

---

### Keep forms focused

One purpose per form. Split account settings, billing, and profile into separate forms or steps.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Form,
  Text,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Column gap={16}>
        <Text as="h2">Reset password</Text>
        <TextFormField
          name="email"
          required
          decoration={{ label: "Account email" }}
        />
        <Button type="submit">Send reset link</Button>
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-best-focused-forms`).

---

## Anti-Patterns

### Excessive validation

Validating on every rule before the user finishes typing creates noise. Prefer `onUserInteraction` or validate complex rules on submit.

**Source**

```tsx
// Avoid — validates length on every keystroke with AutovalidateMode.always
<Form autovalidateMode={AutovalidateMode.always} onSubmit$={$(() => {})}>
  <TextFormField
    name="bio"
    validator$={$((v) =>
      v.length >= 200 ? undefined : "Bio must be 200+ characters",
    )}
  />
</Form>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-anti-excessive-validation`).

---

### Unclear errors

Generic messages like "Error" or "Invalid" do not help users recover.

**Source**

```tsx
// Avoid
<TextFormField
  name="email"
  validator$={$((v) => (v.includes("@") ? undefined : "Invalid"))}
/>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-anti-unclear-errors`).

---

### Very long forms without grouping

A dozen fields in one undifferentiated list increases abandonment. Group into sections or use a stepper.

**Source**

```tsx
// Avoid — many unrelated fields with no structure
<Form onSubmit$={$(() => {})}>
  <TextFormField name="field1" decoration={{ label: "Field 1" }} />
  <TextFormField name="field2" decoration={{ label: "Field 2" }} />
  {/* ...many more with no headings or sections... */}
</Form>
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: form-anti-long-unstructured`).

---

## Accessibility

Form widgets follow shared accessibility rules across the forms track.

| Concern | Expectation |
| --- | --- |
| **Labels** | Visible labels via `decoration.label` (or control `label` / `legend`). Use `aria-label` only when no visible label exists |
| **Required fields** | Native `required` attribute plus a visible required indicator when `required` is true |
| **Error announcements** | Non-empty error text uses `role="alert"`. Fields set `aria-invalid` when invalid |
| **Helper text** | Linked with `aria-describedby` to helper and error element ids |
| **Validation messaging** | Errors are per-field and specific. Avoid relying on browser constraint popups — `Form` sets `noValidate` when custom validators are active |
| **Submit** | Use `<Button type="submit">` with native `disabled` when appropriate — not pointer-events-only blocking |
| **Keyboard** | Native tab order through focusable controls; `:focus-visible` styling in CSS modules |

Screen readers should hear the field label, required state, helper text, and error messages in a predictable order when validation fails.

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | `Form` and fields render real HTML (`<form>`, `<input>`, …) on the server |
| **Initial values** | Use `defaultValue` / `defaultChecked` for SSR-friendly uncontrolled fields |
| **Validation** | `validator$` QRLs run on the client only. After a failed server POST, pass `decoration.errorText` from route data |
| **Stable IDs** | Fields use framework-generated ids for label association and `aria-describedby` |
| **Resumability** | Form structure and default values serialize into HTML; enhanced validation and `onSubmit$` resume on the client |
| **Progressive enhancement** | Set `action` and `method` for native submission without JavaScript; add `onSubmit$` for SPA-style handling when hydrated |

---

## Flutter Equivalent

| | Flutter `Form` | qwik-flutter-ui `Form` |
| --- | --- | --- |
| **Widget** | `Form` + `GlobalKey<FormState>` | `Form` with internal context registry |
| **Fields** | `TextFormField`, etc. | `TextFormField`, `CheckboxFormField`, … |
| **Validators** | `FormFieldValidator` returning `String?` | `validator$` QRL returning `string \| undefined` |
| **Validate** | `formKey.currentState!.validate()` | Automatic on submit (and per `autovalidateMode`) |
| **Save** | `formKey.currentState!.save()` | Values collected in `onSubmit$` as `FormValues` |
| **Reset** | `reset()` on `FormState` | **Not in v1** — remount or controlled signals |
| **Autovalidate** | `AutovalidateMode` on `Form` | Same enum name and similar timing |
| **DOM** | Skia render tree | Native `<form>` with progressive enhancement |

Similarities: grouped fields, validator functions, autovalidate timing, blocked submit when invalid.

Differences: no public `FormState` / `GlobalKey`, QRL-based validators, native HTML submission path, `FormValues` typed as `Record<string, unknown>`.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [TextFormField](/docs/widgets/forms/text-form-field) | Text input with `validator$` and required `name` |
| [TextField](/docs/widgets/forms/textfield) | Standalone text input; optional `name` without form validators |
| [CheckboxFormField](/docs/widgets/forms/checkbox-form-field) | Boolean field with validation and decoration |
| [DropdownFormField](/docs/widgets/forms/dropdown-form-field) | Select field with validation and decoration |
| [RadioGroupFormField](/docs/widgets/forms/radio-group-form-field) | Radio group with validation and decoration |
| [Button](/docs/widgets/forms/button) | Use `type="submit"` to trigger form submission |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/form/`
- **`category`** — groups examples (`basic`, `common`, `validation`, `submission`, `form-state`, `composition`, `validation-mode`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to field widgets and `Button`
- **`flutterEquivalent`** — `Form`

When adding examples, keep one concept per file, wrap `validator$` and `onSubmit$` with `$()`, and import only from `qwik-flutter-ui`.
