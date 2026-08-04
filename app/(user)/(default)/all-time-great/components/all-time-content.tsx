import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { MovieDetailsRow } from "@/types/movie";
import { motion } from "framer-motion";
import { Bookmark, Flame, Play, PlayCircle, Star } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

type MovieDetailsRowWithScore = Omit<MovieDetailsRow, "movie_credits" | "genres"> & {
	weighted_score: number;
	genres: { id: string; tmdb_genre_name: string }[];
};
const AllTimeContent = ({ data }: { data: MovieDetailsRowWithScore[] | null | undefined }) => {
	if (!data) {
		return <p>No result</p>;
	}

	const top3 = data?.slice(0, 3);
	const remainingData = data?.slice(3);
	return (
		<section className=" mx-auto section-container py-8 flex flex-col gap-10">
			<div className="flex gap-3 items-center text-lg font-semibold text-muted-foreground font-fraunces uppercase">
				<p className="text-nowrap">Top 3 Masterpieces</p>
				<Separator className="flex-1" />
			</div>
			<div className="flex flex-col flex-1 gap-5">
				{top3.map((item: MovieDetailsRowWithScore, index) => {
					const imageSrc = formatImagePath(item.backdrop_path ?? "", "w500");
					const genres = item.genres.flatMap((g) => g.tmdb_genre_name) ?? [];
					return (
						<motion.div
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							key={item.id}
							transition={{ duration: 0.6, ease: "easeOut" }}
							className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center relative"
						>
							<p className="absolute lg:static top-3 left-3 z-20 text-4xl lg:text-6xl italic font-fraunces font-bold lg:w-20 shrink-0 text-muted-foreground">
								0{index + 1}
							</p>

							<div className="relative w-full lg:w-80 aspect-video overflow-hidden rounded-md shrink-0 group">
								<div className=" lg:hidden bg-linear-to-b from-background/80 to-transparent absolute h-full w-full top-0 left-0 z-10" />
								<Link
									href={`/browse/movie/${item.id}`}
									className="group-hover:opacity-100 transition-all absolute w-full h-full text-accent dark:text-muted-foreground top-0 left-0 z-30 flex justify-center items-center bg-background/20 opacity-0"
								>
									<PlayCircle className="size-10 translate-y-4 group-hover:translate-0 transition-all" />
								</Link>
								<Image
									src={imageSrc}
									className="object-cover img-brightness-saturate group-hover:scale-105 transition-all"
									alt={item.title}
									fill
									sizes="(max-width: 640px) 100vw, 224px"
								/>
							</div>

							<div className="flex-1 flex flex-col gap-3">
								<div className="font-jetbrains-mono flex gap-3 flex-wrap text-xs">
									{genres.map((genre) => (
										<span key={genre}>{genre}</span>
									))}
								</div>
								<p className="font-fraunces text-2xl lg:text-3xl font-semibold">
									{item.title}
								</p>
								<div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
									{item?.release_date ? (
										<span>{item.release_date.split("-")[0]}</span>
									) : null}
									{item?.runtime ? <span>{item.runtime} min</span> : null}
									{item?.certification ? <span>{item.certification}</span> : null}
								</div>
							</div>

							<div className="absolute lg:static top-3 right-3 z-10 flex lg:flex-col items-center lg:items-end gap-3">
								<div className="flex gap-1 text-sm items-center">
									<Star size={14} className="text-yellow-400" />
									<span>{item.vote_average?.toPrecision(2)}</span>
								</div>
								<div className="flex gap-1 text-sm items-center">
									<Flame size={14} className="text-orange-400" />
									<span>{item.vote_count?.toFixed(0)}</span>
								</div>
								<Button
									className="size-6 md:size-8 rounded-full"
									variant={"outline"}
								>
									<Bookmark className="size-3 md:size-4" />
								</Button>
							</div>
						</motion.div>
					);
				})}
			</div>
			<div className="flex gap-3 items-center text-lg font-semibold text-muted-foreground font-fraunces uppercase">
				<p className="text-nowrap">Remaining Masterpieces</p>
				<Separator className="flex-1" />
			</div>
			<div className="flex flex-col flex-1 gap-5">
				{remainingData.map((item: MovieDetailsRowWithScore, index) => {
					const imageSrc = formatImagePath(item.backdrop_path ?? "", "w500");
					const genres = item.genres.flatMap((g) => g.tmdb_genre_name) ?? [];
					return (
						<motion.div
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							key={item.id}
							transition={{ duration: 0.6, ease: "easeOut" }}
							className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center relative"
						>
							<p className="absolute lg:static top-3 left-3 z-20 text-2xl lg:text-2xl italic font-fraunces font-bold w-10 shrink-0 text-muted-foreground">
								{index + 4 < 10 ? "0" : null}
								{index + 4}
							</p>

							<div className="relative w-full lg:w-40 aspect-video overflow-hidden rounded-md shrink-0 group">
								<div className=" lg:hidden bg-linear-to-b from-background/80 to-transparent absolute h-full w-full top-0 left-0 z-10" />
								<Link
									href={`/browse/movie/${item.id}`}
									className="group-hover:opacity-100 transition-all absolute w-full h-full text-accent dark:text-muted-foreground top-0 left-0 z-30 flex justify-center items-center bg-background/20 opacity-0"
								>
									<PlayCircle className="size-10 translate-y-4 group-hover:translate-0 transition-all" />
								</Link>
								<Image
									src={imageSrc}
									className="object-cover img-brightness-saturate"
									alt={item.title}
									fill
									sizes="(max-width: 640px) 100vw, 224px"
								/>
							</div>

							<div className=" flex-1 flex flex-col gap-1">
								<p className="font-fraunces text-xl lg:text-2xl font-semibold">
									{item.title}
								</p>
								<div className="flex gap-3 flex-wrap text-sm text-muted-foreground ">
									{item?.release_date ? (
										<span>{item.release_date.split("-")[0]}</span>
									) : null}
									{item?.runtime ? <span>{item.runtime} min</span> : null}
									{item?.certification ? <span>{item.certification}</span> : null}
									{genres.map((genre) => (
										<span key={genre}>{genre}</span>
									))}
								</div>
							</div>

							<div className="absolute lg:static top-3 text-xs md:text-sm right-3 z-10 flex flex-row items-center gap-3">
								<div className="flex gap-1 items-center">
									<Star size={14} className="text-yellow-400" />
									<span>{item.vote_average?.toPrecision(2)}</span>
								</div>
								<div className="flex gap-1  items-center">
									<Flame size={14} className="text-orange-400" />
									<span>{item.vote_count?.toFixed(0)}</span>
								</div>
								<Button
									className="size-6 md:size-8 rounded-full"
									variant={"outline"}
								>
									<Bookmark className="size-3 md:size-4" />
								</Button>
							</div>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
};

export default AllTimeContent;
