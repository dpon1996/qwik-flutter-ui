/**
 * `Column` — vertical flex layout. Flutter equivalent of `Column`.
 * See `docs/API_DESIGN.md` §4.
 *
 * Mirror of `Row` with the axes swapped. See `row.tsx` for the canonical
 * Flutter → CSS mapping table; this file documents only the differences:
 *
 *   flex-direction       → `column` (vs Row's `row`)
 *
 *   mainAxisSize         → height (vs Row's width)
 *     max → 100%
 *     min → fit-content
 *
 *   verticalDirection    → main-axis flow (vs Row's cross axis)
 *     down (default) → flex-direction: column         (.column class)
 *     up             → flex-direction: column-reverse (.column-reverse class)
 *
 *   mainAxisAlignment, crossAxisAlignment, gap, textDirection
 *     → identical mapping to Row (see row.tsx header).
 *
 * Implementation notes:
 *  - Same patterns as Row: enum-bounded props → static CSS-module classes,
 *    free-form props (gap, direction) → inline `style`.
 *  - `toLength` is imported from `_shared/internal` (shared with Row).
 *  - `verticalDirection.up` swaps the base class (no JS-side cross-axis
 *    flip needed — CSS's column-reverse handles everything correctly,
 *    including making `mainAxisAlignment.start` align to the bottom).
 *  - The user's `class` and `style` are merged with internal ones with
 *    user values winning (§0.6).
 *  - Defaults match Flutter (§4): mainAxisAlignment=start,
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

import styles from "./column.module.css";
import type { ColumnProps } from "./types";

export const Column = component$<ColumnProps>((props) => {
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

  /* `up` reverses the main axis. CSS handles the rest — justify-content
   * values keep their semantics relative to the (now-reversed) main axis,
   * matching Flutter. */
  const baseClass =
    verticalDirection === VerticalDirection.up
      ? styles["column-reverse"]
      : styles.column;

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
    baseClass,
    styles[`main-${mainAxisAlignment}`],
    styles[`cross-${crossAxisAlignment}`],
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
