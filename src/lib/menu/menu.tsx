/**
 * `Menu` — `Popover` + list semantics (§83, OV10, OV15).
 *
 * Popover owns positioning, open state, dismissal, and stacking. Menu owns
 * keyboard navigation, roving tabindex, and item selection.
 */

import {
  $,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useVisibleTask$,
  type QRL,
} from "@builder.io/qwik";

import { OverlayDismissReason } from "../_shared/enums";
import { Popover } from "../popover";
import { useOverlayOpen } from "../overlay/use-overlay-open";

import { MenuContext } from "./context";
import { getEnabledMenuItems } from "./menu-utils";
import styles from "./menu.module.css";
import type { MenuProps } from "./types";

export const Menu = component$<MenuProps>((props) => {
  const {
    open: _open,
    defaultOpen: _defaultOpen,
    onOpenChange$: _onOpenChange$,
    trigger,
    class: className,
    style: userStyle,
    ...rest
  } = props;

  const menuRef = useSignal<HTMLElement>();
  const activeItemId = useSignal<string | undefined>();

  const { isOpen, setOpen } = useOverlayOpen(props);

  const setActiveItemId$ = $((id: string) => {
    activeItemId.value = id;
  });

  const closeMenu$ = $((reason: OverlayDismissReason) => {
    void setOpen(false, reason);
  });

  const selectItem$ = $(async (onSelect$?: QRL<() => void>, disabled?: boolean) => {
    if (disabled) {
      return;
    }
    if (onSelect$) {
      await onSelect$();
    }
    void closeMenu$(OverlayDismissReason.programmatic);
  });

  useContextProvider(MenuContext, {
    activeItemId,
    setActiveItemId$,
    selectItem$,
  });

  const focusMenuItem = $((item: HTMLElement) => {
    activeItemId.value = item.id;
    item.focus();
  });

  const onMenuKeyDown$ = $((event: KeyboardEvent) => {
    const menuEl = menuRef.value;
    if (!menuEl) {
      return;
    }

    const items = getEnabledMenuItems(menuEl);
    if (items.length === 0) {
      return;
    }

    const active = document.activeElement as HTMLElement | null;
    let currentIndex = items.findIndex((item) => item === active);
    if (currentIndex < 0) {
      currentIndex = items.findIndex((item) => item.id === activeItemId.value);
    }

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const nextIndex =
          currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
        void focusMenuItem(items[nextIndex]);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        const nextIndex =
          currentIndex < 0
            ? items.length - 1
            : (currentIndex - 1 + items.length) % items.length;
        void focusMenuItem(items[nextIndex]);
        break;
      }
      case "Home": {
        event.preventDefault();
        void focusMenuItem(items[0]);
        break;
      }
      case "End": {
        event.preventDefault();
        void focusMenuItem(items[items.length - 1]);
        break;
      }
      case "Enter":
      case " ": {
        event.preventDefault();
        const target =
          active && menuEl.contains(active) && active.getAttribute("role") === "menuitem"
            ? active
            : items.find((item) => item.id === activeItemId.value);
        if (target instanceof HTMLElement) {
          target.click();
        }
        break;
      }
      default:
        break;
    }
  });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => isOpen.value);

    if (!isOpen.value) {
      activeItemId.value = undefined;
      return;
    }

    let disposed = false;

    const focusFirstItem = () => {
      if (disposed) {
        return;
      }

      const menuEl = menuRef.value;
      if (!menuEl) {
        return;
      }

      const items = getEnabledMenuItems(menuEl);
      if (items.length === 0) {
        return;
      }

      activeItemId.value = items[0].id;
      items[0].focus();
    };

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(focusFirstItem);
    });

    cleanup(() => {
      disposed = true;
      cancelAnimationFrame(raf);
    });
  });

  return (
    <Popover
      open={props.open}
      defaultOpen={props.defaultOpen}
      onOpenChange$={props.onOpenChange$}
      class={className}
      style={userStyle}
      aria-haspopup="menu"
      {...rest}
    >
      <div q:slot="trigger">
        {trigger ?? <Slot name="trigger" />}
      </div>
      <div
        ref={menuRef}
        role="menu"
        class={styles.menu}
        onKeyDown$={onMenuKeyDown$}
      >
        <Slot />
      </div>
    </Popover>
  );
});
