/**
 * `ThemeProvider` context — merged `ThemeData` for descendants (§57).
 * Consumed by `ThemeProvider` / `useTheme()` in a later milestone.
 */

import { createContextId } from "@builder.io/qwik";

import type { ThemeData } from "./types";

export const ThemeContext = createContextId<ThemeData>("qfu.theme");
