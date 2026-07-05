export type NoteSection = {
  index: number;
  title: string;
  slug: string;
  content: string;
};

const topLevelHeadingPattern = /^#(?!#)\s+(.+?)\s*#*\s*$/;
const fencePattern = /^\s*(```|~~~)/;

function slugifyHeading(title: string): string {
  const cleaned = title
    .normalize("NFKC")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned || "section";
}

function uniqueSlug(base: string, seen: Map<string, number>): string {
  const count = (seen.get(base) ?? 0) + 1;
  seen.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
}

export function getNoteSections(markdown: string): NoteSection[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const sections: NoteSection[] = [];
  const seen = new Map<string, number>();
  let current: { title: string; slug: string; lines: string[] } | undefined;
  let inFence = false;

  for (const line of lines) {
    if (fencePattern.test(line)) {
      inFence = !inFence;
    }

    const heading = inFence ? undefined : line.match(topLevelHeadingPattern);

    if (heading) {
      if (current) {
        sections.push({
          index: sections.length,
          title: current.title,
          slug: current.slug,
          content: current.lines.join("\n")
        });
      }

      const title = heading[1].trim();
      current = {
        title,
        slug: uniqueSlug(slugifyHeading(title), seen),
        lines: [line]
      };
      continue;
    }

    current?.lines.push(line);
  }

  if (current) {
    sections.push({
      index: sections.length,
      title: current.title,
      slug: current.slug,
      content: current.lines.join("\n")
    });
  }

  return sections;
}

export function getNoteSection(markdown: string, sectionSlug: string): NoteSection | undefined {
  return getNoteSections(markdown).find((section) => section.slug === sectionSlug);
}

export function noteEntryPath(noteId: string, markdown = ""): string {
  const firstSection = getNoteSections(markdown)[0];
  return firstSection ? `/notes/${noteId}/${firstSection.slug}` : `/notes/${noteId}`;
}
