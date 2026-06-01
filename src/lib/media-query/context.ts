/**
 * Qwik context for `MediaQuery`. No global store (Principle #5).
 */

import { createContextId } from "@builder.io/qwik";

import type { MediaQueryData } from "./types";

export const MediaQueryContext = createContextId<MediaQueryData>(
  "qfu.media-query",
);
