/**
 * Internal field-decoration types (§59). Not part of the public API.
 */

import type { CSSProperties } from "@builder.io/qwik";

import type { FieldDecoration } from "../../_shared";

/** Stable ids for a single form control and its decoration nodes. */
export interface FieldDecorationControlMeta {
  controlId: string;
  helperId: string;
  errorId: string;
  /** When true, `errorId` is included in `aria-describedby`. */
  hasError: boolean;
}

export interface FieldDecorationLegendProps {
  decoration?: FieldDecoration;
  legendStyle?: CSSProperties;
  requiredMarkStyle?: CSSProperties;
  /** Visual `*` when `decoration.required` (FD9). */
  showRequiredIndicator?: boolean;
}

export interface FieldDecorationLabelProps {
  decoration?: FieldDecoration;
  controlId: string;
  labelStyle?: CSSProperties;
  requiredMarkStyle?: CSSProperties;
  /**
   * When `true`, shows the required `*` (e.g. `TextField.required`).
   * `decoration.required` alone is visual-only (FD9).
   */
  showRequiredIndicator?: boolean;
}

export interface FieldDecorationHelperProps {
  decoration?: FieldDecoration;
  helperId: string;
  helperStyle?: CSSProperties;
}

export interface FieldDecorationErrorProps {
  /** Error message to display (may come from validator merge, not only decoration). */
  errorText?: string;
  errorId: string;
  errorStyle?: CSSProperties;
}

function hasNonEmptyText(value: string | undefined): boolean {
  return value !== undefined && value !== "";
}

/**
 * Space-separated id list for `aria-describedby`, or `undefined` when empty.
 * Order: helper, then error (deterministic for SSR).
 */
export function buildAriaDescribedBy(
  decoration: FieldDecoration | undefined,
  helperId: string,
  errorId: string,
  hasError: boolean,
): string | undefined {
  const ids = [
    hasNonEmptyText(decoration?.helperText) ? helperId : undefined,
    hasError ? errorId : undefined,
  ].filter((id): id is string => id !== undefined);

  return ids.length > 0 ? ids.join(" ") : undefined;
}
