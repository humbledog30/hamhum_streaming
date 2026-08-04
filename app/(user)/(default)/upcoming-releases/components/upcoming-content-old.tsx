"use client";
import { appToast } from "@/components/app-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { MovieDetailsRow } from "@/types/movie";
import { Bell, Bookmark, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MovieDetails = Omit<MovieDetailsRow, "movie_credits">;

const groupByReleaseMonth = (movies: MovieDetails[] | null) => {
	const map = new Map();
	if (!movies) {
		return [];
	}
	for (const movie of movies) {
		const key = movie.release_date?.slice(0, 7) ?? "Unknown";
		if (!map.has(key)) map.set(key, []);
		map.get(key).push(movie);
	}

	return Array.from(map.entries())
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([month, movies]) => ({ month, movies }));
};

const UpcomingContent = ({ data }: { data: MovieDetails[] | null }) => {
	const router = useRouter();
	if (!data) {
		return null;
	}
	const grouped = groupByReleaseMonth(data);
	return grouped?.map((item) => {
		const [year, month] = item.month.split("-");
		const label = new Date(year, month - 1).toLocaleString("en-US", {
			month: "long",
			year: "numeric",
		});
		return (
			<div key={label} className="pb-5">
				<div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
					<div className="w-22.5 hidden md:block"></div>
					<div className="flex gap-3 items-center mb-3 text-muted-foreground">
						<span className="text-nowrap">{label}</span>
						<Separator className="flex-1" />
					</div>
				</div>
				{item?.movies.map((movie: MovieDetails, movieIndex: number) => {
					const genres =
						movie?.genres.flatMap((item) => item.genre?.tmdb_genre_name) ?? [];
					let date = "";
					let shortDay = "";
					let shortWeekday = "";
					if (movie?.release_date) {
						date = new Date(movie?.release_date).toLocaleString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric",
						});
						shortDay = new Date(movie?.release_date).toLocaleString("en-US", {
							day: "2-digit",
						});
						shortWeekday = new Date(movie?.release_date).toLocaleString("en-US", {
							weekday: "short",
						});
					}
					const poster = formatImagePath(movie?.poster_path ?? "");
					const backdrop = formatImagePath(movie?.backdrop_path ?? "");
					return (
						<div key={movie.id} className="grid rid-cols-1 md:grid-cols-[auto_1fr] ">
							<div className="hidden md:flex justify-end pr-10 gap-5">
								{shortDay && shortWeekday ? (
									<div className="self-center flex flex-col items-center">
										<span className="text-xl font-fraunces font-semibold">
											{shortDay}
										</span>
										<span className="text-muted-foreground text-xs font-semibold uppercase -mt-1">
											{shortWeekday}
										</span>
									</div>
								) : null}
								<div className="w-px h-full bg-muted-foreground/20 relative">
									<div className="size-4 rounded-full bg-primary absolute left-1/2 top-1/2 -translate-1/2" />
								</div>
							</div>
							<div
								className={cn(
									"flex flex-col sm:flex-row relative overflow-hidden rounded-md border border-primary/50 hover:border-primary transition-all",
									movieIndex !== item?.movies.length - 1 && "mb-5",
								)}
							>
								<div className="relative aspect-2/3 hidden sm:block w-30 shrink-0 overflow-hidden">
									<Image
										src={poster}
										alt={movie.title}
										fill
										sizes="96px"
										className="object-cover object-center brightness-[.80] saturate-[.85] group-hover:brightness-100 group-hover:scale-105 transition-all"
										loading="lazy"
									/>
								</div>
								<div className="relative aspect-video block sm:hidden w-full shrink-0 overflow-hidden">
									<Image
										src={backdrop}
										alt={movie.title}
										fill
										sizes="100vw"
										className="object-cover object-center"
										loading="lazy"
									/>
								</div>
								<div className="relative z-20 p-5 flex justify-center items-baseline flex-col">
									<p className="font-fraunces text-xl font-semibold">
										{movie.title}
									</p>
									<div className="text-sm text-muted-foreground">
										{date ? <p>Release date: {date}</p> : null}
										{genres ? <p>Genre: {genres.join(", ")}</p> : null}
									</div>
									<div className="flex items-center gap-2 mt-7">
										<Button
											onClick={() => router.push(`/browse/movie/${movie.id}`)}
											variant={"outline"}
										>
											View Info
										</Button>
										<Button
											className="text"
											size={"icon"}
											variant={"outline"}
											onClick={() => {
												appToast.info(
													"Not available yet — check back soon!",
												);
											}}
										>
											<Bell />
										</Button>
										<Button
											className="text"
											size={"icon"}
											variant={"outline"}
											onClick={() => {
												appToast.info(
													"Not available yet — check back soon!",
												);
											}}
										>
											<Bookmark />
										</Button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	});
};

export default UpcomingContent;
