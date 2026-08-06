import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createClient } from "../supabase/client";
import {
	getAllTimeGreatMovie,
	getBookMark,
	getMovieDetails,
	getPopularMovies,
	getRelatedMovies,
	getUpcomingReleases,
} from "../services/movie.services";
import { MovieDetailsRow, MovieRelated } from "@/types/movie";
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
export const useRelatedMovies = (movieId: ParamValue) => {
	return useQuery({
		queryKey: ["related-movies", movieId],

		queryFn: async (): Promise<MovieRelated[]> => {
			const supabase = await createClient();
			return getRelatedMovies(supabase, movieId);
		},
		enabled: !!movieId,
	});
};

export const useAllTimeGreatMovie = () => {
	return useQuery({
		queryKey: ["all-time-great"],
		queryFn: async () => {
			const supabase = await createClient();
			return getAllTimeGreatMovie(supabase);
		},
	});
};

export const useBookMarkStatus = (movieId: string | number, userId: string | null) => {
	return useQuery({
		queryKey: [`movie-bookmark-${movieId}`, userId],
		queryFn: async () => {
			const supabase = await createClient();
			return getBookMark(supabase, movieId);
		},
		select(data) {
			return !!data;
		},
	});
};
