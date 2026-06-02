/**
 * `createThemeData` — library theme factory (§57, Decision T5).
 */

import type { ThemeData } from "../_shared";

import { DEFAULT_THEME_DATA } from "./defaults";
import { mergeThemeData } from "./merge";

/**
 * Returns a complete `ThemeData` with default `colorScheme` (including `outline`).
 * Optional `partial` is deep-merged over the baseline.
 */
export function createThemeData(partial?: Partial<ThemeData>): ThemeData {
  return mergeThemeData(DEFAULT_THEME_DATA, partial);
}
