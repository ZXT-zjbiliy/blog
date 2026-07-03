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
