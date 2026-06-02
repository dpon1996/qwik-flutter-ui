/**
 * Resolve `Button` defaults from `ButtonTheme` + `ColorScheme` (§57 Phase 4).
 */

import {
  ButtonVariant,
  type BorderRadius,
  type EdgeInsets,
} from "../_shared";
import type { ButtonTheme, ColorScheme } from "../theme/types";

/** Theme-derived decoration before explicit `ButtonProps` overrides. */
export interface ResolvedButtonThemeStyles {
  color?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: BorderRadius;
  padding?: EdgeInsets;
}

/**
 * Per-variant `ColorScheme` fallbacks when `ButtonTheme` fields are omitted.
 * Explicit props still win in `button.tsx` (§0.6).
 */
export function resolveButtonThemeStyles(
  variant: ButtonVariant,
  colorScheme: ColorScheme,
  buttonTheme?: ButtonTheme,
): ResolvedButtonThemeStyles {
  const result: ResolvedButtonThemeStyles = {};

  if (buttonTheme?.padding !== undefined) {
    result.padding = buttonTheme.padding;
  }
  if (buttonTheme?.borderRadius !== undefined) {
    result.borderRadius = buttonTheme.borderRadius;
  }

  const foreground = buttonTheme?.foregroundColor;
  const background = buttonTheme?.backgroundColor;
  const borderColor = buttonTheme?.borderColor;

  switch (variant) {
    case ButtonVariant.filled:
    case ButtonVariant.elevated:
      result.color = foreground ?? colorScheme.onPrimary;
      result.backgroundColor = background ?? colorScheme.primary;
      break;
    case ButtonVariant.outlined:
      result.color = foreground ?? colorScheme.primary;
      result.backgroundColor = background ?? "transparent";
      result.border = `1px solid ${borderColor ?? colorScheme.outline}`;
      break;
    case ButtonVariant.text:
      result.color = foreground ?? colorScheme.primary;
      if (background !== undefined) {
        result.backgroundColor = background;
      }
      break;
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }

  return result;
}
