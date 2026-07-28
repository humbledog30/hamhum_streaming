import { Input } from "@base-ui/react";
import { Dot, Flame, Play, RotateCw, Search, Star, TrendingUp, X } from "lucide-react";
import SearchBox from "./components/search-box";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SearchNoResult from "./components/search-no-result";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { formatRuntime } from "@/lib/utils/format-time";

type SearchParams = Promise<{ [q: string]: string | undefined }>;
interface SearchResult {
	id: string;
	match_type: string;
	original_title: string | null;
	overview: string | null;
	score: number;
	title: string;
	poster_path: string | null;
	certification: string | null;
	release_date: string | null;
	runtime: number | null;
	backdrop_path: string | null;
}

const trendingSearch = [
	"Avatar aang",
	"Swapped",
	"Hoppers",
	"Barbie",
	"Demon Slayer",
	"One Piece",
	"Moana",
	"Elemental",
	"Wild Robot",
];

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
	const resolvedParams = await searchParams;
	const supabase = await createClient();
	const { data, error } = await supabase.rpc("search_movies_with_related", {
		search_term: resolvedParams.q,
		match_limit: 10,
	});
	if (!resolvedParams.q) {
		redirect("/");
	}

	const bestMatch = data.find((item: SearchResult) => item.match_type === "best_match");
	const related = data.filter((item: SearchResult) => item.match_type === "related");

	const isSpellingCorrect = (searchTerm: string | null, bestMatchTitle: string | null) => {
		const normalize = (s: string) => s.trim().toLowerCase();
		const term = normalize(searchTerm ?? "");
		const title = normalize(bestMatchTitle ?? " ");
		return title === term || title.includes(term);
	};
	return (
		<div className="w-full flex flex-col">
			<div className="section-container py-5 flex flex-col gap-3">
				<div className="mt-10 mb-5 text-center">
					<h1 className=" font-fraunces text-3xl ">Search & Watch</h1>
					<p className="text-muted-foreground text-sm ">
						Every search leads to a new story.
					</p>
				</div>
				<SearchBox />
				<div>
					{data?.length > 0 ? (
						<div className="flex gap-2 items-center justify-center text-sm text-muted-foreground mb-5">
							<RotateCw size={18} className="text-primary" />
							{isSpellingCorrect(resolvedParams.q ?? "", bestMatch.title) ? (
								<div className="flex gap-1">
									<span>Showing {data?.length} results for </span>
									<span className="font-semibold text-primary capitalize">
										"{resolvedParams.q}"
									</span>
								</div>
							) : (
								<div className="flex gap-1">
									<span>Showing {data?.length} results for </span>
									<span className="font-semibold text-primary">
										"{bestMatch.title}"
									</span>
									<p className="flex gap-1">
										<span>—</span>
										<span className="line-through italic">
											{resolvedParams.q}
										</span>
									</p>
								</div>
							)}
						</div>
					) : (
						<SearchNoResult search={resolvedParams.q ?? ""} />
					)}
				</div>
				<div className="flex flex-col mt-5 mb-5">
					<p className="text-xs uppercase tracking-widest text-muted-foreground flex gap-3">
						Trending Searches <TrendingUp size={14} />
					</p>
					<div className="flex flex-wrap gap-2 mt-5">
						{trendingSearch?.map((item, index) => {
							return (
								<Link key={item} href={`/search?q=${encodeURIComponent(item)}`}>
									<Badge
										className="py-1.5 px-4 rounded-2xl font-normal bg-accent/30 hover:border-primary hover:bg-accent/60 cursor-pointer"
										variant={"outline"}
									>
										{index === 0 ? (
											<Flame size={13} className="mr-2 text-orange-400" />
										) : null}
										{item}
									</Badge>
								</Link>
							);
						})}
					</div>
				</div>
				{bestMatch ? (
					<div className="flex flex-col gap-3">
						<div className="flex gap-3 items-center ">
							<span className="text-muted-foreground uppercase font-semibold text-nowrap">
								Best match
							</span>
							<Separator className="flex-1" />
						</div>

						<Link
							href={`/browse/${bestMatch.id}`}
							key={bestMatch.id}
							className="relative flex flex-col rounded-md w-full overflow-hidden hover:outline hover:shadow-lg shadow-primary hover:-translate-y-1 transition-all"
						>
							<div className="bg-linear-to-r from-accent/90 from-100% lg:from-30% to-transparent to-100% absolute inset-0 left-0 top-0 z-10" />
							<div className="aspect-video w-full h-full absolute z-0">
								<Image
									src={formatImagePath(bestMatch.backdrop_path ?? "")}
									alt={bestMatch.title}
									fill
									sizes="100vw"
									className="object-cover rounded-md brightness-[.80] saturate-[.85] transition-all"
									loading="eager"
								/>
							</div>
							<div className=" flex-1 px-5 pb-5 md:px-10 pt-40 md:pb-10 text-pretty group-hover:bg-accent/20 relative z-10">
								<p className="text-amber-400 uppercase text-sm font-semibold flex gap-1 items-center mb-3">
									<Star size={16} /> Top Result{" "}
								</p>
								<p className=" font-semibold font-fraunces text-4xl mb-1 max-w-140 text-pretty">
									{bestMatch.title}
								</p>
								<div className="flex items-center flex-wrap text-muted-foreground font-semibold gap-3 gap-y-0 uppercase text-sm">
									{bestMatch?.release_date ? (
										<p>
											Year{" "}
											<span className="text-foreground text-base">
												{bestMatch.release_date.split("-")[0]}
											</span>
										</p>
									) : null}
									{bestMatch?.runtime ? (
										<p>
											Runtime{" "}
											<span className="text-foreground text-base">
												{formatRuntime(bestMatch.runtime)}
											</span>
										</p>
									) : null}
									{bestMatch?.certification ? (
										<p>
											Rating{" "}
											<span className="text-foreground text-base">
												{bestMatch.certification}
											</span>
										</p>
									) : null}
								</div>
								{bestMatch?.overview ? (
									<p className="mt-5 max-w-150">{bestMatch.overview}</p>
								) : null}
								{/* <p className="primary-btn p-3 py-1.5 pointer-events-none items-center rounded-md flex gap-3 w-fit mt-10">
									<Play size={16} /> Watch now
								</p> */}
							</div>
						</Link>
					</div>
				) : null}
				{related?.length > 0 ? (
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-10">
						<div className="flex gap-3 items-center col-span-2 md:col-span-4 lg:col-span-6">
							<span className="text-muted-foreground uppercase font-semibold">
								Related
							</span>
							<Separator className="flex-1" />
						</div>
						{related?.map((item: SearchResult) => {
							const imageSrc = formatImagePath(item.poster_path ?? "");
							return (
								<Link
									href={`/browse/${item.id}`}
									key={item.id}
									className="flex flex-col  rounded-md hover:outline outline-primary hover:shadow-lg shadow-primary group  hover:-translate-y-1 transition-all"
								>
									<div className="relative aspect-2/3 w-full ">
										<Image
											src={imageSrc}
											alt={item.title}
											fill
											sizes="(max-width: 768px) 50vw, 16vw"
											className="object-cover rounded-md brightness-[.65] saturate-[.85] group-hover:brightness-100 transition-all"
											loading="lazy"
										/>
									</div>
									<div className="text-center flex-1 p-3 text-pretty group-hover:bg-accent/20">
										<p className=" font-semibold">{item.title}</p>
										<p className="flex items-center justify-center text-muted-foreground text-xs">
											{item?.release_date ? (
												<span>{item.release_date.split("-")[0]}</span>
											) : null}

											{item?.certification && item?.release_date ? (
												<Dot size={12} className="scale-150" />
											) : null}
											{item?.certification ? (
												<span>{item.certification}</span>
											) : null}
										</p>
									</div>
								</Link>
							);
						})}
					</div>
				) : null}
			</div>
		</div>
	);
}
