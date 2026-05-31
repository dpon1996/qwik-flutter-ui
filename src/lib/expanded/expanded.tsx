/**
 * `Expanded` — forces a child to fill remaining main-axis space inside a
 * `Row` / `Column`. Flutter equivalent of `Expanded`.
 * See `docs/API_DESIGN.md` §8.
 *
 * Behaviour (from the spec):
 *   Internally: `flex: <flex> 1 0; min-width: 0; min-height: 0`.
 *   Outside a flex parent: silent no-op.
 *   Expanded == Flexible({ fit: FlexFit.tight }).
 *
 * Implementation notes:
 *  - The spec's "Internally" CSS makes *Expanded itself* fill the
 *    leftover space inside its Row/Column parent. That alone is not
 *    enough for Flutter parity: in Flutter, the child of Expanded also
 *    fills the allocated space because tight constraints propagate.
 *    CSS doesn't propagate constraints, so we additionally turn Expanded
 *    into a flex container that inherits its parent's direction and
 *    forces the immediate child to fill via `> * { flex: 1 1 auto }`.
 *    Those rules live in `expanded.module.css` (need a child selector,
 *    not expressible inline).
 *  - The dynamic per-instance bit (`flex: <flex> 1 0` and `min-*: 0`) is
 *    still applied as inline `style` so the SSR markup directly reflects
 *    the spec note.
 *  - `flex: <flex> 1 0` is the CSS shorthand for
 *    `flex-grow: <flex>; flex-shrink: 1; flex-basis: 0`. Used verbatim
 *    to match the spec wording — Spacer (§7) uses the individual long-
 *    hand because *its* spec note writes the longhand. Functionally
 *    equivalent.
 *  - `min-width: 0; min-height: 0` on Expanded prevents the classic CSS
 *    flex-overflow surprise (default `min-*: auto` ≥ intrinsic content
 *    size). The same pair on `> *` lets the child shrink past its own
 *    intrinsic content size, matching Flutter's "take exactly your
 *    assigned share" semantics for long-content children.
 *  - `<Slot />` for a single child (the spec says "Single child").
 *    Multiple children are technically allowed — they'll each take an
 *    equal share via `flex: 1 1 auto` — but the idiomatic use is one.
 *  - Outside a flex parent: all five inline properties are silently
 *    ignored by the browser. The CSS-module rules still take effect
 *    (turning Expanded into a flex container with one stretched child),
 *    which means an Expanded outside Row/Column now sizes its child to
 *    fill Expanded's own intrinsic size — a benign no-op for typical
 *    usage. No JS check, no dev-time warning (v1).
 *  - The user's `class` and `style` are merged with internal ones with
 *    user values winning (§0.6).
 *  - `BaseProps` passthrough (`id`, `role`, `aria-*`, `data-*`) is
 *    forwarded onto the rendered element via `...rest`.
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import styles from "./expanded.module.css";
import type { ExpandedProps } from "./types";

export const Expanded = component$<ExpandedProps>((props) => {
  const { flex = 1, class: className, style: userStyle, ...rest } = props;

  /* Per spec: flex: <flex> 1 0; min-width: 0; min-height: 0. */
  const computed: CSSProperties = {
    flex: `${flex} 1 0`,
    minWidth: 0,
    minHeight: 0,
  };

  /* User style wins on conflicts (§0.6). */
  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [styles.expanded, className].filter(Boolean).join(" ");

  return (
    <div class={classes} style={style} {...rest}>
      <Slot />
    </div>
  );
});
