import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath";
import { useGenresLabel } from "@/lib/hooks/useGenresLabel";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useFullMovieDetailsTmdb } from "../hook/use-full-movie-details-tmdb";
import { appToast } from "@/components/app-toast";

const DialogMovie = ({
	selectedMovie,
	setSelectedMovie,
	selectedStatus,
	setSelectedStatus,
}: {
	selectedMovie: Movie | null;
	setSelectedMovie: Dispatch<SetStateAction<Movie | null>>;
	selectedStatus: string;
	setSelectedStatus: Dispatch<SetStateAction<string>>;
}) => {
	const statuses = ["Draft", "Publish"];
	const { mutate, isPending } = useFullMovieDetailsTmdb();

	const handleSaveAndAddNew = () => {
		const movieid = selectedMovie?.id;

		if (!movieid) {
			appToast.info("Movie Id is not present!");
			return;
		}

		mutate(
			{ movieid, publishStatus: selectedStatus },
			{
				onSuccess: (data) => {
					appToast.success(data?.message ?? "Title added successfully!");
					setSelectedMovie(null);
				},
				onError: (data) => {
					appToast.error(data?.message ?? "Something went wrong!");
				},
			},
		);
	};
	return (
		<Dialog open={!!selectedMovie} onOpenChange={(open) => !open && setSelectedMovie(null)}>
			<DialogContent className="p-0 gap-5 pb-5 max-h-[90%] overflow-auto scrollbar-thumb-primary scrollbar-track-muted-foreground/20 scrollbar-thin">
				<div className="relative w-full aspect-video rounded-t-md ">
					<Image
						src={useFormatImagePath(selectedMovie?.backdrop_path)}
						alt={selectedMovie?.title ?? ""}
						fill
						sizes="(max-width: 768px) 100vw, 600px"
						className="object-cover"
						loading="eager"
					/>
					<div className="bg-linear-to-t from-background to-transparent absolute inset-0 -bottom-1 left-0" />
				</div>
				<div className="px-5 flex flex-col gap-1 -mt-20 z-20 relative">
					<DialogTitle className="font-fraunces text-2xl text-pretty w-[80%]">
						{selectedMovie?.title}
					</DialogTitle>
					<div className="flex gap-2 text-muted-foreground mb-3 text-sm">
						<span>{selectedMovie?.release_date.split("-")[0]}</span>
						<span>
							{selectedMovie?.genre_ids
								.map((item) => {
									const { label } = useGenresLabel(item);
									return label;
								})
								.join(", ")}
						</span>
					</div>
					<DialogDescription className="line-clamp-3">
						{selectedMovie?.overview}
					</DialogDescription>
				</div>
				<div className="px-5 text-muted-foreground font-semibold uppercase text-xs">
					<p className=" mb-2">Status</p>
					<Select value={selectedStatus} onValueChange={setSelectedStatus}>
						<SelectTrigger>
							<SelectValue placeholder="Select status" />
						</SelectTrigger>
						<SelectContent>
							{statuses.map((status) => (
								<SelectItem key={status} value={status}>
									{status}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Separator />
				<div className="grid grid-cols-2 gap-3 px-5">
					<Button
						className="cursor-pointer"
						variant={"outline"}
						disabled={isPending}
						onClick={() => setSelectedMovie(null)}
					>
						Cancel
					</Button>
					<Button
						className="cursor-pointer"
						disabled={isPending}
						onClick={handleSaveAndAddNew}
					>
						Save & Add New
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DialogMovie;
