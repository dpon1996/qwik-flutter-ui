/**
 * `Menu` composition context — roving focus + selection (§83).
 */

import { createContextId, type QRL, type Signal } from "@builder.io/qwik";

export interface MenuContextValue {
  activeItemId: Signal<string | undefined>;
  setActiveItemId$: QRL<(id: string) => void>;
  selectItem$: QRL<(onSelect$?: QRL<() => void>, disabled?: boolean) => void>;
}

export const MenuContext = createContextId<MenuContextValue>("qfu.menu");
