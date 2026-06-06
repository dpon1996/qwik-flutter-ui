/**
 * `BottomNavigationBar` composition context — selection + roving focus (§98–§99).
 */

import { createContextId, type QRL, type Signal } from "@builder.io/qwik";

export interface RegisteredBottomNavItem {
  value: string;
  disabled: boolean;
}

/** Internal API consumed by `BottomNavigationItem`; provided by `BottomNavigationBar`. */
export interface BottomNavigationBarContextValue {
  selectedValue: Signal<string | undefined>;
  focusValue: Signal<string | undefined>;
  registerItem$: QRL<(value: string, disabled: boolean) => void>;
  selectValue$: QRL<(value: string) => void>;
  focusItem$: QRL<(value: string) => void>;
}

export const BottomNavigationBarContext = createContextId<BottomNavigationBarContextValue>(
  "qfu.bottom-navigation-bar",
);
