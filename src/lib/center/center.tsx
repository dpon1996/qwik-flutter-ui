/**
 * `Center` — centers its child both horizontally and vertically.
 * Flutter equivalent of `Center`. See `docs/API_DESIGN.md` §10.
 *
 * Implementation notes:
 *  - Uses flexbox (`justify-content: center; align-items: center`) for
 *    two-axis centering.
 *  - Uses `width: 100%` and `height: 100%` to fill the parent's available
 *    box, mirroring Flutter's constrained expansion behavior.
 *  - `<Slot />` carries the child content.
 *  - The user's `class` and `style` are merged with internal ones with user
 *    values winning (§0.6).
 *  - SSR-friendly: static class + optional inline style only.
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import styles from "./center.module.css";
import type { CenterProps } from "./types";

export const Center = component$<CenterProps>((props) => {
  const { class: className, style: userStyle, ...rest } = props;

  const style: CSSProperties | undefined = userStyle as CSSProperties | undefined;
  const classes = [styles.center, className].filter(Boolean).join(" ");

  return (
    <div class={classes} style={style} {...rest}>
      <Slot />
    </div>
  );
});
