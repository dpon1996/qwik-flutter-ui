/**
 * `TextFormField` prop types. See `docs/API_DESIGN.md` §30.
 */

import type { QRL } from "@builder.io/qwik";

import type { TextFieldProps } from "../text-field/types";

/**
 * Props for the `TextFormField` widget — `TextField` with form validation.
 * Flutter equivalent of `TextFormField`.
 */
export interface TextFormFieldProps extends Omit<TextFieldProps, "name"> {
  /** Required — form registration and submit payload key (Decision #79). */
  name: string;
  validator$?: QRL<(value: string) => string | undefined>;
}
