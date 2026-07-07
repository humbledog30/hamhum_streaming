import "swiper/css";
import "swiper/css/effect-fade";
import { Dot, Plus } from "lucide-react";
import { FaPlay, FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useGenresLabel } from "@/lib/hooks/useGenresLabel";
import { MovieAdditionalProp } from "@/types/movie";
import BannerOverlay from "./banner-overlay";
const BannerSlide = ({ item }: { item: MovieAdditionalProp }) => {
	return (
		<div className="w-full h-full relative">
			<img
				className="w-full h-full object-cover absolute z-0"
				src={item.backdrop_path}
				alt={item.title}
			/>
			<BannerOverlay />
			<div className="container px-5 h-full z-20 mx-auto relative flex flex-col justify-end pb-10">
				<div className="py-5 border-b border-muted-foreground">
					<div className="mb-4 font-jetbrains-mono text-xs flex gap-1 items-center text-red-500">
						<div className="relative">
							<Dot className="scale-[2] animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
							<Dot className="scale-[2]" />
						</div>
						<span>NOW STREAMING</span>
					</div>
					<div className="meta-information flex-wrap flex gap-3 mb-4 items-center text-muted-foreground">
						<div className="flex gap-3 border-r border-transparent sm:border-muted-foreground pr-3">
							<span className="border p-1 px-2.5 rounded-md text-xs border-foreground">
								{item.rating}
							</span>
							<span>{item.release_date?.split("-")[0]}</span>
							<span>{item.runtime}</span>
							{item?.vote_average ? (
								<span className="flex items-center gap-1 text-sm text-primary dark:text-yellow-400">
									<FaStar />
									{item.vote_average.toPrecision(2)}
								</span>
							) : null}
						</div>
						{item.genre_ids ? (
							<div className="flex gap-3">
								{item.genre_ids.map((genre, index) => {
									const { label } = useGenresLabel(genre);
									return (
										<span key={`genre-banner-${genre}-${item.id}`}>
											{label}
										</span>
									);
								})}
							</div>
						) : null}
					</div>
					<p className="header-title">{item.title}</p>
				</div>
				<div className="flex justify-between flex-wrap items-end gap-5 py-5">
					<p className="italic text-muted-foreground max-w-full md:max-w-[75%]">
						{item.overview}
					</p>
					<div className="action-buttons flex gap-3 flex-wrap">
						<Button size="lg" className="rounded-3xl py-6">
							<FaPlay /> Watch now
						</Button>
						<Button
							size="lg"
							className="bg-transparent border-foreground rounded-3xl py-6"
							variant="outline"
						>
							<Plus /> Add to list
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BannerSlide;
