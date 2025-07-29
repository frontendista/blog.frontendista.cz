import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

import authors_db from "../../data/authors/index.json";

const WRITING_MIN_TITLE_LENGTH = 30;
const WRITING_MAX_TITLE_LENGTH = 60;
const WRITING_MIN_DESCRIPTION_LENGTH = 60;
const WRITING_MAX_DESCRIPTION_LENGTH = 120;

export const writings = defineCollection({
	loader: glob({ base: "./data/writings", pattern: "**/*.md" }),
	schema: z.object({
		authors: z.array(reference("authors"))
			.min(1, "At least one author is required")
			// NOTE: https://github.com/withastro/astro/issues/13268
			.refine(authors => authors.some(author => authors_db.map(author => author.id).includes(author.id)), "Author must be defined in authors.json"),
		description: z.string().trim()
			.min(WRITING_MIN_DESCRIPTION_LENGTH, `Description must be at least ${WRITING_MIN_DESCRIPTION_LENGTH} characters long`)
			.max(WRITING_MAX_DESCRIPTION_LENGTH, `Description must be at most ${WRITING_MAX_DESCRIPTION_LENGTH} characters long`),
		series: reference("series").optional(),
		title: z.string().trim()
			.min(WRITING_MIN_TITLE_LENGTH, `Title must be at least ${WRITING_MIN_TITLE_LENGTH} characters long`)
			.max(WRITING_MAX_TITLE_LENGTH, `Title must be at most ${WRITING_MAX_TITLE_LENGTH} characters long`)
	})
});
