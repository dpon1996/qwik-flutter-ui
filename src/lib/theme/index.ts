/**
 * v1.5 Theming — Phase 1–2: types, context, factory, hook, provider (§57).
 */

export { ThemeProvider } from "./theme-provider";
export { ThemeContext } from "./context";

export { createThemeData, mergeThemeData } from "./create-theme-data";
export { useTheme } from "./use-theme";

export {
  CSS_VAR_COLOR_ERROR,
  CSS_VAR_COLOR_ON_ERROR,
  CSS_VAR_COLOR_ON_PRIMARY,
  CSS_VAR_COLOR_ON_SURFACE,
  CSS_VAR_COLOR_OUTLINE,
  CSS_VAR_COLOR_PRIMARY,
  CSS_VAR_COLOR_SURFACE,
  colorSchemeToCssProperties,
} from "./css-vars";

export type {
  ButtonTheme,
  ColorScheme,
  InputDecorationTheme,
  TextStyle,
  TextTheme,
  ThemeData,
  ThemeProviderProps,
} from "./types";
