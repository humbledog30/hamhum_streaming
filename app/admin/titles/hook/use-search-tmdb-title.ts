import { apiTmdbClient } from "@/lib/api-client";
import { Movie } from "@/types/movie";
import { TMDBListResponse } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";

export const useSearchTmdbTitle = (query: string) => {
	return useQuery({
		queryKey: ["title-search", query],
		queryFn: async (): Promise<TMDBListResponse<Movie>> => {
			const params = { query, include_adult: false, language: "en-US", page: 1 };
			const response = await apiTmdbClient.get("/search/movie", { params });
			return response.data;
		},
		enabled: query.length > 0,
	});
};
