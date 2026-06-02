/**
 * `ThemeProvider` prop types. See `docs/API_DESIGN.md` §57.
 */

import type { BaseProps, ContainerTag, ThemeData } from "../_shared";

export interface ThemeProviderProps extends BaseProps {
  /** Required partial overrides (use `theme={{}}` for library defaults). */
  theme: Partial<ThemeData>;
  /** When `true` (default), deep-merge over ancestor theme; when `false`, reset to `createThemeData()` baseline. */
  inherit?: boolean;
  /** Semantic wrapper tag. Default `"div"`. Reuses `ContainerTag` (Decision T3). */
  as?: ContainerTag;
}
