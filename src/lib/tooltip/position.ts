/**
 * Tooltip positioning — re-exports shared anchor math (§81, OV10).
 */

export {
  computeAnchorPosition as computeTooltipPosition,
  type AnchorCoordinates as TooltipCoordinates,
} from "../overlay/anchor-position";
