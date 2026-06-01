/**
 * `Switch` — on/off control via native `<input type="checkbox" role="switch">`.
 * Flutter equivalent of `Switch`. See `docs/API_DESIGN.md` §49.
 *
 * - Same public API as `Checkbox` (Decision #81).
 * - Controlled: `checked` + `onChange$`; uncontrolled: `defaultChecked`.
 * - `role="switch"` for assistive technology (distinct from checkbox).
 * - Registers with `<Form>` when `name` is set (`FormValues` → boolean, §53).
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

import styles from "./switch.module.css";
import type { SwitchProps } from "./types";

export const Switch = component$<SwitchProps>((props) => {
  const {
    checked,
    defaultChecked,
    onChange$,
    disabled = false,
    required = false,
    name,
    value = "on",
    autoFocus = false,
    label,
    id,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const form = useContext(FormContext, null);

  const internalChecked = useSignal(defaultChecked ?? false);
  const touched = useSignal(false);

  useVisibleTask$(async ({ cleanup }) => {
    if (!form || !name) return;

    const unregister = await form.registerField$({
      name,
      getValue: () =>
        checked !== undefined ? (checked ?? false) : internalChecked.value,
      setError: () => {},
      getTouched: () => touched.value,
      setTouched: (next) => {
        touched.value = next;
      },
    });

    cleanup(unregister);
  });

  const checkedProps =
    checked !== undefined
      ? { checked }
      : defaultChecked !== undefined
        ? { defaultChecked }
        : {};

  const rootClasses = [styles.root, className].filter(Boolean).join(" ");

  const rootStyle: CSSProperties | undefined = userStyle
    ? (userStyle as CSSProperties)
    : undefined;

  const handleChange = $((ev: Event) => {
    const input = ev.target as HTMLInputElement;
    const next = input.checked;

    if (checked === undefined) {
      internalChecked.value = next;
    }

    void onChange$?.(next, ev);

    if (form && name) {
      void form.onFieldInteraction$(name, "input");
    }
  });

  return (
    <div class={rootClasses} style={rootStyle}>
      <div class={styles.controlRow}>
        <input
          {...rest}
          {...checkedProps}
          type="checkbox"
          role="switch"
          id={inputId}
          name={name}
          value={value}
          class={styles.input}
          disabled={disabled || undefined}
          required={required || undefined}
          autoFocus={autoFocus || undefined}
          onChange$={handleChange}
        />
        {label !== undefined && label !== "" && (
          <label class={styles.label} for={inputId}>
            {label}
            {required && (
              <span class={styles.requiredMark} aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}
      </div>
    </div>
  );
});
