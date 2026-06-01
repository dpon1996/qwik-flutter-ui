/**
 * `ListView` — scrollable list of slotted children.
 * Flutter equivalent of `ListView`. See `docs/API_DESIGN.md` §23.
 *
 * Flutter → CSS mapping:
 *
 *   axis vertical     → scrollport overflow-y; list flex-direction column
 *   axis horizontal   → scrollport overflow-x; list flex-direction row
 *   gap               → gap on list flex container
 *   padding           → scrollport padding
 *   reverse           → column-reverse / row-reverse
 *   shrinkWrap        → scrollport expand vs shrink-wrap classes
 *   itemExtent        → --qfu-item-extent per direct child (flex 0 0 + fixed size)
 *   clipBehavior      → cross-axis overflow on scrollport
 *
 * Intentional API difference: `axis`, not Flutter's `scrollDirection`.
 *
 * v1.2: non-virtualized slotted children only — no `itemBuilder$`, `cacheExtent`,
 * or `ScrollController` (§23, §31).
 *
 * Accessibility: no automatic `role="list"` / `role="listitem"` (§26 L1).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import { Axis, Clip } from "../_shared";
import { toEdgeInsetsString, toLength } from "../_shared/internal";

import styles from "./list-view.module.css";
import type { ListViewProps } from "./types";

export const ListView = component$<ListViewProps>((props) => {
  const {
    axis = Axis.vertical,
    reverse = false,
    gap = 0,
    padding,
    shrinkWrap = false,
    itemExtent,
    clipBehavior = Clip.hardEdge,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const isVertical = axis === Axis.vertical;

  const scrollportClasses = [
    styles.scrollport,
    isVertical ? styles["axis-vertical"] : styles["axis-horizontal"],
    shrinkWrap ? styles["shrink-wrap"] : styles.expand,
    clipBehavior === Clip.none ? styles["cross-visible"] : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const listClasses = [
    styles.list,
    isVertical
      ? reverse
        ? styles["list-vertical-reverse"]
        : styles["list-vertical"]
      : reverse
        ? styles["list-horizontal-reverse"]
        : styles["list-horizontal"],
    itemExtent !== undefined ? styles["item-extent"] : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const computed: CSSProperties = {};
  if (padding !== undefined) {
    computed.padding = toEdgeInsetsString(padding);
  }

  const listStyle: CSSProperties = { gap: toLength(gap) };
  if (itemExtent !== undefined) {
    listStyle["--qfu-item-extent"] = toLength(itemExtent);
  }

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  return (
    <div class={scrollportClasses} style={style} {...rest}>
      <div class={listClasses} style={listStyle}>
        <Slot />
      </div>
    </div>
  );
});
