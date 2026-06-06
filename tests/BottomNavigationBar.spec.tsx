import { $, component$, useSignal } from "@builder.io/qwik";
import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";

import {
  BottomNavigationBar,
  BottomNavigationItem,
} from "../src/components/bottom-navigation-bar";

async function flushTasks(): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
}

function queryItem(root: ParentNode, value: string): HTMLButtonElement | null {
  return root.querySelector<HTMLButtonElement>(`[data-qfu-bnav-value="${value}"]`);
}

const ControlledHarness = component$(() => {
  const value = useSignal("home");
  const lastChange = useSignal<string | undefined>(undefined);

  const onChange$ = $((next: string) => {
    value.value = next;
    lastChange.value = next;
  });

  return (
    <>
      <BottomNavigationBar
        aria-label="Main"
        value={value.value}
        onChange$={onChange$}
      >
        <BottomNavigationItem value="home" label="Home" />
        <BottomNavigationItem value="search" label="Search" />
        <BottomNavigationItem value="profile" label="Profile" />
      </BottomNavigationBar>
      <span data-testid="selected">{value.value}</span>
      <span data-testid="last-change">{lastChange.value ?? ""}</span>
    </>
  );
});

const UncontrolledHarness = component$(() => {
  const lastChange = useSignal<string | undefined>(undefined);

  const onChange$ = $((next: string) => {
    lastChange.value = next;
  });

  return (
    <>
      <BottomNavigationBar
        aria-label="Main"
        defaultValue="search"
        onChange$={onChange$}
      >
        <BottomNavigationItem value="home" label="Home" />
        <BottomNavigationItem value="search" label="Search" />
        <BottomNavigationItem value="profile" label="Profile" />
      </BottomNavigationBar>
      <span data-testid="last-change">{lastChange.value ?? ""}</span>
    </>
  );
});

const UncontrolledDefaultFirstHarness = component$(() => {
  return (
    <BottomNavigationBar aria-label="Main">
      <BottomNavigationItem value="home" label="Home" />
      <BottomNavigationItem value="search" label="Search" />
    </BottomNavigationBar>
  );
});

describe("BottomNavigationBar", () => {
  it("renders a semantic nav landmark with items", async () => {
    const { screen, render } = await createDOM();
    await render(
      <BottomNavigationBar aria-label="Main">
        <BottomNavigationItem value="home" label="Home" />
        <BottomNavigationItem value="search" label="Search" />
      </BottomNavigationBar>,
    );
    await flushTasks();

    const nav = screen.querySelector("nav");
    expect(nav).not.toBeNull();
    expect(nav?.getAttribute("aria-label")).toBe("Main");
    expect(screen.querySelectorAll("button").length).toBe(2);
  });

  it("selects items in controlled mode", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(<ControlledHarness />);
    await flushTasks();

    expect(queryItem(screen, "home")?.getAttribute("aria-current")).toBe("page");
    expect(queryItem(screen, "search")?.hasAttribute("aria-current")).toBe(false);

    await userEvent('[data-qfu-bnav-value="search"]', "click");
    await flushTasks();

    expect(screen.querySelector('[data-testid="selected"]')?.textContent).toBe(
      "search",
    );
    expect(queryItem(screen, "search")?.getAttribute("aria-current")).toBe("page");
    expect(queryItem(screen, "home")?.hasAttribute("aria-current")).toBe(false);
  });

  it("selects items in uncontrolled mode with defaultValue", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(<UncontrolledHarness />);
    await flushTasks();

    expect(queryItem(screen, "search")?.getAttribute("aria-current")).toBe("page");

    await userEvent('[data-qfu-bnav-value="profile"]', "click");
    await flushTasks();

    expect(queryItem(screen, "profile")?.getAttribute("aria-current")).toBe("page");
    expect(screen.querySelector('[data-testid="last-change"]')?.textContent).toBe(
      "profile",
    );
  });

  it("defaults to the first item when value and defaultValue are omitted", async () => {
    const { screen, render } = await createDOM();
    await render(<UncontrolledDefaultFirstHarness />);
    await flushTasks();

    expect(queryItem(screen, "home")?.getAttribute("aria-current")).toBe("page");
  });

  it("fires onChange$ when selection changes", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(<ControlledHarness />);
    await flushTasks();

    await userEvent('[data-qfu-bnav-value="profile"]', "click");
    await flushTasks();

    expect(screen.querySelector('[data-testid="last-change"]')?.textContent).toBe(
      "profile",
    );
  });

  it("does not select disabled items on click", async () => {
    const { screen, render, userEvent } = await createDOM();
    const lastChange = { value: "" };

    await render(
      <BottomNavigationBar
        aria-label="Main"
        defaultValue="home"
        onChange$={$((next: string) => {
          lastChange.value = next;
        })}
      >
        <BottomNavigationItem value="home" label="Home" />
        <BottomNavigationItem value="settings" label="Settings" disabled />
      </BottomNavigationBar>,
    );
    await flushTasks();

    await userEvent('[data-qfu-bnav-value="settings"]', "click");
    await flushTasks();

    expect(queryItem(screen, "home")?.getAttribute("aria-current")).toBe("page");
    expect(lastChange.value).toBe("");
    expect(queryItem(screen, "settings")?.disabled).toBe(true);
    expect(queryItem(screen, "settings")?.getAttribute("aria-disabled")).toBe("true");
  });

  it("applies active item styling class", async () => {
    const { screen, render } = await createDOM();
    await render(
      <BottomNavigationBar aria-label="Main" defaultValue="home">
        <BottomNavigationItem value="home" label="Home" />
        <BottomNavigationItem value="search" label="Search" />
      </BottomNavigationBar>,
    );
    await flushTasks();

    expect(queryItem(screen, "home")?.className).toContain("itemActive");
    expect(queryItem(screen, "search")?.className).not.toContain("itemActive");
  });

  it("supports ArrowRight keyboard navigation between items", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(<ControlledHarness />);
    await flushTasks();

    queryItem(screen, "home")?.focus();
    await userEvent("nav", "keydown", { key: "ArrowRight" });
    await flushTasks();

    expect(screen.querySelector('[data-testid="selected"]')?.textContent).toBe(
      "search",
    );
    expect(queryItem(screen, "search")?.getAttribute("aria-current")).toBe("page");
  });

  it("supports ArrowLeft keyboard navigation between items", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(
      <BottomNavigationBar aria-label="Main" defaultValue="search">
        <BottomNavigationItem value="home" label="Home" />
        <BottomNavigationItem value="search" label="Search" />
        <BottomNavigationItem value="profile" label="Profile" />
      </BottomNavigationBar>,
    );
    await flushTasks();

    queryItem(screen, "search")?.focus();
    await userEvent("nav", "keydown", { key: "ArrowLeft" });
    await flushTasks();

    expect(queryItem(screen, "home")?.getAttribute("aria-current")).toBe("page");
  });

  it("supports Home key to select the first enabled item", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(
      <BottomNavigationBar aria-label="Main" defaultValue="profile">
        <BottomNavigationItem value="home" label="Home" />
        <BottomNavigationItem value="search" label="Search" />
        <BottomNavigationItem value="profile" label="Profile" />
      </BottomNavigationBar>,
    );
    await flushTasks();

    queryItem(screen, "profile")?.focus();
    await userEvent("nav", "keydown", { key: "Home" });
    await flushTasks();

    expect(queryItem(screen, "home")?.getAttribute("aria-current")).toBe("page");
  });

  it("supports End key to select the last enabled item", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(
      <BottomNavigationBar aria-label="Main" defaultValue="home">
        <BottomNavigationItem value="home" label="Home" />
        <BottomNavigationItem value="search" label="Search" />
        <BottomNavigationItem value="profile" label="Profile" />
      </BottomNavigationBar>,
    );
    await flushTasks();

    queryItem(screen, "home")?.focus();
    await userEvent("nav", "keydown", { key: "End" });
    await flushTasks();

    expect(queryItem(screen, "profile")?.getAttribute("aria-current")).toBe("page");
  });

  it("skips disabled items during keyboard navigation", async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(
      <BottomNavigationBar aria-label="Main" defaultValue="home">
        <BottomNavigationItem value="home" label="Home" />
        <BottomNavigationItem value="blocked" label="Blocked" disabled />
        <BottomNavigationItem value="profile" label="Profile" />
      </BottomNavigationBar>,
    );
    await flushTasks();

    queryItem(screen, "home")?.focus();
    await userEvent("nav", "keydown", { key: "ArrowRight" });
    await flushTasks();

    expect(queryItem(screen, "profile")?.getAttribute("aria-current")).toBe("page");
  });

  it("passes BaseProps through to the nav element", async () => {
    const { screen, render } = await createDOM();
    await render(
      <BottomNavigationBar
        id="bottom-nav-root"
        class="custom-bottom-nav"
        data-testid="bottom-nav"
        aria-label="Main"
      >
        <BottomNavigationItem value="home" label="Home" />
      </BottomNavigationBar>,
    );
    await flushTasks();

    const nav = screen.querySelector("#bottom-nav-root");
    expect(nav).not.toBeNull();
    expect(nav?.classList.contains("custom-bottom-nav")).toBe(true);
    expect(nav?.getAttribute("data-testid")).toBe("bottom-nav");
  });

  it("passes BaseProps through to item buttons", async () => {
    const { screen, render } = await createDOM();
    await render(
      <BottomNavigationBar aria-label="Main" defaultValue="home">
        <BottomNavigationItem
          value="home"
          label="Home"
          id="nav-home"
          class="custom-item"
          data-testid="nav-home"
        />
      </BottomNavigationBar>,
    );
    await flushTasks();

    const item = screen.querySelector("#nav-home");
    expect(item).not.toBeNull();
    expect(item?.classList.contains("custom-item")).toBe(true);
    expect(item?.getAttribute("data-testid")).toBe("nav-home");
  });
});
