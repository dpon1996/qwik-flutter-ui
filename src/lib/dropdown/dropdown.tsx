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
  useVisibleTask$,
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

  useVisibleTask$(async ({ cleanup }) => {
    if (!form || !name) return;

    const unregister = await form.registerField$({
      name,
      getValue: () =>
        value !== undefined ? (value ?? "") : (internalValue.value ?? ""),
      setError: () => {},
      getTouched: () => touched.value,
      setTouched: (next) => {
        touched.value = next;
      },
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

    if (form && name) {
      void form.onFieldInteraction$(name, "input");
    }
  });

  const showPlaceholder =
    placeholder !== undefined && placeholder !== "";

  return (
    <div class={rootClasses} style={rootStyle}>
      {label !== undefined && label !== "" && (
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

      <div class={fieldRowClasses}>
        <select
          {...rest}
          {...selectBinding}
          id={selectId}
          name={name}
          class={styles.select}
          disabled={disabled || undefined}
          required={required || undefined}
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
      </div>
    </div>
  );
});
