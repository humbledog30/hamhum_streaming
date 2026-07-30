"use client";

import { Dot, RotateCw, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { formatRuntime } from "@/lib/utils/format-time";
import SearchNoResult from "./search-no-result";
import { useMovieSearch } from "@/lib/hooks/use-movie-search";

const findValueInEm = (text: string | null | undefined) => {
	if (!text) return null;
	return text.match(/<em>(.*?)<\/em>/);
};

export default function SearchResults({ query }: { query: string }) {
	const { hits, loading } = useMovieSearch(query, { hitsPerPage: 20, highlight: false });

	const bestMatch = hits[0];
	const related = hits.slice(1);
	const hasTypo = (bestMatch?._rankingInfo?.nbTypos ?? 0) > 0;
	let correctSpelling = "";
	if (
		bestMatch?._highlightResult?.title?.value ||
		bestMatch?._highlightResult?.original_title?.value
	) {
		const title = bestMatch._highlightResult?.title?.value;
		const titleMatch = findValueInEm(title);
		const originalTitle = bestMatch._highlightResult?.original_title?.value;
		const originalTitleMatch = findValueInEm(originalTitle);
		correctSpelling = titleMatch
			? titleMatch[1]
			: originalTitleMatch
				? originalTitleMatch[1]
				: "";
	}

	if (loading && hits.length === 0) {
		return (
			<div className="flex flex-col gap-3 animate-pulse">
				<div className="h-6 w-64 bg-accent/40 rounded mx-auto" />
				<div className="aspect-video w-full bg-accent/30 rounded-md mt-3" />
			</div>
		);
	}

	if (!loading && hits.length === 0) {
		return <SearchNoResult search={query} />;
	}

	return (
		<div>
			<div className="flex gap-2 items-center justify-center text-sm text-muted-foreground mb-5">
				<RotateCw size={18} className="text-primary" />
				{!hasTypo ? (
					<div className="flex gap-1">
						<span>
							Showing {hits.length} result{hits.length !== 1 ? "s" : ""} for{" "}
						</span>
						<span className="font-semibold text-primary capitalize">"{query}"</span>
					</div>
				) : (
					<div className="flex gap-1 flex-wrap">
						<span>
							Showing {hits.length} result{hits.length !== 1 ? "s" : ""} for{" "}
						</span>
						<span className="font-semibold text-primary">"{correctSpelling}"</span>
						<p className="flex gap-1">
							<span>instead of —</span>
							<span className="line-through italic">{query}</span>
						</p>
					</div>
				)}
			</div>

			{bestMatch ? (
				<div className="flex flex-col gap-3">
					<div className="flex gap-3 items-center">
						<span className="text-muted-foreground uppercase font-semibold text-nowrap">
							Best match
						</span>
						<Separator className="flex-1" />
					</div>

					<Link
						href={`/browse/${bestMatch.objectID}`}
						className="relative flex flex-col rounded-md w-full overflow-hidden hover:outline hover:shadow-lg shadow-primary hover:-translate-y-1 transition-all"
					>
						<div className="bg-linear-to-r from-background/95 from-100% lg:from-30% to-transparent to-100% absolute inset-0 left-0 top-0 z-10" />

						<div className="aspect-video w-full h-full absolute z-0">
							<Image
								src={formatImagePath(
									bestMatch.backdrop_path ?? bestMatch.poster_path ?? "",
								)}
								alt={bestMatch.title}
								fill
								sizes="100vw"
								className="object-cover rounded-md brightness-[.80] saturate-[.85] transition-all"
								loading="eager"
							/>
						</div>
						<div className="relative z-10 flex p-10 items-end">
							<div className="hidden md:block relative aspect-2/3 h-80">
								<Image
									src={formatImagePath(bestMatch.poster_path ?? "")}
									alt={bestMatch.title}
									fill
									sizes="320px"
									className="rounded-md object-cover brightness-[.80] saturate-[.85] transition-all"
									loading="eager"
								/>
							</div>

							<div className="flex-1  md:px-10 pt-40 text-pretty ">
								<p className="text-amber-400 uppercase text-sm font-semibold flex gap-1 items-center mb-3">
									<Star size={16} /> Top Result
								</p>
								<p
									className="font-semibold font-fraunces text-4xl mb-1 max-w-140 text-pretty not-italic"
									dangerouslySetInnerHTML={{
										__html:
											bestMatch._highlightResult?.title?.value ??
											bestMatch.title,
									}}
								/>
								<div className="flex items-center flex-wrap text-muted-foreground font-semibold gap-3 gap-y-0 uppercase text-sm">
									{bestMatch.release_date ? (
										<p>
											Year{" "}
											<span className="text-foreground text-base">
												{bestMatch.release_date.split("-")[0]}
											</span>
										</p>
									) : null}
									{bestMatch.runtime ? (
										<p>
											Runtime{" "}
											<span className="text-foreground text-base">
												{formatRuntime(bestMatch.runtime)}
											</span>
										</p>
									) : null}
									{bestMatch.certification ? (
										<p>
											Rating{" "}
											<span className="text-foreground text-base">
												{bestMatch.certification}
											</span>
										</p>
									) : null}
								</div>
								{bestMatch.overview ? (
									<p
										className="mt-5 max-w-120"
										dangerouslySetInnerHTML={{
											__html:
												bestMatch._snippetResult?.overview?.value ??
												bestMatch.overview,
										}}
									/>
								) : null}
							</div>
						</div>
					</Link>
				</div>
			) : null}

			{related.length > 0 ? (
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-10">
					<div className="flex gap-3 items-center col-span-2 md:col-span-4 lg:col-span-6">
						<span className="text-muted-foreground uppercase font-semibold">
							Similar results
						</span>
						<Separator className="flex-1" />
					</div>
					{related.map((item) => (
						<Link
							key={item.objectID}
							href={`/browse/${item.objectID}`}
							className="flex flex-col rounded-md hover:outline outline-primary hover:shadow-lg shadow-primary group hover:-translate-y-1 transition-all"
						>
							<div className="relative aspect-2/3 w-full">
								<Image
									src={formatImagePath(item.poster_path ?? "")}
									alt={item.title}
									fill
									sizes="(max-width: 768px) 50vw, 16vw"
									className="object-cover rounded-md img-brightness-saturate group-hover:brightness-100 transition-all"
									loading="lazy"
								/>
								<div className="absolute bottom-0 left-0 flex-1 p-3 text-pretty z-10">
									<p className="font-semibold">{item.title}</p>
								</div>
								<div className="bg-linear-to-t from-background from-10% to-transparent absolute -bottom-1 left-0 w-full h-full z-0" />
							</div>

							<p className="flex p-3 pt-0 items-center text-muted-foreground text-xs relative z-10">
								{item.release_date ? (
									<span>{item.release_date.split("-")[0]}</span>
								) : null}
								{item.certification && item.runtime ? (
									<Dot size={12} className="scale-150" />
								) : null}
								{item.runtime ? <span>{item.runtime} mins</span> : null}
							</p>
						</Link>
					))}
				</div>
			) : null}
		</div>
	);
}
