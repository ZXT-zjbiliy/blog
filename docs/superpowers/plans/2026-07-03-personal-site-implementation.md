# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a personal Astro website with a personal homepage, portal-style inner pages, notes, projects, topics, and about content on GitHub Pages.

**Architecture:** Use Astro static generation with content collections for notes, projects, and topics. The homepage uses a lightweight public layout; all inner sections use a shared portal layout with sidebar navigation and reusable card components.

**Tech Stack:** Astro, MDX, TypeScript, Vitest, GitHub Pages, GitHub Actions.

---

## Source Material

- Design spec: `docs/superpowers/specs/2026-07-03-personal-site-design.md`
- GitHub Pages + Astro deployment reference: https://docs.astro.build/en/guides/deploy/github/
- GitHub Pages publishing source reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## File Structure

Create this structure:

```text
E:/blog/
  .github/workflows/deploy.yml
  .gitignore
  astro.config.mjs
  package.json
  package-lock.json
  tsconfig.json
  public/favicon.svg
  public/robots.txt
  src/content.config.ts
  src/content/notes/*.mdx
  src/content/projects/*.mdx
  src/content/topics/*.mdx
  src/components/ContentCard.astro
  src/components/IdentityMark.astro
  src/components/SiteHeader.astro
  src/layouts/BaseLayout.astro
  src/layouts/PortalLayout.astro
  src/lib/site-data.ts
  src/pages/index.astro
  src/pages/404.astro
  src/pages/about.astro
  src/pages/notes/index.astro
  src/pages/notes/[...slug].astro
  src/pages/projects/index.astro
  src/pages/projects/[...slug].astro
  src/pages/topics/index.astro
  src/pages/topics/[...slug].astro
  src/styles/global.css
  tests/site-data.test.ts
```

Responsibilities:

- `src/content.config.ts`: validates Markdown/MDX frontmatter.
- `src/lib/site-data.ts`: shared sorting, filtering, date, tag, and path helpers.
- `BaseLayout.astro`: global HTML shell, metadata, and stylesheet import.
- `PortalLayout.astro`: sidebar layout for inner pages.
- `SiteHeader.astro`: horizontal homepage navigation.
- `ContentCard.astro`: reused for notes, projects, and topics.
- `src/pages/**`: Astro route files.
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow.

## Execution Notes

- Use PowerShell in `E:/blog`.
- On this machine, Git is available at `C:\Program Files\Git\cmd\git.exe`.
- Use `cmd /c npm.cmd ...` for npm commands to avoid PowerShell policy issues.
- Rename the branch to `main` before adding the GitHub Pages workflow.
- Commit after each task.

---

### Task 1: Project Scaffold, Tooling, and Helper Tests

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `astro.config.mjs`
- Create: `tests/site-data.test.ts`
- Create: `src/lib/site-data.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Create package and TypeScript configuration**

Create `package.json`:

```json
{
  "name": "personal-site",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "verify": "npm run test && npm run build"
  },
  "dependencies": {
    "@astrojs/mdx": "latest",
    "astro": "latest"
  },
  "devDependencies": {
    "@astrojs/check": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

Create `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"],
      "@styles/*": ["src/styles/*"]
    }
  }
}
```

Create `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

const owner = "ZXT-zjbiliy";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "blog";
const isUserPage = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

export default defineConfig({
  site: `https://${owner.toLowerCase()}.github.io`,
  base: isUserPage ? "/" : `/${repo}`,
  integrations: [mdx()],
  output: "static"
});
```

Modify `.gitignore` so it contains:

```gitignore
.superpowers/
dist/
node_modules/
.astro/
```

- [ ] **Step 2: Install dependencies**

Run:

```powershell
cmd /c npm.cmd install
```

Expected:

- `node_modules/` exists.
- `package-lock.json` exists.
- The command exits with code 0.

- [ ] **Step 3: Write failing helper tests**

Create `tests/site-data.test.ts`:

```ts
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
```

- [ ] **Step 4: Run tests and verify the expected failure**

Run:

```powershell
cmd /c npm.cmd run test
```

Expected:

- FAIL because `src/lib/site-data.ts` does not exist.

- [ ] **Step 5: Implement helper functions**

Create `src/lib/site-data.ts`:

```ts
type EntryLike = {
  data: {
    date?: Date;
    draft?: boolean;
    tags?: string[];
    featured?: boolean;
  };
};

export function visibleEntries<T extends EntryLike>(entries: T[]): T[] {
  return entries.filter((entry) => entry.data.draft !== true);
}

export function sortByDateDesc<T extends EntryLike>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const left = a.data.date?.getTime() ?? 0;
    const right = b.data.date?.getTime() ?? 0;
    return right - left;
  });
}

export function featuredEntries<T extends EntryLike>(entries: T[], limit = 3): T[] {
  return sortByDateDesc(visibleEntries(entries).filter((entry) => entry.data.featured === true)).slice(
    0,
    limit
  );
}

export function getAllTags<T extends EntryLike>(entries: T[]): string[] {
  const tags = entries.flatMap((entry) => entry.data.tags ?? []);
  return [...new Set(tags)].sort((a, b) => a.localeCompare(b));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function sitePath(path: string, base = import.meta.env.BASE_URL): string {
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.replace(/^\/+/, "");

  if (cleanPath === "") {
    return cleanBase;
  }

  return `${cleanBase}${cleanPath}`.replace(/\/{2,}/g, "/");
}
```

- [ ] **Step 6: Run tests and verify they pass**

Run:

```powershell
cmd /c npm.cmd run test
```

Expected:

- PASS for all tests in `tests/site-data.test.ts`.

- [ ] **Step 7: Commit scaffold and helpers**

Run:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' add .gitignore package.json package-lock.json tsconfig.json astro.config.mjs src/lib/site-data.ts tests/site-data.test.ts
& 'C:\Program Files\Git\cmd\git.exe' commit -m "chore: scaffold astro site tooling"
```

Expected:

- Commit succeeds.

---

### Task 2: Content Collections and Seed Content

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/notes/agent-systems-map.mdx`
- Create: `src/content/notes/mcp-field-notes.mdx`
- Create: `src/content/notes/github-pages-astro-setup.mdx`
- Create: `src/content/projects/atti-adapter-research.mdx`
- Create: `src/content/projects/personal-site.mdx`
- Create: `src/content/topics/agent-systems.mdx`
- Create: `src/content/topics/engineering-practice.mdx`

- [ ] **Step 1: Create content collection schemas**

Create `src/content.config.ts`:

```ts
import { defineCollection, z } from "astro:content";

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    stack: z.array(z.string()).default([]),
    status: z.enum(["active", "research", "experiment", "archived"]),
    featured: z.boolean().default(false),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    topics: z.array(z.string()).default([]),
    relatedNotes: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const topics = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    notes: z.array(z.string()).default([]),
    projects: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

export const collections = { notes, projects, topics };
```

- [ ] **Step 2: Add three seed notes**

Create `src/content/notes/agent-systems-map.mdx`:

```mdx
---
title: "Agent Systems Map"
description: "A working map for reading and building agent systems."
date: 2026-07-03
category: "AI Infra"
tags: ["Agent", "AI Infra", "Reading"]
featured: true
draft: false
---

This note collects the questions I use when reading agent systems: what the agent can observe, how it chooses tools, how state is stored, and where human review enters the loop.

The goal is not to build a taxonomy for its own sake. The goal is to keep a practical map that helps future project work move faster.
```

Create `src/content/notes/mcp-field-notes.mdx`:

```mdx
---
title: "MCP Field Notes"
description: "Notes on MCP servers, tools, resources, and product surfaces."
date: 2026-07-02
category: "Protocol"
tags: ["MCP", "Agent", "Tools"]
featured: true
draft: false
---

MCP is most useful when the boundary between model reasoning and external capability is clear.

For each server I read or build, I track the same questions: what data it exposes, what actions it can perform, how authentication works, and what failure modes should be visible to the user.
```

Create `src/content/notes/github-pages-astro-setup.mdx`:

```mdx
---
title: "Astro on GitHub Pages"
description: "Deployment notes for an Astro static site using GitHub Pages."
date: 2026-07-01
category: "Engineering"
tags: ["Astro", "GitHub Pages", "Deployment"]
featured: false
draft: false
---

This site uses Astro because Markdown content, static generation, and a small amount of structure fit the way I want to maintain notes.

For GitHub Pages, the important details are the `site` value, the `base` value for project pages, and a GitHub Actions workflow that builds and deploys the site.
```

- [ ] **Step 3: Add two seed projects**

Create `src/content/projects/atti-adapter-research.mdx`:

```mdx
---
title: "ATTI Adapter Research"
description: "Planning and architecture notes for adapting personality-test sites with a hybrid adapter approach."
date: 2026-06-24
stack: ["TypeScript", "Browser Automation", "Adapters"]
status: "research"
featured: true
topics: ["engineering-practice"]
relatedNotes: ["agent-systems-map"]
draft: false
---

This project explores how to support more sites without turning each site into a one-off script.

The preferred direction is a hybrid adapter model: explicit site adapters where the behavior matters, plus generic fallback behavior for simple pages.
```

Create `src/content/projects/personal-site.mdx`:

```mdx
---
title: "Personal Site"
description: "A personal portal for notes, projects, topics, and public writing."
date: 2026-07-03
stack: ["Astro", "MDX", "GitHub Pages"]
status: "active"
featured: true
topics: ["engineering-practice"]
relatedNotes: ["github-pages-astro-setup"]
draft: false
---

This website is designed as a small public home for ongoing notes and selected projects.

The first version favors clarity and maintenance over complex features.
```

- [ ] **Step 4: Add two seed topics**

Create `src/content/topics/agent-systems.mdx`:

```mdx
---
title: "Agent Systems"
description: "A series for agent architecture, tool use, protocols, and product patterns."
date: 2026-07-03
tags: ["Agent", "MCP", "AI Infra"]
notes: ["agent-systems-map", "mcp-field-notes"]
projects: []
featured: true
draft: false
---

This topic gathers notes that help me understand how agent systems are built and where they become useful in real products.
```

Create `src/content/topics/engineering-practice.mdx`:

```mdx
---
title: "Engineering Practice"
description: "Implementation notes, deployment patterns, and project retrospectives."
date: 2026-07-02
tags: ["Engineering", "Deployment", "Projects"]
notes: ["github-pages-astro-setup"]
projects: ["atti-adapter-research", "personal-site"]
featured: true
draft: false
---

This topic collects practical engineering notes and project writeups that are useful to revisit.
```

- [ ] **Step 5: Validate content schemas**

Run:

```powershell
cmd /c npm.cmd run check
```

Expected:

- PASS with no content collection schema errors.

- [ ] **Step 6: Commit content model and seed content**

Run:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' add src/content.config.ts src/content
& 'C:\Program Files\Git\cmd\git.exe' commit -m "feat: add content collections"
```

Expected:

- Commit succeeds.

---

### Task 3: Layouts, Navigation, Cards, and Styling

**Files:**
- Create: `src/styles/global.css`
- Create: `src/components/IdentityMark.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/ContentCard.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/PortalLayout.astro`
- Test: `cmd /c npm.cmd run check`

- [ ] **Step 1: Create global styles**

Create `src/styles/global.css`:

```css
:root {
  color-scheme: light;
  --bg: #f7f8fb;
  --surface: #ffffff;
  --surface-muted: #eef2f7;
  --text: #18202f;
  --muted: #647084;
  --line: #d8dee9;
  --accent: #176b87;
  --accent-strong: #0f5066;
  --green: #467a54;
  --yellow: #9b6a18;
  --radius: 8px;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: var(--accent);
}

.container {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.eyebrow {
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.muted {
  color: var(--muted);
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  font-weight: 700;
}

.button.primary {
  border-color: var(--accent);
  background: var(--accent);
  color: white;
}

.grid {
  display: grid;
  gap: 16px;
}

.grid.two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid.three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.card {
  min-height: 100%;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 18px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 12px 0 0;
  list-style: none;
}

.tag {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface-muted);
  color: var(--muted);
  font-size: 0.82rem;
  padding: 3px 9px;
}

.prose {
  max-width: 760px;
}

.prose h1,
.prose h2,
.prose h3 {
  line-height: 1.2;
}

.prose code {
  border-radius: 5px;
  background: var(--surface-muted);
  padding: 2px 5px;
}

@media (max-width: 820px) {
  .grid.two,
  .grid.three {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Create identity mark component**

Create `src/components/IdentityMark.astro`:

```astro
---
const { compact = false } = Astro.props;
---

<div class:list={["identity-mark", { compact }]}>
  <span>Z</span>
</div>

<style>
  .identity-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgba(23, 107, 135, 0.16), rgba(70, 122, 84, 0.14)),
      #fff;
    border: 1px solid var(--line);
    color: var(--accent-strong);
    font-weight: 800;
  }

  .identity-mark.compact {
    width: 34px;
    height: 34px;
  }
</style>
```

- [ ] **Step 3: Create site header**

Create `src/components/SiteHeader.astro`:

```astro
---
import IdentityMark from "@components/IdentityMark.astro";
import { sitePath } from "@lib/site-data";

const links = [
  { href: "/notes", label: "Notes" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" }
];
---

<header class="site-header">
  <a class="brand" href={sitePath("/")}>
    <IdentityMark compact />
    <span>ZXT</span>
  </a>
  <nav aria-label="Primary navigation">
    {links.map((link) => <a href={sitePath(link.href)}>{link.label}</a>)}
  </nav>
</header>

<style>
  .site-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    min-height: 72px;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    color: var(--muted);
    font-weight: 700;
  }

  @media (max-width: 640px) {
    .site-header {
      align-items: flex-start;
      flex-direction: column;
      padding: 10px 0;
    }
  }
</style>
```

- [ ] **Step 4: Create reusable content card**

Create `src/components/ContentCard.astro`:

```astro
---
import { formatDate, sitePath } from "@lib/site-data";

const { href, title, description, date, tags = [], meta = "" } = Astro.props;
---

<article class="card content-card">
  <div class="meta">
    {date ? <time datetime={date.toISOString()}>{formatDate(date)}</time> : null}
    {meta ? <span>{meta}</span> : null}
  </div>
  <h3><a href={sitePath(href)}>{title}</a></h3>
  <p>{description}</p>
  {tags.length > 0 ? (
    <ul class="tag-list">
      {tags.map((tag: string) => <li class="tag">{tag}</li>)}
    </ul>
  ) : null}
</article>

<style>
  .content-card h3 {
    margin: 8px 0;
    line-height: 1.25;
  }

  .content-card p {
    margin: 0;
    color: var(--muted);
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    color: var(--muted);
    font-size: 0.86rem;
  }
</style>
```

- [ ] **Step 5: Create base layout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import "@styles/global.css";

const {
  title = "ZXT Notes",
  description = "Personal notes, projects, and topics."
} = Astro.props;

const pageTitle = title === "ZXT Notes" ? title : `${title} | ZXT Notes`;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{pageTitle}</title>
    <link rel="icon" href={`${import.meta.env.BASE_URL}favicon.svg`} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 6: Create portal layout**

Create `src/layouts/PortalLayout.astro`:

```astro
---
import BaseLayout from "@layouts/BaseLayout.astro";
import IdentityMark from "@components/IdentityMark.astro";
import { sitePath } from "@lib/site-data";

const { title, description } = Astro.props;

const links = [
  { href: "/", label: "Home" },
  { href: "/notes", label: "Notes" },
  { href: "/projects", label: "Projects" },
  { href: "/topics", label: "Topics" },
  { href: "/about", label: "About" }
];
---

<BaseLayout title={title} description={description}>
  <div class="portal-shell">
    <aside class="sidebar">
      <a class="portal-brand" href={sitePath("/")}>
        <IdentityMark compact />
        <span>ZXT Portal</span>
      </a>
      <nav aria-label="Portal navigation">
        {links.map((link) => <a href={sitePath(link.href)}>{link.label}</a>)}
      </nav>
    </aside>
    <main class="portal-main">
      <slot />
    </main>
  </div>
</BaseLayout>

<style>
  .portal-shell {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    min-height: 100vh;
  }

  .sidebar {
    border-right: 1px solid var(--line);
    background: var(--surface);
    padding: 24px;
  }

  .portal-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
    font-weight: 800;
  }

  .sidebar nav {
    display: grid;
    gap: 8px;
  }

  .sidebar nav a {
    border-radius: var(--radius);
    color: var(--muted);
    font-weight: 700;
    padding: 8px 10px;
  }

  .sidebar nav a:hover {
    background: var(--surface-muted);
    color: var(--accent);
  }

  .portal-main {
    width: min(960px, calc(100% - 32px));
    margin: 0 auto;
    padding: 36px 0 56px;
  }

  @media (max-width: 760px) {
    .portal-shell {
      grid-template-columns: 1fr;
    }

    .sidebar {
      border-right: 0;
      border-bottom: 1px solid var(--line);
    }

    .sidebar nav {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
```

- [ ] **Step 7: Run layout type check**

Run:

```powershell
cmd /c npm.cmd run check
```

Expected:

- PASS.

- [ ] **Step 8: Commit layout foundation**

Run:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' add src/styles src/components src/layouts
& 'C:\Program Files\Git\cmd\git.exe' commit -m "feat: add site layouts"
```

Expected:

- Commit succeeds.

---

### Task 4: Homepage

**Files:**
- Create: `src/pages/index.astro`
- Test: `cmd /c npm.cmd run build`

- [ ] **Step 1: Create homepage route**

Create `src/pages/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import SiteHeader from "@components/SiteHeader.astro";
import ContentCard from "@components/ContentCard.astro";
import IdentityMark from "@components/IdentityMark.astro";
import BaseLayout from "@layouts/BaseLayout.astro";
import { featuredEntries, sitePath, sortByDateDesc, visibleEntries } from "@lib/site-data";

const allNotes = await getCollection("notes");
const allProjects = await getCollection("projects");

const notes = sortByDateDesc(visibleEntries(allNotes));
const featuredNotes = featuredEntries(allNotes, 3);
const featuredProjects = featuredEntries(allProjects, 2);
const recentUpdates = notes.slice(0, 3);
---

<BaseLayout title="ZXT Notes" description="Personal notes, projects, and topics.">
  <div class="container">
    <SiteHeader />

    <main>
      <section class="hero">
        <div>
          <p class="eyebrow">Personal portal</p>
          <h1>Hi, I am ZXT.</h1>
          <p class="hero-copy">
            I use this site to collect engineering notes, AI infrastructure reading, agent system ideas,
            project writeups, and the practical details worth revisiting.
          </p>
          <div class="button-row">
            <a class="button primary" href={sitePath("/notes")}>Read notes</a>
            <a class="button" href={sitePath("/projects")}>View projects</a>
          </div>
        </div>
        <div class="intro-panel">
          <IdentityMark />
          <p class="eyebrow">Current focus</p>
          <ul>
            <li>Agent systems and tool use</li>
            <li>MCP and AI infrastructure</li>
            <li>Engineering practice and deployment notes</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Featured notes</p>
          <a href={sitePath("/notes")}>All notes</a>
        </div>
        <div class="grid three">
          {featuredNotes.map((note) => (
            <ContentCard
              href={`/notes/${note.id}`}
              title={note.data.title}
              description={note.data.description}
              date={note.data.date}
              tags={note.data.tags}
              meta={note.data.category}
            />
          ))}
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Projects</p>
          <a href={sitePath("/projects")}>All projects</a>
        </div>
        <div class="grid two">
          {featuredProjects.map((project) => (
            <ContentCard
              href={`/projects/${project.id}`}
              title={project.data.title}
              description={project.data.description}
              date={project.data.date}
              tags={project.data.stack}
              meta={project.data.status}
            />
          ))}
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Recent updates</p>
          <a href={sitePath("/topics")}>Browse topics</a>
        </div>
        <div class="grid">
          {recentUpdates.map((note) => (
            <ContentCard
              href={`/notes/${note.id}`}
              title={note.data.title}
              description={note.data.description}
              date={note.data.date}
              tags={note.data.tags}
              meta={note.data.category}
            />
          ))}
        </div>
      </section>
    </main>
  </div>
</BaseLayout>

<style>
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
    gap: 28px;
    align-items: stretch;
    padding: 42px 0 36px;
  }

  h1 {
    max-width: 760px;
    margin: 8px 0 16px;
    font-size: clamp(2.4rem, 7vw, 5rem);
    line-height: 0.98;
  }

  .hero-copy {
    max-width: 680px;
    color: var(--muted);
    font-size: 1.08rem;
  }

  .intro-panel {
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: var(--surface);
    padding: 22px;
  }

  .intro-panel ul {
    padding-left: 18px;
    margin-bottom: 0;
  }

  .section {
    padding: 28px 0;
  }

  .section-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 14px;
  }

  @media (max-width: 820px) {
    .hero {
      grid-template-columns: 1fr;
    }
  }
  </style>
```

- [ ] **Step 2: Build and verify homepage generation**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- PASS.
- `dist/index.html` exists.

- [ ] **Step 3: Commit homepage**

Run:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' add src/pages/index.astro
& 'C:\Program Files\Git\cmd\git.exe' commit -m "feat: add personal homepage"
```

Expected:

- Commit succeeds.

---

### Task 5: Notes Index and Detail Pages

**Files:**
- Create: `src/pages/notes/index.astro`
- Create: `src/pages/notes/[...slug].astro`
- Test: `cmd /c npm.cmd run build`

- [ ] **Step 1: Create notes index with search filter**

Create `src/pages/notes/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import ContentCard from "@components/ContentCard.astro";
import PortalLayout from "@layouts/PortalLayout.astro";
import { getAllTags, sortByDateDesc, visibleEntries } from "@lib/site-data";

const notes = sortByDateDesc(visibleEntries(await getCollection("notes")));
const tags = getAllTags(notes);
---

<PortalLayout title="Notes" description="Personal notes and engineering writing.">
  <section class="page-head">
    <p class="eyebrow">Knowledge base</p>
    <h1>Notes</h1>
    <p class="muted">Search and browse notes by category, tag, and date.</p>
    <input id="note-search" type="search" placeholder="Search notes, tags, or categories" />
    <ul class="tag-list">
      {tags.map((tag) => <li class="tag">{tag}</li>)}
    </ul>
  </section>

  <section class="grid" id="notes-list">
    {notes.map((note) => (
      <div data-search={`${note.data.title} ${note.data.description} ${note.data.category} ${note.data.tags.join(" ")}`.toLowerCase()}>
        <ContentCard
          href={`/notes/${note.id}`}
          title={note.data.title}
          description={note.data.description}
          date={note.data.date}
          tags={note.data.tags}
          meta={note.data.category}
        />
      </div>
    ))}
  </section>

  <script>
    const input = document.querySelector("#note-search");
    const items = [...document.querySelectorAll("#notes-list [data-search]")];

    input?.addEventListener("input", (event) => {
      const query = event.target.value.toLowerCase().trim();
      for (const item of items) {
        item.hidden = query.length > 0 && !item.dataset.search.includes(query);
      }
    });
  </script>
</PortalLayout>

<style>
  .page-head {
    margin-bottom: 26px;
  }

  h1 {
    margin: 8px 0;
    font-size: 2.6rem;
    line-height: 1.05;
  }

  input {
    width: 100%;
    min-height: 44px;
    margin-top: 14px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    padding: 0 12px;
    font: inherit;
  }
</style>
```

- [ ] **Step 2: Create note detail route**

Create `src/pages/notes/[...slug].astro`:

```astro
---
import { getCollection, render } from "astro:content";
import PortalLayout from "@layouts/PortalLayout.astro";
import { formatDate } from "@lib/site-data";

export async function getStaticPaths() {
  const notes = await getCollection("notes", ({ data }) => data.draft !== true);
  return notes.map((note) => ({ params: { slug: note.id }, props: { note } }));
}

const { note } = Astro.props;
const { Content } = await render(note);
---

<PortalLayout title={note.data.title} description={note.data.description}>
  <article class="prose">
    <p class="eyebrow">{note.data.category}</p>
    <h1>{note.data.title}</h1>
    <p class="muted">{note.data.description}</p>
    <p class="muted">
      <time datetime={note.data.date.toISOString()}>{formatDate(note.data.date)}</time>
      {note.data.updated ? <span> · Updated {formatDate(note.data.updated)}</span> : null}
    </p>
    <ul class="tag-list">
      {note.data.tags.map((tag) => <li class="tag">{tag}</li>)}
    </ul>
    <Content />
  </article>
</PortalLayout>

<style>
  h1 {
    margin: 8px 0;
    font-size: 2.7rem;
    line-height: 1.05;
  }
</style>
```

- [ ] **Step 3: Build and verify notes routes**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- PASS.
- `dist/notes/index.html` exists.
- `dist/notes/agent-systems-map/index.html` exists.
- `dist/notes/mcp-field-notes/index.html` exists.

- [ ] **Step 4: Commit notes pages**

Run:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' add src/pages/notes
& 'C:\Program Files\Git\cmd\git.exe' commit -m "feat: add notes pages"
```

Expected:

- Commit succeeds.

---

### Task 6: Projects and Topics Pages

**Files:**
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/projects/[...slug].astro`
- Create: `src/pages/topics/index.astro`
- Create: `src/pages/topics/[...slug].astro`
- Test: `cmd /c npm.cmd run build`

- [ ] **Step 1: Create projects index**

Create `src/pages/projects/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import ContentCard from "@components/ContentCard.astro";
import PortalLayout from "@layouts/PortalLayout.astro";
import { sortByDateDesc, visibleEntries } from "@lib/site-data";

const projects = sortByDateDesc(visibleEntries(await getCollection("projects")));
---

<PortalLayout title="Projects" description="Selected public projects and writeups.">
  <section class="page-head">
    <p class="eyebrow">Project shelf</p>
    <h1>Projects</h1>
    <p class="muted">A compact list of projects, experiments, and research threads.</p>
  </section>
  <section class="grid two">
    {projects.map((project) => (
      <ContentCard
        href={`/projects/${project.id}`}
        title={project.data.title}
        description={project.data.description}
        date={project.data.date}
        tags={project.data.stack}
        meta={project.data.status}
      />
    ))}
  </section>
</PortalLayout>

<style>
  .page-head {
    margin-bottom: 26px;
  }

  h1 {
    margin: 8px 0;
    font-size: 2.6rem;
    line-height: 1.05;
  }
</style>
```

- [ ] **Step 2: Create project detail route**

Create `src/pages/projects/[...slug].astro`:

```astro
---
import { getCollection, render } from "astro:content";
import PortalLayout from "@layouts/PortalLayout.astro";
import { formatDate, sitePath } from "@lib/site-data";

export async function getStaticPaths() {
  const projects = await getCollection("projects", ({ data }) => data.draft !== true);
  return projects.map((project) => ({ params: { slug: project.id }, props: { project } }));
}

const { project } = Astro.props;
const { Content } = await render(project);
---

<PortalLayout title={project.data.title} description={project.data.description}>
  <article class="prose">
    <p class="eyebrow">{project.data.status}</p>
    <h1>{project.data.title}</h1>
    <p class="muted">{project.data.description}</p>
    <p class="muted"><time datetime={project.data.date.toISOString()}>{formatDate(project.data.date)}</time></p>
    <div class="button-row">
      {project.data.repo ? <a class="button" href={project.data.repo}>GitHub</a> : null}
      {project.data.demo ? <a class="button" href={project.data.demo}>Demo</a> : null}
    </div>
    <ul class="tag-list">
      {project.data.stack.map((item) => <li class="tag">{item}</li>)}
    </ul>
    <Content />
    {project.data.relatedNotes.length > 0 ? (
      <section>
        <h2>Related notes</h2>
        <ul>
          {project.data.relatedNotes.map((slug) => <li><a href={sitePath(`/notes/${slug}`)}>{slug}</a></li>)}
        </ul>
      </section>
    ) : null}
  </article>
</PortalLayout>

<style>
  h1 {
    margin: 8px 0;
    font-size: 2.7rem;
    line-height: 1.05;
  }
</style>
```

- [ ] **Step 3: Create topics index**

Create `src/pages/topics/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import ContentCard from "@components/ContentCard.astro";
import PortalLayout from "@layouts/PortalLayout.astro";
import { sortByDateDesc, visibleEntries } from "@lib/site-data";

const topics = sortByDateDesc(visibleEntries(await getCollection("topics")));
---

<PortalLayout title="Topics" description="Curated series connecting notes and projects.">
  <section class="page-head">
    <p class="eyebrow">Series</p>
    <h1>Topics</h1>
    <p class="muted">Durable threads that connect notes, projects, and reading paths.</p>
  </section>
  <section class="grid two">
    {topics.map((topic) => (
      <ContentCard
        href={`/topics/${topic.id}`}
        title={topic.data.title}
        description={topic.data.description}
        date={topic.data.date}
        tags={topic.data.tags}
        meta={`${topic.data.notes.length} notes · ${topic.data.projects.length} projects`}
      />
    ))}
  </section>
</PortalLayout>

<style>
  .page-head {
    margin-bottom: 26px;
  }

  h1 {
    margin: 8px 0;
    font-size: 2.6rem;
    line-height: 1.05;
  }
</style>
```

- [ ] **Step 4: Create topic detail route**

Create `src/pages/topics/[...slug].astro`:

```astro
---
import { getCollection, render } from "astro:content";
import ContentCard from "@components/ContentCard.astro";
import PortalLayout from "@layouts/PortalLayout.astro";

export async function getStaticPaths() {
  const topics = await getCollection("topics", ({ data }) => data.draft !== true);
  return topics.map((topic) => ({ params: { slug: topic.id }, props: { topic } }));
}

const { topic } = Astro.props;
const { Content } = await render(topic);
const notes = await getCollection("notes", ({ id, data }) => data.draft !== true && topic.data.notes.includes(id));
const projects = await getCollection(
  "projects",
  ({ id, data }) => data.draft !== true && topic.data.projects.includes(id)
);
---

<PortalLayout title={topic.data.title} description={topic.data.description}>
  <article class="prose">
    <p class="eyebrow">Topic</p>
    <h1>{topic.data.title}</h1>
    <p class="muted">{topic.data.description}</p>
    <ul class="tag-list">
      {topic.data.tags.map((tag) => <li class="tag">{tag}</li>)}
    </ul>
    <Content />
  </article>

  {notes.length > 0 ? (
    <section class="related">
      <h2>Notes</h2>
      <div class="grid">
        {notes.map((note) => (
          <ContentCard
            href={`/notes/${note.id}`}
            title={note.data.title}
            description={note.data.description}
            date={note.data.date}
            tags={note.data.tags}
            meta={note.data.category}
          />
        ))}
      </div>
    </section>
  ) : null}

  {projects.length > 0 ? (
    <section class="related">
      <h2>Projects</h2>
      <div class="grid">
        {projects.map((project) => (
          <ContentCard
            href={`/projects/${project.id}`}
            title={project.data.title}
            description={project.data.description}
            date={project.data.date}
            tags={project.data.stack}
            meta={project.data.status}
          />
        ))}
      </div>
    </section>
  ) : null}
</PortalLayout>

<style>
  h1 {
    margin: 8px 0;
    font-size: 2.7rem;
    line-height: 1.05;
  }

  .related {
    margin-top: 36px;
  }
</style>
```

- [ ] **Step 5: Build and verify project/topic routes**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- PASS.
- `dist/projects/index.html` exists.
- `dist/projects/personal-site/index.html` exists.
- `dist/topics/index.html` exists.
- `dist/topics/agent-systems/index.html` exists.

- [ ] **Step 6: Commit projects and topics**

Run:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' add src/pages/projects src/pages/topics
& 'C:\Program Files\Git\cmd\git.exe' commit -m "feat: add projects and topics pages"
```

Expected:

- Commit succeeds.

---

### Task 7: About and 404 Pages

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/404.astro`
- Test: `cmd /c npm.cmd run build`

- [ ] **Step 1: Create About page**

Create `src/pages/about.astro`:

```astro
---
import PortalLayout from "@layouts/PortalLayout.astro";
---

<PortalLayout title="About" description="A short personal introduction and public contact links.">
  <article class="prose">
    <p class="eyebrow">About</p>
    <h1>About this site</h1>
    <p>
      I use this site as a public notebook and project shelf. It is where I keep notes on agent systems,
      AI infrastructure, protocols, engineering practice, and the projects that connect those ideas.
    </p>
    <p>
      The goal is to keep the site useful without turning it into a dense resume. The public information here
      is intentionally selective: notes, projects, interests, and ways to reach me.
    </p>
    <h2>Contact</h2>
    <ul>
      <li><a href="https://github.com/ZXT-zjbiliy">GitHub</a></li>
      <li><a href="mailto:3240102335@zju.edu.cn">Email</a></li>
    </ul>
  </article>
</PortalLayout>

<style>
  h1 {
    margin: 8px 0;
    font-size: 2.7rem;
    line-height: 1.05;
  }
</style>
```

- [ ] **Step 2: Create 404 page**

Create `src/pages/404.astro`:

```astro
---
import PortalLayout from "@layouts/PortalLayout.astro";
import { sitePath } from "@lib/site-data";
---

<PortalLayout title="Page not found" description="The requested page was not found.">
  <section class="prose">
    <p class="eyebrow">404</p>
    <h1>Page not found</h1>
    <p class="muted">The page may have moved, or the link may be incomplete.</p>
    <div class="button-row">
      <a class="button primary" href={sitePath("/")}>Go home</a>
      <a class="button" href={sitePath("/notes")}>Browse notes</a>
    </div>
  </section>
</PortalLayout>

<style>
  h1 {
    margin: 8px 0;
    font-size: 2.7rem;
    line-height: 1.05;
  }
</style>
```

- [ ] **Step 3: Build and verify static pages**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- PASS.
- `dist/about/index.html` exists.
- `dist/404.html` exists.

- [ ] **Step 4: Commit About and 404 pages**

Run:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' add src/pages/about.astro src/pages/404.astro
& 'C:\Program Files\Git\cmd\git.exe' commit -m "feat: add about and not found pages"
```

Expected:

- Commit succeeds.

---

### Task 8: Public Assets and GitHub Pages Deployment

**Files:**
- Create: `public/favicon.svg`
- Create: `public/robots.txt`
- Create: `.github/workflows/deploy.yml`
- Modify: branch name from `master` to `main`
- Test: `cmd /c npm.cmd run verify`

- [ ] **Step 1: Add favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="ZXT">
  <rect width="64" height="64" rx="12" fill="#176b87"/>
  <path d="M18 18h29L26 46h22" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

- [ ] **Step 2: Add robots file**

Create `public/robots.txt`:

```text
User-agent: *
Allow: /
```

- [ ] **Step 3: Add GitHub Pages workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v6
      - name: Install, build, and upload your site
        uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

- [ ] **Step 4: Rename local branch to main**

Run:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' branch -M main
```

Expected:

- `git branch --show-current` prints `main`.

- [ ] **Step 5: Run full verification**

Run:

```powershell
cmd /c npm.cmd run verify
```

Expected:

- Tests pass.
- Astro check passes.
- Astro build passes.
- `dist/` contains generated pages.

- [ ] **Step 6: Commit deployment setup**

Run:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' add public .github/workflows/deploy.yml package-lock.json
& 'C:\Program Files\Git\cmd\git.exe' commit -m "ci: deploy site to github pages"
```

Expected:

- Commit succeeds.

---

### Task 9: Local Browser QA and GitHub Publishing Instructions

**Files:**
- No source file changes unless QA finds a defect.
- Test: local preview in browser.

- [ ] **Step 1: Start local preview**

Run:

```powershell
cmd /c npm.cmd run preview -- --host 127.0.0.1
```

Expected:

- The command prints a local preview URL, usually `http://127.0.0.1:4321/`.

- [ ] **Step 2: Verify key pages manually**

Open the preview URL and check:

- Home page loads.
- Header links go to Notes, Projects, and About.
- Notes page search filters note cards.
- Note detail pages render MDX content.
- Projects page links to project detail pages.
- Topics page links to topic detail pages.
- About page contains no standalone resume layout.
- Mobile width keeps the sidebar usable by stacking it above content.

- [ ] **Step 3: Create GitHub repository and push**

Create a repository on GitHub. Recommended repository name: `blog`.

Run:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' remote add origin https://github.com/ZXT-zjbiliy/blog.git
& 'C:\Program Files\Git\cmd\git.exe' push -u origin main
```

Expected:

- Push succeeds.
- GitHub repository contains the site source.

- [ ] **Step 4: Configure GitHub Pages**

In the GitHub repository:

1. Open Settings.
2. Open Pages.
3. Under Build and deployment, set Source to GitHub Actions.
4. Open the Actions tab.
5. Confirm the `Deploy to GitHub Pages` workflow completes successfully.

Expected:

- GitHub shows a Pages URL in this shape: `https://zxt-zjbiliy.github.io/blog/`.

- [ ] **Step 5: Final verification**

Visit the GitHub Pages URL and check:

- CSS and favicon load.
- Internal links include the `/blog/` base path.
- Notes, projects, topics, and about pages work.
- Search input on Notes works.

- [ ] **Step 6: Commit QA fixes if needed**

If QA required source changes, run:

```powershell
cmd /c npm.cmd run verify
& 'C:\Program Files\Git\cmd\git.exe' add src public astro.config.mjs package.json package-lock.json
& 'C:\Program Files\Git\cmd\git.exe' commit -m "fix: polish github pages site"
& 'C:\Program Files\Git\cmd\git.exe' push
```

Expected:

- Verification passes.
- Fix commit is pushed.
- GitHub Actions redeploys.

---

## Plan Self-Review

Spec coverage:

- Personal homepage: Task 4.
- Portal-style inner pages: Task 3.
- Notes index and detail pages: Task 5.
- Projects index and detail pages: Task 6.
- Topics index and detail pages: Task 6.
- About page without standalone resume page: Task 7.
- Markdown/MDX content collections: Task 2.
- GitHub Pages deployment: Task 8 and Task 9.
- Default GitHub Pages URL before custom domain: Task 9.
- Privacy-conscious public presentation: Task 4 and Task 7.

Verification coverage:

- Helper unit tests: Task 1.
- Astro content/schema/type checks: Tasks 2 through 8.
- Static build: Tasks 4 through 8.
- Browser QA: Task 9.

Implementation order:

- The plan starts with tests and helpers, then content, layout, routes, deployment, and final QA.
- Each task ends with a commit so progress can be reviewed or reverted at task boundaries.
