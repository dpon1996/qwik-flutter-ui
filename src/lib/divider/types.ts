/**
 * `Divider` prop types. See `docs/API_DESIGN.md` §16.
 */

import type { Axis, BaseProps, Length } from "../_shared";

/**
 * Props for the `Divider` widget — a horizontal or vertical separator line.
 * Flutter equivalent of `Divider` / `VerticalDivider` (unified via `axis`).
 */
export interface DividerProps extends BaseProps {
  /** Line orientation. Default `Axis.horizontal`. */
  axis?: Axis;

  /** Thickness of the line itself. Default `1` (px). */
  thickness?: Length;

  /**
   * Total cross-axis size (Flutter `height` on horizontal divider /
   * `width` on vertical). Default `16`.
   */
  size?: Length;

  /** Inset before the line along the main axis. Default `0`. */
  indent?: Length;

  /** Inset after the line along the main axis. Default `0`. */
  endIndent?: Length;

  /** CSS color of the line. Default `#e0e0e0`. */
  color?: string;
}
