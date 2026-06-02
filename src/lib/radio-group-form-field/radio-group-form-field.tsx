/**
 * `RadioGroupFormField` — `RadioGroup` with validation and shared decoration (§64).
 *
 * - {@link useFormField} — registration, validation, FD3 error merge
 * - `field-decoration` — `<legend>`, helper, error, `aria-describedby` on `<fieldset>`
 * - {@link RadioGroup} — fieldset + child `Radio` options
 */

import {
  $,
  component$,
  Slot,
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
  FieldDecorationLegend,
} from "../internal/field-decoration";
import { useFormField } from "../internal/use-form-field";
import { useWarnDuplicateDecorationLabel } from "../internal/warn-duplicate-decoration-label";
import { RadioGroup } from "../radio-group/radio-group";
import { resolveTextFieldChrome } from "../text-field/resolve-text-field-chrome";
import { useTheme } from "../theme";

import styles from "./radio-group-form-field.module.css";
import type { RadioGroupFormFieldProps } from "./types";

function hasNonEmptyText(value: string | undefined): boolean {
  return value !== undefined && value !== "";
}

export const RadioGroupFormField = component$<RadioGroupFormFieldProps>(
  (props) => {
    const {
      name,
      validator$,
      decoration,
      legend,
      value,
      defaultValue,
      onChange$,
      required = false,
      id,
      class: className,
      style: userStyle,
      ...radioGroupProps
    } = props;

    const generatedId = useId();
    const fieldsetId = id ?? generatedId;

    const internalValue = useSignal<string | undefined>(defaultValue);

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
      legend,
      decoration?.label,
      "RadioGroupFormField",
      "legend",
    );

    const { colorScheme, inputDecorationTheme } = useTheme();

    const chrome = resolveTextFieldChrome(
      { decoration, required, style: userStyle },
      fieldsetId,
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

    const useDecorationLegend = hasNonEmptyText(mergedDecoration?.label);
    const groupLegend = useDecorationLegend ? undefined : legend;

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
        <RadioGroup
          {...radioGroupProps}
          id={fieldsetId}
          name={name}
          legend={groupLegend}
          value={value}
          defaultValue={defaultValue}
          required={required}
          omitLegend={useDecorationLegend}
          legendProvidedViaSlot={useDecorationLegend}
          registerWithForm={false}
          ariaDescribedBy={ariaDescribedBy}
          ariaInvalid={hasError}
          onChange$={handleChange}
        >
          {useDecorationLegend && (
            <FieldDecorationLegend
              q:slot="legend"
              decoration={mergedDecoration}
              legendStyle={chrome.labelStyle}
              requiredMarkStyle={chrome.requiredMarkStyle}
              showRequiredIndicator={mergedDecoration?.required === true}
            />
          )}
          <Slot />
        </RadioGroup>

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
