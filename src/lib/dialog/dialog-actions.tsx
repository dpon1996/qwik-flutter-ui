/**
 * `DialogActions` — action button row for `Dialog` (§77).
 */

import { component$, Slot } from "@builder.io/qwik";

import styles from "./dialog.module.css";
import type { DialogActionsProps } from "./types";

export const DialogActions = component$<DialogActionsProps>((props) => {
  const { class: className, ...rest } = props;

  return (
    <div
      class={[styles.actions, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <Slot />
    </div>
  );
});
