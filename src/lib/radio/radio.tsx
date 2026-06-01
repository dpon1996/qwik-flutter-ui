/**
 * `Radio` — one option in a `RadioGroup` via native `<input type="radio">`.
 * Flutter equivalent of `Radio`. See `docs/API_DESIGN.md` §47.
 *
 * - Must be used inside `RadioGroup` only (#80).
 * - `checked` derived from group context (#82); no local selection state.
 * - `name` / `onChange$` for the group are owned by `RadioGroup`.
 */

import {
  $,
  component$,
  Slot,
  useContext,
  useId,
  type CSSProperties,
} from "@builder.io/qwik";

import { RadioGroupContext } from "../radio-group/context";

import styles from "./radio.module.css";
import type { RadioProps } from "./types";

export const Radio = component$<RadioProps>((props) => {
  const {
    value,
    disabled: optionDisabled = false,
    label,
    id,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const group = useContext(RadioGroupContext, null);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  if (import.meta.env.DEV && group === null) {
    console.warn("[Radio] Must be used inside <RadioGroup>; rendering nothing.");
  }

  if (group === null) {
    return null;
  }

  const isChecked = group.selectedValue === value;
  const isDisabled = group.disabled || optionDisabled;

  const optionClasses = [styles.option, className].filter(Boolean).join(" ");

  const optionStyle: CSSProperties | undefined = userStyle
    ? (userStyle as CSSProperties)
    : undefined;

  const handleChange = $((ev: Event) => {
    const input = ev.target as HTMLInputElement;
    if (input.checked) {
      void group.selectValue$(value, ev);
    }
  });

  return (
    <div class={optionClasses} style={optionStyle}>
      <input
        {...rest}
        type="radio"
        id={inputId}
        name={group.name}
        value={value}
        class={styles.input}
        checked={isChecked}
        disabled={isDisabled || undefined}
        onChange$={handleChange}
      />
      <label class={styles.label} for={inputId}>
        <Slot>{label}</Slot>
      </label>
    </div>
  );
});
