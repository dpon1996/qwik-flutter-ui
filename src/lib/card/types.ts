/**
 * `Card` prop types. See `docs/API_DESIGN.md` §15.
 */

import type {
  BaseProps,
  BorderRadius,
  BorderSide,
  BoxShadow,
  ContainerTag,
  EdgeInsets,
} from "../_shared";

/**
 * Props for the `Card` widget — a Material-style surface with elevation and
 * decoration. Flutter equivalent of `Card`.
 */
export interface CardProps extends BaseProps {
  /**
   * HTML tag to render. Default `"div"`. Use `"article"` for standalone
   * content cards. Reuses `ContainerTag` (semantic HTML tags).
   */
  as?: ContainerTag;

  /**
   * Material-style shadow depth (0–24). Rounded to the nearest integer.
   * Default `1`. Ignored when `boxShadow` is set. Pass `0` for a flat card.
   */
  elevation?: number;

  /** Outer spacing around the card surface (Flutter `margin`). No default. */
  margin?: EdgeInsets;

  /** Inner spacing. */
  padding?: EdgeInsets;

  /** CSS background color for the card surface. */
  backgroundColor?: string;

  borderRadius?: BorderRadius;

  /** Raw CSS string (e.g. `"1px solid #ccc"`) or structured `BorderSide`. */
  border?: string | BorderSide;

  /**
   * Custom shadow. When set, overrides `elevation`. CSS string, single
   * `BoxShadow`, or stacked layers.
   */
  boxShadow?: string | BoxShadow | BoxShadow[];
}
