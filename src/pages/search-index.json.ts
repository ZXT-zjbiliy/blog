import { getCollection } from "astro:content";
import { entryZh, tagZh } from "@lib/i18n";
import { noteEntryPath, getNoteSections } from "@lib/note-sections";
import { sitePath, visibleEntries } from "@lib/site-data";

export const prerender = true;

// ── Types ────────────────────────────────────────────────────────────────────

interface SearchEntry {
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

interface SearchIndex {
  entries: SearchEntry[];
  tags: { en: string; zh: string }[];
  tokens: Record<string, number[]>;
}

// ── Tokeniser ─────────────────────────────────────────────────────────────────
// Handles both ASCII (word ≥ 2 chars) and CJK (sliding bigrams + unigrams).

const CJK_RE = /[　-鿿가-힯豈-﫿]/;

function tokenise(text: string): string[] {
  if (!text) return [];
  const result = new Set<string>();
  // Split on whitespace, punctuation, and common markdown symbols
  const raw = text.toLowerCase().split(/[\s\t\n\r!"#%&'()*+,\-./:;<=>?@[\\\]^_`{|}~。，、；：？！…—《》「」【】　]+/);

  for (const word of raw) {
    if (!word) continue;

    // Check if the word contains CJK characters
    if (CJK_RE.test(word)) {
      // Emit each unigram CJK char
      for (const ch of word) {
        if (CJK_RE.test(ch)) result.add(ch);
      }
      // Emit overlapping bigrams
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

// ── Build index ───────────────────────────────────────────────────────────────

export async function GET() {
  const [allNotes, allProjects, allTopics] = await Promise.all([
    getCollection("notes"),
    getCollection("projects"),
    getCollection("topics")
  ]);

  const notes = visibleEntries(allNotes);
  const projects = visibleEntries(allProjects);
  const topics = visibleEntries(allTopics);

  const entries: SearchEntry[] = [];

  // ── Notes ──────────────────────────────────────────────────────────────────
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

  // ── Projects ───────────────────────────────────────────────────────────────
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

  // ── Topics ─────────────────────────────────────────────────────────────────
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

  // ── Build inverted index (tokens → entry indices) ─────────────────────────
  // Use Object.create(null) to avoid prototype-chain collisions with built-in
  // property names such as "constructor" or "toString" appearing in note bodies.
  const tokens: Record<string, number[]> = Object.create(null) as Record<string, number[]>;

  function addTokens(idx: number, text: string) {
    for (const token of tokenise(text)) {
      if (!Array.isArray(tokens[token])) tokens[token] = [];
      if (!tokens[token].includes(idx)) tokens[token].push(idx);
    }
  }

  entries.forEach((entry, idx) => {
    // Always index metadata fields
    addTokens(idx, entry.title);
    if (entry.titleZh) addTokens(idx, entry.titleZh);
    addTokens(idx, entry.description);
    if (entry.descriptionZh) addTokens(idx, entry.descriptionZh);
    addTokens(idx, entry.tags.join(" "));
    addTokens(idx, entry.tagsZh.join(" "));
    if (entry.category) addTokens(idx, entry.category);
  });

  // Index note bodies (full text)
  for (const note of notes) {
    const idx = entries.findIndex((e) => e.type === "note" && e.id === note.id);
    if (idx === -1) continue;
    const body = note.body ?? "";
    // Index section by section to avoid one huge tokenise call
    const sections = getNoteSections(body);
    if (sections.length > 0) {
      for (const section of sections) {
        addTokens(idx, section.title);
        addTokens(idx, section.content);
      }
    } else {
      addTokens(idx, body);
    }
  }

  // ── Build unified tag list ─────────────────────────────────────────────────
  const tagSet = new Map<string, string>(); // en → zh

  for (const note of notes) {
    for (const tag of note.data.tags) {
      if (!tagSet.has(tag)) tagSet.set(tag, tagZh(tag));
    }
  }
  for (const project of projects) {
    for (const tag of project.data.stack) {
      if (!tagSet.has(tag)) tagSet.set(tag, tagZh(tag));
    }
  }
  for (const topic of topics) {
    for (const tag of topic.data.tags) {
      if (!tagSet.has(tag)) tagSet.set(tag, tagZh(tag));
    }
  }

  const tagList = [...tagSet.entries()]
    .map(([en, zh]) => ({ en, zh }))
    .sort((a, b) => a.en.localeCompare(b.en));

  const index: SearchIndex = { entries, tags: tagList, tokens };

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
