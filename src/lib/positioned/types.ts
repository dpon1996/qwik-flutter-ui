/**
 * `Positioned` prop types. See `docs/API_DESIGN.md` §13.
 */

import type { BaseProps, Length } from "../_shared";

/**
 * Props for the `Positioned` widget — absolutely positions a child inside a
 * `Stack`. Flutter equivalent of `Positioned`.
 */
export interface PositionedProps extends BaseProps {
  top?: Length;
  right?: Length;
  bottom?: Length;
  left?: Length;
  width?: Length;
  height?: Length;
}
