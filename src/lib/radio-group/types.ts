/**
 * `RadioGroup` prop types. See `docs/API_DESIGN.md` §48.
 */

import type { QRL } from "@builder.io/qwik";

import type { BaseProps } from "../_shared";

/**
 * Props for the `RadioGroup` widget — owns selection state for child `Radio` options.
 */
export interface RadioGroupProps extends BaseProps {
  /** Required — form key and shared `name` on each radio input. */
  name: string;
  /** Controlled selected option token (`string` only, §53). */
  value?: string;
  /** Uncontrolled initial selection for SSR (§55). */
  defaultValue?: string;
  onChange$?: QRL<(value: string, ev: Event) => void>;
  disabled?: boolean;
  /** Native `required` — one option in the group must be selected (§53). */
  required?: boolean;
  /** Group label — renders `<legend>`. */
  legend?: string;
  /**
   * When `true`, inline `legend` is not rendered (`RadioGroupFormField` + FD10).
   * @default false
   */
  omitLegend?: boolean;
  /**
   * When `true`, accessible name comes from the `legend` slot (`RadioGroupFormField`).
   * @internal
   */
  legendProvidedViaSlot?: boolean;
  /** When `false`, skips `<Form>` registration (`RadioGroupFormField` uses `useFormField`). */
  registerWithForm?: boolean;
  /** Overrides `aria-describedby` on the `<fieldset>`. */
  ariaDescribedBy?: string;
  /** Maps to `aria-invalid` on the `<fieldset>`. */
  ariaInvalid?: boolean;
}
