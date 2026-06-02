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

import { createThemeData } from "./create-theme-data";
import { colorSchemeToCssProperties } from "./css-vars";
import { ThemeContext } from "./context";
import { mergeThemeData } from "./merge";
import type { ThemeProviderProps } from "./types";

export const ThemeProvider = component$<ThemeProviderProps>((props) => {
  const {
    theme,
    inherit = true,
    as = "div",
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const parentTheme = inherit ? useContext(ThemeContext) : undefined;

  const baseline = parentTheme ?? createThemeData();
  const merged =
    inherit === false
      ? mergeThemeData(createThemeData(), theme)
      : mergeThemeData(baseline, theme);

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
