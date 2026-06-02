/**
 * `CheckboxFormField` prop types. See `docs/API_DESIGN.md` §62.
 */

import type { QRL } from "@builder.io/qwik";

import type { FieldDecoration } from "../_shared";
import type { CheckboxProps } from "../checkbox/types";

/**
 * `Checkbox` with form validation and shared decoration chrome (§62).
 */
export interface CheckboxFormFieldProps extends Omit<CheckboxProps, "name"> {
  name: string;
  validator$?: QRL<(value: boolean) => string | undefined>;
  decoration?: FieldDecoration;
}
