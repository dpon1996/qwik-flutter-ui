/**
 * `AppShell` — root application layout shell (Flutter `Scaffold` equivalent).
 * See `docs/API_DESIGN.md` §91.
 *
 * Implementation notes:
 *  - Stateless structural layout only — no signals, context, or browser APIs.
 *  - Optional chrome regions render semantic landmarks when their prop is set.
 *  - Region props (§91.3 Option B) support static chrome; use `q:slot` for reactive
 *    chrome so Qwik can track subscriptions in the parent component tree.
 *  - Body content always renders inside a single `<main>` via `<Slot />`.
 *  - `Drawer` / `SideSheet` widgets own their `<aside>` landmarks — shell regions
 *    use non-semantic wrappers (§91.4).
 *  - SSR- and resumability-safe: static HTML + CSS module classes only.
 */

import { Slot, component$, type CSSProperties, type JSXOutput } from "@builder.io/qwik";

import type { BaseProps } from "../../lib/_shared";

import styles from "./AppShell.module.css";

export interface AppShellProps extends BaseProps {
  /** Primary page content — Flutter `Scaffold.body`. Renders inside `<main>`. */
  children?: JSXOutput;

  /** Top header chrome — `AppBar` (§93). Prefer `q:slot="appBar"` when chrome is reactive. */
  appBar?: JSXOutput;

  /** Modal navigation drawer — `Drawer` (§95). Prefer `q:slot="drawer"`. */
  drawer?: JSXOutput;

  /** Non-modal companion panel — `SideSheet` (§97). Prefer `q:slot="sideSheet"`. */
  sideSheet?: JSXOutput;

  /** Bottom destination navigation — `BottomNavigationBar` (§99). Prefer `q:slot="bottomNavigationBar"`. */
  bottomNavigationBar?: JSXOutput;
}

export const AppShell = component$<AppShellProps>((props) => {
  const {
    appBar,
    drawer,
    sideSheet,
    bottomNavigationBar,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const classes = [styles.shell, className].filter(Boolean).join(" ");
  const style: CSSProperties | undefined = userStyle as CSSProperties | undefined;

  return (
    <div class={classes} style={style} {...rest}>
      <header class={styles.appBar}>
        {appBar ?? <Slot name="appBar" />}
      </header>
      <div class={styles.body}>
        <div class={styles.drawer}>{drawer ?? <Slot name="drawer" />}</div>
        <main class={styles.main}>
          <Slot />
        </main>
        <div class={styles.sideSheet}>{sideSheet ?? <Slot name="sideSheet" />}</div>
      </div>
      <nav class={styles.bottomNavigationBar}>
        {bottomNavigationBar ?? <Slot name="bottomNavigationBar" />}
      </nav>
    </div>
  );
});
