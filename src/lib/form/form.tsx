/**
 * `Form` — groups fields and coordinates validation / submit.
 * Flutter equivalent of `Form`. See `docs/API_DESIGN.md` §31.
 *
 * - Native `<form>` with optional `action` / `method` (progressive enhancement).
 * - Field registry via Qwik context (no global store).
 * - `noValidate` when `onSubmit$` or any `validator$` is registered (§34 F1).
 * - F6: `onUserInteraction` validates on `input` after the field is touched.
 */

import {
  $,
  component$,
  Slot,
  useContextProvider,
  useStore,
  type CSSProperties,
} from "@builder.io/qwik";

import { AutovalidateMode, type FormValues } from "../_shared";

import { FormContext, type FormFieldRegistration } from "./context";
import type { FormProps } from "./types";

interface FormRegistry {
  autovalidateMode: AutovalidateMode;
  fields: Record<string, FormFieldRegistration>;
  values: Record<string, string>;
  /** Set when `onSubmit$` or any registered field has `validator$` (§34 F1). */
  useNoValidate: boolean;
}

async function runFieldValidator(
  field: FormFieldRegistration,
  value: string,
): Promise<string | undefined> {
  if (!field.validate$) return undefined;
  return await field.validate$(value);
}

export const Form = component$<FormProps>((props) => {
  const {
    onSubmit$,
    autovalidateMode = AutovalidateMode.disabled,
    action,
    method,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const registry = useStore<FormRegistry>(() => ({
    autovalidateMode,
    fields: {},
    values: {},
    useNoValidate: onSubmit$ !== undefined,
  }));

  registry.autovalidateMode = autovalidateMode;

  const validateFieldByName = $(async (name: string): Promise<boolean> => {
    const field = registry.fields[name];
    if (!field) return true;

    const value = field.getValue();
    registry.values[name] = value;

    const error = await runFieldValidator(field, value);
    field.setError(error);
    return error === undefined;
  });

  const validateAllFields = $(async (): Promise<boolean> => {
    let valid = true;

    for (const name of Object.keys(registry.fields)) {
      const ok = await validateFieldByName(name);
      if (!ok) valid = false;
    }

    return valid;
  });

  const collectValues = $((): FormValues => {
    const values: FormValues = {};

    for (const name of Object.keys(registry.fields)) {
      const field = registry.fields[name];
      values[name] = field.getValue();
      registry.values[name] = field.getValue();
    }

    return values;
  });

  const handleFieldInteraction = $(
    async (name: string, kind: "input" | "blur") => {
      const field = registry.fields[name];
      if (!field) return;

      const value = field.getValue();
      registry.values[name] = value;

      const mode = registry.autovalidateMode;

      if (kind === "input") {
        if (!field.getTouched()) {
          field.setTouched(true);
          if (mode !== AutovalidateMode.always) {
            return;
          }
        }
      }

      if (mode === AutovalidateMode.disabled) {
        return;
      }

      if (mode === AutovalidateMode.always && kind === "input") {
        await validateFieldByName(name);
        return;
      }

      if (mode === AutovalidateMode.onUserInteraction && kind === "input") {
        await validateFieldByName(name);
      }
    },
  );

  const registerField$ = $((field: FormFieldRegistration) => {
    registry.fields[field.name] = field;
    registry.values[field.name] = field.getValue();

    if (field.validate$) {
      registry.useNoValidate = true;
    }

    return () => {
      delete registry.fields[field.name];
      delete registry.values[field.name];
    };
  });

  const setFieldValue$ = $((name: string, value: string) => {
    registry.values[name] = value;
  });

  const onFieldInteraction$ = $((name: string, kind: "input" | "blur") => {
    void handleFieldInteraction(name, kind);
  });

  useContextProvider(FormContext, {
    autovalidateMode: registry.autovalidateMode,
    registerField$,
    setFieldValue$,
    onFieldInteraction$,
  });

  const handleSubmit = $(async (ev: SubmitEvent) => {
    if (!onSubmit$) {
      return;
    }

    ev.preventDefault();

    const valid = await validateAllFields();
    if (!valid) {
      return;
    }

    const values = await collectValues();
    await onSubmit$?.(values, ev);
  });

  const style: CSSProperties | undefined = userStyle
    ? (userStyle as CSSProperties)
    : undefined;

  return (
    <form
      {...rest}
      class={className}
      style={style}
      action={action}
      method={method}
      noValidate={registry.useNoValidate || undefined}
      preventdefault:submit={onSubmit$ !== undefined}
      onSubmit$={onSubmit$ ? handleSubmit : undefined}
    >
      <Slot />
    </form>
  );
});
