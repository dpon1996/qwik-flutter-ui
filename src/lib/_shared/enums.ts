/**
 * qwik-flutter-ui — shared enums
 *
 * All enums use the const-object + companion type pattern documented in
 * `docs/API_DESIGN.md` §0.10. Each enum exports a value (the const object) and
 * a type (a union of its values) sharing the same name. Section numbers refer
 * to the API design document.
 */

/* §1.1 — `MainAxisAlignment` (Row / Column) */
export const MainAxisAlignment = {
  start: "start",
  end: "end",
  center: "center",
  spaceBetween: "space-between",
  spaceAround: "space-around",
  spaceEvenly: "space-evenly",
} as const;
export type MainAxisAlignment =
  (typeof MainAxisAlignment)[keyof typeof MainAxisAlignment];

/* §1.2 — `CrossAxisAlignment` (Row / Column) */
export const CrossAxisAlignment = {
  start: "start",
  end: "end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
} as const;
export type CrossAxisAlignment =
  (typeof CrossAxisAlignment)[keyof typeof CrossAxisAlignment];

/* §1.3 — `MainAxisSize` (Row / Column) */
export const MainAxisSize = {
  min: "min",
  max: "max",
} as const;
export type MainAxisSize =
  (typeof MainAxisSize)[keyof typeof MainAxisSize];

/* §1.4 — `Axis` (Wrap, Divider, scrolling v1.2) */
export const Axis = {
  horizontal: "horizontal",
  vertical: "vertical",
} as const;
export type Axis = (typeof Axis)[keyof typeof Axis];

/* §1.5 — `WrapAlignment` (Wrap) */
export const WrapAlignment = {
  start: "start",
  end: "end",
  center: "center",
  spaceBetween: "space-between",
  spaceAround: "space-around",
  spaceEvenly: "space-evenly",
} as const;
export type WrapAlignment =
  (typeof WrapAlignment)[keyof typeof WrapAlignment];

/* §1.6 — `WrapCrossAlignment` (Wrap) */
export const WrapCrossAlignment = {
  start: "start",
  end: "end",
  center: "center",
} as const;
export type WrapCrossAlignment =
  (typeof WrapCrossAlignment)[keyof typeof WrapCrossAlignment];

/* §1.7 — `TextDirection` (Row / Column / Wrap / Stack) */
export const TextDirection = {
  ltr: "ltr",
  rtl: "rtl",
} as const;
export type TextDirection =
  (typeof TextDirection)[keyof typeof TextDirection];

/* §1.8 — `VerticalDirection` (Row / Column / Wrap) */
export const VerticalDirection = {
  down: "down",
  up: "up",
} as const;
export type VerticalDirection =
  (typeof VerticalDirection)[keyof typeof VerticalDirection];

/* §1.9 — `Alignment` (Container / Stack / Center / Align) */
export const Alignment = {
  topLeft: "top-left",
  topCenter: "top-center",
  topRight: "top-right",
  centerLeft: "center-left",
  center: "center",
  centerRight: "center-right",
  bottomLeft: "bottom-left",
  bottomCenter: "bottom-center",
  bottomRight: "bottom-right",
} as const;
export type Alignment = (typeof Alignment)[keyof typeof Alignment];

/* §1.10 — `StackFit` (Stack) */
export const StackFit = {
  loose: "loose",
  expand: "expand",
  passthrough: "passthrough",
} as const;
export type StackFit = (typeof StackFit)[keyof typeof StackFit];

/**
 * §1.11 — `Clip` (Container v1.1 / Stack / Wrap)
 *
 * `hardEdge` and `antiAlias` both map to `overflow: hidden` in browsers today.
 * Both names are kept for Flutter parity and to allow future divergence.
 */
export const Clip = {
  none: "none",
  hardEdge: "hard-edge",
  antiAlias: "anti-alias",
} as const;
export type Clip = (typeof Clip)[keyof typeof Clip];

/**
 * §1.12 — `FlexFit` (Flexible)
 *
 * `Flexible({ fit: FlexFit.tight })` is semantically equivalent to `Expanded`.
 */
export const FlexFit = {
  loose: "loose",
  tight: "tight",
} as const;
export type FlexFit = (typeof FlexFit)[keyof typeof FlexFit];

/* §1.13 — `TextAlign` (Text) */
export const TextAlign = {
  left: "left",
  right: "right",
  center: "center",
  justify: "justify",
  start: "start",
  end: "end",
} as const;
export type TextAlign = (typeof TextAlign)[keyof typeof TextAlign];

/* §1.14 — `TextOverflow` (Text) */
export const TextOverflow = {
  clip: "clip",
  ellipsis: "ellipsis",
  fade: "fade",
  visible: "visible",
} as const;
export type TextOverflow =
  (typeof TextOverflow)[keyof typeof TextOverflow];

/**
 * §1.15 — `FontWeight` (Text)
 *
 * `normal` is an alias for `w400`; `bold` is an alias for `w700`.
 */
export const FontWeight = {
  w100: "100",
  w200: "200",
  w300: "300",
  w400: "400",
  w500: "500",
  w600: "600",
  w700: "700",
  w800: "800",
  w900: "900",
  normal: "400",
  bold: "700",
} as const;
export type FontWeight = (typeof FontWeight)[keyof typeof FontWeight];

/* §1.16 — `FontStyle` (Text) */
export const FontStyle = {
  normal: "normal",
  italic: "italic",
} as const;
export type FontStyle = (typeof FontStyle)[keyof typeof FontStyle];

/* §1.17 — `TextDecoration` (Text) */
export const TextDecoration = {
  none: "none",
  underline: "underline",
  overline: "overline",
  lineThrough: "line-through",
} as const;
export type TextDecoration =
  (typeof TextDecoration)[keyof typeof TextDecoration];

/* §1.18 — `TextDecorationStyle` (Text) */
export const TextDecorationStyle = {
  solid: "solid",
  double: "double",
  dotted: "dotted",
  dashed: "dashed",
  wavy: "wavy",
} as const;
export type TextDecorationStyle =
  (typeof TextDecorationStyle)[keyof typeof TextDecorationStyle];

/* §1.19 — `TextTransform` (Text) */
export const TextTransform = {
  none: "none",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
} as const;
export type TextTransform =
  (typeof TextTransform)[keyof typeof TextTransform];

/* §1.20 — `BorderStyle` (Container) */
export const BorderStyle = {
  none: "none",
  solid: "solid",
  dashed: "dashed",
  dotted: "dotted",
} as const;
export type BorderStyle = (typeof BorderStyle)[keyof typeof BorderStyle];

/* §1.21 — `BoxFit` (Image) */
export const BoxFit = {
  fill: "fill",
  contain: "contain",
  cover: "cover",
  fitWidth: "fit-width",
  fitHeight: "fit-height",
  none: "none",
  scaleDown: "scale-down",
} as const;
export type BoxFit = (typeof BoxFit)[keyof typeof BoxFit];

/* §1.22 — `ButtonVariant` (Button) */
export const ButtonVariant = {
  filled: "filled",
  outlined: "outlined",
  text: "text",
  elevated: "elevated",
} as const;
export type ButtonVariant =
  (typeof ButtonVariant)[keyof typeof ButtonVariant];

/* §1.23 — `ImageLoading` (Image) */
export const ImageLoading = {
  eager: "eager",
  lazy: "lazy",
} as const;
export type ImageLoading =
  (typeof ImageLoading)[keyof typeof ImageLoading];

/* §1.24 — `ImagePlaceholder` (Image) */
export const ImagePlaceholder = {
  none: "none",
  skeleton: "skeleton",
  shimmer: "shimmer",
} as const;
export type ImagePlaceholder =
  (typeof ImagePlaceholder)[keyof typeof ImagePlaceholder];

/* §1.25 — `ImageError` (Image) */
export const ImageError = {
  none: "none",
  icon: "icon",
  text: "text",
} as const;
export type ImageError = (typeof ImageError)[keyof typeof ImageError];

/* §1.27 — `Orientation` (MediaQuery, v1.25) */
export const Orientation = {
  portrait: "portrait",
  landscape: "landscape",
} as const;
export type Orientation =
  (typeof Orientation)[keyof typeof Orientation];

/* §1.28 — `Breakpoint` (shared responsive tier, v1.25) */
export const Breakpoint = {
  mobile: "mobile",
  tablet: "tablet",
  desktop: "desktop",
} as const;
export type Breakpoint = (typeof Breakpoint)[keyof typeof Breakpoint];

/* §1.29 — `InputType` (TextField, v1.3) */
export const InputType = {
  text: "text",
  password: "password",
  email: "email",
  url: "url",
  tel: "tel",
  search: "search",
  number: "number",
  date: "date",
  time: "time",
  datetimeLocal: "datetime-local",
  month: "month",
  week: "week",
  color: "color",
} as const;
export type InputType = (typeof InputType)[keyof typeof InputType];

/* §1.30 — `AutovalidateMode` (Form, v1.3) */
export const AutovalidateMode = {
  disabled: "disabled",
  onUserInteraction: "onUserInteraction",
  always: "always",
} as const;
export type AutovalidateMode =
  (typeof AutovalidateMode)[keyof typeof AutovalidateMode];

/* §1.31 — `InputMode` (TextField, v1.3) */
export const InputMode = {
  text: "text",
  search: "search",
  email: "email",
  tel: "tel",
  url: "url",
  numeric: "numeric",
  decimal: "decimal",
} as const;
export type InputMode = (typeof InputMode)[keyof typeof InputMode];

/* §1.32 — `OverlayPlacement` (Popover / Tooltip, v1.7) */
export const OverlayPlacement = {
  top: "top",
  bottom: "bottom",
  start: "start",
  end: "end",
  center: "center",
} as const;
export type OverlayPlacement =
  (typeof OverlayPlacement)[keyof typeof OverlayPlacement];

/* §1.33 — `OverlayTrigger` (Popover / Tooltip, v1.7) */
export const OverlayTrigger = {
  manual: "manual",
  click: "click",
  hover: "hover",
  focus: "focus",
} as const;
export type OverlayTrigger =
  (typeof OverlayTrigger)[keyof typeof OverlayTrigger];

/* §1.34 — `OverlayDismissReason` (overlay `onOpenChange$`, v1.7) */
export const OverlayDismissReason = {
  escape: "escape",
  backdrop: "backdrop",
  outsidePointer: "outsidePointer",
  programmatic: "programmatic",
} as const;
export type OverlayDismissReason =
  (typeof OverlayDismissReason)[keyof typeof OverlayDismissReason];

/* §97 — `SideSheetPosition` (SideSheet edge alignment, v1.8) */
export const SideSheetPosition = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
} as const;
export type SideSheetPosition =
  (typeof SideSheetPosition)[keyof typeof SideSheetPosition];
