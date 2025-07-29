import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const series = defineCollection({
	loader: glob({ base: "./data/series", pattern: "**/*.yml" }),
	schema: z.object({
		id: z.string().trim(),
		name: z.string().trim()
	})
});
