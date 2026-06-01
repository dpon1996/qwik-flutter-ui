/**
 * `Checkbox` prop types. See `docs/API_DESIGN.md` §46.
 */

import type { QRL } from "@builder.io/qwik";

import type { BaseProps } from "../_shared";

/**
 * Props for the `Checkbox` widget — boolean toggle via native `<input type="checkbox">`.
 * Flutter equivalent of `Checkbox`.
 */
export interface CheckboxProps extends BaseProps {
  /** Controlled checked state. */
  checked?: boolean;
  /** Uncontrolled initial state for SSR (§55). */
  defaultChecked?: boolean;
  onChange$?: QRL<(checked: boolean, ev: Event) => void>;
  disabled?: boolean;
  required?: boolean;
  /** Form registration / native submit name. */
  name?: string;
  /**
   * Submitted string when checked (HTML `value` attribute).
   * Default `"on"`.
   */
  value?: string;
  autoFocus?: boolean;
  /** Visible label; maps to `<label for={inputId}>`. */
  label?: string;
}
