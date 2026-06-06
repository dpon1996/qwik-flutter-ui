import { $, component$, useSignal } from "@builder.io/qwik";
import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";

import { Drawer } from "../src/components/drawer";
import { OverlayDismissReason } from "../src/lib/_shared";
import { OverlayContainer } from "../src/lib/overlay";

if (typeof globalThis.requestAnimationFrame === "undefined") {
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback) =>
    setTimeout(() => callback(Date.now()), 0) as unknown as number;
  globalThis.cancelAnimationFrame = (id: number) => {
    clearTimeout(id);
  };
}

async function flushTasks(): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
}

async function waitForDrawerReady(root: ParentNode): Promise<void> {
  await flushTasks();
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await flushTasks();
  expect(root.querySelector("[data-qfu-drawer-panel]")).not.toBeNull();
}

function queryOverlayLayer(root: ParentNode): Element | null {
  return root.querySelector("[data-qfu-overlay-layer]");
}

const ControlledDrawerHarness = component$(() => {
  const open = useSignal(false);
  const lastReason = useSignal<string | undefined>(undefined);

  const onOpenChange$ = $((next: boolean, reason?: string) => {
    open.value = next;
    lastReason.value = reason;
  });

  return (
    <OverlayContainer>
      <button
        type="button"
        data-testid="open-trigger"
        onClick$={() => {
          open.value = true;
        }}
      >
        Open
      </button>
      <Drawer open={open.value} onOpenChange$={onOpenChange$}>
        <button type="button" data-testid="drawer-content">
          Home
        </button>
      </Drawer>
      <span data-testid="open-state">{String(open.value)}</span>
      <span data-testid="last-reason">{lastReason.value ?? ""}</span>
    </OverlayContainer>
  );
});

const UncontrolledDrawerHarness = component$(() => {
  const lastOpen = useSignal<boolean | undefined>(undefined);
  const lastReason = useSignal<string | undefined>(undefined);

  const onOpenChange$ = $((next: boolean, reason?: string) => {
    lastOpen.value = next;
    lastReason.value = reason;
  });

  return (
    <OverlayContainer>
      <Drawer defaultOpen={true} onOpenChange$={onOpenChange$}>
        <button type="button" data-testid="drawer-content">
          Settings
        </button>
      </Drawer>
      <span data-testid="last-open">{String(lastOpen.value)}</span>
      <span data-testid="last-reason">{lastReason.value ?? ""}</span>
    </OverlayContainer>
  );
});

describe("Drawer", () => {
  it("renders children in the drawer panel when open", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <Drawer open={true}>
          <nav data-testid="drawer-nav">Navigation</nav>
        </Drawer>
      </OverlayContainer>,
    );
    await flushTasks();

    expect(queryOverlayLayer(screen)).not.toBeNull();
    expect(screen.querySelector('[data-testid="drawer-nav"]')?.textContent).toBe(
      "Navigation",
    );
    expect(screen.querySelector("aside")).not.toBeNull();
  });

  it("sets aria-hidden on the closed drawer aside", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <Drawer open={false}>
          <nav data-testid="drawer-nav">Navigation</nav>
        </Drawer>
      </OverlayContainer>,
    );

    const aside = screen.querySelector("aside");
    expect(aside?.getAttribute("aria-hidden")).toBe("true");
    expect(queryOverlayLayer(screen)).toBeFalsy();
  });

  it("passes BaseProps through to the drawer aside", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <Drawer
          open={false}
          id="drawer-root"
          class="custom-drawer"
          data-testid="drawer"
        >
          <span>Nav</span>
        </Drawer>
      </OverlayContainer>,
    );

    const aside = screen.querySelector("#drawer-root");
    expect(aside).not.toBeNull();
    expect(aside?.classList.contains("custom-drawer")).toBe(true);
    expect(aside?.getAttribute("data-testid")).toBe("drawer");
  });

  it("opens in controlled mode when the open prop becomes true", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(<ControlledDrawerHarness />);
    await flushTasks();

    expect(queryOverlayLayer(screen)).toBeFalsy();

    await userEvent('[data-testid="open-trigger"]', "click");
    await flushTasks();

    expect(queryOverlayLayer(screen)).not.toBeNull();
    expect(screen.querySelector('[data-testid="open-state"]')?.textContent).toBe(
      "true",
    );
  });

  it("closes in controlled mode on backdrop click and fires onOpenChange$", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(<ControlledDrawerHarness />);
    await flushTasks();

    await userEvent('[data-testid="open-trigger"]', "click");
    await flushTasks();
    expect(queryOverlayLayer(screen)).not.toBeNull();

    await userEvent("[data-qfu-drawer-backdrop]", "click");
    await flushTasks();

    expect(queryOverlayLayer(screen)).toBeFalsy();
    expect(screen.querySelector('[data-testid="open-state"]')?.textContent).toBe(
      "false",
    );
    expect(screen.querySelector('[data-testid="last-reason"]')?.textContent).toBe(
      OverlayDismissReason.backdrop,
    );
  });

  it("fires onOpenChange$ with escape reason when Escape is pressed", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(<ControlledDrawerHarness />);
    await flushTasks();

    await userEvent('[data-testid="open-trigger"]', "click");
    await waitForDrawerReady(screen);

    await userEvent("[data-qfu-drawer-panel]", "keydown", { key: "Escape" });
    await flushTasks();

    expect(queryOverlayLayer(screen)).toBeFalsy();
    expect(screen.querySelector('[data-testid="open-state"]')?.textContent).toBe(
      "false",
    );
    expect(screen.querySelector('[data-testid="last-reason"]')?.textContent).toBe(
      OverlayDismissReason.escape,
    );
  });

  it("starts open in uncontrolled mode when defaultOpen is true", async () => {
    const { screen, render } = await createDOM();
    await render(<UncontrolledDrawerHarness />);
    await flushTasks();

    expect(queryOverlayLayer(screen)).not.toBeNull();
    expect(screen.querySelector('[data-testid="drawer-content"]')).not.toBeNull();
  });

  it("closes in uncontrolled mode on backdrop click and fires onOpenChange$", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(<UncontrolledDrawerHarness />);
    await flushTasks();

    await userEvent("[data-qfu-drawer-backdrop]", "click");
    await flushTasks();

    expect(queryOverlayLayer(screen)).toBeFalsy();
    expect(screen.querySelector('[data-testid="last-open"]')?.textContent).toBe(
      "false",
    );
    expect(screen.querySelector('[data-testid="last-reason"]')?.textContent).toBe(
      OverlayDismissReason.backdrop,
    );
  });

  it("fires onOpenChange$ with escape reason in uncontrolled mode", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(<UncontrolledDrawerHarness />);
    await waitForDrawerReady(screen);

    await userEvent("[data-qfu-drawer-panel]", "keydown", { key: "Escape" });
    await flushTasks();

    expect(queryOverlayLayer(screen)).toBeFalsy();
    expect(screen.querySelector('[data-testid="last-open"]')?.textContent).toBe(
      "false",
    );
    expect(screen.querySelector('[data-testid="last-reason"]')?.textContent).toBe(
      OverlayDismissReason.escape,
    );
  });
});
