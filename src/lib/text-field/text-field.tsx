/**
 * `TextField` — single-line or multiline text entry.
 * Flutter equivalent of `TextField`. See `docs/API_DESIGN.md` §29.
 *
 * Implementation notes:
 *  - `maxLines === 1` (default) → native `<input>`; `maxLines > 1` → `<textarea>`.
 *  - Stable ids via `useId()` when `id` is omitted (§36).
 *  - `InputType` enum values map 1:1 to HTML `type` (e.g. `datetimeLocal` → `datetime-local`).
 *  - Error text uses `role="alert"` when `decoration.errorText` is set (F8).
 *  - Controlled `value` or `defaultValue` only — never both on the native element.
 *  - `useTheme().inputDecorationTheme` supplies decoration defaults when style
 *    props are omitted (§57); explicit props override theme (§0.6).
 *  - Outline / focus / placeholder use CSS variables on `.root` for SSR.
 */

import { $, component$, useId, type CSSProperties } from "@builder.io/qwik";

import { InputMode, InputType } from "../_shared";
import { toBorderRadiusString, toEdgeInsetsString } from "../_shared/internal";
import { useTheme } from "../theme";

import {
  resolvedStylesToCssVars,
  resolveInputDecorationStyles,
} from "./resolve-input-decoration-theme";
import styles from "./text-field.module.css";
import type { TextFieldProps } from "./types";

/** Default `inputmode` from `type` when `inputMode` prop is omitted (§29). */
function deriveInputMode(type: InputType): InputMode | undefined {
  switch (type) {
    case InputType.email:
      return InputMode.email;
    case InputType.tel:
      return InputMode.tel;
    case InputType.url:
      return InputMode.url;
    case InputType.search:
      return InputMode.search;
    case InputType.number:
      return InputMode.numeric;
    default:
      return undefined;
  }
}

/** Map `minLines` / `maxLines` to native `rows` (not a public prop). */
function deriveTextareaRows(
  maxLines: number,
  minLines?: number,
): number {
  if (maxLines > 1) return maxLines;
  if (minLines !== undefined && minLines > 0) return minLines;
  return 2;
}

export const TextField = component$<TextFieldProps>((props) => {
  const {
    decoration,
    labelColor,
    helperColor,
    errorColor,
    placeholderColor,
    outlineColor,
    focusOutlineColor,
    borderRadius,
    padding,
    requiredIndicatorColor,
    name,
    value,
    defaultValue,
    onInput$,
    type = InputType.text,
    inputMode,
    disabled = false,
    readOnly = false,
    required = false,
    autoFocus = false,
    maxLength,
    minLength,
    maxLines = 1,
    minLines,
    autoComplete,
    id,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const errorText = decoration?.errorText;
  const hasError = Boolean(errorText);
  const isRequired = required || Boolean(decoration?.required);
  const isMultiline = maxLines > 1;

  const describedByIds = [
    decoration?.helperText ? helperId : undefined,
    hasError ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedInputMode = inputMode ?? deriveInputMode(type);

  const valueProps =
    value !== undefined
      ? { value }
      : defaultValue !== undefined
        ? { defaultValue }
        : {};

  const fieldRowClasses = [
    styles.fieldRow,
    disabled ? styles.fieldRowDisabled : undefined,
    hasError ? styles.fieldRowInvalid : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const controlClasses = [
    styles.control,
    isMultiline ? styles.textarea : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const rootClasses = [styles.root, className].filter(Boolean).join(" ");

  const { colorScheme, inputDecorationTheme } = useTheme();
  const resolved = resolveInputDecorationStyles(
    {
      labelColor,
      helperColor,
      errorColor,
      placeholderColor,
      outlineColor,
      focusOutlineColor,
      borderRadius,
      padding,
      requiredIndicatorColor,
    },
    inputDecorationTheme,
    colorScheme,
  );

  const rootStyle: CSSProperties = {
    ...resolvedStylesToCssVars(resolved),
    ...(userStyle as CSSProperties | undefined),
  };

  const labelStyle: CSSProperties | undefined =
    resolved.labelColor !== undefined ? { color: resolved.labelColor } : undefined;

  const helperStyle: CSSProperties | undefined =
    resolved.helperColor !== undefined ? { color: resolved.helperColor } : undefined;

  const errorStyle: CSSProperties = { color: resolved.errorColor };

  const requiredMarkStyle: CSSProperties | undefined =
    resolved.requiredIndicatorColor !== undefined
      ? { color: resolved.requiredIndicatorColor }
      : undefined;

  const fieldRowStyle: CSSProperties = {};
  if (resolved.borderRadius !== undefined) {
    fieldRowStyle.borderRadius = toBorderRadiusString(resolved.borderRadius);
  }

  const controlStyle: CSSProperties = {};
  if (resolved.padding !== undefined) {
    controlStyle.padding = toEdgeInsetsString(resolved.padding);
  }

  const handleInput = onInput$
    ? $((ev: InputEvent) => {
        const target = ev.target as HTMLInputElement | HTMLTextAreaElement;
        onInput$?.(target.value, ev);
      })
    : undefined;

  const sharedControlProps = {
    id: inputId,
    name,
    class: controlClasses,
    style: Object.keys(controlStyle).length > 0 ? controlStyle : undefined,
    disabled,
    readOnly,
    required: isRequired || undefined,
    autoFocus: autoFocus || undefined,
    maxLength,
    minLength,
    autoComplete,
    placeholder: decoration?.placeholder,
    "aria-invalid": hasError ? true : undefined,
    "aria-required": isRequired ? true : undefined,
    "aria-describedby": describedByIds || undefined,
    ...(resolvedInputMode !== undefined
      ? { inputMode: resolvedInputMode }
      : {}),
    ...valueProps,
    ...rest,
    ...(handleInput !== undefined ? { onInput$: handleInput } : {}),
  };

  return (
    <div class={rootClasses} style={rootStyle}>
      {decoration?.label !== undefined && decoration.label !== "" && (
        <label class={styles.label} style={labelStyle} for={inputId}>
          {decoration.label}
          {isRequired && (
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
      )}

      <div
        class={fieldRowClasses}
        style={Object.keys(fieldRowStyle).length > 0 ? fieldRowStyle : undefined}
      >
        {decoration?.prefix !== undefined && decoration.prefix !== "" && (
          <span class={styles.prefix}>{decoration.prefix}</span>
        )}

        {isMultiline ? (
          <textarea
            {...sharedControlProps}
            rows={deriveTextareaRows(maxLines, minLines)}
          />
        ) : (
          <input {...sharedControlProps} type={type} />
        )}

        {decoration?.suffix !== undefined && decoration.suffix !== "" && (
          <span class={styles.suffix}>{decoration.suffix}</span>
        )}
      </div>

      {decoration?.helperText !== undefined && decoration.helperText !== "" && (
        <span id={helperId} class={styles.helper} style={helperStyle}>
          {decoration.helperText}
        </span>
      )}

      {hasError && (
        <span id={errorId} class={styles.error} style={errorStyle} role="alert">
          {errorText}
        </span>
      )}
    </div>
  );
});
