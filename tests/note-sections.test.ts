import { describe, expect, it } from "vitest";
import { getNoteSection, getNoteSections } from "../src/lib/note-sections";

describe("note section splitting", () => {
  it("splits top-level headings into separately addressable sections", () => {
    const markdown = [
      "Preface text",
      "",
      "# 第一章 绪论",
      "Intro body",
      "## 保留二级标题",
      "Nested body",
      "",
      "# 第二章 C++",
      "Angle <vector> should stay markdown text",
      "",
      "# 第二章 C++",
      "Duplicate title body"
    ].join("\n");

    expect(getNoteSections(markdown)).toEqual([
      {
        index: 0,
        title: "第一章 绪论",
        slug: "第一章-绪论",
        content: "# 第一章 绪论\nIntro body\n## 保留二级标题\nNested body\n"
      },
      {
        index: 1,
        title: "第二章 C++",
        slug: "第二章-c",
        content: "# 第二章 C++\nAngle <vector> should stay markdown text\n"
      },
      {
        index: 2,
        title: "第二章 C++",
        slug: "第二章-c-2",
        content: "# 第二章 C++\nDuplicate title body"
      }
    ]);

    expect(getNoteSection(markdown, "第二章-c-2")?.content).toContain("Duplicate title body");
  });
});
