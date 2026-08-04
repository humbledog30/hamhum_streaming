"use client";
import { useState } from "react";
import PageSectionHeader from "@/components/page-section-header";
import { createClient } from "@/lib/supabase/client";
import { genreList } from "@/lib/utils/format-genre";
import { useInfiniteQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Dot, Loader2 } from "lucide-react";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { formatRuntime } from "@/lib/utils/format-time";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const gridVariants: Variants = {
	hidden: {},
	visible: {},
};

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			delay: index * 0.08,
			ease: "easeOut",
		},
	}),
};

type SortOption = "popularity" | "year_desc" | "year_asc";
type DecadeOption = "all" | "2020s" | "2010s" | "2000s" | "1990s" | "1980s" | "older";
type RatingOption = "all" | "9" | "8" | "7" | "6";

const sortOptions: { value: SortOption; label: string }[] = [
	{ value: "popularity", label: "Most Popular" },
	{ value: "year_desc", label: "Year: Newest" },
	{ value: "year_asc", label: "Year: Oldest" },
];

const decadeOptions: { value: DecadeOption; label: string }[] = [
	{ value: "all", label: "All Years" },
	{ value: "2020s", label: "2020s" },
	{ value: "2010s", label: "2010s" },
	{ value: "2000s", label: "2000s" },
	{ value: "1990s", label: "1990s" },
	{ value: "1980s", label: "1980s" },
	{ value: "older", label: "Before 1980" },
];

const ratingOptions: { value: RatingOption; label: string }[] = [
	{ value: "all", label: "Any Rating" },
	{ value: "9", label: "9+ ⭐" },
	{ value: "8", label: "8+ ⭐" },
	{ value: "7", label: "7+ ⭐" },
	{ value: "6", label: "6+ ⭐" },
];

// Maps a decade option to a [start, end) date range for filtering
const getDecadeRange = (decade: DecadeOption): [string, string] | null => {
	switch (decade) {
		case "2020s":
			return ["2020-01-01", "2030-01-01"];
		case "2010s":
			return ["2010-01-01", "2020-01-01"];
		case "2000s":
			return ["2000-01-01", "2010-01-01"];
		case "1990s":
			return ["1990-01-01", "2000-01-01"];
		case "1980s":
			return ["1980-01-01", "1990-01-01"];
		case "older":
			return ["1900-01-01", "1980-01-01"];
		default:
			return null;
	}
};

const MovieCardSkeleton = () => (
	<div className="flex flex-col overflow-hidden rounded-md">
		<Skeleton className="relative aspect-2/3 w-full rounded-md" />
		<div className="p-3 pt-2 space-y-2">
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-3 w-1/2" />
		</div>
	</div>
);

const SkeletonGrid = ({ count }: { count: number }) => (
	<div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
		{Array.from({ length: count }).map((_, index) => (
			<MovieCardSkeleton key={`skeleton-${index}`} />
		))}
	</div>
);

const GenrePage = ({ genreId }: { genreId: string }) => {
	const genre = genreList.find((item) => item.id === Number(genreId));
	if (!genre) {
		return notFound();
	}

	const PAGE_SIZE = 12;
	const [sortBy, setSortBy] = useState<SortOption>("popularity");
	const [decade, setDecade] = useState<DecadeOption>("all");
	const [minRating, setMinRating] = useState<RatingOption>("all");

	const {
		data: genreMovies,
		isLoading: isLoadingGenreMovies,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["genre-specific", genreId, sortBy, decade, minRating],
		queryFn: async ({ pageParam = 0 }) => {
			const supabase = await createClient();
			const from = pageParam * PAGE_SIZE;
			const to = from + PAGE_SIZE - 1;

			let query = supabase
				.from("movies")
				.select(
					`
					*,
					movie_genres!inner(
						genre_id,
						genres(id, tmdb_genre_name)
					)
					`,
				)
				.eq("movie_genres.genre_id", genreId);

			const decadeRange = getDecadeRange(decade);
			if (decadeRange) {
				query = query
					.gte("release_date", decadeRange[0])
					.lt("release_date", decadeRange[1]);
			}

			if (minRating !== "all") {
				query = query.gte("vote_average", Number(minRating));
			}

			if (sortBy === "year_desc") {
				query = query
					.order("release_date", { ascending: false, nullsFirst: false })
					.order("id", { ascending: true });
			} else if (sortBy === "year_asc") {
				query = query
					.order("release_date", { ascending: true, nullsFirst: false })
					.order("id", { ascending: true });
			} else {
				query = query
					.order("popularity", { ascending: false })
					.order("id", { ascending: true });
			}

			const { data, error } = await query.range(from, to);

			if (error) throw error;
			return data;
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length === PAGE_SIZE ? allPages.length : undefined;
		},
	});

	const data = genreMovies?.pages.flat() ?? [];

	return (
		<div>
			<PageSectionHeader
				tagline="Genre"
				title={<span>{genre.name}</span>}
				description={genre.description}
				backgroundTitle={genre.name}
			/>
			<Separator className="mb-10" />
			<div className="section-container">
				<div className="flex flex-col sm:flex-row gap-3 sm:justify-end mb-5">
					<Select
						value={decade}
						onValueChange={(value) => setDecade(value as DecadeOption)}
					>
						<SelectTrigger className="w-full sm:w-40">
							<SelectValue placeholder="Year" />
						</SelectTrigger>
						<SelectContent>
							{decadeOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select
						value={minRating}
						onValueChange={(value) => setMinRating(value as RatingOption)}
					>
						<SelectTrigger className="w-full sm:w-40">
							<SelectValue placeholder="Rating" />
						</SelectTrigger>
						<SelectContent>
							{ratingOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select
						value={sortBy}
						onValueChange={(value) => setSortBy(value as SortOption)}
					>
						<SelectTrigger className="w-full sm:w-40">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							{sortOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{isLoadingGenreMovies ? (
					<SkeletonGrid count={PAGE_SIZE} />
				) : data.length === 0 ? (
					<p className="text-center text-muted-foreground py-10">
						No movies found matching these filters.
					</p>
				) : (
					<>
						<motion.div
							className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
							initial="hidden"
							animate="visible"
							variants={gridVariants}
						>
							{data.map((browseItem, index) => {
								const batchIndex = index % PAGE_SIZE;

								return (
									<motion.div
										key={`section-genre-item-${browseItem.id}`}
										custom={batchIndex}
										initial="hidden"
										animate="visible"
										variants={cardVariants}
										whileHover={{ y: -6, scale: 1.02 }}
										transition={{
											type: "spring",
											stiffness: 300,
											damping: 20,
										}}
									>
										<Link
											href={`/browse/movie/${browseItem.id}`}
											className="text-center flex flex-col group overflow-hidden rounded-md hover:shadow-lg shadow-primary transition-all"
										>
											<div className="relative aspect-2/3">
												<Image
													src={formatImagePath(
														browseItem.poster_path,
														"w300",
													)}
													className="object-cover saturate-[.85] transition-all"
													alt={`Poster ${browseItem.title}`}
													fill
													loading="lazy"
													sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
												/>
												<div className="absolute -bottom-1 left-0 w-full h-full bg-linear-to-t from-background to-transparent" />
												<div className="absolute bottom-0 left-0 p-3 text-left ">
													<p className="font-semibold mt-2 text-balance">
														{browseItem.title}
													</p>
												</div>
											</div>
											<div className="text-center flex-1 p-3 pt-0 text-pretty ">
												<p className="flex text-sm text-muted-foreground items-center">
													{browseItem.release_date ? (
														<span>
															{browseItem.release_date.split("-")[0]}
														</span>
													) : null}
													{browseItem?.release_date &&
													browseItem?.runtime ? (
														<Dot />
													) : null}
													{browseItem?.runtime ? (
														<span>
															{formatRuntime(browseItem?.runtime)}
														</span>
													) : null}
												</p>
											</div>
										</Link>
									</motion.div>
								);
							})}
						</motion.div>

						{isFetchingNextPage ? (
							<div className="mt-5">
								<SkeletonGrid count={PAGE_SIZE} />
							</div>
						) : hasNextPage ? (
							<div className="flex justify-center mt-8">
								<Button onClick={() => fetchNextPage()} variant="outline">
									Load More
								</Button>
							</div>
						) : null}
					</>
				)}
			</div>
		</div>
	);
};

export default GenrePage;
