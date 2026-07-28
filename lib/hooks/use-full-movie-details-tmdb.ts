import { apiTmdbClient } from "@/lib/api-client";
import {
	rollbackMovie,
	saveCredits,
	saveGenres,
	saveMovie,
	savePeople,
} from "@/lib/services/movie.services";
import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mapCredits } from "../utils/format-movie-data";

export const useFullMovieDetailsTmdb = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			movieid,
			publishStatus,
		}: {
			movieid: number;
			publishStatus: string;
		}) => {
			const response = await apiTmdbClient
				.get(`/movie/${movieid}?append_to_response=credits,release_dates`)
				.then((res) => res.data);

			if (!response) {
				return { status: false, message: "Failed to fetch full movie details!" };
			}

			const supabase = await createClient();
			const responseWithStatus = { ...response };
			const movieResult = await saveMovie(supabase, response, publishStatus);
			if (!movieResult.status) return movieResult;

			const { id: movieUuid, wasInserted } = movieResult.data;

			const rollbackIfNeeded = async () => {
				if (wasInserted) await rollbackMovie(supabase, movieUuid);
			};

			const genresResult = await saveGenres(supabase, movieUuid, responseWithStatus.genres);
			if (!genresResult.status) {
				await rollbackIfNeeded();
				return genresResult;
			}

			const { people, credits } = mapCredits(responseWithStatus.credits, movieUuid);

			const peopleResult = await savePeople(supabase, people);
			if (!peopleResult.status) {
				await rollbackIfNeeded();
				return peopleResult;
			}

			const creditsResult = await saveCredits(supabase, credits);
			if (!creditsResult.status) {
				await rollbackIfNeeded();
				return creditsResult;
			}

			return { status: true, message: "Title added successfully!" };
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
	});
};
