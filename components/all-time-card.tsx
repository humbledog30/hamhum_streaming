import { formatImagePath } from "@/lib/utils/format-image-path";
import { MovieDetailsRowNoMovieCredits } from "@/types/movie";
import { AllTimeGreatCardSkeleton } from "./skeleton-loader/homepage-skeleton";
import Image from "next/image";
import Link from "next/link";
import { PlayCircleIcon } from "lucide-react";

type MovieDetailsRowWithScore = Omit<MovieDetailsRowNoMovieCredits, "movie_credits" | "genres"> & {
	weighted_score: number;
	genres: { id: string; tmdb_genre_name: string }[];
};
const AllTimeCard = ({
	data,
	isLoading,
}: {
	data: MovieDetailsRowWithScore[] | null | undefined;
	isLoading: boolean;
}) => {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 gap-6 gap-x-16 lg:grid-cols-2">
				{Array.from({ length: 10 }).map((_, index) => (
					<AllTimeGreatCardSkeleton key={index} />
				))}
			</div>
		);
	}
	if (!data) {
		return null;
	}
	const alltimeGreat = data.slice(0, 8);
	return (
		<div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 gap-x-16">
			{alltimeGreat.map((item: MovieDetailsRowWithScore, index: number) => {
				const imageSrc = formatImagePath(item.poster_path ?? "");
				return (
					<div
						key={`all-time-great${item.id}`}
						className="flex items-center pl-8 relative border-b border-foreground/20 pb-5"
					>
						<span className="absolute -z-1 text-stroke font-bold text-7xl left-0 font-fraunces text-s opacity-40">
							{index + 1}
						</span>
						<div className="relative w-25 aspect-2/3 overflow-hidden rounded-md shrink-0 group">
							<div className=" lg:hidden bg-linear-to-b from-background/80 to-transparent absolute h-full w-full top-0 left-0 z-10" />

							<Link
								href={`/browse/${item.id}`}
								className="group-hover:opacity-100 transition-all absolute w-full h-full text-accent dark:text-muted-foreground top-0 left-0 z-30 flex justify-center items-center bg-background/20 opacity-0"
							>
								<PlayCircleIcon className="size-10 translate-y-4 group-hover:translate-0 transition-all" />
							</Link>
							<Image
								src={imageSrc}
								className="object-cover img-brightness-saturate"
								alt={item.title}
								fill
								sizes="(max-width: 640px) 100vw, 224px"
							/>
						</div>
						<div className="px-5 flex flex-col gap-3">
							<p className="font-fraunces font-semibold text-xl">{item.title}</p>
							<div className="flex gap-3 flex-wrap text-[10px] font-jetbrains-mono uppercase">
								{item.genres.map((genre, genreIndex) => {
									return (
										<span
											key={`genre-${genreIndex}`}
											className="border p-1 px-2 rounded-md text-foreground/50 border-foreground/40"
										>
											{genre?.tmdb_genre_name}
										</span>
									);
								})}
							</div>
						</div>
						{item?.vote_average ? (
							<div className="flex flex-col ml-auto items-end">
								<span className="text-yellow-400 text-2xl font-fraunces font-bold">
									{item.vote_average.toPrecision(2)}
								</span>
								<span className="text-sm -mt-1 text-muted-foreground/70">/10</span>
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
};

export default AllTimeCard;
