"use client";

import { useEffect, useRef } from "react";
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import { searchClient } from "@/lib/algolia";
import "@algolia/autocomplete-theme-classic/dist/theme.css";
import "./../app/autocomplete-theme.css";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { useRouter } from "next/navigation";

type Props = {
	placeholder?: string;
};

export default function Autocomplete({ placeholder = "Search for movies" }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const search = autocomplete({
			container: containerRef.current,
			placeholder,
			insights: true,
			classNames: {
				form: "flex-1 flex items-center",
				input: "flex-1 bg-transparent py-2 text-sm text-foreground outline-none",
				panel: "rounded-lg border border-border bg-popover shadow-md overflow-hidden",
				list: "max-h-80 overflow-y-auto",
			},

			getSources({ query }) {
				if (!query) return [];
				return [
					{
						sourceId: "movies",
						getItemUrl({ item }) {
							return `/browse/movie/${item.id}`;
						},
						getItems() {
							return getAlgoliaResults({
								searchClient,
								queries: [
									{
										indexName: "Movies",
										params: {
											query,
											hitsPerPage: 5,
											attributesToSnippet: ["title:10", "overview:35"],
											snippetEllipsisText: "…",
										},
									},
								],
							});
						},
						templates: {
							item({ item, components, html }) {
								const imgSrc = formatImagePath(
									typeof item?.poster_path === "string" ? item.poster_path : "",
								);
								return html`<div class="aa-ItemWrapper">
									<a href=${`/browse/movie/${item.id}`} class="aa-ItemContent">
										<div class="aa-ItemIcon aa-ItemIcon--alignTop">
											<img src="${imgSrc}" alt="${item.title}" />
										</div>
										<div class="aa-ItemContentBody">
											<div class="aa-ItemContentTitle">
												${components.Highlight({
													hit: item,
													attribute: "title",
												})}
											</div>
											<div class="aa-ItemContentDescription">
												${components.Snippet({
													hit: item,
													attribute: "overview",
												})}
											</div>
										</div>
									</a>
								</div>`;
							},
						},
					},
				];
			},
		});

		return () => {
			search.destroy();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div ref={containerRef} className="flex-1" />;
}
