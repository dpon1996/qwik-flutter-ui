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
 *  - Inline `style` only — no CSS module. Three CSS declarations, the
 *    first dynamic (`flex` grow factor) and the other two constant.
 *    Per-instance + tiny ⇒ inline keeps the code lean (Principle #7).
 *  - `flex: <flex> 1 0` is the CSS shorthand for
 *    `flex-grow: <flex>; flex-shrink: 1; flex-basis: 0`. Used verbatim
 *    to match the spec wording — Spacer (§7) uses the individual long-
 *    hand because *its* spec note writes the longhand. Functionally
 *    equivalent.
 *  - `min-width: 0; min-height: 0` prevents the classic CSS flex-overflow
 *    surprise: a flex item's default `min-*` is `auto` (≥ intrinsic
 *    content size), which stops shrinking below the content's natural
 *    minimum. Setting these to `0` lets `Expanded` shrink as far as
 *    needed, matching Flutter's "take exactly your assigned share."
 *  - `<Slot />` for a single child (the spec says "Single child").
 *    Multiple children are technically allowed — they'll be siblings
 *    inside the Expanded wrapper — but the idiomatic use is one child.
 *  - Outside a flex parent: all five properties are silently ignored by
 *    the browser (flex/min-* only apply to flex items). No JS check,
 *    no dev-time warning (v1).
 *  - The user's `class` and `style` are merged with internal ones with
 *    user values winning (§0.6).
 *  - `BaseProps` passthrough (`id`, `role`, `aria-*`, `data-*`) is
 *    forwarded onto the rendered element via `...rest`.
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

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

  return (
    <div class={className} style={style} {...rest}>
      <Slot />
    </div>
  );
});
