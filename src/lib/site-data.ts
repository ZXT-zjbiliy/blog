type EntryLike = {
  data: {
    date?: Date;
    draft?: boolean;
    tags?: string[];
    featured?: boolean;
  };
};

export function visibleEntries<T extends EntryLike>(entries: T[]): T[] {
  return entries.filter((entry) => entry.data.draft !== true);
}

export function sortByDateDesc<T extends EntryLike>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const left = a.data.date?.getTime() ?? 0;
    const right = b.data.date?.getTime() ?? 0;
    return right - left;
  });
}

export function featuredEntries<T extends EntryLike>(entries: T[], limit = 3): T[] {
  return sortByDateDesc(visibleEntries(entries).filter((entry) => entry.data.featured === true)).slice(
    0,
    limit
  );
}

export function getAllTags<T extends EntryLike>(entries: T[]): string[] {
  const tags = entries.flatMap((entry) => entry.data.tags ?? []);
  return [...new Set(tags)].sort((a, b) => a.localeCompare(b));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

export function sitePath(path: string, base = import.meta.env.BASE_URL): string {
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.replace(/^\/+/, "");

  if (cleanPath === "") {
    return cleanBase;
  }

  return `${cleanBase}${cleanPath}`.replace(/\/{2,}/g, "/");
}
