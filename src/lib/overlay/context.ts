/**
 * `OverlayContainer` context — internal only (§73.2, §75).
 */

import { createContextId } from "@builder.io/qwik";

import type { OverlayContextValue } from "./internal-types";

export const OverlayContext =
  createContextId<OverlayContextValue>("qfu.overlay");
