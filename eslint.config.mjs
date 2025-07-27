import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import astro from "eslint-plugin-astro";
import { defineConfig, globalIgnores } from "eslint/config";
import typescript from "typescript-eslint";

export default defineConfig([
	globalIgnores(["**/paraglide/*"]),
	eslint.configs.recommended,
	...typescript.configs.recommended,
	...astro.configs["jsx-a11y-recommended"],
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
			"@stylistic/jsx-one-expression-per-line": "off",
			"no-undef": "off"
		}
	}
]);
