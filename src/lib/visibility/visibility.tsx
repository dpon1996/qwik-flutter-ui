/**
 * `Visibility` — shows or hides a child without removing it from the tree
 * (optionally preserving layout space). Flutter equivalent of `Visibility`.
 * See `docs/API_DESIGN.md` §19.
 *
 * Implementation notes:
 *  - Single child via `<Slot />`.
 *  - `visible={false}` + `maintainSize={false}` → `display: none` (child stays mounted).
 *  - `visible={false}` + `maintainSize={true}` → `visibility: hidden` (layout preserved).
 *  - When hidden: `inert` + `pointer-events: none` (decision #35).
 *  - `aria-hidden` when hidden and `maintainSemantics={false}` (Flutter parity).
 *  - SSR-friendly: classes + attributes only; no client-only hooks.
 *  - User `class` / `style` merge with internal values; user wins (§0.6).
 *
 * `maintainState` is deferred to v2 (§19) — use `{show && <Child />}` to unmount.
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import styles from "./visibility.module.css";
import type { VisibilityProps } from "./types";

export const Visibility = component$<VisibilityProps>((props) => {
  const {
    visible = true,
    maintainSize = false,
    maintainSemantics = true,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const hidden = !visible;

  const classes = [
    styles.visibility,
    hidden && maintainSize && styles.offstage,
    hidden && !maintainSize && styles.hidden,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style: CSSProperties | undefined = userStyle as CSSProperties | undefined;

  return (
    <div
      class={classes}
      style={style}
      aria-hidden={hidden && !maintainSemantics ? true : undefined}
      inert={hidden ? true : undefined}
      {...rest}
    >
      <Slot />
    </div>
  );
});
