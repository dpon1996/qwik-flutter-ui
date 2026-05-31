/**
 * `Container` — a box with sizing, padding, margin, alignment, and flat
 * decoration. Flutter equivalent of `Container`. See `docs/API_DESIGN.md` §5.
 *
 * Implementation notes:
 *  - Per-instance values (sizing, colors, decoration) are emitted via inline
 *    `style` so SSR renders complete markup with no client-side hydration
 *    needed for styling (Principle #4, #5).
 *  - Static structure (`box-sizing`, the 9-point alignment helpers) lives in
 *    `container.module.css` (Principle #7 — no CSS-in-JS runtime).
 *  - Numeric `Length` values are converted to `px`; string `Length` values
 *    pass through verbatim (Principle #9).
 *  - The user's `class` and `style` are merged with our internal ones with
 *    user values winning (§0.6).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import type { Gradient, Length } from "../_shared";

import {
  toBorderRadiusString,
  toBorderString,
  toBoxShadowString,
  toEdgeInsetsString,
  toLength,
} from "../_shared/internal";

import styles from "./container.module.css";
import type { ContainerProps } from "./types";

/** Convert `Gradient` (or raw string) to a CSS `background-image` value. */
function toGradientString(g: string | Gradient): string {
  if (typeof g === "string") return g;
  const stops = g.stops
    .map((s) =>
      s.at !== undefined ? `${s.color} ${toLength(s.at)}` : s.color,
    )
    .join(", ");
  if (g.type === "linear") {
    const angle = g.angle ?? 180;
    return `linear-gradient(${angle}deg, ${stops})`;
  }
  return `radial-gradient(${stops})`;
}

export const Container = component$<ContainerProps>((props) => {
  const {
    as = "div",
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    padding,
    margin,
    alignment,
    backgroundColor,
    borderRadius,
    border,
    boxShadow,
    gradient,
    opacity,
    transform,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const computed: CSSProperties = {};
  if (width !== undefined) computed.width = toLength(width);
  if (height !== undefined) computed.height = toLength(height);
  if (minWidth !== undefined) computed.minWidth = toLength(minWidth);
  if (maxWidth !== undefined) computed.maxWidth = toLength(maxWidth);
  if (minHeight !== undefined) computed.minHeight = toLength(minHeight);
  if (maxHeight !== undefined) computed.maxHeight = toLength(maxHeight);
  if (padding !== undefined) computed.padding = toEdgeInsetsString(padding);
  if (margin !== undefined) computed.margin = toEdgeInsetsString(margin);
  if (backgroundColor !== undefined) computed.backgroundColor = backgroundColor;
  if (gradient !== undefined) {
    computed.backgroundImage = toGradientString(gradient);
  }
  if (borderRadius !== undefined) {
    computed.borderRadius = toBorderRadiusString(borderRadius);
  }
  if (border !== undefined) computed.border = toBorderString(border);
  if (boxShadow !== undefined) {
    computed.boxShadow = toBoxShadowString(boxShadow);
  }
  if (opacity !== undefined) computed.opacity = opacity;
  if (transform !== undefined) computed.transform = transform;

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const alignmentClass = alignment
    ? styles[`alignment-${alignment}`]
    : undefined;

  const classes = [styles.container, alignmentClass, className]
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
