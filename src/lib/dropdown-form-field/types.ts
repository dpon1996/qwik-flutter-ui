/**
 * `DropdownFormField` prop types. See `docs/API_DESIGN.md` §63.
 */

import type { QRL } from "@builder.io/qwik";

import type { FieldDecoration } from "../_shared";
import type { DropdownProps } from "../dropdown/types";

/**
 * `Dropdown` with form validation and shared decoration chrome (§63).
 * `placeholder` stays on `Dropdown` (not `FieldDecoration`).
 */
export interface DropdownFormFieldProps extends Omit<DropdownProps, "name"> {
  name: string;
  validator$?: QRL<(value: string) => string | undefined>;
  decoration?: FieldDecoration;
}
