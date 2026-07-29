import { motion, type Variants } from "framer-motion";
import { BrowseGenreMovies } from "@/types/genre";
import Link from "next/link";
import Image from "next/image";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { Dot, Star } from "lucide-react";
import { formatRuntime } from "@/lib/utils/format-time";
import { Badge } from "@/components/ui/badge";
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
const BrowseMovies = ({ data, item }: { data: BrowseGenreMovies[]; item: number }) => {
	return (
		<motion.div
			className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
			variants={gridVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
		>
			{data?.map((browseItem) => (
				<motion.div
					key={`section-genre-item-${browseItem.id}-${item}`}
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
						<div className="relative aspect-2/3">
							<Image
								src={formatImagePath(browseItem.poster_path, "w300")}
								className="object-cover saturate-[.85] transition-all"
								alt={`Poster ${browseItem.title}`}
								fill
								loading="lazy"
								sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
							/>
							<div className="absolute -bottom-1 left-0 w-full h-full bg-linear-to-t from-background to-transparent" />
							<div className="absolute bottom-0 left-0 p-3 text-left ">
								<p className="font-semibold mt-2 text-balance">
									{browseItem.title}
								</p>
							</div>
						</div>
						<div className="text-center flex-1 p-3 pt-0 text-pretty ">
							<p className="flex text-sm text-muted-foreground items-center">
								{browseItem.release_date ? (
									<span>{browseItem.release_date.split("-")[0]}</span>
								) : null}
								{browseItem?.release_date && browseItem?.runtime ? <Dot /> : null}
								{browseItem?.runtime ? (
									<span>{formatRuntime(browseItem?.runtime)}</span>
								) : null}
							</p>
						</div>
					</Link>
				</motion.div>
			))}
		</motion.div>
	);
};

export default BrowseMovies;
