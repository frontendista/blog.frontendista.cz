import { glob } from "astro/loaders";
import { defineCollection, reference, z, type SchemaContext } from "astro:content";

import { locales } from "config";
import authors_db from "../../data/authors/index.json";

const ARTICLE_MIN_TITLE_LENGTH = 30;
const ARTICLE_MAX_TITLE_LENGTH = 60;

const ARTICLE_MIN_DESCRIPTION_LENGTH = 60;
const ARTICLE_MAX_DESCRIPTION_LENGTH = 120;

const ARTICLE_CANONICAL_URL_MIN_LENGTH = ARTICLE_MIN_TITLE_LENGTH;
const ARTICLE_CANONICAL_URL_MAX_LENGTH = ARTICLE_MAX_TITLE_LENGTH * 2;

const MIN_TAG_STR_LENGTH = 2;
const MAX_TAG_STR_LENGTH = 20;

const MIN_TAGS_LENGTH = 2;
const MAX_TAGS_LENGTH = 5;

const tagSchema = z.string().trim()
	.min(MIN_TAG_STR_LENGTH, `Tags must be at least ${MIN_TAG_STR_LENGTH} characters long`)
	.max(MAX_TAG_STR_LENGTH, `Tags must be at most ${MAX_TAG_STR_LENGTH} characters long`);

const baseSchema = z.object({
	authors: z.array(reference("authors"))
		.min(1, "At least one author is required")
		// NOTE: https://github.com/withastro/astro/issues/13268
		.refine(authors => authors.some(author => authors_db.map(author => author.id).includes(author.id)), "Author must be defined in authors.json")
		.refine(authors => new Set(authors.map(author => author.id)).size === authors.length, "Authors must be unique"),

	canonical_url: z.string().trim()
		.min(ARTICLE_CANONICAL_URL_MIN_LENGTH, `Canonical URL must be at least ${ARTICLE_CANONICAL_URL_MIN_LENGTH} characters long`)
		.max(ARTICLE_CANONICAL_URL_MAX_LENGTH, `Canonical URL must be at most ${ARTICLE_CANONICAL_URL_MAX_LENGTH} characters long`)
		.optional(),

	category: z.enum(["tech", "health"]),
	tags: z.array(tagSchema)
		.min(MIN_TAGS_LENGTH, `At least ${MIN_TAGS_LENGTH} tags are required`)
		.max(MAX_TAGS_LENGTH, `At most ${MAX_TAGS_LENGTH} tags are allowed`),

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

export type ArticleSchema = z.infer<typeof baseSchema>;

function createSchema({ image }: SchemaContext) {
	function isUpdatedAtAfterPublishedAt(data: ArticleSchema) {
		return !data.updated_at || data.updated_at >= data.published_at;
	};

	return baseSchema.extend({
		cover_photo: z.object({
			image: image(),
			alt: z.string().trim()
		})
	})
		.refine(isUpdatedAtAfterPublishedAt, {
			message: "updated_at must be after published_at date",
			path: ["updated_at"]
		});
}

export const articles = defineCollection({
	loader: glob({ base: "./data/articles", pattern: "**/*.{md,mdx}" }),
	schema: createSchema
});
