/**
 * `Stack` — overlays children on top of each other.
 * Flutter equivalent of `Stack`. See `docs/API_DESIGN.md` §12.
 *
 * Behavior:
 * - Uses `position: relative`.
 * - Layers children by placing each direct child in the same grid cell.
 * - Supports `alignment` for non-positioned children.
 * - Supports `clipBehavior` for overflow clipping.
 *
 * Implementation notes:
 * - CSS classes handle enum-to-CSS mapping for alignment and clip behavior.
 * - User `class` and `style` are merged with internal values with user
 *   values winning (§0.6).
 * - SSR-friendly: static class rendering + optional inline style only.
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import { Alignment, Clip } from "../_shared";

import styles from "./stack.module.css";
import type { StackProps } from "./types";

export const Stack = component$<StackProps>((props) => {
  const {
    alignment = Alignment.topLeft,
    clipBehavior = Clip.hardEdge,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const classes = [
    styles.stack,
    styles[`alignment-${alignment}`],
    styles[`clip-${clipBehavior}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style: CSSProperties | undefined = userStyle as CSSProperties | undefined;

  return (
    <div class={classes} style={style} {...rest}>
      <Slot />
    </div>
  );
});
