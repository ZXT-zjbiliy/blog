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

  it("uses the approved About narrative and public email", () => {
    const about = read("src/pages/about.astro");

    expect(about).toContain(
      'description="About ZXT and this personal archive of notes, projects, and experiments."'
    );
    expect(about).toContain(
      'data-zh="这是我持续整理学习过程和项目实践的地方。课程笔记、公开项目与实验记录会留在这里，方便分享，也方便我在需要时重新找到当时的思路。"'
    );
    expect(about).toContain(
      'data-zh="我希望它更像一份长期维护的个人档案，而不是一张塞满经历的简历。内容会随着学习和项目推进慢慢更新。"'
    );
    expect(about).toContain(
      "This is where I keep an ongoing record of what I learn and build."
    );
    expect(about).toContain('data-zh="🏆 学习期间获得过一些学科竞赛奖项"');
    expect(about).toContain(
      "I mostly work with Python, C/C++, PyTorch, CUDA, TypeScript, Docker, and Linux."
    );
    expect(about).toContain("mailto:xt.zhang@zju.edu.cn");
    expect(about).not.toContain("3240102335@zju.edu.cn");
  });

  it("gives each collection index a clear reading role", () => {
    const pages = [
      {
        source: read("src/pages/notes/index.astro"),
        description: "Coursework and learning notes organized for review and reference.",
        eyebrow: 'data-zh="学习记录">Learning notes',
        chinese: 'data-zh="持续整理的课程与学习笔记，可以按分类、标签和日期查找。',
        english: "Coursework and learning notes, organized by category, tag, and date."
      },
      {
        source: read("src/pages/projects/index.astro"),
        description: "Public projects, implementation experiments, and engineering retrospectives.",
        eyebrow: 'data-zh="实践记录">Project log',
        chinese: 'data-zh="这里记录我实际做过的公开项目，以及实现过程中的实验和复盘。',
        english:
          "Public projects I have built, together with experiments and notes from the implementation process."
      },
      {
        source: read("src/pages/topics/index.astro"),
        description: "Curated reading paths connecting related notes and projects.",
        eyebrow: 'data-zh="阅读线索">Reading paths',
        chinese: 'data-zh="按主题串联相关笔记与项目，形成更连贯的阅读路径。',
        english: "Curated paths that connect related notes and projects."
      }
    ];

    for (const page of pages) {
      expect(page.source).toContain(`description="${page.description}"`);
      expect(page.source).toContain(page.eyebrow);
      expect(page.source).toContain(page.chinese);
      expect(page.source).toContain(page.english);
    }
  });
});
