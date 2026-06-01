/**
 * `Radio` prop types. See `docs/API_DESIGN.md` §47.
 */

import type { BaseProps } from "../_shared";

/**
 * Props for a single `Radio` option — must be used inside `RadioGroup` (#80).
 */
export interface RadioProps extends BaseProps {
  /**
   * Option token — string only (§53).
   * `checked` is derived when `RadioGroup` selection equals this value (#82).
   */
  value: string;
  disabled?: boolean;
  /** Visible label; slotted content takes precedence (#84). */
  label?: string;
}
