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

import type {
  BorderRadius,
  BorderSide,
  BoxShadow,
  EdgeInsets,
  Gradient,
  Length,
} from "../_shared";

import styles from "./container.module.css";
import type { ContainerProps } from "./types";

/* ----------------------------------------------------------------- */
/* Value converters — Length-aware                                    */
/* ----------------------------------------------------------------- */

/** Convert a `Length` to a CSS string. Numbers become `<n>px`. */
const toLength = (v: Length): string =>
  typeof v === "number" ? `${v}px` : v;

/** Convert `EdgeInsets` to a CSS shorthand string for `padding` / `margin`. */
function toEdgeInsetsString(e: EdgeInsets): string {
  if (typeof e === "number" || typeof e === "string") {
    return toLength(e);
  }
  if (Array.isArray(e)) {
    if (e.length === 2) {
      return `${toLength(e[0])} ${toLength(e[1])}`;
    }
    return [
      toLength(e[0]),
      toLength(e[1]),
      toLength(e[2]),
      toLength(e[3]),
    ].join(" ");
  }
  const top = e.top ?? e.y ?? 0;
  const right = e.right ?? e.x ?? 0;
  const bottom = e.bottom ?? e.y ?? 0;
  const left = e.left ?? e.x ?? 0;
  return [
    toLength(top),
    toLength(right),
    toLength(bottom),
    toLength(left),
  ].join(" ");
}

/** Convert `BorderRadius` to a CSS `border-radius` value. */
function toBorderRadiusString(r: BorderRadius): string {
  if (typeof r === "number" || typeof r === "string") {
    return toLength(r);
  }
  return [
    toLength(r.topLeft ?? 0),
    toLength(r.topRight ?? 0),
    toLength(r.bottomRight ?? 0),
    toLength(r.bottomLeft ?? 0),
  ].join(" ");
}

/** Convert `BorderSide` (or raw string) to a CSS `border` shorthand. */
function toBorderString(b: string | BorderSide): string {
  if (typeof b === "string") return b;
  const width = toLength(b.width ?? 1);
  const style = b.style ?? "solid";
  const color = b.color ?? "currentColor";
  return `${width} ${style} ${color}`;
}

/** Convert a single `BoxShadow` to a CSS box-shadow layer. */
function toBoxShadowLayer(s: BoxShadow): string {
  const x = toLength(s.offsetX ?? 0);
  const y = toLength(s.offsetY ?? 0);
  const blur = toLength(s.blur ?? 0);
  const spread = toLength(s.spread ?? 0);
  const color = s.color ?? "currentColor";
  const inset = s.inset ? "inset " : "";
  return `${inset}${x} ${y} ${blur} ${spread} ${color}`;
}

/** Convert `BoxShadow` (or shape variants) to a CSS `box-shadow` value. */
function toBoxShadowString(s: string | BoxShadow | BoxShadow[]): string {
  if (typeof s === "string") return s;
  if (Array.isArray(s)) return s.map(toBoxShadowLayer).join(", ");
  return toBoxShadowLayer(s);
}

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

/* ----------------------------------------------------------------- */
/* Component                                                          */
/* ----------------------------------------------------------------- */

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

  /* Build the computed inline style. Only set keys that were provided so
   * the rendered HTML stays clean (no `width: undefined` strings). */
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
  /* `backgroundImage` (not `background` shorthand) so backgroundColor still
   * applies underneath — design doc: "gradient wins (it paints on top)". */
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

  /* User style wins on conflicts (§0.6). */
  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const alignmentClass = alignment
    ? styles[`alignment-${alignment}`]
    : undefined;

  const classes = [styles.container, alignmentClass, className]
    .filter(Boolean)
    .join(" ");

  /* Dynamic tag from the `as` prop. ContainerTag is a string union of valid
   * HTML tags; the JSX runtime renders it correctly. TypeScript can't infer
   * the precise element type for a dynamic tag, so we widen. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = as;

  return (
    <Tag class={classes} style={style} {...rest}>
      <Slot />
    </Tag>
  );
});
