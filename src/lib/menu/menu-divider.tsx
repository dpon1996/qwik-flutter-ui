/**
 * `MenuDivider` — non-interactive menu separator (§83).
 */

import { component$ } from "@builder.io/qwik";

import styles from "./menu.module.css";
import type { MenuDividerProps } from "./types";

export const MenuDivider = component$<MenuDividerProps>((props) => {
  const { class: className, style: userStyle, ...rest } = props;

  const dividerClass = [styles.divider, className].filter(Boolean).join(" ");

  return (
    <div role="separator" class={dividerClass} style={userStyle} {...rest} />
  );
});
