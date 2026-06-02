/**
 * v1.5 theming — shared types. See `docs/API_DESIGN.md` §57.
 */

import type {
  BorderRadius,
  EdgeInsets,
  FontWeight,
  Length,
} from "../_shared";

/** Semantic color roles (seven required in v1.5). */
export interface ColorScheme {
  primary: string;
  onPrimary: string;
  surface: string;
  onSurface: string;
  error: string;
  onError: string;
  outline: string;
}

/** Typography token; aligns with flat `TextProps` (§14). */
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

/** Bundle of visual defaults. Flutter `ThemeData` subset. */
export interface ThemeData {
  colorScheme: ColorScheme;
  textTheme?: TextTheme;
  buttonTheme?: ButtonTheme;
  inputDecorationTheme?: InputDecorationTheme;
}
