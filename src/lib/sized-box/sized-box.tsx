/**
 * `SizedBox` — a box with a fixed width and/or height. Flutter equivalent
 * of `SizedBox`. See `docs/API_DESIGN.md` §6.
 *
 * Implementation notes:
 *  - `width` / `height` are emitted as inline `style` so SSR markup is
 *    complete and no client-side hydration is needed for sizing
 *    (Principle #4, #5).
 *  - Numeric `Length` values are converted to `px`; string `Length` values
 *    pass through verbatim (e.g. `"50%"`, `"1rem"`, `"clamp(...)"`).
 *  - Static structure (`box-sizing`, `flex-shrink: 0`) lives in
 *    `sized-box.module.css` so no CSS-in-JS runtime is needed
 *    (Principle #7).
 *  - The user's `class` and `style` are merged with our internal ones with
 *    user values winning (§0.6).
 *  - Always rendered as a `<div>`. Semantic HTML wrapping should be done
 *    with `Container as="..."`; SizedBox is intentionally just a fixed-size
 *    box.
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import type { Length } from "../_shared";

import styles from "./sized-box.module.css";
import type { SizedBoxProps } from "./types";

/** Convert a `Length` to a CSS string. Numbers become `<n>px`. */
const toLength = (v: Length): string =>
  typeof v === "number" ? `${v}px` : v;

export const SizedBox = component$<SizedBoxProps>((props) => {
  const {
    width,
    height,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  /* Build the computed inline style. Only set keys that were provided so
   * the rendered HTML stays clean (no `width: undefined` strings). */
  const computed: CSSProperties = {};
  if (width !== undefined) computed.width = toLength(width);
  if (height !== undefined) computed.height = toLength(height);

  /* User style wins on conflicts (§0.6). */
  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [styles["sized-box"], className].filter(Boolean).join(" ");

  return (
    <div class={classes} style={style} {...rest}>
      <Slot />
    </div>
  );
});
