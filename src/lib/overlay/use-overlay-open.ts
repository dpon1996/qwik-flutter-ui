/**
 * Controlled / uncontrolled open state for overlay widgets (§77).
 * Internal — not exported from `src/index.ts`.
 */

import {
  $,
  useComputed$,
  useSignal,
  type QRL,
  type Signal,
} from "@builder.io/qwik";

import type { OverlayDismissReason } from "../_shared";
import type { OverlayOpenProps } from "../_shared/overlay-types";

export interface UseOverlayOpenResult {
  isOpen: Signal<boolean>;
  setOpen: QRL<(open: boolean, reason?: OverlayDismissReason) => void>;
}

/**
 * Pass the widget's `props` object — read `props.open` inside reactive
 * contexts; do not destructure `open` before calling this hook.
 */
export function useOverlayOpen(props: OverlayOpenProps): UseOverlayOpenResult {
  const internalOpen = useSignal(props.defaultOpen ?? false);

  const isOpen = useComputed$(() => {
    if (props.open !== undefined) {
      return props.open;
    }
    return internalOpen.value;
  });

  const setOpen = $((next: boolean, reason?: OverlayDismissReason) => {
    if (props.open === undefined) {
      internalOpen.value = next;
    }
    if (props.onOpenChange$) {
      void props.onOpenChange$(next, reason);
    }
  });

  return { isOpen, setOpen };
}
