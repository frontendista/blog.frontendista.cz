import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const writings = defineCollection({
	loader: glob({ base: "./writings", pattern: "**/*.md" })
});

export const collections = { writings };
