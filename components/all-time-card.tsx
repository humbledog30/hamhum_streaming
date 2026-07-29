import { formatImagePath } from "@/lib/utils/format-image-path";
import { MovieDetailsRowNoMovieCredits } from "@/types/movie";
import { AllTimeGreatCardSkeleton } from "./skeleton-loader/homepage-skeleton";

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
						<img className="w-25 rounded-lg" src={imageSrc} alt={item.title} />
						<div className="px-5 flex flex-col gap-3">
							<p className="font-fraunces font-semibold text-xl">{item.title}</p>
							<div className="flex gap-3 flex-wrap text-[10px] font-jetbrains-mono uppercase">
								{item.genres.map((genre, genreIndex) => {
									console.log(genre);
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
