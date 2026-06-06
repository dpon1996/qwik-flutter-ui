import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";

import { AppShell } from "../src/components/app-shell";

describe("AppShell", () => {
  it("renders exactly one main landmark with slotted children", async () => {
    const { screen, render } = await createDOM();
    await render(
      <AppShell>
        <p data-testid="body">Page body</p>
      </AppShell>,
    );

    expect(screen.querySelectorAll("main")).toHaveLength(1);
    expect(screen.querySelector('[data-testid="body"]')?.textContent).toBe(
      "Page body",
    );
    expect(screen.querySelector("main")?.contains(screen.querySelector('[data-testid="body"]'))).toBe(
      true,
    );
  });

  it("omits optional landmark regions when props are not set", async () => {
    const { screen, render } = await createDOM();
    await render(
      <AppShell>
        <span>Only main</span>
      </AppShell>,
    );

    expect(screen.querySelector("header")?.childElementCount ?? 0).toBe(0);
    expect(screen.querySelector("aside")?.childElementCount ?? 0).toBe(0);
    expect(screen.querySelector("nav")?.childElementCount ?? 0).toBe(0);
    expect(screen.querySelector("main")).not.toBeNull();
  });

  it("renders semantic landmarks for each optional region prop", async () => {
    const { screen, render } = await createDOM();
    await render(
      <AppShell
        appBar={<div data-testid="app-bar">App bar</div>}
        drawer={<aside data-testid="drawer">Drawer</aside>}
        sideSheet={<aside data-testid="side-sheet">Side sheet</aside>}
        bottomNavigationBar={<div data-testid="bottom-nav">Nav</div>}
      >
        <div data-testid="body">Body</div>
      </AppShell>,
    );

    expect(screen.querySelector("header")?.contains(screen.querySelector('[data-testid="app-bar"]'))).toBe(
      true,
    );
    expect(screen.querySelectorAll("aside")).toHaveLength(2);
    expect(screen.querySelector('[data-testid="drawer"]')?.tagName).toBe("ASIDE");
    expect(screen.querySelector('[data-testid="side-sheet"]')?.tagName).toBe("ASIDE");
    expect(screen.querySelector("nav")?.contains(screen.querySelector('[data-testid="bottom-nav"]'))).toBe(
      true,
    );
    expect(screen.querySelector("main")?.contains(screen.querySelector('[data-testid="body"]'))).toBe(
      true,
    );
  });

  it("passes BaseProps through to the root wrapper", async () => {
    const { screen, render } = await createDOM();
    await render(
      <AppShell
        id="app-shell-root"
        class="custom-shell"
        role="presentation"
        aria-label="Application"
        data-testid="app-shell"
      >
        <span>Content</span>
      </AppShell>,
    );

    const root = screen.querySelector("#app-shell-root");
    expect(root).not.toBeNull();
    expect(root?.classList.contains("custom-shell")).toBe(true);
    expect(root?.getAttribute("role")).toBe("presentation");
    expect(root?.getAttribute("aria-label")).toBe("Application");
    expect(root?.getAttribute("data-testid")).toBe("app-shell");
  });
});
