/**
 * `AlertDialog` — blocking confirm dialog built on `Dialog` (§78).
 *
 * No separate overlay stack; all behavior (portal, focus, dismiss) comes from `Dialog`.
 */

import { component$, useSignal, useTask$, Slot, useContextProvider } from "@builder.io/qwik";

import { Dialog } from "../dialog/dialog";

import { AlertDialogContext } from "./context";
import type { AlertDialogProps } from "./types";

export const AlertDialog = component$<AlertDialogProps>((props) => {
  const {
    role = "alertdialog",
    describedBy: describedByProp,
    modal = true,
    open: _open,
    defaultOpen: _defaultOpen,
    onOpenChange$: _onOpenChange$,
    ...dialogProps
  } = props;

  const contentId = useSignal<string | undefined>(undefined);
  useContextProvider(AlertDialogContext, { contentId });

  const describedBy = useSignal<string | undefined>(describedByProp);

  useTask$(({ track }) => {
    track(() => describedByProp);
    track(() => contentId.value);
    describedBy.value = describedByProp ?? contentId.value;
  });

  return (
    <Dialog
      {...dialogProps}
      open={props.open}
      defaultOpen={props.defaultOpen}
      onOpenChange$={props.onOpenChange$}
      modal={modal}
      role={role}
      describedBy={describedBy.value}
    >
      <Slot />
    </Dialog>
  );
});
