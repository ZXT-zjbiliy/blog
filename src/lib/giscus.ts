// Giscus comment/reaction system configuration.
//
// Giscus (https://giscus.app) uses GitHub Discussions as the backend, so
// visitors sign in with their own GitHub account to comment and react (like).
// It is fully client-side, which fits a static GitHub Pages site with no server.
//
// SETUP (do this once on GitHub, then fill the values below):
//   1. Make sure the repo is public and has the "Discussions" feature enabled:
//      repo Settings -> General -> Features -> check "Discussions".
//   2. Install the giscus GitHub App on this repo:
//      https://github.com/apps/giscus  (grant access to ZXT-zjbiliy/blog).
//   3. Open https://giscus.app, enter the repo `ZXT-zjbiliy/blog`, pick a
//      Discussion category (e.g. "Announcements" or a dedicated "Comments"),
//      and copy the generated `data-repo-id` and `data-category-id`.
//   4. Paste those two ids below. Until they are filled, the comment box is
//      hidden automatically so the site never shows a broken widget.

export const giscusConfig = {
  repo: "ZXT-zjbiliy/blog" as `${string}/${string}`,
  // From giscus.app after selecting the repo:
  repoId: "R_kgDOTN4hkQ",
  // The Discussion category to store comments in:
  category: "Announcements",
  categoryId: "DIC_kwDOTN4hkc4DAqy2",
  // Map each page to its own discussion by URL pathname.
  mapping: "pathname",
  // "1" enables the up-vote / reaction (like) buttons on the main post.
  reactionsEnabled: "1",
  // Load comments lazily when scrolled into view.
  loading: "lazy",
  language: "en"
} as const;

export function isGiscusConfigured(): boolean {
  return giscusConfig.repoId.trim() !== "" && giscusConfig.categoryId.trim() !== "";
}
