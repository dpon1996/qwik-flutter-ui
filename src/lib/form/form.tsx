/**
 * `Form` — groups fields and coordinates validation / submit.
 * Flutter equivalent of `Form`. See `docs/API_DESIGN.md` §31.
 *
 * - Native `<form>` with optional `action` / `method` (progressive enhancement).
 * - Field registry via Qwik context (no global store).
 * - `noValidate` when `onSubmit$` or any `validator$` is registered (§34 F1).
 * - F6: `onUserInteraction` validates on `input` after the field is touched.
 * - v1.4 selection: `checkValidity()` for native `required` before `validator$` (§53).
 */

import {
  $,
  component$,
  Slot,
  useContextProvider,
  useStore,
  type CSSProperties,
} from "@builder.io/qwik";

import {
  AutovalidateMode,
  type FormFieldValue,
  type FormValues,
} from "../_shared";

import { FormContext, type FormFieldRegistration } from "./context";
import { reportNativeFormValidity } from "./native-validation";
import type { FormProps } from "./types";

interface FormRegistry {
  fields: Record<string, FormFieldRegistration>;
  values: Record<string, FormFieldValue>;
  /** Set when `onSubmit$` or any registered field has `validator$` (§34 F1). */
  useNoValidate: boolean;
}

function resolveFormElement(ev: SubmitEvent): HTMLFormElement | null {
  const target = ev.target;
  if (target instanceof HTMLFormElement) {
    return target;
  }
  if (ev.currentTarget instanceof HTMLFormElement) {
    return ev.currentTarget;
  }
  if (target instanceof HTMLElement) {
    return target.closest("form");
  }
  return null;
}

async function runFieldValidator(
  field: FormFieldRegistration,
  value: FormFieldValue,
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
    fields: {},
    values: {},
    useNoValidate: onSubmit$ !== undefined,
  }));

  const validateFieldByName = $(async (name: string): Promise<boolean> => {
    const field = registry.fields[name];
    if (!field) return true;

    const value = await field.getValue$();
    registry.values[name] = value;

    const error = await runFieldValidator(field, value);
    await field.setError$(error);
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

  const collectValues = $(async (): Promise<FormValues> => {
    const values: FormValues = {};

    for (const name of Object.keys(registry.fields)) {
      const field = registry.fields[name];
      const value = await field.getValue$();
      values[name] = value;
      registry.values[name] = value;
    }

    return values;
  });

  const handleFieldInteraction = $(
    async (name: string, kind: "input" | "blur") => {
      const field = registry.fields[name];
      if (!field) return;

      const value = await field.getValue$();
      registry.values[name] = value;

      if (kind === "input") {
        if (!(await field.getTouched$())) {
          await field.setTouched$(true);
          if (autovalidateMode !== AutovalidateMode.always) {
            return;
          }
        }
      }

      if (autovalidateMode === AutovalidateMode.disabled) {
        return;
      }

      if (autovalidateMode === AutovalidateMode.always && kind === "input") {
        await validateFieldByName(name);
        return;
      }

      if (
        autovalidateMode === AutovalidateMode.onUserInteraction &&
        kind === "input"
      ) {
        await validateFieldByName(name);
      }
    },
  );

  const registerField$ = $(async (field: FormFieldRegistration) => {
    registry.fields[field.name] = field;
    registry.values[field.name] = await field.getValue$();

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
    autovalidateMode,
    registerField$,
    setFieldValue$,
    onFieldInteraction$,
  });

  const handleSubmit = $(async (ev: SubmitEvent) => {
    if (!onSubmit$) {
      return;
    }

    ev.preventDefault();

    const formEl = resolveFormElement(ev);
    if (!formEl) {
      return;
    }

    if (!reportNativeFormValidity(formEl)) {
      return;
    }

    const valid = await validateAllFields();
    if (!valid) {
      return;
    }

    const values = await collectValues();
    await onSubmit$(values, ev);
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
      onSubmit$={onSubmit$ ? handleSubmit : undefined}
    >
      <Slot />
    </form>
  );
});
