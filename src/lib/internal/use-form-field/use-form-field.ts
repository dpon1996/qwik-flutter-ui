/**
 * Shared form-field hook (§59). Internal only — not exported from package root.
 *
 * Centralizes Form registration, validator execution, touched state, error merge (FD3),
 * and standalone autovalidate timing. Validators run client-side only (`useVisibleTask$`).
 */

import { $, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";

import { AutovalidateMode, type FormFieldValue } from "../../_shared";
import { FormContext } from "../../form/context";

import type { UseFormFieldOptions, UseFormFieldResult } from "./types";
import {
  mergeDecorationWithError,
  resolveDisplayError,
} from "./types";

/** Standalone fields use `onUserInteraction` (§34 F6) — same as `TextFormField` today. */
const STANDALONE_AUTOVALIDATE_MODE = AutovalidateMode.onUserInteraction;

function shouldValidateOnInput(
  mode: AutovalidateMode,
  wasTouched: boolean,
): boolean {
  if (mode === AutovalidateMode.disabled) return false;
  if (mode === AutovalidateMode.always) return true;
  return wasTouched;
}

/**
 * Form-field state for `*FormField` wrappers.
 * Call only inside `component$` (uses context and tasks).
 */
export function useFormField(options: UseFormFieldOptions): UseFormFieldResult {
  const { name, validator$, decoration, getValue$ } = options;

  const form = useContext(FormContext, null);

  const validatorError = useSignal<string | undefined>(undefined);
  const touched = useSignal(false);

  const setError$ = $((message: string | undefined) => {
    validatorError.value = message;
  });

  const getTouched$ = $((): boolean => touched.value);

  const setTouched$ = $((next: boolean) => {
    touched.value = next;
  });

  useVisibleTask$(async ({ cleanup }) => {
    if (!form) return;

    const unregister = await form.registerField$({
      name,
      getValue$,
      validate$: validator$,
      setError$,
      getTouched$,
      setTouched$,
    });

    cleanup(unregister);
  });

  const runValidate$ = $(async (value: FormFieldValue) => {
    if (!validator$) {
      validatorError.value = undefined;
      return;
    }
    validatorError.value = await validator$(value);
  });

  const notifyInteraction$ = $(
    async (value: FormFieldValue, kind: "input" | "blur") => {
      if (form) {
        if (kind === "input" && typeof value === "string") {
          await form.setFieldValue$(name, value);
        }
        await form.onFieldInteraction$(name, kind);
        return;
      }

      if (kind !== "input") {
        return;
      }

      const wasTouched = touched.value;
      if (!wasTouched) {
        touched.value = true;
      }

      if (!validator$) {
        return;
      }

      if (
        shouldValidateOnInput(STANDALONE_AUTOVALIDATE_MODE, wasTouched)
      ) {
        await runValidate$(value);
      }
    },
  );

  const displayError = resolveDisplayError(
    validatorError.value,
    decoration,
  );

  const mergedDecoration = mergeDecorationWithError(decoration, displayError);

  return {
    form,
    validatorError,
    touched,
    displayError,
    mergedDecoration,
    runValidate$,
    notifyInteraction$,
  };
}
