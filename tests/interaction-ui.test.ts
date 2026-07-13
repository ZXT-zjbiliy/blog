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

  it("has a homepage search bar with required DOM hooks and bilingual attributes", () => {
    const search = read("src/components/SearchBar.astro");
    const homepage = read("src/pages/index.astro");

    expect(search).toContain("data-search-wrap");
    expect(search).toContain("data-search-index-url");
    expect(search).toContain("data-search-input");
    expect(search).toContain("data-search-chips");
    expect(search).toContain("data-search-fulltext");
    expect(search).toContain("data-search-dropdown");
    expect(search).toContain("data-search-all-tags");
    expect(search).toContain("data-search-results");
    expect(search).toContain("data-placeholder-zh");

    expect(homepage).toContain("<SearchBar");
    expect(homepage).toContain("searchIndexUrl");
  });

  it("builds a prerendered search index endpoint", () => {
    const endpoint = read("src/pages/search-index.json.ts");

    expect(endpoint).toContain("export const prerender = true");
    expect(endpoint).toContain("export async function GET");
    expect(endpoint).toContain("tokens");
  });
});
