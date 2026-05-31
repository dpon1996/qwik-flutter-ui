/**
 * `Spacer` prop types. See `docs/API_DESIGN.md` §7.
 */

import type { BaseProps } from "../_shared";

/**
 * Props for the `Spacer` widget — an empty flexible spacer inside `Row` /
 * `Column`. Flutter equivalent of `Spacer`.
 *
 * Spacer is a zero-child widget: it occupies whatever main-axis space is
 * left over after the parent's other children have been sized. With
 * multiple Spacers in the same parent, leftover space is divided in
 * proportion to each Spacer's `flex` value.
 */
export interface SpacerProps extends BaseProps {
  /**
   * Flex factor — the share of remaining main-axis space this Spacer
   * occupies relative to other flex children in the same parent. Default
   * `1`. Maps to CSS `flex-grow: <flex>`.
   *
   *     <Spacer />            → flex-grow: 1
   *     <Spacer flex={2} />   → flex-grow: 2
   */
  flex?: number;
}
