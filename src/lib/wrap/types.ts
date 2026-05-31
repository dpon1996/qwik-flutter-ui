/**
 * `Wrap` prop types. See `docs/API_DESIGN.md` §11.
 */

import type {
  Axis,
  BaseProps,
  Clip,
  TextDirection,
  VerticalDirection,
  WrapAlignment,
  WrapCrossAlignment,
  Length,
} from "../_shared";

/**
 * Props for the `Wrap` widget — a flex container that wraps overflowing
 * children onto additional lines/runs. Flutter equivalent of `Wrap`.
 */
export interface WrapProps extends BaseProps {
  /** Main axis direction. Default `Axis.horizontal`. */
  direction?: Axis;

  /** Main-axis alignment within each run. Default `WrapAlignment.start`. */
  alignment?: WrapAlignment;

  /** Cross-axis alignment between runs. Default `WrapAlignment.start`. */
  runAlignment?: WrapAlignment;

  /** Alignment of children inside each run. Default `WrapCrossAlignment.start`. */
  crossAxisAlignment?: WrapCrossAlignment;

  /** Main-axis gap between children. Default `0`. */
  spacing?: Length;

  /** Cross-axis gap between runs. Default `0`. */
  runSpacing?: Length;

  /** Writing direction (`ltr` / `rtl`). */
  textDirection?: TextDirection;

  /** Vertical direction (`down` / `up`). Default `VerticalDirection.down`. */
  verticalDirection?: VerticalDirection;

  /** Clipping behavior. Default `Clip.none`. */
  clipBehavior?: Clip;
}
