"use client";
import { useEffect, useRef, useState } from "react";
import { searchClient, insightsClient } from "@/lib/algolia";

export type MovieHit = {
	objectID: string;
	id: string | number;
	title: string;
	poster_path?: string;
	backdrop_path?: string;
	overview?: string;
	release_date?: string;
	runtime?: number;
	certification?: string;
	_highlightResult?: Record<string, { value: string }>;
	_snippetResult?: Record<string, { value: string }>;
	_rankingInfo?: {
		nbTypos: number;
		firstMatchedWord: number;
		proximityDistance: number;
		userScore: number;
		geoDistance: number;
		nbExactWords: number;
		words: number;
		filters: number;
	};
	__queryID?: string;
	__position?: number;
};

type UseMovieSearchOptions = {
	delay?: number;
	hitsPerPage?: number;
	highlight?: boolean;
};

export function useMovieSearch(
	query: string,
	{ delay = 400, hitsPerPage = 8, highlight = true }: UseMovieSearchOptions = {},
) {
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
						hitsPerPage,
						analytics: true,
						clickAnalytics: true,
						getRankingInfo: true,
						attributesToSnippet: ["title:10", "overview:35"],
						snippetEllipsisText: "…",
						restrictSearchableAttributes: ["title", "original_title"],
						...(highlight
							? { highlightPreTag: "<mark>", highlightPostTag: "</mark>" }
							: { highlightPreTag: "", highlightPostTag: "" }),
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
			if (hitsWithMeta.length > 0) {
				insightsClient("viewedObjectIDs", {
					index: "Movies",
					eventName: "Movie Results Viewed",
					objectIDs: hitsWithMeta.map((h) => h.objectID),
				});
			}
		}, delay);
		return () => clearTimeout(timeout);
	}, [query, delay, hitsPerPage, highlight]);

	return { hits, loading };
}
