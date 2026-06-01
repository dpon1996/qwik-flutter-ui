/**
 * Props for `GridView`. See `docs/API_DESIGN.md` §24.
 *
 * Flutter `crossAxisCount` → `columns`; `crossAxisSpacing` → `gap`;
 * `mainAxisSpacing` → `mainAxisSpacing`.
 */

import type { Axis, Clip } from "../_shared";
import type { BaseProps, EdgeInsets, Length } from "../_shared/types";

export interface GridViewProps extends BaseProps {
  /** Scroll axis. Default `Axis.vertical`. */
  axis?: Axis;

  /** Reverse visual order along the scroll axis. Default `false`. */
  reverse?: boolean;

  padding?: EdgeInsets;

  /** Fixed column count (Flutter `crossAxisCount`). Takes precedence over `minItemWidth`. */
  columns?: number;

  /** Responsive columns via `auto-fill` / `minmax` when `columns` is unset. */
  minItemWidth?: Length;

  /** Cross-axis spacing (Flutter `crossAxisSpacing`). Default `0`. */
  gap?: Length;

  /** Main-axis spacing between rows (Flutter `mainAxisSpacing`). Default `0`. */
  mainAxisSpacing?: Length;

  /**
   * Width / height ratio applied to each direct child via CSS `aspect-ratio`.
   * Invalid values clamp to `1` with a dev warning (decision #38).
   */
  childAspectRatio?: number;

  clipBehavior?: Clip;
}
