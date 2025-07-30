import { glob } from "astro/loaders";
import { defineCollection, reference, z, type SchemaContext } from "astro:content";

import { locales } from "config";
import authors_db from "../../data/authors/index.json";

const ARTICLE_MIN_TITLE_LENGTH = 30;
const ARTICLE_MAX_TITLE_LENGTH = 60;
const ARTICLE_MIN_DESCRIPTION_LENGTH = 60;
const ARTICLE_MAX_DESCRIPTION_LENGTH = 120;

function createSchema({ image }: SchemaContext) {
	const schema = z.object({
		authors: z.array(reference("authors"))
			.min(1, "At least one author is required")
			// NOTE: https://github.com/withastro/astro/issues/13268
			.refine(authors => authors.some(author => authors_db.map(author => author.id).includes(author.id)), "Author must be defined in authors.json"),
		cover_photo: image(),
		published_at: z.coerce.date(),
		updated_at: z.coerce.date().optional(),
		description: z.string().trim()
			.min(ARTICLE_MIN_DESCRIPTION_LENGTH, `Description must be at least ${ARTICLE_MIN_DESCRIPTION_LENGTH} characters long`)
			.max(ARTICLE_MAX_DESCRIPTION_LENGTH, `Description must be at most ${ARTICLE_MAX_DESCRIPTION_LENGTH} characters long`),
		draft: z.boolean(),
		language: z.enum(locales),
		series: reference("series").optional(),
		title: z.string().trim()
			.min(ARTICLE_MIN_TITLE_LENGTH, `Title must be at least ${ARTICLE_MIN_TITLE_LENGTH} characters long`)
			.max(ARTICLE_MAX_TITLE_LENGTH, `Title must be at most ${ARTICLE_MAX_TITLE_LENGTH} characters long`)
	});

	type Schema = z.infer<typeof schema>;

	function isUpdatedAtAfterPublishedAt(data: Schema) {
		return !data.updated_at || data.updated_at >= data.published_at;
	};

	return schema.refine(isUpdatedAtAfterPublishedAt, {
		message: "Updated date must be after publishedAt date",
		path: ["updated_at"]
	});
}

export const articles = defineCollection({
	loader: glob({ base: "./data/articles", pattern: "**/*.md" }),
	schema: createSchema
});
