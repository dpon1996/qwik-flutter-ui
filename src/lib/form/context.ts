/**
 * `Form` context — field registration for `TextFormField`, `Checkbox`, etc. (§31, §53).
 * Provided by `<Form>` when implemented; optional for standalone fields.
 */

import { createContextId, type QRL } from "@builder.io/qwik";

import type { AutovalidateMode, FormFieldValue } from "../_shared";

/** Per-field handle registered with an ancestor `<Form>`. */
export interface FormFieldRegistration {
  name: string;
  getValue: () => FormFieldValue;
  validate$?: QRL<(value: string) => string | undefined>;
  setError: (message: string | undefined) => void;
  getTouched: () => boolean;
  setTouched: (touched: boolean) => void;
}

/** Internal API consumed by `TextFormField`; implemented by `Form` (§31). */
export interface FormContextValue {
  autovalidateMode: AutovalidateMode;
  registerField$: QRL<(field: FormFieldRegistration) => () => void>;
  setFieldValue$: QRL<(name: string, value: string) => void>;
  onFieldInteraction$: QRL<(name: string, kind: "input" | "blur") => void>;
}

export const FormContext = createContextId<FormContextValue>("qfu.form");
