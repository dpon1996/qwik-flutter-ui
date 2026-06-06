/**
 * Tooltip positioning helpers (§81, OV10 — manual placement only).
 */

import { OverlayPlacement } from "../_shared/enums";
import type { OverlayPlacement as OverlayPlacementType } from "../_shared/enums";

const TOOLTIP_GAP_PX = 8;

export interface TooltipCoordinates {
  top: number;
  left: number;
}

/** Compute fixed viewport coordinates for a tooltip panel. */
export function computeTooltipPosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  placement: OverlayPlacementType = OverlayPlacement.top,
): TooltipCoordinates {
  switch (placement) {
    case OverlayPlacement.bottom:
      return {
        top: triggerRect.bottom + TOOLTIP_GAP_PX,
        left:
          triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
      };
    case OverlayPlacement.start:
      return {
        top:
          triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
        left: triggerRect.left - tooltipRect.width - TOOLTIP_GAP_PX,
      };
    case OverlayPlacement.end:
      return {
        top:
          triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
        left: triggerRect.right + TOOLTIP_GAP_PX,
      };
    case OverlayPlacement.center:
      return {
        top:
          triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
        left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
      };
    case OverlayPlacement.top:
    default:
      return {
        top: triggerRect.top - tooltipRect.height - TOOLTIP_GAP_PX,
        left:
          triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
      };
  }
}
