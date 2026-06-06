/**
 * Overlay infrastructure constants (§74, OV1, OV2).
 */

/** DOM `id` for the in-tree portal host (`§74`, OV1). */
export const OVERLAY_HOST_ID = "qfu-overlay-root";

/** Host marker for queries and tests. */
export const OVERLAY_HOST_DATA_ATTR = "data-qfu-overlay-host";

/** CSS custom property for the first layer z-index (§74.2). */
export const CSS_VAR_OVERLAY_Z_BASE = "--qfu-overlay-z-base";

/** Default when `zIndexBase` prop is omitted (§74.4). */
export const DEFAULT_OVERLAY_Z_INDEX_BASE = 1000;
