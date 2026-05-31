/**
 * `Row` — horizontal flex layout. Flutter equivalent of `Row`.
 * See `docs/API_DESIGN.md` §3.
 *
 * Flutter → CSS mapping (source of truth):
 *
 *   mainAxisAlignment  → justify-content
 *     start         → flex-start
 *     end           → flex-end
 *     center        → center
 *     spaceBetween  → space-between
 *     spaceAround   → space-around
 *     spaceEvenly   → space-evenly
 *
 *   crossAxisAlignment → align-items
 *     start    → flex-start
 *     end      → flex-end
 *     center   → center
 *     stretch  → stretch
 *     baseline → baseline
 *
 *   mainAxisSize       → width
 *     max → 100%
 *     min → fit-content
 *
 *   gap                → CSS `gap` (Length: number→px, string verbatim)
 *
 *   textDirection      → CSS `direction` (ltr | rtl); ltr is the inherited
 *                        default, so we only emit a value when explicitly set.
 *
 *   verticalDirection  → no direct CSS equivalent.
 *                        `down` is the default (no-op).
 *                        `up` reverses the cross axis, so we swap
 *                        crossAxisAlignment start ↔ end before mapping.
 *                        (`center`, `stretch`, `baseline` are symmetric.)
 *
 * Implementation notes:
 *  - All enum values are bounded → mapped via CSS-module classes (no
 *    inline `style` for them), keeping HTML markup small (Principle #7).
 *  - Per-instance values (`gap`, `direction`) are emitted as inline
 *    `style`. Numeric `Length` becomes `<n>px`; strings pass through.
 *  - The user's `class` and `style` are merged with internal ones with
 *    user values winning (§0.6).
 *  - Defaults match Flutter (§3): mainAxisAlignment=start,
 *    crossAxisAlignment=center, mainAxisSize=max, verticalDirection=down.
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import {
  CrossAxisAlignment,
  MainAxisAlignment,
  MainAxisSize,
  VerticalDirection,
} from "../_shared";
import { toLength } from "../_shared/internal";

import styles from "./row.module.css";
import type { RowProps } from "./types";

/**
 * When `verticalDirection === up`, the cross axis is reversed. For the
 * symmetric values (center/stretch/baseline) this is a no-op; for
 * start/end we swap them so the resulting visual order matches Flutter.
 *
 * Row-specific: Row's cross axis is vertical, so flipping verticalDirection
 * flips the cross axis. (Column inverts the main axis instead — handled
 * differently via `flex-direction: column-reverse`.)
 */
const flipCrossAxis = (v: CrossAxisAlignment): CrossAxisAlignment => {
  if (v === CrossAxisAlignment.start) return CrossAxisAlignment.end;
  if (v === CrossAxisAlignment.end) return CrossAxisAlignment.start;
  return v;
};

export const Row = component$<RowProps>((props) => {
  const {
    mainAxisAlignment = MainAxisAlignment.start,
    crossAxisAlignment = CrossAxisAlignment.center,
    mainAxisSize = MainAxisSize.max,
    gap,
    textDirection,
    verticalDirection = VerticalDirection.down,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const effectiveCross =
    verticalDirection === VerticalDirection.up
      ? flipCrossAxis(crossAxisAlignment)
      : crossAxisAlignment;

  /* Build the computed inline style. Only set keys that were provided so
   * the rendered HTML stays clean (no `gap: undefined` strings). */
  const computed: CSSProperties = {};
  if (gap !== undefined) computed.gap = toLength(gap);
  if (textDirection !== undefined) computed.direction = textDirection;

  /* User style wins on conflicts (§0.6). */
  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [
    styles.row,
    styles[`main-${mainAxisAlignment}`],
    styles[`cross-${effectiveCross}`],
    styles[`size-${mainAxisSize}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={classes} style={style} {...rest}>
      <Slot />
    </div>
  );
});
