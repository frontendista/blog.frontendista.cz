import eslintPluginAstro from "eslint-plugin-astro";
import stylistic from "@stylistic/eslint-plugin";

export default [
	...eslintPluginAstro.configs["jsx-a11y-recommended"],
	stylistic.configs.customize({
		flat: true,
		indent: "tab",
		quotes: "double",
		semi: true,
		jsx: true,
		arrowParens: false,
		commaDangle: "never"
	}),
	{
		rules: {
			"@stylistic/jsx-one-expression-per-line": "off"
		}
	}
];
