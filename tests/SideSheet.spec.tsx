import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";

import { SideSheet } from "../src/components/side-sheet";
import { OverlayContainer } from "../src/lib/overlay";
import { SideSheetPosition } from "../src/lib/_shared";

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

function queryOverlayLayer(root: ParentNode): Element | null {
  return root.querySelector("[data-qfu-overlay-layer]");
}

describe("SideSheet", () => {
  it("renders children in the panel when open", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <SideSheet open={true}>
          <section data-testid="side-sheet-content">Filters</section>
        </SideSheet>
      </OverlayContainer>,
    );
    await flushTasks();

    expect(queryOverlayLayer(screen)).not.toBeNull();
    expect(screen.querySelector('[data-testid="side-sheet-content"]')?.textContent).toBe(
      "Filters",
    );
  });

  it("renders an open panel without the hidden attribute", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <SideSheet open={true} data-testid="side-sheet">
          <span>Details</span>
        </SideSheet>
      </OverlayContainer>,
    );
    await flushTasks();

    const aside = screen.querySelector('[data-testid="side-sheet"]');
    expect(aside).not.toBeNull();
    expect(aside?.hasAttribute("hidden")).toBe(false);
    expect(aside?.className).toMatch(/panel/);
  });

  it("renders a closed panel with the hidden attribute", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <SideSheet open={false} data-testid="side-sheet">
          <span>Details</span>
        </SideSheet>
      </OverlayContainer>,
    );

    const aside = screen.querySelector('[data-testid="side-sheet"]');
    expect(aside?.hasAttribute("hidden")).toBe(true);
    expect(aside?.className).toMatch(/closed/);
    expect(screen.querySelector("[data-qfu-side-sheet-panel]")).toBeFalsy();
  });

  it("applies width via inline style for left/right edges when open", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <SideSheet open={true} width={320} position={SideSheetPosition.right} data-testid="side-sheet">
          <span>Inspector</span>
        </SideSheet>
      </OverlayContainer>,
    );
    await flushTasks();

    const aside = screen.querySelector('[data-testid="side-sheet"]') as HTMLElement | null;
    expect(aside?.style.width).toBe("320px");
    expect(aside?.style.height).toBe("100%");
  });

  it("applies the default width when open on a horizontal edge", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <SideSheet open={true} data-testid="side-sheet">
          <span>Inspector</span>
        </SideSheet>
      </OverlayContainer>,
    );
    await flushTasks();

    const aside = screen.querySelector('[data-testid="side-sheet"]') as HTMLElement | null;
    expect(aside?.style.width).toBe("360px");
    expect(aside?.style.height).toBe("100%");
  });

  it("applies height via inline style for top/bottom edges when open", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <SideSheet open={true} height={280} position={SideSheetPosition.bottom} data-testid="side-sheet">
          <span>Tools</span>
        </SideSheet>
      </OverlayContainer>,
    );
    await flushTasks();

    const aside = screen.querySelector('[data-testid="side-sheet"]') as HTMLElement | null;
    expect(aside?.style.height).toBe("280px");
    expect(aside?.style.width).toBe("100%");
  });

  it("applies the default height when open on a vertical edge", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <SideSheet open={true} position={SideSheetPosition.top} data-testid="side-sheet">
          <span>Tools</span>
        </SideSheet>
      </OverlayContainer>,
    );
    await flushTasks();

    const aside = screen.querySelector('[data-testid="side-sheet"]') as HTMLElement | null;
    expect(aside?.style.height).toBe("360px");
    expect(aside?.style.width).toBe("100%");
  });

  it("applies left position styling and data attribute", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <SideSheet open={true} position={SideSheetPosition.left} data-testid="side-sheet">
          <span>Start panel</span>
        </SideSheet>
      </OverlayContainer>,
    );
    await flushTasks();

    const aside = screen.querySelector('[data-testid="side-sheet"]');
    expect(aside?.getAttribute("data-qfu-side-sheet-position")).toBe("left");
    expect(aside?.className).toMatch(/positionLeft/);
  });

  it("applies right position styling and data attribute by default", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <SideSheet open={true} data-testid="side-sheet">
          <span>End panel</span>
        </SideSheet>
      </OverlayContainer>,
    );
    await flushTasks();

    const aside = screen.querySelector('[data-testid="side-sheet"]');
    expect(aside?.getAttribute("data-qfu-side-sheet-position")).toBe("right");
    expect(aside?.className).toMatch(/positionRight/);
  });

  it("renders a semantic aside element", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <SideSheet open={true} aria-label="Report filters">
          <span>Filters</span>
        </SideSheet>
      </OverlayContainer>,
    );
    await flushTasks();

    const aside = screen.querySelector("aside");
    expect(aside).not.toBeNull();
    expect(aside?.getAttribute("aria-label")).toBe("Report filters");
  });

  it("passes BaseProps through to the aside element", async () => {
    const { screen, render } = await createDOM();
    await render(
      <OverlayContainer>
        <SideSheet
          open={true}
          id="report-filters"
          class="custom-side-sheet"
          data-testid="side-sheet"
        >
          <span>Filters</span>
        </SideSheet>
      </OverlayContainer>,
    );
    await flushTasks();

    const aside = screen.querySelector("#report-filters");
    expect(aside).not.toBeNull();
    expect(aside?.classList.contains("custom-side-sheet")).toBe(true);
    expect(aside?.getAttribute("data-testid")).toBe("side-sheet");
  });
});
