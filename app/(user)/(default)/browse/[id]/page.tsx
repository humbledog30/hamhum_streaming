"use client";
import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath";
import { useFormatRuntime } from "@/lib/hooks/useFormatRuntime";
import { MovieDetailsRow } from "@/types/movie";
import { Star } from "lucide-react";
import { ExpandableWrapper } from "@/components/ExpandableSection";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import BannerSection from "../components/banner-section";
import OtherDetails from "../components/other-details";
import Details from "../components/details";
import MovieInfoPageSkeleton from "../components/skeleton-loader/movie-info-page-skeleton";
import TitleNotFound from "../components/title-not-found";
import { useState } from "react";
import PlayerProvider, { videoSource, VideoSourceProps } from "@/components/player-provider";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ServerChoices from "../components/server-choices";
import NowShowing from "../components/now-showing";

const InfoPage = () => {
	const params = useParams();
	const [isWatching, setIsWatching] = useState(false);
	const [activeServer, setActiveServer] = useState<VideoSourceProps>(videoSource[0]);

	const movieId = params.id;
	const {
		data: movieFullDetails,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["movie-details", movieId],
		queryFn: async (): Promise<MovieDetailsRow> => {
			const supabase = await createClient();
			const { data, error } = await supabase
				.from("movies")
				.select(
					`
					*,
					genres:movie_genres(genre:genres(id, tmdb_genre_name)),
					movie_credits(
						role,
						job,
						person:people(tmdb_person_id, name, profile_path)
					)
				`,
				)
				.eq("id", movieId)
				.single();
			if (error) throw error;
			return data;
		},
	});

	if (isLoading) return <MovieInfoPageSkeleton />;
	if (!isLoading && !movieFullDetails) {
		return <TitleNotFound />;
	}

	const movieCredits =
		movieFullDetails?.movie_credits
			.map((item) => {
				if (!item.person || !item.role) return null;
				return {
					...item,
					name: item.person.name ?? null,
					id: item.person.tmdb_person_id,
					profile_path: item.person.profile_path ?? null,
					role: item.role,
				};
			})
			.filter((item): item is NonNullable<typeof item> => item !== null) ?? [];

	const cast = movieCredits.filter((cast) => cast.role === "cast");
	const director = movieCredits.filter((cast) => cast.role === "director");
	const writer = movieCredits.filter((cast) => cast.role === "writer");
	const directorAndWriter = [...director, ...writer];
	const genres =
		movieFullDetails?.genres
			.map((item) => {
				const { genre } = item;
				if (!genre) return null;
				return {
					id: genre.id,
					name: genre.tmdb_genre_name,
				};
			})
			.filter((item): item is NonNullable<typeof item> => item !== null) ?? [];
	console.log(movieFullDetails?.runtime);
	return (
		<div className="w-full flex flex-col">
			{movieFullDetails ? (
				<motion.div layout className="relative w-full">
					<AnimatePresence initial={false} mode={"popLayout"}>
						{!isWatching ? (
							<motion.div
								key="banner"
								initial={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: "-100%" }}
								transition={{ duration: 0.5, ease: "backInOut" }}
							>
								<BannerSection
									details={movieFullDetails}
									onWatch={() => setIsWatching(true)}
								/>
							</motion.div>
						) : (
							<motion.div
								key="player"
								initial={{ opacity: 0, y: "-100%" }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: "-100%" }}
								transition={{ duration: 0.5, ease: "linear" }}
							>
								<PlayerProvider
									details={movieFullDetails}
									activeServer={activeServer}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			) : null}

			<AnimatePresence>
				{isWatching ? (
					<motion.div
						key="watching-info"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						transition={{ duration: 0.5, ease: "easeInOut" }}
					>
						<div className="section-container">
							<NowShowing
								movieDetails={movieFullDetails}
								onWatch={() => setIsWatching(false)}
							/>
							<ServerChoices
								activeServer={activeServer}
								setActiveServer={setActiveServer}
							/>
						</div>

						<Separator className="my-8" />
					</motion.div>
				) : null}
			</AnimatePresence>
			<div className="section-container flex flex-col gap-10">
				<div>
					<div className="flex items-center gap-5 mb-5">
						<h6 className="section-title text-nowrap flex items-center gap-3">
							Details
						</h6>
						<div className=" border-b border-foreground/80 w-full" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-10">
						<div className="col-span-2 flex flex-col gap-3 justify-center">
							<Details data={cast} label="Cast" />
							<Details data={director} label="Director" />
							<Details data={writer} label="Writers" />
							<Details data={genres} label="Genres" />
						</div>
						<div className="col-span-1 flex flex-col gap-3 h-fit p-5 px-7 bg-chart-5/40 rounded-2xl">
							<OtherDetails
								data={
									movieFullDetails?.vote_average ? (
										<>
											<Star size={16} />
											{movieFullDetails.vote_average.toPrecision(2)}/10
										</>
									) : (
										<>N/A</>
									)
								}
								label="Audience Score"
								className="text-yellow-400"
							/>
							<OtherDetails
								data={
									movieFullDetails?.release_date ? (
										movieFullDetails?.release_date.split("-")[0]
									) : (
										<>N/A</>
									)
								}
								label="Release Year"
							/>
							<OtherDetails
								data={
									movieFullDetails?.runtime ? (
										useFormatRuntime(movieFullDetails?.runtime)
									) : (
										<>N/A</>
									)
								}
								label="Runtime"
							/>
							<OtherDetails
								data={movieFullDetails?.certification ?? "N/A"}
								label="Rating"
							/>
						</div>
					</div>
				</div>
				<div>
					<div className="flex items-center gap-5 mb-5">
						<h6 className="section-title text-nowrap flex items-center gap-3">
							Cast & Crew
						</h6>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-10 ">
						<div className="col-span-2">
							<ExpandableWrapper>
								<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
									{cast.map((item, index) => {
										const castProfile = useFormatImagePath(item?.profile_path);
										return (
											<div
												key={`cast-profile-${index}`}
												className="shrink-0 text-center  "
											>
												<img
													className="w-full aspect-square rounded-full object-cover mx-auto mb-2 opacity-80 border-2 border-primary"
													src={castProfile}
													alt={item.name}
												/>

												<p className="font-semibold text-base">
													{item?.name}
												</p>
												<span className="text-foreground/50">
													{item?.job}
												</span>
											</div>
										);
									})}
									{directorAndWriter.map((item, index) => {
										const castProfile = useFormatImagePath(item?.profile_path);
										return (
											<div
												key={`cast-profile-${index}`}
												className="shrink-0 text-center "
											>
												<img
													className="w-full aspect-square rounded-full object-cover mx-auto mb-2 opacity-80 border-2 border-primary"
													src={castProfile}
													alt={item.name}
												/>
												<p className="font-semibold text-base">
													{item?.name}
												</p>
												<span className="text-foreground/50">
													{item?.job}
												</span>
											</div>
										);
									})}
								</div>
							</ExpandableWrapper>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoPage;
