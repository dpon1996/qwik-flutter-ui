/**
 * Global `enqueueSnackBar$` dispatch — binds to mounted `SnackBarHost` (OV14).
 *
 * SSR: options buffer until host hydrates (§85). Client without host: buffer +
 * one-time dev warning (mirrors OV13 pattern).
 */

import type { SnackBarOptions } from "../_shared/overlay-types";

import { createSnackBarEntry, enqueueEntry, type SnackBarQueueStore } from "./queue";

export interface SnackBarHostBinding {
  store: SnackBarQueueStore;
}

const pendingOptions: SnackBarOptions[] = [];
let activeBinding: SnackBarHostBinding | null = null;
let warnedMissingHost = false;

function flushPendingOptions(binding: SnackBarHostBinding): void {
  if (pendingOptions.length === 0) {
    return;
  }
  const batch = pendingOptions.splice(0, pendingOptions.length);
  for (const options of batch) {
    enqueueEntry(binding.store, createSnackBarEntry(options));
  }
}

/** Called from `SnackBarHost` on client mount. */
export function bindSnackBarHost(binding: SnackBarHostBinding): void {
  activeBinding = binding;
  flushPendingOptions(binding);
}

/** Called from `SnackBarHost` cleanup. */
export function unbindSnackBarHost(binding: SnackBarHostBinding): void {
  if (activeBinding === binding) {
    activeBinding = null;
  }
}

/** Imperative enqueue entry point for `enqueueSnackBar$`. */
export function dispatchEnqueueSnackBar(options: SnackBarOptions): void {
  if (activeBinding) {
    enqueueEntry(activeBinding.store, createSnackBarEntry(options));
    return;
  }

  pendingOptions.push(options);

  if (import.meta.env.SSR) {
    return;
  }

  if (import.meta.env.DEV && !warnedMissingHost) {
    warnedMissingHost = true;
    console.warn(
      "[SnackBar] enqueueSnackBar$ called without a mounted <SnackBarHost>. Place <SnackBarHost /> inside <OverlayContainer> (§80, OV14). Options are queued until a host mounts.",
    );
  }
}
