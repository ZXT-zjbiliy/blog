import { defineCollection, z } from "astro:content";

const notes = defineCollection({
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
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    stack: z.array(z.string()).default([]),
    status: z.enum(["active", "research", "experiment", "archived"]),
    featured: z.boolean().default(false),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    topics: z.array(z.string()).default([]),
    relatedNotes: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const topics = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    notes: z.array(z.string()).default([]),
    projects: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

export const collections = { notes, projects, topics };
