/**
 * Resolve `Card` defaults from `ColorScheme` (§57 Phase 6).
 */

import type { ColorScheme } from "../theme/types";

/** Theme-derived surface styles before explicit `CardProps` overrides. */
export interface ResolvedCardThemeStyles {
  backgroundColor: string;
  color: string;
  /** Default border when `border` prop is omitted. */
  border: string;
  outlineColor: string;
}

/** `ColorScheme` defaults when decoration props are omitted. */
export function resolveCardThemeStyles(
  colorScheme: ColorScheme,
): ResolvedCardThemeStyles {
  const outlineColor = colorScheme.outline;
  return {
    backgroundColor: colorScheme.surface,
    color: colorScheme.onSurface,
    outlineColor,
    border: `1px solid ${outlineColor}`,
  };
}
