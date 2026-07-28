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
