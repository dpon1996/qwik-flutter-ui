/**
 * `useMediaQuery` and viewport classification helpers.
 * Flutter `MediaQuery.of(context)` → `useMediaQuery()`. See `docs/API_DESIGN.md` §25.
 */

import { useContext } from "@builder.io/qwik";

import { Breakpoint, Orientation } from "../_shared/enums";

import { MediaQueryContext } from "./context";
import type {
  MediaQueryBreakpoints,
  MediaQueryData,
} from "./types";

/** Default thresholds (§27 M2). */
export const DEFAULT_BREAKPOINTS: MediaQueryBreakpoints = {
  mobileMax: 599,
  tabletMax: 1023,
};

/** SSR / hook-outside-provider defaults (§27 M1). */
export const DEFAULT_MEDIA_QUERY_DATA: MediaQueryData = buildMediaQueryData(
  360,
  640,
  DEFAULT_BREAKPOINTS,
);

let warnedOutsideProvider = false;

/**
 * Reads `MediaQueryData` from the nearest `<MediaQuery>` provider.
 * Outside a provider: returns {@link DEFAULT_MEDIA_QUERY_DATA} + dev warning (§27 M6).
 */
export function useMediaQuery(): MediaQueryData {
  const ctx = useContext(MediaQueryContext);
  if (ctx) {
    return ctx;
  }

  if (import.meta.env.DEV && !warnedOutsideProvider) {
    warnedOutsideProvider = true;
    console.warn(
      "[useMediaQuery] No ancestor <MediaQuery> provider; using default MediaQueryData.",
    );
  }

  return DEFAULT_MEDIA_QUERY_DATA;
}

/** §27 M11 — merge, validate, fallback to defaults. */
export function resolveBreakpoints(
  partial?: Partial<MediaQueryBreakpoints>,
): MediaQueryBreakpoints {
  const merged: MediaQueryBreakpoints = {
    ...DEFAULT_BREAKPOINTS,
    ...partial,
  };

  if (isValidBreakpoints(merged)) {
    return merged;
  }

  if (import.meta.env.DEV) {
    console.warn(
      "[MediaQuery] Invalid breakpoints config; using defaults.",
      partial,
    );
  }

  return { ...DEFAULT_BREAKPOINTS };
}

function isValidBreakpoints(b: MediaQueryBreakpoints): boolean {
  return (
    Number.isFinite(b.mobileMax) &&
    Number.isFinite(b.tabletMax) &&
    b.mobileMax >= 0 &&
    b.tabletMax >= 0 &&
    b.tabletMax > b.mobileMax
  );
}

/** `width >= height` → landscape (square → landscape per implementation spec). */
export function resolveOrientation(
  width: number,
  height: number,
): Orientation {
  return width >= height ? Orientation.landscape : Orientation.portrait;
}

export function classifyBreakpoint(
  width: number,
  thresholds: MediaQueryBreakpoints,
): Breakpoint {
  if (width <= thresholds.mobileMax) {
    return Breakpoint.mobile;
  }
  if (width <= thresholds.tabletMax) {
    return Breakpoint.tablet;
  }
  return Breakpoint.desktop;
}

export function deriveBooleans(breakpoint: Breakpoint): Pick<
  MediaQueryData,
  "isMobile" | "isTablet" | "isDesktop"
> {
  return {
    isMobile: breakpoint === Breakpoint.mobile,
    isTablet: breakpoint === Breakpoint.tablet,
    isDesktop: breakpoint === Breakpoint.desktop,
  };
}

export function buildMediaQueryData(
  width: number,
  height: number,
  thresholds: MediaQueryBreakpoints,
  partial?: Partial<MediaQueryData>,
): MediaQueryData {
  const orientation = resolveOrientation(width, height);
  let breakpoint = classifyBreakpoint(width, thresholds);

  if (partial !== undefined && partial.breakpoint !== undefined) {
    if (
      import.meta.env.DEV &&
      hasConflictingBooleans(partial.breakpoint, partial)
    ) {
      console.warn(
        "[MediaQuery] initialData: `breakpoint` conflicts with boolean flags; using `breakpoint` (§27 M10).",
        partial,
      );
    }
    breakpoint = partial.breakpoint;
  } else if (partial !== undefined && hasAnyBoolean(partial)) {
    breakpoint = breakpointFromBooleans(partial);
  }

  return {
    width,
    height,
    orientation,
    breakpoint,
    ...deriveBooleans(breakpoint),
  };
}

function hasAnyBoolean(partial?: Partial<MediaQueryData>): boolean {
  if (!partial) return false;
  return (
    partial.isMobile !== undefined ||
    partial.isTablet !== undefined ||
    partial.isDesktop !== undefined
  );
}

function hasConflictingBooleans(
  breakpoint: Breakpoint,
  partial: Partial<MediaQueryData>,
): boolean {
  const expected = deriveBooleans(breakpoint);
  if (
    partial.isMobile !== undefined &&
    partial.isMobile !== expected.isMobile
  ) {
    return true;
  }
  if (
    partial.isTablet !== undefined &&
    partial.isTablet !== expected.isTablet
  ) {
    return true;
  }
  if (
    partial.isDesktop !== undefined &&
    partial.isDesktop !== expected.isDesktop
  ) {
    return true;
  }
  return false;
}

function breakpointFromBooleans(
  partial: Partial<MediaQueryData>,
): Breakpoint {
  if (partial.isMobile) return Breakpoint.mobile;
  if (partial.isTablet) return Breakpoint.tablet;
  if (partial.isDesktop) return Breakpoint.desktop;
  return Breakpoint.mobile;
}

/** Initial store state for `<MediaQuery>` (SSR + first client paint). */
export function createInitialMediaQueryState(
  initialData: Partial<MediaQueryData> | undefined,
  breakpointsPartial: Partial<MediaQueryBreakpoints> | undefined,
  viewport?: { width: number; height: number },
): MediaQueryData {
  const thresholds = resolveBreakpoints(breakpointsPartial);
  const width = viewport?.width ?? initialData?.width ?? DEFAULT_MEDIA_QUERY_DATA.width;
  const height =
    viewport?.height ?? initialData?.height ?? DEFAULT_MEDIA_QUERY_DATA.height;

  return buildMediaQueryData(width, height, thresholds, initialData);
}

export function readViewportSize(): { width: number; height: number } {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/** §27 M5 — `matchMedia` queries at tier boundaries (in addition to `resize`). */
export function createBreakpointMediaQueries(
  thresholds: MediaQueryBreakpoints,
): MediaQueryList[] {
  const mobile = window.matchMedia(
    `(max-width: ${thresholds.mobileMax}px)`,
  );
  const tablet = window.matchMedia(
    `(min-width: ${thresholds.mobileMax + 1}px) and (max-width: ${thresholds.tabletMax}px)`,
  );
  const desktop = window.matchMedia(
    `(min-width: ${thresholds.tabletMax + 1}px)`,
  );
  return [mobile, tablet, desktop];
}
