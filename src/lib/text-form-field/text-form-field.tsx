/**
 * `TextFormField` — `TextField` with optional `Form` integration and `validator$`.
 * Flutter equivalent of `TextFormField`. See `docs/API_DESIGN.md` §30.
 *
 * - Composes {@link TextField} — no duplicated markup.
 * - Registers with {@link FormContext} when inside `<Form>` (§31).
 * - Standalone: runs `validator$` per `AutovalidateMode.onUserInteraction` (§34 F6).
 */

import {
  $,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

import { AutovalidateMode } from "../_shared";
import { FormContext } from "../form/context";
import { TextField } from "../text-field/text-field";

import type { TextFormFieldProps } from "./types";

function shouldValidateOnInput(
  mode: AutovalidateMode,
  touched: boolean,
): boolean {
  if (mode === AutovalidateMode.disabled) return false;
  if (mode === AutovalidateMode.always) return true;
  return touched;
}

export const TextFormField = component$<TextFormFieldProps>((props) => {
  const {
    name,
    validator$,
    decoration,
    value,
    defaultValue,
    onInput$,
    ...textFieldProps
  } = props;

  const form = useContext(FormContext, null);

  const currentValue = useSignal(value ?? defaultValue ?? "");
  const localError = useSignal<string | undefined>(undefined);
  const touched = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => value);
    if (value !== undefined) {
      currentValue.value = value;
    }
  });

  useVisibleTask$(async ({ cleanup }) => {
    if (!form) return;

    const unregister = await form.registerField$({
      name,
      getValue: () => currentValue.value,
      validate$: validator$,
      setError: (message) => {
        localError.value = message;
      },
      getTouched: () => touched.value,
      setTouched: (next) => {
        touched.value = next;
      },
    });

    cleanup(unregister);
  });

  const runValidate = $(async (val: string) => {
    if (!validator$) {
      localError.value = undefined;
      return;
    }
    localError.value = await validator$(val);
  });

  const handleInput = $((val: string, ev: InputEvent) => {
    currentValue.value = val;
    form?.setFieldValue$(name, val);

    const wasTouched = touched.value;
    void onInput$?.(val, ev);

    if (form) {
      // Form owns touched + validation timing (§34 F6).
      form.onFieldInteraction$(name, "input");
      return;
    }

    if (!wasTouched) {
      touched.value = true;
    }

    if (!validator$) return;

    if (shouldValidateOnInput(AutovalidateMode.onUserInteraction, wasTouched)) {
      void runValidate(val);
    }
  });

  const displayError =
    localError.value !== undefined && localError.value !== ""
      ? localError.value
      : decoration?.errorText;

  const mergedDecoration =
    decoration !== undefined || displayError !== undefined
      ? {
          ...decoration,
          ...(displayError !== undefined ? { errorText: displayError } : {}),
        }
      : undefined;

  return (
    <TextField
      {...textFieldProps}
      name={name}
      decoration={mergedDecoration}
      value={value}
      defaultValue={defaultValue}
      onInput$={handleInput}
    />
  );
});
