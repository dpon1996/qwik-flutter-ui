/**
 * qwik-flutter-ui — shared types
 *
 * Cross-widget types used by every widget's prop interface. See
 * `docs/API_DESIGN.md` §2.
 */

import type { CSSProperties, QRL } from "@builder.io/qwik";

import type {
  BorderStyle,
  CrossAxisAlignment,
  MainAxisAlignment,
  MainAxisSize,
  TextDirection,
  VerticalDirection,
} from "./enums";

/* ----------------------------------------------------------------- */
/* Primitive types                                                   */
/* ----------------------------------------------------------------- */

/**
 * A CSS length. Numbers are interpreted as `px`. Strings are passed through
 * verbatim (e.g. `"1rem"`, `"50%"`, `"100vh"`, `"auto"`, `"clamp(...)"`).
 */
export type Length = number | string;

/**
 * Padding / margin shorthand. See API_DESIGN §0.3.
 *
 * - `Length`                            — all four sides
 * - `[Length, Length]`                  — `[vertical, horizontal]`
 * - `[Length, Length, Length, Length]`  — `[top, right, bottom, left]`
 * - object form                         — per-side, with `x` / `y` shortcuts
 *   where `x` is `left + right` and `y` is `top + bottom`
 */
export type EdgeInsets =
  | Length
  | [Length, Length]
  | [Length, Length, Length, Length]
  | {
      top?: Length;
      right?: Length;
      bottom?: Length;
      left?: Length;
      x?: Length;
      y?: Length;
    };

/**
 * Per-corner border radius. A single `Length` applies to all corners. The
 * object form matches Flutter's `BorderRadius.only(...)`.
 */
export type BorderRadius =
  | Length
  | {
      topLeft?: Length;
      topRight?: Length;
      bottomRight?: Length;
      bottomLeft?: Length;
    };

/* ----------------------------------------------------------------- */
/* Base props (accessibility + identification passthrough)            */
/* ----------------------------------------------------------------- */

/**
 * Any `aria-*` attribute. Uses a template-literal index signature so
 * `aria-label`, `aria-hidden`, etc. are accepted without enumeration.
 */
type AriaAttributes = {
  [K in `aria-${string}`]?: string | number | boolean;
};

/**
 * Any `data-*` attribute. Includes `data-testid` for test instrumentation.
 */
type DataAttributes = {
  [K in `data-${string}`]?: string | number | boolean;
};

/**
 * Props every widget accepts.
 *
 * - `class` / `style` are merged with internal classes/styles (user wins).
 * - `id` is a DOM `id` passthrough.
 * - `role` is the ARIA role.
 * - Open `aria-*` and `data-*` index signatures allow any accessibility
 *   attribute or data attribute to be passed through without enumeration.
 *
 * Unknown props are rejected by TypeScript — there is no `...rest` spread
 * onto the DOM.
 */
export interface BaseProps extends AriaAttributes, DataAttributes {
  class?: string;
  style?: CSSProperties;
  id?: string;
  role?: string;
}

/* ----------------------------------------------------------------- */
/* Decoration types                                                  */
/* ----------------------------------------------------------------- */

export interface BoxShadow {
  offsetX?: Length;
  offsetY?: Length;
  blur?: Length;
  spread?: Length;
  color?: string;
  inset?: boolean;
}

export interface Gradient {
  type: "linear" | "radial";
  /** Linear only, degrees. Ignored when `type === "radial"`. */
  angle?: number;
  stops: Array<{ color: string; at?: Length }>;
}

export interface BorderSide {
  width?: Length;
  color?: string;
  style?: BorderStyle;
}

/* ----------------------------------------------------------------- */
/* Flex props (shared by Row & Column)                                */
/* ----------------------------------------------------------------- */

/**
 * Shared base for `RowProps` and `ColumnProps`. Each widget aliases this as a
 * distinct name for nicer editor hovers and future divergence.
 */
export interface FlexProps extends BaseProps {
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  mainAxisSize?: MainAxisSize;
  gap?: Length;
  textDirection?: TextDirection;
  verticalDirection?: VerticalDirection;
}

/* ----------------------------------------------------------------- */
/* Semantic-tag unions (§5 Container, §14 Text)                       */
/* ----------------------------------------------------------------- */

/**
 * HTML tags that `Container` and `Card` can render via `as`. Default is `"div"`.
 */
export type ContainerTag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "nav"
  | "aside"
  | "main";

/**
 * HTML tags that `Text` can render via its `as` prop. Default is `"span"`.
 */
export type TextTag =
  | "span"
  | "p"
  | "div"
  | "label"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "strong"
  | "em"
  | "small";

/* ----------------------------------------------------------------- */
/* Interactive widgets (§17 Button; v1.1+)                            */
/* ----------------------------------------------------------------- */

/** Native element for `Button`. Default `"button"`. */
export type ButtonTag = "button" | "a";

/**
 * Base for interactive widgets. Layout widgets do **not** extend this.
 * See `docs/API_DESIGN.md` §0.7 and §2.
 */
export interface InteractiveProps {
  onClick$?: QRL<(event: MouseEvent, element: HTMLElement) => void>;
  disabled?: boolean;
}
