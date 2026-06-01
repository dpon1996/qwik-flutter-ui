/**
 * `RadioGroup` prop types. See `docs/API_DESIGN.md` §48.
 */

import type { QRL } from "@builder.io/qwik";

import type { BaseProps } from "../_shared";

/**
 * Props for the `RadioGroup` widget — owns selection state for child `Radio` options.
 */
export interface RadioGroupProps extends BaseProps {
  /** Required — form key and shared `name` on each radio input. */
  name: string;
  /** Controlled selected option token (`string` only, §53). */
  value?: string;
  /** Uncontrolled initial selection for SSR (§55). */
  defaultValue?: string;
  onChange$?: QRL<(value: string, ev: Event) => void>;
  disabled?: boolean;
  /** Group label — renders `<legend>`. */
  legend?: string;
}
