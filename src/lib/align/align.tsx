/**
 * `Align` — positions a child within available space on the 9-point grid.
 * Flutter equivalent of `Align`. See `docs/API_DESIGN.md` §20.
 *
 * Implementation notes:
 *  - CSS Grid with `place-items` per `Alignment` (decision #42).
 *  - Fills parent constraints (`width` / `height` 100%) by default.
 *  - `widthFactor` / `heightFactor` set axis size to `factor × 100%` of the parent.
 *  - Single child via `<Slot />`.
 *  - SSR-friendly: static classes + optional inline `style` only.
 *  - User `class` / `style` merge with internal values; user wins (§0.6).
 *
 * Parent must provide bounded constraints for alignment to be visible
 * (e.g. sized `Container`, `Expanded`, or `Stack`).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import { Alignment } from "../_shared";

import styles from "./align.module.css";
import type { AlignProps } from "./types";

export const Align = component$<AlignProps>((props) => {
  const {
    alignment = Alignment.center,
    widthFactor,
    heightFactor,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const computed: CSSProperties = {};

  if (widthFactor !== undefined) {
    computed.width = `${widthFactor * 100}%`;
  }
  if (heightFactor !== undefined) {
    computed.height = `${heightFactor * 100}%`;
  }

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [
    styles.align,
    styles[`alignment-${alignment}`],
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
