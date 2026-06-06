/**
 * Renders portaled layer content inside `#qfu-overlay-root` (OV1).
 * Internal — not exported from `src/index.ts`.
 */

import { component$, useContext } from "@builder.io/qwik";

import type { LayerStackStore } from "./layer-stack";
import { getPortalBridgeEntry } from "./portal-bridge";
import { OverlayPortalBridgeContext } from "./portal-bridge-context";
import styles from "./overlay-portal.module.css";

export interface OverlayPortalHostProps {
  stack: LayerStackStore;
}

export const OverlayPortalHost = component$<OverlayPortalHostProps>(
  ({ stack }) => {
    const bridge = useContext(OverlayPortalBridgeContext);

    return (
      <>
        {stack.layers.map((layer) => {
          const entry = getPortalBridgeEntry(bridge, layer.id);
          if (!entry) {
            return null;
          }

          const Content = entry.Content;
          const layerClass = [styles.layer, entry.class]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={layer.id}
              class={layerClass}
              style={{
                zIndex: layer.zIndex,
                ...entry.style,
              }}
              data-qfu-overlay-layer={layer.id}
              data-qfu-overlay-modal={layer.modal ? "" : undefined}
            >
              <Content />
            </div>
          );
        })}
      </>
    );
  },
);
