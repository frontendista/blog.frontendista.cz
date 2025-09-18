import type { APIRoute } from "astro";
import { ResultAsync } from "neverthrow";
import { object, parseAsync, pipe, string, trim, url } from "valibot";

const schema = object({
	url: pipe(
		string(),
		trim(),
		url()
	)
});

// async function fetchFavicon(url: string) {
// 	try {
// 		const response = await fetch(`https://www.google.com/s2/favicons?domain=example.com&sz=64`, {});

// 		if (!response.ok) {
// 			return err(new Error("Failed to fetch favicon"));
// 		}

// 		ok("test");
// 	}
// 	catch {
// 		return err({ message: "An error occurred while fetching the favicon" });
// 	}
// }

export const GET: APIRoute = async () => {
	const result = await ResultAsync.fromPromise(parseAsync(schema, { url }), e => e);

	if (result.isErr()) {
		return new Response(JSON.stringify({ error: "Invalid URL" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}

	return new Response("OK");
};
