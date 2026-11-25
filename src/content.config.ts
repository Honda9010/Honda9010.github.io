import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const albums = defineCollection({
  loader: glob({ base: './src/content/albums', pattern: '*.md' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    theme: z.string(),
    demo: z.boolean().default(false),
    featured: z.boolean().default(false),
    photos: z.array(z.object({
      image: image(),
      alt: z.string(),
      caption: z.string().optional(),
      credit: z.object({ name: z.string(), url: z.url() }).optional(),
    })).min(1),
  }),
});

const stories = defineCollection({
  loader: glob({ base: './src/content/stories', pattern: '*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    section: z.enum(['travel', 'essays']),
    album: reference('albums').optional(),
    cover: z.object({ image: image(), alt: z.string() }).optional(),
    featured: z.boolean().default(false),
    demo: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { albums, stories };
