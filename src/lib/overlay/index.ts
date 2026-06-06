/**
 * Overlay infrastructure barrel — public surface (§73.2).
 *
 * Export `OverlayContainer` only. Context, layer registry, and `useOverlayLayer`
 * remain internal.
 */

export { OverlayContainer } from "./overlay-container";
export type { OverlayContainerProps } from "../_shared/overlay-types";
