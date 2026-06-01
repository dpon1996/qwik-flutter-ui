/**
 * `SingleChildScrollView` — scrolls a single child when content overflows.
 * Flutter equivalent of `SingleChildScrollView`. See `docs/API_DESIGN.md` §22.
 *
 * Flutter → CSS mapping:
 *
 *   axis vertical    → overflow-y: auto; overflow-x hidden or visible (clip)
 *   axis horizontal  → overflow-x: auto; overflow-y hidden or visible (clip)
 *   reverse          → inner wrapper flex-direction *-reverse (§26 S4)
 *   padding          → scrollport padding (`toEdgeInsetsString`)
 *   clipBehavior     → cross-axis overflow (none = visible, hardEdge = hidden)
 *
 * Intentional API difference: prop is `axis`, not Flutter's `scrollDirection`.
 * Same `Axis` enum (§1.4); behavior is equivalent.
 *
 * Implementation notes:
 * - Outer `<div>` scrollport + inner `<div>` for reverse flex flow.
 * - `<Slot />` for children (§0.1 — multiple slots allowed; wrap in `Column` if needed).
 * - Pure CSS: no `useVisibleTask$`, no scroll listeners, SSR-safe.
 * - No default `role` or `tabIndex` (§22 accessibility).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import { Axis, Clip } from "../_shared";
import { toEdgeInsetsString } from "../_shared/internal";

import styles from "./single-child-scroll-view.module.css";
import type { SingleChildScrollViewProps } from "./types";

export const SingleChildScrollView = component$<SingleChildScrollViewProps>(
  (props) => {
    const {
      axis = Axis.vertical,
      reverse = false,
      padding,
      clipBehavior = Clip.hardEdge,
      class: className,
      style: userStyle,
      ...rest
    } = props;

    const isVertical = axis === Axis.vertical;

    const scrollportClasses = [
      styles.scrollport,
      isVertical ? styles["axis-vertical"] : styles["axis-horizontal"],
      clipBehavior === Clip.none ? styles["cross-visible"] : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const contentClass = (() => {
      if (isVertical) {
        return reverse
          ? styles["content-vertical-reverse"]
          : styles["content-vertical"];
      }
      return reverse
        ? styles["content-horizontal-reverse"]
        : styles["content-horizontal"];
    })();

    const contentClasses = [styles.content, contentClass].join(" ");

    const computed: CSSProperties = {};
    if (padding !== undefined) {
      computed.padding = toEdgeInsetsString(padding);
    }

    const style: CSSProperties = userStyle
      ? { ...computed, ...(userStyle as CSSProperties) }
      : computed;

    return (
      <div class={scrollportClasses} style={style} {...rest}>
        <div class={contentClasses}>
          <Slot />
        </div>
      </div>
    );
  },
);
