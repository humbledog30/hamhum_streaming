"use client";
import { useReleaseStatus } from "@/lib/hooks/useReleaseStatus";
import { Button } from "./ui/button";
import { Bell, Bookmark, Info, MoveRight, Plus } from "lucide-react";
import { Suspense } from "react";
import { MovieDetailsRowNoMovieCredits } from "@/types/movie";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { useRouter } from "next/navigation";
import { UpcomingCardSkeleton } from "./skeleton-loader/homepage-skeleton";

const UpcomingCardItem = ({ item }: { item: MovieDetailsRowNoMovieCredits }) => {
	const router = useRouter();
	let formatted = "N/A";
	let day = "";
	let month = "";
	if (item.release_date) {
		formatted = new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}).format(new Date(item.release_date));
		day = new Intl.DateTimeFormat("en-US", {
			day: "2-digit",
		}).format(new Date(item.release_date));
		month = new Intl.DateTimeFormat("en-US", {
			month: "short",
		}).format(new Date(item.release_date));
	}

	const { status } = useReleaseStatus(item.release_date ?? "");

	return (
		<div className="group hover:-translate-y-2 transition duration-200">
			<div className="relative rounded-xl overflow-hidden mb-3">
				{day && month ? (
					<div className="absolute top-0 left-0 rounded-br-xl opacity-100 group-hover:opacity-0 group-hover:-translate-y-1 transition duration-200 flex flex-col items-center p-2 px-4 bg-background/90">
						<span className="text-2xl font-fraunces">{day}</span>
						<span className="text-[10px] text-primary font-jetbrains-mono">
							{month}
						</span>
					</div>
				) : null}
				<div className="flex flex-col justify-end p-4 items-start gap-3 absolute h-full w-full left-0 top-0 z-10 translate-y-2 group-hover:translate-y-0 bg-linear-to-t from-background from-30% to-primary/20 opacity-0 group-hover:opacity-100 transition duration-200">
					<Suspense>
						{status ? (
							<div
								suppressHydrationWarning
								className="rounded-2xl text-xs bg-primary/20 p-0.5 px-3 border-primary border text-primary font-inter"
							>
								<span className="font-light">{status}</span>
							</div>
						) : null}
					</Suspense>
					<p className="text-xs line-clamp-2 opacity-80 font-inter">{item.overview}</p>
					<div className="flex gap-2">
						<Button
							className="text-xs"
							size={"sm"}
							variant={"outline"}
							onClick={() => router.push(`/browse/${item.id}`)}
						>
							View
							<MoveRight className={"size-3"} />
						</Button>
						<Button className="text-xs" size={"sm"} variant={"outline"}>
							<Bell className={"size-3"} />
						</Button>
						<Button className="aspect-square" size={"sm"} variant="outline">
							<Bookmark className={"size-3"} />
						</Button>
					</div>
				</div>
				<img src={`${formatImagePath(item.poster_path)}`} alt={item.title} />
			</div>
			<h6 className="font-fraunces text-lg font-semibold leading-[1.3] mb-1">{item.title}</h6>
			<p className="text-xs font-thin font-jetbrains-mono">Releases {formatted}</p>
		</div>
	);
};

const UpcomingCard = ({
	items,
	isLoading,
}: {
	items: MovieDetailsRowNoMovieCredits[] | null | undefined;
	isLoading: boolean;
}) => {
	if (isLoading) {
		return (
			<div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mx-auto font-medium">
				{Array.from({ length: 10 }).map((_, index) => (
					<UpcomingCardSkeleton key={index} />
				))}
			</div>
		);
	}
	if (!items) return null;
	const upcoming = items.slice(0, 10);

	return (
		<div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mx-auto font-medium">
			{upcoming.map((item) => (
				<UpcomingCardItem key={`upcoming-card-${item.id}`} item={item} />
			))}
		</div>
	);
};

export default UpcomingCard;
