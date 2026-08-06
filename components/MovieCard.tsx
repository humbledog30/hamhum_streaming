import { formatImagePath } from "@/lib/utils/format-image-path";
import { formatRuntime } from "@/lib/utils/format-time";
import { motion, type Variants } from "framer-motion";
import { Dot } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 16, scale: 0.97 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.35, ease: "easeOut" },
	},
};

interface MovieCardData {
	id: string | number;
	title: string;
	poster_path: string | null;
	release_date: string | null;
	runtime?: number;
}

interface Props<T> {
	item: T;
}

function MovieCard<T extends MovieCardData>({ item }: Props<T>) {
	return (
		<motion.div
			key={`section-genre-item-${item.id}`}
			variants={cardVariants}
			whileHover={{ y: -6, scale: 1.02 }}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 20,
			}}
		>
			<Link
				href={`/browse/movie/${item.id}`}
				className="text-center flex flex-col group overflow-hidden rounded-md hover:shadow-lg shadow-primary transition-all"
			>
				<div className="relative aspect-2/3">
					<Image
						src={formatImagePath(item.poster_path, "w300")}
						className="object-cover saturate-[.85] transition-all"
						alt={`Poster ${item.title}`}
						fill
						loading="lazy"
						sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
					/>
					<div className="absolute -bottom-1 left-0 w-full h-full bg-linear-to-t from-background to-transparent" />
					<div className="absolute bottom-0 left-0 p-3 text-left ">
						<p className="font-semibold mt-2 text-balance">{item.title}</p>
					</div>
				</div>
				<div className="text-center flex-1 p-3 pt-0 text-pretty ">
					<p className="flex text-sm text-muted-foreground items-center">
						{item.release_date ? <span>{item.release_date.split("-")[0]}</span> : null}
						{item?.release_date && item?.runtime ? <Dot /> : null}
						{item?.runtime ? <span>{formatRuntime(item?.runtime)}</span> : null}
					</p>
				</div>
			</Link>
		</motion.div>
	);
}

export default MovieCard;
