import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function read(file: string) {
  return readFileSync(file, "utf-8");
}

describe("interactive site chrome", () => {
  it("adds contact actions to the home header", () => {
    const header = read("src/components/SiteHeader.astro");

    expect(header).toContain("https://github.com/ZXT-zjbiliy");
    expect(header).toContain("mailto:xt.zhang@zju.edu.cn");
    expect(header).toContain("xt.zhang@zju.edu.cn");
  });

  it("supports a collapsible portal sidebar with persisted state", () => {
    const layout = read("src/layouts/PortalLayout.astro");

    expect(layout).toContain("data-sidebar-toggle");
    expect(layout).toContain("zxt-sidebar-collapsed");
    expect(layout).toContain("portal-shell collapsed");
  });

  it("renders note view counters and client-side note ordering hooks", () => {
    const card = read("src/components/ContentCard.astro");
    const homepage = read("src/pages/index.astro");
    const notePage = read("src/pages/notes/[...slug].astro");

    expect(card).toContain("data-note-card");
    expect(card).toContain("data-note-view-count");
    expect(homepage).toContain("const featuredNotes = notes;");
    expect(homepage).toContain("data-sort-notes-by-views");
    expect(notePage).toContain("data-note-view-root");
  });
});
