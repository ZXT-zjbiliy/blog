# Site Introduction Copy Refresh

Date: 2026-07-11

## Objective

Refresh the introductory copy across the site's main entry pages so the site reads as a quiet, genuine archive of course notes, project work, and AI experiments rather than a résumé or generic portfolio template.

## Scope

Update the visible introductory copy and matching page metadata for:

- Homepage
- About
- Notes index
- Projects index
- Topics index

Also update the About contact email to the project's designated public address, `xt.zhang@zju.edu.cn`.

Do not change page layouts, styles, content cards, note descriptions, project descriptions, topic content, or long-form content.

## Voice and Content Principles

- Use a concise, natural first-person voice.
- Present the site as a maintained personal archive, not a dense résumé.
- Describe only content and interests already supported by the site and project memory.
- Keep the Chinese and English copy semantically aligned without requiring literal translation.
- Homepage Chinese paragraphs and short snippets must not end with Chinese full stops.
- Preserve the existing bilingual mechanism: English remains the text content and Chinese remains in `data-zh` attributes.
- Keep the About page's personal summary list, but phrase it naturally.
- Mention academic competition awards only in general terms; do not invent names, levels, or results.

## Page Copy

### Homepage

Eyebrow:

- Chinese: `个人档案`
- English: `Personal archive`

Heading:

- Chinese: `你好，我是 ZXT`
- English: `Hi, I am ZXT`

Introduction:

- Chinese: `这里整理课程学习中的笔记、实际做过的项目和一些 AI 实验，既公开分享，也留给之后的自己回看`
- English: `A growing archive of course notes, projects I have built, and AI experiments—shared openly and kept easy to revisit.`

Current focus:

- Chinese: `课程学习与知识整理`
  English: `Coursework and knowledge organization`
- Chinese: `计算机视觉与多模态模型`
  English: `Computer vision and multimodal models`
- Chinese: `浏览器扩展与工程实践`
  English: `Browser extensions and engineering practice`

### About

Site introduction, Chinese:

> 这是我持续整理学习过程和项目实践的地方。课程笔记、公开项目与实验记录会留在这里，方便分享，也方便我在需要时重新找到当时的思路。
>
> 我希望它更像一份长期维护的个人档案，而不是一张塞满经历的简历。内容会随着学习和项目推进慢慢更新。

Site introduction, English:

> This is where I keep an ongoing record of what I learn and build. Course notes, public projects, and experiment logs live here so they are easy to share and easy to return to.
>
> I want it to feel more like a personal archive maintained over time than a résumé packed with highlights. It will keep changing as I study and work on new projects.

Personal introduction, Chinese:

> 我目前就读于浙江大学，主要关注 AI Infra、AI 智能体和多模态模型，也会参与 AI 生态中的开源项目。

Personal introduction, English:

> I am currently a student at Zhejiang University, with a focus on AI infrastructure, AI agents, and multimodal models. I also contribute to open-source projects in the broader AI ecosystem.

Summary list:

- Chinese: `🎓 浙江大学在读`
  English: `🎓 Student at Zhejiang University`
- Chinese: `🤖 关注 AI Infra、AI 智能体与多模态模型`
  English: `🤖 Interested in AI infrastructure, AI agents, and multimodal models`
- Chinese: `🔧 参与 AI 生态中的开源项目`
  English: `🔧 Contributing to open-source projects in the AI ecosystem`
- Chinese: `🏆 学习期间获得过一些学科竞赛奖项`
  English: `🏆 Have received awards in several academic competitions`

Technology paragraph:

- Chinese: `平时主要使用 Python、C/C++、PyTorch、CUDA、TypeScript、Docker 和 Linux。`
- English: `I mostly work with Python, C/C++, PyTorch, CUDA, TypeScript, Docker, and Linux.`

Contact email:

- `xt.zhang@zju.edu.cn`

### Notes Index

Eyebrow:

- Chinese: `学习记录`
- English: `Learning notes`

Introduction:

- Chinese: `持续整理的课程与学习笔记，可以按分类、标签和日期查找。`
- English: `Coursework and learning notes, organized by category, tag, and date.`

### Projects Index

Eyebrow:

- Chinese: `实践记录`
- English: `Project log`

Introduction:

- Chinese: `这里记录我实际做过的公开项目，以及实现过程中的实验和复盘。`
- English: `Public projects I have built, together with experiments and notes from the implementation process.`

### Topics Index

Eyebrow:

- Chinese: `阅读线索`
- English: `Reading paths`

Introduction:

- Chinese: `按主题串联相关笔记与项目，形成更连贯的阅读路径。`
- English: `Curated paths that connect related notes and projects.`

## Metadata

Use the following concise English descriptions through the current layout API:

- Homepage: `Course notes, public projects, and AI experiments by ZXT.`
- About: `About ZXT and this personal archive of notes, projects, and experiments.`
- Notes: `Coursework and learning notes organized for review and reference.`
- Projects: `Public projects, implementation experiments, and engineering retrospectives.`
- Topics: `Curated reading paths connecting related notes and projects.`

Do not retain outdated references to agent protocols or generic template language.

## Verification

- Add or update focused tests before implementation where the existing homepage copy and contact-link rules apply.
- Confirm the homepage Chinese copy still satisfies the no-final-Chinese-full-stop rule.
- Confirm the About page uses only the designated public email.
- Confirm all five pages render both English text and matching `data-zh` content.
- Run `cmd /c npm.cmd run verify` after implementation.
