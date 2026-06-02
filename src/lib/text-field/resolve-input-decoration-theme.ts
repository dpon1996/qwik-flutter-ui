/**
 * Resolve `TextField` decoration styles from props + `InputDecorationTheme` (§57 Phase 5).
 */

import type { BorderRadius, EdgeInsets } from "../_shared";
import type { ColorScheme, InputDecorationTheme } from "../theme/types";

import type { TextFieldDecorationStyleProps } from "./types";

/** Resolved decoration styles before applying to DOM. */
export interface ResolvedInputDecorationStyles {
  labelColor?: string;
  helperColor?: string;
  errorColor: string;
  placeholderColor?: string;
  outlineColor?: string;
  focusOutlineColor?: string;
  borderRadius?: BorderRadius;
  padding?: EdgeInsets;
  requiredIndicatorColor?: string;
}

function pickColor(
  prop: string | undefined,
  theme: string | undefined,
): string | undefined {
  return prop ?? theme;
}

/**
 * Explicit prop → `inputDecorationTheme` → built-in default (CSS).
 * `errorColor` always includes `colorScheme.error` as final fallback.
 */
export function resolveInputDecorationStyles(
  props: TextFieldDecorationStyleProps,
  inputDecorationTheme: InputDecorationTheme | undefined,
  colorScheme: ColorScheme,
): ResolvedInputDecorationStyles {
  const result: ResolvedInputDecorationStyles = {
    errorColor:
      props.errorColor ??
      inputDecorationTheme?.errorColor ??
      colorScheme.error,
  };

  const labelColor = pickColor(props.labelColor, inputDecorationTheme?.labelColor);
  if (labelColor !== undefined) result.labelColor = labelColor;

  const helperColor = pickColor(
    props.helperColor,
    inputDecorationTheme?.helperColor,
  );
  if (helperColor !== undefined) result.helperColor = helperColor;

  const placeholderColor = pickColor(
    props.placeholderColor,
    inputDecorationTheme?.placeholderColor,
  );
  if (placeholderColor !== undefined) result.placeholderColor = placeholderColor;

  const outlineColor = pickColor(
    props.outlineColor,
    inputDecorationTheme?.outlineColor,
  );
  if (outlineColor !== undefined) result.outlineColor = outlineColor;

  const focusOutlineColor = pickColor(
    props.focusOutlineColor,
    inputDecorationTheme?.focusOutlineColor,
  );
  if (focusOutlineColor !== undefined) {
    result.focusOutlineColor = focusOutlineColor;
  }

  const borderRadius = props.borderRadius ?? inputDecorationTheme?.borderRadius;
  if (borderRadius !== undefined) result.borderRadius = borderRadius;

  const padding = props.padding ?? inputDecorationTheme?.padding;
  if (padding !== undefined) result.padding = padding;

  const requiredIndicatorColor = pickColor(
    props.requiredIndicatorColor,
    inputDecorationTheme?.requiredIndicatorColor,
  );
  if (requiredIndicatorColor !== undefined) {
    result.requiredIndicatorColor = requiredIndicatorColor;
  }

  return result;
}

/** CSS custom properties for outline / focus / placeholder (SSR-safe). */
export function resolvedStylesToCssVars(
  resolved: ResolvedInputDecorationStyles,
): Record<string, string> {
  const vars: Record<string, string> = {};

  if (resolved.outlineColor !== undefined) {
    vars["--qfu-input-outline-color"] = resolved.outlineColor;
  }
  if (resolved.focusOutlineColor !== undefined) {
    vars["--qfu-input-focus-outline-color"] = resolved.focusOutlineColor;
  }
  if (resolved.placeholderColor !== undefined) {
    vars["--qfu-input-placeholder-color"] = resolved.placeholderColor;
  }
  vars["--qfu-input-error-color"] = resolved.errorColor;

  return vars;
}
