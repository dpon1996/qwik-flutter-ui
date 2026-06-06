/**
 * Internal portal content bridge context (OV1).
 */

import { createContextId } from "@builder.io/qwik";

import type { PortalBridgeStore } from "./portal-bridge";

export const OverlayPortalBridgeContext =
  createContextId<PortalBridgeStore>("qfu.overlay.portal-bridge");
