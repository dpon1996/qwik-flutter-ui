/**
 * v1.5 Theming — `ThemeProvider`, `useTheme`, `createThemeData`.
 */

export { ThemeProvider } from "./theme-provider";
export type { ThemeProviderProps } from "./types";

export { createThemeData } from "./create-theme-data";
export { useTheme } from "./use-theme";

export { ThemeContext } from "./context";

export {
  CSS_VAR_COLOR_ERROR,
  CSS_VAR_COLOR_ON_ERROR,
  CSS_VAR_COLOR_ON_PRIMARY,
  CSS_VAR_COLOR_ON_SURFACE,
  CSS_VAR_COLOR_OUTLINE,
  CSS_VAR_COLOR_PRIMARY,
  CSS_VAR_COLOR_SURFACE,
  THEME_COLOR,
  colorSchemeToCssProperties,
} from "./css-vars";

export { DEFAULT_COLOR_SCHEME, DEFAULT_THEME_DATA } from "./defaults";
export { mergeThemeData } from "./merge";
