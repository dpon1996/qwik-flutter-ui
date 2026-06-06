/// <reference types="vite/client" />

/**
 * `Drawer` — modal slide-in navigation panel (Flutter `Drawer` equivalent).
 * See `docs/API_DESIGN.md` §95.
 *
 * Implementation notes:
 *  - Controlled / uncontrolled open via shared `useOverlayOpen` (§94.4 Option B).
 *  - Modal presentation through internal `OverlayPortal` — not `role="dialog"`.
 *  - Closed: hidden `<aside aria-hidden>` anchor; open: portaled panel `<aside>`.
 *  - Focus trap, escape / backdrop dismiss, and focus restore while open (OV3).
 *  - SSR-safe defaults (`open={false}`); listeners only in `useVisibleTask$` while open.
 */

import {
  $,
  Slot,
  component$,
  useId,
  useSignal,
  useTask$,
  useVisibleTask$,
  type CSSProperties,
  type JSXOutput,
  type QRL,
} from "@builder.io/qwik";

import { OverlayDismissReason, type BaseProps } from "../../lib/_shared";
import {
  focusFirstElement,
  handleFocusTrapKeydown,
} from "../../lib/overlay/focus-trap";
import { OverlayPortal } from "../../lib/overlay/overlay-portal";
import { useOverlayOpen } from "../../lib/overlay/use-overlay-open";

import styles from "./Drawer.module.css";

let warnedDefaultOpenOnSsr = false;

export interface DrawerProps extends BaseProps {
  /** Controlled open state. Default **false** for SSR. */
  open?: boolean;

  /** Uncontrolled initial open. Prefer **false** on SSR. */
  defaultOpen?: boolean;

  /** Fires when open state changes. Optional `reason` aligns with `Dialog` (§77). */
  onOpenChange$?: QRL<(open: boolean, reason?: OverlayDismissReason) => void>;

  /** Drawer panel content — typically `<nav>` with navigation links. */
  children?: JSXOutput;
}

export const Drawer = component$<DrawerProps>((props) => {
  const layerId = useId();
  const panelRef = useSignal<HTMLElement | undefined>();

  const { isOpen, setOpen } = useOverlayOpen(props);

  const {
    open: _open,
    defaultOpen,
    onOpenChange$: _onOpenChange$,
    class: className,
    style: userStyle,
    ...rest
  } = props;
  void _open;
  void _onOpenChange$;

  useTask$(() => {
    if (
      import.meta.env.SSR &&
      defaultOpen === true &&
      !warnedDefaultOpenOnSsr
    ) {
      warnedDefaultOpenOnSsr = true;
      console.warn(
        "[Drawer] defaultOpen={true} during SSR can produce unexpected markup. Prefer controlled open={false} on the server (OV12).",
      );
    }
  });

  const closeDrawer = $((reason: OverlayDismissReason) => {
    void setOpen(false, reason);
  });

  const onBackdropClick$ = $(() => {
    void closeDrawer(OverlayDismissReason.backdrop);
  });

  const onPanelKeyDown$ = $((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      void closeDrawer(OverlayDismissReason.escape);
      return;
    }

    const panel = panelRef.value;
    if (panel) {
      handleFocusTrapKeydown(panel, event);
    }
  });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => isOpen.value);
    track(() => panelRef.value);

    if (!isOpen.value || !panelRef.value) {
      return;
    }

    const panel = panelRef.value;
    const previousFocus = panel.ownerDocument.activeElement as HTMLElement | null;
    focusFirstElement(panel);

    cleanup(() => {
      if (
        previousFocus &&
        typeof previousFocus.focus === "function"
      ) {
        previousFocus.focus();
      }
    });
  });

  const panelClass = [styles.panel, className].filter(Boolean).join(" ");
  const style: CSSProperties | undefined = userStyle as CSSProperties | undefined;

  if (!isOpen.value) {
    return (
      <aside
        aria-hidden="true"
        inert
        class={[styles.closed, className].filter(Boolean).join(" ")}
        style={style}
        {...rest}
      >
        <Slot />
      </aside>
    );
  }

  return (
    <OverlayPortal
      open={isOpen.value}
      modal={true}
      layerId={layerId}
      class={styles.overlay}
    >
      <button
        type="button"
        class={styles.backdrop}
        data-qfu-drawer-backdrop=""
        aria-hidden="true"
        tabIndex={-1}
        onClick$={onBackdropClick$}
      />
      <aside
        ref={panelRef}
        data-qfu-drawer-panel={layerId}
        tabIndex={-1}
        class={panelClass}
        style={style}
        onKeyDown$={onPanelKeyDown$}
        {...rest}
      >
        <Slot />
      </aside>
    </OverlayPortal>
  );
});
