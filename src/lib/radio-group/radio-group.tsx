/**
 * `RadioGroup` — mutually exclusive radio set via native `<fieldset>`.
 * Flutter pattern: radios sharing `groupValue`. See `docs/API_DESIGN.md` §48.
 *
 * - Sole owner of `value`, `defaultValue`, `onChange$`, `name`, `disabled` (#82).
 * - Controlled: `value` + `onChange$`; uncontrolled: `defaultValue`.
 * - Accessible name via `legend`, `aria-label`, or `aria-labelledby` (SC14).
 * - Registers with `<Form>` → `FormValues[name]: string` (§53).
 */

import {
  $,
  component$,
  Slot,
  useContext,
  useContextProvider,
  useSignal,
  useTask$,
  type CSSProperties,
} from "@builder.io/qwik";

import { FormContext } from "../form/context";

import { RadioGroupContext } from "./context";
import styles from "./radio-group.module.css";
import type { RadioGroupProps } from "./types";

function hasAccessibleName(
  legend: string | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): boolean {
  if (legend !== undefined && legend !== "") return true;
  if (ariaLabel !== undefined && ariaLabel !== "") return true;
  if (ariaLabelledBy !== undefined && ariaLabelledBy !== "") return true;
  return false;
}

export const RadioGroup = component$<RadioGroupProps>((props) => {
  const {
    name,
    value,
    defaultValue,
    onChange$,
    disabled = false,
    required = false,
    legend,
    id,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const ariaLabel =
    typeof rest["aria-label"] === "string" ? rest["aria-label"] : undefined;
  const ariaLabelledBy =
    typeof rest["aria-labelledby"] === "string"
      ? rest["aria-labelledby"]
      : undefined;

  if (import.meta.env.DEV) {
    if (value !== undefined && defaultValue !== undefined) {
      console.warn(
        "[RadioGroup] Do not pass both `value` and `defaultValue`; use controlled or uncontrolled mode.",
      );
    }
    if (!hasAccessibleName(legend, ariaLabel, ariaLabelledBy)) {
      console.warn(
        "[RadioGroup] Accessible name required: provide `legend`, `aria-label`, or `aria-labelledby`.",
      );
    }
  }

  const form = useContext(FormContext, null);
  const internalValue = useSignal<string | undefined>(defaultValue);
  const touched = useSignal(false);
  const requiredRadioValue = useSignal<string | undefined>(
    required && defaultValue !== undefined ? defaultValue : undefined,
  );

  const selectedValue = value !== undefined ? value : internalValue.value;

  const selectValue$ = $((next: string, ev: Event) => {
    if (value === undefined) {
      internalValue.value = next;
    }
    touched.value = true;
    void onChange$?.(next, ev);
    if (form) {
      void form.onFieldInteraction$(name, "input");
    }
  });

  const getValue$ = $((): string =>
    value !== undefined ? (value ?? "") : (internalValue.value ?? ""),
  );
  const setError$ = $((_message: string | undefined) => {});
  const getTouched$ = $((): boolean => touched.value);
  const setTouched$ = $((next: boolean) => {
    touched.value = next;
  });

  useContextProvider(RadioGroupContext, {
    name,
    selectedValue,
    disabled,
    required,
    requiredRadioValue,
    selectValue$,
  });

  useTask$(async ({ cleanup }) => {
    if (!form) return;

    const unregister = await form.registerField$({
      name,
      getValue$,
      setError$,
      getTouched$,
      setTouched$,
    });

    cleanup(unregister);
  });

  const fieldsetClasses = [styles.fieldset, className]
    .filter(Boolean)
    .join(" ");

  const fieldsetStyle: CSSProperties | undefined = userStyle
    ? (userStyle as CSSProperties)
    : undefined;

  return (
    <fieldset
      {...rest}
      id={id}
      class={fieldsetClasses}
      style={fieldsetStyle}
      disabled={disabled || undefined}
    >
      {legend !== undefined && legend !== "" && (
        <legend class={styles.legend}>{legend}</legend>
      )}
      <Slot />
    </fieldset>
  );
});
