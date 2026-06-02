/**
 * `ThemeProvider` context — merged `ThemeData` for descendants (§57).
 */

import { createContextId } from "@builder.io/qwik";

import type { ThemeData } from "../_shared";

export const ThemeContext = createContextId<ThemeData>("qfu.theme");
