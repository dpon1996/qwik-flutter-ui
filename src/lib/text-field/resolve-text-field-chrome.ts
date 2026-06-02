/**
 * Shared theme + id resolution for `TextField` decoration chrome (§57, §59).
 */

import type { CSSProperties } from "@builder.io/qwik";

import type { ColorScheme, InputDecorationTheme } from "../theme";

import {
  resolvedStylesToCssVars,
  resolveInputDecorationStyles,
} from "./resolve-input-decoration-theme";
import type { TextFieldProps } from "./types";

export interface TextFieldChromeResolved {
  helperId: string;
  errorId: string;
  isRequired: boolean;
  labelStyle: CSSProperties | undefined;
  helperStyle: CSSProperties | undefined;
  errorStyle: CSSProperties;
  requiredMarkStyle: CSSProperties | undefined;
  rootStyle: CSSProperties;
}

type ChromeStyleProps = Pick<
  TextFieldProps,
  | "labelColor"
  | "helperColor"
  | "errorColor"
  | "placeholderColor"
  | "outlineColor"
  | "focusOutlineColor"
  | "borderRadius"
  | "padding"
  | "requiredIndicatorColor"
  | "decoration"
  | "required"
  | "style"
>;

export function resolveTextFieldChrome(
  props: ChromeStyleProps,
  inputId: string,
  colorScheme: ColorScheme,
  inputDecorationTheme: InputDecorationTheme | undefined,
): TextFieldChromeResolved {
  const {
    decoration,
    required = false,
    labelColor,
    helperColor,
    errorColor,
    placeholderColor,
    outlineColor,
    focusOutlineColor,
    borderRadius,
    padding,
    requiredIndicatorColor,
    style: userStyle,
  } = props;

  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  /** Native / `aria-required` only — not `decoration.required` (FD9). */
  const isRequired = required;

  const resolved = resolveInputDecorationStyles(
    {
      labelColor,
      helperColor,
      errorColor,
      placeholderColor,
      outlineColor,
      focusOutlineColor,
      borderRadius,
      padding,
      requiredIndicatorColor,
    },
    inputDecorationTheme,
    colorScheme,
  );

  const rootStyle: CSSProperties = {
    ...resolvedStylesToCssVars(resolved),
    ...(userStyle as CSSProperties | undefined),
  };

  const labelStyle: CSSProperties | undefined =
    resolved.labelColor !== undefined ? { color: resolved.labelColor } : undefined;

  const helperStyle: CSSProperties | undefined =
    resolved.helperColor !== undefined ? { color: resolved.helperColor } : undefined;

  const errorStyle: CSSProperties = { color: resolved.errorColor };

  const requiredMarkStyle: CSSProperties | undefined =
    resolved.requiredIndicatorColor !== undefined
      ? { color: resolved.requiredIndicatorColor }
      : undefined;

  return {
    helperId,
    errorId,
    isRequired,
    labelStyle,
    helperStyle,
    errorStyle,
    requiredMarkStyle,
    rootStyle,
  };
}
