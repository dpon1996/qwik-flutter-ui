/// <reference types="vite/client" />

/**
 * `AppBar` — primary top application chrome.
 * Flutter equivalent of `AppBar`. See `docs/API_DESIGN.md` §93.
 *
 * Implementation notes:
 *  - Stateless toolbar — no signals, context, or browser APIs.
 *  - Option B region props: `leading`, `title`, `actions` (§92.4).
 *  - Root `<header role="banner">`; layout slot wrappers are non-semantic `div`s.
 *  - Theme defaults via CSS variables; explicit props override inline (§93.6).
 *  - `elevation` maps to Material shadow presets (shared with `Card`).
 *  - SSR- and resumability-safe: static markup + inline styles only.
 */

import { component$, type CSSProperties, type JSXOutput } from "@builder.io/qwik";

import type { BaseProps, Length } from "../../lib/_shared";
import { elevationToBoxShadow, toLength } from "../../lib/_shared/internal";

import styles from "./AppBar.module.css";

const DEFAULT_HEIGHT: Length = 56;
const DEFAULT_ELEVATION = 1;
const DEFAULT_TITLE_SPACING: Length = 16;
const MAX_ACTIONS = 5;

function warnTooManyActions(count: number): void {
  if (import.meta.env.DEV && count > MAX_ACTIONS) {
    console.warn(
      `[AppBar] ${count} actions exceeds the recommended maximum of ${MAX_ACTIONS}.`,
    );
  }
}

export interface AppBarProps extends BaseProps {
  /** Start-aligned control — menu, back, or close. Flutter `leading`. */
  leading?: JSXOutput;

  /** Primary title content. Flutter `title`. Prefer `<Text as="h1">` for page title. */
  title?: JSXOutput;

  /** End-aligned actions. Flutter `actions`. Order preserved left-to-right. */
  actions?: JSXOutput[];

  /** Toolbar background. Default `var(--qfu-color-surface)` (§57). */
  backgroundColor?: string;

  /** Foreground for title and icons. Default `var(--qfu-color-on-surface)`. */
  foregroundColor?: string;

  /** Material-style elevation (CSS `box-shadow` tier). Default **1**. */
  elevation?: number;

  /** Toolbar height. Default **56** px — Material default. */
  height?: Length;

  /**
   * Horizontal inset before the title content. Flutter `titleSpacing`.
   * Default **16** px — Material `NavigationToolbar` middle spacing.
   */
  titleSpacing?: Length;
}

export const AppBar = component$<AppBarProps>((props) => {
  const {
    leading,
    title,
    actions,
    backgroundColor,
    foregroundColor,
    elevation,
    height,
    titleSpacing,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  if (actions?.length) {
    warnTooManyActions(actions.length);
  }

  const computed: CSSProperties = {
    backgroundColor: backgroundColor ?? "var(--qfu-color-surface)",
    color: foregroundColor ?? "var(--qfu-color-on-surface)",
    height: toLength(height ?? DEFAULT_HEIGHT),
    boxShadow: elevationToBoxShadow(elevation ?? DEFAULT_ELEVATION),
  };

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [styles.appBar, className].filter(Boolean).join(" ");

  const titleStyle: CSSProperties = {
    paddingLeft: toLength(titleSpacing ?? DEFAULT_TITLE_SPACING),
  };

  return (
    <header class={classes} style={style} {...rest} role="banner">
      {leading ? (
        <div data-slot="leading" class={styles.leading}>
          {leading}
        </div>
      ) : null}
      {title ? (
        <div data-slot="title" class={styles.title} style={titleStyle}>
          {title}
        </div>
      ) : null}
      {actions?.length ? (
        <div data-slot="actions" class={styles.actions}>
          {actions.map((action, index) => (
            <div key={index} class={styles.action}>
              {action}
            </div>
          ))}
        </div>
      ) : null}
    </header>
  );
});
