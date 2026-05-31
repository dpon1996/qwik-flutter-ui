/**
 * `Wrap` — flex layout that wraps children onto multiple runs.
 * Flutter equivalent of `Wrap`. See `docs/API_DESIGN.md` §11.
 *
 * Behavior:
 * - Uses CSS flex-wrap for multi-line / multi-run layout.
 * - `spacing` and `runSpacing` map to `row-gap` / `column-gap` with axis-swap:
 *   - horizontal: spacing -> column-gap, runSpacing -> row-gap
 *   - vertical:   spacing -> row-gap,    runSpacing -> column-gap
 * - `verticalDirection=up` flips run order in horizontal mode (`wrap-reverse`)
 *   and flips item flow in vertical mode (`column-reverse`).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import {
  Axis,
  Clip,
  VerticalDirection,
  WrapAlignment,
  WrapCrossAlignment,
} from "../_shared";
import { toLength } from "../_shared/internal";

import styles from "./wrap.module.css";
import type { WrapProps } from "./types";

export const Wrap = component$<WrapProps>((props) => {
  const {
    direction = Axis.horizontal,
    alignment = WrapAlignment.start,
    runAlignment = WrapAlignment.start,
    crossAxisAlignment = WrapCrossAlignment.start,
    spacing,
    runSpacing,
    textDirection,
    verticalDirection = VerticalDirection.down,
    clipBehavior = Clip.none,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const isHorizontal = direction === Axis.horizontal;

  const computed: CSSProperties = {};
  if (spacing !== undefined) {
    if (isHorizontal) computed.columnGap = toLength(spacing);
    else computed.rowGap = toLength(spacing);
  }
  if (runSpacing !== undefined) {
    if (isHorizontal) computed.rowGap = toLength(runSpacing);
    else computed.columnGap = toLength(runSpacing);
  }
  if (textDirection !== undefined) computed.direction = textDirection;

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const directionClass = isHorizontal
    ? styles["direction-horizontal"]
    : verticalDirection === VerticalDirection.up
      ? styles["direction-vertical-up"]
      : styles["direction-vertical-down"];

  const wrapClass =
    isHorizontal && verticalDirection === VerticalDirection.up
      ? styles["wrap-reverse"]
      : styles["wrap-normal"];

  const classes = [
    styles.wrap,
    directionClass,
    wrapClass,
    styles[`alignment-${alignment}`],
    styles[`run-${runAlignment}`],
    styles[`cross-${crossAxisAlignment}`],
    styles[`clip-${clipBehavior}`],
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
