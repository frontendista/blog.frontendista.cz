import type { SupportedLocales } from "config";

const formats = {
	cs: new Intl.DateTimeFormat("cs-CZ", {
		weekday: "long",
		day: "numeric",
		month: "long",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Europe/Prague",
		timeZoneName: "short"
	}),
	en: new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		day: "numeric",
		month: "long",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Europe/Prague",
		timeZoneName: "short"
	})
} as const satisfies Record<SupportedLocales, Intl.DateTimeFormat>;

export function formatDate(date: Date, locale: SupportedLocales) {
	return formats[locale].format(date);
}
