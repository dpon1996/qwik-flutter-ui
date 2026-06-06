/**
 * `DialogContent` — body region for `Dialog` (§77).
 */

import { component$, Slot } from "@builder.io/qwik";

import styles from "./dialog.module.css";
import type { DialogContentProps } from "./types";

export const DialogContent = component$<DialogContentProps>((props) => {
  const { id, class: className, ...rest } = props;

  return (
    <div
      id={id}
      class={[styles.content, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <Slot />
    </div>
  );
});
