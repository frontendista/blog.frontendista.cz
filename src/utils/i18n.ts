import type { GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import type { SupportedLocales } from "config";

export function getArticleStaticPaths(language: SupportedLocales) {
	return async function getArticleStaticPathsImpl() {
		const articles = await getCollection("articles", ({ data }) => data.language === language);

		return articles.map((article) => {
			return {
				params: {
					slug: article.id
				}
			};
		});
	} satisfies GetStaticPaths;
}
