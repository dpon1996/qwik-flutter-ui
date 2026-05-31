/**
 * `Image` prop types. See `docs/API_DESIGN.md` §18.
 */

import type { BaseProps, BoxFit, ImageLoading, Length } from "../_shared";

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

  /** Maps to CSS `object-fit`. Default `BoxFit.scaleDown`. */
  fit?: BoxFit;

  /** CSS `object-position`. Default `"center"`. */
  alignment?: string;

  /** `0..1` opacity on the `<img>` element. */
  opacity?: number;

  /** Native lazy-loading hint. Default `ImageLoading.lazy`. */
  loading?: ImageLoading;
}
