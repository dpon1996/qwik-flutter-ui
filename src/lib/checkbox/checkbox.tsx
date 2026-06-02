/**
 * `Checkbox` — boolean toggle via native `<input type="checkbox">`.
 * Flutter equivalent of `Checkbox`. See `docs/API_DESIGN.md` §46.
 *
 * - Controlled: `checked` + `onChange$`; uncontrolled: `defaultChecked`.
 * - Stable ids via `useId()` when `id` is omitted (§55).
 * - Registers with `<Form>` when `name` is set (boolean in `FormValues`, §53).
 * - Native submit: checked → `value` or `"on"`; unchecked → omitted.
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

import styles from "./checkbox.module.css";
import type { CheckboxProps } from "./types";

export const Checkbox = component$<CheckboxProps>((props) => {
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
    omitLabel = false,
    registerWithForm = true,
    ariaDescribedBy,
    ariaInvalid,
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

  const getValue$ = $((): boolean =>
    checked !== undefined ? (checked ?? false) : internalChecked.value,
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
          id={inputId}
          name={name}
          value={value}
          class={styles.input}
          disabled={disabled || undefined}
          required={required || undefined}
          autoFocus={autoFocus || undefined}
          aria-describedby={ariaDescribedBy || undefined}
          aria-invalid={ariaInvalid ? true : undefined}
          onChange$={handleChange}
        />
        {!omitLabel && label !== undefined && label !== "" && (
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
