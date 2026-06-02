/**
 * Map `Text` `as` tag → `TextTheme` key (§57 Phase 3).
 */

import type { TextTag } from "../_shared";
import type { TextStyle, TextTheme } from "../theme/types";

const HEADING_TAGS = new Set<TextTag>([
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
]);

/** Which `TextTheme` entry applies for a given semantic tag. */
export function textThemeKeyForTag(
  as: TextTag,
): keyof TextTheme {
  if (as === "label") return "label";
  if (as === "small") return "caption";
  if (HEADING_TAGS.has(as)) return "title";
  return "body";
}

/** Resolved theme typography for this `Text` instance, if any. */
export function resolveTextThemeStyle(
  as: TextTag,
  textTheme?: TextTheme,
): TextStyle | undefined {
  if (textTheme === undefined) return undefined;
  return textTheme[textThemeKeyForTag(as)];
}
