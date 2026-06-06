/**
 * Internal overlay types — not exported from the package entry (§73.2).
 */

import type { CSSProperties, QRL } from "@builder.io/qwik";

/** Stable layer id supplied by the registering widget (e.g. `useId()`). */
export type OverlayLayerId = string;

/** Options for {@link OverlayContextValue.registerLayer$}. */
export interface RegisterLayerOptions {
  id: OverlayLayerId;
  /**
   * When `true`, layer participates in the modal stack (focus trap, scroll lock,
   * escape routing) when those behaviors are implemented (§74, OV3, OV6, OV7).
   */
  modal?: boolean;
}

/** One entry in the container layer stack (OV2). */
export interface OverlayLayerEntry {
  id: OverlayLayerId;
  zIndex: number;
  modal: boolean;
}

/** Returned from `registerLayer$` — includes allocated z-index (OV2). */
export interface OverlayLayerHandle {
  id: OverlayLayerId;
  zIndex: number;
  unregister: () => void;
}

/**
 * Layer lifecycle for `useOverlayLayer` / `OverlayPortal` (Phase 3).
 * Unmount is immediate when `open` becomes false (OV15).
 */
export type OverlayLayerLifecycleStatus =
  | "idle"
  | "mounting"
  | "active"
  | "unregistering";

/** Metadata exposed to future overlay widgets (§84 — no behavior here). */
export interface OverlayLayerMetadata {
  layerId: OverlayLayerId;
  zIndex: number;
  modal: boolean;
  hostId: string;
  status: OverlayLayerLifecycleStatus;
  /** Topmost modal layer id when this layer is active (OV7). */
  topModalLayerId: OverlayLayerId | null;
  /** Whether any modal layer is on the stack (OV6 scroll lock, future). */
  hasModalLayers: boolean;
}

/** Internal `OverlayPortal` props (§75) — not a public export. */
export interface OverlayPortalProps {
  /** When `false`, portal content is not mounted (OV15). */
  open: boolean;
  /** Stable id; defaults to `useId()` when omitted. */
  layerId?: OverlayLayerId;
  modal?: boolean;
  class?: string;
  style?: CSSProperties;
}

/**
 * Reserved accessibility coordination (§84) — behavior deferred to overlay widgets.
 * Stored on context for future focus trap / restore / escape (OV3).
 */
export interface OverlayAccessibilityState {
  /** Topmost modal layer that should own the focus trap when implemented. */
  focusTrapLayerId: OverlayLayerId | null;
  /** Layer scheduled to restore focus to its trigger when implemented. */
  focusRestoreLayerId: OverlayLayerId | null;
}

/** Internal overlay context — not exported from `src/index.ts` (§73.2). */
export interface OverlayContextValue {
  readonly hostId: string;
  readonly zIndexBase: number;

  registerLayer$: QRL<
    (options: RegisterLayerOptions) => Promise<OverlayLayerHandle>
  >;
  unregisterLayer$: QRL<(id: OverlayLayerId) => void>;

  /** Monotonic z-index for a registered layer, or `undefined` if not found. */
  getLayerZIndex$: QRL<(id: OverlayLayerId) => number | undefined>;

  /** Topmost modal layer in stack order (OV7), or `null`. */
  getTopModalLayerId$: QRL<() => OverlayLayerId | null>;

  /** Topmost layer of any kind (escape target when implemented). */
  getTopLayerId$: QRL<() => OverlayLayerId | null>;

  /** Whether any modal layer is registered (scroll lock when implemented, OV6). */
  hasModalLayers$: QRL<() => boolean>;

  /** Read-only accessibility ownership snapshot (architecture only in Phase 2). */
  getAccessibilityState$: QRL<() => OverlayAccessibilityState>;

  /**
   * Reserved — trap focus within `layerId` (OV3, Phase 3+).
   * No-op in Phase 2.
   */
  requestFocusTrap$: QRL<(layerId: OverlayLayerId) => void>;

  /**
   * Reserved — restore focus after `layerId` closes (OV3, Phase 3+).
   * No-op in Phase 2.
   */
  requestFocusRestore$: QRL<(layerId: OverlayLayerId) => void>;

  /**
   * Reserved — topmost layer escape routing (§74, Phase 3+).
   * No-op in Phase 2.
   */
  notifyEscapeKey$: QRL<() => void>;
}
