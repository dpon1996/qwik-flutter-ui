/**
 * `DropdownFormField` — `Dropdown` with validation and shared decoration (§63).
 *
 * - {@link useFormField} — registration, validation, FD3 error merge
 * - `field-decoration` — label, helper, error, `aria-describedby`
 * - {@link Dropdown} — control + `placeholder` (FD5: `label` retained on widget)
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
import { Dropdown } from "../dropdown/dropdown";
import {
  buildAriaDescribedBy,
  FieldDecorationError,
  FieldDecorationHelper,
  FieldDecorationLabel,
} from "../internal/field-decoration";
import { useFormField } from "../internal/use-form-field";
import { useWarnDuplicateDecorationLabel } from "../internal/warn-duplicate-decoration-label";
import { resolveTextFieldChrome } from "../text-field/resolve-text-field-chrome";
import { useTheme } from "../theme";

import styles from "./dropdown-form-field.module.css";
import type { DropdownFormFieldProps } from "./types";

function hasNonEmptyText(value: string | undefined): boolean {
  return value !== undefined && value !== "";
}

export const DropdownFormField = component$<DropdownFormFieldProps>(
  (props) => {
    const {
      name,
      validator$,
      decoration,
      label,
      value,
      defaultValue,
      onChange$,
      required = false,
      id,
      class: className,
      style: userStyle,
      ...dropdownProps
    } = props;

    const generatedId = useId();
    const selectId = id ?? generatedId;

    const internalValue = useSignal<string | undefined>(
      defaultValue !== undefined
        ? defaultValue
        : value === undefined && dropdownProps.placeholder !== undefined
          ? ""
          : undefined,
    );

    useVisibleTask$(({ track }) => {
      track(() => value);
      if (value !== undefined) {
        internalValue.value = value;
      }
    });

    const getValue$ = $((): string =>
      value !== undefined ? (value ?? "") : (internalValue.value ?? ""),
    );

    const { displayError, mergedDecoration, notifyInteraction$ } = useFormField({
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
      "DropdownFormField",
      "label",
    );

    const { colorScheme, inputDecorationTheme } = useTheme();

    const chrome = resolveTextFieldChrome(
      { decoration, required, style: userStyle },
      selectId,
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
    const dropdownLabel = useDecorationLabel ? undefined : label;

    const handleChange = $((next: string, ev: Event) => {
      if (value === undefined) {
        internalValue.value = next;
      }
      void onChange$?.(next, ev);
      void notifyInteraction$(next, "input");
    });

    const rootClasses = [styles.root, className].filter(Boolean).join(" ");

    return (
      <div class={rootClasses} style={chrome.rootStyle}>
        <FieldDecorationLabel
          decoration={mergedDecoration}
          controlId={selectId}
          labelStyle={chrome.labelStyle}
          requiredMarkStyle={chrome.requiredMarkStyle}
          showRequiredIndicator={mergedDecoration?.required === true}
        />

        <Dropdown
          {...dropdownProps}
          id={selectId}
          name={name}
          label={dropdownLabel}
          value={value}
          defaultValue={defaultValue}
          required={required}
          omitLabel={useDecorationLabel}
          decorationChrome={false}
          registerWithForm={false}
          ariaDescribedBy={ariaDescribedBy}
          ariaInvalid={hasError}
          invalid={hasError}
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
