import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

import authors_db from "../../data/authors/index.json";

const ARTICLE_MIN_TITLE_LENGTH = 30;
const ARTICLE_MAX_TITLE_LENGTH = 60;
const ARTICLE_MIN_DESCRIPTION_LENGTH = 60;
const ARTICLE_MAX_DESCRIPTION_LENGTH = 120;

const schema = z.object({
	authors: z.array(reference("authors"))
		.min(1, "At least one author is required")
		// NOTE: https://github.com/withastro/astro/issues/13268
		.refine(authors => authors.some(author => authors_db.map(author => author.id).includes(author.id)), "Author must be defined in authors.json"),
	publishedAt: z.coerce.date(),
	updatedAt: z.coerce.date().optional(),
	description: z.string().trim()
		.min(ARTICLE_MIN_DESCRIPTION_LENGTH, `Description must be at least ${ARTICLE_MIN_DESCRIPTION_LENGTH} characters long`)
		.max(ARTICLE_MAX_DESCRIPTION_LENGTH, `Description must be at most ${ARTICLE_MAX_DESCRIPTION_LENGTH} characters long`),
	series: reference("series").optional(),
	title: z.string().trim()
		.min(ARTICLE_MIN_TITLE_LENGTH, `Title must be at least ${ARTICLE_MIN_TITLE_LENGTH} characters long`)
		.max(ARTICLE_MAX_TITLE_LENGTH, `Title must be at most ${ARTICLE_MAX_TITLE_LENGTH} characters long`)
});

type Schema = z.infer<typeof schema>;

function isUpdatedAtAfterPublishedAt(data: Schema) {
	return !data.updatedAt || data.updatedAt >= data.publishedAt;
};

export const articles = defineCollection({
	loader: glob({ base: "./data/articles", pattern: "**/*.md" }),
	schema: schema.refine(isUpdatedAtAfterPublishedAt, {
		message: "Updated date must be after publishedAt date",
		path: ["updatedAt"]
	})
});
