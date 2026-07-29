import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createClient } from "../supabase/client";
import { getMovieDetails, getPopularMovies, getUpcomingReleases } from "../services/movie.services";
import { MovieDetailsRow } from "@/types/movie";
import { ParamValue } from "next/dist/server/request/params";

export const useUpcomingRelease = () => {
	return useQuery({
		queryKey: ["upcoming-releases"],
		queryFn: async () => {
			const supabase = await createClient();
			return getUpcomingReleases(supabase);
		},
	});
};

export const usePopularMovie = () => {
	return useQuery({
		queryKey: ["popular-movies"],
		queryFn: async () => {
			const supabase = createClient();
			return getPopularMovies(supabase);
		},
	});
};

export const useMovieDetails = (movieId: ParamValue) => {
	return useSuspenseQuery({
		queryKey: ["movie-details", movieId],
		queryFn: async (): Promise<MovieDetailsRow> => {
			const supabase = await createClient();
			return getMovieDetails(supabase, movieId);
		},
	});
};
