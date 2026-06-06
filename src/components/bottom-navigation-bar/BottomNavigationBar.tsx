/// <reference types="vite/client" />

/**
 * `BottomNavigationBar` — primary bottom app navigation (§98–§99).
 *
 * - Controlled: `value` + `onChange$`; uncontrolled: `defaultValue` or first item.
 * - Selection owned by the bar; items are presentational buttons.
 * - Roving tabindex + ArrowLeft/ArrowRight/Home/End keyboard navigation.
 * - No routing, URL sync, or responsive/adaptive behavior in v1.
 */

import {
  $,
  component$,
  Slot,
  useContextProvider,
  useId,
  useSignal,
  useStore,
  useTask$,
  type CSSProperties,
  type JSXOutput,
  type QRL,
} from "@builder.io/qwik";

import type { BaseProps } from "../../lib/_shared";

import styles from "./BottomNavigationBar.module.css";
import {
  BottomNavigationBarContext,
  type RegisteredBottomNavItem,
} from "./context";

export interface BottomNavigationBarProps extends BaseProps {
  value?: string;

  defaultValue?: string;

  onChange$?: QRL<(value: string) => void>;

  children?: JSXOutput;
}

const MAX_ITEMS = 5;

function hasAccessibleName(ariaLabel: string | undefined): boolean {
  return ariaLabel !== undefined && ariaLabel !== "";
}

export const BottomNavigationBar = component$<BottomNavigationBarProps>((props) => {
  const {
    value,
    defaultValue,
    onChange$,
    id,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const ariaLabel =
    typeof rest["aria-label"] === "string" ? rest["aria-label"] : undefined;

  if (import.meta.env.DEV) {
    if (value !== undefined && defaultValue !== undefined) {
      console.warn(
        "[BottomNavigationBar] Do not pass both `value` and `defaultValue`; use controlled or uncontrolled mode.",
      );
    }
    if (!hasAccessibleName(ariaLabel)) {
      console.warn(
        "[BottomNavigationBar] Provide `aria-label` on the navigation landmark (especially when multiple `<nav>` elements exist on the page).",
      );
    }
  }

  const barId = useId();
  const selection = useSignal<string | undefined>(
    value !== undefined ? value : defaultValue,
  );
  const focusValue = useSignal<string | undefined>(value ?? defaultValue);
  const registeredItems = useStore<{ items: RegisteredBottomNavItem[] }>({
    items: [],
  });

  useTask$(({ track }) => {
    if (value !== undefined) {
      track(() => value);
      selection.value = value;
    }
  });

  useTask$(({ track }) => {
    track(() => selection.value);
    if (selection.value !== undefined) {
      focusValue.value = selection.value;
    }
  });

  const focusItem$ = $((itemValue: string) => {
    focusValue.value = itemValue;
    if (typeof document !== "undefined") {
      const root = document.querySelector(`[data-qfu-bnav-root="${barId}"]`);
      const button = root?.querySelector<HTMLButtonElement>(
        `[data-qfu-bnav-value="${itemValue}"]`,
      );
      button?.focus();
    }
  });

  const selectValue$ = $((next: string) => {
    const target = registeredItems.items.find((item) => item.value === next);
    if (!target || target.disabled) return;

    if (next === selection.value) {
      void focusItem$(next);
      return;
    }

    if (value === undefined) {
      selection.value = next;
    }
    focusValue.value = next;
    void onChange$?.(next);
  });

  const registerItem$ = $((itemValue: string, disabled: boolean) => {
    const existing = registeredItems.items.find((item) => item.value === itemValue);
    if (existing) {
      existing.disabled = disabled;
      return;
    }

    registeredItems.items.push({ value: itemValue, disabled });

    if (import.meta.env.DEV && registeredItems.items.length > MAX_ITEMS) {
      console.warn(
        `[BottomNavigationBar] More than ${MAX_ITEMS} items; Material guidance recommends at most ${MAX_ITEMS} destinations.`,
      );
    }

    const hasExplicitSelection =
      value !== undefined ||
      defaultValue !== undefined ||
      selection.value !== undefined;

    if (!hasExplicitSelection && !disabled) {
      selection.value = itemValue;
      focusValue.value = itemValue;
      return;
    }

    if (focusValue.value === undefined && !disabled) {
      focusValue.value = selection.value ?? itemValue;
    }
  });

  const moveFocus$ = $((direction: "prev" | "next" | "first" | "last") => {
    const enabled = registeredItems.items
      .filter((item) => !item.disabled)
      .map((item) => item.value);
    if (enabled.length === 0) return;

    const current = focusValue.value ?? selection.value ?? enabled[0];
    let currentIndex = enabled.indexOf(current);
    if (currentIndex === -1) {
      currentIndex = 0;
    }

    let nextIndex = currentIndex;
    switch (direction) {
      case "prev":
        nextIndex = currentIndex <= 0 ? enabled.length - 1 : currentIndex - 1;
        break;
      case "next":
        nextIndex = currentIndex >= enabled.length - 1 ? 0 : currentIndex + 1;
        break;
      case "first":
        nextIndex = 0;
        break;
      case "last":
        nextIndex = enabled.length - 1;
        break;
    }

    const nextValue = enabled[nextIndex];
    void selectValue$(nextValue);
    void focusItem$(nextValue);
  });

  const onKeyDown$ = $((ev: KeyboardEvent) => {
    switch (ev.key) {
      case "ArrowLeft":
        ev.preventDefault();
        void moveFocus$("prev");
        break;
      case "ArrowRight":
        ev.preventDefault();
        void moveFocus$("next");
        break;
      case "Home":
        ev.preventDefault();
        void moveFocus$("first");
        break;
      case "End":
        ev.preventDefault();
        void moveFocus$("last");
        break;
      default:
        break;
    }
  });

  useContextProvider(BottomNavigationBarContext, {
    selectedValue: selection,
    focusValue,
    registerItem$,
    selectValue$,
    focusItem$,
  });

  const rootClasses = [styles.root, className].filter(Boolean).join(" ");

  const rootStyle: CSSProperties | undefined = userStyle
    ? (userStyle as CSSProperties)
    : undefined;

  return (
    <nav
      {...rest}
      id={id}
      data-qfu-bnav-root={barId}
      class={rootClasses}
      style={rootStyle}
      onKeyDown$={onKeyDown$}
    >
      <Slot />
    </nav>
  );
});
