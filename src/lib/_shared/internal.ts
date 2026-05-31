/**
 * qwik-flutter-ui — internal helpers
 *
 * Cross-widget implementation helpers. **NOT part of the public API** —
 * deliberately excluded from `_shared/index.ts` so consumers can't import
 * them from the package root. Widgets import directly:
 *
 *     import { toLength } from "../_shared/internal";
 *
 * Anything added here should be:
 *  - Pure (no side effects, no Qwik APIs).
 *  - Used by ≥ 2 widget implementations.
 *  - Stable enough that an internal-only refactor wouldn't break anyone.
 */

import type {
  BorderRadius,
  BorderSide,
  BoxShadow,
  EdgeInsets,
  Length,
} from "./types";

/**
 * Convert a `Length` to a CSS string. Numbers become `<n>px`; strings pass
 * through verbatim. See `docs/API_DESIGN.md` §0.4 for the `Length` contract.
 */
export const toLength = (v: Length): string =>
  typeof v === "number" ? `${v}px` : v;

/** Convert `EdgeInsets` to a CSS shorthand string for `padding` / `margin`. */
export function toEdgeInsetsString(e: EdgeInsets): string {
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
export function toBorderRadiusString(r: BorderRadius): string {
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
export function toBorderString(b: string | BorderSide): string {
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
export function toBoxShadowString(s: string | BoxShadow | BoxShadow[]): string {
  if (typeof s === "string") return s;
  if (Array.isArray(s)) return s.map(toBoxShadowLayer).join(", ");
  return toBoxShadowLayer(s);
}
