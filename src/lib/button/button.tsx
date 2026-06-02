/**
 * `Button` — a labeled pressable control.
 * Flutter equivalent of `FilledButton` / `OutlinedButton` / `TextButton`.
 * See `docs/API_DESIGN.md` §17.
 *
 * Implementation notes:
 *  - First interactive widget; extends `InteractiveProps` (`onClick$`, `disabled`).
 *  - Label content is slotted (`<Button>Save</Button>`).
 *  - `href` alone renders `<a>` (decision #33); otherwise `<button type="button">`.
 *  - Disabled `<a>`: `aria-disabled`, no `href`, `tabIndex={-1}`, no `onClick$`.
 *  - `ButtonVariant.elevated` uses shared `elevationToBoxShadow` presets.
 *  - Variant presets in CSS module; caller overrides via flat decoration props.
 *  - `useTheme()` supplies `buttonTheme` + `colorScheme` defaults when props omitted
 *    (§57); explicit props override theme (§0.6).
 *  - SSR-friendly: static classes + optional inline `style` only.
 *  - Visible `:focus-visible` ring (§17 accessibility).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import { ButtonVariant } from "../_shared";
import {
  elevationToBoxShadow,
  toBorderRadiusString,
  toBorderString,
  toEdgeInsetsString,
} from "../_shared/internal";
import { useTheme } from "../theme";

import { resolveButtonThemeStyles } from "./resolve-button-theme";
import styles from "./button.module.css";
import type { ButtonProps } from "./types";

export const Button = component$<ButtonProps>((props) => {
  const {
    as,
    variant = ButtonVariant.filled,
    color,
    backgroundColor,
    padding,
    borderRadius,
    border,
    type = "button",
    href,
    target,
    rel,
    elevation = 1,
    disabled = false,
    onClick$,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const isAnchor = href !== undefined || as === "a";

  const { colorScheme, buttonTheme } = useTheme();
  const themed = resolveButtonThemeStyles(
    variant,
    colorScheme,
    buttonTheme,
  );

  const computed: CSSProperties = {};

  if (themed.color !== undefined) computed.color = themed.color;
  if (themed.backgroundColor !== undefined) {
    computed.backgroundColor = themed.backgroundColor;
  }
  if (themed.padding !== undefined) {
    computed.padding = toEdgeInsetsString(themed.padding);
  }
  if (themed.borderRadius !== undefined) {
    computed.borderRadius = toBorderRadiusString(themed.borderRadius);
  }
  if (themed.border !== undefined) computed.border = themed.border;

  if (color !== undefined) computed.color = color;
  if (backgroundColor !== undefined) computed.backgroundColor = backgroundColor;
  if (padding !== undefined) computed.padding = toEdgeInsetsString(padding);
  if (borderRadius !== undefined) {
    computed.borderRadius = toBorderRadiusString(borderRadius);
  }
  if (border !== undefined) computed.border = toBorderString(border);

  if (variant === ButtonVariant.elevated) {
    computed.boxShadow = elevationToBoxShadow(elevation);
  }

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [
    styles.button,
    styles[`variant-${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const shared = {
    class: classes,
    style,
    ...rest,
  };

  if (isAnchor) {
    return (
      <a
        {...shared}
        href={disabled ? undefined : href}
        target={target}
        rel={rel}
        aria-disabled={disabled ? true : undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick$={disabled ? undefined : onClick$}
      >
        <Slot />
      </a>
    );
  }

  return (
    <button
      {...shared}
      type={type}
      disabled={disabled}
      onClick$={disabled ? undefined : onClick$}
    >
      <Slot />
    </button>
  );
});
