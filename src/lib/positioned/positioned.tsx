/**
 * `Positioned` — absolutely positions a child inside a `Stack`.
 * Flutter equivalent of `Positioned`. See `docs/API_DESIGN.md` §13.
 *
 * Behavior:
 * - Uses `position: absolute`.
 * - Supports `top`, `right`, `bottom`, `left`, `width`, `height`.
 * - Numeric `Length` values become `px`; string values pass through.
 *
 * Notes from spec:
 * - Only meaningful inside a `Stack`.
 * - Outside `Stack`, behaves as an absolutely positioned element relative to
 *   the nearest positioned ancestor (silent, no warning in v1).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import { toLength } from "../_shared/internal";

import styles from "./positioned.module.css";
import type { PositionedProps } from "./types";

export const Positioned = component$<PositionedProps>((props) => {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const computed: CSSProperties = {};
  if (top !== undefined) computed.top = toLength(top);
  if (right !== undefined) computed.right = toLength(right);
  if (bottom !== undefined) computed.bottom = toLength(bottom);
  if (left !== undefined) computed.left = toLength(left);
  if (width !== undefined) computed.width = toLength(width);
  if (height !== undefined) computed.height = toLength(height);

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [styles.positioned, className].filter(Boolean).join(" ");

  return (
    <div class={classes} style={style} {...rest}>
      <Slot />
    </div>
  );
});
