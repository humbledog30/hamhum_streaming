import { NextPage } from "next";
import { Button } from "./ui/button";
import { Loader2, Minus, Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { PostgrestError } from "@supabase/supabase-js";
import { useUserId } from "@/lib/context/UserContext";
import { appToast } from "./app-toast";
import { useBookMarkStatus } from "@/lib/queries/useMovieQuery";
import { useBookMarkDeletion, useBookMarkSaving } from "@/lib/mutations/useMovieMutation";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const BookmarkButton = ({
	movieId,
	className,
	iconClassName,
}: {
	movieId: string | number;
	className?: string;
	iconClassName?: string;
}) => {
	const userId = useUserId();

	const { data: bookmarkData, isLoading: isLoadingBookmark } = useBookMarkStatus(movieId, userId);
	const { mutate: mutateSaveBookmark, isPending: isPendingMutateSaving } = useBookMarkSaving(
		movieId,
		userId,
	);
	const { mutate: mutateDeleteBookmark, isPending: isPendingDeleteBookmark } =
		useBookMarkDeletion(movieId, userId);

	const handleBookmark = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		mutateSaveBookmark();
	};

	const handleDeleteBookmark = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		mutateDeleteBookmark();
	};

	const isLoading = isLoadingBookmark || isPendingMutateSaving || isPendingDeleteBookmark;
	if (!!bookmarkData) {
		return (
			<Button
				className={cn("bg-background/40 cursor-pointer", className)}
				variant={"outline"}
				disabled={isLoading}
				onClick={handleDeleteBookmark}
				size={"icon"}
			>
				{isLoading ? (
					<Loader2 className="animate-spin" />
				) : (
					<FaBookmark className={cn("", iconClassName)} />
				)}
			</Button>
		);
	}

	return (
		<Button
			className={cn("bg-background/40 cursor-pointer", className)}
			variant={"outline"}
			disabled={isLoading}
			onClick={handleBookmark}
			size={"icon"}
		>
			{isLoading ? (
				<Loader2 className="animate-spin" />
			) : (
				<FaRegBookmark className={cn("", iconClassName)} />
			)}
		</Button>
	);
};

export default BookmarkButton;
