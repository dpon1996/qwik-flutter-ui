/**
 * `Dialog` prop types. See `docs/API_DESIGN.md` §77.
 */

import type { BaseProps } from "../_shared";

export type { DialogProps } from "../_shared/overlay-types";

/** Props for `DialogTitle` (§77). */
export interface DialogTitleProps extends BaseProps {
  /** Used for `aria-labelledby`; auto-generated when omitted. */
  id?: string;
}

/** Props for `DialogContent` (§77). */
export interface DialogContentProps extends BaseProps {
  /** Used for `aria-describedby` on the dialog panel (§78). */
  id?: string;
}

/** Props for `DialogActions` (§77). */
export interface DialogActionsProps extends BaseProps {}
