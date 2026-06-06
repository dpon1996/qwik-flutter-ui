/**
 * `Dialog` — declarative modal dialog (§77, OV4).
 *
 * Composes `OverlayPortal` + overlay layer registration. Focus trap / restore (OV3),
 * escape + backdrop dismiss, and scroll lock (OV6 via `OverlayContainer`) when modal.
 */

import {
  $,
  Slot,
  component$,
  useContextProvider,
  useId,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";

import { OverlayDismissReason } from "../_shared";
import {
  focusFirstElement,
  handleFocusTrapKeydown,
} from "../overlay/focus-trap";
import { OverlayPortal } from "../overlay/overlay-portal";
import { useOverlayContext, resolveOverlayContext } from "../overlay/use-overlay-layer";
import { useOverlayOpen } from "../overlay/use-overlay-open";

import { DialogContext } from "./context";
import styles from "./dialog.module.css";
import type { DialogProps } from "./types";

let warnedDefaultOpenOnSsr = false;

export const Dialog = component$<DialogProps>((props) => {
  const {
    defaultOpen,
    onOpenChange$,
    role = "dialog",
    describedBy,
    modal = true,
    dismissOnEscape: dismissOnEscapeProp,
    dismissOnBackdropClick = true,
    restoreFocus = true,
    labelledBy,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const dismissOnEscape =
    dismissOnEscapeProp ?? (modal ? true : false);

  const layerId = useId();
  const panelRef = useSignal<HTMLElement | undefined>();
  const titleId = useSignal<string | undefined>(undefined);

  useContextProvider(DialogContext, { titleId });

  const { isOpen, setOpen } = useOverlayOpen(props);

  const explicitOverlayContext = useOverlayContext();

  useTask$(() => {
    if (
      import.meta.env.SSR &&
      modal &&
      defaultOpen === true &&
      !warnedDefaultOpenOnSsr
    ) {
      warnedDefaultOpenOnSsr = true;
      console.warn(
        "[Dialog] defaultOpen={true} on a modal dialog during SSR can produce unexpected markup. Prefer controlled open={false} on the server (OV12).",
      );
    }
  });

  const closeDialog = $((reason: OverlayDismissReason) => {
    void setOpen(false, reason);
  });

  const onBackdropClick$ = $(() => {
    if (!dismissOnBackdropClick) {
      return;
    }
    void closeDialog(OverlayDismissReason.backdrop);
  });

  const ariaLabelledBy = labelledBy ?? titleId.value;

  useVisibleTask$(({ track, cleanup }) => {
    track(() => isOpen.value);
    track(() => layerId);
    track(() => dismissOnEscape);

    if (!isOpen.value || !modal) {
      return;
    }

    let disposed = false;
    let previousFocus: HTMLElement | null = null;
    let removeKeyDown: (() => void) | undefined;

    const setup = () => {
      const panel = panelRef.value;
      if (!panel || disposed) {
        return;
      }

      const overlayContext = resolveOverlayContext(explicitOverlayContext);
      if (!overlayContext) {
        return;
      }

      previousFocus = document.activeElement as HTMLElement | null;
      focusFirstElement(panel);

      const onKeyDown = (event: KeyboardEvent) => {
        void overlayContext.getTopModalLayerId$().then((topModalLayerId) => {
          if (topModalLayerId !== layerId) {
            return;
          }

          if (event.key === "Escape" && dismissOnEscape) {
            event.preventDefault();
            event.stopPropagation();
            void closeDialog(OverlayDismissReason.escape);
            return;
          }

          handleFocusTrapKeydown(panel, event);
        });
      };

      document.addEventListener("keydown", onKeyDown, true);
      removeKeyDown = () => {
        document.removeEventListener("keydown", onKeyDown, true);
      };
    };

    const raf = requestAnimationFrame(setup);

    cleanup(() => {
      disposed = true;
      cancelAnimationFrame(raf);
      removeKeyDown?.();
      if (
        restoreFocus &&
        previousFocus &&
        typeof previousFocus.focus === "function"
      ) {
        previousFocus.focus();
      }
    });
  });

  return (
    <OverlayPortal
      open={isOpen.value}
      modal={modal}
      layerId={layerId}
      class={styles.overlay}
      style={userStyle}
    >
      <button
        type="button"
        class={styles.backdrop}
        aria-hidden="true"
        tabIndex={-1}
        onClick$={onBackdropClick$}
      />
      <div
        ref={panelRef}
        role={role}
        aria-modal={modal ? "true" : undefined}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        class={[styles.panel, className].filter(Boolean).join(" ")}
        {...rest}
      >
        <Slot />
      </div>
    </OverlayPortal>
  );
});
