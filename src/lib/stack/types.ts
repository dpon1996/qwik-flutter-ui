/**
 * `Stack` prop types. See `docs/API_DESIGN.md` §12.
 */

import type { Alignment, BaseProps, Clip } from "../_shared";

/**
 * Props for the `Stack` widget — overlays children on top of each other.
 * Flutter equivalent of `Stack`.
 */
export interface StackProps extends BaseProps {
  /**
   * Aligns (non-positioned) children inside the stack. Default
   * `Alignment.topLeft` (Flutter default).
   */
  alignment?: Alignment;

  /**
   * Clip behavior for content that overflows the stack bounds.
   * Default `Clip.hardEdge` (Flutter default for Stack).
   */
  clipBehavior?: Clip;
}
