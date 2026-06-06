/**
 * Menu list helpers (§83.2) — DOM queries for roving focus navigation.
 */

/** Enabled `[role="menuitem"]` nodes inside a menu list. */
export function getEnabledMenuItems(menuEl: HTMLElement): HTMLElement[] {
  return Array.from(
    menuEl.querySelectorAll<HTMLElement>('[role="menuitem"]'),
  ).filter((element) => element.getAttribute("aria-disabled") !== "true");
}
