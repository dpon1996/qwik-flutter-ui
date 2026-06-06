/**
 * `OverlayContainer` — public overlay host (§74, OV1–OV2, OV11, OV13 foundation).
 *
 * - Renders in-tree portal host for SSR (`#qfu-overlay-root`).
 * - Central z-index allocation (OV2) via internal context.
 * - Layer registration API for future overlay widgets.
 * - No browser APIs during render (Principle #4).
 */

import {
  $,
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
  type CSSProperties,
} from "@builder.io/qwik";

import type { OverlayContainerProps } from "../_shared/overlay-types";

import {
  CSS_VAR_OVERLAY_Z_BASE,
  DEFAULT_OVERLAY_Z_INDEX_BASE,
  OVERLAY_HOST_DATA_ATTR,
  OVERLAY_HOST_ID,
} from "./constants";
import { OverlayContext } from "./context";
import {
  setExplicitOverlayHostActive,
} from "./explicit-host-registry";
import type {
  OverlayAccessibilityState,
  OverlayContextValue,
  OverlayLayerHandle,
  RegisterLayerOptions,
} from "./internal-types";
import {
  allocateLayerZIndex,
  createLayerStackStore,
  findLayer,
  getTopLayerId,
  getTopModalLayerId,
  hasModalLayers,
  pushLayer,
  removeLayer,
  type LayerStackStore,
} from "./layer-stack";
import { OverlayPortalHost } from "./overlay-portal-host";
import { createPortalBridgeStore } from "./portal-bridge";
import { OverlayPortalBridgeContext } from "./portal-bridge-context";

import styles from "./overlay-container.module.css";

export const OverlayContainer = component$<OverlayContainerProps>((props) => {
  const {
    zIndexBase = DEFAULT_OVERLAY_Z_INDEX_BASE,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const stack = useStore<LayerStackStore>(() =>
    createLayerStackStore(zIndexBase),
  );

  const portalBridge = useStore(() => createPortalBridgeStore());

  useVisibleTask$(({ cleanup }) => {
    setExplicitOverlayHostActive(true);
    cleanup(() => {
      setExplicitOverlayHostActive(false);
    });
  });

  /** OV6 — lock document scroll while any modal layer is open. */
  useVisibleTask$(({ track, cleanup }) => {
    track(() => stack.layers.filter((layer) => layer.modal).length);

    const modalCount = stack.layers.filter((layer) => layer.modal).length;
    if (modalCount === 0) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    cleanup(() => {
      document.body.style.overflow = previousOverflow;
    });
  });

  const registerLayer$ = $(
    async (options: RegisterLayerOptions): Promise<OverlayLayerHandle> => {
      const existing = findLayer(stack, options.id);
      if (existing) {
        return {
          id: existing.id,
          zIndex: existing.zIndex,
          unregister: () => {
            removeLayer(stack, options.id);
          },
        };
      }

      const zIndex = allocateLayerZIndex(stack);
      const entry = {
        id: options.id,
        zIndex,
        modal: options.modal === true,
      };
      pushLayer(stack, entry);

      return {
        id: entry.id,
        zIndex: entry.zIndex,
        unregister: () => {
          removeLayer(stack, entry.id);
        },
      };
    },
  );

  const unregisterLayer$ = $((id: string) => {
    removeLayer(stack, id);
  });

  const getLayerZIndex$ = $((id: string) => {
    return findLayer(stack, id)?.zIndex;
  });

  const getTopModalLayerId$ = $(() => {
    return getTopModalLayerId(stack);
  });

  const getTopLayerId$ = $(() => {
    return getTopLayerId(stack);
  });

  const hasModalLayers$ = $(() => {
    return hasModalLayers(stack);
  });

  const getAccessibilityState$ = $((): OverlayAccessibilityState => {
    return {
      focusTrapLayerId: stack.focusTrapLayerId,
      focusRestoreLayerId: stack.focusRestoreLayerId,
    };
  });

  const requestFocusTrap$ = $((_layerId: string) => {
    /* Phase 3+ — OV3 */
  });

  const requestFocusRestore$ = $((_layerId: string) => {
    /* Phase 3+ — OV3 */
  });

  const notifyEscapeKey$ = $(() => {
    /* Phase 3+ — escape on topmost dismissible layer */
  });

  const contextValue: OverlayContextValue = {
    hostId: OVERLAY_HOST_ID,
    zIndexBase,
    registerLayer$,
    unregisterLayer$,
    getLayerZIndex$,
    getTopModalLayerId$,
    getTopLayerId$,
    hasModalLayers$,
    getAccessibilityState$,
    requestFocusTrap$,
    requestFocusRestore$,
    notifyEscapeKey$,
  };

  useContextProvider(OverlayContext, contextValue);
  useContextProvider(OverlayPortalBridgeContext, portalBridge);

  const style: CSSProperties = {
    [CSS_VAR_OVERLAY_Z_BASE]: String(zIndexBase),
    ...(userStyle as CSSProperties | undefined),
  };

  return (
    <div class={[styles.root, className].filter(Boolean).join(" ")} style={style} {...rest}>
      <Slot />
      <div
        id={OVERLAY_HOST_ID}
        {...{ [OVERLAY_HOST_DATA_ATTR]: "" }}
        class={styles.host}
        aria-hidden={stack.layers.length === 0 ? "true" : undefined}
      >
        <OverlayPortalHost stack={stack} />
      </div>
    </div>
  );
});
