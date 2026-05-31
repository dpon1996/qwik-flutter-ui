/**
 * `Align` prop types. See `docs/API_DESIGN.md` §20.
 */

import type { Alignment, BaseProps } from "../_shared";

/**
 * Props for the `Align` widget — positions a child within available space.
 * Flutter equivalent of `Align`.
 */
export interface AlignProps extends BaseProps {
  /** Where to position the child within this widget. Default `Alignment.center`. */
  alignment?: Alignment;

  /**
   * If set, width = parent width × factor (0..1).
   * Same semantics as Flutter `widthFactor` (relative to parent constraints).
   */
  widthFactor?: number;

  /**
   * If set, height = parent height × factor (0..1).
   * Same semantics as Flutter `heightFactor` (relative to parent constraints).
   */
  heightFactor?: number;
}
