/**
 * `Row` prop types. See `docs/API_DESIGN.md` §3.
 */

import type { FlexProps } from "../_shared";

/**
 * Props for the `Row` widget — a horizontal flex layout. Flutter equivalent
 * of `Row`.
 *
 * `RowProps` is a distinct alias of `FlexProps` (shared with `Column`).
 * The alias exists for nicer editor hovers and to allow future divergence
 * without a breaking change.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RowProps extends FlexProps {}
