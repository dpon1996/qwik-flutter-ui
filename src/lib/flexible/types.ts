/**
 * `Flexible` prop types. See `docs/API_DESIGN.md` §9.
 */

import type { BaseProps } from "../_shared";

/**
 * Props for the `Flexible` widget — a loose-fit flex child inside `Row` /
 * `Column`. Flutter equivalent of `Flexible` (default fit behavior).
 *
 * Unlike `Expanded`, Flexible does **not** force its child to fill all
 * available space. The child may keep its natural/intrinsic size while the
 * flex item still participates in space distribution.
 */
export interface FlexibleProps extends BaseProps {
  /**
   * Flex factor — the share of remaining main-axis space this Flexible
   * receives relative to other flex children in the same parent. Default `1`.
   *
   *     <Flexible>...</Flexible>           -> flex: 1 1 auto
   *     <Flexible flex={2}>...</Flexible> -> flex: 2 1 auto
   */
  flex?: number;
}
