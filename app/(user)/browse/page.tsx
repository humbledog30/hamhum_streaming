"use client";

import { genreIcons, genreList } from "@/lib/hooks/useGenresLabel";
import { useGenreScrollSpy } from "@/lib/hooks/useGenreScrollSpy";
import { Dot, DotSquare, MoveRight, Slash } from "lucide-react";
import { browseSample } from "./data/sameple";
import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath";
import Link from "next/link";
import { GenreTabs } from "@/components/genre-tabs";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useFormatRuntime } from "@/lib/hooks/useFormatRuntime";

const genreIds = genreList.map((g) => g.id);

interface BrowseGenre {
	id: number;
	genre_id: number;
	movies: {
		id: number;
		poster_path: string;
		release_date: string | null;
		title: string;
		tmdb_id: number;
		runtime: number | null;
	}[];
	tmdb_genre_name: string;
}

const BrowsePage = () => {
	const scrollSpy = useGenreScrollSpy(genreIds);
	const { data, isLoading, error } = useQuery<BrowseGenre[]>({
		queryKey: ["browse-page"],
		queryFn: async (): Promise<BrowseGenre[]> => {
			const supabase = await createClient();
			const { data, error } = await supabase
				.from("genre_movies_ranked")
				.select("*")
				.lte("rn", 10)
				.order("genre_id", { ascending: true })
				.order("release_date", { ascending: false });

			if (error) throw error;
			const grouped = Object.values(
				data.reduce<Record<number, BrowseGenre>>((acc, row) => {
					if (!acc[row.genre_id]) {
						acc[row.genre_id] = {
							id: row.genre_id,
							genre_id: row.tmdb_genre_id,
							tmdb_genre_name: row.tmdb_genre_name,
							movies: [],
						};
					}
					acc[row.genre_id].movies.push({
						id: row.movie_id,
						tmdb_id: row.tmdb_id,
						title: row.title,
						poster_path: row.poster_path,
						release_date: row.release_date,
						runtime: row.runtime,
					});

					return acc;
				}, {}),
			);
			return grouped;
		},
	});
	if (isLoading) {
		return null;
	}
	return (
		<>
			<section className="relative w-full">
				<div className="absolute inset-0 bg-background">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_1200px_800px_at_15%_0%,hsl(var(--primary)/0.30),transparent_60%)]" />
					<div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
				</div>
				<div className="section-container relative z-10 flex flex-col gap-y-4 pt-30 pb-10">
					<span className="flex items-center gap-3 font-semibold tracking-widest uppercase text-muted-foreground">
						<Slash className="rotate-45 text-primary" />
						Browse the library
					</span>

					<h1 className="max-w-200 text-6xl leading-16 font-fraunces font-semibold text-pretty">
						Where <span className="italic text-muted-foreground">every mood</span> finds
						its <span className="italic text-muted-foreground">story</span>.
					</h1>

					<p className="mt-4 max-w-150 text-lg text-muted-foreground">
						Whether you're seeking wonder, suspense, laughter, or longing—every journey
						begins with the right story.
					</p>
				</div>
			</section>

			<GenreTabs scrollSpy={scrollSpy} />

			<section className="section-container py-8 flex flex-col gap-15">
				{data?.map((item) => {
					const Icon = genreIcons[item.genre_id];
					return (
						<div
							key={`section-title-${item.id}`}
							ref={scrollSpy.registerSection(item.id)}
							data-genre-id={item.id}
							className="flex flex-col gap-y-5 scroll-mt-32"
						>
							<div className="flex justify-between items-center gap-5 flex-wrap ">
								<h6 className="section-title flex gap-3 items-center ">
									<Icon />
									{item.tmdb_genre_name}
								</h6>
								<div className="border-b border-foreground/80 flex-1"></div>
								<div className="flex gap-2 ">
									<Link
										href="#"
										className="flex items-center ml-auto gap-2 text-sm opacity-60 hover:opacity-100"
									>
										See all
										<MoveRight size={16} />
									</Link>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
								{item?.movies.map((browseItem) => (
									<Link
										href={`/browse/${browseItem.id}`}
										key={`section-genre-item-${browseItem.id}-${item.id}`}
										className="text-center"
									>
										<div className="border rounded-xl">
											<img
												src={useFormatImagePath(
													browseItem.poster_path,
													"w300",
												)}
												className="rounded-xl"
												alt={`Poster ${browseItem.title}`}
											/>
										</div>
										<p className="font-semibold mt-2 text-balance">
											{browseItem.title}
										</p>
										<p className="flex justify-center text-sm text-muted-foreground items-center">
											{browseItem.release_date ? (
												<span>{browseItem.release_date.split("-")[0]}</span>
											) : null}
											{browseItem?.release_date && browseItem?.runtime ? (
												<Dot />
											) : null}
											{browseItem?.runtime ? (
												<span>{useFormatRuntime(browseItem?.runtime)}</span>
											) : null}
										</p>
									</Link>
								))}
							</div>
						</div>
					);
				})}
			</section>
		</>
	);
};

export default BrowsePage;
