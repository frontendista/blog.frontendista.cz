export const SUPPORTED_ENVIRONMENTS = ["production", "staging", "preview", "development"] as const;

export const PORTS: Record<"dev" | "preview", number> = {
	dev: 8123,
	preview: 8124
};

export const SITES: Record<typeof SUPPORTED_ENVIRONMENTS[number], string> = {
	development: `http://localhost:${PORTS.dev}`,
	preview: `http://localhost:${PORTS.preview}`,
	staging: "https://staging.example.com",
	production: "https://example.com"
};

export type SupportedLocales = "en" | "cs";

export const defaultLocale = "cs";
export const locales = ["en", "cs"] as const satisfies SupportedLocales[];
export const localesCodes: Record<SupportedLocales, string> = {
	en: "en-US",
	cs: "cs-CZ"
};
