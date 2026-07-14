import { getCollection } from "astro:content";
import { entryZh, tagZh } from "@lib/i18n";
import { noteEntryPath, getNoteSections } from "@lib/note-sections";
import { sitePath, visibleEntries } from "@lib/site-data";

// ── Types ────────────────────────────────────────────────────────────────────

export interface SearchEntry {
  id: string;
  type: "note" | "project" | "topic";
  title: string;
  titleZh?: string;
  description: string;
  descriptionZh?: string;
  url: string;
  tags: string[];
  tagsZh: string[];
  category?: string;
  date: string;
}

export interface SearchData {
  entries: SearchEntry[];
  tags: { en: string; zh: string }[];
  tokens: Record<string, number[]>;
}

// ── Tokeniser ─────────────────────────────────────────────────────────────────
// Handles both ASCII (word ≥ 2 chars) and CJK (sliding bigrams + unigrams).

const CJK_RE = /[　-鿿가-힯豈-﫿]/;

export function tokenise(text: string): string[] {
  if (!text) return [];
  const result = new Set<string>();
  const raw = text.toLowerCase().split(/[\s\t\n\r!"#%&'()*+,\-./:;<=>?@[\\\]^_`{|}~。，、；：？！…—《》「」【】　]+/);

  for (const word of raw) {
    if (!word) continue;
    if (CJK_RE.test(word)) {
      for (const ch of word) {
        if (CJK_RE.test(ch)) result.add(ch);
      }
      const chars = [...word];
      for (let i = 0; i < chars.length - 1; i++) {
        if (CJK_RE.test(chars[i]) && CJK_RE.test(chars[i + 1])) {
          result.add(chars[i] + chars[i + 1]);
        }
      }
    } else if (word.length >= 2) {
      result.add(word);
    }
  }

  return [...result];
}

// ── Shared build functions ────────────────────────────────────────────────────

export async function buildEntries(): Promise<{ entries: SearchEntry[]; tags: { en: string; zh: string }[] }> {
  const [allNotes, allProjects, allTopics] = await Promise.all([
    getCollection("notes"),
    getCollection("projects"),
    getCollection("topics")
  ]);

  const notes = visibleEntries(allNotes);
  const projects = visibleEntries(allProjects);
  const topics = visibleEntries(allTopics);

  const entries: SearchEntry[] = [];

  for (const note of notes) {
    const zh = entryZh("notes", note.id);
    entries.push({
      id: note.id,
      type: "note",
      title: note.data.title,
      titleZh: zh?.title,
      description: note.data.description,
      descriptionZh: zh?.description,
      url: sitePath(noteEntryPath(note.id, note.body ?? "")),
      tags: note.data.tags,
      tagsZh: note.data.tags.map(tagZh),
      category: note.data.category,
      date: note.data.date.toISOString()
    });
  }

  for (const project of projects) {
    const zh = entryZh("projects", project.id);
    entries.push({
      id: project.id,
      type: "project",
      title: project.data.title,
      titleZh: zh?.title,
      description: project.data.description,
      descriptionZh: zh?.description,
      url: sitePath(`/projects/${project.id}`),
      tags: project.data.stack,
      tagsZh: (zh?.tags ?? project.data.stack.map(tagZh)),
      category: project.data.status,
      date: project.data.date.toISOString()
    });
  }

  for (const topic of topics) {
    const zh = entryZh("topics", topic.id);
    entries.push({
      id: topic.id,
      type: "topic",
      title: topic.data.title,
      titleZh: zh?.title,
      description: topic.data.description,
      descriptionZh: zh?.description,
      url: sitePath(`/topics/${topic.id}`),
      tags: topic.data.tags,
      tagsZh: topic.data.tags.map(tagZh),
      date: topic.data.date.toISOString()
    });
  }

  // Unified tag list across all collections
  const tagSet = new Map<string, string>();
  for (const note of notes) for (const tag of note.data.tags) if (!tagSet.has(tag)) tagSet.set(tag, tagZh(tag));
  for (const project of projects) for (const tag of project.data.stack) if (!tagSet.has(tag)) tagSet.set(tag, tagZh(tag));
  for (const topic of topics) for (const tag of topic.data.tags) if (!tagSet.has(tag)) tagSet.set(tag, tagZh(tag));

  const tags = [...tagSet.entries()]
    .map(([en, zh]) => ({ en, zh }))
    .sort((a, b) => a.en.localeCompare(b.en));

  return { entries, tags };
}

// Strip markdown syntax down to readable plain text (for snippet extraction).
export function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")          // fenced code blocks
    .replace(/`([^`]+)`/g, "$1")               // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")     // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")   // links → keep text
    .replace(/<[^>]+>/g, " ")                  // html tags
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")        // headings
    .replace(/^\s{0,3}>\s?/gm, "")             // blockquotes
    .replace(/^\s{0,3}[-*+]\s+/gm, "")         // list bullets
    .replace(/[*_~]/g, "")                     // emphasis marks
    .replace(/\s+/g, " ")                      // collapse whitespace
    .trim();
}

export interface TokensResult {
  tokens: Record<string, number[]>;
  texts: string[];
}

export async function buildTokens(entries: SearchEntry[]): Promise<TokensResult> {
  const [allNotes] = await Promise.all([getCollection("notes")]);
  const notes = visibleEntries(allNotes);

  // Use null-prototype object to avoid collisions with built-in property names
  // (e.g. "constructor", "toString") that may appear in note bodies.
  const tokens: Record<string, number[]> = Object.create(null) as Record<string, number[]>;

  function addTokens(idx: number, text: string) {
    for (const token of tokenise(text)) {
      if (!Array.isArray(tokens[token])) tokens[token] = [];
      if (!tokens[token].includes(idx)) tokens[token].push(idx);
    }
  }

  // Index metadata for all entries
  entries.forEach((entry, idx) => {
    addTokens(idx, entry.title);
    if (entry.titleZh) addTokens(idx, entry.titleZh);
    addTokens(idx, entry.description);
    if (entry.descriptionZh) addTokens(idx, entry.descriptionZh);
    addTokens(idx, entry.tags.join(" "));
    addTokens(idx, entry.tagsZh.join(" "));
    if (entry.category) addTokens(idx, entry.category);
  });

  // Plain-text body per entry (aligned with entries[] index), for snippets.
  // Only notes have a body; projects/topics stay empty (their description shows).
  const texts: string[] = entries.map(() => "");

  // Index note bodies (the expensive full-text part)
  for (const note of notes) {
    const idx = entries.findIndex((e) => e.type === "note" && e.id === note.id);
    if (idx === -1) continue;
    const body = note.body ?? "";
    const sections = getNoteSections(body);
    if (sections.length > 0) {
      for (const section of sections) {
        addTokens(idx, section.title);
        addTokens(idx, section.content);
      }
    } else {
      addTokens(idx, body);
    }
    texts[idx] = stripMarkdown(body);
  }

  return { tokens, texts };
}
