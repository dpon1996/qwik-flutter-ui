/**
 * OV13 — implicit overlay host when no explicit `<OverlayContainer>` exists.
 *
 * Client-only singleton appended to `document.body`. No SSR markup. One-time dev
 * warning recommending explicit container for SSR and theme inheritance (§74.3).
 */

import { $ } from "@builder.io/qwik";

import {
  CSS_VAR_OVERLAY_Z_BASE,
  DEFAULT_OVERLAY_Z_INDEX_BASE,
  OVERLAY_HOST_DATA_ATTR,
} from "./constants";
import { isExplicitOverlayHostActive } from "./explicit-host-registry";
import type {
  OverlayAccessibilityState,
  OverlayContextValue,
  OverlayLayerHandle,
  OverlayLayerId,
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
} from "./layer-stack";

/** DOM `id` for the implicit fallback host (OV13). */
export const FALLBACK_OVERLAY_HOST_ID = "qfu-overlay-root-fallback";

const stack = createLayerStackStore(DEFAULT_OVERLAY_Z_INDEX_BASE);

let hostElement: HTMLDivElement | null = null;
let warnedOnce = false;
let scrollLocked = false;
let previousBodyOverflow = "";

let cachedContext: OverlayContextValue | null = null;

function syncFallbackScrollLock(): void {
  const modalCount = stack.layers.filter((layer) => layer.modal).length;
  if (modalCount > 0) {
    if (!scrollLocked) {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      scrollLocked = true;
    }
    return;
  }

  if (scrollLocked) {
    document.body.style.overflow = previousBodyOverflow;
    scrollLocked = false;
  }
}

function syncHostAriaHidden(): void {
  if (!hostElement) {
    return;
  }
  hostElement.setAttribute(
    "aria-hidden",
    stack.layers.length === 0 ? "true" : "false",
  );
}

function mountFallbackHost(): HTMLDivElement {
  if (hostElement) {
    return hostElement;
  }

  const element = document.createElement("div");
  element.id = FALLBACK_OVERLAY_HOST_ID;
  element.setAttribute(OVERLAY_HOST_DATA_ATTR, "");
  element.setAttribute("data-qfu-overlay-fallback", "");
  element.style.position = "fixed";
  element.style.inset = "0";
  element.style.pointerEvents = "none";
  element.style.zIndex = String(DEFAULT_OVERLAY_Z_INDEX_BASE);
  element.style.setProperty(
    CSS_VAR_OVERLAY_Z_BASE,
    String(DEFAULT_OVERLAY_Z_INDEX_BASE),
  );
  element.setAttribute("aria-hidden", "true");
  document.body.appendChild(element);
  hostElement = element;
  return element;
}

function unregisterLayer(id: OverlayLayerId): void {
  removeLayer(stack, id);
  syncFallbackScrollLock();
  syncHostAriaHidden();
}

const registerLayer$ = $(
  async (options: RegisterLayerOptions): Promise<OverlayLayerHandle> => {
    const existing = findLayer(stack, options.id);
    if (existing) {
      return {
        id: existing.id,
        zIndex: existing.zIndex,
        unregister: () => {
          unregisterLayer(options.id);
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
    syncFallbackScrollLock();
    syncHostAriaHidden();

    return {
      id: entry.id,
      zIndex: entry.zIndex,
      unregister: () => {
        unregisterLayer(entry.id);
      },
    };
  },
);

const unregisterLayer$ = $((id: OverlayLayerId) => {
  unregisterLayer(id);
});

const getLayerZIndex$ = $((id: OverlayLayerId) => {
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

const requestFocusTrap$ = $((_layerId: OverlayLayerId) => {
  /* OV3 — widgets own trap until container coordinator ships */
});

const requestFocusRestore$ = $((_layerId: OverlayLayerId) => {
  /* OV3 — widgets own restore until container coordinator ships */
});

const notifyEscapeKey$ = $(() => {
  /* Phase 3+ — escape on topmost dismissible layer */
});

function createFallbackContext(): OverlayContextValue {
  return {
    hostId: FALLBACK_OVERLAY_HOST_ID,
    zIndexBase: DEFAULT_OVERLAY_Z_INDEX_BASE,
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
}

/**
 * Ensure the implicit overlay host exists on the client when no explicit
 * `<OverlayContainer>` is mounted. Returns overlay context or `null` on SSR /
 * when an explicit host is active (caller should use tree context instead).
 */
export function ensureFallbackOverlayHost(): OverlayContextValue | null {
  if (isExplicitOverlayHostActive()) {
    return null;
  }

  if (import.meta.env.SSR || typeof document === "undefined") {
    return null;
  }

  if (!warnedOnce) {
    warnedOnce = true;
    console.warn(
      "[qwik-flutter-ui] No <OverlayContainer> detected. Using an implicit overlay host on document.body (OV13). For SSR predictability and theme inheritance, wrap your app with <OverlayContainer> inside <ThemeProvider>.",
    );
  }

  mountFallbackHost();

  if (!cachedContext) {
    cachedContext = createFallbackContext();
  }

  return cachedContext;
}
