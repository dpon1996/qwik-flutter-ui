/**
 * `Image` prop types. See `docs/API_DESIGN.md` §18.
 */

import type { QRL } from "@builder.io/qwik";

import type {
  BaseProps,
  BoxFit,
  ImageError,
  ImageLoading,
  ImagePlaceholder,
  Length,
} from "../_shared";

/** Custom placeholder content until the image loads (Flutter `frameBuilder` parity). */
export type ImagePlaceholderBuilder = QRL<() => unknown>;

/** Custom error content when the image fails (Flutter `errorBuilder` parity). */
export type ImageErrorBuilder = QRL<(event: Event) => unknown>;

/**
 * Props for the `Image` widget — displays an image from a URL.
 * Flutter equivalent of `Image.network` (v1.1 is URL-only).
 */
export interface ImageProps extends BaseProps {
  /** Image URL (required). */
  src: string;

  /**
   * Accessible name. Required unless `decorative={true}`.
   * Maps to the native `alt` attribute.
   */
  alt?: string;

  /** When true, sets `alt=""` and `role="presentation"`. */
  decorative?: boolean;

  width?: Length;
  height?: Length;
  minWidth?: Length;
  minHeight?: Length;

  /** Maps to CSS `object-fit`. Default `BoxFit.scaleDown`. */
  fit?: BoxFit;

  /** CSS `object-position`. Default `"center"`. */
  alignment?: string;

  /** `0..1` opacity on the `<img>` element. */
  opacity?: number;

  /** Native lazy-loading hint. Default `ImageLoading.lazy`. */
  loading?: ImageLoading;

  /**
   * Built-in placeholder preset until `load`. Default `ImagePlaceholder.none`.
   * Ignored when `placeholderBuilder$` is set.
   */
  placeholder?: ImagePlaceholder;

  /**
   * Custom placeholder content until `load`. Takes precedence over `placeholder`.
   * Rendered inside a positioned layer (`aria-hidden`); root uses `aria-busy` until load.
   */
  placeholderBuilder$?: ImagePlaceholderBuilder;

  /**
   * Built-in error preset when load fails. Default `ImageError.text`.
   * Ignored when `errorBuilder$` is set (unless `error={ImageError.none}` and no builder).
   */
  error?: ImageError;

  /**
   * Custom error content when load fails. Takes precedence over `error`.
   * Rendered inside a layer with `role="alert"`; `<img>` is hidden on error.
   */
  errorBuilder$?: ImageErrorBuilder;
}
