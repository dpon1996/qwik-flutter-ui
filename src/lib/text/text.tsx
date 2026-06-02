/**
 * `Text` — displays a run of styled text. Flutter equivalent of `Text`.
 * See `docs/API_DESIGN.md` §14.
 *
 * Implementation notes:
 *  - Child-based content via `<Slot />` — no `text` prop.
 *  - Semantic HTML via `as` prop (`TextTag` union from `_shared`).
 *  - Browser default styles for semantic tags are reset in `text.module.css`
 *    so typography props remain the source of truth.
 *  - Numeric `Length` values become `px`; strings pass through verbatim
 *    (`fontSize`, `letterSpacing`, `wordSpacing`).
 *  - `fontFamily` accepts any CSS font-family string (no enum restriction).
 *  - `maxLines` uses `-webkit-line-clamp` for multi-line truncation.
 *  - `overflow` maps to CSS overflow / text-overflow / mask (fade).
 *  - `selectable` defaults to `true` (web idiom); `false` → `user-select: none`.
 *  - Per-instance styles are inline for SSR-friendly markup (Principle #4).
 *  - `useTheme().textTheme` supplies typography defaults when props are omitted
 *    (§57): `as` maps to `body` | `title` | `label` | `caption`; explicit props win.
 *  - User `class` / `style` merge with internal values; user wins (§0.6).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import { TextOverflow } from "../_shared";
import { toLength } from "../_shared/internal";
import { useTheme } from "../theme";
import type { TextStyle } from "../theme/types";

import { resolveTextThemeStyle } from "./resolve-text-theme";
import styles from "./text.module.css";
import type { TextProps } from "./types";

function applyTextStyle(
  computed: CSSProperties,
  style: TextStyle | undefined,
): void {
  if (style === undefined) return;

  if (style.color !== undefined) computed.color = style.color;
  if (style.fontSize !== undefined) {
    computed.fontSize = toLength(style.fontSize);
  }
  if (style.fontFamily !== undefined) computed.fontFamily = style.fontFamily;
  if (style.fontWeight !== undefined) computed.fontWeight = style.fontWeight;
  if (style.letterSpacing !== undefined) {
    computed.letterSpacing = toLength(style.letterSpacing);
  }
  if (style.lineHeight !== undefined) {
    computed.lineHeight =
      typeof style.lineHeight === "number"
        ? style.lineHeight
        : toLength(style.lineHeight);
  }
}

export const Text = component$<TextProps>((props) => {
  const {
    as = "span",
    color,
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    letterSpacing,
    wordSpacing,
    lineHeight,
    decoration,
    decorationColor,
    decorationStyle,
    textTransform,
    textAlign,
    maxLines,
    overflow,
    softWrap = true,
    selectable = true,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const themed = resolveTextThemeStyle(as, useTheme().textTheme);

  const computed: CSSProperties = {};

  // Theme defaults first; explicit props override (§0.6).
  applyTextStyle(computed, themed);

  if (color !== undefined) computed.color = color;
  if (fontSize !== undefined) computed.fontSize = toLength(fontSize);
  if (fontFamily !== undefined) computed.fontFamily = fontFamily;
  if (fontWeight !== undefined) computed.fontWeight = fontWeight;
  if (fontStyle !== undefined) computed.fontStyle = fontStyle;
  if (letterSpacing !== undefined) {
    computed.letterSpacing = toLength(letterSpacing);
  }
  if (wordSpacing !== undefined) computed.wordSpacing = toLength(wordSpacing);
  if (lineHeight !== undefined) {
    computed.lineHeight =
      typeof lineHeight === "number" ? lineHeight : toLength(lineHeight);
  }
  if (decoration !== undefined) computed.textDecorationLine = decoration;
  if (decorationColor !== undefined) {
    computed.textDecorationColor = decorationColor;
  }
  if (decorationStyle !== undefined) {
    computed.textDecorationStyle = decorationStyle;
  }
  if (textTransform !== undefined) computed.textTransform = textTransform;
  if (textAlign !== undefined) computed.textAlign = textAlign;

  if (softWrap === false) computed.whiteSpace = "nowrap";

  if (maxLines !== undefined) {
    computed.WebkitLineClamp = maxLines;
    if (overflow === TextOverflow.ellipsis) {
      computed.textOverflow = "ellipsis";
    }
  } else if (overflow === TextOverflow.ellipsis) {
    computed.overflow = "hidden";
    computed.textOverflow = "ellipsis";
    computed.whiteSpace = "nowrap";
  } else if (overflow === TextOverflow.clip) {
    computed.overflow = "hidden";
  } else if (overflow === TextOverflow.visible) {
    computed.overflow = "visible";
  }

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [
    styles.text,
    maxLines !== undefined ? styles.clamp : undefined,
    overflow === TextOverflow.fade ? styles["overflow-fade"] : undefined,
    selectable === false ? styles["not-selectable"] : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = as;

  return (
    <Tag class={classes} style={style} {...rest}>
      <Slot />
    </Tag>
  );
});
