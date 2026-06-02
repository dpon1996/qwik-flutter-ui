/**
 * Shared field decoration renderer (§59). Internal only — not exported from package root.
 *
 * Renders label, helper, and error markup for SSR. Does not render controls or
 * set native `required` (FD9).
 */

import { component$, type CSSProperties } from "@builder.io/qwik";

import styles from "./field-decoration.module.css";
import type {
  FieldDecorationErrorProps,
  FieldDecorationHelperProps,
  FieldDecorationLabelProps,
  FieldDecorationLegendProps,
} from "./types";

function hasNonEmptyText(value: string | undefined): boolean {
  return value !== undefined && value !== "";
}

/** Semantic `<legend>` for radio/checkbox groups (§64). */
export const FieldDecorationLegend = component$<FieldDecorationLegendProps>(
  (props) => {
    const {
      decoration,
      legendStyle,
      requiredMarkStyle,
      showRequiredIndicator,
    } = props;
    const label = decoration?.label;

    if (!hasNonEmptyText(label)) {
      return null;
    }

    const showRequiredMark =
      showRequiredIndicator === true || decoration?.required === true;

    return (
      <legend class={styles.legend} style={legendStyle}>
        {label}
        {showRequiredMark && (
          <span
            class={styles.requiredMark}
            style={requiredMarkStyle}
            aria-hidden="true"
          >
            {" "}
            *
          </span>
        )}
      </legend>
    );
  },
);

/** Visible `<label for={controlId}>`. Required `*` when `decoration.required` (visual only). */
export const FieldDecorationLabel = component$<FieldDecorationLabelProps>(
  (props) => {
    const {
      decoration,
      controlId,
      labelStyle,
      requiredMarkStyle,
      showRequiredIndicator,
    } = props;
    const label = decoration?.label;

    if (!hasNonEmptyText(label)) {
      return null;
    }

    const showRequiredMark =
      showRequiredIndicator === true || decoration?.required === true;

    return (
      <label class={styles.label} style={labelStyle} for={controlId}>
        {label}
        {showRequiredMark && (
          <span
            class={styles.requiredMark}
            style={requiredMarkStyle}
            aria-hidden="true"
          >
            {" "}
            *
          </span>
        )}
      </label>
    );
  },
);

/** Helper copy linked via `aria-describedby` on the control. */
export const FieldDecorationHelper = component$<FieldDecorationHelperProps>(
  (props) => {
    const { decoration, helperId, helperStyle } = props;
    const helperText = decoration?.helperText;

    if (!hasNonEmptyText(helperText)) {
      return null;
    }

    return (
      <span id={helperId} class={styles.helper} style={helperStyle}>
        {helperText}
      </span>
    );
  },
);

/** Error message with `role="alert"` and stable `errorId`. */
export const FieldDecorationError = component$<FieldDecorationErrorProps>(
  (props) => {
    const { errorText, errorId, errorStyle } = props;

    if (!hasNonEmptyText(errorText)) {
      return null;
    }

    const style: CSSProperties = errorStyle ?? {};

    return (
      <span id={errorId} class={styles.error} style={style} role="alert">
        {errorText}
      </span>
    );
  },
);
