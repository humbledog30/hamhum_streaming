"use client";
import BannerOverlay from "@/components/banner-overlay";
import { Button } from "@/components/ui/button";
import { MovieDetails, MovieDetailsRow, MovieDetailsWithAppend } from "@/types/movie";
import { BadgeHelp, Play, Plus, Share2, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, CircleX, Clapperboard, MessageCircleQuestion, Scissors } from "lucide-react";
import { appToast } from "@/components/app-toast";
import Image from "next/image";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { formatRuntime } from "@/lib/utils/format-time";

import BookmarkButton from "@/components/bookmark-button";

export const buttonIcons: Record<
	string,
	React.ComponentType<{ className?: string; size?: number }>
> = {
	Rumored: MessageCircleQuestion,
	Planned: CalendarPlus,
	"In Production": Clapperboard,
	"Post Production": Scissors,
	Canceled: CircleX,
	Released: Play,
};
export const DEFAULT_STATUS_ICON = BadgeHelp;

const BannerSection = ({ details, onWatch }: { details: MovieDetailsRow; onWatch: () => void }) => {
	const Icon =
		details?.tmdb_status && details?.tmdb_status in buttonIcons
			? buttonIcons[details?.tmdb_status as keyof typeof buttonIcons]
			: DEFAULT_STATUS_ICON;

	return (
		<motion.section
			initial={{ y: 0, opacity: 1 }}
			exit={{ y: "-100%", opacity: 0 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			className="w-full flex flex-col min-h-[80vh] relative overflow-hidden will-change-transform"
			style={{ backfaceVisibility: "hidden" }}
		>
			<div className="w-full flex-1 flex flex-col relative">
				<Image
					className="w-full h-full object-cover absolute z-0 img-brightness-saturate"
					src={`${formatImagePath(details?.backdrop_path)}`}
					alt={`${details.title} Backdrop`}
					fill
					sizes="100vw"
					loading={"eager"}
					placeholder={"blur"}
					blurDataURL={formatImagePath(details?.backdrop_path, "w200")}
				/>
				<BannerOverlay />
				<div className="section-container flex-1 z-20 relative flex flex-col md:flex-row item items-start md:items-end gap-5 md:gap-8 flex-wrap pt-40 md:pt-20 pb-10 bottom-15">
					<div className="relative aspect-2/3 h-50 sm:h-70 md:h-80 lg:h-90">
						<Image
							className="object-cover w-full border rounded-xl border-primary brightness-80"
							src={formatImagePath(details?.poster_path)}
							alt={details?.title ?? "Poster"}
							fill
							sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
							loading={"eager"}
							placeholder={"blur"}
							blurDataURL={formatImagePath(details?.poster_path, "w200")}
						/>
					</div>
					<div className="flex-1 flex-col flex gap-3 ">
						<h1 className="text-5xl md:text-6xl uppercase font-fraunces font-semibold">
							{details.title}
						</h1>
						<div className="flex gap-3 text-xs text-foreground/80 items-center">
							<span className="border bg-background/30 p-0.5 border-foreground/80 px-3 rounded-md font-semibold font-inter">
								{details?.certification ?? "Parental Advisory"}
							</span>
							{details?.release_date ? (
								<span>{details?.release_date.split("-")[0]}</span>
							) : null}
							{details?.runtime ? (
								<span>{formatRuntime(details.runtime)}</span>
							) : null}
							{details?.vote_average ? (
								<span className="flex gap-1 items-center font-medium text-primary dark:text-yellow-400">
									<Star size={14} />
									{details.vote_average.toPrecision(2)}
								</span>
							) : null}
						</div>
						<div className="flex gap-1 flex-wrap">
							{details.genres.map((item, index) => {
								const { genre } = item;
								if (!genre) return null;
								return (
									<span
										className="text-xs border bg-background/30 p-0.5 border-foreground/80 px-3 rounded-2xl opacity-70 font-light"
										key={`genre-${genre.id}`}
									>
										{genre.tmdb_genre_name}
									</span>
								);
							})}
						</div>
						<p className="max-w-full md:max-w-200">{details.overview}</p>
						<div className="flex gap-2 items-center mt-5 flex-wrap">
							<Button
								className=" px-6 primary-btn"
								variant={"default"}
								onClick={
									details?.tmdb_status === "Released"
										? onWatch
										: () => {
												appToast.info(
													`This movie is not yet available because it is currently ${details?.tmdb_status}`,
												);
											}
								}
							>
								<Icon />
								{details?.tmdb_status === "Released"
									? "Watch now"
									: details?.tmdb_status}
							</Button>

							<BookmarkButton movieId={details.id} />
							<Button
								className="bg-background/40 cursor-pointer hover:bg-background/90"
								size={"icon"}
								variant={"outline"}
								onClick={() => {
									appToast.info("Coming soon!");
								}}
							>
								<Share2 />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</motion.section>
	);
};

export default BannerSection;
