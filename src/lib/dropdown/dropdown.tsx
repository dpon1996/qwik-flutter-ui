/**
 * `Dropdown` — single-choice list via native `<select>`.
 * Flutter equivalent of `DropdownButton`. See `docs/API_DESIGN.md` §50.
 *
 * - Controlled: `value` + `onChange$`; uncontrolled: `defaultValue`.
 * - `placeholder` → `<option value="" disabled hidden>` (never satisfies `required`).
 * - Registers with `<Form>` when `name` is set (`FormValues` → string, §53).
 */

import {
  $,
  component$,
  useContext,
  useId,
  useSignal,
  useTask$,
  type CSSProperties,
} from "@builder.io/qwik";

import { FormContext } from "../form/context";

import styles from "./dropdown.module.css";
import type { DropdownProps } from "./types";

export const Dropdown = component$<DropdownProps>((props) => {
  const {
    options,
    value,
    defaultValue,
    onChange$,
    disabled = false,
    required = false,
    name,
    placeholder,
    label,
    omitLabel = false,
    decorationChrome = true,
    registerWithForm = true,
    ariaDescribedBy,
    ariaInvalid,
    invalid = false,
    id,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  if (import.meta.env.DEV && value !== undefined && defaultValue !== undefined) {
    console.warn(
      "[Dropdown] Do not pass both `value` and `defaultValue`; use controlled or uncontrolled mode.",
    );
  }

  const generatedId = useId();
  const selectId = id ?? generatedId;
  const form = useContext(FormContext, null);

  const internalValue = useSignal<string | undefined>(
    defaultValue !== undefined
      ? defaultValue
      : value === undefined && placeholder !== undefined
        ? ""
        : undefined,
  );
  const touched = useSignal(false);

  const getValue$ = $((): string =>
    value !== undefined ? (value ?? "") : (internalValue.value ?? ""),
  );
  const setError$ = $((_message: string | undefined) => {});
  const getTouched$ = $((): boolean => touched.value);
  const setTouched$ = $((next: boolean) => {
    touched.value = next;
  });

  useTask$(async ({ cleanup }) => {
    if (!registerWithForm || !form || !name) return;

    const unregister = await form.registerField$({
      name,
      getValue$,
      setError$,
      getTouched$,
      setTouched$,
    });

    cleanup(unregister);
  });

  const selectBinding =
    value !== undefined
      ? { value }
      : defaultValue !== undefined
        ? { defaultValue }
        : placeholder !== undefined || internalValue.value !== undefined
          ? { value: internalValue.value ?? "" }
          : {};

  const rootClasses = [styles.root, className].filter(Boolean).join(" ");

  const rootStyle: CSSProperties | undefined = userStyle
    ? (userStyle as CSSProperties)
    : undefined;

  const fieldRowClasses = [
    styles.fieldRow,
    disabled ? styles.fieldRowDisabled : undefined,
    invalid ? styles.fieldRowInvalid : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = $((ev: Event) => {
    const select = ev.target as HTMLSelectElement;
    const next = select.value;

    if (value === undefined) {
      internalValue.value = next;
    }

    touched.value = true;
    void onChange$?.(next, ev);

    if (registerWithForm && form && name) {
      void form.onFieldInteraction$(name, "input");
    }
  });

  const showPlaceholder =
    placeholder !== undefined && placeholder !== "";

  const selectControl = (
    <select
      {...rest}
      {...selectBinding}
      id={selectId}
      name={name}
      class={styles.select}
      disabled={disabled || undefined}
      required={required || undefined}
      aria-describedby={ariaDescribedBy || undefined}
      aria-invalid={ariaInvalid ? true : undefined}
      onChange$={handleChange}
    >
      {showPlaceholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled || undefined}
        >
          {option.label}
        </option>
      ))}
    </select>
  );

  const fieldRow = (
    <div class={fieldRowClasses}>{selectControl}</div>
  );

  if (!decorationChrome) {
    return fieldRow;
  }

  return (
    <div class={rootClasses} style={rootStyle}>
      {!omitLabel && label !== undefined && label !== "" && (
        <label class={styles.label} for={selectId}>
          {label}
          {required && (
            <span class={styles.requiredMark} aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}

      {fieldRow}
    </div>
  );
});
