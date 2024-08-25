import eslintPluginAstro from "eslint-plugin-astro";

/**
 * @type {import("eslint").Linter.Config}
 */
const config = [
	// add more generic rule sets here, such as:
	// js.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	...eslintPluginAstro.configs["jsx-a11y-strict"],
	{
		files: ["src/**/*.{ts,tsx,astro}"],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			// override/add rules settings here, such as:
			// "astro/no-set-html-directive": "error"
		},
	},
];

export default config;
