/**
 * `SizedBox` prop types. See `docs/API_DESIGN.md` §6.
 */

import type { BaseProps, Length } from "../_shared";

/**
 * Props for the `SizedBox` widget — a box with a fixed width and/or height.
 * Flutter equivalent of `SizedBox`.
 *
 * Both `width` and `height` are optional. If omitted, the corresponding
 * axis sizes to the child's intrinsic size. Most uses are childless (as a
 * spacer between siblings).
 */
export interface SizedBoxProps extends BaseProps {
  /** Fixed width. Numbers become `px`; strings pass through verbatim. */
  width?: Length;

  /** Fixed height. Numbers become `px`; strings pass through verbatim. */
  height?: Length;
}
