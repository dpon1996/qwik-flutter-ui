/**
 * `TextFormField` — `TextField` with optional `Form` integration and `validator$`.
 * Flutter equivalent of `TextFormField`. See `docs/API_DESIGN.md` §30, §61.
 *
 * Architecture:
 * - {@link useFormField} — registration, validation, error merge (FD3)
 * - `field-decoration` — label, helper, error, `aria-describedby`
 * - {@link TextField} — control chrome only (`decorationChrome={false}`)
 */

import {
  $,
  component$,
  useId,
  useSignal,
  useVisibleTask$,
  type QRL,
} from "@builder.io/qwik";

import type { FormFieldValue } from "../_shared";
import {
  buildAriaDescribedBy,
  FieldDecorationError,
  FieldDecorationHelper,
  FieldDecorationLabel,
} from "../internal/field-decoration";
import { useFormField } from "../internal/use-form-field";
import { pickControlDecoration } from "../text-field/pick-control-decoration";
import { resolveTextFieldChrome } from "../text-field/resolve-text-field-chrome";
import { TextField } from "../text-field/text-field";
import styles from "../text-field/text-field.module.css";
import { useTheme } from "../theme";

import type { TextFormFieldProps } from "./types";

export const TextFormField = component$<TextFormFieldProps>((props) => {
  const {
    name,
    validator$,
    decoration,
    value,
    defaultValue,
    onInput$,
    required = false,
    id,
    class: className,
    ...textFieldProps
  } = props;

  const generatedId = useId();
  const inputId = id ?? generatedId;

  const currentValue = useSignal(value ?? defaultValue ?? "");

  useVisibleTask$(({ track }) => {
    track(() => value);
    if (value !== undefined) {
      currentValue.value = value;
    }
  });

  const getValue$ = $((): string => currentValue.value);

  const {
    displayError,
    mergedDecoration,
    notifyInteraction$,
  } = useFormField({
    name,
    validator$: validator$ as
      | QRL<(value: FormFieldValue) => string | undefined>
      | undefined,
    decoration,
    getValue$,
  });

  const { colorScheme, inputDecorationTheme } = useTheme();

  const chrome = resolveTextFieldChrome(
    {
      ...textFieldProps,
      decoration,
      required,
      style: textFieldProps.style,
    },
    inputId,
    colorScheme,
    inputDecorationTheme,
  );

  const hasError = Boolean(displayError);
  const ariaDescribedBy = buildAriaDescribedBy(
    mergedDecoration,
    chrome.helperId,
    chrome.errorId,
    hasError,
  );

  const controlDecoration = pickControlDecoration(decoration);

  const handleInput = $((val: string, ev: InputEvent) => {
    currentValue.value = val;
    void onInput$?.(val, ev);
    void notifyInteraction$(val, "input");
  });

  const rootClasses = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div class={rootClasses} style={chrome.rootStyle}>
      <FieldDecorationLabel
        decoration={mergedDecoration}
        controlId={inputId}
        labelStyle={chrome.labelStyle}
        requiredMarkStyle={chrome.requiredMarkStyle}
        showRequiredIndicator={mergedDecoration?.required === true}
      />

      <TextField
        {...textFieldProps}
        id={inputId}
        name={name}
        required={required}
        decoration={controlDecoration}
        decorationChrome={false}
        ariaDescribedBy={ariaDescribedBy}
        invalid={hasError}
        value={value}
        defaultValue={defaultValue}
        onInput$={handleInput}
      />

      <FieldDecorationHelper
        decoration={mergedDecoration}
        helperId={chrome.helperId}
        helperStyle={chrome.helperStyle}
      />

      <FieldDecorationError
        errorText={displayError}
        errorId={chrome.errorId}
        errorStyle={chrome.errorStyle}
      />
    </div>
  );
});
