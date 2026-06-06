/**
 * Anchor overlay positioning (§81, §82, OV10 — manual placement only).
 */

import { OverlayPlacement } from "../_shared/enums";
import type { OverlayPlacement as OverlayPlacementType } from "../_shared/enums";

const ANCHOR_GAP_PX = 8;

export interface AnchorCoordinates {
  top: number;
  left: number;
}

/** Compute fixed viewport coordinates for an anchored overlay panel. */
export function computeAnchorPosition(
  anchorRect: DOMRect,
  panelRect: DOMRect,
  placement: OverlayPlacementType = OverlayPlacement.top,
): AnchorCoordinates {
  switch (placement) {
    case OverlayPlacement.bottom:
      return {
        top: anchorRect.bottom + ANCHOR_GAP_PX,
        left: anchorRect.left + (anchorRect.width - panelRect.width) / 2,
      };
    case OverlayPlacement.start:
      return {
        top: anchorRect.top + (anchorRect.height - panelRect.height) / 2,
        left: anchorRect.left - panelRect.width - ANCHOR_GAP_PX,
      };
    case OverlayPlacement.end:
      return {
        top: anchorRect.top + (anchorRect.height - panelRect.height) / 2,
        left: anchorRect.right + ANCHOR_GAP_PX,
      };
    case OverlayPlacement.center:
      return {
        top: anchorRect.top + (anchorRect.height - panelRect.height) / 2,
        left: anchorRect.left + (anchorRect.width - panelRect.width) / 2,
      };
    case OverlayPlacement.top:
    default:
      return {
        top: anchorRect.top - panelRect.height - ANCHOR_GAP_PX,
        left: anchorRect.left + (anchorRect.width - panelRect.width) / 2,
      };
  }
}
