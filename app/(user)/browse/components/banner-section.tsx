import BannerOverlay from "@/components/banner-overlay";
import { Button } from "@/components/ui/button";
import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath";
import { useFormatRuntime } from "@/lib/hooks/useFormatRuntime";
import { MovieDetails, MovieDetailsRow, MovieDetailsWithAppend } from "@/types/movie";
import { Play, Plus, Share2, Star } from "lucide-react";

const BannerSection = ({ details }: { details: MovieDetailsRow }) => {
	return (
		<section className="w-full flex flex-col min-h-[80vh] relative overflow-hidden">
			<div className="w-full flex-1 flex flex-col relative">
				<img
					className="w-full h-full object-cover absolute z-0 object-top"
					src={`${useFormatImagePath(details?.backdrop_path)}`}
					alt={`${details.title} Backdrop`}
				/>
				<BannerOverlay />
				<div className="section-container flex-1 z-20 relative flex item items-end gap-5 md:gap-8 flex-wrap pt-20 pb-10">
					<img
						className="aspect-2/3 h-50 sm:h-70 md:h-80 lg:h-90 object-cover border rounded-xl border-primary"
						src={`${useFormatImagePath(details?.poster_path)}`}
						alt={details.title}
					/>
					<div className="flex-1 flex-col flex gap-3">
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
								<span>{useFormatRuntime(details.runtime)}</span>
							) : null}
							{details?.vote_average ? (
								<span className="flex gap-1 items-center font-medium text-primary dark:text-yellow-400">
									<Star size={14} />
									{details.vote_average.toPrecision(2)}
								</span>
							) : null}
						</div>
						<div className="flex gap-1">
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
							<Button className=" px-6 h-11 primary-btn" variant={"default"}>
								<Play /> Watch Now
							</Button>
							<Button className=" px-6 bg-background/40 h-11" variant={"outline"}>
								<Plus /> Add to list
							</Button>
							<Button
								className="bg-background/40 rounded-full size-11"
								size={"icon"}
								variant={"outline"}
							>
								<Share2 />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BannerSection;
