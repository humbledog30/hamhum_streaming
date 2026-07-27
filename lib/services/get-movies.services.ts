import { useQuery } from "@tanstack/react-query";
import { createClient } from "../supabase/client";
import { MovieDetailsRow } from "@/types/movie";

export const useGetMovies = () => {
    return useQuery({
        queryKey: ["movies"],
        queryFn: async () : Promise<MovieDetailsRow[]> => {
            return await movies()
        }
    })
}

export const movies = async (): Promise<MovieDetailsRow[]> => {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("movies")
        .select(`*,genres:movie_genres(genre:genres(id, tmdb_genre_name))`);

    if (error) throw error;

    return data;
}