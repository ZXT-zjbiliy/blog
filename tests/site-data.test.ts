import { describe, expect, it } from "vitest";
import {
  formatDate,
  getAllTags,
  sitePath,
  sortByDateDesc,
  visibleEntries
} from "../src/lib/site-data";

const entries = [
  { data: { title: "Draft", date: new Date("2026-01-03"), draft: true, tags: ["AI"] } },
  { data: { title: "Older", date: new Date("2026-01-01"), draft: false, tags: ["MCP", "AI"] } },
  { data: { title: "Newer", date: new Date("2026-01-02"), draft: false, tags: ["Agent"] } }
];

describe("site data helpers", () => {
  it("filters draft entries", () => {
    expect(visibleEntries(entries).map((entry) => entry.data.title)).toEqual(["Older", "Newer"]);
  });

  it("sorts entries by descending date", () => {
    expect(sortByDateDesc(visibleEntries(entries)).map((entry) => entry.data.title)).toEqual([
      "Newer",
      "Older"
    ]);
  });

  it("collects unique sorted tags", () => {
    expect(getAllTags(entries)).toEqual(["Agent", "AI", "MCP"]);
  });

  it("formats dates for public pages", () => {
    expect(formatDate(new Date("2026-07-03"))).toBe("Jul 3, 2026");
  });

  it("prefixes links with the GitHub Pages base path", () => {
    expect(sitePath("/notes", "/blog/")).toBe("/blog/notes");
    expect(sitePath("projects", "/")).toBe("/projects");
    expect(sitePath("/", "/blog/")).toBe("/blog/");
  });
});
