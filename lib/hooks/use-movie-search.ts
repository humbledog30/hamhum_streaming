"use client";

import { useEffect, useRef, useState } from "react";
import { searchClient, insightsClient } from "@/lib/algolia";

export type MovieHit = {
	objectID: string;
	id: string | number;
	title: string;
	poster_path?: string;
	overview?: string;
	_highlightResult?: Record<string, { value: string }>;
	_snippetResult?: Record<string, { value: string }>;
	__queryID?: string;
	__position?: number;
};

export function useMovieSearch(query: string, delay = 400) {
	const [hits, setHits] = useState<MovieHit[]>([]);
	const [loading, setLoading] = useState(false);
	const requestId = useRef(0);

	useEffect(() => {
		if (!query) {
			setHits([]);
			setLoading(false);
			return;
		}

		setLoading(true);
		const currentRequest = ++requestId.current;
		const timeout = setTimeout(async () => {
			const { results } = await searchClient.search([
				{
					indexName: "Movies",
					params: {
						query,
						hitsPerPage: 8,
						analytics: true,
						clickAnalytics: true,
						highlightPreTag: "<mark>",
						highlightPostTag: "</mark>",
						attributesToSnippet: ["title:10", "overview:35"],
						snippetEllipsisText: "…",
					},
				},
			]);

			if (currentRequest !== requestId.current) return;

			const result = results[0] as any;
			const rawHits: MovieHit[] = result?.hits ?? [];
			const queryID: string | undefined = result?.queryID;

			const hitsWithMeta: MovieHit[] = rawHits.map((hit, index) => ({
				...hit,
				__queryID: queryID,
				__position: index + 1,
			}));

			setHits(hitsWithMeta);
			setLoading(false);
			console.log(hitsWithMeta);
			if (hitsWithMeta.length > 0) {
				console.log("inside insight");
				insightsClient("viewedObjectIDs", {
					index: "Movies",
					eventName: "Movie Results Viewed",
					objectIDs: hitsWithMeta.map((h) => h.objectID),
				});
			}
		}, delay);

		return () => clearTimeout(timeout);
	}, [query, delay]);

	return { hits, loading };
}
