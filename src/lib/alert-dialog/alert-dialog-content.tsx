/**
 * `AlertDialogContent` — wraps `DialogContent`; registers `aria-describedby` (§78).
 */

import { component$, Slot, useContext, useId, useTask$ } from "@builder.io/qwik";

import { DialogContent } from "../dialog/dialog-content";

import { AlertDialogContext } from "./context";
import type { AlertDialogContentProps } from "./types";

export const AlertDialogContent = component$<AlertDialogContentProps>((props) => {
  const { id: idProp, ...rest } = props;
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const alertDialog = useContext(AlertDialogContext);

  useTask$(({ cleanup }) => {
    alertDialog.contentId.value = id;
    cleanup(() => {
      if (alertDialog.contentId.value === id) {
        alertDialog.contentId.value = undefined;
      }
    });
  });

  return (
    <DialogContent id={id} {...rest}>
      <Slot />
    </DialogContent>
  );
});
