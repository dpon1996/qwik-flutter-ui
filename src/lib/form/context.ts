/**
 * `Form` context — field registration for `TextFormField`, `Checkbox`, etc. (§31, §53).
 * Provided by `<Form>` when implemented; optional for standalone fields.
 */

import { createContextId, type QRL } from "@builder.io/qwik";

import type { AutovalidateMode, FormFieldValue } from "../_shared";

/** Per-field handle registered with an ancestor `<Form>`. All callbacks are QRLs (§55). */
export interface FormFieldRegistration {
  name: string;
  /** `string` (text, radio, dropdown) or `boolean` (checkbox, switch) — §53. */
  getValue$: QRL<() => FormFieldValue>;
  /** Text fields only; selection controls use native `required` (§53). */
  validate$?: QRL<(value: string) => string | undefined>;
  setError$: QRL<(message: string | undefined) => void>;
  getTouched$: QRL<() => boolean>;
  setTouched$: QRL<(touched: boolean) => void>;
}

/** Internal API consumed by form fields; implemented by `Form` (§31). */
export interface FormContextValue {
  autovalidateMode: AutovalidateMode;
  registerField$: QRL<(field: FormFieldRegistration) => Promise<() => void>>;
  setFieldValue$: QRL<(name: string, value: string) => void>;
  onFieldInteraction$: QRL<(name: string, kind: "input" | "blur") => void>;
}

export const FormContext = createContextId<FormContextValue>("qfu.form");
