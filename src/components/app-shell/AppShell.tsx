/**
 * `AppShell` — root application layout shell (Flutter `Scaffold` equivalent).
 * See `docs/API_DESIGN.md` §91.
 *
 * Implementation notes:
 *  - Stateless structural layout only — no signals, context, or browser APIs.
 *  - Optional chrome regions render semantic landmarks when their prop is set.
 *  - Body content always renders inside a single `<main>` via `<Slot />`.
 *  - `BaseProps` passthrough (`class`, `style`, `id`, `role`, `aria-*`, `data-*`)
 *    applies to the root wrapper only (§91.4).
 *  - SSR- and resumability-safe: static HTML + CSS module classes only.
 */

import { Slot, component$, type CSSProperties, type JSXOutput } from "@builder.io/qwik";

import type { BaseProps } from "../../lib/_shared";

import styles from "./AppShell.module.css";

export interface AppShellProps extends BaseProps {
  /** Primary page content — Flutter `Scaffold.body`. Renders inside `<main>`. */
  children?: JSXOutput;

  /** Top header chrome — `AppBar` (§93). Renders in `<header>` region §91.4. */
  appBar?: JSXOutput;

  /** Modal navigation drawer — `Drawer` (§95). Renders in `<aside>` region §91.4. */
  drawer?: JSXOutput;

  /** Non-modal companion panel — `SideSheet` (§97). Renders in `<aside>` region §91.4. */
  sideSheet?: JSXOutput;

  /** Bottom destination navigation — `BottomNavigationBar` (§99). Renders in `<nav>` region §91.4. */
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
      {appBar ? <header class={styles.appBar}>{appBar}</header> : null}
      <div class={styles.body}>
        {drawer ? <aside class={styles.drawer}>{drawer}</aside> : null}
        <main class={styles.main}>
          <Slot />
        </main>
        {sideSheet ? <aside class={styles.sideSheet}>{sideSheet}</aside> : null}
      </div>
      {bottomNavigationBar ? (
        <nav class={styles.bottomNavigationBar}>{bottomNavigationBar}</nav>
      ) : null}
    </div>
  );
});
