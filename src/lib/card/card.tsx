/**
 * `Card` — a Material-style surface for grouped content with elevation and
 * decoration. Flutter equivalent of `Card(child: ...)`. See
 * `docs/API_DESIGN.md` §15.
 *
 * Implementation notes:
 *  - Decoration props reuse `_shared/internal` converters (same as `Container`).
 *  - `elevation` maps to Material-style layered `box-shadow` presets (0–24).
 *    When `boxShadow` is provided it wins over `elevation` (§0.6).
 *  - Default `elevation` is `1` (decision #32: no default `margin`).
 *  - Per-instance values are inline `style` for SSR (Principle #4).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import {
  elevationToBoxShadow,
  toBorderRadiusString,
  toBorderString,
  toBoxShadowString,
  toEdgeInsetsString,
} from "../_shared/internal";

import styles from "./card.module.css";
import type { CardProps } from "./types";

export const Card = component$<CardProps>((props) => {
  const {
    as = "div",
    elevation,
    margin,
    padding,
    backgroundColor,
    borderRadius,
    border,
    boxShadow,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const computed: CSSProperties = {};

  if (margin !== undefined) computed.margin = toEdgeInsetsString(margin);
  if (padding !== undefined) computed.padding = toEdgeInsetsString(padding);
  if (backgroundColor !== undefined) computed.backgroundColor = backgroundColor;
  if (borderRadius !== undefined) {
    computed.borderRadius = toBorderRadiusString(borderRadius);
  }
  if (border !== undefined) computed.border = toBorderString(border);

  if (boxShadow !== undefined) {
    computed.boxShadow = toBoxShadowString(boxShadow);
  } else {
    const level = elevation ?? 1;
    computed.boxShadow = elevationToBoxShadow(level);
  }

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [styles.card, className].filter(Boolean).join(" ");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = as;

  return (
    <Tag class={classes} style={style} {...rest}>
      <Slot />
    </Tag>
  );
});
