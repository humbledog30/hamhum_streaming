import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { MovieDetailsRow } from "@/types/movie";
import { Bookmark, Dot, Flame, Star } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import PopuluMoviesEmpty from "./popular-movies-empty";

const PopularMoviesContent = ({ data }: { data: MovieDetailsRow[] | null | undefined }) => {
	if (!data) {
		return <PopuluMoviesEmpty />;
	}

	const top3 = data?.slice(0, 3);
	const remainingData = data?.slice(3);
	return (
		<section className=" mx-auto section-container py-8 flex flex-col gap-10">
			<div className="flex gap-3 items-center text-lg font-semibold text-muted-foreground font-fraunces uppercase">
				<p className="text-nowrap">This Week's Highest Rated</p>
				<Separator className="flex-1" />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-[1fr_1.22fr_1fr] gap-3 sm:items-end">
				{top3?.map((item: Omit<MovieDetailsRow, "movie_credits">, index: number) => {
					const imageSrc = formatImagePath(item.poster_path);
					const genres = item?.genres.flatMap((g) => g.genre?.tmdb_genre_name) ?? [];
					const isCenter = index === 0;

					return (
						<Link
							href={`/browse/${item.id}`}
							key={item.id}
							className={cn(
								"relative group hover:-translate-y-1 transition-all",
								index === 0 && "sm:order-2",
								index === 1 && "sm:order-1",
								index === 2 && "sm:order-3",
							)}
						>
							<div
								className={cn(
									"relative overflow-hidden rounded-md",
									isCenter ? "sm:aspect-3/4" : "aspect-2/3",
									"aspect-2/3",
								)}
							>
								<Image
									src={imageSrc}
									alt={item.title}
									fill
									sizes="100vw"
									loading="eager"
									className="brightness-[.80] saturate-[.85] group-hover:scale-[105%] transition-all object-cover"
								/>
							</div>
							<div className="bg-linear-to-t from-background from-5% to-transparent to-70% absolute top-0 left-0 h-full w-full" />

							<p className="absolute top-1 left-1 text-foreground/10 text-6xl lg:text-8xl font-fraunces font-bold italic">
								0{index + 1}
							</p>

							<Badge
								variant={"outline"}
								className="absolute top-4 right-4 flex items-center font-semibold py-1.5 gap-2 border-accent bg-accent/70 rounded-2xl"
							>
								<Star
									fill="oklch(85.2% 0.199 91.936)"
									className="size-3 text-yellow-400"
								/>
								<p>{item.vote_average?.toPrecision(2)}</p>
							</Badge>
							<div className="absolute left-0 bottom-0 p-5 lg:p-8 w-full">
								{genres.length ? (
									<p className="text-muted-foreground font-jetbrains-mono text-xs uppercase mb-2">
										{genres.join(", ")}
									</p>
								) : null}
								<p
									className={cn(
										"font-semibold font-fraunces ",
										isCenter ? " md:text-3xl" : "md:text-2xl",
										"text-xl",
									)}
								>
									{item.title}
								</p>
								<div className="flex items-center text-xs text-chart-2 ">
									{item?.certification ? (
										<span>{item?.certification}</span>
									) : null}
									{item?.certification && item?.release_date ? (
										<Dot size={14} />
									) : null}
									{item?.release_date ? (
										<span>{item?.release_date?.split("-")[0]}</span>
									) : null}
								</div>
								<div className="flex gap-3 mt-5 font-jetbrains-mono">
									<div className="flex items-center font-semibold gap-2">
										<Flame className="size-4 text-orange-400" />
										<p>{item.popularity?.toFixed(0)}</p>
									</div>

									<Button
										className="rounded-full ml-auto"
										variant={"outline"}
										size={"icon"}
									>
										<Bookmark />
									</Button>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
			<div className="flex gap-3 items-center text-lg font-semibold text-muted-foreground font-fraunces uppercase">
				<p className="text-nowrap">Also trending</p>
				<Separator className="flex-1" />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
				{remainingData?.map(
					(item: Omit<MovieDetailsRow, "movie_credits">, index: number) => {
						const imageSrc = formatImagePath(item.backdrop_path);
						const genres = item?.genres.flatMap((g) => g.genre?.tmdb_genre_name) ?? [];

						return (
							<Link
								href={`/browse/${item.id}`}
								key={item.id}
								className={
									"relative group hover:-translate-y-1 overflow-hidden transition-all rounded-md"
								}
							>
								<div className={"relative aspect-video"}>
									<Image
										src={imageSrc}
										alt={item.title}
										fill
										sizes="100vw"
										loading="lazy"
										className="brightness-[.80] saturate-[.85] group-hover:scale-[105%] transition-all object-cover"
									/>
									<div className="bg-linear-to-t from-background from-5% to-transparent to-70% absolute -bottom-2 left-0 h-full w-full" />
									<div className="absolute bottom-0 left-0 p-5 pb-0 w-full">
										{genres.length ? (
											<p className="text-muted-foreground font-jetbrains-mono text-xs uppercase mb-2">
												{genres.join(", ")}
											</p>
										) : null}
										<p className={"font-semibold font-fraunces text-xl"}>
											{item.title}
										</p>
									</div>
								</div>
								<div className="absolute top-0 left-0 w-full flex gap-3 justify-between items-center p-3 text-xs font-jetbrains-mono">
									<Badge
										variant={"outline"}
										className="flex items-center font-semibold gap-2 py-1 border-accent bg-accent/70 rounded-2xl"
									>
										<Star
											fill="oklch(85.2% 0.199 91.936)"
											className="size-3 text-yellow-400"
										/>
										<p>{item.vote_average?.toPrecision(2)}</p>
									</Badge>
									<Button
										className="rounded-full"
										variant={"outline"}
										size={"icon"}
									>
										<Bookmark />
									</Button>
								</div>
								<div className=" p-5 w-full flex justify-between  text-xs ">
									<div className="flex items-center text-chart-2 ">
										{item?.certification ? (
											<span>{item?.certification}</span>
										) : null}
										{item?.certification && item?.release_date ? (
											<Dot size={14} />
										) : null}
										{item?.release_date ? (
											<span>{item?.release_date?.split("-")[0]}</span>
										) : null}
									</div>
									<div className="flex items-center font-semibold gap-1">
										<Flame className="size-3" />
										<p>{item.popularity?.toFixed(0)}</p>
									</div>
								</div>
							</Link>
						);
					},
				)}
			</div>
		</section>
	);
};

export default PopularMoviesContent;
