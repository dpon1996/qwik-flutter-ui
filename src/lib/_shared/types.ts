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
  FontWeight,
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

/* ----------------------------------------------------------------- */
/* Forms (v1.3 — §28 InputDecoration, §31 Form)                       */
/* ----------------------------------------------------------------- */

/**
 * Configuration for text field label, placeholder, helper, error, and
 * adornments. Not a widget — composed by `TextField` / `TextFormField`.
 * See `docs/API_DESIGN.md` §28.
 */
export interface InputDecoration {
  /** Visible label; maps to `<label for={inputId}>`. Flutter: `labelText`. */
  label?: string;
  /** Native placeholder. Flutter: `hintText`. */
  placeholder?: string;
  /** Helper copy; linked via `aria-describedby`. Flutter: `helperText`. */
  helperText?: string;
  /** Error message when invalid. Flutter: `errorText`. */
  errorText?: string;
  /** Visual required indicator; pairs with `required` on the control. */
  required?: boolean;
  /** Leading adornment — string or slotted content. */
  prefix?: string;
  /** Trailing adornment — string or slotted content. */
  suffix?: string;
}

/** Submit payload from `Form` (`onSubmit$`). See §31, Decision #76. */
export type FormValues = Record<string, unknown>;

/**
 * Value read from a registered form field (`FormFieldRegistration.getValue`).
 * v1.3 text fields use `string`; v1.4 selection controls use `string` or `boolean`
 * (§53, §56 SC8). `FormValues` remains `Record<string, unknown>` at submit.
 */
export type FormFieldValue = string | boolean;

/** Per-field validator; returns an error message or `undefined` when valid. */
export type FormFieldValidator<T = unknown> = (
  value: T,
) => string | undefined;

/* ----------------------------------------------------------------- */
/* Selection controls (v1.4 — §50 Dropdown, §51)                      */
/* ----------------------------------------------------------------- */

/**
 * One option for native `<select>` rendering in `Dropdown`.
 * See `docs/API_DESIGN.md` §50–§51.
 */
export interface DropdownOption {
  /** Option token — `string` only in v1.4 (§53). */
  value: string;
  label: string;
  disabled?: boolean;
}

/* ----------------------------------------------------------------- */
/* Theming (v1.5 — §57)                                               */
/* ----------------------------------------------------------------- */

/** Semantic color roles. See `docs/API_DESIGN.md` §57. */
export interface ColorScheme {
  primary: string;
  onPrimary: string;
  surface: string;
  onSurface: string;
  error: string;
  onError: string;
  outline: string;
}

/** Typography token. Aligns with flat `TextProps` (§14). */
export interface TextStyle {
  fontFamily?: string;
  fontSize?: Length;
  fontWeight?: FontWeight;
  lineHeight?: number | Length;
  letterSpacing?: Length;
  color?: string;
}

/** Minimal typography scale (v1.5). */
export interface TextTheme {
  body?: TextStyle;
  title?: TextStyle;
  label?: TextStyle;
  caption?: TextStyle;
}

/** Shared `Button` defaults when props omitted (§17). */
export interface ButtonTheme {
  foregroundColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: BorderRadius;
  padding?: EdgeInsets;
}

/** `TextField` / `TextFormField` decoration defaults (§28–§30). */
export interface InputDecorationTheme {
  labelColor?: string;
  helperColor?: string;
  errorColor?: string;
  placeholderColor?: string;
  outlineColor?: string;
  focusOutlineColor?: string;
  borderRadius?: BorderRadius;
  padding?: EdgeInsets;
  requiredIndicatorColor?: string;
}

/** Bundle of visual defaults. Flutter `ThemeData` subset (§57). */
export interface ThemeData {
  colorScheme: ColorScheme;
  textTheme?: TextTheme;
  buttonTheme?: ButtonTheme;
  inputDecorationTheme?: InputDecorationTheme;
}
