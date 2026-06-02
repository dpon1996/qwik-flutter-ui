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
 *  - `useTheme().colorScheme` supplies surface / onSurface / outline when props
 *    are omitted (§57); explicit props override theme (§0.6).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import type { BorderSide } from "../_shared";
import {
  elevationToBoxShadow,
  toBorderRadiusString,
  toBorderString,
  toBoxShadowString,
  toEdgeInsetsString,
} from "../_shared/internal";
import { useTheme } from "../theme";

import { resolveCardThemeStyles } from "./resolve-card-theme";
import styles from "./card.module.css";
import type { CardProps } from "./types";

function resolveBorder(
  border: string | BorderSide | undefined,
  outlineColor: string,
): string | undefined {
  if (border === undefined) return undefined;
  if (typeof border === "string") return border;
  return toBorderString({
    ...border,
    color: border.color ?? outlineColor,
  });
}

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

  const { colorScheme } = useTheme();
  const themed = resolveCardThemeStyles(colorScheme);

  const computed: CSSProperties = {
    backgroundColor: themed.backgroundColor,
    color: themed.color,
    border: themed.border,
  };

  if (margin !== undefined) computed.margin = toEdgeInsetsString(margin);
  if (padding !== undefined) computed.padding = toEdgeInsetsString(padding);
  if (backgroundColor !== undefined) computed.backgroundColor = backgroundColor;
  if (borderRadius !== undefined) {
    computed.borderRadius = toBorderRadiusString(borderRadius);
  }
  if (border !== undefined) {
    computed.border = resolveBorder(border, themed.outlineColor);
  }

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
