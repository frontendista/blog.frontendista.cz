import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const WRITING_MIN_TITLE_LENGTH = 30;
const WRITING_MAX_TITLE_LENGTH = 60;
const WRITING_MIN_DESCRIPTION_LENGTH = 60;
const WRITING_MAX_DESCRIPTION_LENGTH = 120;

export const writings = defineCollection({
	loader: glob({ base: "./writings", pattern: "**/*.md" }),
	schema() {
		return z.object({
			title: z.string().trim()
				.min(WRITING_MIN_TITLE_LENGTH, `Title must be at least ${WRITING_MIN_TITLE_LENGTH} characters long`)
				.max(WRITING_MAX_TITLE_LENGTH, `Title must be at most ${WRITING_MAX_TITLE_LENGTH} characters long`),
			description: z.string().trim()
				.min(WRITING_MIN_DESCRIPTION_LENGTH, `Description must be at least ${WRITING_MIN_DESCRIPTION_LENGTH} characters long`)
				.max(WRITING_MAX_DESCRIPTION_LENGTH, `Description must be at most ${WRITING_MAX_DESCRIPTION_LENGTH} characters long`),
			series: reference("series").optional()
		});
	}
});
