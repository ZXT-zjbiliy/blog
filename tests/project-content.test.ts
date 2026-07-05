import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectDir = "src/content/projects";

function readProject(id: string) {
  return readFileSync(path.join(projectDir, `${id}.mdx`), "utf-8");
}

describe("project content", () => {
  it("keeps only the three selected GitHub projects", () => {
    const projects = readdirSync(projectDir)
      .filter((file) => file.endsWith(".mdx"))
      .sort();

    expect(projects).toEqual([
      "atti.mdx",
      "liquid-identification.mdx",
      "minimind-llava-v.mdx"
    ]);
  });

  it("links each project to the requested repository", () => {
    expect(readProject("liquid-identification")).toContain(
      "https://github.com/ZXT-zjbiliy/LiquidIdentification"
    );
    expect(readProject("minimind-llava-v")).toContain(
      "https://github.com/ZXT-zjbiliy/minimind-llava-v"
    );
    expect(readProject("atti")).toContain("https://github.com/ZXT-zjbiliy/ATTI");
  });
});
