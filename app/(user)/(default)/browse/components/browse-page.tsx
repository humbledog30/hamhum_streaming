"use client";

import { useGenreScrollSpy } from "@/lib/hooks/useGenreScrollSpy";
import { Dot, MoveRight } from "lucide-react";
import Link from "next/link";
import { GenreTabs } from "@/components/genre-tabs";
import { useMemo } from "react";
import Image from "next/image";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { formatRuntime } from "@/lib/utils/format-time";
import { genreIcons } from "@/lib/utils/format-genre";
import PageSectionHeader from "@/components/page-section-header";
import { useGenreWithMovie } from "@/lib/queries/useGenreQuery";
import { BrowsePageSkeleton } from "./skeleton-loader/browse-page-skeleton";
import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

const gridVariants: Variants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.05 },
	},
};

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 16, scale: 0.97 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.35, ease: "easeOut" },
	},
};

const BrowsePage = () => {
	const { data, isLoading, error } = useGenreWithMovie();

	const genreIds = useMemo(() => data?.map((g) => g.genre_id) ?? [], [data]);
	const scrollSpy = useGenreScrollSpy(genreIds);

	if (isLoading) {
		return <BrowsePageSkeleton />;
	}
	if (error) {
		return <p>Failed to load movies</p>;
	}
	return (
		<div>
			{/* <div className="relative h-[80vh]">
				<Image sizes="100vw" fill src={"/browse-banner.jpg"} alt="Browse Banner" />
				<div className="bg-linear-to-t from-background to-transparent to-50% absolute left-0 bottom-0 h-full w-full" /> */}
			<PageSectionHeader
				tagline="Browse the library"
				title={
					<>
						Where <span className="italic text-muted-foreground">every mood</span> finds
						its <span className="italic text-muted-foreground">story</span>.
					</>
				}
				description="Whether you're seeking wonder, suspense, laughter, or longing—every journey begins with the right story."
			/>
			{/* </div> */}

			<GenreTabs scrollSpy={scrollSpy} genreIds={genreIds} />

			<section className="section-container py-8 flex flex-col gap-15">
				{data?.map((item, itemIndex) => {
					const Icon = genreIcons[item.genre_id];
					return (
						<div
							key={`section-title-${item.id}`}
							ref={scrollSpy.registerSection(item.genre_id)}
							data-genre-id={item.genre_id}
							className="scroll-mt-32"
						>
							{/* Animated inner element */}
							<motion.div
								className="flex flex-col gap-y-5"
								variants={sectionVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.15 }}
							>
								<div className="flex justify-between items-center gap-5 flex-wrap ">
									<h6 className="section-title flex gap-3 items-center ">
										<Icon />
										{item.tmdb_genre_name}
									</h6>
									<div className="border-b border-foreground/80 flex-1"></div>
									<div className="flex gap-2 ">
										<Link
											href="#"
											className="flex items-center ml-auto gap-2 text-sm opacity-60 hover:opacity-100"
										>
											See all
											<MoveRight size={16} />
										</Link>
									</div>
								</div>

								<motion.div
									className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
									variants={gridVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, amount: 0.1 }}
								>
									{item?.movies.map((browseItem) => (
										<motion.div
											key={`section-genre-item-${browseItem.id}-${item.id}`}
											variants={cardVariants}
											whileHover={{ y: -6, scale: 1.02 }}
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 20,
											}}
										>
											<Link
												href={`/browse/${browseItem.id}`}
												className="text-center flex flex-col group overflow-hidden rounded-md hover:shadow-lg shadow-primary transition-all"
											>
												<div className="relative aspect-2/3 border overflow-hidden">
													<Image
														src={formatImagePath(
															browseItem.poster_path,
															"w300",
														)}
														className="object-cover brightness-[.80] saturate-[.85] group-hover:brightness-100 transition-all"
														alt={`Poster ${browseItem.title}`}
														fill
														loading="lazy"
														sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
													/>
												</div>
												<div className="text-center flex-1 p-3 text-pretty group-hover:bg-accent/20">
													<p className="font-semibold mt-2 text-balance">
														{browseItem.title}
													</p>
													<p className="flex justify-center text-sm text-muted-foreground items-center">
														{browseItem.release_date ? (
															<span>
																{
																	browseItem.release_date.split(
																		"-",
																	)[0]
																}
															</span>
														) : null}
														{browseItem?.release_date &&
														browseItem?.runtime ? (
															<Dot />
														) : null}
														{browseItem?.runtime ? (
															<span>
																{formatRuntime(browseItem?.runtime)}
															</span>
														) : null}
													</p>
												</div>
											</Link>
										</motion.div>
									))}
								</motion.div>
							</motion.div>
						</div>
					);
				})}
			</section>
		</div>
	);
};

export default BrowsePage;
