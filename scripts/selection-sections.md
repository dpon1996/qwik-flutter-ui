## 46. `Checkbox`

Boolean toggle control. Flutter's [`Checkbox`](https://api.flutter.dev/flutter/material/Checkbox-class.html).

Renders a native **`<input type="checkbox">`**. Never a `<div role="checkbox">` (Principle #3).

### Purpose

- On/off selection with minimal runtime.
- Form integration: `FormValues[name]` is **`boolean`** when collected via `<Form onSubmit$>` (§53, Decision #76).
- Progressive enhancement: native `name` / `value` participate in HTML form POST without JS.

### Props

```ts
export interface CheckboxProps extends BaseProps {
  /** Controlled checked state. Flutter: value (bool) */
  checked?: boolean;
  /** Uncontrolled initial state for SSR (§55). */
  defaultChecked?: boolean;
  onChange$?: QRL<(checked: boolean, ev: Event) => void>;
  disabled?: boolean;
  required?: boolean;
  /** Form registration / native submit name */
  name?: string;
  /**
   * Submitted string when checked (HTML `value` attribute).
   * Default `"on"`. Does not change FormValues boolean normalization (§53, SC9).
   */
  value?: string;
  autoFocus?: boolean;
  /** Visible label; maps to <label for={inputId}> */
  label?: string;
}
```

| Prop | Default | Notes |
| ---- | ------- | ----- |
| `checked` | — | Controlled |
| `defaultChecked` | — | Uncontrolled SSR initial (§55) |
| `onChange$` | — | HTML **`change`** event (§56 SC7) — not `onInput$` |
| `disabled` | `false` | Native `disabled` |
| `required` | `false` | Native `required`; form validation (§53) |
| `name` | — | Required inside `<Form>` for submit payload key |
| `value` | `"on"` | Native submit token when checked |
| `autoFocus` | `false` | Native `autofocus` |
| `label` | — | Decision **#83**, SC11 |
| _base props_ | — | §0.6 |

### Scope (v1.4)

| Feature | Ship |
| ------- | ---- |
| Native `<input type="checkbox">` | Yes |
| Controlled + uncontrolled | Yes |
| `onChange$` | Yes |
| `<Form>` registration (`boolean` in `FormValues`) | Yes |
| `label` prop | Yes |
| **Deferred:** `indeterminate` | See below + §56 SC3–SC4 |
| **Deferred:** tri-state / `CheckboxState` enum | §52 |
| **Deferred:** `CheckboxListTile`, custom icons | v2 / v1.5 theme |

### Usage

```tsx
const agree = useSignal(false);

<Checkbox
  label="I agree to the terms"
  checked={agree.value}
  onChange$={(checked) => (agree.value = checked)}
/>

<Form onSubmit$={(values) => console.log(values.newsletter)}>
  <Checkbox name="newsletter" label="Subscribe" defaultChecked={false} />
  <Button type="submit">Save</Button>
</Form>
```

### Flutter equivalent

```dart
Checkbox(
  value: agree,
  onChanged: (v) => setState(() => agree = v ?? false),
)
```

### Accessibility considerations

- Pair with visible `<label>` (`label` prop or slotted).
- Native checkbox exposes correct role and keyboard (Space toggles when focused).
- `required` + visible indicator when true.
- **Indeterminate (deferred):** when shipped (v2+), must not rely on `checked` alone — use `aria-checked="mixed"` and document that indeterminate is **not** serializable in SSR HTML (§56 SC3).

### SSR behavior

- **`defaultChecked`** renders in static HTML (`checked` attribute when `true`).
- **`checked`** (controlled) from server props for resume (F2 pattern, §55).
- **`indeterminate`:** **not in v1.4** — cannot be represented in SSR HTML (see Deferred APIs).

### Deferred APIs

| API | Status | Notes |
| --- | ------ | ----- |
| `indeterminate` | **Defer v2+** | See below |
| Tri-state / `CheckboxState` | **Defer v2+** | §52, §56 SC4 |
| `CheckboxListTile` | Defer v2 | |
| `tristate` | Defer v2 | Tied to indeterminate |

**Indeterminate state cannot be represented in SSR HTML.**

Reason:

- HTML checkboxes expose **indeterminate** as a **DOM property** (`HTMLInputElement.indeterminate`), **not** an HTML attribute.
- There is no `indeterminate="true"` attribute for the server to emit.
- Restoring indeterminate after hydration requires **imperative** client updates (`useVisibleTask$` or equivalent).

Therefore in v1.4:

- **`indeterminate` remains deferred.**
- **Tri-state remains deferred** (no `CheckboxState` enum — §52).

**Accessibility implications (when deferred feature ships):**

- Screen readers expect **`aria-checked="mixed"`** for indeterminate; the property alone may not be announced consistently without explicit ARIA.
- Do not use indeterminate for required-field validation semantics — it is neither fully checked nor unchecked.
- SSR pages cannot show indeterminate until client JS runs; design UIs that do not depend on indeterminate for first paint, or accept a one-frame unchecked state before hydration.

### Controlled vs uncontrolled

| Mode | Props |
| ---- | ----- |
| **Controlled** | `checked` + `onChange$` |
| **Uncontrolled** | `defaultChecked` |

Do not pass `checked` and `defaultChecked` together. Same **v1.x form-control state model** as `TextField`, `RadioGroup`, and `Dropdown` (§53).

### Future extensibility

- v2: `indeterminate` + `aria-checked="mixed"` with documented SSR limitation.
- v1.5: density/colors via theme tokens.

---

## 47. `Radio`

Single option within a mutually exclusive group. Flutter's [`Radio`](https://api.flutter.dev/flutter/material/Radio-class.html).

Renders native **`<input type="radio">`**. Must be used inside **`RadioGroup`** in v1.4 (Decision **#80**, SC2).

### Purpose

- One option in a set; selection value is a **`string`** (§53 value model).
- **`checked` derived from `RadioGroup` context only** (Decision **#82**, SC6) — `RadioGroup.value === Radio.value`; no local selection state on `Radio`.

### Props

```ts
export interface RadioProps extends BaseProps {
  /**
   * Option token — **string only** in v1.4 (§53).
   * Compared to RadioGroup.value / defaultValue.
   * Consumers may encode enum ids or numbers as strings (e.g. "2", "plan_pro").
   */
  value: string;
  disabled?: boolean;
  /** Visible label; maps to <label for={inputId}> */
  label?: string;
}
```

| Prop | Default | Notes |
| ---- | ------- | ----- |
| `value` | **required** | **`string` only** — no generic `T` (§53) |
| `disabled` | `false` | Overrides group `disabled` when `true` |
| `label` | — | Decision **#84**, SC12 — slot also supported |
| _base props_ | — | §0.6 |

**Not on `Radio` in v1.4:** `name`, `checked`, `onChange$`, `groupValue` — owned by `RadioGroup` (§48).

### Value type (v1.4)

**`value: string` only.**

- Native `<input type="radio" value="...">` is string-valued.
- SSR and form POST serialize option tokens as strings.
- **Generic value support (`Radio<T>`) is deferred** — consumers narrow after submit (e.g. `values.plan as "free" | "pro"`).

### Scope (v1.4)

| Feature | Ship |
| ------- | ---- |
| Inside `RadioGroup` only | Yes |
| `value: string` | Yes |
| Derived `checked` from group | Yes |
| Standalone `Radio` with manual `name` / `groupValue` | **Defer v2** |

### Usage

```tsx
<RadioGroup name="plan" value={plan.value} onChange$={(v) => (plan.value = v)}>
  <Column gap={8}>
    <Radio value="free" label="Free" />
    <Radio value="pro" label="Pro" />
  </Column>
</RadioGroup>
```

### Flutter equivalent

```dart
Radio<String>(
  value: 'pro',
  groupValue: plan,
  onChanged: (v) => setState(() => plan = v),
)
```

### Accessibility considerations

- Group label via `<legend>` on `RadioGroup` (§54).
- Each option: `<label for={id}>` wrapping or associated with its radio `id` (`useId()` per §55).
- Arrow keys move within the group (native behavior when `name` is shared).

### SSR behavior

- Group `defaultValue` selects the matching radio via `checked` on the matching `<input type="radio">` in static HTML.
- Option `value` strings appear in markup as `value` attributes.

### Deferred APIs

- Standalone `Radio` without `RadioGroup` (v2 escape hatch).
- `RadioListTile` (v2).

### Label prop and slot (Decision #84)

- **`label?: string`** — simple text → `<label for={inputId}>`.
- **Slotted content** — rich labels (icons, secondary text). **If slot has content, it takes precedence over `label` prop.**

### Future extensibility

- v2: optional standalone mode with explicit `name` + `groupValue` (discouraged for a11y).

---

## 48. `RadioGroup`

Mutually exclusive radio set — owns group state and native grouping. Flutter pattern: column of [`Radio`](https://api.flutter.dev/flutter/material/Radio-class.html) widgets sharing `groupValue`.

Renders **`<fieldset>`** with optional **`<legend>`**. Provides **`RadioGroupContext`** to child `Radio` components (QRL-safe — §55).

### Purpose

- Owns **`name`** (required for form / native grouping).
- Owns **`value` / `defaultValue` / `onChange$`** (Flutter `groupValue` + `onChanged` on parent).
- Ensures one native `name` and correct keyboard / SR group semantics.

### Props

```ts
export interface RadioGroupProps extends BaseProps {
  /** Required — form key and shared radio name attribute */
  name: string;
  /** Controlled selected option token — string only (§53) */
  value?: string;
  /** Uncontrolled initial selection for SSR */
  defaultValue?: string;
  onChange$?: QRL<(value: string, ev: Event) => void>;
  disabled?: boolean;
  /** Group label — renders <legend> */
  legend?: string;
}
```

| Prop | Default | Notes |
| ---- | ------- | ----- |
| `name` | **required** | Same on every child `<input type="radio">` |
| `value` | — | Controlled; **`string` only** |
| `defaultValue` | — | SSR / uncontrolled |
| `onChange$` | — | Fires with selected option's `value` string |
| `disabled` | `false` | Disables all radios unless child overrides |
| `legend` | — | Accessible group name (§54) |
| _base props_ | — | §0.6; slotted `Radio` children |

### Value type (v1.4)

**`value` and `defaultValue` are `string` only** (same as each `Radio.value`).

Reasons (§53): native HTML form compatibility, SSR, simpler serialization, consistent `FormValues` behavior. Generic `RadioGroup<T>` is **deferred**.

### Scope (v1.4)

| Feature | Ship |
| ------- | ---- |
| State ownership (group) | Yes |
| `RadioGroupContext` | Yes — serializable context + QRLs where needed |
| `<fieldset>` / `<legend>` | Yes |
| `<Form>` registration → `FormValues[name]: string` | Yes |
| Standalone `Radio` without group | **No** (Decision **#80**) |
| Sole state owner (#82) | Yes — `Radio` has no `value` / `onChange$` for group selection |

### Usage

```tsx
<Form onSubmit$={(values) => save(values.plan as string)}>
  <RadioGroup name="plan" legend="Choose a plan" defaultValue="free">
    <Radio value="free" label="Free" />
    <Radio value="pro" label="Pro" />
  </RadioGroup>
  <Button type="submit">Continue</Button>
</Form>
```

### Flutter equivalent

```dart
Column(
  children: [
    RadioListTile(value: 'free', groupValue: plan, onChanged: ...),
    RadioListTile(value: 'pro', groupValue: plan, onChanged: ...),
  ],
)
```

### Context usage

- `RadioGroup` provides context: current `value`, `name`, `disabled`, and internal `setValue` / `onChange$` wiring.
- **`Radio` reads context** to set `checked` and shared `name`.
- All context callbacks exposed to children must be **QRLs** where Qwik serialization requires it (same lesson as `Form` — §31).

### Controlled vs uncontrolled

| Mode | Props |
| ---- | ----- |
| Controlled | `value` + `onChange$` |
| Uncontrolled | `defaultValue` (+ optional `onChange$`) |

Do not pass both `value` and `defaultValue` (React/Qwik convention).

### Accessible naming (SC14)

Every `RadioGroup` **must** have an accessible name via **at least one** of:

- `legend` prop → `<legend>` (**optional** — SC14)
- `aria-label` on `<fieldset>` (`BaseProps`)
- `aria-labelledby` on `<fieldset>` (`BaseProps`)

Dev-time warning in development builds when none are provided.

### Accessibility considerations

- **`legend`** (preferred when label is adjacent to radios) or `aria-*` names the group.
- Child radios share one `name`; only one checked at a time.

### SSR behavior

- `defaultValue` marks the matching radio `checked` in HTML.
- `value` (controlled) from server props on resume.

### Deferred APIs

- `RadioListTile` styling (v2 / v1.5 theme).
- Horizontal group layout prop — use `<Row gap={...}>` (layout §3).

### Future extensibility

- v2: typed value helpers (documentation only, still string on wire).

---

## 49. `Switch`

On/off control with switch semantics. Flutter's [`Switch`](https://api.flutter.dev/flutter/material/Switch-class.html).

Renders **`<input type="checkbox" role="switch">`**.

### Purpose

- Distinct a11y role from `Checkbox` while sharing boolean state model.
- **Same public API as `Checkbox`** (Decision **#81**, SC5).

### Props

```ts
/** Same public API as Checkbox (Decision #81). */
export type SwitchProps = CheckboxProps;
```

Shared props: `checked`, `defaultChecked`, `onChange$`, `name`, `value`, `required`, `disabled`, `autoFocus`, `label?` (Decision **#83**).

**Only difference:** renders `<input type="checkbox" role="switch">`.

| Prop | Notes |
| ---- | ----- |
| _(same as Checkbox)_ | See §46 table |
| `FormValues` | **`boolean`** via `<Form>` (§53) — not `"on"` string |

### Scope (v1.4)

| Feature | Ship |
| ------- | ---- |
| `role="switch"` native input | Yes |
| API parity with `Checkbox` | Yes |
| Indeterminate / tri-state | **No** (checkbox-only concern; N/A for switch) |

### Usage

```tsx
<Switch
  label="Dark mode"
  checked={dark.value}
  onChange$={(on) => (dark.value = on)}
/>
```

### Flutter equivalent

```dart
Switch(
  value: dark,
  onChanged: (v) => setState(() => dark = v),
)
```

### Relationship with `Checkbox`

| | `Checkbox` | `Switch` |
| - | ---------- | -------- |
| Element | `type="checkbox"` | `type="checkbox"` + `role="switch"` |
| Semantics | checkbox | switch |
| Props | §46 | **Same names** (#81) |
| Implementation | Separate widget + CSS module | Separate widget; may share internal styles |

### Accessibility considerations

- `role="switch"` exposes switch semantics to assistive tech.
- Do not use `Switch` for multi-select lists; use `Checkbox` or `RadioGroup`.

### SSR behavior

- Same as `Checkbox`: `defaultChecked` / controlled `checked` in HTML (§55).

### Deferred APIs

- Material thumb/track theming → v1.5 `FormTheme` / CSS variables.

---

## 50. `Dropdown`

Single-choice list. Flutter's [`DropdownButton`](https://api.flutter.dev/flutter/material/DropdownButton-class.html) / [`DropdownMenu`](https://api.flutter.dev/flutter/material/DropdownMenu-class.html).

Renders native **`<select>`** with **`<option>`** children. **No custom overlay** in v1.4 (§56 SC1, SC13).

### Purpose

- Accessible single selection with zero JS for basic form POST.
- Options as data (`DropdownOption[]`) for ergonomic JSX.

### Props

```ts
export interface DropdownOption {
  /** Option token — string only (§53) */
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends BaseProps {
  options: DropdownOption[];
  /** Controlled selected value — string only */
  value?: string;
  /** Uncontrolled initial selection for SSR */
  defaultValue?: string;
  onChange$?: QRL<(value: string, ev: Event) => void>;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  /**
   * Placeholder label when no selection.
   * Rendered as first <option value="" disabled hidden> (§56 SC10).
   */
  placeholder?: string;
  /** Visible label; <label for={selectId}> */
  label?: string;
}
```

| Prop | Default | Notes |
| ---- | ------- | ----- |
| `options` | **required** | Each `value` is **`string`** |
| `value` | — | Controlled selected option token |
| `defaultValue` | — | Must match an option `value` or `""` for placeholder-only |
| `onChange$` | — | `change` event |
| `placeholder` | — | See **Placeholder behavior** below |
| `name` | — | Form / native submit |
| _base props_ | — | §0.6 |

### Value type (v1.4)

**`value`, `defaultValue`, and each `DropdownOption.value` are `string` only.**

Generic `Dropdown<T>` / `Option<T>` is **deferred** (§51). Encode enums and numbers as strings at the boundary.

### Placeholder behavior

`placeholder` is implemented as a **disabled empty first `<option>`**:

```html
<option value="" disabled hidden>{placeholder}</option>
```

**When `value` or `defaultValue` is set** to a non-empty option token:

- That option is **`selected`** in markup.
- The placeholder option is **not** selected (browser shows the real selection).
- Placeholder remains in the list only as an unselected disabled sentinel when the user has not picked a real option.

**When neither `value` nor `defaultValue` is set** (uncontrolled, no initial selection):

- Placeholder option is **selected** if `placeholder` is provided.
- Native `required` validation treats `value=""` as invalid when `required` is true (§53).

**When `placeholder` is omitted:**

- No sentinel option; first real option may appear selected per browser default (document in examples — prefer explicit `defaultValue` or `placeholder`).

### Scope (v1.4)

| Feature | Ship |
| ------- | ---- |
| Native `<select>` | Yes |
| `options: DropdownOption[]` | Yes |
| `placeholder` (disabled empty option) | Yes |
| `multiple` | **No** — §56 SC13 |
| Custom `DropdownButton` UI | Defer v2 |
| Search / typeahead | Defer v2 |

### Usage

```tsx
<Dropdown
  label="Country"
  name="country"
  placeholder="Select a country"
  options={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
  ]}
  defaultValue="us"
/>

<Form onSubmit$={(values) => console.log(values.country)}>
  <Dropdown
    name="country"
    placeholder="Select…"
    required
    options={countries}
  />
  <Button type="submit">Save</Button>
</Form>
```

### Flutter equivalent

```dart
DropdownButton<String>(
  value: country,
  hint: Text('Select a country'),
  items: countries.map((c) => DropdownMenuItem(value: c.id, child: Text(c.name))).toList(),
  onChanged: (v) => setState(() => country = v),
)
```

### Accessibility considerations

- Native `<select>`: platform picker / listbox behavior, keyboard, and SR support without custom ARIA.
- Visible `<label>` associated with `<select id>`.
- Do not replace with custom div-menu in v1.4 (§54).

### SSR behavior

- `defaultValue` / `value` set `selected` on the matching `<option>` in static HTML.
- Placeholder option included in SSR when `placeholder` is set.

### Deferred APIs

| API | Milestone |
| --- | --------- |
| `multiple` | **v2** (§56 SC13) |
| Custom dropdown overlay | v2 |
| `itemBuilder$` | v2 |
| `DropdownMenu` parity | v2 |

### Controlled vs uncontrolled

| Mode | Props |
| ---- | ----- |
| **Controlled** | `value` + `onChange$` |
| **Uncontrolled** | `defaultValue` |

Do not pass `value` and `defaultValue` together. Same **v1.x form-control state model** as `TextField` (`value` / `defaultValue` + `onInput$`), `Checkbox` / `Switch` (`checked` / `defaultChecked` + `onChange$`), and `RadioGroup` (§53).

### Required + placeholder validation

When `required={true}` and placeholder is rendered as `<option value="" disabled>`, the placeholder **does not satisfy** `required`. User must select a non-empty option. Applies to native validation, `<Form>` submit blocking, and progressive enhancement (§56 SC10).

### Future extensibility

- v2: `multiple` → `FormValues` as `string[]` (breaking additive prop).
- v2: optional combobox pattern (much larger a11y surface).

---

## 51. v1.4 selection — shared types review

| Candidate | Verdict | Location / notes |
| --------- | ------- | ---------------- |
| `DropdownOption` | **Ship** | `src/lib/_shared/types.ts` — `{ value: string; label: string; disabled?: boolean }` |
| `Option<T>` | **Defer** | v1.4 uses **`string` only**; generics when multi-type controls ship |
| `SelectionValue` | **Reject** | Use `string` / `boolean` primitives in props and `FormValues` |
| `RadioValue` | **Reject** | Use `string` on `Radio` / `RadioGroup` |

Add to §2 public snippet:

```ts
export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

---

## 52. v1.4 selection — shared enums review

| Candidate | Verdict | Reason |
| --------- | ------- | ------ |
| `CheckboxState` | **Defer** | v1.4 is boolean only; tri-state tied to deferred `indeterminate` (§46, §56 SC3–SC4) |
| `SwitchSize` | **Defer** | v1.5+ theming / `ButtonSize` pattern |
| `DropdownVariant` | **Reject** | Native `<select>` only — variant implies custom UI (§56 SC1) |

**Ship in v1.4:** **no new §1 enum entries.**

---

## 53. v1.4 selection — form integration review

Integrates with **§31 `Form`**, **`TextFormField`** (unchanged), and **`FormValues`** (Decision #76).

### Value model (v1.4)

| Control | Prop value type | `FormValues[name]` |
| ------- | ----------------- | ------------------ |
| `Checkbox` | N/A (boolean state) | `boolean` |
| `Switch` | N/A | `boolean` |
| `RadioGroup` | **`string`** | `string` |
| `Dropdown` | **`string`** | `string` |
| `TextFormField` | `string` | `string` |

**`Radio`, `RadioGroup`, and `Dropdown` use `value: string` only in v1.4.**

Reasons:

- Native HTML form submission uses string tokens.
- SSR can emit `value` / `selected` attributes without client coercion.
- Simpler Qwik serialization and resumability.
- Consistent `FormValues` narrowing at the app boundary.

**Generic value support (`Option<T>`, `RadioGroup<T>`, numeric values) is deferred.** Consumers may serialize ids, enums, or numbers to strings (e.g. `value="2"`, `value={String(enum)}`) and parse after `onSubmit$`.

**`Dropdown` does not ship `multiple` in v1.4** — no `FormValues` as `string[]` until v2 (§56 SC13). Update forward-compat note: §32 `FormValues` mentions `string[]` for **future** multi-select only.

### Registration

- Extend **`FormFieldRegistration`** (doc contract): `getValue(): string | boolean`.
- Selection controls register on mount (same pattern as `TextFormField`; QRL `registerField$`).
- **`onFieldInteraction$`:** primarily for text `input` events; selection validation timing defaults to **submit** unless extended later.

### Native form submission

| Control | Native POST (no JS) | `onSubmit$` payload |
| ------- | ------------------- | ------------------- |
| Checkbox (checked) | `name=on` (or custom `value` string) | `boolean` `true` |
| Checkbox (unchecked) | omitted | `boolean` `false` |
| Switch | same pattern | `boolean` |
| RadioGroup | `name=selectedValue` | `string` |
| Dropdown | `name=optionValue` | `string` |

Document **SC9:** HTML submit uses string tokens; JS `FormValues` normalizes checkboxes/switches to **boolean**.

### `required` validation

- Native `required` on checkbox (must be checked), radio group (one required in group), select (non-empty value).
- `<Form>` submit blocking: treat missing/empty selection per native validity when `noValidate` is not set; with custom validators deferred for selection in v1.4.

### v1.x form-control state model

| Widget | Controlled | Uncontrolled | Callback |
| ------ | ---------- | ------------ | -------- |
| `TextField` (§29) | `value` | `defaultValue` | `onInput$` |
| `Checkbox` (§46) | `checked` | `defaultChecked` | `onChange$` |
| `Switch` (§49) | `checked` | `defaultChecked` | `onChange$` |
| `RadioGroup` (§48) | `value` | `defaultValue` | `onChange$` |
| `Dropdown` (§50) | `value` | `defaultValue` | `onChange$` |

Boolean toggles use `checked*`; string selection uses `value*`. Reference F2 (§37) for `default*` + SSR.

### Deferred

- `CheckboxFormField` / `DropdownFormField` with `validator$` (v2).
- `FormValues` `string[]` for multi-select (v2, SC13).

---

## 54. v1.4 selection — accessibility review

Cross-widget rules for §46–§50:

- **Prefer native HTML controls** — no custom dropdown in v1.4 (§56 SC1, SC13).
- **Labels:** **`label?: string`** on each widget (Decision **#83**); not `InputDecoration`.
- **`RadioGroup` naming (SC14):** `legend` optional; require `legend` **or** `aria-label` **or** `aria-labelledby` on `<fieldset>`.
- **Checkbox / Switch:** native roles; Space toggles.
- **Radio groups:** `<fieldset>` + `<legend>`; one `name`; arrow-key navigation within group.
- **Select:** native `<select>` / `<option>`; OS-specific picker is acceptable.
- **Errors (future):** if `validator$` ships for selection in v2, use `aria-invalid` + `role="alert"` (§35 pattern).
- **Indeterminate (deferred):** when implemented, require `aria-checked="mixed"` and document SSR limitation (§46, §56 SC3).

---

## 55. v1.4 selection — SSR and resumability review

- **Checkbox / Switch:** `defaultChecked` in SSR HTML; controlled `checked` from server props on resume.
- **RadioGroup:** `defaultValue` marks one radio `checked`; all option `value` attributes are strings in markup.
- **Dropdown:** `defaultValue` / `value` set `selected` on `<option>`; placeholder is a real `<option value="" disabled>` in SSR.
- **Indeterminate:** not in v1.4 — not representable in SSR HTML (§46, §56 SC3).
- **No `onChange$` on server** — QRLs client-only.
- **Progressive enhancement:** native `action` / `method` submits selection without hydration.
- **Context:** `RadioGroupContext` / extended `FormContext` use QRLs; no module-level state (Principle #5).
- **IDs:** `useId()` for `id` / `label for` (§36).

---

## 56. v1.4 Selection Controls open questions

Resolve before **v1.4 implementation** (Phase 13, §45). Widget specs §46–§50 may be authored while items below are open.

### Open questions summary

| Status | IDs | Notes |
| ------ | --- | ----- |
| **Approved** (§43) | **SC2 (#80)**, **SC5 (#81)**, **SC6 (#82)**, **SC11 (#83)**, **SC12 (#84)** | Frozen in §46–§50 |
| **Open** | SC1, SC3–SC4, SC7–SC10, SC13–SC14 | Block Phase 13 until resolved or implement documented defaults |

### Open questions table

| ID | Topic | Status |
| --- | ----- | ------ |
| SC1 | Native `<select>` vs custom dropdown | Open — recommend native |
| SC2 | Standalone `Radio` vs `RadioGroup` only | **Approved — #80** |
| SC3 | Checkbox `indeterminate` | Open — recommend defer (SSR) |
| SC4 | Tri-state checkbox enum | Open — recommend defer |
| SC5 | Switch API matches Checkbox | **Approved — #81** |
| SC6 | RadioGroup owns all selection state | **Approved — #82** |
| SC7 | `onChange$` vs `onInput$` | Open — recommend `onChange$` |
| SC8 | Form registration for non-string `getValue` | Open — recommend `string \| boolean` |
| SC9 | Checkbox HTML `"on"` vs `FormValues` boolean | Open — recommend document both |
| SC10 | Dropdown `placeholder` + `required` validation | Open — recommend disabled empty option |
| SC11 | Label via prop vs `InputDecoration` | **Approved — #83** |
| SC12 | `Radio` slotted label vs `label` prop | **Approved — #84** |
| SC13 | Dropdown `multiple` in v1.4 | Open — recommend defer v2 |
| SC14 | `RadioGroup` accessible labeling | Open — recommend `legend` optional; name required |

### SC1 — Native `<select>` vs custom dropdown

**Question:** Should `Dropdown` use native `<select>` or a custom menu?

**Options:** (A) Native `<select>`. (B) Custom overlay (Flutter `DropdownButton` style).

**Recommendation:** **(A)** — accessibility, SSR, minimal runtime (Principles #3, #4, #7).

### SC2 — Standalone `Radio` vs `RadioGroup` only (**Approved**, §43 #80)

**Decision:** **`Radio` must be used inside `RadioGroup` in v1.4.**

**Resolution:** Better accessibility, form integration, simpler API, consistent state on `RadioGroup`, eliminates manual `name` per radio. **Standalone `Radio` deferred to v2.**

### SC5 — Switch API matches Checkbox (**Approved**, §43 #81)

**Decision:** **`Switch` uses the same public API as `Checkbox`.** Only difference: `<input type="checkbox" role="switch">`. `SwitchProps` extends / aliases `CheckboxProps`.

### SC6 — RadioGroup owns selection state (**Approved**, §43 #82)

**Decision:** **`RadioGroup` owns all selection state.** `Radio` derives `checked` from context. Single source of truth; pairs with #80.

### SC11 — Selection control labels (**Approved**, §43 #83)

**Decision:** **`label?: string`** on each selection widget. **`InputDecoration` deferred.**

### SC12 — `Radio` label prop + slot (**Approved**, §43 #84)

**Decision:** **`Radio` supports `label?` and slotted label.** Slot takes precedence over `label` when both present.

### SC3 — Checkbox `indeterminate`

**Question:** Ship `indeterminate` on `Checkbox` in v1.4?

**Options:** (A) Defer. (B) Ship with client-only imperative API.

**Recommendation:** **(A) Defer.**

**Reasoning:**

- **Indeterminate state cannot be represented in SSR HTML** — it is a DOM property, not an attribute; hydration requires imperative updates.
- Accessibility for mixed state needs explicit `aria-checked="mixed"` when shipped.
- Tied to **SC4** (tri-state).

### SC4 — Tri-state checkbox

**Question:** Ship `CheckboxState` enum (`checked` / `unchecked` / `indeterminate`)?

**Options:** (A) Defer with SC3. (B) Ship in v1.4.

**Recommendation:** **(A) Defer** — boolean-only v1.4; no `CheckboxState` enum (§52).

### SC7 — `onChange$` vs `onInput$`

**Question:** Selection controls: `onChange$` or `onInput$`?

**Options:** (A) `onChange$` only. (B) `onInput$` only (align with TextField F11).

**Recommendation:** **(A) `onChange$`** — matches HTML `change` for checkbox, radio, select. Text fields remain `onInput$` only (Decision #77).

### SC8 — Form registration value types

**Question:** How should `FormFieldRegistration.getValue` type expand?

**Options:** (A) `string | boolean`. (B) `unknown`.

**Recommendation:** **(A)** — explicit v1.4 union.

### SC9 — Checkbox submit value vs `FormValues`

**Question:** How do `value="on"` and `FormValues` boolean relate?

**Options:** (A) Document both behaviors. (B) Use string in `FormValues`.

**Recommendation:** **(A)** — native POST uses string; `onSubmit$` uses `boolean` (§53).

### SC10 — Dropdown placeholder and required validation

**Question:** How is `placeholder` implemented, and does it satisfy `required`?

**Options:** (A) Disabled empty first `<option value="">`. (B) `aria-label` only.

**Recommendation:** **(A)** — placeholder does **not** satisfy `required`; user must select non-empty value. Native, Form, and PE behaviors in §50.

### SC13 — Multiple selection support

**Question:** Should `Dropdown` support `multiple` in v1.4?

**Options:** (A) Yes. (B) No — defer to v2.

**Recommendation:** **(B) Defer to v2.**

**Reasoning:**

- Different interaction model (multi-select UX, chip display in Flutter).
- Different **`FormValues` shape** (`string[]` vs `string`).
- Additional accessibility requirements (multi-select listbox patterns).
- Additional API surface (`multiple`, select-all, max selections).

v1.4 ships **single-select native `<select>` only**.

### SC14 — RadioGroup accessible labeling

**Question:** Should `RadioGroup` require `legend`?

**Options:** (A) `legend` required. (B) `legend` optional.

**Recommendation:** **(B)** — but every group must have an accessible name via `legend` **or** `aria-label` **or** `aria-labelledby` (§48, §54).

### Approved summaries (SC2, SC5–SC6, SC11–SC12)

See §43 decisions **#80–#84** and §46–§50 widget specs.

### Final review checklist (v1.4 selection)

| Check | Status |
| ----- | ------ |
| Flutter-first + web-native mappings | Pass |
| Native `<input>` / `<select>` / `<fieldset>` | Pass |
| **No custom dropdown** | Pass (SC1) |
| **No new §1 enums** | Pass (§52) |
| **No generic selection values** — `string` / `boolean` only | Pass (§53) |
| **No tri-state / indeterminate in v1.4** | Pass (SC3–SC4) |
| **No multi-select** | Pass (SC13) |
| **Controlled/uncontrolled consistent** | Pass (§53) |
| **Placeholder + `required` fully specified** | Pass (SC10) |
| **`Radio` inside `RadioGroup` only** | Pass (**#80**) |
| **Standalone `Radio` deferred** | Pass (v2) |
| **`Switch` API mirrors `Checkbox`** | Pass (**#81**) |
| **`RadioGroup` sole state owner** | Pass (**#82**) |
| **`label?: string` on selection widgets** | Pass (**#83**) |
| **`Radio` label + slot** | Pass (**#84**) |
| **No `InputDecoration` on selection** | Pass (#83) |
| **5 / 14 SC approved** | #80–#84 subset |
| Accessibility (native-first) | Pass (§54) |
| SSR + `useId()` | Pass (§55) |
| Open questions SC1, SC3–SC4, SC7–SC10, SC13–SC14 | Documented |

---
