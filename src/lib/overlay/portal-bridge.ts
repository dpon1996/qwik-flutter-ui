/**
 * In-tree portal content bridge (OV1) — maps layer ids to content components
 * rendered inside `#qfu-overlay-root`. Not exported publicly.
 */

import type { Component, CSSProperties } from "@builder.io/qwik";

import type { OverlayLayerId } from "./internal-types";

export interface PortalBridgeEntry {
  zIndex: number;
  modal: boolean;
  /** Captures `<Slot />` from the `OverlayPortal` invocation site. */
  Content: Component<Record<string, never>>;
  class?: string;
  style?: CSSProperties;
}

export interface PortalBridgeStore {
  entries: Record<OverlayLayerId, PortalBridgeEntry>;
}

export function createPortalBridgeStore(): PortalBridgeStore {
  return { entries: {} };
}

export function setPortalBridgeEntry(
  store: PortalBridgeStore,
  layerId: OverlayLayerId,
  entry: PortalBridgeEntry,
): void {
  store.entries[layerId] = entry;
}

export function removePortalBridgeEntry(
  store: PortalBridgeStore,
  layerId: OverlayLayerId,
): void {
  delete store.entries[layerId];
}

export function getPortalBridgeEntry(
  store: PortalBridgeStore,
  layerId: OverlayLayerId,
): PortalBridgeEntry | undefined {
  return store.entries[layerId];
}
