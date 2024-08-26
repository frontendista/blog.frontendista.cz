import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import blist from "browserslist-to-esbuild"

import { browserslist } from "./package.json";

// https://astro.build/config
export default defineConfig({
	experimental: {
		contentLayer: true,
		contentIntellisense: true,
	},
	trailingSlash: "never",
	build: {
		format: "file",
		assets: "assets",
	},
	vite: {
		build: {
			assetsInlineLimit: 0,
			cssMinify: "lightningcss",
			target: blist(browserslist),
			rollupOptions: {
				plugins: [],
				output: {
					entryFileNames: "assets/[hash:16].js",
					assetFileNames: "assets/[hash:16][extname]",
				},
			},
		},
	},
	server: {
		host: true,
		open: true,
	},
	integrations: [mdx(), svelte(), tailwind()],
});
