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

/**
 * Material Design elevation → `box-shadow` presets (dp ≈ px).
 * Shared by `Card` and `Button` (`ButtonVariant.elevated`).
 */
const ELEVATION_SHADOWS: readonly string[] = [
  "none",
  "0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)",
  "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
  "0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12)",
  "0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)",
  "0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 14px 0 rgba(0, 0, 0, 0.12)",
  "0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)",
  "0 4px 5px -2px rgba(0, 0, 0, 0.2), 0 7px 10px 1px rgba(0, 0, 0, 0.14), 0 2px 16px 1px rgba(0, 0, 0, 0.12)",
  "0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)",
  "0 5px 6px -3px rgba(0, 0, 0, 0.2), 0 9px 12px 1px rgba(0, 0, 0, 0.14), 0 3px 16px 2px rgba(0, 0, 0, 0.12)",
  "0 6px 6px -3px rgba(0, 0, 0, 0.2), 0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12)",
  "0 6px 7px -4px rgba(0, 0, 0, 0.2), 0 11px 15px 1px rgba(0, 0, 0, 0.14), 0 4px 20px 3px rgba(0, 0, 0, 0.12)",
  "0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12)",
  "0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12)",
  "0 7px 9px -4px rgba(0, 0, 0, 0.2), 0 14px 21px 2px rgba(0, 0, 0, 0.14), 0 5px 26px 4px rgba(0, 0, 0, 0.12)",
  "0 8px 9px -5px rgba(0, 0, 0, 0.2), 0 15px 22px 2px rgba(0, 0, 0, 0.14), 0 6px 28px 5px rgba(0, 0, 0, 0.12)",
  "0 8px 10px -5px rgba(0, 0, 0, 0.2), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12)",
  "0 8px 11px -5px rgba(0, 0, 0, 0.2), 0 17px 26px 2px rgba(0, 0, 0, 0.14), 0 6px 32px 5px rgba(0, 0, 0, 0.12)",
  "0 9px 11px -5px rgba(0, 0, 0, 0.2), 0 18px 28px 2px rgba(0, 0, 0, 0.14), 0 7px 34px 6px rgba(0, 0, 0, 0.12)",
  "0 9px 12px -6px rgba(0, 0, 0, 0.2), 0 19px 29px 2px rgba(0, 0, 0, 0.14), 0 7px 36px 6px rgba(0, 0, 0, 0.12)",
  "0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12)",
  "0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 21px 33px 3px rgba(0, 0, 0, 0.14), 0 8px 40px 7px rgba(0, 0, 0, 0.12)",
  "0 10px 14px -6px rgba(0, 0, 0, 0.2), 0 22px 35px 3px rgba(0, 0, 0, 0.14), 0 8px 42px 7px rgba(0, 0, 0, 0.12)",
  "0 11px 14px -7px rgba(0, 0, 0, 0.2), 0 23px 36px 3px rgba(0, 0, 0, 0.14), 0 9px 44px 8px rgba(0, 0, 0, 0.12)",
  "0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)",
];

/** Map Material elevation (0–24) to a preset `box-shadow`. */
export function elevationToBoxShadow(elevation: number): string {
  if (elevation <= 0) return "none";
  const index = Math.min(24, Math.round(elevation));
  return ELEVATION_SHADOWS[index] ?? ELEVATION_SHADOWS[24]!;
}
