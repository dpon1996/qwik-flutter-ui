/**
 * `Dialog` composition context — wires `DialogTitle` to `aria-labelledby`.
 */

import { createContextId, type Signal } from "@builder.io/qwik";

export interface DialogContextValue {
  /** Resolved title element id for `aria-labelledby`. */
  titleId: Signal<string | undefined>;
}

export const DialogContext = createContextId<DialogContextValue>("qfu.dialog");
