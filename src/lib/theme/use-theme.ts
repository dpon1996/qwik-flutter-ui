/**
 * `useTheme` — read merged theme from nearest `ThemeProvider` (§57).
 * Flutter `Theme.of(context)` → `useTheme()`.
 *
 * Reads merged theme from nearest `<ThemeProvider>`.
 */

import { useContext } from "@builder.io/qwik";

import { createThemeData } from "./create-theme-data";
import { ThemeContext } from "./context";
import type { ThemeData } from "./types";

/** Sentinel for missing provider — Qwik requires a default to avoid throwing. */
const NO_THEME_PROVIDER = null;

let warnedOutsideProvider = false;

/**
 * Returns merged `ThemeData` from the nearest `<ThemeProvider>`.
 * Outside a provider: `createThemeData()` + dev warning (§57; same pattern as §27 M6).
 *
 * Uses `useContext(ThemeContext, null)` so Qwik does not throw when no provider exists.
 */
export function useTheme(): ThemeData {
  const ctx = useContext(ThemeContext, NO_THEME_PROVIDER);

  if (ctx !== NO_THEME_PROVIDER) {
    return ctx;
  }

  if (import.meta.env.DEV && !warnedOutsideProvider) {
    warnedOutsideProvider = true;
    console.warn(
      "[useTheme] No ancestor <ThemeProvider>; using createThemeData() defaults. " +
        "Wrap your app with <ThemeProvider theme={{}}>.",
    );
  }

  return createThemeData();
}
