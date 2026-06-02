/**
 * Internal `useFormField` types (§59). Not part of the public API.
 */

import type { QRL, Signal } from "@builder.io/qwik";

import type { FieldDecoration, FormFieldValue } from "../../_shared";
import type { FormContextValue } from "../../form/context";

export interface UseFormFieldOptions {
  name: string;
  decoration?: FieldDecoration;
  getValue$: QRL<() => FormFieldValue>;
  validator$?: QRL<(value: FormFieldValue) => string | undefined>;
}

/** `displayError = validatorResult ?? decoration.errorText` (FD3). */
export function resolveDisplayError(
  validatorResult: string | undefined,
  decoration?: FieldDecoration,
): string | undefined {
  return validatorResult ?? decoration?.errorText;
}

/** Merge {@link displayError} into decoration for control chrome. */
export function mergeDecorationWithError<T extends FieldDecoration>(
  decoration: T | undefined,
  displayError: string | undefined,
): T | undefined {
  if (decoration === undefined && displayError === undefined) {
    return undefined;
  }

  return {
    ...decoration,
    ...(displayError !== undefined ? { errorText: displayError } : {}),
  } as T;
}

export interface UseFormFieldResult {
  /** `null` when not inside `<Form>`. */
  form: FormContextValue | null;
  /** Validator output only — not merged with `decoration.errorText` (FD3). */
  validatorError: Signal<string | undefined>;
  touched: Signal<boolean>;
  /** `validatorResult ?? decoration.errorText` (FD3). */
  displayError: string | undefined;
  /** Decoration with `errorText` set to {@link displayError} when present. */
  mergedDecoration: FieldDecoration | undefined;
  runValidate$: QRL<(value: FormFieldValue) => Promise<void>>;
  /**
   * Field interaction — delegates to `Form` when registered, otherwise standalone
   * `onUserInteraction` timing (§34 F6).
   */
  notifyInteraction$: QRL<
    (value: FormFieldValue, kind: "input" | "blur") => Promise<void>
  >;
}
