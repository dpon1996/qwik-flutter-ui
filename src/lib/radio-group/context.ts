/**
 * `RadioGroup` context — selection state owned by the group (§48, Decision #82).
 * Consumed by `Radio` only; callbacks are QRLs for resumability (§55).
 */

import { createContextId, type QRL, type Signal } from "@builder.io/qwik";

/** Internal API consumed by `Radio`; provided by `RadioGroup`. */
export interface RadioGroupContextValue {
  name: string;
  /** Current group selection; `Radio.checked` is `selectedValue === Radio.value`. */
  selectedValue: string | undefined;
  disabled: boolean;
  /** Native `required` on one radio in the group (§53). */
  required: boolean;
  /** Which option receives the native `required` attribute. */
  requiredRadioValue: Signal<string | undefined>;
  selectValue$: QRL<(value: string, ev: Event) => void>;
}

export const RadioGroupContext =
  createContextId<RadioGroupContextValue>("qfu.radio-group");
