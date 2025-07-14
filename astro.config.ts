import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import { defineConfig } from 'astro/config';
import { consola } from "consola";
import { PORTS, SITES, SUPPORTED_ENVIRONMENTS } from './config';

const currentEnvironment = process.env.NODE_ENV as typeof SUPPORTED_ENVIRONMENTS[number];

if (!SUPPORTED_ENVIRONMENTS.includes(currentEnvironment)) {
	throw new Error(`Invalid NODE_ENV. Must be one of ${SUPPORTED_ENVIRONMENTS.join(', ')}.`);
}

consola.info(`Running in ${process.env.NODE_ENV} mode.`);

export default defineConfig({
	build: {
		format: "directory",
		assets: "assets"
	},

	integrations: [
		sitemap(),
		compress({
			HTML: true,
			CSS: false,
			JavaScript: false,
			SVG: false,
			Image: false,
			Logger: 0
		})
	],

	prefetch: {
		defaultStrategy: "viewport"
	},

	server({ command }) {
		return {
			host: true,
			port: PORTS[command]
		}
	},

	site: SITES[currentEnvironment],

	trailingSlash: "never",

	vite: {
		plugins: [
			tailwindcss()
		]
	}
});
