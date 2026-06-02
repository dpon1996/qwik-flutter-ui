/**
 * FD10 — one-time dev warning when widget label and `decoration.label` coexist.
 * @internal
 */

import { useVisibleTask$ } from "@builder.io/qwik";

function hasNonEmptyText(value: string | undefined): boolean {
  return value !== undefined && value !== "";
}

/**
 * Warn in development when both label sources are non-empty (§65 FD10).
 */
export function useWarnDuplicateDecorationLabel(
  widgetLabel: string | undefined,
  decorationLabel: string | undefined,
  componentName: string,
  widgetPropName: string,
): void {
  useVisibleTask$(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    if (
      hasNonEmptyText(widgetLabel) &&
      hasNonEmptyText(decorationLabel)
    ) {
      console.warn(
        `[qwik-flutter-ui] ${componentName}: both \`${widgetPropName}\` and \`decoration.label\` are set; rendering \`decoration.label\` only (FD10).`,
      );
    }
  });
}
