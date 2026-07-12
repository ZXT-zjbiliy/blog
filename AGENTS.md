# Project Memory

Last updated: 2026-07-10

> This project keeps two mirrored memory files at the repo root: `CLAUDE.md` (for Claude) and `AGENTS.md` (for Codex). They must be kept identical in content. Whenever you update project memory, update BOTH files.

This file records the current working memory for the `ZXT-zjbiliy/blog` personal site. Keep it technical and privacy-conscious because this repository may be public.

## Current Site Shape

- Framework: Astro static site with MDX support.
- Hosting target: GitHub Pages at `https://zxt-zjbiliy.github.io/blog/`.
- Deployment branch: `main`.
- Content model:
  - `notes`: course notes and long-form note pages.
  - `projects`: public GitHub project writeups.
  - `topics`: curated group pages that connect notes and projects.
- Main layouts:
  - `src/layouts/BaseLayout.astro`: global HTML shell, language switching, local note-view tracking.
  - `src/layouts/PortalLayout.astro`: inner-page sidebar layout, collapsible sidebar.
  - `src/components/SiteHeader.astro`: homepage header with navigation, GitHub link, and email link.
  - `src/components/ContentCard.astro`: reusable card for notes, projects, topics, and note view counts.

## Content Decisions

- The old starter notes were removed.
- The site now focuses on imported Obsidian course notes plus three real public projects.
- Imported course notes live under `src/content/notes/courses/...`.
- Course topic aggregation pages live under `src/content/topics/course-*.md`.
- Course note descriptions should be concise custom summaries, not boilerplate such as "imported from Obsidian".
- Current project pages:
  - `src/content/projects/liquid-identification.mdx`
  - `src/content/projects/minimind-llava-v.mdx`
  - `src/content/projects/atti.mdx`
- Project descriptions should continue to be based on each repository README, not invented marketing copy.

## Obsidian Import Scope

The first imported note batch came from `D:\obsidian\note` and intentionally included only the red-boxed course scope:

- Folders:
  - `数据结构与算法/`
  - `C++/`
  - `Linux/`
- Single notes:
  - `数据库系统.md`
  - `数值分析.md`
  - `图像信息处理 DIP.md`
  - `信息安全原理.md`

Do not import unselected notes by accident, especially:

- `数值分析错题集.md`
- top-level `Linux 常用命令.md` outside the selected scope
- unrelated notes under `D:\obsidian\note\笔记`

Imported local images are served from `public/obsidian-assets/`. Markdown image links should use the GitHub Pages base path `/blog/obsidian-assets/...`.

## Note Rendering Behavior

- Course notes are Markdown `.md`, not MDX, to reduce parsing problems with formulas, angle brackets, and long class notes.
- Math support is enabled through:
  - `remark-math`
  - `rehype-katex`
  - `katex` CSS imported in `src/styles/global.css`
- Each note is split by top-level `#` headings.
- The main note URL shows a section index when top-level sections exist.
- Each top-level section gets its own page at `/notes/<note-id>/<section-slug>/`.
- The left note table of contents is generated from those top-level headings.
- The splitting helper is `src/lib/note-sections.ts`.

## Bilingual UI

- Language switching is client-side and stored in `localStorage` under `zxt-language`.
- Use `data-zh` for Chinese text and original text content for English.
- Homepage Chinese copy should not end paragraphs or short snippets with Chinese full stops.
- Keep Chinese text valid UTF-8. PowerShell may display Chinese as mojibake, so use Node or build output for reliable checks.
- Existing translations live mainly in `src/lib/i18n.ts` and inline `data-zh` attributes.

## Design System

- All visual styling is token-driven and hand-written CSS. No framework (no Tailwind), no PostCSS.
- Design tokens live in `:root` in `src/styles/global.css`: color, spacing (`--space-1..10`), radius (`--radius-sm/md/lg/pill`, with `--radius` aliased to `--radius-md`), elevation (`--shadow-sm/md/lg`), typography (`--font-size-*`, `--line-*`), font families (`--font-sans`, `--font-mono`), and motion (`--ease`, `--dur-fast/med/slow`).
- Prefer tokens over magic numbers. Derive accent tints/shades with `color-mix(in srgb, var(--accent) N%, ...)` rather than new hex values.
- Visual direction is a **cool HUD / spaceship-console sci-fi** look (both light and dark). The accent is electric cyan-teal (`--accent` ≈ `#0a7ea4` light / `#2fd8ef` dark). Sci-fi tokens in `:root`: `--glow-soft` / `--glow-strong` (box/text-shadow glows, built with `color-mix(... var(--accent) ...)` so they follow the accent), `--grid-line` + `--grid-size` (faint HUD grid drawn on `body`), `--clip-corner` + `--hud-corner` (clip-path for notched panel corners), plus `.hud-frame` / `.hud-label` utility classes. All glows/borders derive from `--accent` via `color-mix` (no hardcoded accent rgb triple) so they recolor when RGB mode is on.
- Sci-fi treatments applied: faint grid backdrop on `body`; card top accent hairline (`.card::before`) that lights up on hover with `--glow-soft`; button/toggle glow on hover; mono uppercase letterspaced eyebrows and section headings with an accent marker bar; TOC active state with a glowing left border; code blocks with an accent-tinted border + inner glow; sidebar with a glowing right edge. Keep glows restrained in light mode, stronger in dark.
- **RGB mode**: `RgbToggle.astro` (rainbow conic-gradient button, `data-rgb-toggle`) toggles `:root[data-rgb="on"]`, persisted in `localStorage` under `zxt-rgb` (anti-FOUC head script + apply/toggle logic in the `BaseLayout.astro` body IIFE, same pattern as theme). When on, an `@property --hue` angle is animated 0→360° and `--accent`/`--accent-strong`/`--grid-line` are derived from `hsl(var(--hue) ...)`, so every accent-following glow/border/heading cycles through the spectrum. Clicking the button also emits a one-shot radiating colour ring (`.burst` class → `rgb-radiate` keyframe). Reduced-motion disables the cycle and burst.
- **Flashy mode (the same RGB toggle)**: when `data-rgb="on"`, `BaseLayout.astro` also shows a full-screen CSS aurora layer (`#fx-aurora`, drifting `hsl(var(--hue) ...)` radial blobs) and a zero-dependency hand-written canvas particle engine (`#fx-canvas`). The engine is a self-contained `is:inline` IIFE exposing `window.__fx.{start,stop}`; `applyRgb()` calls it to start/stop. It draws a floating particle field + O(n²) connecting lines (colour read live from `--hue`), a mouse-move spark trail, and a click burst. Perf/a11y: DPR capped at 2, particle count ≤120 desktop / ≤40 mobile scaled by viewport area, paused on `visibilitychange`, and it self-checks `matchMedia("(prefers-reduced-motion: reduce)")` in JS (the CSS reduced-motion guard can't stop rAF) — reduced-motion draws one static frame with no loop/trails. Headings get a neon `text-shadow` + flicker. All layers are gated behind `:root[data-rgb="on"]`, so normal mode injects nothing and has zero cost.
- Flashy-heading glow is theme-split: light theme uses a tight, close `text-shadow` (a big blur reads as muddy on a light bg), and the full multi-layer neon glow is applied only under `:root[data-rgb="on"][data-theme="dark"] h1`.
- Cards have a `.card::after` diagonal light band that sweeps across on `.content-card:hover` (accent-coloured via `color-mix`, so it follows RGB mode; hidden under reduced-motion). The `.card::before` top hairline sits at `opacity: 0.7` at rest. Static panels like `.intro-panel` don't sweep.
- The light palette was tuned to a more vivid electric cyan: `--accent: #0891b2`, `--accent-strong: #075a76`, `--line: #b3c7d8`, `--bg: #e9f0f7`, `--surface-muted: #dde8f2`, `--text: #0c1622`, `--muted: #4f6178`. The dark palette is intentionally left unchanged.
- In light + flashy mode the hue-cycled accent is deliberately darker (`--accent: hsl(var(--hue) 80% 40%)`, `--accent-strong: hsl(var(--hue) 85% 48%)`) so pale hues (yellow/cyan/green) stay legible on the white surface; dark + flashy keeps the bright `hsl(... 95% 62%)` accent. Cards also get a resting accent outline in light + flashy via `:root[data-rgb="on"]:not([data-theme="dark"]) .card`.
- The sans font is self-hosted Inter via `@fontsource-variable/inter` (imported at the top of `global.css`); code uses a system monospace stack. Run `npm install` after pulling if the font dep is missing.
- Dark mode: `:root[data-theme="dark"]` overrides the color + shadow tokens. The theme follows the OS `prefers-color-scheme` until the user makes an explicit choice, which is persisted in `localStorage` under `zxt-theme`.
  - Anti-FOUC theme script runs in `<head>` of `BaseLayout.astro`; the apply/toggle logic lives in the single body IIFE there (mirrors the language-toggle pattern).
  - `ThemeToggle.astro` (sun/moon glyphs, `data-theme-toggle`, bilingual via `aria-label`) sits next to `LanguageToggle` in `PortalLayout` sidebar tools and `SiteHeader`.
  - giscus theme is synced in `Comments.astro` (reads `data-theme`, posts `setConfig` on toggle).
- Motion: interactive elements transition with the motion tokens; a global `prefers-reduced-motion` guard in `global.css` neutralizes all transitions/animations.
- Shared page-title styling is global (`.prose > h1`, `.page-head h1`, `.page-head`) — do not re-add per-page `h1` style blocks. The homepage hero `h1` is an intentional scoped exception.
- Cards (`.card`) carry `--shadow-sm`; clickable `.content-card` lifts on hover. Keep the required `data-note-card` / `data-note-view-count` attributes intact.

## Click Counts

- Note view counts are backed by a **Cloudflare Worker + KV** (online, shared across all visitors).
- Worker URL: `https://blog-views.xt-zhang.workers.dev`; KV binding name: `VIEWS`.
- API: `GET /counts` returns `{noteId: count}` JSON; `POST /increment` body `{id}` increments and returns `{id, count}`.
- On every page load, `fetchNoteViews()` in `BaseLayout.astro` fetches all counts and feeds them to `updateNoteViewDisplays()` and `sortNoteCardsByViews()`.
- On note detail pages, `incrementCurrentNoteView()` fires a POST to `/increment` (fire-and-forget). Deduplication is handled by `sessionStorage` key `zxt-viewed` (array of seen note IDs) — the same note is only counted once per browser session.
- Homepage "Featured notes" sorts cards by online view count (descending) and CSS hides cards past the third.
- Fallback: if the Worker fetch fails, counts gracefully degrade to zero — the page still renders normally.
- DOM hooks (`data-note-view-count`, `data-note-view-root`, `data-note-card`, `data-sort-notes-by-views`, `data-note-id`) are unchanged; tests pass.

## Sidebar UI

- Inner pages use a collapsible left sidebar (`PortalLayout.astro`).
- Sidebar state is stored in `localStorage` under `zxt-sidebar-collapsed`.
- Collapsed desktop state shows a narrow icon/letter navigation column.
- Mobile layout ignores the collapsed desktop shape and keeps navigation readable.
- Note detail pages (`notes/[...slug].astro`) have their own left (Contents) + right (On this page) TOC rails, collapsed independently via `data-side-toggle`, persisted under `zxt-note-side-collapsed`.
- **Collapse animation smoothness**: both the portal sidebar (`.portal-shell`) and the note TOC rails (`.note-layout`) animate `grid-template-columns` with `--dur-slow`/`--ease` + `will-change: grid-template-columns`. Rail track widths MUST be fixed lengths (`--lw`/`--rw` = `220px`/`44px`), never `minmax(...)` — track-size functions can't be interpolated and cause the transition to snap. The `no-left`/`no-right` states are static per-page (a note either has sections or not) and use 2-column templates. Collapsed rail contents (`nav`, `.eyebrow`) fade via `opacity`+`visibility` transitions rather than `display:none` so they don't pop.

## Deployment

- Workflow: `.github/workflows/deploy.yml`.
- The workflow builds with Node 24.
- Build job permissions:
  - `contents: read`
  - `pages: read`
- Deploy job permissions:
  - `pages: write`
  - `id-token: write`
- If deployment fails with `Get Pages site failed`, `Resource not accessible by integration`, or `Ensure GitHub Pages has been enabled`, check repository settings:
  - GitHub repository `Settings` -> `Pages` -> `Build and deployment`
  - Source must be `GitHub Actions`
- Local code can fix workflow permissions, but it cannot reliably enable Pages for the repository through the default workflow token.

## Local Commands

Use Windows-safe commands from `E:\blog`.

```powershell
cmd /c npm.cmd run test
cmd /c npm.cmd run check
cmd /c npm.cmd run build
cmd /c npm.cmd run verify
cmd /c npm.cmd run dev -- --host 127.0.0.1 --port 4321
```

Git is available at:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' status --short --branch
& 'C:\Program Files\Git\cmd\git.exe' log --oneline -5
```

## Verification Expectations

Before claiming a site change is complete, run:

```powershell
cmd /c npm.cmd run verify
```

Expected current shape:

- Vitest passes.
- Astro check reports 0 errors.
- Astro build succeeds.
- Build currently generates 156 pages.

Known non-fatal build output:

- Astro warns that `markdown.remarkPlugins` and `markdown.rehypePlugins` are deprecated.
- Shiki may fall back to plaintext for unusual code fence labels in imported notes.
- KaTeX may warn about missing metrics for a few special symbols in course notes.

## Tests To Preserve

Current tests cover:

- site helper behavior
- content collection config
- imported course content hygiene
- project replacement rules
- homepage Chinese punctuation rule
- note section splitting
- interactive UI hooks for contact links, sidebar collapse, and note view counts

When changing these areas, update tests first or add focused coverage.

## Public Contact

Current homepage contact links:

- GitHub: `https://github.com/ZXT-zjbiliy`
- Email: `xt.zhang@zju.edu.cn`

Do not add extra private personal details unless explicitly requested.

## Maintenance Rules

- Memory files are mirrored: keep `CLAUDE.md` and `AGENTS.md` at the repo root identical. Any time you update project memory, apply the same change to both files in the same commit.
- Prefer small, content-focused changes over broad redesigns.
- Keep the site quiet and usable rather than resume-heavy.
- Do not reintroduce generated starter notes.
- Do not import unrelated Obsidian notes unless the scope is explicitly expanded.
- Keep all internal links compatible with the `/blog/` GitHub Pages base path by using `sitePath(...)` where appropriate.
- Use `apply_patch` for manual edits.
- Do not commit or publish sensitive personal memory content.
