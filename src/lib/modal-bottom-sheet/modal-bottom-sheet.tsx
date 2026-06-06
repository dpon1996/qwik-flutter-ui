/**
 * `ModalBottomSheet` — declarative bottom sheet (§79, OV4, OV9 scope lock).
 *
 * Composes `OverlayPortal` + overlay layer registration. Reuses dialog-equivalent
 * focus trap / restore (OV3), escape + backdrop dismiss, scroll lock (OV6).
 * v1.7: static open/closed only — no drag, snap, or sheet controllers (§79.2).
 */

import {
  $,
  Slot,
  component$,
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

import styles from "./modal-bottom-sheet.module.css";
import type { ModalBottomSheetProps } from "./types";

let warnedDefaultOpenOnSsr = false;

export const ModalBottomSheet = component$<ModalBottomSheetProps>((props) => {
  const {
    open: _open,
    defaultOpen: _defaultOpen,
    onOpenChange$: _onOpenChange$,
    dismissOnEscape = true,
    dismissOnBackdropClick = true,
    restoreFocus = true,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const layerId = useId();
  const panelRef = useSignal<HTMLElement | undefined>();

  const { isOpen, setOpen } = useOverlayOpen(props);

  const explicitOverlayContext = useOverlayContext();

  useTask$(() => {
    if (
      import.meta.env.SSR &&
      props.defaultOpen === true &&
      !warnedDefaultOpenOnSsr
    ) {
      warnedDefaultOpenOnSsr = true;
      console.warn(
        "[ModalBottomSheet] defaultOpen={true} during SSR can produce unexpected markup. Prefer controlled open={false} on the server (OV12).",
      );
    }
  });

  const closeSheet = $((reason: OverlayDismissReason) => {
    void setOpen(false, reason);
  });

  const onBackdropClick$ = $(() => {
    if (!dismissOnBackdropClick) {
      return;
    }
    void closeSheet(OverlayDismissReason.backdrop);
  });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => isOpen.value);
    track(() => layerId);
    track(() => dismissOnEscape);

    if (!isOpen.value) {
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
            void closeSheet(OverlayDismissReason.escape);
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
      modal={true}
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
        tabIndex={-1}
        class={[styles.panel, className].filter(Boolean).join(" ")}
        {...rest}
        role="dialog"
        aria-modal="true"
      >
        <Slot />
      </div>
    </OverlayPortal>
  );
});
