import type { GetStaticPaths } from "astro";
import { defaultLocale, locales } from "config";

export const getLocaleStaticPaths: GetStaticPaths = () => {
	return locales.filter(locale => locale !== defaultLocale).map(locale => ({ params: { locale } }))
}
