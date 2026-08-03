import { Button } from "@/components/ui/button";
import { formatRuntime } from "@/lib/utils/format-time";
import { MovieDetailsRow } from "@/types/movie";
import { Dot, ArrowLeft, Bookmark, RotateCcw, Share2, Star } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const NowShowing = ({
	movieDetails,
	onWatch,
	setRefreshCount,
	refreshCount,
}: {
	movieDetails: MovieDetailsRow | undefined;
	onWatch: () => void;
	setRefreshCount: Dispatch<SetStateAction<number>>;
	refreshCount: number;
}) => {
	return (
		<div className="flex gap-10 items-center pt-5 flex-wrap">
			<Button
				className="rounded-full size-11 cursor-pointer"
				variant={"outline"}
				onClick={onWatch}
			>
				<ArrowLeft />
			</Button>
			<div className="">
				<span className="text-[10px] uppercase text-primary">Now playing</span>
				<p className="text-xl lg:text-2xl font-fraunces">{movieDetails?.title}</p>
				<div className="flex gap-3 text-sm text-muted-foreground/70 [&>*:not(:last-child)]:border-r [&>*:not(:last-child)]:border-muted-foreground/70 [&>*:not(:last-child)]:pr-3">
					{movieDetails?.runtime ? <p>{formatRuntime(movieDetails?.runtime)}</p> : null}
					{movieDetails?.vote_average ? (
						<div className="flex gap-2 items-center">
							<Star size={14} />
							<p>{movieDetails.vote_average?.toPrecision(2)}</p>
						</div>
					) : null}
					{movieDetails?.release_date ? (
						<p>{movieDetails?.release_date.split("-")[0]}</p>
					) : null}
				</div>
			</div>
			<div className="ml-auto flex gap-3">
				<Button className="cursor-pointer" variant={"outline"}>
					<Bookmark /> Bookmark
				</Button>
				<Button className="cursor-pointer" variant={"outline"}>
					<Share2 />
				</Button>
				<Button
					className="cursor-pointer"
					variant={"outline"}
					onClick={() => setRefreshCount(refreshCount + 1)}
				>
					<RotateCcw />
				</Button>
			</div>
		</div>
	);
};

export default NowShowing;
