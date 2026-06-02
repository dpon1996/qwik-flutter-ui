/**
 * Control-only slice of `InputDecoration` (placeholder / affixes).
 * Label, helper, and error chrome come from `field-decoration` (§59).
 */

import type { InputDecoration } from "../_shared";

export function pickControlDecoration(
  decoration: InputDecoration | undefined,
): InputDecoration | undefined {
  if (decoration === undefined) {
    return undefined;
  }

  const { placeholder, prefix, suffix } = decoration;

  if (
    placeholder === undefined &&
    prefix === undefined &&
    suffix === undefined
  ) {
    return undefined;
  }

  return { placeholder, prefix, suffix };
}
