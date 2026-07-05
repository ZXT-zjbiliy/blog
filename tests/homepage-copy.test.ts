import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("homepage copy", () => {
  it("does not end Chinese homepage text snippets with sentence periods", () => {
    const homepage = readFileSync("src/pages/index.astro", "utf-8");
    const snippets = [...homepage.matchAll(/data-zh="([^"]+)"/g)].map((match) => match[1]);
    const periodEndedSnippets = snippets.filter((snippet) => /[。.]$/.test(snippet.trim()));

    expect(periodEndedSnippets).toEqual([]);
  });
});
