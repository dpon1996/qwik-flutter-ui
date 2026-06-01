/**
 * `TextField` prop types. See `docs/API_DESIGN.md` §29.
 */

import type { QRL } from "@builder.io/qwik";

import type {
  BaseProps,
  InputDecoration,
  InputMode,
  InputType,
} from "../_shared";

/**
 * Props for the `TextField` widget — single-line or multiline text entry.
 * Flutter equivalent of `TextField`.
 */
export interface TextFieldProps extends BaseProps {
  decoration?: InputDecoration;
  /** Optional — standalone fields; required on `TextFormField` (§30). */
  name?: string;
  value?: string;
  defaultValue?: string;
  onInput$?: QRL<(value: string, ev: InputEvent) => void>;
  type?: InputType;
  inputMode?: InputMode;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  /** Default `1` → `<input>`; `> 1` → `<textarea>`. */
  maxLines?: number;
  minLines?: number;
  autoComplete?: string;
}
