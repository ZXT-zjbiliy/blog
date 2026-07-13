import { buildEntries } from "@lib/search-build";

export const prerender = true;

// Lightweight index: entries + unified tag list only.
// Loaded as soon as the search dropdown opens so tags/marquee appear instantly.
// The heavy inverted index lives in /search-tokens.json (lazy-loaded on demand).
export async function GET() {
  const { entries, tags } = await buildEntries();

  return new Response(JSON.stringify({ entries, tags }), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
