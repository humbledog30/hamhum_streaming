import { appToast } from "@/components/app-toast";
import { Badge } from "@/components/ui/badge";
import { useUserId } from "@/lib/context/UserContext";
import { useBookMarkDeletion } from "@/lib/mutations/useMovieMutation";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { formatRuntime } from "@/lib/utils/format-time";
import { BookmarkMovieRow, MovieDetailsRow, MovieGenreProps } from "@/types/movie";
import { motion, type Variants } from "framer-motion";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 16, scale: 0.97 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.35, ease: "easeOut" },
	},
};

const BookmarkCard = ({
	item,
}: {
	item: Omit<MovieDetailsRow, "genres"> & { movie_genres: MovieGenreProps[] };
}) => {
	const userId = useUserId();
	const { mutate: mutateDeleteBookmark, isPending: isPendingDeleteBookmark } =
		useBookMarkDeletion(item.id, userId);
	const [open, setOpen] = useState(false);
	return (
		<motion.div
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

					<AlertDialog open={open} onOpenChange={setOpen}>
						<AlertDialogTrigger asChild>
							<Badge
								className="absolute top-2 right-2 py-1 border-accent bg-accent/70 hover:bg-accent z-30 transition-all rounded-2xl"
								variant={"outline"}
								onClick={(e: React.MouseEvent) => {
									e.preventDefault();
									e.stopPropagation();
									setOpen(true);
								}}
							>
								Saved
							</Badge>
						</AlertDialogTrigger>
						<AlertDialogContent className="max-w-100!">
							<AlertDialogHeader>
								<AlertDialogTitle>Remove Bookmark?</AlertDialogTitle>
								<AlertDialogDescription>
									Remove this movie from your bookmarks?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel
									className="cursor-pointer"
									onClick={(e: React.MouseEvent) => {
										e.preventDefault();
										e.stopPropagation();
										setOpen(false);
									}}
								>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									className="cursor-pointer"
									variant={"destructive"}
									onClick={(e: React.MouseEvent) => {
										e.preventDefault();
										e.stopPropagation();
										mutateDeleteBookmark();
										setOpen(false);
									}}
								>
									Remove bookmark
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
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
};

export default BookmarkCard;
