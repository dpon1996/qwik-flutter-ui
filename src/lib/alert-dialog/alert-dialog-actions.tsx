/**
 * `AlertDialogActions` — wraps `DialogActions` (§78).
 */

import { component$, Slot } from "@builder.io/qwik";

import { DialogActions } from "../dialog/dialog-actions";

import type { AlertDialogActionsProps } from "./types";

export const AlertDialogActions = component$<AlertDialogActionsProps>((props) => {
  return (
    <DialogActions {...props}>
      <Slot />
    </DialogActions>
  );
});
