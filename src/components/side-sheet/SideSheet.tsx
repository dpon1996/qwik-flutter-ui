/// <reference types="vite/client" />

/**
 * `SideSheet` — non-modal edge overlay panel for secondary content.
 * See `docs/API_DESIGN.md` §97.
 *
 * Implementation notes:
 *  - Stateless — controlled `open` only; no internal signals or callbacks (SS2–SS3).
 *  - Fixed edge overlay via internal `OverlayPortal` (`modal={false}`) — stacks above page chrome.
 *  - No backdrop or focus trap — main content remains interactive (§97.8).
 *  - Root `<aside>`; closed state uses hidden anchor aside (SS6).
 *  - `width` default 360px (left/right); `height` default 360px (top/bottom) (SS4, SS8).
 *  - `position` default `"right"` — left, right, top, or bottom screen edge (SS5).
 */

import {
  Slot,
  component$,
  useId,
  type CSSProperties,
  type JSXOutput,
} from "@builder.io/qwik";

import { SideSheetPosition, type BaseProps, type Length } from "../../lib/_shared";
import { toLength } from "../../lib/_shared/internal";
import { OverlayPortal } from "../../lib/overlay/overlay-portal";

import styles from "./SideSheet.module.css";

const DEFAULT_WIDTH: Length = 360;
const DEFAULT_HEIGHT: Length = 360;

export interface SideSheetProps extends BaseProps {
  /** When false, panel is hidden. Default **false** (SS1). */
  open?: boolean;

  /** Panel content — inspector, filters, details, etc. */
  children?: JSXOutput;

  /** Panel width for `left` / `right` edges. Default **360** px (SS4). */
  width?: Length;

  /** Panel height for `top` / `bottom` edges. Default **360** px (SS8). */
  height?: Length;

  /** Screen edge the sheet attaches to. Default **`SideSheetPosition.right`** (SS5). */
  position?: SideSheetPosition;
}

function buildPanelStyle(
  position: SideSheetPosition,
  width: Length,
  height: Length,
): CSSProperties {
  switch (position) {
    case SideSheetPosition.left:
    case SideSheetPosition.right:
      return { width: toLength(width), height: "100%" };
    case SideSheetPosition.top:
    case SideSheetPosition.bottom:
      return { width: "100%", height: toLength(height) };
  }
}

export const SideSheet = component$<SideSheetProps>((props) => {
  const {
    open = false,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    position = SideSheetPosition.right,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const layerId = useId();

  const positionClass = {
    [SideSheetPosition.left]: styles.positionLeft,
    [SideSheetPosition.right]: styles.positionRight,
    [SideSheetPosition.top]: styles.positionTop,
    [SideSheetPosition.bottom]: styles.positionBottom,
  }[position];

  const panelClass = [styles.panel, positionClass, className].filter(Boolean).join(" ");
  const panelStyle: CSSProperties = {
    ...buildPanelStyle(position, width, height),
    ...(userStyle as CSSProperties | undefined),
  };

  if (!open) {
    return (
      <aside
        aria-hidden="true"
        hidden
        class={[styles.closed, className].filter(Boolean).join(" ")}
        data-qfu-side-sheet-position={position}
        {...rest}
      >
        <Slot />
      </aside>
    );
  }

  return (
    <OverlayPortal open={open} modal={false} layerId={layerId} class={styles.host}>
      <aside
        data-qfu-side-sheet-panel={layerId}
        data-qfu-side-sheet-position={position}
        class={panelClass}
        style={panelStyle}
        {...rest}
      >
        <Slot />
      </aside>
    </OverlayPortal>
  );
});
