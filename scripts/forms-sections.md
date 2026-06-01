## 28. `InputDecoration`

Configuration object for text field chrome — label, placeholder, helper, error, and adornments. Flutter's [`InputDecoration`](https://api.flutter.dev/flutter/material/InputDecoration-class.html).

**Not a widget.** qwik-flutter-ui exports `InputDecoration` as a **TypeScript interface** only (Decision #78, F4). `TextField` and `TextFormField` compose native `<input>` / `<textarea>` plus semantic `<label>` and helper/error elements. There is **no** `<InputDecoration>` component and **no** `src/lib/input-decoration/` folder (§0.10).

### Purpose

- Single configuration object shared by `TextField` and `TextFormField`.
- Flutter parity for `labelText`, `hintText`, `helperText`, `errorText`, prefix/suffix.
- Web-native mapping: `placeholder`, `htmlFor` / `id` wiring, `aria-describedby`.

### Type

```ts
// src/lib/_shared/types.ts (or colocated in text-field/types.ts — see §32)
export interface InputDecoration {
  /** Visible label; maps to <label for={inputId}>. Flutter: labelText */
  label?: string;
  /** Native placeholder. Flutter: hintText */
  placeholder?: string;
  /** Helper copy; linked via aria-describedby. Flutter: helperText */
  helperText?: string;
  /** Error message when invalid. Flutter: errorText */
  errorText?: string;
  /** Visual required indicator; pairs with required on the control */
  required?: boolean;
  /** Leading adornment — string or slotted content */
  prefix?: string;
  /** Trailing adornment — string or slotted content */
  suffix?: string;
}
```

| Prop | v1.3 | Notes |
| ---- | ---- | ----- |
| `label` | Ship | `<label for={inputId}>` |
| `placeholder` | Ship | HTML `placeholder` (F3 recommends this name over `hintText`) |
| `helperText` | Ship | `{id}-helper` in `aria-describedby` |
| `errorText` | Ship | `{id}-error`; `aria-invalid` on control when set |
| `required` | Ship | Visual indicator + `aria-required` on input (not decoration-only) |
| `prefix` / `suffix` | Ship | Optional slot or string |
| `prefixIcon` / `suffixIcon` | Defer | No `Icon` widget in v1.3 — slot SVG in `prefix`/`suffix` |
| `counterText` | Defer | Open question F5 |
| `disabled` / `readOnly` | On `TextField` | Style via field props; do not duplicate on decoration |

### Usage

```tsx
<TextField
  decoration={{
    label: "Email",
    placeholder: "you@example.com",
    helperText: "We never share your email.",
  }}
  type={InputType.email}
  autoComplete="email"
/>
```

### Flutter equivalent

```dart
InputDecoration(
  labelText: 'Email',
  hintText: 'you@example.com',
  helperText: 'We never share your email.',
)
```

### Accessibility considerations

- **Label association:** when `label` is set, render `<label for={inputId}>`. Do not rely on placeholder alone.
- **`aria-describedby`:** space-separated ids `{inputId}-helper` and `{inputId}-error` when present.
- **Errors:** `role="alert"` on error text when non-empty (§35, F8, Decision #75).

### Notes

- **`hintText` → `placeholder`** on the type (web idiom); document Flutter mapping (F3 open).
- **Deferred:** `floatingLabel`, `border`, `filled`, `isDense`, `contentPadding`, theme defaults (`InputDecorationTheme` v1.5+).

### Future extensibility

- `InputDecorationTheme` (v1.5) applies defaults when props omitted.
- `counterText` / `buildCounter` may ship after F5 is resolved.

---

## 29. `TextField`

Single-line or multiline text entry. Flutter's [`TextField`](https://api.flutter.dev/flutter/material/TextField-class.html).

Renders a native **`<input>`** when `maxLines === 1` (default) or **`<textarea>`** when `maxLines > 1`. Never `<div contenteditable>` (Principle #3).

### Props

```ts
export interface TextFieldProps extends BaseProps {
  decoration?: InputDecoration;
  /** Optional — standalone fields only. Required on TextFormField (§30, Decision #79). */
  name?: string;
  value?: string;
  defaultValue?: string;
  onInput$?: QRL<(value: string, ev: InputEvent) => void>;
  type?: InputType;           // §1.29
  inputMode?: InputMode;      // §1.31 — keyboard hint; not validation
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  /** Default 1 → <input>; >1 → <textarea> */
  maxLines?: number;
  minLines?: number;
  /** HTML autocomplete token (Decision #73, F12) */
  autoComplete?: string;
}
```

| Prop | Default | Notes |
| ---- | ------- | ----- |
| `decoration` | — | `InputDecoration` (§28) |
| `name` | — | Optional; omitted outside `<Form>` |
| `value` | — | Controlled value |
| `defaultValue` | — | SSR / uncontrolled initial (F2 open) |
| `onInput$` | — | **Only** change callback (F11, Decision #77); no `onChange$` |
| `type` | `InputType.text` | Maps to `<input type="">`; not used for multiline branch |
| `inputMode` | derived from `type` | Override HTML `inputmode` hint (§1.31) |
| `maxLines` | `1` | `> 1` selects `<textarea>` |
| `minLines` | — | Multiline sizing hint only |
| `autoComplete` | — | Passthrough to `autocomplete` attribute |

### Textarea rendering

| Condition | Element | Flutter parity |
| --------- | ------- | -------------- |
| `maxLines === 1` | `<input>` | Single-line `TextField` |
| `maxLines > 1` | `<textarea>` | Multiline `TextField` |

**No `InputType.multiline`** — use `maxLines > 1` (§1.29 Notes).

**No public `rows` / `cols` props** — map `minLines` / `maxLines` to native `rows` internally (implementation detail).

### Usage

```tsx
const email = useSignal("");

<TextField
  decoration={{ label: "Email", placeholder: "you@example.com" }}
  type={InputType.email}
  inputMode={InputMode.email}
  autoComplete="email"
  value={email.value}
  onInput$={(v) => (email.value = v)}
/>

<TextField
  decoration={{ label: "Bio" }}
  maxLines={4}
  minLines={2}
  defaultValue="Hello"
/>
```

### Flutter equivalent

```dart
TextField(
  decoration: InputDecoration(labelText: 'Email', hintText: 'you@example.com'),
  keyboardType: TextInputType.emailAddress,
  maxLines: 1,
)
```

### Accessibility considerations

- Real `<input>` or `<textarea>`; stable `id` via `useId()` when not provided (§36).
- `aria-invalid` when `decoration.errorText` or validator error is shown.
- `aria-describedby` joins helper and error ids.

### Notes

- **`obscureText`** → `type={InputType.password}`.
- **`TextEditingController`** deferred v2 — use `value` + `onInput$` + signals.
- **`onChanged`** not shipped — `onInput$` only (§0.7).
- Deferred: `inputFormatters`, `FocusNode`, `textCapitalization`, `AutofillHint` enum (v1.5+).

### Future extensibility

- `TextEditingController`, `onChange$`, debounced validators (v2).

---

## 30. `TextFormField`

`TextField` integrated with `Form` validation and submit payload. Flutter's [`TextFormField`](https://api.flutter.dev/flutter/material/TextFormField-class.html).

**Composes `TextField`** — does not duplicate markup (shared implementation module).

### Props

```ts
export interface TextFormFieldProps extends Omit<TextFieldProps, "name"> {
  /** Required — form registration key (Decision #79, F7) */
  name: string;
  validator$?: QRL<(value: string) => string | undefined>;
}
```

| Prop | Notes |
| ---- | ----- |
| `name` | **Required** — submit payload key, validation scope |
| `validator$` | Returns error message or `undefined` when valid |
| _(inherits)_ | All `TextFieldProps` except `name` |

### Usage

```tsx
<Form
  autovalidateMode={AutovalidateMode.onUserInteraction}
  onSubmit$={(values) => console.log(values.email)}
>
  <TextFormField
    name="email"
    decoration={{ label: "Email", errorText: serverError }}
    type={InputType.email}
    validator$={(v) => (v.includes("@") ? undefined : "Invalid email")}
  />
  <Button type="submit">Sign in</Button>
</Form>
```

### Flutter equivalent

```dart
TextFormField(
  decoration: InputDecoration(labelText: 'Email'),
  validator: (v) => v.contains('@') ? null : 'Invalid email',
)
```

### Notes

- Validation timing from `Form.autovalidateMode` (§34).
- `decoration.errorText` may be set by validator result or server props.

---

## 31. `Form`

Groups fields and coordinates validation / submit. Flutter's [`Form`](https://api.flutter.dev/flutter/widgets/Form-class.html).

Renders native **`<form>`**. Use `<Button type="submit">` (§17) to submit.

### Props

```ts
export type FormValues = Record<string, unknown>;

export type FormFieldValidator = (value: unknown) => string | undefined;

export interface FormProps extends BaseProps {
  onSubmit$?: QRL<(values: FormValues, ev: SubmitEvent) => void>;
  autovalidateMode?: AutovalidateMode;
  action?: string;
  method?: "get" | "post";
}
```

| Prop | Default | Notes |
| ---- | ------- | ----- |
| `onSubmit$` | — | Called with `FormValues` when valid; blocked when invalid |
| `autovalidateMode` | `disabled` | §1.30; F6 → validate on `input` after touched |
| `action` / `method` | — | Native HTML passthrough; progressive enhancement |
| _base props_ | — | §0.6 |

### Scope (v1.3)

| Feature | Ship |
| ------- | ---- |
| `<form>` + `onSubmit$` | Yes |
| `autovalidateMode` | Yes |
| `TextFormField` registration via context | Yes |
| Block submit when invalid | Yes |
| Server `errorText` via props | Document pattern only |

**Deferred:** `reset()`, `FormState` / `useForm()`, async validators, `FormField<T>`, field arrays (v2).

### Usage

```tsx
<Form onSubmit$={(values) => save(values as { email: string })}>
  <TextFormField name="email" decoration={{ label: "Email" }} />
  <Button type="submit">Submit</Button>
</Form>
```

### Notes

- **`noValidate`:** recommended when using custom `validator$` (F1 open) to avoid duplicate browser UI.
- v1.3 collects **string** values from text fields; `FormValues` is `unknown` for v1.4+ controls (Decision #76).
- No `GlobalKey<FormState>` — Qwik context for registration (§41.13).

---

## 32. v1.3 forms — shared types review

| Candidate | Verdict | Location |
| --------- | ------- | -------- |
| `InputDecoration` | **Ship** | `src/lib/_shared/types.ts` (§28) |
| `FormFieldValidator` | **Ship** | `(value: unknown) => string \| undefined` |
| `FormValues` | **Ship** | `Record<string, unknown>` (Decision #76) |
| `FormState` | **Defer** | v2 |
| `FieldState` | **Defer** | Internal context only |

### `FormValues`

`Record<string, unknown>` forward-compatible with `Checkbox` (`boolean`), `Radio` (`string`), `Dropdown` (`string` \| `string[]`) in v1.4+. v1.3 submit payload is strings from `TextFormField`; consumers narrow at the boundary.

---

## 33. v1.3 forms — shared enums review

### New §1 entries (v1.3)

Add **`InputType`** (§1.29), **`AutovalidateMode`** (§1.30), **`InputMode`** (§1.31) to `src/lib/_shared/enums.ts`.

| Candidate | Verdict |
| --------- | ------- |
| `ValidationMode` | **Reject** — duplicate of `AutovalidateMode` |
| `TextCapitalization` | **Defer** v1.4+ |
| `AutofillHint` | **Defer v1.5+** — use `autoComplete?: string` (Decision #73) |

See §1.29–§1.31 for member lists and excluded `InputType` values.

---

## 34. v1.3 forms — validation strategy

### Options

| Option | Description |
| ------ | ----------- |
| **A** | Native HTML5 only |
| **B** | Custom `validator$` only |
| **C** | **Custom primary** + native hints (`required`, `type`, `minLength` / `maxLength`) |

**Recommendation: (C)** — ship in v1.3 (F10 open for `noValidate` default).

### Behavior

- **`validator$`:** QRL returning `string | undefined` (error message). No throw.
- **`Form`:** runs all validators on submit; calls `onSubmit$` only when every field valid.
- **Errors:** surface via `decoration.errorText` + `aria-invalid` + `role="alert"` (§35).
- **`<form noValidate>`:** when custom validation is active — avoid duplicate browser popups (F1).

### Timing matrix

| `autovalidateMode` | When `validator$` runs |
| ------------------ | ---------------------- |
| `disabled` | Submit only |
| `onUserInteraction` | On **`input`** after field is **touched** (F6, Decision #74) |
| `always` | On every `input` from mount |

### SSR

- `validator$` does not run on server (QRL client). Optional server-provided `decoration.errorText` on fields after failed POST.

---

## 35. v1.3 forms — accessibility review

Cross-widget rules for §28–§31:

- **Labels:** prefer visible `<label for={inputId}>` from `decoration.label`; `aria-label` only when no visible label.
- **`aria-describedby`:** `{inputId}-helper` and `{inputId}-error` when present.
- **Required:** native `required` + visible indicator when `required` is true.
- **Errors:** `role="alert"` on non-empty error text (Decision #75). Do not stack `aria-live` on the same node.
- **Keyboard:** native tab order; `:focus-visible` in CSS module.
- **Submit:** use `<Button type="submit">` with native `disabled` when appropriate (§17) — not `pointer-events` only.

**F6 + F8:** `onInput` validation may update errors frequently; intentional for immediate feedback.

---

## 36. v1.3 forms — SSR and resumability review

- **Initial values:** `defaultValue` in SSR HTML; controlled `value` from server props for resume (F2 open).
- **Stable IDs:** prefer Qwik **`useId()`** (or framework-approved equivalent) for `inputId`, `{id}-helper`, `{id}-error`. **Reject** module-level counters or `Math.random()` — hydration mismatch risk. Optional consumer `id?:` override unchanged.
- **Validation:** no `validator$` on server; server may pass `decoration.errorText`.
- **Progressive enhancement:** native `action` / `method` works without JS; enhanced with `onSubmit$` + validation when hydrated.
- **Qwik City:** document POST + re-render with errors — out of library scope (example only).

---

## 37. v1.3 Forms open questions

Resolve before **widget implementation** (Phase 12, §45). API specs in §28–§36 may be authored while items below are open.

### Open questions summary

| Status | IDs | Notes |
| ------ | --- | ----- |
| **Approved** (§43 #73–#79) | F4, F6, F7, F8, F9, F11, F12 | Frozen in widget specs |
| **Open** | F1, F2, F3, F5, F10 | Block Phase 12 implementation |

### Open questions table

| ID | Topic | Status |
| --- | ----- | ------ |
| F1 | `<form noValidate>` default with custom validation | Open |
| F2 | Controlled-only vs `defaultValue` + controlled | Open |
| F3 | `placeholder` vs `hintText` on `InputDecoration` | Open |
| F4 | `InputDecoration` type vs component | **Approved** — type only (#78) |
| F5 | `counterText` / maxlength counter in v1.3 | Open |
| F6 | `onUserInteraction` → validate on `input` | **Approved** (#74) |
| F7 | `TextFormField.name` required | **Approved** (#79) |
| F8 | Error `role="alert"` | **Approved** (#75) |
| F9 | `FormValues` as `unknown` | **Approved** (#76) |
| F10 | Native HTML5 + custom coexistence (Option C details) | Open |
| F11 | `onInput$` only | **Approved** (#77) |
| F12 | `autoComplete` as `string` | **Approved** (#73) |

### F1 — `<form noValidate>` default

**Question:** Should `<Form>` set `noValidate` by default when using custom `validator$`?

**Recommendation:** **Yes** — default `noValidate` when any `TextFormField` registers a `validator$` or when `autovalidateMode !== disabled`. Allow opt-out prop if needed later.

### F2 — Controlled vs `defaultValue`

**Question:** Support only controlled `value`, or both `defaultValue` and `value`?

**Recommendation:** **Both** — `defaultValue` for SSR / progressive enhancement; `value` + `onInput$` for controlled apps (mirror native inputs).

### F3 — `placeholder` vs `hintText`

**Question:** Primary name on `InputDecoration`?

**Recommendation:** **`placeholder`** (web idiom); document Flutter `hintText` mapping in §28.

### F5 — Character counter

**Question:** Ship `counterText` or auto-counter from `maxLength` in v1.3?

**Recommendation:** **Defer** — add in v1.4+ or when `InputDecorationTheme` lands.

### F10 — Option C coexistence

**Question:** How do native `required` / `type` interact with `validator$`?

**Recommendation:** Custom `validator$` is authoritative for submit blocking and displayed errors; native attributes remain for accessibility and progressive enhancement without relying on browser validation UI when `noValidate` is set (F1).

### Approved summaries (F4, F6–F9, F11–F12)

See §43 decisions **#73–#79** and §28–§31 widget specs.

### Final review checklist (v1.3 forms)

| Check | Status |
| ----- | ------ |
| Flutter-first + web mappings | Pass |
| Native `<input>` / `<textarea>` / `<form>` | Pass |
| Accessibility | Pass |
| SSR + `useId()` | Pass |
| 3 enums only (§1.29–§1.31) | Pass |
| 7 / 12 OQs approved | F1, F2, F3, F5, F10 open |
| No `TextEditingController` / `FocusNode` / `FormState` | Pass |
