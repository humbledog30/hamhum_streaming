import { Skeleton } from "@/components/ui/skeleton";

const DetailsSkeleton = ({ itemCount = 4 }: { itemCount?: number }) => {
	return (
		<div className="flex flex-wrap pb-4 border-b gap-y-2">
			<Skeleton className="w-25 md:w-37.5 h-4" />
			<div className="flex-1 flex flex-wrap items-center gap-3">
				{Array.from({ length: itemCount }).map((_, index) => (
					<Skeleton key={`details-skeleton-${index}`} className="h-4 w-20" />
				))}
			</div>
		</div>
	);
};

export default DetailsSkeleton;
