import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const notes = defineCollection({
  loader: glob({ base: "./src/content/notes", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    stack: z.array(z.string()).default([]),
    status: z.enum(["active", "research", "experiment", "archived"]),
    featured: z.boolean().default(false),
    repo: z.url().optional(),
    demo: z.url().optional(),
    topics: z.array(reference("topics")).default([]),
    relatedNotes: z.array(reference("notes")).default([]),
    draft: z.boolean().default(false)
  })
});

const topics = defineCollection({
  loader: glob({ base: "./src/content/topics", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    notes: z.array(reference("notes")).default([]),
    projects: z.array(reference("projects")).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

export const collections = { notes, projects, topics };
