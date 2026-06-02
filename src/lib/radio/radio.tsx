/**
 * `Radio` — one option in a `RadioGroup` via native `<input type="radio">`.
 * Flutter equivalent of `Radio`. See `docs/API_DESIGN.md` §47.
 *
 * - Inside `RadioGroup` only (#80).
 * - `checked` = `RadioGroup` selection === `value` (#82); no local selection state.
 * - `name` and group `onChange$` live on `RadioGroup` only.
 * - Slotted label content takes precedence over `label` prop (#84).
 */

import {
  $,
  component$,
  Slot,
  useContext,
  useId,
  useTask$,
  type CSSProperties,
} from "@builder.io/qwik";

import { RadioGroupContext } from "../radio-group/context";

import styles from "./radio.module.css";
import type { RadioProps } from "./types";

const OUTSIDE_GROUP_WARN =
  "[Radio] Must be used inside <RadioGroup>. Rendering a disabled fallback.";

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

  const optionClasses = [styles.option, className].filter(Boolean).join(" ");

  const optionStyle: CSSProperties | undefined = userStyle
    ? (userStyle as CSSProperties)
    : undefined;

  if (group === null) {
    if (import.meta.env.DEV) {
      console.warn(OUTSIDE_GROUP_WARN);
    }
    return (
      <RadioOutsideGroupFallback
        inputId={inputId}
        value={value}
        label={label}
        optionClasses={optionClasses}
        optionStyle={optionStyle}
        rest={rest}
      />
    );
  }

  const isChecked = group.selectedValue === value;
  const isDisabled = group.disabled || optionDisabled;

  useTask$(() => {
    if (!group.required || group.requiredRadioValue.value !== undefined) {
      return;
    }
    group.requiredRadioValue.value = value;
  });

  const showRequired =
    group.required && group.requiredRadioValue.value === value;

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
        required={showRequired || undefined}
        onChange$={handleChange}
      />
      <RadioLabel inputId={inputId} label={label} />
    </div>
  );
});

/** Slotted content replaces fallback `label` text (#84). */
const RadioLabel = component$<{ inputId: string; label?: string }>(
  ({ inputId, label }) => (
    <label class={styles.label} for={inputId}>
      <Slot>{label}</Slot>
    </label>
  ),
);

/** Inert markup when `RadioGroup` context is missing — never throws. */
const RadioOutsideGroupFallback = component$<{
  inputId: string;
  value: string;
  label?: string;
  optionClasses: string;
  optionStyle: CSSProperties | undefined;
  rest: Record<string, unknown>;
}>(({ inputId, value, label, optionClasses, optionStyle, rest }) => (
  <div class={optionClasses} style={optionStyle} aria-hidden="true">
    <input
      {...rest}
      type="radio"
      id={inputId}
      value={value}
      class={styles.input}
      disabled
      tabIndex={-1}
    />
    <RadioLabel inputId={inputId} label={label} />
  </div>
));
