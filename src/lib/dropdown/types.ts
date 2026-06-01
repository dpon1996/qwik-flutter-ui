/**
 * `Dropdown` prop types. See `docs/API_DESIGN.md` §50.
 */

import type { QRL } from "@builder.io/qwik";

import type { BaseProps, DropdownOption } from "../_shared";

/**
 * Props for the `Dropdown` widget — single-choice native `<select>`.
 * Flutter equivalent of `DropdownButton`.
 */
export interface DropdownProps extends BaseProps {
  options: DropdownOption[];
  /** Controlled selected option token (`string` only, §53). */
  value?: string;
  /** Uncontrolled initial selection for SSR (§55). */
  defaultValue?: string;
  onChange$?: QRL<(value: string, ev: Event) => void>;
  disabled?: boolean;
  required?: boolean;
  /** Form registration / native submit name. */
  name?: string;
  /**
   * Placeholder when no selection — rendered as `<option value="" disabled hidden>`.
   * Does not satisfy `required` (§56 SC10).
   */
  placeholder?: string;
  /** Visible label; maps to `<label for={selectId}>`. */
  label?: string;
}
