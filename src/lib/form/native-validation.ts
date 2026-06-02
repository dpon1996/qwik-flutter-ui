/**
 * Native constraint validation for `<Form>` (§53).
 * `noValidate` blocks submit-time validation only; `checkValidity` / `reportValidity` still apply.
 */

/** Run native validity on the form; show browser UI when invalid. */
export function reportNativeFormValidity(form: HTMLFormElement): boolean {
  if (form.checkValidity()) {
    return true;
  }
  form.reportValidity();
  return false;
}
