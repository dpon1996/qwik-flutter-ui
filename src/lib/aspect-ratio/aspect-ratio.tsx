/// <reference types="vite/client" />

/**
 * `AspectRatio` — sizes its child to respect a width-to-height ratio.
 * Flutter equivalent of `AspectRatio`. See `docs/API_DESIGN.md` §21.
 *
 * Implementation notes:
 *  - Uses CSS `aspect-ratio` (SSR-friendly; no measurement JS).
 *  - Width comes from the parent; height is derived from `aspectRatio`.
 *  - Invalid values (`<= 0`, `NaN`, `Infinity`) clamp to `1` + dev warning (#38).
 *  - Single child via `<Slot />`.
 *  - User `class` / `style` merge with internal values; user wins (§0.6).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import styles from "./aspect-ratio.module.css";
import type { AspectRatioProps } from "./types";

const FALLBACK_RATIO = 1;

/**
 * Returns a finite positive aspect ratio, clamping invalid input to `1`.
 * Emits a console warning in development when clamping (decision #38).
 */
function normalizeAspectRatio(value: number): number {
  if (Number.isFinite(value) && value > 0) {
    return value;
  }

  if (import.meta.env.DEV) {
    console.warn(
      `[AspectRatio] Invalid aspectRatio (${String(value)}); clamping to ${FALLBACK_RATIO}.`,
    );
  }

  return FALLBACK_RATIO;
}

export const AspectRatio = component$<AspectRatioProps>((props) => {
  const {
    aspectRatio,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const safeRatio = normalizeAspectRatio(aspectRatio);

  const computed: CSSProperties = {
    aspectRatio: safeRatio,
  };

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [styles.aspectRatio, className].filter(Boolean).join(" ");

  return (
    <div class={classes} style={style} {...rest}>
      <Slot />
    </div>
  );
});
