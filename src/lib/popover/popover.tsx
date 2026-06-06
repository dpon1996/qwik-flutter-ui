/**
 * `Popover` — non-modal anchored panel (§82, OV10, OV15).
 *
 * Trigger + content slots; `OverlayPortal` + layer stack. v1.7: click + manual
 * triggers; outside pointer + escape dismiss; no modal focus trap.
 */

import {
  $,
  Slot,
  component$,
  useId,
  useSignal,
  useVisibleTask$,
  type CSSProperties,
} from "@builder.io/qwik";

import { OverlayDismissReason, OverlayTrigger } from "../_shared/enums";
import { computeAnchorPosition } from "../overlay/anchor-position";
import { focusFirstElement } from "../overlay/focus-trap";
import { OverlayPortal } from "../overlay/overlay-portal";
import { useOverlayContext } from "../overlay/use-overlay-layer";
import { useOverlayOpen } from "../overlay/use-overlay-open";

import styles from "./popover.module.css";
import type { PopoverProps } from "./types";

export const Popover = component$<PopoverProps>((props) => {
  const {
    open: _open,
    defaultOpen: _defaultOpen,
    onOpenChange$: _onOpenChange$,
    placement: _placement,
    trigger: _trigger,
    dismissOnEscape = true,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const triggerMode = props.trigger ?? OverlayTrigger.click;

  const triggerRef = useSignal<HTMLElement | undefined>();
  const panelRef = useSignal<HTMLElement | undefined>();
  const panelId = useId();
  const layerId = useId();

  const { isOpen, setOpen } = useOverlayOpen(props);
  const overlayContext = useOverlayContext();

  const coordinates = useSignal({ top: 0, left: 0 });

  const closePopover = $((reason: OverlayDismissReason) => {
    void setOpen(false, reason);
  });

  const onTriggerClick$ = $(() => {
    if (triggerMode !== OverlayTrigger.click) {
      return;
    }
    void setOpen(!isOpen.value, OverlayDismissReason.programmatic);
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

    const setup = () => {
      const panel = panelRef.value;
      if (!panel || disposed) {
        return;
      }

      previousFocus = document.activeElement as HTMLElement | null;
      focusFirstElement(panel);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !dismissOnEscape) {
        return;
      }

      void overlayContext?.getTopLayerId$().then((topLayerId) => {
        if (topLayerId === layerId) {
          event.preventDefault();
          event.stopPropagation();
          void closePopover(OverlayDismissReason.escape);
        }
      });
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const triggerEl = triggerRef.value;
      const panelEl = panelRef.value;
      if (triggerEl?.contains(target) || panelEl?.contains(target)) {
        return;
      }

      void overlayContext?.getTopLayerId$().then((topLayerId) => {
        if (topLayerId === layerId) {
          void closePopover(OverlayDismissReason.outsidePointer);
        }
      });
    };

    const raf = requestAnimationFrame(setup);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);

    cleanup(() => {
      disposed = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
      if (
        previousFocus &&
        typeof previousFocus.focus === "function" &&
        document.contains(previousFocus)
      ) {
        previousFocus.focus();
      }
    });
  });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => isOpen.value);
    track(() => props.placement);

    if (!isOpen.value) {
      return;
    }

    const updatePosition = () => {
      const triggerEl = triggerRef.value;
      const panelEl = panelRef.value;
      if (!triggerEl || !panelEl) {
        return;
      }

      coordinates.value = computeAnchorPosition(
        triggerEl.getBoundingClientRect(),
        panelEl.getBoundingClientRect(),
        props.placement,
      );
    };

    const raf = requestAnimationFrame(updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    cleanup(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    });
  });

  const panelStyle: CSSProperties = {
    top: `${coordinates.value.top}px`,
    left: `${coordinates.value.left}px`,
    ...(userStyle as CSSProperties | undefined),
  };

  const triggerClass = [styles.triggerWrap, className].filter(Boolean).join(" ");

  return (
    <>
      <span
        ref={triggerRef}
        class={triggerClass}
        aria-expanded={isOpen.value ? "true" : "false"}
        aria-controls={isOpen.value ? panelId : undefined}
        onClick$={triggerMode === OverlayTrigger.click ? onTriggerClick$ : undefined}
        {...rest}
      >
        <Slot name="trigger" />
      </span>
      <OverlayPortal
        open={isOpen.value}
        modal={false}
        layerId={layerId}
        class={styles.portal}
      >
        <div
          ref={panelRef}
          id={panelId}
          class={styles.panel}
          style={panelStyle}
          tabIndex={-1}
        >
          <Slot />
        </div>
      </OverlayPortal>
    </>
  );
});
