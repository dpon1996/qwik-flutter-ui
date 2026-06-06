---
title: TextField
description: Single-line or multiline text entry with InputDecoration chrome, native HTML controls, and theme-aware styling.
widget: TextField
category: forms
flutterEquivalent: TextField
status: shipped
related:
  - TextFormField
  - Form
  - ThemeProvider
  - Checkbox
  - Dropdown
since: "0.0.1"
examples:
  - id: textfield-basic
    file: examples/textfield/basic.tsx
    category: basic
  - id: textfield-email
    file: examples/textfield/email.tsx
    category: common
  - id: textfield-password
    file: examples/textfield/password.tsx
    category: common
  - id: textfield-search
    file: examples/textfield/search.tsx
    category: common
  - id: textfield-multiline-common
    file: examples/textfield/multiline-common.tsx
    category: common
  - id: textfield-label
    file: examples/textfield/label.tsx
    category: variation
  - id: textfield-placeholder
    file: examples/textfield/placeholder.tsx
    category: variation
  - id: textfield-helper
    file: examples/textfield/helper.tsx
    category: variation
  - id: textfield-error
    file: examples/textfield/error.tsx
    category: variation
  - id: textfield-required-indicator
    file: examples/textfield/required-indicator.tsx
    category: variation
  - id: textfield-prefix
    file: examples/textfield/prefix.tsx
    category: variation
  - id: textfield-suffix
    file: examples/textfield/suffix.tsx
    category: variation
  - id: textfield-required-validation
    file: examples/textfield/required-validation.tsx
    category: common
  - id: textfield-email-validation
    file: examples/textfield/email-validation.tsx
    category: common
  - id: textfield-custom-validation
    file: examples/textfield/custom-validation.tsx
    category: common
  - id: textfield-in-form
    file: examples/textfield/in-form.tsx
    category: composition
  - id: textfield-form-field-comparison
    file: examples/textfield/form-field-comparison.tsx
    category: composition
  - id: textfield-submission
    file: examples/textfield/submission.tsx
    category: composition
  - id: textfield-disabled
    file: examples/textfield/disabled.tsx
    category: variation
  - id: textfield-read-only
    file: examples/textfield/read-only.tsx
    category: variation
  - id: textfield-autofocus
    file: examples/textfield/autofocus.tsx
    category: variation
  - id: textfield-multiline
    file: examples/textfield/multiline.tsx
    category: variation
  - id: textfield-max-length
    file: examples/textfield/max-length.tsx
    category: variation
  - id: textfield-anti-placeholder-only
    file: examples/textfield/anti-placeholder-only.tsx
    category: anti-pattern
  - id: textfield-anti-excessive-validation
    file: examples/textfield/anti-excessive-validation.tsx
    category: anti-pattern
  - id: textfield-anti-unclear-errors
    file: examples/textfield/anti-unclear-errors.tsx
    category: anti-pattern
---

# TextField

## Overview

`TextField` captures single-line or multiline text input. It maps to Flutter's [`TextField`](https://api.flutter.dev/flutter/material/TextField-class.html) and renders a native **`<input>`** (default) or **`<textarea>`** (when `maxLines > 1`).

Decoration — label, placeholder, helper text, errors, prefix/suffix — is configured through the **`InputDecoration` type** (a plain object, not a component). Change handlers use **`onInput$`**; there is no `onChange$`.

### When to use TextField

- Standalone inputs outside a validated `Form` (search bars, filters, settings)
- Controlled or uncontrolled text entry with `value` / `defaultValue`
- Displaying server-side or manual errors via `decoration.errorText`
- Simple fields inside `Form` when you only need native HTML submission (optional `name`)

### TextField vs TextFormField

| | `TextField` | `TextFormField` |
| --- | --- | --- |
| **Use when** | Standalone input or display-only errors | Field inside `Form` with validation |
| **`name`** | Optional | **Required** |
| **`validator$`** | Not available | Optional QRL returning error string |
| **Form registration** | Optional (`name` for native submit) | Registers with `Form` context |
| **Decoration chrome** | Rendered by `TextField` | Owned by wrapper; `TextField` renders control only |
| **Flutter analogue** | `TextField` | `TextFormField` |

For submit blocking, field-level validators, and `autovalidateMode` timing, use **`TextFormField`** inside **`Form`**.

---

## Import

```tsx
import { TextField } from "qwik-flutter-ui";
```

Import enums and form widgets when examples use them:

```tsx
import {
  AutovalidateMode,
  Form,
  InputType,
  TextField,
  TextFormField,
  ThemeProvider,
} from "qwik-flutter-ui";
```

---

## Basic Example

The smallest working `TextField` — label and placeholder via `decoration`.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{
        label: "Name",
        placeholder: "Your name",
      }}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-basic`).

---

## Common Usage

### Email Field

Use `InputType.email` for semantic input type and email keyboard hints. Pair with `autoComplete="email"`.

**Source**

```tsx
import { $, component$, useSignal } from "@builder.io/qwik";
import { InputType, TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const email = useSignal("");

  const onEmailInput$ = $((value: string) => {
    email.value = value;
  });

  return (
    <ThemeProvider theme={{}}>
      <TextField
        decoration={{
          label: "Email",
          placeholder: "you@example.com",
        }}
        type={InputType.email}
        autoComplete="email"
        value={email.value}
        onInput$={onEmailInput$}
      />
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-email`).

---

### Password Field

Use `InputType.password` (Flutter's `obscureText` equivalent).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { InputType, TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{
        label: "Password",
        placeholder: "Enter password",
      }}
      type={InputType.password}
      autoComplete="current-password"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-password`).

---

### Search Field

Use `InputType.search` for search inputs. Add a prefix character for quick visual scanning.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { InputType, TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{
        label: "Search",
        placeholder: "Search components…",
        prefix: "⌕",
      }}
      type={InputType.search}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-search`).

---

### Multiline Field

Set **`maxLines > 1`** to render a `<textarea>`. There is no `InputType.multiline`.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{ label: "Bio", helperText: "Brief description for your profile." }}
      maxLines={4}
      minLines={2}
      defaultValue=""
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-multiline-common`).

---

## Decoration

`InputDecoration` is a **TypeScript interface** — pass a plain object to the `decoration` prop. Each example below demonstrates **one feature**.

### Label

Renders a `<label for={inputId}>` associated with the control.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField decoration={{ label: "Username" }} />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-label`).

---

### Placeholder

Maps to the native HTML `placeholder` attribute (Flutter: `hintText`).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{
        label: "City",
        placeholder: "San Francisco",
      }}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-placeholder`).

---

### Helper Text

Supporting copy linked via `aria-describedby`.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{
        label: "Username",
        helperText: "3–20 characters. Letters and numbers only.",
      }}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-helper`).

---

### Error Text

Display a validation or server error. Sets `aria-invalid` on the control when error text is present.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{
        label: "Email",
        errorText: "This email is already registered.",
      }}
      defaultValue="taken@example.com"
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-error`).

---

### Required Indicator

`decoration.required` shows a visual **`*`** next to the label. Set **`required={true}`** on `TextField` for native constraint and `aria-required`.

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{
        label: "Full name",
        required: true,
      }}
      required
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-required-indicator`).

---

### Prefix Content

Leading adornment inside the field row (string).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { InputType, TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{
        label: "Price",
        prefix: "$",
        placeholder: "0.00",
      }}
      type={InputType.number}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-prefix`).

---

### Suffix Content

Trailing adornment inside the field row (string).

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{
        label: "Weight",
        suffix: "kg",
        placeholder: "70",
      }}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-suffix`).

---

## Validation

`TextField` supports **native HTML constraints** (`required`, `minLength`, `maxLength`) and **displaying errors** via `decoration.errorText`. For **`Form`-integrated validators** that block submit, use **`TextFormField`** with **`validator$`**.

### Validator behavior

| Mechanism | Where | Behavior |
| --- | --- | --- |
| `required`, `minLength`, `maxLength` | `TextField` | Native browser constraints |
| `decoration.errorText` | `TextField` | Visual error + `aria-invalid`; no automatic validation |
| `validator$` | `TextFormField` | Returns error string or `undefined` when valid |
| `autovalidateMode` | `Form` | Controls when `validator$` runs (`disabled`, `onUserInteraction`, `always`) |

`validator$` must be a **QRL** — wrap with `$()`.

### Required Field

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
    <Form autovalidateMode={AutovalidateMode.onUserInteraction}>
      <TextFormField
        name="name"
        decoration={{ label: "Full name" }}
        validator$={$((v) => (v.trim() ? undefined : "Name is required"))}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-required-validation`).

---

### Email Validation

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
    <Form autovalidateMode={AutovalidateMode.onUserInteraction}>
      <TextFormField
        name="email"
        decoration={{ label: "Email", placeholder: "you@example.com" }}
        type={InputType.email}
        autoComplete="email"
        validator$={$((v) =>
          v.includes("@") ? undefined : "Enter a valid email address",
        )}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-email-validation`).

---

### Custom Validation

Return a specific message from `validator$` for business rules.

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
    <Form autovalidateMode={AutovalidateMode.onUserInteraction}>
      <TextFormField
        name="username"
        decoration={{ label: "Username", helperText: "Must be at least 3 characters." }}
        minLength={3}
        validator$={$((v) => {
          if (v.length < 3) return "Username must be at least 3 characters";
          if (!/^[a-z0-9_]+$/i.test(v)) {
            return "Use letters, numbers, and underscores only";
          }
          return undefined;
        })}
      />
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-custom-validation`).

---

## Form Integration

### Inside Form

`TextField` with a `name` participates in native form structure. Prefer **`TextFormField`** when you need validation and typed submit payloads.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Column, Form, TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => {
  const onSubmit$ = $((values) => {
    console.log(values);
  });

  return (
    <ThemeProvider theme={{}}>
      <Form onSubmit$={onSubmit$}>
        <Column gap={16}>
          <TextField
            name="nickname"
            decoration={{ label: "Nickname" }}
            defaultValue=""
          />
        </Column>
      </Form>
    </ThemeProvider>
  );
});
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-in-form`).

---

### TextFormField Comparison

`TextFormField` wraps the same control with form registration and merged error display.

**Source**

```tsx
import { $, component$ } from "@builder.io/qwik";
import { Form, TextFormField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <Form onSubmit$={$(() => {})}>
      {/* Validated — recommended inside Form */}
      <TextFormField
        name="email"
        decoration={{ label: "Email" }}
        validator$={$((v) => (v.includes("@") ? undefined : "Invalid email"))}
      />

      {/* Standalone TextField — no validator$, manual errorText only */}
      {/* <TextField decoration={{ label: "Email", errorText: "..." }} /> */}
    </Form>
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-form-field-comparison`).

---

### Submission Workflow

1. Wrap fields in **`Form`**
2. Use **`TextFormField`** with required **`name`**
3. Add **`validator$`** where needed
4. Submit with **`<Button type="submit">`**
5. Handle **`onSubmit$`** — called only when all validators pass

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
            decoration={{ label: "Email" }}
            type={InputType.email}
            required
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

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-submission`).

---

## Variations

Each example demonstrates **one concept** only.

### Disabled

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{ label: "Account ID" }}
      defaultValue="USR-1042"
      disabled
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-disabled`).

---

### Read Only

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{ label: "Reference code" }}
      defaultValue="REF-9X2K"
      readOnly
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-read-only`).

---

### Autofocus

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{ label: "Search", placeholder: "Jump to…" }}
      autoFocus
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-autofocus`).

---

### Multiline

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField decoration={{ label: "Notes" }} maxLines={3} />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-multiline`).

---

### Max Length

**Source**

```tsx
import { component$ } from "@builder.io/qwik";
import { TextField, ThemeProvider } from "qwik-flutter-ui";

export default component$(() => (
  <ThemeProvider theme={{}}>
    <TextField
      decoration={{
        label: "Tweet",
        helperText: "Maximum 280 characters.",
      }}
      maxLength={280}
    />
  </ThemeProvider>
));
```

**Preview**

> **Preview placeholder** — `ExamplePreview` renders here (`id: textfield-max-length`).

---

## Best Practices

### Clear labels

Every field should have **`decoration.label`**. Labels remain visible; placeholders disappear when typing.

```tsx
<TextField decoration={{ label: "Work email", placeholder: "you@company.com" }} />
```

### Helper text usage

Use **`helperText`** for format hints and policy — not for the label itself.

```tsx
<TextField
  decoration={{
    label: "Password",
    helperText: "At least 8 characters with one number.",
  }}
  type={InputType.password}
/>
```

### Validation messaging

Write errors as **actionable sentences**: "Enter a valid email address" — not "Invalid" or "Error".

When using `TextFormField`, return `undefined` from `validator$` when valid; return a string when invalid.

### Accessibility-friendly forms

- Pair **`decoration.required: true`** (visual `*`) with **`required`** on the control
- One label per field; do not duplicate label text in placeholder
- Group related fields with `Column gap` for consistent spacing

---

## Anti-Patterns

### Placeholder-only fields

**Source** (avoid)

```tsx
<TextField decoration={{ placeholder: "Email" }} />
```

**Preferred**

```tsx
<TextField decoration={{ label: "Email", placeholder: "you@example.com" }} />
```

**Why:** Placeholders are not accessible names. Screen readers may not announce them as labels; they also vanish on input.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: textfield-anti-placeholder-only`, `preview: false`).

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

> **Preview placeholder** — code-only anti-pattern (`id: textfield-anti-excessive-validation`, `preview: false`).

---

### Unclear error messages

**Source** (avoid)

```tsx
<TextField decoration={{ label: "Email", errorText: "Error" }} />
```

**Preferred**

```tsx
<TextField
  decoration={{
    label: "Email",
    errorText: "Enter an email in the format name@example.com",
  }}
/>
```

**Why:** Generic errors do not tell users how to recover. Error text uses `role="alert"` — make the announcement useful.

**Preview**

> **Preview placeholder** — code-only anti-pattern (`id: textfield-anti-unclear-errors`, `preview: false`).

---

## Accessibility

### Labels

When `decoration.label` is set, a **`<label for={inputId}>`** is rendered and associated with the control. Provide a stable `id` prop when multiple forms exist on one page.

### Helper text

Helper copy renders in an element referenced by **`aria-describedby`** on the input, so assistive technology reads it after the label.

### Error announcements

Non-empty **`decoration.errorText`** (or validator output on `TextFormField`) renders with **`role="alert"`** and is linked via `aria-describedby`. The control receives **`aria-invalid="true"`**.

### Required fields

- **`required={true}`** → native `required` + **`aria-required="true"`**
- **`decoration.required`** → visual asterisk only (`aria-hidden` on the mark)

Use both for required fields that users must complete.

### Screen reader expectations

- Single-line fields announce as text inputs with type from `InputType`
- Multiline fields announce as text areas
- Disabled fields are skipped in tab order and marked disabled
- Read-only fields remain focusable but not editable

### Generated semantics

| Decoration | DOM output |
| --- | --- |
| `label` | `<label for="…">` |
| `helperText` | `<span id="…-helper">` in `aria-describedby` |
| `errorText` | `<span id="…-error" role="alert">` in `aria-describedby` |
| Control | `<input>` or `<textarea>` with stable `id` from `useId()` when omitted |

---

## SSR

### Static rendering

`TextField` renders complete markup on the server: label, native control, helper, and error elements. Use **`defaultValue`** for uncontrolled SSR-friendly initial values; use **`value`** + **`onInput$`** for controlled fields after hydration.

Never pass **`value`** and **`defaultValue`** together.

### Resumability compatibility

Field structure and styling are static. **`onInput$`** handlers hydrate lazily as QRLs — typing works after the handler boundary resumes without eager client JS for inert fields.

### Hydration behavior

`validator$` on `TextFormField` runs on the client according to `Form.autovalidateMode`. Initial HTML reflects props at render time; validator-driven errors appear after interaction or submit.

---

## Theming

### ThemeProvider interaction

Wrap the app in **`ThemeProvider`**. Text field styling reads **`inputDecorationTheme`** and **`colorScheme`** from context when per-field style props are omitted.

```tsx
<ThemeProvider inherit={false} theme={{}}>
  <TextField decoration={{ label: "Email" }} />
</ThemeProvider>
```

Themed field chrome requires an ancestor **`ThemeProvider`**.

### InputDecorationTheme interaction

Set shared field defaults on the theme object:

```tsx
import { createThemeData, TextField, ThemeProvider } from "qwik-flutter-ui";

const theme = createThemeData({
  inputDecorationTheme: {
    borderRadius: 8,
    outlineColor: "#cbd5e1",
    focusOutlineColor: "#1976d2",
  },
});

<ThemeProvider theme={theme}>
  <TextField decoration={{ label: "Themed field" }} />
</ThemeProvider>
```

`InputDecorationTheme` fields: `labelColor`, `helperColor`, `errorColor`, `placeholderColor`, `outlineColor`, `focusOutlineColor`, `borderRadius`, `padding`, `requiredIndicatorColor`.

### Theme inheritance

Per-field props (`outlineColor`, `labelColor`, …) **override** theme defaults. Explicit props win over `inputDecorationTheme` (§0.6).

---

## Flutter Equivalent

| Topic | Flutter | qwik-flutter-ui `TextField` |
| --- | --- | --- |
| Decoration | `InputDecoration(...)` object | `decoration={{ ... }}` plain object (type only) |
| Hint | `hintText` | `decoration.placeholder` |
| Label | `labelText` | `decoration.label` |
| Obscured text | `obscureText: true` | `type={InputType.password}` |
| Multiline | `maxLines: n` | `maxLines={n}` (`> 1` → `<textarea>`) |
| Change handler | `onChanged` | `onInput$` only |
| Controller | `TextEditingController` | `value` + `onInput$` + signals (deferred v2) |
| Form validation | `TextFormField` + `validator` | `TextFormField` + `validator$` |

**Flutter**

```dart
TextField(
  decoration: InputDecoration(
    labelText: 'Email',
    hintText: 'you@example.com',
    helperText: 'We never share your email.',
  ),
  keyboardType: TextInputType.emailAddress,
  onChanged: (v) => print(v),
)
```

**qwik-flutter-ui**

```tsx
<TextField
  decoration={{
    label: "Email",
    placeholder: "you@example.com",
    helperText: "We never share your email.",
  }}
  type={InputType.email}
  onInput$={onEmailInput$}
/>
```

**Similarities:** Decoration concepts, `maxLines`, email/password input types, form field split (`TextField` vs `TextFormField`).

**Differences:** No `InputDecoration` widget; `placeholder` not `hintText`. No `onChanged` — `onInput$` only. Flat theme overrides instead of `InputDecorationTheme` nested in `ThemeData` constructors (use `ThemeProvider` + `createThemeData`). Prefix/suffix are strings in v1 (not icon widgets).

---

## Related Widgets

| Widget | Relationship |
| --- | --- |
| [TextFormField](/docs/widgets/forms/text-form-field) | Form-integrated variant with `validator$` and required `name`. |
| [Form](/docs/widgets/forms/form) | Groups fields, coordinates validation, and handles submit. |
| [ThemeProvider](/docs/widgets/theming/theme-provider) | Supplies `inputDecorationTheme` and color scheme defaults. |
| [Checkbox](/docs/widgets/selection/checkbox) | Often combined in the same `Form` payload. |
| [Dropdown](/docs/widgets/selection/dropdown) | Selection complement in multi-field forms. |

---

## Example Metadata

This page is registered with the following frontmatter for the documentation site, search indexing, and the example registry:

```yaml
title: TextField
description: Single-line or multiline text entry with InputDecoration chrome, native HTML controls, and theme-aware styling.
widget: TextField
category: forms
flutterEquivalent: TextField
status: shipped
related:
  - TextFormField
  - Form
  - ThemeProvider
  - Checkbox
  - Dropdown
since: "0.0.1"
examples:
  - id: textfield-basic
    file: examples/textfield/basic.tsx
    category: basic
  - id: textfield-email
    file: examples/textfield/email.tsx
    category: common
  - id: textfield-password
    file: examples/textfield/password.tsx
    category: common
  - id: textfield-search
    file: examples/textfield/search.tsx
    category: common
  - id: textfield-multiline-common
    file: examples/textfield/multiline-common.tsx
    category: common
  - id: textfield-label
    file: examples/textfield/label.tsx
    category: variation
  - id: textfield-placeholder
    file: examples/textfield/placeholder.tsx
    category: variation
  - id: textfield-helper
    file: examples/textfield/helper.tsx
    category: variation
  - id: textfield-error
    file: examples/textfield/error.tsx
    category: variation
  - id: textfield-required-indicator
    file: examples/textfield/required-indicator.tsx
    category: variation
  - id: textfield-prefix
    file: examples/textfield/prefix.tsx
    category: variation
  - id: textfield-suffix
    file: examples/textfield/suffix.tsx
    category: variation
  - id: textfield-required-validation
    file: examples/textfield/required-validation.tsx
    category: common
  - id: textfield-email-validation
    file: examples/textfield/email-validation.tsx
    category: common
  - id: textfield-custom-validation
    file: examples/textfield/custom-validation.tsx
    category: common
  - id: textfield-in-form
    file: examples/textfield/in-form.tsx
    category: composition
  - id: textfield-form-field-comparison
    file: examples/textfield/form-field-comparison.tsx
    category: composition
  - id: textfield-submission
    file: examples/textfield/submission.tsx
    category: composition
  - id: textfield-disabled
    file: examples/textfield/disabled.tsx
    category: variation
  - id: textfield-read-only
    file: examples/textfield/read-only.tsx
    category: variation
  - id: textfield-autofocus
    file: examples/textfield/autofocus.tsx
    category: variation
  - id: textfield-multiline
    file: examples/textfield/multiline.tsx
    category: variation
  - id: textfield-max-length
    file: examples/textfield/max-length.tsx
    category: variation
  - id: textfield-anti-placeholder-only
    file: examples/textfield/anti-placeholder-only.tsx
    category: anti-pattern
  - id: textfield-anti-excessive-validation
    file: examples/textfield/anti-excessive-validation.tsx
    category: anti-pattern
  - id: textfield-anti-unclear-errors
    file: examples/textfield/anti-unclear-errors.tsx
    category: anti-pattern
```

Each `examples` entry maps to an `ExamplePreview` block on this page and a file under `website/examples/textfield/` when the docs site is implemented.
