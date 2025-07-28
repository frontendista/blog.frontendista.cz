import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const series = defineCollection({
	loader: glob({ base: "./writings", pattern: "**/*.yml" }),
	schema() {
		return z.object({
			name: z.string().trim()
		});
	}
});
