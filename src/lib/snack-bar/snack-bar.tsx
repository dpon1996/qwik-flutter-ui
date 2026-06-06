/**
 * `SnackBar` — Material-style transient message (§80, OV14).
 *
 * Rendered by `SnackBarHost` from queue state. Does not own queue, duration timers,
 * or overlay layer registration.
 */

import { $, component$, useContext } from "@builder.io/qwik";

import { SnackBarContext } from "./context";
import styles from "./snack-bar.module.css";
import type { SnackBarA11yRole } from "./queue";
import type { SnackBarProps } from "./types";

export interface SnackBarRenderProps extends SnackBarProps {
  /** Queue entry id — used to dismiss via host context. */
  entryId: string;
  a11yRole: SnackBarA11yRole;
}

export const SnackBar = component$<SnackBarRenderProps>((props) => {
  const {
    entryId,
    a11yRole,
    message,
    actionLabel,
    onAction$,
    onDismiss$: _onDismiss$,
    duration: _duration,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const snackBarContext = useContext(SnackBarContext);

  const onActionClick$ = $(async () => {
    if (onAction$) {
      await onAction$();
    }
    await snackBarContext.dismiss$(entryId);
  });

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div
      class={rootClass}
      style={userStyle}
      {...rest}
      role={a11yRole}
      aria-live={a11yRole === "alert" ? "assertive" : "polite"}
      aria-atomic="true"
      data-qfu-snackbar=""
      data-qfu-snackbar-id={entryId}
    >
      <span class={styles.message}>{message}</span>
      {actionLabel ? (
        <button type="button" class={styles.action} onClick$={onActionClick$}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
});
