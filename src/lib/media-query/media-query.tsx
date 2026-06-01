/**
 * `MediaQuery` — viewport metrics provider for descendant components.
 * Flutter equivalent of wrapping with `MediaQuery`. See `docs/API_DESIGN.md` §25.
 *
 * - Provides {@link MediaQueryData} via Qwik context (no global store).
 * - SSR: uses `initialData` or mobile-first defaults (§27 M1).
 * - Client: updates from `resize` + `matchMedia` (§27 M5); listeners are per-instance only.
 * - M10: `breakpoint` authoritative; booleans derived from `initialData`.
 * - M11: invalid `breakpoints` → dev warning + library defaults.
 *
 * Accessibility: no roles, live regions, or semantic changes (§25).
 */

import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

import { MediaQueryContext } from "./context";
import type { MediaQueryProps } from "./types";
import {
  buildMediaQueryData,
  createBreakpointMediaQueries,
  createInitialMediaQueryState,
  readViewportSize,
  resolveBreakpoints,
} from "./use-media-query";

export const MediaQuery = component$<MediaQueryProps>((props) => {
  const { initialData, breakpoints: breakpointsProp, ...rest } = props;

  const media = useStore(() =>
    createInitialMediaQueryState(initialData, breakpointsProp),
  );

  useContextProvider(MediaQueryContext, media);

  useVisibleTask$(({ cleanup }) => {
    const resolved = resolveBreakpoints(breakpointsProp);

    const sync = () => {
      const { width, height } = readViewportSize();
      const next = buildMediaQueryData(width, height, resolved);
      Object.assign(media, next);
    };

    sync();

    window.addEventListener("resize", sync);

    const mqls = createBreakpointMediaQueries(resolved);
    for (const mql of mqls) {
      mql.addEventListener("change", sync);
    }

    cleanup(() => {
      window.removeEventListener("resize", sync);
      for (const mql of mqls) {
        mql.removeEventListener("change", sync);
      }
    });
  });

  return (
    <div {...rest} style={{ display: "contents", ...(props.style as object) }}>
      <Slot />
    </div>
  );
});
