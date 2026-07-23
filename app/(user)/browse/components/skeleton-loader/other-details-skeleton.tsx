import { Skeleton } from "@/components/ui/skeleton";

const OtherDetailsSkeleton = () => {
	return (
		<div className="flex justify-between items-center gap-3 border-b border-foreground/10 pb-3">
			<Skeleton className="h-4 w-20" />
			<Skeleton className="h-6 w-16" />
		</div>
	);
};

export default OtherDetailsSkeleton;
