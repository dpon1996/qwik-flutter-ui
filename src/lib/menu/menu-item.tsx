/**
 * `MenuItem` — selectable menu row (§83).
 */

import {
  $,
  Slot,
  component$,
  useComputed$,
  useContext,
  useId,
} from "@builder.io/qwik";

import { MenuContext } from "./context";
import styles from "./menu.module.css";
import type { MenuItemProps } from "./types";

export const MenuItem = component$<MenuItemProps>((props) => {
  const {
    disabled = false,
    onSelect$,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const itemId = useId();
  const menu = useContext(MenuContext);

  const isActive = useComputed$(() => menu?.activeItemId.value === itemId);

  const onClick$ = $(() => {
    void menu?.selectItem$(onSelect$, disabled);
  });

  const itemClass = [styles.item, className].filter(Boolean).join(" ");

  return (
    <div
      id={itemId}
      role="menuitem"
      tabIndex={isActive.value && !disabled ? 0 : -1}
      aria-disabled={disabled ? "true" : undefined}
      class={itemClass}
      style={userStyle}
      onClick$={onClick$}
      {...rest}
    >
      <Slot />
    </div>
  );
});
