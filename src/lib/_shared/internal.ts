/**
 * qwik-flutter-ui — internal helpers
 *
 * Cross-widget implementation helpers. **NOT part of the public API** —
 * deliberately excluded from `_shared/index.ts` so consumers can't import
 * them from the package root. Widgets import directly:
 *
 *     import { toLength } from "../_shared/internal";
 *
 * Anything added here should be:
 *  - Pure (no side effects, no Qwik APIs).
 *  - Used by ≥ 2 widget implementations.
 *  - Stable enough that an internal-only refactor wouldn't break anyone.
 */

import type { Length } from "./types";

/**
 * Convert a `Length` to a CSS string. Numbers become `<n>px`; strings pass
 * through verbatim. See `docs/API_DESIGN.md` §0.4 for the `Length` contract.
 *
 *     toLength(8)       // "8px"
 *     toLength("50%")   // "50%"
 *     toLength("auto")  // "auto"
 */
export const toLength = (v: Length): string =>
  typeof v === "number" ? `${v}px` : v;
