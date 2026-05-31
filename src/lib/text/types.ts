/**
 * `Text` prop types. See `docs/API_DESIGN.md` §14.
 */

import type {
  BaseProps,
  FontStyle,
  FontWeight,
  Length,
  TextAlign,
  TextDecoration,
  TextDecorationStyle,
  TextOverflow,
  TextTag,
  TextTransform,
} from "../_shared";

/**
 * Props for the `Text` widget — displays styled text. Flutter equivalent of
 * `Text`.
 *
 * Text content is passed as a **child** (slot), not via a `text` prop:
 *
 *     <Text>Hello World</Text>   ✓
 *     <Text text="Hello" />      ✗
 */
export interface TextProps extends BaseProps {
  /**
   * HTML tag to render. Default `"span"`. Use `"h1"`–`"h6"` for headings,
   * `"p"` for paragraphs, `"label"` for form labels.
   */
  as?: TextTag;

  /* ---- typography (flat — Flutter's TextStyle flattened in) ---- */
  color?: string;
  fontSize?: Length;
  /** Any valid CSS `font-family` value (Google Fonts, system-ui, etc.). */
  fontFamily?: string;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  letterSpacing?: Length;
  wordSpacing?: Length;
  /** Unitless multiplier (e.g. `1.5`) or explicit CSS length. */
  lineHeight?: number | Length;
  decoration?: TextDecoration;
  decorationColor?: string;
  decorationStyle?: TextDecorationStyle;
  textTransform?: TextTransform;

  /* ---- layout / behavior ---- */
  textAlign?: TextAlign;
  maxLines?: number;
  overflow?: TextOverflow;
  /** Default `true`. When `false`, sets `white-space: nowrap`. */
  softWrap?: boolean;
  /**
   * Default `true` (web idiom). When `false`, text cannot be selected
   * (`user-select: none`).
   */
  selectable?: boolean;
}
