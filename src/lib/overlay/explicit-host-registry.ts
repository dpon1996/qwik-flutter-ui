/**
 * OV13 — explicit `OverlayContainer` presence (client-only flag).
 *
 * Updated only from `useVisibleTask$` in `OverlayContainer` so SSR render stays
 * free of browser globals.
 */

let explicitOverlayHostActive = false;

/** Mark whether an explicit in-tree host is mounted (client hydration). */
export function setExplicitOverlayHostActive(active: boolean): void {
  explicitOverlayHostActive = active;
}

/** `true` after an explicit `<OverlayContainer>` has mounted on the client. */
export function isExplicitOverlayHostActive(): boolean {
  return explicitOverlayHostActive;
}
