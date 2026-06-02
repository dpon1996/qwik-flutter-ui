/**
 * Library default theme baseline for `createThemeData()` (§57, Decision T5).
 */

import type { ColorScheme, ThemeData } from "../_shared";

/** WCAG-oriented Material-style defaults; pure (no DOM reads). */
export const DEFAULT_COLOR_SCHEME: ColorScheme = {
  primary: "#1976d2",
  onPrimary: "#ffffff",
  surface: "#ffffff",
  onSurface: "#212121",
  error: "#c62828",
  onError: "#ffffff",
  outline: "#e0e0e0",
};

export const DEFAULT_THEME_DATA: ThemeData = {
  colorScheme: DEFAULT_COLOR_SCHEME,
};
