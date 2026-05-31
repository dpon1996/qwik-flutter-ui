/**
 * `Flexible` — loose-fit flex child inside `Row` / `Column`.
 * Flutter equivalent of `Flexible` with default fit behavior.
 * See `docs/API_DESIGN.md` §9.
 *
 * Behavior:
 *   Internally: `flex: <flex> 1 auto; min-width: 0; min-height: 0`.
 *   Outside a flex parent: silent no-op.
 *
 * Key difference from `Expanded`:
 *  - `Expanded` forces its child to fill the allocated main-axis space.
 *  - `Flexible` allows the child to keep its natural size.
 *
 * Implementation notes:
 *  - This intentionally does NOT reuse `expanded.module.css`. That module
 *    adds child-forcing rules (`> * { flex: 1 ... }`) needed for Expanded.
 *    Applying those here would violate Flexible's loose behavior.
 *  - Inline style is sufficient: one dynamic declaration (`flex`) plus the
 *    standard `min-*: 0` overflow guard.
 *  - The user's `class` and `style` are merged with internal ones with user
 *    values winning (§0.6).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import type { FlexibleProps } from "./types";

export const Flexible = component$<FlexibleProps>((props) => {
  const { flex = 1, class: className, style: userStyle, ...rest } = props;

  const computed: CSSProperties = {
    flex: `${flex} 1 auto`,
    minWidth: 0,
    minHeight: 0,
  };

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  return (
    <div class={className} style={style} {...rest}>
      <Slot />
    </div>
  );
});
