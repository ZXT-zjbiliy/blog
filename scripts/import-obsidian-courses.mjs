import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const vaultRoot = "D:/obsidian/note";
const sourceRoot = path.join(vaultRoot, "笔记");
const outputNotesRoot = path.join(repoRoot, "src/content/notes/courses");
const outputTopicsRoot = path.join(repoRoot, "src/content/topics");
const outputAssetsRoot = path.join(repoRoot, "public/obsidian-assets");
const publicAssetBase = "/blog/obsidian-assets";

const courseGroups = [
  {
    title: "数据结构与算法",
    topicId: "course-data-structures-algorithms",
    source: path.join(sourceRoot, "数据结构与算法"),
    kind: "folder",
    tags: ["课程笔记", "数据结构与算法", "算法"]
  },
  {
    title: "C++",
    topicId: "course-cpp",
    source: path.join(sourceRoot, "C++"),
    kind: "folder",
    tags: ["课程笔记", "C++", "编程语言"]
  },
  {
    title: "Linux",
    topicId: "course-linux",
    source: path.join(sourceRoot, "Linux"),
    kind: "folder",
    tags: ["课程笔记", "Linux", "命令行"]
  },
  {
    title: "数据库系统",
    topicId: "course-database-systems",
    source: path.join(sourceRoot, "数据库系统.md"),
    kind: "file",
    tags: ["课程笔记", "数据库系统", "数据库"]
  },
  {
    title: "数值分析",
    topicId: "course-numerical-analysis",
    source: path.join(sourceRoot, "数值分析.md"),
    kind: "file",
    tags: ["课程笔记", "数值分析", "数学"]
  },
  {
    title: "图像信息处理 DIP",
    topicId: "course-dip",
    source: path.join(sourceRoot, "图像信息处理 DIP.md"),
    kind: "file",
    tags: ["课程笔记", "图像信息处理 DIP", "图像处理"]
  },
  {
    title: "信息安全原理",
    topicId: "course-information-security",
    source: path.join(sourceRoot, "信息安全原理.md"),
    kind: "file",
    tags: ["课程笔记", "信息安全原理", "信息安全"]
  }
];

const assetExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".pdf",
  ".png",
  ".svg",
  ".webp"
]);

const generatedTopicIds = courseGroups.map((group) => group.topicId);

function slugify(value) {
  const slug = value
    .normalize("NFKC")
    .replace(/\+/g, " plus ")
    .replace(/&/g, " and ")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "note";
}

function hashPath(value) {
  return createHash("sha1").update(value).digest("hex").slice(0, 10);
}

function frontmatterString(value) {
  return JSON.stringify(value);
}

function frontmatterArray(values) {
  return `[${values.map(frontmatterString).join(", ")}]`;
}

function localDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeMarkdownPath(value) {
  return value.replaceAll("\\", "/");
}

function encodePublicPath(value) {
  return value.split("/").map(encodeURIComponent).join("/");
}

async function listMarkdownFiles(source) {
  const item = await fs.stat(source);

  if (item.isFile()) {
    return [source];
  }

  const entries = await fs.readdir(source, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const current = path.join(source, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listMarkdownFiles(current)));
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === ".md") {
      files.push(current);
    }
  }

  return files.sort((left, right) => left.localeCompare(right, "zh-CN"));
}

async function listFiles(source) {
  const entries = await fs.readdir(source, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === ".obsidian") {
      continue;
    }

    const current = path.join(source, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(current)));
    } else if (entry.isFile()) {
      files.push(current);
    }
  }

  return files;
}

function preferAsset(current, candidate) {
  if (!current) {
    return candidate;
  }

  const currentIsTrash = normalizeMarkdownPath(current).includes("/.trash/");
  const candidateIsTrash = normalizeMarkdownPath(candidate).includes("/.trash/");

  if (currentIsTrash && !candidateIsTrash) {
    return candidate;
  }

  return current;
}

async function buildAssetIndex() {
  const files = await listFiles(vaultRoot);
  const index = new Map();

  for (const file of files) {
    const extension = path.extname(file).toLowerCase();

    if (!assetExtensions.has(extension)) {
      continue;
    }

    const name = path.basename(file);
    index.set(name, preferAsset(index.get(name), file));
  }

  return index;
}

function makeAssetOutputName(source) {
  const extension = path.extname(source).toLowerCase();
  const stem = slugify(path.basename(source, path.extname(source)));
  const relative = normalizeMarkdownPath(path.relative(vaultRoot, source));
  return `${stem}-${hashPath(relative)}${extension}`;
}

function markdownLink(label, href) {
  return `[${label.replaceAll("]", "\\]")}](${href})`;
}

function cleanImportedMarkdown(markdown) {
  return markdown
    .split("\n")
    .map((line) =>
      line
        .replace(/[ \t]+$/u, "")
        .replace(/^[ \t]+/u, (indent) => indent.replace(/ +\t/gu, "\t"))
    )
    .join("\n");
}

function stripMarkdownExtension(value) {
  return value.replace(/\.md$/i, "");
}

function cleanWikiLabel(value) {
  return value.replaceAll("\n", " ").trim();
}

function collectObsidianEmbeds(markdown, assetIndex, usedAssets, missingAssets) {
  for (const match of markdown.matchAll(/!\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g)) {
    const assetName = path.basename(match[1].trim());
    const asset = assetIndex.get(assetName);

    if (asset) {
      usedAssets.add(asset);
    } else {
      missingAssets.add(assetName);
    }
  }
}

function collectMarkdownImages(markdown, currentFile, assetIndex, usedAssets, missingAssets) {
  for (const match of markdown.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    const rawTarget = match[2].trim();

    if (/^(https?:|data:|\/|#)/i.test(rawTarget)) {
      continue;
    }

    const target = decodeURIComponent(rawTarget.replace(/^<|>$/g, ""));
    const relativeAsset = path.resolve(path.dirname(currentFile), target);
    const asset = existsSync(relativeAsset) ? relativeAsset : assetIndex.get(path.basename(target));

    if (asset) {
      usedAssets.add(asset);
    } else {
      missingAssets.add(target);
    }
  }
}

function convertMarkdown(markdown, currentFile, context) {
  let output = markdown.replace(/\r\n/g, "\n").replace(/\uFEFF/g, "");

  output = output
    .replace(/[\u200B\u2060]/g, "")
    .replace(/[\u00A0\u2009]/g, " ")
    .replace(/\u2061/g, "");

  output = output.replace(/^```([^\s`]*[()（）][^\n`]*)$/gm, "```");

  output = output.replace(/!\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (_match, target, alias) => {
    const assetName = path.basename(target.trim());
    const asset = context.assetIndex.get(assetName);

    if (!asset) {
      return `![${cleanWikiLabel(alias ?? assetName)}](${assetName})`;
    }

    const outputName = context.assetOutputNameBySource.get(asset);
    const href = `${publicAssetBase}/${encodePublicPath(outputName)}`;
    return `![${cleanWikiLabel(alias ?? path.basename(assetName, path.extname(assetName)))}](${href})`;
  });

  output = output.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, rawTarget) => {
    if (/^https?:/i.test(rawTarget.trim())) {
      const target = rawTarget.trim();
      const label = alt || path.basename(new URL(target).pathname) || "外部图片";
      return markdownLink(`${label}（外部图片）`, target);
    }

    if (/^(data:|\/|#)/i.test(rawTarget.trim())) {
      return match;
    }

    const target = decodeURIComponent(rawTarget.trim().replace(/^<|>$/g, ""));
    const relativeAsset = path.resolve(path.dirname(currentFile), target);
    const asset = existsSync(relativeAsset) ? relativeAsset : context.assetIndex.get(path.basename(target));

    if (!asset) {
      return match;
    }

    const outputName = context.assetOutputNameBySource.get(asset);
    const href = `${publicAssetBase}/${encodePublicPath(outputName)}`;
    return `![${alt}](${href})`;
  });

  output = output.replace(/\[\[([^\]|#]*)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g, (_match, target, heading, alias) => {
    const noteName = stripMarkdownExtension((target ?? "").trim());
    const label = cleanWikiLabel(alias ?? heading ?? noteName);

    if (noteName && context.noteIdByTitle.has(noteName)) {
      return markdownLink(label || noteName, encodeURI(`/blog/notes/${context.noteIdByTitle.get(noteName)}`));
    }

    return label || noteName || "";
  });

  return cleanImportedMarkdown(output.trim());
}

function noteFrontmatter({ title, category, tags, date }) {
  const description = `${category} 课程笔记，导入自 Obsidian。`;

  return [
    "---",
    `title: ${frontmatterString(title)}`,
    `description: ${frontmatterString(description)}`,
    `date: ${date}`,
    `updated: ${date}`,
    `category: ${frontmatterString(category)}`,
    `tags: ${frontmatterArray(tags)}`,
    "featured: false",
    "draft: false",
    "---"
  ].join("\n");
}

function topicFrontmatter({ title, tags, date, notes }) {
  const description = `${title} 课程笔记集合，导入自 Obsidian。`;

  return [
    "---",
    `title: ${frontmatterString(title)}`,
    `description: ${frontmatterString(description)}`,
    `date: ${date}`,
    `tags: ${frontmatterArray(tags)}`,
    `notes: ${frontmatterArray(notes)}`,
    "projects: []",
    "featured: false",
    "draft: false",
    "---"
  ].join("\n");
}

async function main() {
  const selectedNotes = [];

  for (const group of courseGroups) {
    const files = await listMarkdownFiles(group.source);

    for (const file of files) {
      const title = path.basename(file, path.extname(file));
      const noteSlug = slugify(title);
      const noteId = `courses/${group.topicId}/${noteSlug}`;
      const stat = await fs.stat(file);

      selectedNotes.push({
        file,
        title,
        group,
        noteSlug,
        noteId,
        date: localDate(stat.mtime)
      });
    }
  }

  const noteIdByTitle = new Map(selectedNotes.map((note) => [note.title, note.noteId]));
  const assetIndex = await buildAssetIndex();
  const usedAssets = new Set();
  const missingAssets = new Set();

  for (const note of selectedNotes) {
    const markdown = await fs.readFile(note.file, "utf8");
    collectObsidianEmbeds(markdown, assetIndex, usedAssets, missingAssets);
    collectMarkdownImages(markdown, note.file, assetIndex, usedAssets, missingAssets);
  }

  if (missingAssets.size > 0) {
    throw new Error(`Missing ${missingAssets.size} assets:\n${[...missingAssets].sort().join("\n")}`);
  }

  await fs.rm(outputNotesRoot, { recursive: true, force: true });
  await fs.rm(outputAssetsRoot, { recursive: true, force: true });
  await fs.mkdir(outputNotesRoot, { recursive: true });
  await fs.mkdir(outputAssetsRoot, { recursive: true });

  for (const topicId of generatedTopicIds) {
    await fs.rm(path.join(outputTopicsRoot, `${topicId}.md`), { force: true });
  }

  const assetOutputNameBySource = new Map();

  for (const asset of [...usedAssets].sort((left, right) => left.localeCompare(right))) {
    let outputName = makeAssetOutputName(asset);
    let counter = 2;

    while ([...assetOutputNameBySource.values()].includes(outputName)) {
      const extension = path.extname(outputName);
      outputName = `${path.basename(outputName, extension)}-${counter}${extension}`;
      counter += 1;
    }

    assetOutputNameBySource.set(asset, outputName);
    await fs.copyFile(asset, path.join(outputAssetsRoot, outputName));
  }

  const context = {
    assetIndex,
    assetOutputNameBySource,
    noteIdByTitle
  };

  for (const note of selectedNotes) {
    const markdown = await fs.readFile(note.file, "utf8");
    const converted = convertMarkdown(markdown, note.file, context);
    const outputDir = path.join(outputNotesRoot, note.group.topicId);
    const outputFile = path.join(outputDir, `${note.noteSlug}.md`);

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(
      outputFile,
      `${noteFrontmatter({
        title: note.title,
        category: note.group.title,
        tags: note.group.tags,
        date: note.date
      })}\n\n${converted}\n`,
      "utf8"
    );
  }

  for (const group of courseGroups) {
    const notes = selectedNotes.filter((note) => note.group.topicId === group.topicId);
    const latestDate = notes.map((note) => note.date).sort().at(-1);
    const outputFile = path.join(outputTopicsRoot, `${group.topicId}.md`);

    await fs.writeFile(
      outputFile,
      `${topicFrontmatter({
        title: group.title,
        tags: group.tags,
        date: latestDate,
        notes: notes.map((note) => note.noteId)
      })}\n\n这个主题聚合导入自 Obsidian 的 ${group.title} 课程笔记。\n`,
      "utf8"
    );
  }

  console.log(`Imported ${selectedNotes.length} notes.`);
  console.log(`Created ${courseGroups.length} course topics.`);
  console.log(`Copied ${assetOutputNameBySource.size} assets.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
