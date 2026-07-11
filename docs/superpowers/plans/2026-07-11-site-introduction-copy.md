# Site Introduction Copy Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace generic or outdated entry-page copy with the approved bilingual description of ZXT's site as a quiet personal archive of course notes, real projects, and AI experiments.

**Architecture:** Keep the existing Astro page structure and client-side bilingual mechanism unchanged. Add one focused Vitest source-contract file, then update only the metadata and introductory text blocks in the five entry pages; no shared component, content collection, or styling changes are needed.

**Tech Stack:** Astro 7, TypeScript, Vitest 4, HTML `data-zh` attributes, npm scripts on Windows PowerShell

## Global Constraints

- Follow the approved design in `docs/superpowers/specs/2026-07-11-site-introduction-copy-design.md`.
- English remains the text content and Chinese remains in `data-zh` attributes.
- Homepage Chinese paragraphs and short snippets must not end with Chinese full stops.
- Use only the public email `xt.zhang@zju.edu.cn`; remove `3240102335@zju.edu.cn` from About.
- Do not change layouts, styles, content cards, note descriptions, project descriptions, topic content, long-form content, dependencies, or project memory.
- Keep `AGENTS.md` and `CLAUDE.md` identical; neither file needs a change for this content-only refresh.
- Use `apply_patch` for every manual edit.
- Run commands from `E:\blog`.

## File Structure

- Create `tests/site-introduction-copy.test.ts`: source-level assertions for the approved English copy, Chinese `data-zh` copy, exact metadata, and public About email.
- Modify `src/pages/index.astro`: homepage metadata, eyebrow, hero introduction, and current-focus labels.
- Modify `src/pages/about.astro`: About metadata, site introduction, personal introduction, summary list, technology paragraph, and contact email.
- Modify `src/pages/notes/index.astro`: Notes metadata, eyebrow, and introduction.
- Modify `src/pages/projects/index.astro`: Projects metadata, eyebrow, and introduction.
- Modify `src/pages/topics/index.astro`: Topics metadata, eyebrow, and introduction.

No new runtime interface or shared abstraction is introduced. Each page continues to consume the existing `BaseLayout` or `PortalLayout` props and the existing language-switching behavior.

---

### Task 1: Refresh the Homepage Introduction

**Files:**

- Create: `tests/site-introduction-copy.test.ts`
- Modify: `src/pages/index.astro`
- Test: `tests/site-introduction-copy.test.ts`
- Test: `tests/homepage-copy.test.ts`

**Interfaces:**

- Consumes: existing `BaseLayout` `title` and `description` props; existing `data-zh` language contract.
- Produces: approved homepage metadata and visible bilingual introduction while preserving all existing cards, buttons, and note-ordering hooks.

- [ ] **Step 1: Write the failing homepage copy test**

Create `tests/site-introduction-copy.test.ts` with:

```ts
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
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
cmd /c npx.cmd vitest run tests/site-introduction-copy.test.ts
```

Expected: FAIL because `src/pages/index.astro` still contains `Personal portal`, the old hero sentence, and the old metadata description.

- [ ] **Step 3: Apply the approved homepage copy**

In `src/pages/index.astro`, replace the `BaseLayout` opening tag and hero copy block with:

```astro
<BaseLayout title="ZXT Notes" description="Course notes, public projects, and AI experiments by ZXT.">
  <div class="container">
    <SiteHeader />

    <main>
      <section class="hero">
        <div>
          <p class="eyebrow" data-zh="个人档案">Personal archive</p>
          <h1 data-zh="你好，我是 ZXT">Hi, I am ZXT</h1>
          <p
            class="hero-copy"
            data-zh="这里整理课程学习中的笔记、实际做过的项目和一些 AI 实验，既公开分享，也留给之后的自己回看"
          >
            A growing archive of course notes, projects I have built, and AI experiments—shared openly and kept easy to revisit.
          </p>
          <div class="button-row">
            <a class="button primary" href={sitePath("/notes")} data-zh="阅读笔记">Read notes</a>
            <a class="button" href={sitePath("/projects")} data-zh="查看项目">View projects</a>
          </div>
        </div>
        <div class="intro-panel">
          <IdentityMark />
          <p class="eyebrow" data-zh="当前关注">Current focus</p>
          <ul>
            <li data-zh="课程学习与知识整理">Coursework and knowledge organization</li>
            <li data-zh="计算机视觉与多模态模型">Computer vision and multimodal models</li>
            <li data-zh="浏览器扩展与工程实践">Browser extensions and engineering practice</li>
          </ul>
        </div>
      </section>
```

Leave the featured notes, projects, recent updates, script behavior, and style block unchanged.

- [ ] **Step 4: Run the homepage tests and verify they pass**

Run:

```powershell
cmd /c npx.cmd vitest run tests/site-introduction-copy.test.ts tests/homepage-copy.test.ts
```

Expected: both test files PASS; the punctuation test finds no `data-zh` snippet ending in `。` or `.`.

- [ ] **Step 5: Commit the homepage change**

```powershell
& 'C:\Program Files\Git\cmd\git.exe' add -- tests/site-introduction-copy.test.ts src/pages/index.astro
& 'C:\Program Files\Git\cmd\git.exe' commit -m "content: refresh homepage introduction"
```

Expected: one commit containing only the new copy test and homepage change.

---

### Task 2: Refresh About and Unify the Public Email

**Files:**

- Modify: `tests/site-introduction-copy.test.ts`
- Modify: `src/pages/about.astro`
- Test: `tests/site-introduction-copy.test.ts`
- Test: `tests/interaction-ui.test.ts`

**Interfaces:**

- Consumes: existing `PortalLayout` `title` and `description` props; existing `data-zh` language contract; public-contact rule already asserted for `SiteHeader.astro`.
- Produces: approved About narrative and the same public email in both About and the site header.

- [ ] **Step 1: Extend the copy test with the About contract**

Replace `tests/site-introduction-copy.test.ts` with:

```ts
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
});
```

- [ ] **Step 2: Run the focused test and verify the About assertion fails**

Run:

```powershell
cmd /c npx.cmd vitest run tests/site-introduction-copy.test.ts
```

Expected: the homepage case PASS and the About case FAIL because the old metadata, narrative, award wording, and email remain.

- [ ] **Step 3: Replace the About copy without changing its structure**

Replace the `PortalLayout` block in `src/pages/about.astro` with:

```astro
<PortalLayout
  title="About"
  description="About ZXT and this personal archive of notes, projects, and experiments."
>
  <article class="prose">
    <p class="eyebrow" data-zh="关于">About</p>
    <h1 data-zh="关于这个网站">About this site</h1>
    <p data-zh="这是我持续整理学习过程和项目实践的地方。课程笔记、公开项目与实验记录会留在这里，方便分享，也方便我在需要时重新找到当时的思路。">
      This is where I keep an ongoing record of what I learn and build. Course notes, public projects,
      and experiment logs live here so they are easy to share and easy to return to.
    </p>
    <p data-zh="我希望它更像一份长期维护的个人档案，而不是一张塞满经历的简历。内容会随着学习和项目推进慢慢更新。">
      I want it to feel more like a personal archive maintained over time than a résumé packed with
      highlights. It will keep changing as I study and work on new projects.
    </p>
    <h2 data-zh="关于我">About me</h2>
    <p data-zh="我目前就读于浙江大学，主要关注 AI Infra、AI 智能体和多模态模型，也会参与 AI 生态中的开源项目。">
      I am currently a student at Zhejiang University, with a focus on AI infrastructure, AI agents,
      and multimodal models. I also contribute to open-source projects in the broader AI ecosystem.
    </p>
    <ul>
      <li data-zh="🎓 浙江大学在读">🎓 Student at Zhejiang University</li>
      <li data-zh="🤖 关注 AI Infra、AI 智能体与多模态模型">
        🤖 Interested in AI infrastructure, AI agents, and multimodal models
      </li>
      <li data-zh="🔧 参与 AI 生态中的开源项目">
        🔧 Contributing to open-source projects in the AI ecosystem
      </li>
      <li data-zh="🏆 学习期间获得过一些学科竞赛奖项">
        🏆 Have received awards in several academic competitions
      </li>
    </ul>
    <p data-zh="平时主要使用 Python、C/C++、PyTorch、CUDA、TypeScript、Docker 和 Linux。">
      I mostly work with Python, C/C++, PyTorch, CUDA, TypeScript, Docker, and Linux.
    </p>
    <h2 data-zh="联系">Contact</h2>
    <ul>
      <li><a href="https://github.com/ZXT-zjbiliy">GitHub</a></li>
      <li><a href="mailto:xt.zhang@zju.edu.cn" data-zh="邮箱">Email</a></li>
    </ul>
  </article>
</PortalLayout>
```

- [ ] **Step 4: Run the About and contact tests**

Run:

```powershell
cmd /c npx.cmd vitest run tests/site-introduction-copy.test.ts tests/interaction-ui.test.ts
```

Expected: both test files PASS, with the header and About page using `xt.zhang@zju.edu.cn`.

- [ ] **Step 5: Commit the About change**

```powershell
& 'C:\Program Files\Git\cmd\git.exe' add -- tests/site-introduction-copy.test.ts src/pages/about.astro
& 'C:\Program Files\Git\cmd\git.exe' commit -m "content: rewrite about introduction"
```

Expected: one commit containing only the About test expansion and About page change.

---

### Task 3: Align Notes, Projects, and Topics Entry Copy

**Files:**

- Modify: `tests/site-introduction-copy.test.ts`
- Modify: `src/pages/notes/index.astro`
- Modify: `src/pages/projects/index.astro`
- Modify: `src/pages/topics/index.astro`
- Test: `tests/site-introduction-copy.test.ts`

**Interfaces:**

- Consumes: existing `PortalLayout` props, page-head markup, and `data-zh` language contract on all three index pages.
- Produces: a consistent entry-page vocabulary while leaving search, collection loading, sorting, and card rendering unchanged.

- [ ] **Step 1: Add the three index-page copy contracts**

Add this test inside the existing `describe("site introduction copy", ...)` block in `tests/site-introduction-copy.test.ts`:

```ts
  it("gives each collection index a clear reading role", () => {
    const pages = [
      {
        source: read("src/pages/notes/index.astro"),
        description: "Coursework and learning notes organized for review and reference.",
        eyebrow: 'data-zh="学习记录">Learning notes',
        chinese: 'data-zh="持续整理的课程与学习笔记，可以按分类、标签和日期查找。"',
        english: "Coursework and learning notes, organized by category, tag, and date."
      },
      {
        source: read("src/pages/projects/index.astro"),
        description: "Public projects, implementation experiments, and engineering retrospectives.",
        eyebrow: 'data-zh="实践记录">Project log',
        chinese: 'data-zh="这里记录我实际做过的公开项目，以及实现过程中的实验和复盘。"',
        english:
          "Public projects I have built, together with experiments and notes from the implementation process."
      },
      {
        source: read("src/pages/topics/index.astro"),
        description: "Curated reading paths connecting related notes and projects.",
        eyebrow: 'data-zh="阅读线索">Reading paths',
        chinese: 'data-zh="按主题串联相关笔记与项目，形成更连贯的阅读路径。"',
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
```

- [ ] **Step 2: Run the focused test and verify the index-page case fails**

Run:

```powershell
cmd /c npx.cmd vitest run tests/site-introduction-copy.test.ts
```

Expected: homepage and About cases PASS; the new collection-index case FAIL because all three pages still have their old metadata and visible introductions.

- [ ] **Step 3: Apply the approved Notes index copy**

In `src/pages/notes/index.astro`, replace the `PortalLayout` opening tag and `page-head` introduction with:

```astro
<PortalLayout
  title="Notes"
  description="Coursework and learning notes organized for review and reference."
>
  <section class="page-head">
    <p class="eyebrow" data-zh="学习记录">Learning notes</p>
    <h1 data-zh="笔记">Notes</h1>
    <p class="muted" data-zh="持续整理的课程与学习笔记，可以按分类、标签和日期查找。">
      Coursework and learning notes, organized by category, tag, and date.
    </p>
```

Leave the search input, tags, cards, client script, and styles unchanged.

- [ ] **Step 4: Apply the approved Projects index copy**

In `src/pages/projects/index.astro`, replace the `PortalLayout` opening tag and `page-head` section with:

```astro
<PortalLayout
  title="Projects"
  description="Public projects, implementation experiments, and engineering retrospectives."
>
  <section class="page-head">
    <p class="eyebrow" data-zh="实践记录">Project log</p>
    <h1 data-zh="项目">Projects</h1>
    <p class="muted" data-zh="这里记录我实际做过的公开项目，以及实现过程中的实验和复盘。">
      Public projects I have built, together with experiments and notes from the implementation process.
    </p>
  </section>
```

Leave collection loading, sorting, card rendering, and project links unchanged.

- [ ] **Step 5: Apply the approved Topics index copy**

In `src/pages/topics/index.astro`, replace the `PortalLayout` opening tag and `page-head` section with:

```astro
<PortalLayout
  title="Topics"
  description="Curated reading paths connecting related notes and projects."
>
  <section class="page-head">
    <p class="eyebrow" data-zh="阅读线索">Reading paths</p>
    <h1 data-zh="主题">Topics</h1>
    <p class="muted" data-zh="按主题串联相关笔记与项目，形成更连贯的阅读路径。">
      Curated paths that connect related notes and projects.
    </p>
  </section>
```

Leave collection loading, topic counts, card rendering, and links unchanged.

- [ ] **Step 6: Run focused copy tests and the stale-copy scan**

Run:

```powershell
cmd /c npx.cmd vitest run tests/site-introduction-copy.test.ts tests/homepage-copy.test.ts tests/interaction-ui.test.ts
rg -n "Personal portal|A compact home|agent systems|3240102335|Knowledge base|Project shelf|Durable threads" src/pages/index.astro src/pages/about.astro src/pages/notes/index.astro src/pages/projects/index.astro src/pages/topics/index.astro
```

Expected: all three test files PASS. The `rg` command prints no matches and exits with code 1, which indicates the targeted stale phrases are absent.

- [ ] **Step 7: Run the project verification gate**

Run:

```powershell
cmd /c npm.cmd run verify
```

Expected: Vitest exits 0, Astro check reports 0 errors, and Astro build succeeds with 156 generated pages. The documented Astro plugin deprecation, unusual Shiki fence, or KaTeX metric warnings remain non-fatal if emitted.

- [ ] **Step 8: Inspect the final diff and commit**

Run:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' diff --check
& 'C:\Program Files\Git\cmd\git.exe' diff -- tests/site-introduction-copy.test.ts src/pages/index.astro src/pages/about.astro src/pages/notes/index.astro src/pages/projects/index.astro src/pages/topics/index.astro
& 'C:\Program Files\Git\cmd\git.exe' status --short
```

Expected: `diff --check` emits no errors; the diff contains only the approved bilingual copy, metadata, test contract, and public email; status contains no unrelated files.

Commit:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' add -- tests/site-introduction-copy.test.ts src/pages/notes/index.astro src/pages/projects/index.astro src/pages/topics/index.astro
& 'C:\Program Files\Git\cmd\git.exe' commit -m "content: align collection entry copy"
```

Expected: the final implementation commit contains the collection-index copy and completed copy-contract test.

## Completion Criteria

- All approved English and Chinese copy is present on the five entry pages.
- The homepage Chinese snippets still pass the no-final-period test.
- About and the site header both use `xt.zhang@zju.edu.cn`, and the old student-number address is absent from About.
- Existing layout, styling, card, search, collection, and interaction behavior is unchanged.
- `cmd /c npm.cmd run verify` succeeds.
