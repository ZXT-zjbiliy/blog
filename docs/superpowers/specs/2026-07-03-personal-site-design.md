# Personal Website Design

Date: 2026-07-03

## Goal

Build a personal website that has two connected identities:

- A public personal homepage that introduces the site owner in a light, natural way.
- A portal-style knowledge and project space for notes, projects, topics, and about information.

The site should feel like a personal portal rather than a resume site. It should be easy to maintain, privacy-conscious, and suitable for long-term note writing.

## Confirmed Decisions

- Use GitHub Pages for hosting.
- Use Astro as the recommended static-site framework.
- Use Markdown or MDX for notes, project pages, and topic pages.
- Keep the homepage personal and introductory, not resume-heavy.
- Do not create a standalone Resume page or Resume sidebar entry in the first version.
- Keep a dedicated Topics section in the first version.
- Buy and bind a custom domain later, after the first version and content direction are stable.

## Site Structure

### Homepage

The homepage uses a simple horizontal navigation:

- Notes
- Projects
- About

Homepage sections:

- Personal introduction: who I am, what I care about, and what this site records.
- Current focus: concise notes on areas such as AI infrastructure, agents, MCP, engineering practice, or other chosen themes.
- Featured notes: a small curated set of representative notes.
- Featured projects: a small curated set of representative projects.
- Recent updates: latest notes or project updates.
- Contact links: GitHub and email or another public contact method.

The homepage should avoid a CV-like layout. If resume-style information is needed later, place it as a small section on the About page.

### Notes

Purpose: the main personal knowledge base.

First-version features:

- Note list.
- Categories.
- Tags.
- Archive by date.
- Search, if practical in the first implementation; otherwise include it as a near-term follow-up.

Content format:

- Markdown or MDX files.
- Frontmatter fields such as title, date, description, tags, category, and draft.

### Projects

Purpose: public project and work showcase without making the whole site feel like a resume.

First-version features:

- Project cards.
- Project detail pages.
- Links to GitHub repositories, demos, documentation, or notes.
- Status indicators such as active, archived, research, or experiment.

Content format:

- Markdown or MDX project files.
- Frontmatter fields such as title, description, stack, status, links, date, and featured.

### Topics

Purpose: connect multiple notes and projects into durable series.

Examples:

- Agent systems.
- MCP.
- AI infrastructure.
- Engineering practice.
- Reading notes.

First-version features:

- Topic index page.
- Topic detail pages.
- Curated related notes and related projects.

### About

Purpose: a warmer, slightly longer personal page.

First-version features:

- Personal introduction.
- Interests and current direction.
- Public contact links.
- Optional light timeline or selected experience.

Privacy boundary:

- Do not expose GPA, overly specific academic details, private identity information, or detailed resume material unless explicitly added later.

## Layout

### Homepage Layout

The homepage should feel open and personal:

- Top horizontal navigation.
- Intro block.
- Current focus block.
- Featured notes and featured projects.
- Recent updates and contact links.

### Inner Page Layout

Inner pages use a portal-style structure:

- Left sidebar navigation:
  - Home
  - Notes
  - Projects
  - Topics
  - About
- Main content area.
- Search, breadcrumbs, tags, or table of contents where useful.
- Related notes/projects at the bottom of detail pages.

There is no standalone Resume item in the sidebar.

## Technical Direction

Recommended stack:

- Astro.
- Markdown or MDX content collections.
- Static generation.
- GitHub Actions deployment to GitHub Pages.

Rationale:

- Astro is well suited for content-heavy static sites.
- Markdown/MDX keeps notes and project pages easy to edit.
- Static output is simple to host on GitHub Pages.
- GitHub Actions is the right deployment path for a site that needs a build step.

Official references:

- GitHub Pages supports publishing from a branch or via a GitHub Actions workflow:
  https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Pages supports custom domains:
  https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- Astro documents a GitHub Pages deployment path using GitHub Actions:
  https://docs.astro.build/en/guides/deploy/github/

## Deployment Plan

Use GitHub Pages with GitHub Actions:

1. Create or use a GitHub repository for the site.
2. Build the Astro site locally.
3. Add a GitHub Actions workflow for deployment.
4. In GitHub repository settings, configure Pages to use GitHub Actions as the source.
5. Push to the main branch.
6. Confirm the generated GitHub Pages URL works.

Domain plan:

- Start with the default GitHub Pages URL.
- Buy a domain only after the first version content, name, and visual direction feel stable.
- Later configure a custom domain through GitHub Pages and DNS.

## First Version Scope

Included:

- Homepage.
- Notes index and note detail pages.
- Projects index and project detail pages.
- Topics index and topic detail pages.
- About page.
- Basic responsive layout.
- Markdown/MDX content structure.
- GitHub Pages deployment.

Deferred:

- Login or private dashboard.
- Comment system.
- Newsletter.
- Complex analytics.
- CMS/admin panel.
- Standalone resume page.
- Heavy third-party widgets.

## Content Needed Before Build

Minimum seed content:

- One homepage personal introduction paragraph.
- Three sample notes.
- Two sample projects.
- Two topics.
- One About page draft.

Placeholder content can be used during implementation, but final first release should include real content.

## Open Questions

- Final site name: use `ZXT`, `ZXT Notes`, or another name.
- Exact homepage introduction wording.
- Initial note categories and tags.
- GitHub repository name, which affects the default GitHub Pages URL if no custom domain is used.

## Success Criteria

- The site can be built locally.
- The site can be deployed through GitHub Pages.
- Homepage communicates a personal but not resume-heavy identity.
- Notes, projects, topics, and about pages are clearly separated.
- The first version is simple enough to maintain by editing Markdown/MDX files.
- The design leaves room for custom domain, search, RSS, and analytics later.
