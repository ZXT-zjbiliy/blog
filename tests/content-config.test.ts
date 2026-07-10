import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const config = readFileSync("src/content.config.ts", "utf-8");

describe("content collection configuration", () => {
  it("uses Astro 7 build-time loaders for local MDX content", () => {
    expect(config).toContain('import { glob } from "astro/loaders";');
    expect(config).toContain('base: "./src/content/notes"');
    expect(config).toContain('base: "./src/content/projects"');
    expect(config).toContain('base: "./src/content/topics"');
  });

  it("uses current Zod and collection reference APIs", () => {
    expect(config).toContain('import { z } from "astro/zod";');
    expect(config).toContain('import { defineCollection, reference } from "astro:content";');
    expect(config).toContain('z.array(reference("topics"))');
    expect(config).toContain('z.array(reference("notes"))');
    expect(config).toContain('z.array(reference("projects"))');
    expect(config).not.toContain('z.string().url()');
  });
});
