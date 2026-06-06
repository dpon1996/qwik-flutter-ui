/**
 * `SnackBarHost` context — queue store + dismiss/enqueue for future UI (§80, OV14).
 */

import { createContextId, type QRL } from "@builder.io/qwik";

import type { SnackBarOptions } from "../_shared/overlay-types";

import type { SnackBarQueueStore } from "./queue";

export interface SnackBarContextValue {
  readonly store: SnackBarQueueStore;
  enqueue$: QRL<(options: SnackBarOptions) => string>;
  dismiss$: QRL<(id?: string) => void>;
}

export const SnackBarContext =
  createContextId<SnackBarContextValue>("qfu.snack-bar");
