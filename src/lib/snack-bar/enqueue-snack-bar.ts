/**
 * `enqueueSnackBar` / `enqueueSnackBar$` — imperative SnackBar enqueue (§80, OV14).
 *
 * Synchronous dispatch to `SnackBarHost`. Implemented as a plain function (not a
 * lazy QRL chunk). Qwik treats identifiers ending in `$` as QRL references inside
 * `$()` handlers — call `enqueueSnackBar` (no suffix) from event handlers.
 */

import type { SnackBarOptions } from "../_shared/overlay-types";

import { dispatchEnqueueSnackBar } from "./host-registry";

/** Enqueue a snack for the nearest mounted `SnackBarHost`. */
export function enqueueSnackBar(options: SnackBarOptions): void {
  dispatchEnqueueSnackBar(options);
}

/** Public API alias (§80). Prefer `enqueueSnackBar` inside `$()` handlers. */
export { enqueueSnackBar as enqueueSnackBar$ };
