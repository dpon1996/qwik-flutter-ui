/**
 * v1.7 overlay — shared types for future overlay widgets.
 *
 * See `docs/API_DESIGN.md` §73–§89. Widget implementations (Phase 2+) import
 * these types from `_shared`; `OverlayPortal` and layer internals stay internal.
 */

import type { JSXOutput, QRL } from "@builder.io/qwik";

import type {
  OverlayDismissReason,
  OverlayPlacement,
  OverlayTrigger,
} from "./enums";
import type { BaseProps } from "./types";

/* ----------------------------------------------------------------- */
/* Open / dismiss (§76)                                              */
/* ----------------------------------------------------------------- */

/** Payload for controlled overlay open state (§76). */
export interface OverlayOpenChangeDetail {
  open: boolean;
  reason?: OverlayDismissReason;
}

/**
 * Shared controlled open props for dismissible overlays (§77, §79, §82, §83).
 * `onOpenChange$` receives {@link OverlayDismissReason} per §1.34.
 */
export interface OverlayOpenProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange$?: QRL<
    (open: boolean, reason?: OverlayDismissReason) => void
  >;
}

/* ----------------------------------------------------------------- */
/* OverlayContainer (§74) — types only; widget Phase 2+              */
/* ----------------------------------------------------------------- */

/** Props for public `OverlayContainer` (§74). */
export interface OverlayContainerProps extends BaseProps {
  /** Base z-index for first layer. Default from theme or 1000. */
  zIndexBase?: number;
}

/* ----------------------------------------------------------------- */
/* Dialog / AlertDialog (§77–§78)                                    */
/* ----------------------------------------------------------------- */

/** Props for `Dialog` (§77, OV4 declarative-only v1.7). */
export interface DialogProps extends BaseProps, OverlayOpenProps {
  /** Panel `role`. Default `dialog`. `AlertDialog` uses `alertdialog` (§78). */
  role?: "dialog" | "alertdialog";
  /** `aria-describedby` on the dialog panel (§77, §78). */
  describedBy?: string;
  /** Default `true`. When true, `aria-modal` and focus trap apply. */
  modal?: boolean;
  /** Default `true` when `modal`. */
  dismissOnEscape?: boolean;
  /** Default `true`. */
  dismissOnBackdropClick?: boolean;
  /** Default `true`. Restore focus to trigger on close. */
  restoreFocus?: boolean;
  /** Optional; auto-wired from title `id` when omitted. */
  labelledBy?: string;
}

/**
 * `AlertDialog` uses the same open/dismiss model as `Dialog` (§78).
 * Always modal; subcomponents use {@link BaseProps}.
 */
export type AlertDialogProps = DialogProps;

/** Props for `AlertDialogTitle` (§78). */
export interface AlertDialogTitleProps extends BaseProps {}

/** Props for `AlertDialogContent` (§78). */
export interface AlertDialogContentProps extends BaseProps {
  /** Used for `aria-describedby`; auto-generated when omitted. */
  id?: string;
}

/** Props for `AlertDialogActions` (§78). */
export interface AlertDialogActionsProps extends BaseProps {}

/* ----------------------------------------------------------------- */
/* ModalBottomSheet (§79)                                            */
/* ----------------------------------------------------------------- */

/** Props for `ModalBottomSheet` (§79.1; static open/closed v1.7). */
export interface ModalBottomSheetProps extends BaseProps, OverlayOpenProps {
  dismissOnEscape?: boolean;
  dismissOnBackdropClick?: boolean;
}

/* ----------------------------------------------------------------- */
/* SnackBar (§80, OV14)                                              */
/* ----------------------------------------------------------------- */

/** Options for `enqueueSnackBar$` (§80). */
export interface SnackBarOptions {
  message: string;
  actionLabel?: string;
  onAction$?: QRL<() => void>;
  /** Display duration in ms. Default ~4000. */
  duration?: number;
}

/** Declarative `SnackBar` (§80.3); primary DX is `enqueueSnackBar$`. */
export interface SnackBarProps extends BaseProps {
  open?: boolean;
  message: string;
  actionLabel?: string;
  onAction$?: QRL<() => void>;
  duration?: number;
}

/** Props for `SnackBarHost` (§80). Renders under `OverlayContainer`. */
export interface SnackBarHostProps extends BaseProps {}

/* ----------------------------------------------------------------- */
/* Tooltip (§81)                                                     */
/* ----------------------------------------------------------------- */

/** Props for `Tooltip` (§81). Child is the trigger (JSX slot). */
export interface TooltipProps extends BaseProps {
  /** Tooltip body (v1.7). */
  content: string | JSXOutput;
  open?: boolean;
  defaultOpen?: boolean;
  /** Default ~700ms (§81). */
  delayDuration?: number;
  placement?: OverlayPlacement;
  trigger?: OverlayTrigger;
}

/* ----------------------------------------------------------------- */
/* Popover (§82)                                                     */
/* ----------------------------------------------------------------- */

/** Props for `Popover` (§82). Non-modal by default. */
export interface PopoverProps extends BaseProps, OverlayOpenProps {
  placement?: OverlayPlacement;
  trigger?: OverlayTrigger;
  dismissOnEscape?: boolean;
}

/* ----------------------------------------------------------------- */
/* Menu (§83)                                                        */
/* ----------------------------------------------------------------- */

/** Props for `Menu` (§83). */
export interface MenuProps extends BaseProps, OverlayOpenProps {
  /** Trigger element when not using JSX slot pattern. */
  trigger?: JSXOutput;
}

/** Props for `MenuItem` (§83). */
export interface MenuItemProps extends BaseProps {
  disabled?: boolean;
  onSelect$?: QRL<() => void>;
}

/** Props for `MenuDivider` (§83). */
export interface MenuDividerProps extends BaseProps {}
