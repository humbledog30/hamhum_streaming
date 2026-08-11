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
import { motion } from "framer-motion";
import UpcomingContentEmpty from "./upcoming-content-empty";
import BookmarkButton from "@/components/bookmark-button";
type MovieDetails = Omit<MovieDetailsRow, "movie_credits">;

const UpcomingContent = ({ data }: { data: MovieDetails[] | null | undefined }) => {
	const router = useRouter();

	if (!data) {
		return <UpcomingContentEmpty />;
	}

	return (
		<div className="section-container">
			{data?.map((movie: MovieDetails, movieIndex: number) => {
				const genres = movie?.genres.flatMap((item) => item.genre?.tmdb_genre_name) ?? [];

				let shortMonth = "";
				let shortDay = "";
				if (movie?.release_date) {
					shortMonth = new Date(movie?.release_date).toLocaleString("en-US", {
						month: "short",
					});
					shortDay = new Date(movie?.release_date).toLocaleString("en-US", {
						day: "2-digit",
					});
				}
				const poster = formatImagePath(movie?.poster_path ?? "");
				const backdrop = formatImagePath(movie?.backdrop_path ?? "");
				return (
					<div key={movie.id} className="grid rid-cols-1 md:grid-cols-[100px_1fr] ">
						<div className="hidden md:flex justify-end pr-10 gap-5">
							{shortMonth && shortDay ? (
								<div className="flex flex-col items-center mt-5 text-muted-foreground/40 uppercase">
									<span className="">{shortMonth}</span>
									<span className="text-muted-foreground/50 font-fraunces font-semibold uppercase text-3xl -mt-1">
										{shortDay}
									</span>
								</div>
							) : null}
							<div className="w-px h-full bg-muted-foreground/20 relative">
								<div className="size-3 rounded-full bg-primary outline-4 outline-background absolute left-1/2 top-10 -translate-x-1/2 ring-5 ring-primary z-10" />
								<div className="size-3 rounded-full bg-primary outline-10 outline-background absolute left-1/2 top-10 -translate-x-1/2" />
							</div>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 1, ease: "easeOut" }}
							className={cn(
								"flex flex-col sm:flex-row min-h-90 relative overflow-hidden rounded-md",
								movieIndex !== data?.length - 1 && "mb-5",
							)}
						>
							<div className="bg-linear-to-t md:bg-linear-to-r from-background to-transparent absolute left-0 bottom-0 h-full w-full z-10" />
							<div className="absolute left-0 bottom-0 w-full h-full">
								<div className="relative h-full block w-full shrink-0 ">
									<Image
										src={backdrop}
										alt={movie.title}
										fill
										sizes="100vw"
										className="object-cover object-center"
										loading="lazy"
										blurDataURL={formatImagePath(
											movie?.backdrop_path ?? "",
											"w200",
										)}
										placeholder={"blur"}
									/>
								</div>
							</div>

							<div className="relative z-20 p-10 pt-30 flex justify-end items-baseline flex-col">
								<div className="text-sm text-muted-foreground font-jetbrains-mono mb-1">
									{genres ? <p>Genre: {genres.join(", ")}</p> : null}
								</div>
								<p className="font-fraunces text-4xl max-w-150 uppercase font-semibold">
									{movie.title}
								</p>
								<div className="max-w-130 text-pretty text-muted-foreground mt-5">
									<p>{movie.overview}</p>
								</div>
								<div className="flex items-center gap-2 mt-7 mb-1">
									<Button
										onClick={() => router.push(`/browse/movie/${movie.id}`)}
										variant={"outline"}
									>
										View Info
									</Button>
									<Button
										size={"icon"}
										variant={"outline"}
										onClick={() =>
											appToast.info("Not available yet — check back soon!")
										}
									>
										<Bell />
									</Button>
									<BookmarkButton movieId={movie.id} />
								</div>
							</div>
						</motion.div>
					</div>
				);
			})}
		</div>
	);
};

export default UpcomingContent;
