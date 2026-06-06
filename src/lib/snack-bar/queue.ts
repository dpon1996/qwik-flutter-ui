/**
 * SnackBar queue — pure enqueue / dequeue / dismiss (§80.2, OV14).
 *
 * Stacking policy: **one visible snack at a time**; overflow items use a **FIFO
 * pending queue** (not replace). Promotion is immediate on dismiss (OV15).
 */

import type { QRL } from "@builder.io/qwik";

import type { SnackBarOptions } from "../_shared/overlay-types";

import { DEFAULT_SNACKBAR_DURATION } from "./constants";

/** Prepared a11y role metadata (§84) — UI renders later. */
export type SnackBarA11yRole = "status" | "alert";

/** One queued snack entry (infrastructure metadata only in v1.7 Phase 7). */
export interface SnackBarEntry {
  id: string;
  message: string;
  actionLabel?: string;
  onAction$?: QRL<() => void>;
  onDismiss$?: QRL<() => void>;
  /** Auto-dismiss duration in ms; host owns timer (§80.4). */
  duration: number;
  role: SnackBarA11yRole;
}

/** Reactive queue store owned by `SnackBarHost`. */
export interface SnackBarQueueStore {
  visible: SnackBarEntry | null;
  pending: SnackBarEntry[];
}

let nextEntryId = 0;

/** Create a stable entry id (client-safe; not used during SSR render paths). */
export function createSnackBarEntryId(): string {
  nextEntryId += 1;
  return `qfu-snack-${nextEntryId}`;
}

/** Resolve a11y role from options — `assertive` ships later (§80.2). */
export function resolveSnackBarA11yRole(
  _options: SnackBarOptions,
): SnackBarA11yRole {
  return "status";
}

/** Build a queue entry from public enqueue options. */
export function createSnackBarEntry(options: SnackBarOptions): SnackBarEntry {
  return {
    id: createSnackBarEntryId(),
    message: options.message,
    actionLabel: options.actionLabel,
    onAction$: options.onAction$,
    onDismiss$: options.onDismiss$,
    duration: options.duration ?? DEFAULT_SNACKBAR_DURATION,
    role: resolveSnackBarA11yRole(options),
  };
}

export function createSnackBarQueueStore(): SnackBarQueueStore {
  return {
    visible: null,
    pending: [],
  };
}

/** Enqueue — shows immediately when idle, else FIFO pending (§80.2). */
export function enqueueEntry(
  store: SnackBarQueueStore,
  entry: SnackBarEntry,
): void {
  if (store.visible === null) {
    store.visible = entry;
    return;
  }
  store.pending.push(entry);
}

/**
 * Dismiss visible snack (or remove matching pending entry).
 * Promotes next pending item immediately (OV15 — no exit delay).
 */
export function dismissEntry(
  store: SnackBarQueueStore,
  id?: string,
): SnackBarEntry | null {
  if (id === undefined) {
    return promoteNext(store);
  }

  if (store.visible?.id === id) {
    return promoteNext(store);
  }

  const pendingIndex = store.pending.findIndex((entry) => entry.id === id);
  if (pendingIndex >= 0) {
    store.pending.splice(pendingIndex, 1);
  }

  return null;
}

/** Remove visible snack and promote FIFO pending head. */
function promoteNext(store: SnackBarQueueStore): SnackBarEntry | null {
  const dismissed = store.visible;
  store.visible = store.pending.shift() ?? null;
  return dismissed;
}

/** Pending + visible count (for host metadata). */
export function snackBarQueueSize(store: SnackBarQueueStore): number {
  return (store.visible ? 1 : 0) + store.pending.length;
}
