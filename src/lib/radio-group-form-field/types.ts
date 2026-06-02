/**
 * `RadioGroupFormField` prop types. See `docs/API_DESIGN.md` §64.
 */

import type { QRL } from "@builder.io/qwik";

import type { FieldDecoration } from "../_shared";
import type { RadioGroupProps } from "../radio-group/types";

/**
 * `RadioGroup` with form validation and shared decoration chrome (§64).
 */
export interface RadioGroupFormFieldProps extends Omit<RadioGroupProps, "name"> {
  name: string;
  validator$?: QRL<(value: string) => string | undefined>;
  decoration?: FieldDecoration;
}
