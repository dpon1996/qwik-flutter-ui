/**
 * `AspectRatio` prop types. See `docs/API_DESIGN.md` §21.
 */

import type { BaseProps } from "../_shared";

/**
 * Props for the `AspectRatio` widget — locks width-to-height proportional sizing.
 * Flutter equivalent of `AspectRatio`.
 */
export interface AspectRatioProps extends BaseProps {
  /**
   * Width / height ratio (required). `aspectRatio={16 / 9}` → CSS `aspect-ratio`.
   * Must be `> 0`; invalid runtime values clamp to `1` (decision #38).
   */
  aspectRatio: number;
}
