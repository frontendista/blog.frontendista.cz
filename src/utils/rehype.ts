import type { Root } from "hast";
import { visit } from "unist-util-visit";

const HEADING_ELEMENTS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

export function rehypeHeading() {
	return (tree: Root) => {
		visit(tree, "element", (node) => {
			if (HEADING_ELEMENTS.includes(node.tagName as typeof HEADING_ELEMENTS[number])) {
				if (!node.properties) {
					node.properties = {};
				}

				node.properties["as"] = node.tagName;
			}
		});
	};
}
