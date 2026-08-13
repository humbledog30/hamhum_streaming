"use client";
import { BrowseGenre } from "@/types/genre";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "../supabase/client";
import { getGenresWithMovies } from "../services/genre.services";

export const useGenreWithMovie = () => {
	return useQuery<BrowseGenre[]>({
		queryKey: ["browse-page"],
		queryFn: async (): Promise<BrowseGenre[]> => {
			const supabase = await createClient();
			return getGenresWithMovies(supabase);
		},
	});
};

export interface GenreCount {
	genre_id: number;
	genre_name: string;
	movie_count: number;
}
export const useGenreCount = () => {
	return useQuery({
		queryKey: ["genre-count"],
		queryFn: async (): Promise<GenreCount[]> => {
			const supabase = await createClient();
			const { data, error } = await supabase.rpc("get_genre_counts").select("*");
			if (error) throw error;
			return data;
		},
	});
};
