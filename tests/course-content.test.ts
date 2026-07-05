import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const generatedNoteIds = [
  "agent-systems-map",
  "github-pages-astro-setup",
  "mcp-field-notes"
];

function walkFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const file = path.join(directory, entry);
    return statSync(file).isDirectory() ? walkFiles(file) : [file];
  });
}

function read(file: string) {
  return readFileSync(file, "utf-8");
}

describe("course content hygiene", () => {
  it("does not show import-source boilerplate in course notes or topics", () => {
    const files = [
      ...walkFiles("src/content/notes/courses"),
      ...readdirSync("src/content/topics")
        .filter((file) => file.startsWith("course-") && file.endsWith(".md"))
        .map((file) => path.join("src/content/topics", file)),
      "scripts/import-obsidian-courses.mjs"
    ];

    for (const file of files) {
      expect(read(file), file).not.toMatch(/导入自 Obsidian|课程笔记，导入自|课程笔记集合，导入自/);
    }
  });

  it("does not keep the starter generated notes or references to them", () => {
    for (const id of generatedNoteIds) {
      expect(existsSync(path.join("src/content/notes", `${id}.mdx`))).toBe(false);
    }

    const searchableFiles = walkFiles("src/content").filter((file) => !file.includes("notes/courses"));
    for (const file of searchableFiles) {
      const content = read(file);
      for (const id of generatedNoteIds) {
        expect(content, `${file} should not reference ${id}`).not.toContain(id);
      }
    }
  });
});
