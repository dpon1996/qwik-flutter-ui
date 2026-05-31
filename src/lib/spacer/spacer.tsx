/**
 * `Spacer` — empty flexible spacer inside `Row` / `Column`.
 * Flutter equivalent of `Spacer`. See `docs/API_DESIGN.md` §7.
 *
 * Behaviour (from the spec):
 *   Internally: `flex-grow: <flex>; flex-shrink: 1; flex-basis: 0`.
 *   Outside a flex parent: silent no-op (no dev-time warning in v1).
 *
 * Implementation notes:
 *  - All three flex properties are emitted as inline `style`. They are
 *    per-instance (flex value is dynamic) and there are only three of
 *    them, so a CSS module would add ceremony without saving anything.
 *  - No `<Slot />` — Spacer is a zero-child widget by design (the spec
 *    is explicit: "No children.").
 *  - The user's `class` and `style` are merged with internal ones with
 *    user values winning (§0.6). This is intentional: a user who wants
 *    to override `flex-shrink` or `flex-basis` for a one-off layout can,
 *    without us needing a dedicated prop.
 *  - `BaseProps` passthrough (`id`, `role`, `aria-*`, `data-*`) is
 *    forwarded onto the rendered element via `...rest`.
 *  - When the parent is NOT a flex container, all three flex properties
 *    are silently ignored by the browser — exactly the spec's
 *    "silent no-op" requirement.
 */

import { component$, type CSSProperties } from "@builder.io/qwik";

import type { SpacerProps } from "./types";

export const Spacer = component$<SpacerProps>((props) => {
  const { flex = 1, class: className, style: userStyle, ...rest } = props;

  /* Per spec: flex-grow: <flex>; flex-shrink: 1; flex-basis: 0. */
  const computed: CSSProperties = {
    flexGrow: flex,
    flexShrink: 1,
    flexBasis: 0,
  };

  /* User style wins on conflicts (§0.6). */
  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  return <div class={className} style={style} {...rest} />;
});
