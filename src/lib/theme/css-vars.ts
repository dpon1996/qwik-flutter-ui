/**
 * `ColorScheme` → CSS custom properties (§57, Decision T6).
 */

import type { CSSProperties } from "@builder.io/qwik";

import type { ColorScheme } from "./types";

export const CSS_VAR_COLOR_PRIMARY = "--qfu-color-primary";
export const CSS_VAR_COLOR_ON_PRIMARY = "--qfu-color-on-primary";
export const CSS_VAR_COLOR_SURFACE = "--qfu-color-surface";
export const CSS_VAR_COLOR_ON_SURFACE = "--qfu-color-on-surface";
export const CSS_VAR_COLOR_ERROR = "--qfu-color-error";
export const CSS_VAR_COLOR_ON_ERROR = "--qfu-color-on-error";
export const CSS_VAR_COLOR_OUTLINE = "--qfu-color-outline";

/** Map merged `colorScheme` to inline custom properties for `ThemeProvider`. */
export function colorSchemeToCssProperties(
  scheme: ColorScheme,
): CSSProperties {
  return {
    [CSS_VAR_COLOR_PRIMARY]: scheme.primary,
    [CSS_VAR_COLOR_ON_PRIMARY]: scheme.onPrimary,
    [CSS_VAR_COLOR_SURFACE]: scheme.surface,
    [CSS_VAR_COLOR_ON_SURFACE]: scheme.onSurface,
    [CSS_VAR_COLOR_ERROR]: scheme.error,
    [CSS_VAR_COLOR_ON_ERROR]: scheme.onError,
    [CSS_VAR_COLOR_OUTLINE]: scheme.outline,
  } as CSSProperties;
}
