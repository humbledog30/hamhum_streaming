import { Skeleton } from "@/components/ui/skeleton";

export const UpcomingCardSkeleton = () => {
	return (
		<div className="group">
			<div className="relative overflow-hidden rounded-xl mb-3">
				{/* Poster */}
				<Skeleton className="aspect-2/3 w-full rounded-xl" />

				{/* Date badge */}
				<div className="absolute top-0 left-0 rounded-br-xl bg-background/90 p-2 px-4">
					<Skeleton className="h-6 w-8 mb-1" />
					<Skeleton className="h-3 w-8" />
				</div>

				{/* Hover overlay */}
				<div className="absolute inset-0 flex flex-col justify-end gap-3 p-4">
					<Skeleton className="h-5 w-20 rounded-full" />

					<div className="space-y-2">
						<Skeleton className="h-3 w-full" />
						<Skeleton className="h-3 w-5/6" />
					</div>

					<div className="flex gap-2">
						<Skeleton className="h-8 w-20 rounded-md" />
						<Skeleton className="h-8 w-8 rounded-md" />
						<Skeleton className="h-8 w-8 rounded-md" />
					</div>
				</div>
			</div>

			<Skeleton className="h-6 w-5/6 mb-2" />
			<Skeleton className="h-4 w-2/3" />
		</div>
	);
};

export const AllTimeGreatCardSkeleton = () => {
	return (
		<div className="relative flex items-center border-b border-foreground/20 pb-5 pl-8">
			<Skeleton className="absolute left-0 h-16 w-14 rounded-md opacity-20" />

			<Skeleton className="w-25 aspect-2/3 rounded-lg shrink-0" />

			<div className="flex flex-1 flex-col gap-3 px-5">
				<Skeleton className="h-6 w-3/4" />

				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-5 w-16 rounded-md" />
					<Skeleton className="h-5 w-20 rounded-md" />
					<Skeleton className="h-5 w-14 rounded-md" />
				</div>
			</div>

			<div className="ml-auto flex flex-col items-end">
				<Skeleton className="h-8 w-12" />
				<Skeleton className="mt-1 h-3 w-6" />
			</div>
		</div>
	);
};

export const PopularCardSkeleton = () => {
	return (
		<div className="relative rounded-lg overflow-hidden border aspect-2/3">
			<Skeleton className="absolute inset-0 rounded-md" />
			<Skeleton className="absolute top-3 right-3 h-6 w-12 rounded-2xl" />
			<div className="absolute bottom-0 left-0 w-full p-5 flex flex-col gap-2">
				<Skeleton className="h-5 w-3/4" />
				<Skeleton className="h-3 w-1/3" />
			</div>
		</div>
	);
};

const TrendingCardSkeleton = () => {
	return (
		<div className="relative rounded-lg overflow-hidden border aspect-video">
			<Skeleton className="absolute inset-0 rounded-none" />

			<Skeleton className="absolute top-3 left-3 z-20 h-7 w-6 rounded" />

			<div className="absolute bottom-0 left-0 w-full z-20 p-5 flex flex-col gap-2">
				<Skeleton className="h-6 w-2/3" />
				<div className="flex gap-2">
					<Skeleton className="h-3 w-10" />
					<Skeleton className="h-3 w-8" />
					<Skeleton className="h-3 w-12" />
				</div>
			</div>
		</div>
	);
};

export default TrendingCardSkeleton;
