/**
 * `AlertDialog` composition context — `aria-describedby` from content (§78).
 */

import { createContextId, type Signal } from "@builder.io/qwik";

export interface AlertDialogContextValue {
  contentId: Signal<string | undefined>;
}

export const AlertDialogContext =
  createContextId<AlertDialogContextValue>("qfu.alert-dialog");
