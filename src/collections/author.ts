import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const AUTHOR_ID_MIN_LENGTH = 3;
const AUTHOR_ID_MAX_LENGTH = 30;

const AUTHOR_NAME_MIN_LENGTH = 2;
const AUTHOR_NAME_MAX_LENGTH = 30;

const AUTHOR_TITLE_MIN_LENGTH = 2;
const AUTHOR_TITLE_MAX_LENGTH = 50;

export const authors = defineCollection({
	loader: file("./data/authors/index.json"),
	schema({ image }) {
		return z.object({
			id: z.string().trim()
				.min(AUTHOR_ID_MIN_LENGTH, `Author ID must be at least ${AUTHOR_ID_MIN_LENGTH} characters long`)
				.max(AUTHOR_ID_MAX_LENGTH, `Author ID must be at most ${AUTHOR_ID_MAX_LENGTH} characters long`),
			avatar: image(),
			name: z.string().trim()
				.min(AUTHOR_NAME_MIN_LENGTH, `Author name must be at least ${AUTHOR_NAME_MIN_LENGTH} characters long`)
				.max(AUTHOR_NAME_MAX_LENGTH, `Author name must be at most ${AUTHOR_NAME_MAX_LENGTH} characters long`),
			title: z.string().trim()
				.min(AUTHOR_TITLE_MIN_LENGTH, `Author title must be at least ${AUTHOR_TITLE_MIN_LENGTH} characters long`)
				.max(AUTHOR_TITLE_MAX_LENGTH, `Author title must be at most ${AUTHOR_TITLE_MAX_LENGTH} characters long`),
			link: z.string().trim().url()
		});
	}
});
