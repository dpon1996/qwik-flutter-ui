/**
 * `GridView` — scrollable grid of slotted children.
 * Flutter equivalent of `GridView`. See `docs/API_DESIGN.md` §24.
 *
 * Flutter → CSS mapping (vertical scroll, default):
 *
 *   columns          → grid-template-columns: repeat(n, minmax(0, 1fr))
 *   minItemWidth     → repeat(auto-fill, minmax(minItemWidth, 1fr))
 *   gap              → column-gap (crossAxisSpacing)
 *   mainAxisSpacing  → row-gap (mainAxisSpacing)
 *   childAspectRatio → aspect-ratio on each direct child
 *   padding          → scrollport padding
 *
 * If both `columns` and `minItemWidth` are set, `columns` wins (dev warning).
 *
 * Flutter naming: `crossAxisCount` / `crossAxisSpacing` → `columns` / `gap`.
 *
 * v1.2: CSS Grid only — no builder, slivers, or `ScrollController` (§31).
 * No automatic `role="grid"` / `gridcell` (§24 accessibility).
 */

import { Slot, component$, type CSSProperties } from "@builder.io/qwik";

import { Axis, Clip } from "../_shared";
import { toEdgeInsetsString, toLength } from "../_shared/internal";
import type { Length } from "../_shared/types";

import styles from "./grid-view.module.css";
import type { GridViewProps } from "./types";

const FALLBACK_ASPECT_RATIO = 1;

function normalizeChildAspectRatio(value: number): number {
  if (Number.isFinite(value) && value > 0) {
    return value;
  }

  if (import.meta.env.DEV) {
    console.warn(
      `[GridView] Invalid childAspectRatio (${String(value)}); clamping to ${FALLBACK_ASPECT_RATIO}.`,
    );
  }

  return FALLBACK_ASPECT_RATIO;
}

function buildColumnTemplate(columns?: number, minItemWidth?: Length): string {
  if (columns !== undefined && columns > 0) {
    return `repeat(${Math.floor(columns)}, 1fr)`;
  }

  if (minItemWidth !== undefined) {
    return `repeat(auto-fill, minmax(${toLength(minItemWidth)}, 1fr))`;
  }

  return "repeat(1, 1fr)";
}

function buildRowTemplate(columns?: number, minItemWidth?: Length): string {
  if (columns !== undefined && columns > 0) {
    return `repeat(${Math.floor(columns)}, 1fr)`;
  }

  if (minItemWidth !== undefined) {
    return `repeat(auto-fill, minmax(${toLength(minItemWidth)}, 1fr))`;
  }

  return "repeat(1, 1fr)";
}

export const GridView = component$<GridViewProps>((props) => {
  const {
    axis = Axis.vertical,
    reverse = false,
    padding,
    columns,
    minItemWidth,
    gap = 0,
    mainAxisSpacing = 0,
    childAspectRatio,
    clipBehavior = Clip.hardEdge,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  if (import.meta.env.DEV && columns !== undefined && minItemWidth !== undefined) {
    console.warn(
      "[GridView] Both `columns` and `minItemWidth` are set; `columns` takes precedence.",
    );
  }

  const isVertical = axis === Axis.vertical;
  const safeAspect =
    childAspectRatio !== undefined
      ? normalizeChildAspectRatio(childAspectRatio)
      : undefined;

  const scrollportClasses = [
    styles.scrollport,
    isVertical ? styles["axis-vertical"] : styles["axis-horizontal"],
    clipBehavior === Clip.none ? styles["cross-visible"] : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const gridClasses = [
    styles.grid,
    reverse
      ? isVertical
        ? styles["grid-reverse-vertical"]
        : styles["grid-reverse-horizontal"]
      : undefined,
    safeAspect !== undefined ? styles["has-child-aspect"] : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const scrollportStyle: CSSProperties = {};
  if (padding !== undefined) {
    scrollportStyle.padding = toEdgeInsetsString(padding);
  }

  const gridStyle: CSSProperties = {};

  if (isVertical) {
    gridStyle.gridTemplateColumns = buildColumnTemplate(columns, minItemWidth);
    gridStyle.columnGap = toLength(gap);
    gridStyle.rowGap = toLength(mainAxisSpacing);
  } else {
    gridStyle.gridTemplateRows = buildRowTemplate(columns, minItemWidth);
    gridStyle.gridAutoFlow = "column";
    gridStyle.rowGap = toLength(gap);
    gridStyle.columnGap = toLength(mainAxisSpacing);
    gridStyle.width = "max-content";
    gridStyle.minWidth = "min-content";
  }

  if (safeAspect !== undefined) {
    gridStyle["--qfu-child-aspect-ratio"] = String(safeAspect);
  }

  const style: CSSProperties = userStyle
    ? { ...scrollportStyle, ...(userStyle as CSSProperties) }
    : scrollportStyle;

  return (
    <div class={scrollportClasses} style={style} {...rest}>
      <div class={gridClasses} style={gridStyle}>
        <Slot />
      </div>
    </div>
  );
});
