/// <reference types="vite/client" />

/**
 * `BottomNavigationItem` — one destination in a `BottomNavigationBar` (§98–§99).
 */

import {
  $,
  component$,
  useContext,
  useTask$,
  type CSSProperties,
  type JSXOutput,
} from "@builder.io/qwik";

import type { BaseProps } from "../../lib/_shared";

import styles from "./BottomNavigationBar.module.css";
import { BottomNavigationBarContext } from "./context";

export interface BottomNavigationItemProps extends BaseProps {
  value: string;

  label: string;

  icon?: JSXOutput;

  disabled?: boolean;
}

const OUTSIDE_BAR_WARN =
  "[BottomNavigationItem] Must be used inside <BottomNavigationBar>. Rendering a disabled fallback.";

export const BottomNavigationItem = component$<BottomNavigationItemProps>((props) => {
  const {
    value,
    label,
    icon,
    disabled = false,
    id,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const bar = useContext(BottomNavigationBarContext, null);

  useTask$(() => {
    if (bar) {
      void bar.registerItem$(value, disabled);
    }
  });

  const onClick$ = $(() => {
    if (disabled || !bar) return;
    void bar.selectValue$(value);
  });

  const itemStyle: CSSProperties | undefined = userStyle
    ? (userStyle as CSSProperties)
    : undefined;

  if (bar === null) {
    if (import.meta.env.DEV) {
      console.warn(OUTSIDE_BAR_WARN);
    }
    return (
      <button
        {...rest}
        id={id}
        type="button"
        disabled
        class={[styles.item, styles.itemDisabled, className].filter(Boolean).join(" ")}
        style={itemStyle}
      >
        {icon !== undefined && (
          <span class={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span class={styles.label}>{label}</span>
      </button>
    );
  }

  const isSelected = bar.selectedValue.value === value;
  const isFocused = bar.focusValue.value === value;

  const itemClasses = [
    styles.item,
    isSelected ? styles.itemActive : undefined,
    disabled ? styles.itemDisabled : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...rest}
      id={id}
      type="button"
      disabled={disabled || undefined}
      aria-current={isSelected ? "page" : undefined}
      aria-disabled={disabled ? true : undefined}
      tabIndex={isFocused && !disabled ? 0 : -1}
      data-qfu-bnav-value={value}
      class={itemClasses}
      style={itemStyle}
      onClick$={onClick$}
    >
      {icon !== undefined && (
        <span class={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span class={styles.label}>{label}</span>
    </button>
  );
});
