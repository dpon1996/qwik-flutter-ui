/**
 * Pure layer-stack helpers (OV2) — central z-index allocation on the container.
 */

import type { OverlayLayerEntry, OverlayLayerId } from "./internal-types";

export interface LayerStackStore {
  zIndexBase: number;
  /** Increments for each registration; never reused in the same container session. */
  nextZIndexOffset: number;
  layers: OverlayLayerEntry[];
  focusTrapLayerId: OverlayLayerId | null;
  focusRestoreLayerId: OverlayLayerId | null;
}

export function createLayerStackStore(zIndexBase: number): LayerStackStore {
  return {
    zIndexBase,
    nextZIndexOffset: 1,
    layers: [],
    focusTrapLayerId: null,
    focusRestoreLayerId: null,
  };
}

/** Allocate the next z-index from the container counter (OV2). */
export function allocateLayerZIndex(stack: LayerStackStore): number {
  const zIndex = stack.zIndexBase + stack.nextZIndexOffset;
  stack.nextZIndexOffset += 1;
  return zIndex;
}

export function findLayer(
  stack: LayerStackStore,
  id: OverlayLayerId,
): OverlayLayerEntry | undefined {
  return stack.layers.find((layer) => layer.id === id);
}

export function removeLayer(stack: LayerStackStore, id: OverlayLayerId): void {
  const index = stack.layers.findIndex((layer) => layer.id === id);
  if (index >= 0) {
    stack.layers.splice(index, 1);
  }
  syncModalAccessibilityOwners(stack);
}

export function pushLayer(
  stack: LayerStackStore,
  entry: OverlayLayerEntry,
): void {
  stack.layers.push(entry);
  syncModalAccessibilityOwners(stack);
}

/** Topmost modal layer (OV7) or `null`. */
export function getTopModalLayerId(
  stack: LayerStackStore,
): OverlayLayerId | null {
  for (let i = stack.layers.length - 1; i >= 0; i -= 1) {
    if (stack.layers[i].modal) {
      return stack.layers[i].id;
    }
  }
  return null;
}

/** Topmost layer of any kind. */
export function getTopLayerId(stack: LayerStackStore): OverlayLayerId | null {
  const last = stack.layers[stack.layers.length - 1];
  return last?.id ?? null;
}

export function hasModalLayers(stack: LayerStackStore): boolean {
  return stack.layers.some((layer) => layer.modal);
}

/** Update focus ownership placeholders when the modal stack changes (architecture only). */
export function syncModalAccessibilityOwners(stack: LayerStackStore): void {
  const topModal = getTopModalLayerId(stack);
  stack.focusTrapLayerId = topModal;
  if (topModal === null) {
    stack.focusRestoreLayerId = null;
  }
}
