/**
 * `Container` prop types. See `docs/API_DESIGN.md` §5.
 */

import type {
  Alignment,
  BaseProps,
  BorderRadius,
  BorderSide,
  BoxShadow,
  ContainerTag,
  EdgeInsets,
  Gradient,
  Length,
} from "../_shared";

/**
 * Props for the `Container` widget — a box with sizing, padding, margin,
 * alignment, and flat decoration. Flutter equivalent of `Container`.
 */
export interface ContainerProps extends BaseProps {
  /**
   * HTML tag to render. Default `"div"`. Use `"section"`, `"article"`,
   * `"header"`, `"footer"`, `"nav"`, `"aside"`, `"main"` for semantic markup.
   */
  as?: ContainerTag;

  /* ---- sizing ---- */
  width?: Length;
  height?: Length;
  minWidth?: Length;
  maxWidth?: Length;
  minHeight?: Length;
  maxHeight?: Length;

  /* ---- spacing ---- */
  padding?: EdgeInsets;
  margin?: EdgeInsets;

  /**
   * Aligns the **child** inside the container. Implemented via flexbox.
   * When set, the container becomes a flex parent; with multiple children
   * they become flex items along the implied axes.
   */
  alignment?: Alignment;

  /* ---- decoration (flat — no nested object) ---- */
  /** CSS background color. If `gradient` is also set, the gradient paints over the color. */
  backgroundColor?: string;
  borderRadius?: BorderRadius;
  /** Raw CSS string (e.g. `"1px solid #ccc"`) or structured `BorderSide`. */
  border?: string | BorderSide;
  /** CSS string, single `BoxShadow`, or an array for stacked shadows. */
  boxShadow?: string | BoxShadow | BoxShadow[];
  /** CSS gradient string or structured `Gradient`. */
  gradient?: string | Gradient;
  /** `0..1`. */
  opacity?: number;
  /** Raw CSS transform (`"rotate(5deg) scale(1.05)"`, etc.). */
  transform?: string;
}
