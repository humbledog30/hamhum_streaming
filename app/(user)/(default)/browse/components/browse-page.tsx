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
import { useGenreCount, useGenreWithMovie } from "@/lib/queries/useGenreQuery";
import { BrowsePageSkeleton } from "./skeleton-loader/browse-page-skeleton";
import { motion, type Variants } from "framer-motion";
import BrowseMovies from "./browse-movies";

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
	const { data: genreCountData, isLoading: genreCountIsLoading } = useGenreCount();

	const genreIds = useMemo(() => genreCountData?.map((g) => g.genre_id) ?? [], [genreCountData]);
	const scrollSpy = useGenreScrollSpy(genreIds);
	if (isLoading) {
		return <BrowsePageSkeleton />;
	}
	if (error) {
		return <p>Failed to load movies</p>;
	}
	return (
		<div>
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

			<GenreTabs scrollSpy={scrollSpy} genreIds={genreIds} genreCountData={genreCountData} />

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
											href={`/browse/genre/${item.genre_id}`}
											className="flex items-center ml-auto gap-2 text-sm opacity-60 hover:opacity-100"
										>
											See all
											<MoveRight size={16} />
										</Link>
									</div>
								</div>

								<BrowseMovies data={item.movies} item={item.id} />
							</motion.div>
						</div>
					);
				})}
			</section>
		</div>
	);
};

export default BrowsePage;
