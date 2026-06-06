import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";

import { AppBar } from "../src/components/app-bar";

describe("AppBar", () => {
  it("renders a semantic header with role banner", async () => {
    const { screen, render } = await createDOM();
    await render(<AppBar title={<span>Settings</span>} />);

    const header = screen.querySelector("header");
    expect(header).not.toBeNull();
    expect(header?.getAttribute("role")).toBe("banner");
  });

  it("renders title in the title slot", async () => {
    const { screen, render } = await createDOM();
    await render(
      <AppBar title={<h1 data-testid="app-bar-title">Settings</h1>} />,
    );

    const titleSlot = screen.querySelector('[data-slot="title"]');
    expect(titleSlot).not.toBeNull();
    expect(titleSlot?.contains(screen.querySelector('[data-testid="app-bar-title"]'))).toBe(
      true,
    );
  });

  it("renders leading in the leading slot", async () => {
    const { screen, render } = await createDOM();
    await render(
      <AppBar leading={<button data-testid="app-bar-leading">Menu</button>} />,
    );

    const leadingSlot = screen.querySelector('[data-slot="leading"]');
    expect(leadingSlot).not.toBeNull();
    expect(
      leadingSlot?.contains(screen.querySelector('[data-testid="app-bar-leading"]')),
    ).toBe(true);
  });

  it("renders actions in the actions slot", async () => {
    const { screen, render } = await createDOM();
    await render(
      <AppBar
        actions={[
          <button key="search" data-testid="action-search">
            Search
          </button>,
          <button key="save" data-testid="action-save">
            Save
          </button>,
        ]}
      />,
    );

    const actionsSlot = screen.querySelector('[data-slot="actions"]');
    expect(actionsSlot).not.toBeNull();
    expect(screen.querySelector('[data-testid="action-search"]')).not.toBeNull();
    expect(screen.querySelector('[data-testid="action-save"]')).not.toBeNull();
  });

  it("preserves actions order in the DOM", async () => {
    const { screen, render } = await createDOM();
    await render(
      <AppBar
        actions={[
          <button key="a" data-testid="action-a">
            A
          </button>,
          <button key="b" data-testid="action-b">
            B
          </button>,
          <button key="c" data-testid="action-c">
            C
          </button>,
        ]}
      />,
    );

    const actionsSlot = screen.querySelector('[data-slot="actions"]');
    const ordered = Array.from(
      actionsSlot?.querySelectorAll("[data-testid]") ?? [],
    ).map((el) => el.getAttribute("data-testid"));

    expect(ordered).toEqual(["action-a", "action-b", "action-c"]);
  });

  it("omits optional region slots when props are not set", async () => {
    const { screen, render } = await createDOM();
    await render(<AppBar title={<span>Only title</span>} />);

    expect(screen.querySelector('[data-slot="leading"]')).toBeFalsy();
    expect(screen.querySelector('[data-slot="title"]')).not.toBeNull();
    expect(screen.querySelector('[data-slot="actions"]')).toBeFalsy();
  });

  it("applies height via inline style", async () => {
    const { screen, render } = await createDOM();
    await render(<AppBar title={<span>Title</span>} height={64} />);

    const header = screen.querySelector("header");
    expect(header?.style.height).toBe("64px");
  });

  it("applies background and foreground colors via inline style", async () => {
    const { screen, render } = await createDOM();
    await render(
      <AppBar
        title={<span>Title</span>}
        backgroundColor="#111111"
        foregroundColor="#eeeeee"
      />,
    );

    const header = screen.querySelector("header");
    expect(header?.style.backgroundColor).toBe("#111111");
    expect(header?.style.color).toBe("#eeeeee");
  });

  it("applies default title spacing to the title slot", async () => {
    const { screen, render } = await createDOM();
    await render(<AppBar title={<span>Title</span>} />);

    const titleSlot = screen.querySelector('[data-slot="title"]') as HTMLElement;
    expect(titleSlot?.style.paddingLeft).toBe("16px");
  });

  it("applies custom titleSpacing to the title slot", async () => {
    const { screen, render } = await createDOM();
    await render(
      <AppBar title={<span>Title</span>} titleSpacing={24} />,
    );

    const titleSlot = screen.querySelector('[data-slot="title"]') as HTMLElement;
    expect(titleSlot?.style.paddingLeft).toBe("24px");
  });

  it("passes BaseProps through to the header element", async () => {
    const { screen, render } = await createDOM();
    await render(
      <AppBar
        id="app-bar-root"
        class="custom-app-bar"
        data-testid="app-bar"
        title={<span>Title</span>}
      />,
    );

    const header = screen.querySelector("#app-bar-root");
    expect(header).not.toBeNull();
    expect(header?.classList.contains("custom-app-bar")).toBe(true);
    expect(header?.getAttribute("data-testid")).toBe("app-bar");
    expect(header?.getAttribute("role")).toBe("banner");
  });
});
