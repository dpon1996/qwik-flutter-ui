/**
 * `Expanded` prop types. See `docs/API_DESIGN.md` §8.
 */

import type { BaseProps } from "../_shared";

/**
 * Props for the `Expanded` widget — forces a single child to fill the
 * remaining main-axis space inside a `Row` / `Column`. Flutter equivalent
 * of `Expanded`.
 *
 * With multiple `Expanded` siblings, available space is divided in
 * proportion to each one's `flex` value.
 *
 * Conceptually, `Expanded` is sugar for `Flexible({ fit: FlexFit.tight })`
 * — it forces the child to take exactly its assigned share (no looser
 * fit). See `docs/API_DESIGN.md` §9 for `Flexible`.
 */
export interface ExpandedProps extends BaseProps {
  /**
   * Flex factor — the share of remaining main-axis space this Expanded
   * takes relative to other flex children in the same parent. Default
   * `1`. Maps to the `flex-grow` portion of CSS `flex: <flex> 1 0`.
   *
   *     <Expanded>...</Expanded>            → flex: 1 1 0
   *     <Expanded flex={2}>...</Expanded>   → flex: 2 1 0
   */
  flex?: number;
}
