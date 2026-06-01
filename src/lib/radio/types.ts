/**
 * `Radio` prop types. See `docs/API_DESIGN.md` §47.
 */

import type { BaseProps } from "../_shared";

/**
 * Props for a single `Radio` option — must be used inside `RadioGroup` (#80).
 *
 * Selection is owned by `RadioGroup` (#82). Not on `Radio`: `checked`, `onChange$`, `name`.
 */
export interface RadioProps extends BaseProps {
  /**
   * Option token — **string only** (§53).
   * Native `checked` when `RadioGroup` selection equals this value.
   */
  value: string;
  /** Per-option disable; group `disabled` also applies. */
  disabled?: boolean;
  /**
   * Simple text label → `<label for={inputId}>`.
   * Slotted children take precedence over `label` (#84).
   */
  label?: string;
}
