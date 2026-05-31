/**
 * `Visibility` prop types. See `docs/API_DESIGN.md` §19.
 */

import type { BaseProps } from "../_shared";

/**
 * Props for the `Visibility` widget — shows or hides a slotted child.
 * Flutter equivalent of `Visibility`.
 */
export interface VisibilityProps extends BaseProps {
  /** When false, child is hidden. Default `true`. */
  visible?: boolean;

  /**
   * When false and `visible` is false, remove from layout (`display: none`).
   * When true, keep box but hide visually (`visibility: hidden`).
   * Default `false`.
   */
  maintainSize?: boolean;

  /**
   * When false and `visible` is false, exclude the subtree from the
   * accessibility tree (`aria-hidden="true"`). Default `true` (Flutter parity).
   */
  maintainSemantics?: boolean;
}
