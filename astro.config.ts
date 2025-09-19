import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import { defineConfig } from "astro/config";
import { consola } from "consola";
import sectionize from "remark-sectionize";
import { PORTS, SITES, SUPPORTED_ENVIRONMENTS, locales, localesCodes } from "./config";
import { rehypeHeading } from "./src/utils/rehype";

const currentEnvironment = process.env.NODE_ENV as typeof SUPPORTED_ENVIRONMENTS[number];

if (!SUPPORTED_ENVIRONMENTS.includes(currentEnvironment)) {
	throw new Error(`Invalid NODE_ENV. Must be one of ${SUPPORTED_ENVIRONMENTS.join(", ")}.`);
}

consola.info(`Running in ${process.env.NODE_ENV} mode.`);

export default defineConfig({
	build: {
		format: "directory",
		assets: "assets"
	},

	i18n: {
		locales,
		defaultLocale: "en"
	},

	integrations: [
		react(),
		mdx({
			remarkPlugins: [sectionize],
			rehypePlugins: [rehypeHeading],
			recmaPlugins: [],
			optimize: true
		}),
		compress({
			HTML: true,
			CSS: false,
			JavaScript: false,
			SVG: false,
			Image: false,
			Logger: 0
		}),
		sitemap({
			i18n: {
				defaultLocale: "en",
				locales: localesCodes
			}
		})
	],

	prefetch: {
		defaultStrategy: "viewport"
	},

	server({ command }) {
		return {
			host: true,
			port: PORTS[command]
		};
	},

	site: SITES[currentEnvironment],

	trailingSlash: "never",

	vite: {
		build: {
			rollupOptions: {
				output: {
					entryFileNames: "assets/[hash:16].js",
					assetFileNames: "assets/[hash:16][extname]",
					chunkFileNames: "chunks/[hash:16].js"
				}
			}
		},
		plugins: [
			paraglideVitePlugin({
				project: "./project.inlang",
				outdir: "./src/paraglide",
				includeEslintDisableComment: false,
				strategy: ["baseLocale"]
			}),
			tailwindcss()
		]
	}
});
