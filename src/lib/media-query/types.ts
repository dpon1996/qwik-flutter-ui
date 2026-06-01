/**
 * `MediaQuery` types. See `docs/API_DESIGN.md` §25.
 */

import type { BaseProps } from "../_shared/types";
import type { Breakpoint, Orientation } from "../_shared/enums";

/** Viewport metrics and breakpoint tier. Flutter `MediaQueryData` analogue (subset). */
export interface MediaQueryData {
  /** Viewport width in CSS pixels (`window.innerWidth`). */
  width: number;
  /** Viewport height in CSS pixels (`window.innerHeight`). */
  height: number;
  /** Viewport aspect — not layout `Axis`. */
  orientation: Orientation;
  /** Active tier. Authoritative (§27 M10-C). */
  breakpoint: Breakpoint;
  /** Derived: `breakpoint === Breakpoint.mobile`. */
  isMobile: boolean;
  /** Derived: `breakpoint === Breakpoint.tablet`. */
  isTablet: boolean;
  /** Derived: `breakpoint === Breakpoint.desktop`. */
  isDesktop: boolean;
}

/** Width thresholds (px) for `Breakpoint` classification (§27 M2). */
export interface MediaQueryBreakpoints {
  mobileMax: number;
  tabletMax: number;
}

export interface MediaQueryProps extends BaseProps {
  /** SSR / first-paint when `window` is unavailable (§27 M1). */
  initialData?: Partial<MediaQueryData>;
  /** Override default thresholds; invalid config → §27 M11. */
  breakpoints?: Partial<MediaQueryBreakpoints>;
}
