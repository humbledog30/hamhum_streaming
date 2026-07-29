import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { MovieDetailsRow } from "@/types/movie";
import { motion, type Variants } from "framer-motion";
import { Bookmark, Dot, Flame, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const gridVariants: Variants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.08 },
	},
};
const cardVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: "easeOut" },
	},
};

const PopularMoviesRemaining = ({ data }: { data: MovieDetailsRow[] }) => {
	return (
		<motion.div
			className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
			variants={gridVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
		>
			{data?.map((item: Omit<MovieDetailsRow, "movie_credits">, index: number) => {
				const imageSrc = formatImagePath(item.backdrop_path);
				const blurUrl = formatImagePath(item.backdrop_path, "w200");
				const genres = item?.genres.flatMap((g) => g.genre?.tmdb_genre_name) ?? [];

				return (
					<motion.div
						key={item.id}
						variants={cardVariants}
						whileHover={{ y: -6 }}
						transition={{ type: "spring", stiffness: 300, damping: 22 }}
					>
						<Link
							href={`/browse/${item.id}`}
							className={"relative group block overflow-hidden rounded-md"}
						>
							<div className={"relative aspect-video"}>
								<Image
									src={imageSrc}
									alt={item.title}
									fill
									sizes="100vw"
									loading="lazy"
									className="brightness-[.80] saturate-[.85] group-hover:scale-[105%] transition-all object-cover"
									blurDataURL={blurUrl}
									placeholder={"blur"}
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
								<Button className="rounded-full" variant={"outline"} size={"icon"}>
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
					</motion.div>
				);
			})}
		</motion.div>
	);
};

export default PopularMoviesRemaining;
