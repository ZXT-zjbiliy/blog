import { buildEntries, buildTokens } from "@lib/search-build";

export const prerender = true;

// Heavy full-text inverted index.
// Only fetched when the user clicks "Full text / 全文" in the search bar.
export async function GET() {
  const { entries } = await buildEntries();
  const { tokens, texts } = await buildTokens(entries);

  return new Response(JSON.stringify({ tokens, texts }), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
