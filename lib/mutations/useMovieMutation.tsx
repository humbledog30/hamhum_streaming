import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";
import { appToast } from "@/components/app-toast";
import { deleteBookMark, setBookMark } from "../services/movie.services";

export const useBookMarkSaving = (movieId: string | number, userId: string | null) => {
	const queryClient = useQueryClient();
	return useMutation<null, PostgrestError>({
		mutationFn: async () => {
			const supabase = await createClient();
			return setBookMark(supabase, movieId, userId);
		},
		onSettled(data, error) {
			if (!error) {
				appToast.success("Added to bookmarks.");
				queryClient.invalidateQueries({ queryKey: [`movie-bookmark-${movieId}`, userId] });
				return;
			}
			if (error.code === "23505") {
				appToast.info("Already bookmarked.");
				return;
			}
			appToast.error("Failed to add bookmark. Please try again.");
		},
	});
};
export const useBookMarkDeletion = (movieId: string | number, userId: string | null) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const supabase = await createClient();
			return deleteBookMark(supabase, movieId, userId);
		},
		onSuccess(data) {
			appToast.success("Removed successfully.");
			queryClient.invalidateQueries({ queryKey: [`movie-bookmark-${movieId}`, userId] });
		},
		onError(error) {
			appToast.error("Failed to add bookmark. Please try again.");
		},
	});
};
