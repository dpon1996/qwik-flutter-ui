/**
 * `SnackBarHost` — queue + timing + overlay layer ownership (§80, OV14).
 *
 * Renders `SnackBar` for the visible queue entry. Queue, duration, and layer
 * registration remain host-owned; `SnackBar` is presentational + action handling.
 */

import {
  $,
  component$,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
  type CSSProperties,
} from "@builder.io/qwik";

import type { SnackBarHostProps, SnackBarOptions } from "../_shared/overlay-types";
import { useOverlayContext } from "../overlay/use-overlay-layer";

import { SNACKBAR_HOST_DATA_ATTR } from "./constants";
import { SnackBarContext, type SnackBarContextValue } from "./context";
import { bindSnackBarHost, unbindSnackBarHost } from "./host-registry";
import {
  createSnackBarEntry,
  createSnackBarQueueStore,
  dismissEntry,
  enqueueEntry,
  snackBarQueueSize,
  type SnackBarEntry,
} from "./queue";
import hostStyles from "./snack-bar-host.module.css";
import { SnackBar } from "./snack-bar";

function dismissWithCallbacks(
  store: ReturnType<typeof createSnackBarQueueStore>,
  id?: string,
): SnackBarEntry | null {
  const dismissed = dismissEntry(store, id);
  if (dismissed?.onDismiss$) {
    void dismissed.onDismiss$();
  }
  return dismissed;
}

export const SnackBarHost = component$<SnackBarHostProps>((props) => {
  const { class: className, style: userStyle, ...rest } = props;

  const store = useStore(createSnackBarQueueStore);
  const overlayContext = useOverlayContext();
  const layerZIndex = useSignal<number | undefined>(undefined);

  const enqueue$ = $((options: SnackBarOptions): string => {
    const entry = createSnackBarEntry(options);
    enqueueEntry(store, entry);
    return entry.id;
  });

  const dismiss$ = $((id?: string) => {
    dismissWithCallbacks(store, id);
  });

  const contextValue: SnackBarContextValue = {
    store,
    enqueue$,
    dismiss$,
  };

  useContextProvider(SnackBarContext, contextValue);

  useVisibleTask$(({ cleanup }) => {
    const binding = { store };
    bindSnackBarHost(binding);
    cleanup(() => {
      unbindSnackBarHost(binding);
    });
  });

  /** Host owns auto-dismiss timing (§80.4) — immediate removal on fire (OV15). */
  useVisibleTask$(({ track, cleanup }) => {
    track(() => store.visible?.id);
    track(() => store.visible?.duration);

    const visible = store.visible;
    if (!visible || visible.duration <= 0) {
      return;
    }

    const entryId = visible.id;
    const timer = window.setTimeout(() => {
      dismissWithCallbacks(store, entryId);
    }, visible.duration);

    cleanup(() => {
      window.clearTimeout(timer);
    });
  });

  /** Overlay layer registration — non-modal snack stack slot (OV2). */
  useVisibleTask$(({ track, cleanup }) => {
    track(() => store.visible?.id);

    const visible = store.visible;
    if (!overlayContext || !visible) {
      layerZIndex.value = undefined;
      return;
    }

    let unregister: (() => void) | undefined;
    let cancelled = false;

    void overlayContext
      .registerLayer$({ id: visible.id, modal: false })
      .then((handle) => {
        if (cancelled) {
          handle.unregister();
          return;
        }
        layerZIndex.value = handle.zIndex;
        unregister = handle.unregister;
      });

    cleanup(() => {
      cancelled = true;
      unregister?.();
      layerZIndex.value = undefined;
    });
  });

  const style: CSSProperties = {
    ...(userStyle as CSSProperties | undefined),
  };

  const visible = store.visible;
  const showSnackBar = visible !== null && layerZIndex.value !== undefined;

  return (
    <div
      class={[hostStyles.host, className].filter(Boolean).join(" ")}
      style={style}
      {...{ [SNACKBAR_HOST_DATA_ATTR]: "" }}
      data-qfu-snackbar-visible-id={visible?.id}
      data-qfu-snackbar-visible-role={visible?.role}
      data-qfu-snackbar-queue-size={snackBarQueueSize(store)}
      aria-hidden={showSnackBar ? undefined : "true"}
      {...rest}
    >
      {showSnackBar && visible ? (
        <div
          class={hostStyles.viewport}
          style={{ zIndex: layerZIndex.value }}
        >
          <SnackBar
            entryId={visible.id}
            a11yRole={visible.role}
            message={visible.message}
            actionLabel={visible.actionLabel}
            duration={visible.duration}
            onAction$={visible.onAction$}
            onDismiss$={visible.onDismiss$}
          />
        </div>
      ) : null}
    </div>
  );
});
