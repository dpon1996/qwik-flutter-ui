/**
 * Props for `SingleChildScrollView`. See `docs/API_DESIGN.md` §22.
 *
 * Flutter names scroll orientation `scrollDirection` (type `Axis`); this
 * library uses `axis` for consistency with `Divider`, `Wrap`, and other widgets.
 */

import type { Axis, Clip } from "../_shared";
import type { BaseProps, EdgeInsets } from "../_shared/types";

export interface SingleChildScrollViewProps extends BaseProps {
  /**
   * Scroll axis. Default `Axis.vertical`.
   * Not Flutter's `scrollDirection` — same `Axis` values, equivalent behavior.
   */
  axis?: Axis;

  /** Scroll from end toward start. Default `false`. */
  reverse?: boolean;

  /** Padding on the scrollport. */
  padding?: EdgeInsets;

  /**
   * Clip overflow on the cross axis of the scrollport.
   * Default `Clip.hardEdge` (Flutter parity).
   */
  clipBehavior?: Clip;
}
