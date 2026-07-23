import { Button } from "@/components/ui/button";
import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath";
import { useGenresLabel } from "@/lib/hooks/useGenresLabel";
import { Movie } from "@/types/movie";
import Image from "next/image";

const MovieCard = ({ item, onSelect }: { item: Movie; onSelect: () => void }) => {
	const genres = item.genre_ids.map((genre) => {
		const { label } = useGenresLabel(genre);
		return label;
	});
	const imageSrc = useFormatImagePath(item.poster_path);

	return (
		<div className="hover:outline outline-offset-4 rounded-md outline-primary relative group">
			<div className="relative aspect-2/3 w-full">
				<Image
					src={imageSrc}
					alt={item.title}
					fill
					sizes="(max-width: 768px) 50vw, 16vw"
					className="object-cover rounded-md"
					loading="lazy"
				/>
			</div>
			<div className="py-2">
				<p className="font-semibold mt-2 truncate">{item.title}</p>
				<div className="text-sm flex text-muted-foreground gap-2">
					<p>{item.release_date.split("-")[0]}</p>
					<p className="flex-1 text-nowrap truncate">{genres.join(", ")}</p>
				</div>
			</div>
			<div
				onClick={onSelect}
				className="inset-0 cursor-pointer absolute flex opacity-0 justify-center items-center bg-background/80 group-hover:opacity-100 transition-all duration-200"
			>
				<Button className="pointer-events-none">View &amp; Add</Button>
			</div>
		</div>
	);
};
export default MovieCard;
