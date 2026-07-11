import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function read(file: string) {
  return readFileSync(file, "utf-8");
}

describe("site introduction copy", () => {
  it("presents the homepage as a personal archive", () => {
    const homepage = read("src/pages/index.astro");

    expect(homepage).toContain(
      'description="Course notes, public projects, and AI experiments by ZXT."'
    );
    expect(homepage).toContain('data-zh="个人档案">Personal archive');
    expect(homepage).toContain(
      'data-zh="这里整理课程学习中的笔记、实际做过的项目和一些 AI 实验，既公开分享，也留给之后的自己回看"'
    );
    expect(homepage).toContain(
      "A growing archive of course notes, projects I have built, and AI experiments—shared openly and kept easy to revisit."
    );
    expect(homepage).toContain(
      'data-zh="课程学习与知识整理">Coursework and knowledge organization'
    );
  });
});
