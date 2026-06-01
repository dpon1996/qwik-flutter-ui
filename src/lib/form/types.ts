/**
 * `Form` prop types. See `docs/API_DESIGN.md` §31.
 */

import type { QRL } from "@builder.io/qwik";

import type { AutovalidateMode, BaseProps, FormValues } from "../_shared";

/**
 * Props for the `Form` widget — groups fields and coordinates validation / submit.
 * Flutter equivalent of `Form`.
 */
export interface FormProps extends BaseProps {
  onSubmit$?: QRL<(values: FormValues, ev: SubmitEvent) => void>;
  /** Default `AutovalidateMode.disabled` (§31). */
  autovalidateMode?: AutovalidateMode;
  action?: string;
  method?: "get" | "post";
}
