/**
 * @type {import("prettier").Config}
 */
export default {
	plugins: ["prettier-plugin-astro"],
	arrowParens: "avoid",
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
