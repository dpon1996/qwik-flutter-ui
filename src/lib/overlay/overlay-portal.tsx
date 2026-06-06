/**
 * `OverlayPortal` — internal portal mount (§75, OV1, OV15).
 *
 * Renders layer content with `position: fixed` and container-assigned z-index.
 * Slot children stay in the OverlayPortal component tree (Qwik slot semantics).
 * Layer registration updates `#qfu-overlay-root` stack metadata (OV2).
 */

import { component$, Slot, useContext, useId } from "@builder.io/qwik";

import type { OverlayPortalProps } from "./internal-types";
import { OverlayPortalBridgeContext } from "./portal-bridge-context";
import styles from "./overlay-portal.module.css";
import { useOverlayLayer } from "./use-overlay-layer";

const NO_PORTAL_BRIDGE = null;

export const OverlayPortal = component$<OverlayPortalProps>((props) => {
  const generatedId = useId();
  const layerId = props.layerId ?? generatedId;

  useContext(OverlayPortalBridgeContext, NO_PORTAL_BRIDGE);

  const layer = useOverlayLayer(layerId, props, props.modal);

  const zIndex = layer.zIndex.value;
  if (!props.open || zIndex === undefined) {
    return null;
  }

  const layerClass = [styles.layer, props.class].filter(Boolean).join(" ");

  return (
    <div
      class={layerClass}
      style={{
        zIndex,
        ...(props.style as Record<string, string | number | undefined>),
      }}
      data-qfu-overlay-layer={layerId}
      data-qfu-overlay-host-target={layer.context?.hostId}
      data-qfu-overlay-modal={props.modal ? "" : undefined}
    >
      <Slot />
    </div>
  );
});
