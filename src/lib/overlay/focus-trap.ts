/**
 * Minimal focus trap utilities (OV3) — no dependencies.
 * Used by modal overlay widgets; not exported publicly.
 */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/** Focusable descendants of `root` suitable for dialog focus trap. */
export function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => {
      if (element.hasAttribute("disabled")) return false;
      if (element.getAttribute("aria-hidden") === "true") return false;
      return element.tabIndex !== -1;
    },
  );
}

/** Focus the first focusable element inside `root`, or `root` if none. */
export function focusFirstElement(root: HTMLElement): void {
  const focusables = getFocusableElements(root);
  const target = focusables[0] ?? root;
  if (typeof target.focus === "function") {
    target.focus();
  }
}

/**
 * Keep Tab / Shift+Tab within `container` (OV3).
 * Attach to `keydown` on the container or document.
 */
export function handleFocusTrapKeydown(
  container: HTMLElement,
  event: KeyboardEvent,
): void {
  if (event.key !== "Tab") {
    return;
  }

  const focusables = getFocusableElements(container);
  if (focusables.length === 0) {
    event.preventDefault();
    container.focus();
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement as HTMLElement | null;

  if (event.shiftKey) {
    if (active === first || !container.contains(active)) {
      event.preventDefault();
      last.focus();
    }
    return;
  }

  if (active === last) {
    event.preventDefault();
    first.focus();
  }
}
