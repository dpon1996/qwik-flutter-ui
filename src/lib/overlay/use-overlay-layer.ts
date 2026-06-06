/**
 * Internal `useOverlayLayer` — layer registration + metadata (§75).
 * Not exported from `src/index.ts`.
 */

import {
  useContext,
  useSignal,
  useVisibleTask$,
  type Signal,
} from "@builder.io/qwik";

import { OverlayContext } from "./context";
import { ensureFallbackOverlayHost } from "./explicit-host-registry";
import type {
  OverlayContextValue,
  OverlayLayerLifecycleStatus,
  OverlayLayerMetadata,
  RegisterLayerOptions,
} from "./internal-types";

const NO_OVERLAY_CONTEXT = null;

/**
 * Returns overlay context when inside `<OverlayContainer>`, else `null`.
 */
export function useOverlayContext(): OverlayContextValue | null {
  const ctx = useContext(OverlayContext, NO_OVERLAY_CONTEXT);
  if (ctx === NO_OVERLAY_CONTEXT) {
    ensureFallbackOverlayHost();
    return null;
  }
  return ctx;
}

export interface UseOverlayLayerResult {
  context: OverlayContextValue | null;
  layerId: string;
  status: Signal<OverlayLayerLifecycleStatus>;
  zIndex: Signal<number | undefined>;
  metadata: Signal<OverlayLayerMetadata | null>;
}

/**
 * Registers a layer while `open` is true (client only). Unregisters on close/cleanup.
 * Pass `open` directly from props for reactive tracking.
 */
export function useOverlayLayer(
  layerId: string,
  portalProps: { open: boolean },
  modal?: boolean,
): UseOverlayLayerResult {
  const ctx = useOverlayContext();
  const status = useSignal<OverlayLayerLifecycleStatus>("idle");
  const zIndex = useSignal<number | undefined>(undefined);
  const metadata = useSignal<OverlayLayerMetadata | null>(null);

  useVisibleTask$(({ track, cleanup }) => {
    track(() => portalProps.open);
    track(() => layerId);
    track(() => modal);

    if (!ctx || !portalProps.open) {
      status.value = "idle";
      zIndex.value = undefined;
      metadata.value = null;
      return;
    }

    let unregister: (() => void) | undefined;
    let cancelled = false;

    status.value = "mounting";

    const registerOptions: RegisterLayerOptions = {
      id: layerId,
      modal,
    };

    void ctx.registerLayer$(registerOptions).then(async (handle) => {
      if (cancelled) {
        handle.unregister();
        return;
      }

      zIndex.value = handle.zIndex;
      status.value = "active";

      metadata.value = {
        layerId: handle.id,
        zIndex: handle.zIndex,
        modal: modal === true,
        hostId: ctx.hostId,
        status: "active",
        topModalLayerId: await ctx.getTopModalLayerId$(),
        hasModalLayers: await ctx.hasModalLayers$(),
      };

      unregister = handle.unregister;
    });

    cleanup(() => {
      cancelled = true;
      status.value = "unregistering";
      unregister?.();
      unregister = undefined;
      zIndex.value = undefined;
      metadata.value = null;
      status.value = "idle";
    });
  });

  return {
    context: ctx,
    layerId,
    status,
    zIndex,
    metadata,
  };
}
