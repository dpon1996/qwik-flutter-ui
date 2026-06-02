/**
 * `ThemeProvider` — applies theme via CSS variables + Qwik context (§57).
 * Flutter analogue: `MaterialApp(theme: …)` / `Theme`.
 */

import {
  Slot,
  component$,
  useContext,
  useContextProvider,
  type CSSProperties,
} from "@builder.io/qwik";

import { createThemeData, mergeThemeData } from "./create-theme-data";
import { colorSchemeToCssProperties } from "./css-vars";
import { ThemeContext } from "./context";
import type { ThemeProviderProps } from "./types";

/** No ancestor provider (Qwik `useContext` default). */
const NO_ANCESTOR_THEME = null;

export const ThemeProvider = component$<ThemeProviderProps>((props) => {
  const {
    theme,
    inherit = true,
    as = "div",
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const ancestor =
    inherit === true
      ? useContext(ThemeContext, NO_ANCESTOR_THEME)
      : NO_ANCESTOR_THEME;

  const baseline =
    inherit === false || ancestor === NO_ANCESTOR_THEME
      ? createThemeData()
      : ancestor;

  const merged = mergeThemeData(baseline, theme);

  useContextProvider(ThemeContext, merged);

  const cssVars = colorSchemeToCssProperties(merged.colorScheme);
  const style: CSSProperties = userStyle
    ? { ...cssVars, ...(userStyle as CSSProperties) }
    : cssVars;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = as;

  return (
    <Tag class={className} style={style} {...rest}>
      <Slot />
    </Tag>
  );
});
