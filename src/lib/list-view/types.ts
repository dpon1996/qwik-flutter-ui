/**
 * Props for `ListView`. See `docs/API_DESIGN.md` §23.
 *
 * Flutter uses `scrollDirection` (type `Axis`); this library uses `axis` (§28.11).
 */

import type { Axis, Clip } from "../_shared";
import type { BaseProps, EdgeInsets, Length } from "../_shared/types";

export interface ListViewProps extends BaseProps {
  /** Scroll axis. Default `Axis.vertical`. */
  axis?: Axis;

  /** Reverse visual order along the scroll axis. Default `false`. */
  reverse?: boolean;

  /**
   * Main-axis gap between slotted children. Default `0`.
   * Extension over Flutter (`ListView` has no `gap` prop).
   */
  gap?: Length;

  /** Padding on the scrollport. */
  padding?: EdgeInsets;

  /**
   * When true, the list sizes to its children instead of expanding in the parent.
   * Default `false`.
   */
  shrinkWrap?: boolean;

  /**
   * Fixed main-axis extent for each direct child (height when vertical, width when horizontal).
   */
  itemExtent?: Length;

  /** Clip overflow on the cross axis of the scrollport. Default `Clip.hardEdge`. */
  clipBehavior?: Clip;
}
