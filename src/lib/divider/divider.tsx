/**
 * `Divider` — a thin line separator (horizontal or vertical). Flutter
 * equivalent of `Divider` / `VerticalDivider`, unified via `axis`.
 * See `docs/API_DESIGN.md` §16.
 *
 * Implementation notes:
 *  - Horizontal: native `<hr>` (implicit `role="separator"`).
 *  - Vertical: `<div role="separator" aria-orientation="vertical">` (`<hr>` is
 *    invalid for vertical rules).
 *  - Line is centered in the cross-axis `size` box; `indent` / `endIndent`
 *    inset the line along the main axis (Flutter parity).
 *  - Numeric `Length` → `px` via `_shared/internal` (Principle #9).
 *  - Zero-slot widget — no children.
 */

import { component$, type CSSProperties } from "@builder.io/qwik";

import { Axis } from "../_shared";
import { toLength } from "../_shared/internal";

import styles from "./divider.module.css";
import type { Length } from "../_shared";
import type { DividerProps } from "./types";

const DEFAULT_COLOR = "#e0e0e0";

/**
 * Horizontal line styles for `<hr>`. Uses `border-top` when `size` and
 * `thickness` are numeric (px) so the line is visible inside flex parents;
 * otherwise falls back to a centered `background` strip.
 */
function horizontalHrStyle(
  size: Length,
  thickness: Length,
  indent: Length,
  endIndent: Length,
  color: string,
): CSSProperties {
  const thicknessCss = toLength(thickness);
  const sizeCss = toLength(size);
  const base: CSSProperties = {
    flexShrink: 0,
    width: "100%",
    alignSelf: "stretch",
    height: sizeCss,
    minHeight: sizeCss,
    marginLeft: toLength(indent),
    marginRight: toLength(endIndent),
    marginTop: 0,
    marginBottom: 0,
    border: "none",
    boxSizing: "border-box",
  };

  if (typeof size === "number" && typeof thickness === "number") {
    const pad = Math.max(0, (size - thickness) / 2);
    return {
      ...base,
      paddingTop: `${pad}px`,
      paddingBottom: `${pad}px`,
      borderTop: `${thicknessCss} solid ${color}`,
    };
  }

  return {
    ...base,
    backgroundColor: "transparent",
    backgroundImage: `linear-gradient(${color}, ${color})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: `100% ${thicknessCss}`,
  };
}

export const Divider = component$<DividerProps>((props) => {
  const {
    axis = Axis.horizontal,
    thickness = 1,
    size = 16,
    indent = 0,
    endIndent = 0,
    color = DEFAULT_COLOR,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const thicknessCss = toLength(thickness);
  const sizeCss = toLength(size);
  const indentCss = toLength(indent);
  const endIndentCss = toLength(endIndent);

  if (axis === Axis.vertical) {
    const computed: CSSProperties = {
      width: sizeCss,
    };

    const wrapperStyle: CSSProperties = userStyle
      ? { ...computed, ...(userStyle as CSSProperties) }
      : computed;

    const lineStyle: CSSProperties = {
      width: thicknessCss,
      marginTop: indentCss,
      marginBottom: endIndentCss,
      backgroundColor: color,
    };

    const classes = [styles.vertical, className].filter(Boolean).join(" ");

    return (
      <div
        class={classes}
        style={wrapperStyle}
        role="separator"
        aria-orientation="vertical"
        {...rest}
      >
        <div class={styles.verticalLine} style={lineStyle} />
      </div>
    );
  }

  /* Horizontal — `<hr>`; flex-shrink: 0 so Column/Row parents do not collapse it. */
  const computed = horizontalHrStyle(
    size,
    thickness,
    indent,
    endIndent,
    color,
  );

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [styles.horizontal, className].filter(Boolean).join(" ");

  return <hr class={classes} style={style} {...rest} />;
});
