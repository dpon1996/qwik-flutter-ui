---
title: TextFormField
description: Form-integrated text input with validation, InputDecoration chrome, and Form registration via required name.
widget: TextFormField
category: forms
flutterEquivalent: TextFormField
status: shipped
related:
  - Form
  - TextField
  - Checkbox
  - Dropdown
  - RadioGroup
  - Button
since: "0.0.1"
examples:
  - id: textformfield-basic
    file: examples/textformfield/basic.tsx
    category: basic
  - id: textformfield-login-email
    file: examples/textformfield/login-email.tsx
    category: common
  - id: textformfield-password
    file: examples/textformfield/password.tsx
    category: common
  - id: textformfield-registration
    file: examples/textformfield/registration.tsx
    category: common
  - id: textformfield-profile-editor
    file: examples/textformfield/profile-editor.tsx
    category: common
  - id: textformfield-required-validation
    file: examples/textformfield/required-validation.tsx
    category: validation
  - id: textformfield-email-validation
    file: examples/textformfield/email-validation.tsx
    category: validation
  - id: textformfield-password-validation
    file: examples/textformfield/password-validation.tsx
    category: validation
  - id: textformfield-custom-validation
    file: examples/textformfield/custom-validation.tsx
    category: validation
  - id: textformfield-label
    file: examples/textformfield/label.tsx
    category: decoration
  - id: textformfield-helper
    file: examples/textformfield/helper.tsx
    category: decoration
  - id: textformfield-error
    file: examples/textformfield/error.tsx
    category: decoration
  - id: textformfield-required-indicator
    file: examples/textformfield/required-indicator.tsx
    category: decoration
  - id: textformfield-prefix
    file: examples/textformfield/prefix.tsx
    category: decoration
  - id: textformfield-suffix
    file: examples/textformfield/suffix.tsx
    category: decoration
  - id: textformfield-single-field-form
    file: examples/textformfield/single-field-form.tsx
    category: form-integration
  - id: textformfield-multi-field-form
    file: examples/textformfield/multi-field-form.tsx
    category: form-integration
  - id: textformfield-submit-workflow
    file: examples/textformfield/submit-workflow.tsx
    category: form-integration
  - id: textformfield-validation-workflow
    file: examples/textformfield/validation-workflow.tsx
    category: form-integration
  - id: textformfield-autovalidate-disabled
    file: examples/textformfield/autovalidate-disabled.tsx
    category: validation-mode
  - id: textformfield-autovalidate-on-interaction
    file: examples/textformfield/autovalidate-on-interaction.tsx
    category: validation-mode
  - id: textformfield-autovalidate-always
    file: examples/textformfield/autovalidate-always.tsx
    category: validation-mode
  - id: textformfield-disabled
    file: examples/textformfield/disabled.tsx
    category: variation
  - id: textformfield-read-only
    file: examples/textformfield/read-only.tsx
    category: variation
  - id: textformfield-multiline
    file: examples/textformfield/multiline.tsx
    category: variation
  - id: textformfield-max-length
    file: examples/textformfield/max-length.tsx
    category: variation
  - id: textformfield-autofocus
    file: examples/textformfield/autofocus.tsx
    category: variation
  - id: textformfield-best-clear-labels
    file: examples/textformfield/best-clear-labels.tsx
    category: best-practice
  - id: textformfield-best-helper-text
    file: examples/textformfield/best-helper-text.tsx
    category: best-practice
  - id: textformfield-best-validation-messages
    file: examples/textformfield/best-validation-messages.tsx
    category: best-practice
  - id: textformfield-best-accessible-forms
    file: examples/textformfield/best-accessible-forms.tsx
    category: best-practice
  - id: textformfield-anti-placeholder-only
    file: examples/textformfield/anti-placeholder-only.tsx
    category: anti-pattern
  - id: textformfield-anti-excessive-validation
    file: examples/textformfield/anti-excessive-validation.tsx
    category: anti-pattern
  - id: textformfield-anti-unclear-errors
    file: examples/textformfield/anti-unclear-errors.tsx
    category: anti-pattern
---

# TextFormField

## Overview

`TextFormField` is the form-integrated text input. It maps to Flutter's [`TextFormField`](https://api.flutter.dev/flutter/material/TextFormField-class.html), composes the same native control as [`TextField`](/docs/widgets/forms/textfield), and adds **form registration**, **`validator$`**, and coordinated error display.

Decoration — label, placeholder, helper text, errors, prefix/suffix — is configured through the **`InputDecoration` type** (a plain object). Change handlers use **`onInput$`**; there is no `onChange$`.

### Core concepts

| Concept | Behavior |
| --- | --- |
| **Form registration** | Registers with `Form` context using required **`name`** — becomes the submit payload key |
| **Validation** | Optional **`validator$`** QRL returns an error string or `undefined`; native constraints (`required`, `minLength`, …) also apply |
| **Submission integration** | When inside `Form`, invalid fields block `onSubmit$`; valid values appear in `FormValues` under `name` |

### When to use TextFormField

- Text fields inside a validated **`Form`** (login, registration, settings)
- Field-level validators that block submit
- Shared validation timing via **`Form.autovalidateMode`**
- Server re-render errors combined with client validators (`decoration.errorText` + `validator$`)

Use standalone **`TextField`** for search bars, filters, or inputs outside validated forms.

### TextField vs TextFormField

| | `TextField` | `TextFormField` |
| --- | --- | --- |
| **Use when** | Standalone input or manual errors | Field inside `Form` with validation |
| **`name`** | Optional | **Required** |
| **`validator$`** | Not available | Optional QRL returning error string |
| **Form registration** | No (unless native `name` only) | Registers with `Form` context |
| **Decoration chrome** | Rendered by `TextField` | Label/helper/error owned by wrapper; control only inside |
| **Error source** | `decoration.errorText` only | `validator$` result, then `decoration.errorText` |
| **Flutter analogue** | `TextField` | `TextFormField` |

Always wrap `TextFormField` in **`Form`** when you need submit coordination. Outside `Form`, validators still run with standalone timing, but values are not collected on submit.

---

## Import

```tsx
import {
  AutovalidateMode,
  Button,
  Column,
  Form,
  InputType,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

import type { FormValues } from "qwik-flutter-ui";
```

---

## Basic Example

Smallest working `TextFormField` — required `name`, label, and a `Form` wrapper.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="email"
        decoration={{
          label: "Email",
          placeholder: "you@example.com",
        }}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-basic`).

---

## Common Usage

### Login Email Field

Email input with semantic type, autocomplete, and format validation.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Form,
  InputType,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="email"
        type={InputType.email}
        autoComplete="email"
        required
        decoration={{
          label: "Email",
          placeholder: "you@example.com",
        }}
        validator$={$((v) =>
          v.includes("@") ? undefined : "Enter a valid email address",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-login-email`).

---

### Password Field

Use `InputType.password` for obscured input. Pair with `autoComplete="current-password"` or `"new-password"`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Form,
  InputType,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="password"
        type={InputType.password}
        autoComplete="current-password"
        required
        decoration={{ label: "Password" }}
        validator$={$((v) =>
          v.length >= 8 ? undefined : "Password must be at least 8 characters",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-password`).

---

### Registration Form

Multiple `TextFormField` widgets with distinct `name` keys and validators.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  Button,
  Column,
  Form,
  InputType,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
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
        <Button type="submit">Create account</Button>
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-registration`).

---

### Profile Editor

Controlled field with `value` and `onInput$` for live profile editing.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const displayName = useSignal("Alex Chen");

  const onSubmit$ = $((values: FormValues) => {
    displayName.value = values.displayName as string;
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <TextFormField
          name="displayName"
          decoration={{ label: "Display name" }}
          value={displayName.value}
          onInput$={$((v) => {
            displayName.value = v;
          })}
          validator$={$((v) =>
            v.trim() ? undefined : "Display name is required",
          )}
        />
        <Button type="submit">Save profile</Button>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-profile-editor`).

---

## Validation

`TextFormField` combines **native HTML constraints** with optional **`validator$`**. Return **`undefined`** when valid; return an **error string** when invalid. Do not throw from validators.

### Validator behavior

| Mechanism | Behavior |
| --- | --- |
| `required`, `minLength`, `maxLength` | Native browser constraints checked on submit |
| `validator$` | Custom QRL; result shown as `decoration.errorText` |
| `decoration.errorText` | Server or manual error; shown when no validator error |
| `Form.autovalidateMode` | Controls when `validator$` runs between submits |

`validator$` must be a **QRL** — wrap with `$()`.

### Validation messages

Write actionable copy: "Enter a valid email address" — not "Invalid" or "Error". Messages render with `role="alert"` and set `aria-invalid` on the control.

### Validation lifecycle

1. **Mount** — field registers with `Form`; initial value from `defaultValue` or `value`
2. **Interaction** — `validator$` may run per `autovalidateMode` after input
3. **Submit** — native validity → all `validator$` → `onSubmit$` only when every field passes
4. **Error display** — validator result takes precedence over `decoration.errorText`

---

### Required Validation

Combine native `required` with a trim-aware `validator$` for clearer messaging.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AutovalidateMode,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form
      autovalidateMode={AutovalidateMode.onUserInteraction}
      onSubmit$={$(() => {})}
    >
      <TextFormField
        name="name"
        required
        decoration={{ label: "Full name", required: true }}
        validator$={$((v) =>
          v.trim() ? undefined : "Name is required",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-required-validation`).

---

### Email Validation

Use `InputType.email` plus a `validator$` for user-friendly error copy.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AutovalidateMode,
  Form,
  InputType,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form
      autovalidateMode={AutovalidateMode.onUserInteraction}
      onSubmit$={$(() => {})}
    >
      <TextFormField
        name="email"
        type={InputType.email}
        autoComplete="email"
        required
        decoration={{
          label: "Email",
          placeholder: "you@example.com",
        }}
        validator$={$((v) =>
          EMAIL_PATTERN.test(v.trim())
            ? undefined
            : "Enter a valid email address",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-email-validation`).

---

### Password Validation

Stack `minLength` with complexity rules in one `validator$`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AutovalidateMode,
  Form,
  InputType,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form
      autovalidateMode={AutovalidateMode.onUserInteraction}
      onSubmit$={$(() => {})}
    >
      <TextFormField
        name="password"
        type={InputType.password}
        autoComplete="new-password"
        required
        minLength={8}
        decoration={{
          label: "Password",
          helperText: "At least 8 characters with one number",
        }}
        validator$={$((v) => {
          if (v.length < 8) return "Password must be at least 8 characters";
          if (!/[0-9]/.test(v)) return "Include at least one number";
          return undefined;
        })}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-password-validation`).

---

### Custom Validation

Domain or business rules belong in `validator$`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AutovalidateMode,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

const RESERVED = ["admin", "root", "support"];

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form
      autovalidateMode={AutovalidateMode.onUserInteraction}
      onSubmit$={$(() => {})}
    >
      <TextFormField
        name="username"
        required
        decoration={{
          label: "Username",
          helperText: "Letters, numbers, and underscores only",
        }}
        minLength={3}
        validator$={$((v) => {
          if (v.length < 3) return "Username must be at least 3 characters";
          if (!/^[a-z0-9_]+$/i.test(v)) {
            return "Use letters, numbers, and underscores only";
          }
          if (RESERVED.includes(v.trim().toLowerCase())) {
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

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-custom-validation`).

---

## Decoration

`TextFormField` owns label, helper, and error chrome. The inner control receives placeholder, prefix, and suffix via `decoration`. Each example below demonstrates **one decoration feature**.

### Label

Visible label linked to the control with `<label for={inputId}>`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="company"
        decoration={{ label: "Company name" }}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-label`).

---

### Helper Text

Supporting copy linked via `aria-describedby`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="username"
        decoration={{
          label: "Username",
          helperText: "3–20 characters. Letters and numbers only.",
        }}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-helper`).

---

### Error Text

Set `decoration.errorText` for server-side errors. Validator output takes precedence when both are present.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="email"
        decoration={{
          label: "Email",
          errorText: "This email is already registered.",
        }}
        defaultValue="taken@example.com"
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-error`).

---

### Required Indicator

`decoration.required` shows a visual **`*`**. Pair with `required={true}` for native constraint and `aria-required`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="fullName"
        required
        decoration={{
          label: "Full name",
          required: true,
        }}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-required-indicator`).

---

### Prefix Content

Leading adornment inside the control row (string).

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, InputType, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="price"
        type={InputType.number}
        decoration={{
          label: "Price",
          prefix: "$",
          placeholder: "0.00",
        }}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-prefix`).

---

### Suffix Content

Trailing adornment inside the control row (string).

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="weight"
        decoration={{
          label: "Weight",
          suffix: "kg",
          placeholder: "70",
        }}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-suffix`).

---

## Form Integration

### Single Field Form

Minimal form with one registered field and submit handler.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  Button,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values: FormValues) => {
    console.log(values.nickname);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <TextFormField
          name="nickname"
          decoration={{ label: "Nickname" }}
          defaultValue=""
        />
        <Button type="submit">Save</Button>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-single-field-form`).

---

### Multi Field Form

Each `name` becomes a key in `FormValues`. All validators must pass before submit.

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-multi-field-form`).

---

### Submit Workflow

Recommended pattern for validated submission.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import type { FormValues } from "qwik-flutter-ui";
import {
  AutovalidateMode,
  Button,
  Column,
  Form,
  InputType,
  Text,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => {
  const status = useSignal("");

  const onSubmit$ = $((values: FormValues) => {
    status.value = `Submitted: ${JSON.stringify(values)}`;
  });

  return (
    <ThemeProvider theme={{}}>
      <Form
        autovalidateMode={AutovalidateMode.onUserInteraction}
        onSubmit$={onSubmit$}
      >
        <Column gap={16}>
          <TextFormField
            name="email"
            type={InputType.email}
            required
            decoration={{ label: "Email" }}
            validator$={$((v) =>
              v.includes("@") ? undefined : "Enter a valid email",
            )}
          />
          <Button type="submit">Sign up</Button>
          {status.value && <Text>{status.value}</Text>}
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-submit-workflow`).

---

### Validation Workflow

1. Wrap fields in **`Form`**
2. Use **`TextFormField`** with required **`name`**
3. Add **`validator$`** where needed
4. Set **`autovalidateMode`** for inline feedback timing
5. Submit with **`<Button type="submit">`**
6. Handle **`onSubmit$`** — called only when all validators pass

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AutovalidateMode,
  Button,
  Column,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form
      autovalidateMode={AutovalidateMode.onUserInteraction}
      onSubmit$={$(() => {})}
    >
      <Column gap={16}>
        <TextFormField
          name="email"
          required
          decoration={{ label: "Email" }}
          validator$={$((v) =>
            v.includes("@") ? undefined : "Enter a valid email",
          )}
        />
        <TextFormField
          name="confirmEmail"
          required
          decoration={{ label: "Confirm email" }}
          validator$={$((v) =>
            v.includes("@") ? undefined : "Enter a valid email",
          )}
        />
        <Button type="submit">Submit</Button>
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-validation-workflow`).

---

## Validation Modes

Validation timing is controlled by **`Form.autovalidateMode`**, not on `TextFormField` itself. Submit-time validation **always** runs regardless of mode.

| Mode | Enum value | When `validator$` runs |
| --- | --- | --- |
| **Disabled** | `AutovalidateMode.disabled` (default) | Submit only |
| **On submit** | Same as disabled | No inline feedback until submit |
| **On interaction** | `AutovalidateMode.onUserInteraction` | On `input` after the field is touched |
| **Always** | `AutovalidateMode.always` | On every `input` from first interaction |

### Disabled (validate on submit)

Default — quiet until the user submits. Best for short forms.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AutovalidateMode,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-autovalidate-disabled`).

---

### On Submit

There is no separate enum value for submit-only validation. **`AutovalidateMode.disabled`** (the default) validates **`validator$`** only when the user submits — native constraints are still checked at submit time. Omit `autovalidateMode` or set it explicitly to `disabled` for this behavior.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    {/* autovalidateMode defaults to disabled — validate on submit */}
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="promoCode"
        decoration={{ label: "Promo code" }}
        validator$={$((v) =>
          v.length >= 4 ? undefined : "Enter a valid promo code",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-autovalidate-disabled`).

---

### On Interaction

Validate after the user has typed in a field — good balance for longer forms.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AutovalidateMode,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-autovalidate-on-interaction`).

---

### Always

Immediate feedback on every keystroke after first input. Use sparingly.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import {
  AutovalidateMode,
  Form,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-autovalidate-always`).

---

## Variations

Each example demonstrates **one concept** only. All inherit `TextField` props except `name` is required on `TextFormField`.

### Disabled

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="accountId"
        decoration={{ label: "Account ID" }}
        defaultValue="USR-1042"
        disabled
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-disabled`).

---

### Read Only

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="referenceCode"
        decoration={{ label: "Reference code" }}
        defaultValue="REF-9X2K"
        readOnly
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-read-only`).

---

### Multiline

`maxLines > 1` renders a `<textarea>`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="notes"
        decoration={{ label: "Notes" }}
        maxLines={3}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-multiline`).

---

### Max Length

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="tweet"
        decoration={{
          label: "Tweet",
          helperText: "Maximum 280 characters.",
        }}
        maxLength={280}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-max-length`).

---

### Autofocus

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="search"
        decoration={{ label: "Search", placeholder: "Jump to…" }}
        autoFocus
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-autofocus`).

---

## Best Practices

### Clear labels

Every field should have **`decoration.label`**. Labels remain visible; placeholders disappear when typing.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <TextFormField
        name="workEmail"
        decoration={{
          label: "Work email",
          placeholder: "you@company.com",
        }}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-best-clear-labels`).

---

### Useful helper text

Use **`helperText`** for format hints and policy — not as a substitute for the label.

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
        decoration={{
          label: "Password",
          helperText: "At least 8 characters with one number.",
        }}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-best-helper-text`).

---

### Meaningful validation messages

Return specific, actionable strings from `validator$`.

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

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-best-validation-messages`).

---

### Accessible forms

Pair **`decoration.required: true`** with **`required`** on the control. One label per field; group related fields with `Column gap`.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Column, Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      <Column gap={16}>
        <TextFormField
          name="firstName"
          required
          decoration={{ label: "First name", required: true }}
        />
        <TextFormField
          name="lastName"
          required
          decoration={{ label: "Last name", required: true }}
        />
      </Column>
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textformfield-best-accessible-forms`).

---

## Anti-Patterns

### Placeholder-only fields

**Source** (avoid)

```tsx
<TextFormField name="email" decoration={{ placeholder: "Email" }} />
```

**Preferred**

```tsx
<TextFormField
  name="email"
  decoration={{ label: "Email", placeholder: "you@example.com" }}
/>
```

**Why:** Placeholders are not accessible names. Screen readers may not announce them as labels; they also vanish on input.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: textformfield-anti-placeholder-only`, `preview: false`).

---

### Excessive validation

**Source** (avoid)

```tsx
<TextFormField
  name="email"
  validator$={$((v) => {
    if (!v) return "Required";
    if (v.length < 5) return "Too short";
    if (!v.includes("@")) return "No @";
    if (!v.includes(".")) return "No domain";
    if (v.endsWith(".")) return "Bad domain";
    return undefined;
  })}
/>
```

**Preferred**

```tsx
<TextFormField
  name="email"
  validator$={$((v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? undefined
      : "Enter a valid email address",
  )}
/>
```

**Why:** Stacked micro-errors frustrate users. Validate the outcome with one clear message; use `helperText` for format guidance.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: textformfield-anti-excessive-validation`, `preview: false`).

---

### Unclear error messages

**Source** (avoid)

```tsx
<TextFormField
  name="email"
  decoration={{ label: "Email", errorText: "Error" }}
/>
```

**Preferred**

```tsx
<TextFormField
  name="email"
  decoration={{
    label: "Email",
    errorText: "Enter an email in the format name@example.com",
  }}
/>
```

**Why:** Generic errors do not tell users how to recover. Error text uses `role="alert"` — make the announcement useful.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: textformfield-anti-unclear-errors`, `preview: false`).

---

## Accessibility

| Concern | Expectation |
| --- | --- |
| **Labels** | `decoration.label` renders `<label for={inputId}>`. Provide stable `id` when multiple forms share a page |
| **Validation announcements** | Validator and error text render with **`role="alert"`**; control receives **`aria-invalid="true"`** |
| **Required fields** | **`required={true}`** → native `required` + **`aria-required`**. **`decoration.required`** → visual `*` only |
| **Helper text** | Linked via **`aria-describedby`** on the input |
| **Error text** | Linked via **`aria-describedby`** alongside helper text when present |

### Screen reader expectations

- Single-line fields announce as text inputs with type from `InputType`
- Multiline fields (`maxLines > 1`) announce as text areas
- Disabled fields are skipped in tab order
- Read-only fields remain focusable but not editable
- On validation failure, error text is announced via `role="alert"`

### Generated semantics

| Decoration | DOM output |
| --- | --- |
| `label` | `<label for="…">` |
| `helperText` | `<span id="…-helper">` in `aria-describedby` |
| `errorText` / validator output | `<span id="…-error" role="alert">` in `aria-describedby` |
| Control | `<input>` or `<textarea>` with stable `id` from `useId()` when omitted |

---

## SSR

| Topic | Behavior |
| --- | --- |
| **Static rendering** | `TextFormField` renders complete markup on the server: label, native control, helper, and error elements |
| **Initial values** | Use **`defaultValue`** for uncontrolled SSR-friendly fields; use **`value`** + **`onInput$`** for controlled fields after hydration |
| **Validation** | **`validator$`** runs on the client only. After a failed server POST, pass **`decoration.errorText`** from route data |
| **Stable IDs** | Framework-generated ids for label association and `aria-describedby` |
| **Resumability** | Field structure serializes into HTML; `onInput$` and `validator$` hydrate lazily as QRLs |
| **Progressive enhancement** | Native `Form` `action` / `method` works without JS; enhanced validation resumes on the client |

Never pass **`value`** and **`defaultValue`** together on the same field.

---

## Flutter Equivalent

| Topic | Flutter `TextFormField` | qwik-flutter-ui `TextFormField` |
| --- | --- | --- |
| Parent | `Form` + `GlobalKey<FormState>` | `Form` with internal context registry |
| Registration | Via `FormField` state | Via Qwik context on mount |
| Validator | `validator: (v) => String?` | `validator$: QRL<(v) => string \| undefined>` |
| Validate timing | `AutovalidateMode` on `Form` | Same enum on `Form` |
| Decoration | `InputDecoration(...)` | `decoration={{ ... }}` plain object |
| Hint | `hintText` | `decoration.placeholder` |
| Controller | `TextEditingController` | `value` + `onInput$` + signals (deferred v2) |
| DOM | Skia render tree | Native `<input>` / `<textarea>` |

**Flutter**

```dart
Form(
  key: _formKey,
  autovalidateMode: AutovalidateMode.onUserInteraction,
  child: TextFormField(
    decoration: InputDecoration(labelText: 'Email'),
    validator: (v) => v!.contains('@') ? null : 'Invalid email',
  ),
)
```

**qwik-flutter-ui**

```tsx
<Form autovalidateMode={AutovalidateMode.onUserInteraction} onSubmit$={onSubmit$}>
  <TextFormField
    name="email"
    decoration={{ label: "Email" }}
    validator$={$((v) => (v.includes("@") ? undefined : "Invalid email"))}
  />
</Form>
```

Similarities: form grouping, validator functions, autovalidate timing, decoration object, blocked submit when invalid.

Differences: QRL-based validators, native HTML controls, no public `FormState` / `GlobalKey`, `name` required for registration.

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [Form](/docs/widgets/forms/form) | Parent widget — coordinates validation, submit, and `autovalidateMode` |
| [TextField](/docs/widgets/forms/textfield) | Standalone text input without `validator$` or required `name` |
| [Checkbox](/docs/widgets/forms/checkbox) | Boolean control; use `CheckboxFormField` inside validated forms |
| [Dropdown](/docs/widgets/forms/dropdown) | Select control; use `DropdownFormField` inside validated forms |
| [RadioGroup](/docs/widgets/forms/radio-group) | Radio set; use `RadioGroupFormField` inside validated forms |
| [Button](/docs/widgets/forms/button) | Use `type="submit"` to trigger form submission |

---

## Example Metadata

Frontmatter at the top of this page drives the docs site example registry:

- **`examples`** — maps preview `id` to source file under `examples/textformfield/`
- **`category`** — groups examples (`basic`, `common`, `validation`, `decoration`, `form-integration`, `validation-mode`, `variation`, `best-practice`, `anti-pattern`)
- **`related`** — cross-links to `Form`, `TextField`, and selection controls
- **`flutterEquivalent`** — `TextFormField`

When adding examples, keep one concept per file, always include required **`name`**, wrap **`validator$`** and **`onSubmit$`** with `$()`, and import only from `qwik-flutter-ui`.
