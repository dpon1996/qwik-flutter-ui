/**
 * `Image` — displays an image from a URL via a semantic `<img>`.
 * Flutter equivalent of `Image.network`. See `docs/API_DESIGN.md` §18.
 *
 * Implementation notes:
 *  - Zero-slot, self-closing component (no children).
 *  - `loading` defaults to `ImageLoading.lazy` (decision #40).
 *  - `BoxFit.fitWidth` / `fitHeight` enum values fall back to `object-fit: none`
 *    until full parity ships (§22.5).
 *  - Per-instance styles are inline for SSR (Principle #4).
 *  - User `class` / `style` merge with internal values; user wins (§0.6).
 */

import { component$, type CSSProperties } from "@builder.io/qwik";

import { BoxFit, ImageLoading } from "../_shared";
import { toLength } from "../_shared/internal";

import styles from "./image.module.css";
import type { ImageProps } from "./types";

/** Map `BoxFit` enum values to CSS `object-fit`. */
function boxFitToObjectFit(fit: BoxFit): string {
  if (fit === BoxFit.fitWidth || fit === BoxFit.fitHeight) {
    return "none";
  }
  return fit;
}

export const Image = component$<ImageProps>((props) => {
  const {
    src,
    alt,
    decorative = false,
    width,
    height,
    fit = BoxFit.scaleDown,
    alignment = "center",
    opacity,
    loading = ImageLoading.lazy,
    class: className,
    style: userStyle,
    role: roleProp,
    ...rest
  } = props;

  const computed: CSSProperties = {
    objectFit: boxFitToObjectFit(fit) as CSSProperties["objectFit"],
    objectPosition: alignment,
  };

  if (width !== undefined) computed.width = toLength(width);
  if (height !== undefined) computed.height = toLength(height);
  if (opacity !== undefined) computed.opacity = opacity;

  const style: CSSProperties = userStyle
    ? { ...computed, ...(userStyle as CSSProperties) }
    : computed;

  const classes = [styles.image, className].filter(Boolean).join(" ");

  const imgAlt = decorative ? "" : (alt ?? "");
  const imgRole = decorative ? (roleProp ?? "presentation") : roleProp;

  return (
    <img
      class={classes}
      style={style}
      src={src}
      alt={imgAlt}
      loading={loading}
      role={imgRole}
      {...rest}
    />
  );
});
