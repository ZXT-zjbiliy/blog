import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const owner = "ZXT-zjbiliy";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "blog";
const isUserPage = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

export default defineConfig({
  site: `https://${owner.toLowerCase()}.github.io`,
  base: isUserPage ? "/" : `/${repo}`,
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { strict: false, throwOnError: false }]]
  },
  output: "static"
});
