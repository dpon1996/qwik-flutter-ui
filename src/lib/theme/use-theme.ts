/**
 * `useTheme` — read merged theme from nearest `ThemeProvider` (§57).
 * Flutter `Theme.of(context)` → `useTheme()`.
 */

import { useContext } from "@builder.io/qwik";

import type { ThemeData } from "../_shared";

import { createThemeData } from "./create-theme-data";
import { ThemeContext } from "./context";

let warnedOutsideProvider = false;

/**
 * Returns merged `ThemeData` from the nearest `<ThemeProvider>`.
 * Outside a provider: `createThemeData()` + dev warning (§57; same pattern as §27 M6).
 *
 * Fallback supplies programmatic values only — CSS variables are not injected
 * without an ancestor `<ThemeProvider>`.
 */
export function useTheme(): ThemeData {
  const ctx = useContext(ThemeContext);
  if (ctx) {
    return ctx;
  }

  if (import.meta.env.DEV && !warnedOutsideProvider) {
    warnedOutsideProvider = true;
    console.warn(
      "[useTheme] No ancestor <ThemeProvider>; using createThemeData() defaults. " +
        "Wrap your app (or subtree) with <ThemeProvider theme={{}}> for CSS variables.",
    );
  }

  return createThemeData();
}
