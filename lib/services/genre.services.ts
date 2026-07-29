import { BrowseGenre } from "@/types/genre";
import type { SupabaseClient } from "@supabase/supabase-js";

export const getGenresWithMovies = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.rpc("get_genre_movies_ranked", {
		max_per_genre: 6,
	});

	if (error) throw error;
	return data as BrowseGenre[];
};
