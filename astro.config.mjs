import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
	experimental: {
		contentLayer: true,
		contentIntellisense: true,
	},
	integrations: [mdx(), svelte()],
});
