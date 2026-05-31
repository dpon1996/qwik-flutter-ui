/**
 * `Image` — displays an image from a URL via a semantic `<img>`.
 * Flutter equivalent of `Image.network`. See `docs/API_DESIGN.md` §18.
 *
 * Implementation notes:
 *  - Zero-slot, self-closing component (no children).
 *  - `loading` defaults to `ImageLoading.lazy` (decision #40).
 *  - `placeholder` / `error` enums; `placeholderBuilder$` / `errorBuilder$` override presets.
 *  - `BoxFit.fitWidth` / `fitHeight` enum values fall back to `object-fit: none`
 *    until full parity ships (§22.5).
 *  - Per-instance styles are inline for SSR (Principle #4).
 *  - User `class` / `style` merge with internal values; user wins (§0.6).
 */

import {
  $,
  component$,
  Resource,
  useResource$,
  useSignal,
  type CSSProperties,
} from "@builder.io/qwik";

import {
  BoxFit,
  ImageError,
  ImageLoading,
  ImagePlaceholder,
} from "../_shared";
import { toLength } from "../_shared/internal";

import styles from "./image.module.css";
import type {
  ImageErrorBuilder,
  ImagePlaceholderBuilder,
  ImageProps,
} from "./types";

const PlaceholderBuilderLayer = component$<{
  builder$: ImagePlaceholderBuilder;
}>((props) => {
  const content = useResource$(async () => props.builder$());
  return (
    <div class={[styles.layer, styles.layerCustom].join(" ")} aria-hidden="true">
      <Resource value={content} onResolved={(node) => <>{node}</>} />
    </div>
  );
});

const ErrorBuilderLayer = component$<{
  builder$: ImageErrorBuilder;
  event: Event;
}>((props) => {
  const content = useResource$(async () => props.builder$(props.event));
  return (
    <div
      class={[styles.layer, styles.layerCustom, styles.errorLayer].join(" ")}
      role="alert"
    >
      <Resource value={content} onResolved={(node) => <>{node}</>} />
    </div>
  );
});

/** Map `BoxFit` enum values to CSS `object-fit`. */
function boxFitToObjectFit(fit: BoxFit): string {
  if (fit === BoxFit.fitWidth || fit === BoxFit.fitHeight) {
    return "none";
  }
  return fit;
}

const ERROR_MESSAGE = "Image failed to load";

export const Image = component$<ImageProps>((props) => {
  const {
    src,
    alt,
    decorative = false,
    width,
    height,
    minWidth,
    minHeight,
    fit = BoxFit.scaleDown,
    alignment = "center",
    opacity,
    loading = ImageLoading.lazy,
    placeholder = ImagePlaceholder.none,
    placeholderBuilder$,
    error = ImageError.text,
    errorBuilder$,
    class: className,
    style: userStyle,
    role: roleProp,
    ...rest
  } = props;

  const loaded = useSignal(false);
  const hasError = useSignal(false);
  const errorEvent = useSignal<Event | undefined>(undefined);

  const hasPlaceholderBuilder = placeholderBuilder$ !== undefined;
  const hasErrorBuilder = errorBuilder$ !== undefined;

  const showPlaceholder =
    !loaded.value &&
    !hasError.value &&
    (hasPlaceholderBuilder || placeholder !== ImagePlaceholder.none);

  const showError =
    hasError.value &&
    (hasErrorBuilder || error !== ImageError.none);

  const hideImage =
    hasError.value && (hasErrorBuilder || error !== ImageError.none);

  const wrapperStyle: CSSProperties = {};
  if (width !== undefined) wrapperStyle.width = toLength(width);
  if (height !== undefined) wrapperStyle.height = toLength(height);
  if (minWidth !== undefined) wrapperStyle.minWidth = toLength(minWidth);
  if (minHeight !== undefined) wrapperStyle.minHeight = toLength(minHeight);

  const imgStyle: CSSProperties = {
    objectFit: boxFitToObjectFit(fit) as CSSProperties["objectFit"],
    objectPosition: alignment,
  };

  if (opacity !== undefined) imgStyle.opacity = opacity;

  const mergedWrapperStyle: CSSProperties = userStyle
    ? { ...wrapperStyle, ...(userStyle as CSSProperties) }
    : wrapperStyle;

  const rootClasses = [styles.root, className].filter(Boolean).join(" ");
  const imgClasses = [
    styles.image,
    hideImage ? styles.imageHidden : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const presetPlaceholderClasses = [
    styles.layer,
    placeholder === ImagePlaceholder.skeleton
      ? styles.placeholderSkeleton
      : styles.placeholderShimmer,
  ].join(" ");

  const imgAlt = decorative ? "" : (alt ?? "");
  const imgRole = decorative ? (roleProp ?? "presentation") : roleProp;

  const onLoad$ = $(() => {
    loaded.value = true;
  });

  const onError$ = $((ev: Event) => {
    hasError.value = true;
    errorEvent.value = ev;
  });

  const needsWrapper =
    hasPlaceholderBuilder ||
    hasErrorBuilder ||
    placeholder !== ImagePlaceholder.none ||
    error !== ImageError.none ||
    minWidth !== undefined ||
    minHeight !== undefined;

  if (needsWrapper) {
    if (width !== undefined) imgStyle.width = "100%";
    if (height !== undefined) imgStyle.height = "100%";
  } else {
    if (width !== undefined) imgStyle.width = toLength(width);
    if (height !== undefined) imgStyle.height = toLength(height);
  }

  const img = (
    <img
      class={imgClasses}
      style={imgStyle}
      src={src}
      alt={imgAlt}
      loading={loading}
      role={imgRole}
      onLoad$={onLoad$}
      onError$={onError$}
      {...rest}
    />
  );

  if (!needsWrapper) {
    return img;
  }

  return (
    <div
      class={rootClasses}
      style={mergedWrapperStyle}
      aria-busy={showPlaceholder ? true : undefined}
    >
      {showPlaceholder &&
        (hasPlaceholderBuilder ? (
          <PlaceholderBuilderLayer builder$={placeholderBuilder$} />
        ) : (
          <div class={presetPlaceholderClasses} aria-hidden="true" />
        ))}
      {showError && hasErrorBuilder && errorEvent.value && (
        <ErrorBuilderLayer
          builder$={errorBuilder$}
          event={errorEvent.value}
        />
      )}
      {showError && !hasErrorBuilder && (
        <div
          class={[styles.layer, styles.errorLayer].join(" ")}
          role="alert"
          aria-label={error === ImageError.icon ? ERROR_MESSAGE : undefined}
        >
          {error === ImageError.icon ? (
            <svg
              class={styles.errorIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          ) : (
            <span>{ERROR_MESSAGE}</span>
          )}
        </div>
      )}
      {img}
    </div>
  );
});
