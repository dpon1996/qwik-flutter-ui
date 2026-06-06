/**
 * `AlertDialogTitle` — wraps `DialogTitle` (§78).
 */

import { component$, Slot } from "@builder.io/qwik";

import { DialogTitle } from "../dialog/dialog-title";

import type { AlertDialogTitleProps } from "./types";

export const AlertDialogTitle = component$<AlertDialogTitleProps>((props) => {
  return (
    <DialogTitle {...props}>
      <Slot />
    </DialogTitle>
  );
});
