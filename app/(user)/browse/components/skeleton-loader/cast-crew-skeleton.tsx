import { Skeleton } from "@/components/ui/skeleton";

const CastCrewSkeleton = ({ count = 12 }: { count?: number }) => {
	return (
		<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
			{Array.from({ length: count }).map((_, index) => (
				<div key={`cast-skeleton-${index}`} className="shrink-0 text-center">
					<Skeleton className="w-full aspect-square rounded-full mx-auto mb-2" />
					<Skeleton className="h-4 w-16 mx-auto mb-1" />
					<Skeleton className="h-3 w-12 mx-auto" />
				</div>
			))}
		</div>
	);
};

export default CastCrewSkeleton;
