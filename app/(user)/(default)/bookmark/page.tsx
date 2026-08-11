"use client";
import PageSectionHeader from "@/components/page-section-header";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useUserId } from "@/lib/context/UserContext";
import { useBookMarkDeletion } from "@/lib/mutations/useMovieMutation";
import { createClient } from "@/lib/supabase/client";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { formatRuntime } from "@/lib/utils/format-time";
import { BookmarkMovieRow } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { motion, type Variants } from "framer-motion";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BookmarkCard from "./components/bookmark-card";
import { useBookmarkList } from "@/lib/queries/useMovieQuery";

const Page = ({}) => {
	const userId = useUserId();
	const { data, isLoading } = useBookmarkList(userId);

	if (!data) {
		return null;
	}

	return (
		<div>
			<PageSectionHeader
				tagline="Never Miss a Story"
				title={<span>Your Bookmarks</span>}
				description="Every movie you've saved in one place. Build your personal watchlist and come back whenever you're ready for your next adventure."
			/>

			<div className="section-container py-8 flex flex-col gap-10">
				<div className="flex gap-3 items-center text-lg font-semibold text-muted-foreground font-fraunces uppercase">
					<p className="text-nowrap">
						{data?.length} film{data?.length > 1 ? "s" : null}
					</p>
					<Separator className="flex-1" />
				</div>
				<div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
					{data?.map((bookmarkItem: BookmarkMovieRow) => {
						const { movies: item } = bookmarkItem;
						return <BookmarkCard key={`section-genre-item-${item.id}`} item={item} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default Page;
