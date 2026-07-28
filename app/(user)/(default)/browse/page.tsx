"use client";

import { useGenreScrollSpy } from "@/lib/hooks/useGenreScrollSpy";
import { Dot, DotSquare, MoveRight, Slash } from "lucide-react";
import { browseSample } from "./data/sameple";
import Link from "next/link";
import { GenreTabs } from "@/components/genre-tabs";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useMemo } from "react";
import { BrowsePageSkeleton } from "./components/skeleton-loader/browse-page-skeleton";
import Image from "next/image";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { formatRuntime } from "@/lib/utils/format-time";
import { genreIcons } from "@/lib/utils/format-genre";
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
	const { data, isLoading, error } = useQuery<BrowseGenre[]>({
		queryKey: ["browse-page"],
		queryFn: async (): Promise<BrowseGenre[]> => {
			const supabase = await createClient();
			const { data, error } = await supabase.rpc("get_genre_movies_ranked", {
				max_per_genre: 10,
			});

			if (error) throw error;
			return data as BrowseGenre[];
		},
	});

	const genreIds = useMemo(() => data?.map((g) => g.genre_id) ?? [], [data]);
	const scrollSpy = useGenreScrollSpy(genreIds);

	if (isLoading) {
		return <BrowsePageSkeleton />;
	}
	return (
		<div>
			<section className="relative w-full">
				{/* <div className="absolute inset-0 bg-background">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_1200px_800px_at_15%_0%,hsl(var(--primary)/0.30),transparent_60%)]" />
					<div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
				</div> */}
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

			<GenreTabs scrollSpy={scrollSpy} genreIds={genreIds} />

			<section className="section-container py-8 flex flex-col gap-15">
				{data?.map((item) => {
					const Icon = genreIcons[item.genre_id];
					return (
						<div
							key={`section-title-${item.id}`}
							ref={scrollSpy.registerSection(item.genre_id)}
							data-genre-id={item.genre_id}
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
										className="text-center flex flex-col group hover:outline overflow-hidden rounded-md hover:shadow-lg shadow-primary hover:-translate-y-1 transition-all"
									>
										<div className="relative aspect-2/3 border overflow-hidden">
											<Image
												src={formatImagePath(
													browseItem.poster_path,
													"w300",
												)}
												className=" object-cover brightness-[.80] saturate-[.85] group-hover:brightness-100 group-hover:scale-105 transition-all "
												alt={`Poster ${browseItem.title}`}
												fill
												loading="lazy"
												sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
											/>
										</div>
										<div className="text-center flex-1 p-3 text-pretty group-hover:bg-accent/20">
											<p className="font-semibold mt-2 text-balance">
												{browseItem.title}
											</p>
											<p className="flex justify-center text-sm text-muted-foreground items-center">
												{browseItem.release_date ? (
													<span>
														{browseItem.release_date.split("-")[0]}
													</span>
												) : null}
												{browseItem?.release_date && browseItem?.runtime ? (
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
								))}
							</div>
						</div>
					);
				})}
			</section>
		</div>
	);
};

export default BrowsePage;
