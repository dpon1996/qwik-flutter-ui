/**
 * `Tooltip` — hover/focus anchored hint (§81, OV10, OV15).
 *
 * Non-modal overlay via `OverlayPortal` + `useOverlayLayer`. v1.7: hover + focus
 * only; no touch long-press, collision engine, or follow-cursor (§81.1).
 */

import {
  $,
  Slot,
  component$,
  useComputed$,
  useId,
  useSignal,
  useVisibleTask$,
  type CSSProperties,
} from "@builder.io/qwik";

import {
  OverlayPlacement,
  OverlayTrigger,
} from "../_shared/enums";

import { OverlayPortal } from "../overlay/overlay-portal";

import { computeTooltipPosition } from "./position";
import styles from "./tooltip.module.css";
import type { TooltipProps } from "./types";

const DEFAULT_DELAY_MS = 700;

export const Tooltip = component$<TooltipProps>((props) => {
  const {
    content,
    open: _open,
    defaultOpen: _defaultOpen,
    onOpenChange$: _onOpenChange$,
    delayDuration: _delayDuration,
    placement: _placement,
    trigger: _trigger,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const delayDuration = props.delayDuration ?? DEFAULT_DELAY_MS;
  const trigger = props.trigger;

  const triggerRef = useSignal<HTMLElement | undefined>();
  const tooltipRef = useSignal<HTMLElement | undefined>();
  const tooltipId = useId();
  const layerId = useId();

  const internalOpen = useSignal(props.defaultOpen ?? false);

  const isOpen = useComputed$(() => {
    if (props.open !== undefined) {
      return props.open;
    }
    return internalOpen.value;
  });

  const setOpen = $((next: boolean) => {
    if (props.open === undefined) {
      internalOpen.value = next;
    }
    if (props.onOpenChange$) {
      void props.onOpenChange$!(next);
    }
  });

  const coordinates = useSignal({ top: 0, left: 0 });

  const enableHover =
    trigger === undefined || trigger === OverlayTrigger.hover;
  const enableFocus =
    trigger === undefined || trigger === OverlayTrigger.focus;

  useVisibleTask$(({ track, cleanup }) => {
    track(() => trigger);
    track(() => delayDuration);

    const triggerEl = triggerRef.value;
    if (!triggerEl) {
      return;
    }

    let showTimer: number | undefined;
    let pointerInside = false;
    let focusInside = false;

    const clearShowTimer = () => {
      if (showTimer !== undefined) {
        window.clearTimeout(showTimer);
        showTimer = undefined;
      }
    };

    const syncOpen = () => {
      const shouldShow = pointerInside || focusInside;
      if (shouldShow) {
        clearShowTimer();
        showTimer = window.setTimeout(() => {
          void setOpen(true);
        }, delayDuration);
        return;
      }
      clearShowTimer();
      void setOpen(false);
    };

    const onPointerEnter = () => {
      pointerInside = true;
      syncOpen();
    };

    const onPointerLeave = () => {
      pointerInside = false;
      syncOpen();
    };

    const onFocusIn = () => {
      focusInside = true;
      syncOpen();
    };

    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget;
      if (next && triggerEl.contains(next as Node)) {
        return;
      }
      focusInside = false;
      syncOpen();
    };

    if (enableHover) {
      triggerEl.addEventListener("mouseenter", onPointerEnter);
      triggerEl.addEventListener("mouseleave", onPointerLeave);
    }

    if (enableFocus) {
      triggerEl.addEventListener("focusin", onFocusIn);
      triggerEl.addEventListener("focusout", onFocusOut);
    }

    cleanup(() => {
      clearShowTimer();
      if (enableHover) {
        triggerEl.removeEventListener("mouseenter", onPointerEnter);
        triggerEl.removeEventListener("mouseleave", onPointerLeave);
      }
      if (enableFocus) {
        triggerEl.removeEventListener("focusin", onFocusIn);
        triggerEl.removeEventListener("focusout", onFocusOut);
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
      const tooltipEl = tooltipRef.value;
      if (!triggerEl || !tooltipEl) {
        return;
      }

      coordinates.value = computeTooltipPosition(
        triggerEl.getBoundingClientRect(),
        tooltipEl.getBoundingClientRect(),
        props.placement ?? OverlayPlacement.top,
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

  const tooltipStyle: CSSProperties = {
    top: `${coordinates.value.top}px`,
    left: `${coordinates.value.left}px`,
    ...(userStyle as CSSProperties | undefined),
  };

  const triggerClass = [styles.triggerWrap, className]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <span
        ref={triggerRef}
        class={triggerClass}
        aria-describedby={isOpen.value ? tooltipId : undefined}
        {...rest}
      >
        <Slot />
      </span>
      <OverlayPortal
        open={isOpen.value}
        modal={false}
        layerId={layerId}
        class={styles.portal}
      >
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          class={styles.tooltip}
          style={tooltipStyle}
        >
          {content}
        </div>
      </OverlayPortal>
    </>
  );
});
