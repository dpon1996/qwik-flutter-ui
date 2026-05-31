/**
 * `Column` prop types. See `docs/API_DESIGN.md` §4.
 */

import type { FlexProps } from "../_shared";

/**
 * Props for the `Column` widget — a vertical flex layout. Flutter equivalent
 * of `Column`.
 *
 * `ColumnProps` is a distinct alias of `FlexProps` (shared with `Row`).
 * The alias exists for nicer editor hovers and to allow future divergence
 * without a breaking change.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ColumnProps extends FlexProps {}
