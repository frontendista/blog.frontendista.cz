import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const publicPosts = defineCollection({
	// The ID is a slug generated from the path of the file relative to `base`
	loader: glob({ pattern: "**/*.mdx", base: "./src/data/post/public" }),
	schema: z.object({
		title: z.string(),
	}),
});

export const collections = { publicPosts };
