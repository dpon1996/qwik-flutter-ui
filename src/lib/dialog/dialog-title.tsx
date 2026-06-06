/**
 * `DialogTitle` — accessible name for `Dialog` (§77).
 */

import { component$, Slot, useContext, useId, useTask$ } from "@builder.io/qwik";

import { DialogContext } from "./context";
import styles from "./dialog.module.css";
import type { DialogTitleProps } from "./types";

export const DialogTitle = component$<DialogTitleProps>((props) => {
  const { id: idProp, class: className, ...rest } = props;
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const dialog = useContext(DialogContext);

  useTask$(({ cleanup }) => {
    dialog.titleId.value = id;
    cleanup(() => {
      if (dialog.titleId.value === id) {
        dialog.titleId.value = undefined;
      }
    });
  });

  return (
    <h2
      id={id}
      class={[styles.title, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <Slot />
    </h2>
  );
});
