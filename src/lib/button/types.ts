/**
 * `Button` prop types. See `docs/API_DESIGN.md` §17.
 */

import type {
  BaseProps,
  BorderRadius,
  BorderSide,
  ButtonTag,
  ButtonVariant,
  EdgeInsets,
  InteractiveProps,
} from "../_shared";

/**
 * Props for the `Button` widget — a labeled pressable control.
 * Flutter equivalent of `FilledButton` / `OutlinedButton` / `TextButton`.
 */
export interface ButtonProps extends BaseProps, InteractiveProps {
  /** Native element. Default `"button"`. Use `"a"` with `href` for links. */
  as?: ButtonTag;

  variant?: ButtonVariant;

  /** Foreground (label) color. Named `color` to match `Text`. */
  color?: string;
  backgroundColor?: string;
  padding?: EdgeInsets;
  borderRadius?: BorderRadius;
  border?: string | BorderSide;

  /** Only when rendering `<button>`. Default `"button"`. */
  type?: "button" | "submit" | "reset";

  /** When set, renders `<a>` (decision #33). */
  href?: string;
  target?: string;
  rel?: string;

  /** Elevation shadow for `ButtonVariant.elevated` only. Default `1`. */
  elevation?: number;
}
