# v1.6 Form Decoration — specification sections (for API_DESIGN.md §58–§72)

> **Integrated** into `docs/API_DESIGN.md` §58–§72. Edit this file first, then re-sync if sections change.

> **Status:** Specified — architecture review complete. Decisions **FD1–FD10** approved (§43).
> **Scope:** Typed `*FormField` wrappers + internal shared field infrastructure. **No implementation in this document.**

---

## 58. v1.6 Form Decoration — overview

### 58.1 Purpose

- Flutter-style form composition: shared decoration chrome, reusable validation UX, typed `*FormField` wrappers.
- Extract duplicated label / helper / error markup from `TextField` into internal shared infrastructure.
- Ship `CheckboxFormField`, `DropdownFormField`, `RadioGroupFormField` (deferred from §53 v2 note).

### 58.2 Architecture

| Layer | Public v1.6 | Internal only |
| ----- | ----------- | ------------- |
| Registration | `Form`, `*FormField` | `useFormFieldRegistration` hook |
| Decoration chrome | `InputDecoration`, `FieldDecoration` (types) | `field-decoration` renderer |
| Controls | `TextField`, `Checkbox`, `Dropdown`, `RadioGroup` | — |

**Typed wrappers are the only public field abstraction.** Public generic `FormField<T>` is **deferred to v2** (§60).

### 58.3 v1.6 non-goals

Explicitly **out of scope** for v1.6 to prevent scope creep:

| Item | Status |
| ---- | ------ |
| Public `FormField<T>` widget | Defer v2 (§60) |
| `FieldState` public type | Defer v2 |
| `useFieldState()` hook | Defer v2 |
| Async / debounced validation | Defer v2 (§70) |
| `SwitchFormField` | Defer v2 (§70) |
| Field arrays (`FormArray`) | Defer v2 (§70) |
| `TextEditingController` | Defer v2 (§70) |
| `<InputDecoration>` widget | **Reject** (Decision #78) |
| Theme / `InputDecorationTheme` changes | Complete in v1.5 (§57) |
| New §1 enums | None in v1.6 |

---

## 58.4 `FieldDecoration` (shared type)

Configuration for **label, helper, error, and visual required indicator** on form fields. Used by `*FormField` wrappers and extended by `InputDecoration` for text fields.

```ts
/** Shared label / helper / error chrome (§58). Not a widget. */
export interface FieldDecoration {
  /** Visible field name — <label for> or <legend> depending on control. */
  label?: string;
  helperText?: string;
  errorText?: string;
  /**
   * Visual required indicator (`*`) in decoration chrome only.
   * Does NOT set native `required` on the control — see §58.4.1.
   */
  required?: boolean;
}
```

### 58.4.1 `FieldDecoration.required` vs control `required`

| Concern | Owner | Props |
| ------- | ----- | ----- |
| **Visual** required indicator (`*`) | `FieldDecoration` | `decoration.required` |
| **Native** required semantics (HTML + a11y) | Control widget | `TextField.required`, `Checkbox.required`, `Dropdown.required`, `RadioGroup.required` |

**Rules:**

1. `decoration.required` controls **only** whether the decoration renderer shows the visual `*` (and may style the label).
2. Native `required` behavior (constraint validation, `aria-required`, form submit blocking) remains on the **control** prop.
3. **Avoid dual required sources:** callers should not rely on `decoration.required` alone for validation. Set the control’s `required` when the field is required.
4. **Dev (recommended):** one-time warning when `decoration.required === true` and the control’s `required` is not `true` (misconfiguration).

`InputDecoration` **extends** `FieldDecoration` with text-only fields:

```ts
export interface InputDecoration extends FieldDecoration {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}
```

---

## 58.5 `InputDecoration` (v1.6 review)

See §28 for v1.3 baseline. v1.6 **extends** §28 with `FieldDecoration` base and shared renderer (§59). **No breaking renames.**

| Field | v1.6 | Notes |
| ----- | ---- | ----- |
| `label`, `helperText`, `errorText` | Ship | Via `FieldDecoration` |
| `required` | Ship | Visual only (§58.4.1) |
| `placeholder`, `prefix`, `suffix` | Ship | Text only |
| `counterText`, icons, floating label | Defer | §70 |

Theme styling: `InputDecorationTheme` (§57) + `TextFieldDecorationStyleProps` unchanged.

---

## 59. Shared field infrastructure (internal)

**Not exported** from `src/index.ts`.

| Module | Role |
| ------ | ---- |
| `field-decoration/` | SSR markup: label / legend, helper, error, required mark, `aria-describedby` |
| `use-form-field/` | Registration, touched/error, validator timing (from `TextFormField` today) |

### 59.1 `FormFieldRegistration` change

```ts
validate$?: QRL<(value: FormFieldValue) => string | undefined>;
```

**Supported validator value types in v1.6:** `FormFieldValue` = `string | boolean` only (§58.6). Additional value types (e.g. `string[]`) deferred until public `FormField<T>` (v2).

### 59.2 Error merge (FD3)

`displayError = validatorResult ?? decoration.errorText` (unchanged from `TextFormField`).

---

## 58.6 Supported form field values (validators)

v1.6 field validators operate on **`FormFieldValue`**:

```ts
export type FormFieldValue = string | boolean;
```

| Wrapper | `getValue()` | Typical `validator$` |
| ------- | ------------ | -------------------- |
| `TextFormField` | `string` | `(v: string) => …` |
| `DropdownFormField` | `string` | `(v: string) => …` |
| `RadioGroupFormField` | `string` | `(v: string) => …` |
| `CheckboxFormField` | `boolean` | `(v: boolean) => …` |

**Future types** (`number`, `string[]`, custom objects) are **deferred** until public `FormField<T>` (v2). Do not widen `FormFieldValue` in v1.6 without a versioned design.

---

## 60. `FormField<T>` — deferral (v2)

Flutter `FormField<T>` analogue. **Not shipped in v1.6.**

v1.6 ships typed wrappers (§61–§64) backed by internal `use-form-field` only.

v2+ sketch (documentation only):

```ts
interface FormFieldProps<T extends FormFieldValue> {
  name: string;
  validator$?: QRL<(value: T) => string | undefined>;
  decoration?: FieldDecoration;
}
```

---

## 61. `TextFormField` review

| Concern | `TextFormField` | `TextField` / shared |
| ------- | --------------- | -------------------- |
| `name`, `validator$` | Yes | — |
| Form registration | Yes (hook) | — |
| Decoration + errors | Yes | Renderer in `field-decoration` |
| Control + `InputDecorationTheme` | — | `TextField` |

**No public API break.** `TextFormFieldProps` unchanged.

**Required:** use `TextField.required` for native semantics; `decoration.required` for visual `*` only (§58.4.1).

---

## 62. `CheckboxFormField`

```ts
export interface CheckboxFormFieldProps extends Omit<CheckboxProps, "name"> {
  name: string;
  validator$?: QRL<(value: boolean) => string | undefined>;
  decoration?: FieldDecoration;
}
```

Composes `Checkbox` + `field-decoration`. Native `Checkbox.required` for semantics; `decoration.required` for visual `*` only.

**Labels:** **FD10** (§65) — when both `Checkbox.label` and `decoration.label` are set, render `decoration.label` only; dev warning.

---

## 63. `DropdownFormField`

```ts
export interface DropdownFormFieldProps extends Omit<DropdownProps, "name"> {
  name: string;
  validator$?: QRL<(value: string) => string | undefined>;
  decoration?: FieldDecoration;
}
```

`placeholder` remains on `Dropdown` (control-specific). **`Dropdown.label` is not removed in v1.6.**

### 63.1 Label sources (FD5, FD10)

| Source | Notes |
| ------ | ----- |
| `decoration.label` | Preferred for `*FormField` consistency |
| `Dropdown.label` | **Retained** — flat prop still supported |

**When both are set:** **FD10** — `decoration.label` wins; widget `label` is ignored for rendering.

| Environment | Behavior |
| ----------- | -------- |
| **Development** | One-time warning per mount when both are provided |
| **Production** | Render `decoration.label` only (no duplicate visible label) |

**Deprecation:** **None in v1.6.** Revisit flat `Dropdown.label` in **v2** (§70).

---

## 64. `RadioGroupFormField`

```ts
export interface RadioGroupFormFieldProps extends Omit<RadioGroupProps, "name"> {
  name: string;
  validator$?: QRL<(value: string) => string | undefined>;
  decoration?: FieldDecoration;
}
```

**`RadioGroup.legend` is not removed in v1.6.**

### 64.1 Label sources (FD10)

| Source | Maps to |
| ------ | ------- |
| `decoration.label` | `<legend>` (preferred) |
| `RadioGroup.legend` | `<legend>` (retained) |

**When both are set:** **FD10** — `decoration.label` wins; `legend` ignored for rendering. Dev warning in development; production renders decoration label only.

Native `RadioGroup.required` for group semantics; `decoration.required` for visual `*` only.

---

## 65. Label ownership — duplicate labels (FD10)

**Decision FD10 — Label source precedence (approved).** Canonical rules when both widget label props and `decoration.label` are provided:

| Control | Widget label prop | Decoration label | Rendered label | Dev warning |
| ------- | ----------------- | ---------------- | -------------- | ----------- |
| **Checkbox** | `label` | `decoration.label` | **`decoration.label`** | Yes |
| **Dropdown** | `label` | `decoration.label` | **`decoration.label`** | Yes |
| **RadioGroup** | `legend` | `decoration.label` | **`decoration.label`** (as `<legend>`) | Yes |

**Development:** emit a **one-time warning** per field instance when both sources are non-empty.

**Production:** render **`decoration.label` only** — widget `label` / `legend` is not shown (single source of truth).

**Reasoning:**

- Single source of truth for accessible name + visible label
- Consistent `*FormField` architecture (`decoration` owns chrome)
- Predictable SSR and resumability (one label node in markup)

**Text fields:** label only via `decoration.label` (no competing flat prop on `TextField`).

**Invariant:** never render two visible labels for one control.

---

## 66. v1.6 shared types review

| Type | Verdict | Reasoning |
| ---- | ------- | --------- |
| `FieldDecoration` | **Ship** | Public; shared chrome |
| `InputDecoration` | **Ship** | Extends `FieldDecoration` |
| `FormFieldValidator` | **Ship** | Widen to `(value: FormFieldValue) => string \| undefined` |
| `FormFieldValue` | **Ship** (unchanged) | `string \| boolean` only in v1.6 |
| `FormFieldProps<T>` | **Defer** v2 | No public generic widget |
| `FieldError` | **Reject** | Use `string \| undefined` |
| `FieldState` | **Defer** v2 | Internal hook only |

---

## 67. Accessibility review

Extends §35:

- **Labels (FD10):** exactly one visible label per control. For Checkbox / Dropdown / RadioGroup, when both widget label props and `decoration.label` are set, the accessible name comes from **`decoration.label`** only (`<label for={id}>` or `<legend>`). Widget `label` / `legend` is not rendered in production; dev warning flags misconfiguration.
- **Text fields:** label from `decoration.label` → `<label for={inputId}>`.
- **`aria-describedby`:** `{controlId}-helper`, `{controlId}-error` when helper/error present.
- **Errors:** `role="alert"` on non-empty error text; `aria-invalid` on control when error shown.
- **Required:** native `required` on control (semantics) + optional visual `*` from `decoration.required` only (§58.4.1, FD9).

---

## 68. SSR and resumability

| Content | SSR | Client |
| ------- | --- | ------ |
| Label, helper | Static HTML | Resumed |
| `decoration.errorText` | Static HTML | Resumed |
| `validator$` output | Not run | After touch / submit |
| `defaultValue` / `defaultChecked` | Native attributes | Controlled props |

Decoration markup: no `useVisibleTask$`. Registration may use `useVisibleTask$` (existing).

---

## 69. v1.6 open questions — resolved (FD1–FD10)

All architecture questions for v1.6 are **closed**. No remaining open questions.

| ID | Decision |
| -- | -------- |
| **FD1** | Shared `field-decoration` module (not TextField-only) |
| **FD2** | `FieldDecoration` + `InputDecoration` split |
| **FD3** | Merge validator result + `decoration.errorText` |
| **FD4** | *(Superseded by FD10 for label precedence.)* Retained in log for traceability. |
| **FD5** | **Both** `Dropdown.label` and `decoration.label` in v1.6; **no deprecation**; precedence per **FD10**; review flat prop in v2 |
| **FD6** | `validate$` uses `FormFieldValue` (`string \| boolean` only); wider types deferred with public `FormField<T>` |
| **FD7** | Same `AutovalidateMode` matrix for all `*FormField` types |
| **FD8** | Export `FieldDecoration` publicly |
| **FD9** | `decoration.required` = visual only; control `required` = native (§58.4.1) |
| **FD10** | **Label source precedence:** Checkbox / Dropdown / RadioGroup — `decoration.label` wins when both set; dev warning; production renders decoration label only (§65) |

### FD10 — Label source precedence (approved)

When both widget label props and decoration labels are provided:

| Control | Precedence |
| ------- | ---------- |
| **Checkbox** | `decoration.label` wins over `Checkbox.label` |
| **Dropdown** | `decoration.label` wins over `Dropdown.label` |
| **RadioGroup** | `decoration.label` wins over `RadioGroup.legend` |

**Development:** emit warning when both are provided.

**Production:** render `decoration.label` only.

**Reason:** single source of truth; consistent field architecture; predictable rendering and SSR markup.

---

## 70. Flutter parity — intentional differences

- No `FormFieldState` / `GlobalKey` — Qwik context.
- No `TextEditingController` — signals + `value` / `onInput$` / `onChange$`.
- `hintText` → `placeholder`; `labelText` → `label` / `legend`.
- No `InputDecorator` widget — internal renderer.
- `*FormField` wrappers instead of `CheckboxListTile` / `RadioListTile`.

---

## 71. Future roadmap (v2+)

- Public `FormField<T>` and additional `FormFieldValue` types
- `FieldState` / `useFieldState()`
- Async / debounced `validator$`
- `SwitchFormField`
- Field arrays
- `Dropdown.label` / `RadioGroup.legend` migration review
- `counterText`, slot adornments, floating labels

---

## 72. Final review (v1.6 architecture)

| Check | Status |
| ----- | ------ |
| Typed wrappers only (no public `FormField<T>`) | Pass |
| `FormFieldValue` = `string \| boolean` documented | Pass |
| FD1–FD10 approved (§69) | Pass |
| Label precedence fully specified (FD10, §65) | Pass |
| `decoration.required` visual-only (§58.4.1, FD9) | Pass |
| FD5: no `Dropdown.label` deprecation in v1.6 | Pass |
| Non-goals boundary (§58.3) | Pass |
| No new architecture beyond shared renderer + hook | Pass |
| No remaining architecture questions (§69) | Pass |
| SSR / resumability / a11y preserved (§67–§68) | Pass |
