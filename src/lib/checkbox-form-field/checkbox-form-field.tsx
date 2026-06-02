/**
 * `CheckboxFormField` — `Checkbox` with validation and shared decoration (§62).
 *
 * - {@link useFormField} — registration, validation, FD3 error merge
 * - `field-decoration` — label, helper, error, `aria-describedby`
 * - {@link Checkbox} — control only when `decoration.label` is set (FD10)
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
import { useWarnDuplicateDecorationLabel } from "../internal/warn-duplicate-decoration-label";
import { Checkbox } from "../checkbox/checkbox";
import { resolveTextFieldChrome } from "../text-field/resolve-text-field-chrome";
import { useTheme } from "../theme";

import styles from "./checkbox-form-field.module.css";
import type { CheckboxFormFieldProps } from "./types";

function hasNonEmptyText(value: string | undefined): boolean {
  return value !== undefined && value !== "";
}

export const CheckboxFormField = component$<CheckboxFormFieldProps>(
  (props) => {
    const {
      name,
      validator$,
      decoration,
      label,
      checked,
      defaultChecked,
      onChange$,
      required = false,
      id,
      class: className,
      style: userStyle,
      ...checkboxProps
    } = props;

    const generatedId = useId();
    const inputId = id ?? generatedId;

    const internalChecked = useSignal(defaultChecked ?? false);

    useVisibleTask$(({ track }) => {
      track(() => checked);
      if (checked !== undefined) {
        internalChecked.value = checked;
      }
    });

    const getValue$ = $((): boolean =>
      checked !== undefined ? checked : internalChecked.value,
    );

    const { displayError, mergedDecoration, notifyInteraction$ } =
      useFormField({
        name,
        validator$: validator$ as
          | QRL<(value: FormFieldValue) => string | undefined>
          | undefined,
        decoration,
        getValue$,
      });

    useWarnDuplicateDecorationLabel(
      label,
      decoration?.label,
      "CheckboxFormField",
      "label",
    );

    const { colorScheme, inputDecorationTheme } = useTheme();

    const chrome = resolveTextFieldChrome(
      { decoration, required, style: userStyle },
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

    const useDecorationLabel = hasNonEmptyText(mergedDecoration?.label);
    const checkboxLabel = useDecorationLabel ? undefined : label;

    const handleChange = $((next: boolean, ev: Event) => {
      if (checked === undefined) {
        internalChecked.value = next;
      }
      void onChange$?.(next, ev);
      void notifyInteraction$(next, "input");
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

        <Checkbox
          {...checkboxProps}
          id={inputId}
          name={name}
          label={checkboxLabel}
          checked={checked}
          defaultChecked={defaultChecked}
          required={required}
          omitLabel={useDecorationLabel}
          registerWithForm={false}
          ariaDescribedBy={ariaDescribedBy}
          ariaInvalid={hasError}
          onChange$={handleChange}
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
  },
);
